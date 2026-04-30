import express from "express";
import { handleAdminLogin } from "../controllers/adminController.js";
import { refreshTokenHandler } from "../controllers/refreshTokenHandler.js";
import { handleLogout } from "../controllers/handleLogout.js";
import { sendOtp , verifyOtpLogin } from "../controllers/handleAdminOtpLoginFlow.js";

const router = express.Router();

router.post("/login", handleAdminLogin);
router.post('/refresh-token' , refreshTokenHandler)
router.post("/logout", handleLogout);
router.post("/send-login-otp", sendOtp);
router.post("/verify-login-otp", verifyOtpLogin);

export default router;