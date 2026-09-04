

import { GoogleGenAI } from "@google/genai";
import systemPrompt from "../prompts/systemPrompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const PRIMARY_MODEL = "gemini-3.7-flash";
const FALLBACK_MODEL = "gemini-3.5-flash-lite";


export const generateResponseStream = async (
  history,
  onChunk
) => {



  const conversation = history
    .map(
      (item) =>
        `${item.role}: ${item.message}`
    )
    .join("\n");


  const contents = `
${systemPrompt}

Conversation History:
${conversation}

Assistant:
`;


  console.log(
    `Calling Gemini streaming model: ${PRIMARY_MODEL}`
  );


  try {

    const responseStream =
      await ai.models.generateContentStream({
        model: PRIMARY_MODEL,
        contents,
      });


    let completeResponse = "";



    for await (const chunk of responseStream) {

      const text = chunk.text || "";

      if (!text)
        continue;
      completeResponse += text;

      onChunk(text);
    }




    console.log(
      `Streaming completed from ${PRIMARY_MODEL}`
    );


    return completeResponse;


  } catch (error) {

    console.error(
      `Primary streaming model failed:`,
      error?.message
    );


    /*
     * Fallback model
     */
    try {

      console.log(
        `Trying fallback streaming model: ${FALLBACK_MODEL}`
      );


      const responseStream =
        await ai.models.generateContentStream({
          model: FALLBACK_MODEL,
          contents,
        });


      let completeResponse = "";


      for await (const chunk of responseStream) {

        const text = chunk.text || "";


        if (!text)
          continue;


        completeResponse += text;


        onChunk(text);
      }


      console.log(
        `Streaming completed from ${FALLBACK_MODEL}`
      );


      return completeResponse;


    } catch (fallbackError) {

      console.error(
        `Fallback streaming model failed:`,
        fallbackError?.message
      );


      const status =
        fallbackError?.status;


      if (status === 429) {

        const error =
          new Error(
            "AI access limit reached. Please try again later."
          );

        error.code =
          "AI_DAILY_LIMIT_REACHED";

        throw error;
      }


      if (status === 503) {

        const error =
          new Error(
            "AI service is temporarily busy. Please try again in a moment."
          );

        error.code =
          "AI_SERVICE_UNAVAILABLE";

        throw error;
      }


      throw fallbackError;
    }
  }
};
