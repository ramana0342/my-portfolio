

import {
  generateResponseStream
} from "../services/aiService.js";

import {
  createConversation,
  saveMessage,
  getConversationHistory,
  getConversationMessages,
} from "../services/conversationService.js";


export const chatWithAI = async (req, res) => {
  try {
    const {
      conversationId,
      message
    } = req.body;

    if (!conversationId || !message) {
      return res.status(400).json({
        success: false,
        message: "conversationId and message are required",
      });
    }


    await createConversation(conversationId);

    await saveMessage(
      conversationId,
      "user",
      message
    );


    const history =
      await getConversationHistory(
        conversationId
      );


    res.statusCode = 200;

    res.setHeader(
      "Content-Type",
      "text/event-stream; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "no-cache, no-transform"
    );

    res.setHeader(
      "Connection",
      "keep-alive"
    );

    res.setHeader(
      "X-Accel-Buffering",
      "no"
    );

    res.flushHeaders();

    res.write(
      `data: ${JSON.stringify({
        type: "connected"
      })}\n\n`
    );

    let completeResponse = "";


    req.on("close", () => {
      console.log(
        "AI client connection closed"
      );
    });


    await generateResponseStream(
      history,
      (chunk) => {

        completeResponse += chunk;

        res.write(
          `data: ${JSON.stringify({
            type: "chunk",
            text: chunk
          })}\n\n`
        );


        if (typeof res.flush === "function") {
          res.flush();
        }
      }
    );

    await saveMessage(
      conversationId,
      "assistant",
      completeResponse
    );

    res.write(
      `data: ${JSON.stringify({
        type: "done"
      })}\n\n`
    );

    if (typeof res.flush === "function") {
      res.flush();
    }

    res.end();

  } catch (error) {

    console.error(
      "AI Streaming Controller Error:",
      error
    );

    if (!res.headersSent) {

      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }


    res.write(
      `data: ${JSON.stringify({
        type: "error",
        message:
          "AI service temporarily unavailable."
      })}\n\n`
    );

    res.end();
  }
};


export const getAIConversation = async (
  req,
  res
) => {

  try {

    const {
      conversationId
    } = req.params;


    if (!conversationId) {

      return res.status(400).json({
        success: false,
        message:
          "conversationId is required",
      });
    }


    const messages =
      await getConversationMessages(
        conversationId
      );


    return res.status(200).json({
      success: true,
      messages,
    });


  } catch (error) {

    console.error(
      "Get AI Conversation Error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });
  }
};
