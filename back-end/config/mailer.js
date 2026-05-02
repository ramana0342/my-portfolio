import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.APP_EMAIL,
//     pass: process.env.APP_EMAIL_PASS,
//   },
// });


export const transporter = nodemailer.createTransport({
  service: "gmail", // Using the 'service' shorthand is more robust for Gmail
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // MUST be true for 465
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASS
  },
  // This helps prevent the connection from hanging
  connectionTimeout: 10000, 
  greetingTimeout: 10000,
});