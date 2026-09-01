import { generateResponse } from "../services/aiService.js";

import {
  createConversation,
  saveMessage,
  getConversationHistory,
    getConversationMessages,
} from "../services/conversationService.js";


export const chatWithAI = async (req, res) => {
  try {

    const { conversationId, message } = req.body;

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
      await getConversationHistory(conversationId);

    const reply =
      await generateResponse(history);

    await saveMessage(
      conversationId,
      "assistant",
      reply
    );

    return res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {

    console.error("AI Controller Error:", error);

    if (error?.code === "AI_DAILY_LIMIT_REACHED") {

      return res.status(429).json({
        success: false,
        code: "AI_DAILY_LIMIT_REACHED",
        message:
          "AI access limit reached. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getAIConversation = async (req, res) => {
  try {

    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: "conversationId is required",
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
      message: "Internal Server Error",
    });
  }
};