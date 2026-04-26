import express from "express";
import { fetchChatUsersList , fetchChatMessages } from "../controllers/chatController.js";

const router = express.Router();

router.get("/users-list", fetchChatUsersList);
router.get("/messages/:user_id", fetchChatMessages);

export default router;