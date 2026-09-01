
import { GoogleGenAI } from "@google/genai";
import systemPrompt from "../prompts/systemPrompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const PRIMARY_MODEL = "gemini-3.6-flash";
const FALLBACK_MODEL = "gemini-3.5-flash-lite";

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));


const generateWithRetry = async (
  model,
  contents,
  maxRetries = 2
) => {

  for (let attempt = 0; attempt <= maxRetries; attempt++) {

    try {

      console.log(
        `Calling Gemini model: ${model} | Attempt: ${attempt + 1}`
      );

      const response = await ai.models.generateContent({
        model,
        contents,
      });

      return response;

    } catch (error) {

      const status = error?.status;

      console.error(
        `Gemini ${model} Error | Status: ${status} | Attempt: ${attempt + 1
        }`
      );

      /*
       * Retry only temporary errors.
       */
      const isRetryable =
        status === 503 ||
        status === 500 ||
        status === 429;

      if (isRetryable && attempt < maxRetries) {

        const delay = 2000 * Math.pow(2, attempt);

        console.log(
          `Retrying ${model} in ${delay / 1000} seconds...`
        );

        await sleep(delay);

        continue;
      }

      throw error;
    }
  }
};


export const generateResponse = async (history) => {

  console.log("AI Reply Function Triggered");

  const conversation = history
    .map((item) => `${item.role}: ${item.message}`)
    .join("\n");

  const contents = `
${systemPrompt}

Conversation History:
${conversation}

Assistant:
`;

  /*
   * -------------------------
   * PRIMARY MODEL
   * -------------------------
   */

  try {

    const response = await generateWithRetry(
      PRIMARY_MODEL,
      contents,
      2
    );

    console.log(
      `Response received from ${PRIMARY_MODEL}`
    );

    return response.text;

  } catch (primaryError) {

    console.error(
      `Primary model ${PRIMARY_MODEL} failed:`,
      primaryError?.message
    );
  }


  /*
   * -------------------------
   * FALLBACK MODEL
   * -------------------------
   */

  try {

    console.log(
      `Trying fallback model: ${FALLBACK_MODEL}`
    );

    const response = await generateWithRetry(
      FALLBACK_MODEL,
      contents,
      1
    );

    console.log(
      `Response received from ${FALLBACK_MODEL}`
    );

    return response.text;

  } catch (fallbackError) {

    console.error(
      `Fallback model ${FALLBACK_MODEL} failed:`,
      fallbackError?.message
    );

    const status = fallbackError?.status;

    /*
     * Quota / rate limit
     */
    if (status === 429) {

      const error = new Error(
        "AI access limit reached. Please try again later."
      );

      error.code = "AI_DAILY_LIMIT_REACHED";

      throw error;
    }


    /*
     * Temporary Gemini outage
     */
    if (status === 503) {

      const error = new Error(
        "AI service is temporarily busy. Please try again in a moment."
      );

      error.code = "AI_SERVICE_UNAVAILABLE";

      throw error;
    }


    throw fallbackError;
  }
};