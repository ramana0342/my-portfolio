
import nodemailer from "nodemailer";
import { htmlTemplateForSendEmailUserMessageToAdmin } from "../htmlTemplate/sendEmailUserMessageToAdmin.js"

export const sendMailToAdmin = async (data) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_FROM_USER,
            pass: process.env.EMAIL_FROM_PASS
        }
    });

    await transporter.sendMail({
        from: `Ramana Portfolio <${process.env.EMAIL_FROM_USER}>`,
        to: `ramana.m0342@gmail.com`,
        replyTo: data.email,
        subject: "New Message from Ramana Portfolio",
        html: htmlTemplateForSendEmailUserMessageToAdmin(data)
    });
};