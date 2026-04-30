import express from "express";
import { handleUserSendMessage , getAllUsersContactMessagesBySearch , getUsersContactMessagesCount , handleDeleteUserContactMessage } from "../controllers/userContactMessagesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send-message", handleUserSendMessage);
router.post("/contact-messages/search", authMiddleware, getAllUsersContactMessagesBySearch)
router.get("/contact-messages/count", getUsersContactMessagesCount)
router.delete("/contact-messages/delete/:messageId", authMiddleware, handleDeleteUserContactMessage)

export default router;