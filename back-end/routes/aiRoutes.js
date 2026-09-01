

import express from "express";

import {
  chatWithAI,
  getAIConversation,
} from "../controllers/aiController.js";

const router = express.Router();

router.post(
  "/chat",
  chatWithAI
);



router.get(
  "/chat/:conversationId",
  getAIConversation
);


export default router;
