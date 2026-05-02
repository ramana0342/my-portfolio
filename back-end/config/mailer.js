
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.APP_EMAIL,
    clientId: process.env.GOOGLE_CLOUD_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLOUD_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_CLOUD_REFRESH_TOKEN,
  },
});

// Verification to ensure the connection is working
transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter connection error:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});