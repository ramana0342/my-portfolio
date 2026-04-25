import { transporter } from "../config/mailer.js";
import { htmlTemplateForSendEmailUserMessageToAdmin } from "../htmlTemplate/sendEmailUserMessageToAdmin.js";

export const sendMailToAdmin = async (data) => {
  try {
    await transporter.sendMail({
      from: `Ramana Portfolio <${process.env.APP_EMAIL}>`,
      to: process.env.ADMIN_OFFICIAL_MAIL, 
      replyTo: data.email, 
      subject: `New Contact Message from ${data.name}`,
      html: htmlTemplateForSendEmailUserMessageToAdmin(data),
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending admin email:", error);
    return { success: false };
  }
};