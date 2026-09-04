import express from "express";
import { handleUserSendMessage , getAllUsersContactMessagesBySearch , getUsersContactMessagesCount , handleDeleteUserContactMessage , handleReadUserContactMessage } from "../controllers/userContactMessagesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send-message", handleUserSendMessage);
router.post("/contact-messages/search", authMiddleware, getAllUsersContactMessagesBySearch)
router.get("/contact-messages/count", getUsersContactMessagesCount)
router.delete("/contact-messages/delete/:messageId", authMiddleware, handleDeleteUserContactMessage)
router.patch("/contact-messages/read/:messageId", authMiddleware, handleReadUserContactMessage);

export default router;