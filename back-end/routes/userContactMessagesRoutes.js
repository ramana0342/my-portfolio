import express from "express";
import { handleUserSendMessage , getAllUsersContactMessagesBySearch , getUsersContactMessagesCount , handleDeleteUserContactMessage } from "../controllers/userContactMessagesController.js";

const router = express.Router();

router.post("/send-message", handleUserSendMessage);
router.post("/contact-messages/search", getAllUsersContactMessagesBySearch)
router.get("/contact-messages/count", getUsersContactMessagesCount)
router.delete("/contact-messages/delete/:messageId", handleDeleteUserContactMessage)

export default router;