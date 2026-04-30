import nodemailer from "nodemailer";
import { findAdminByEmailMobile } from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import { refreshCookieOptions } from "../config/cookie.js";
import { sendLoginOtpMailToAdmin } from "./handleSendMessageToAdmin.js";


const otpStore = new Map();

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const admin = await findAdminByEmailMobile(email, null);

        if (!admin) {
            return res.status(404).json({
                status: { code: 404, message: "No admin account found with this email" },
                response: null
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        otpStore.set(email, {
            otp,
            expires: Date.now() + 5 * 60 * 1000
        });

        sendLoginOtpMailToAdmin({otp : otp , name : admin.name}).catch(err => {console.error("Login OTP email failed:", err)});



        return res.status(200).json({
            status: { code: 200, message: "OTP has been sent to your email successfully" },
            response: null
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export const verifyOtpLogin = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const record = otpStore.get(email);

        if (!record) {
            return res.status(400).json({
                status: { code: 400, message: "OTP session not found. Please request a new OTP" },
                response: null
            });
        }

        if (record.expires < Date.now()) {
            return res.status(400).json({
                status: { code: 400, message: "OTP has expired. Please request a new one" },
                response: null
            });
        }

        if (record.otp != otp) {
            return res.status(400).json({
                status: { code: 400, message: "Invalid OTP. Please enter the correct code" },
                response: null
            });
        }

        const admin = await findAdminByEmailMobile(email, null);

        const accessToken = jwt.sign(
            {
                admin_id: admin.id,
                admin_email: admin.email,
                role: "admin"
            },
            process.env.JWT_SECRET,
            { expiresIn: "20m" }
        );

        const refreshToken = jwt.sign(
            {
                admin_id: admin.id
            },
            process.env.REFRESH_SECRET,
            { expiresIn: "12h" }
        );

        res.cookie("refreshToken", refreshToken, refreshCookieOptions);

        otpStore.delete(email);

        return res.status(200).json({
            status: { code: 200, message: "OTP verified successfully. Login successful" },
            response: {
                accessToken,
                admin: {
                    id: admin.id,
                    email: admin.email,
                    mobile: admin.mobile
                }
            }
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};