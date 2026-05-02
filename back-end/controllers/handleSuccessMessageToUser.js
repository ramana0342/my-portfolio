import { commonEmailSender } from "../config/mailer.js";
import { htmlTemplateForUserSuccessSentContact } from "../htmlTemplate/sendEmailToUserForSuccessSentContact.js";

export const sendMailToUserForSuccesSentContact = async (data) => {
  try {
    await commonEmailSender({
      from: `Ramana Portfolio <${process.env.APP_EMAIL}>`,
      to: data.email,
      subject: `Hi ${data.name}, we received your message ✅`,
      html: htmlTemplateForUserSuccessSentContact(data),
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending user email:", error);
    return { success: false };
  }
};