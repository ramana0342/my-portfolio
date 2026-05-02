import { commonEmailSender } from "../config/mailer.js";
import { htmlTemplateForSendEmailUserMessageToAdmin } from "../htmlTemplate/sendEmailUserMessageToAdmin.js";
import { chatEmailTemplate } from "../htmlTemplate/chatEmailTemplate.js";
import { loginOtpEmailTemplate } from "../htmlTemplate/loginOtpEmailTemplate.js";

export const sendMailToAdmin = async (data) => {
  console.log("Mail function triggered");
  try {
    console.log("Sending mail...");
    await commonEmailSender({
      from: `Ramana Portfolio <${process.env.APP_EMAIL}>`,
      to: process.env.ADMIN_OFFICIAL_MAIL, 
      replyTo: data.email, 
      subject: `New Contact Message from ${data.name}`,
      html: htmlTemplateForSendEmailUserMessageToAdmin(data),
    });

    console.log("✅ Mail sent successfully");

    return { success: true };
  } catch (error) {
    console.error("Error sending admin email:", error);
    return { success: false };
  }
};


export const sendMailToAdminForChat = async (data) => {
  try {
    await commonEmailSender({
      from: `Ramana Portfolio <${process.env.APP_EMAIL}>`,
      to: process.env.ADMIN_OFFICIAL_MAIL, 
      replyTo: data.email, 
      subject: `💬 New Chat Message from ${data.name}`,
      html: chatEmailTemplate(data),
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending admin email:", error);
    return { success: false };
  }
};


export const sendLoginOtpMailToAdmin = async ({otp , name}) => {
  try {
    await commonEmailSender({
      from: `Ramana Portfolio <${process.env.APP_EMAIL}>`,
      to: process.env.ADMIN_OFFICIAL_MAIL, 
      subject: "🔐 Your Login OTP",
      html:   loginOtpEmailTemplate({
        otp,
        name: name || "Admin"
      })
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending admin email:", error);
    return { success: false };
  }
}