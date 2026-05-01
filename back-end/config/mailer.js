import nodemailer from "nodemailer";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,           
  secure: false,       
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASS,
  },
  pool: true,          
  maxConnections: 5,
  maxMessages: 100,
  tls: {
    rejectUnauthorized: false,
  },
});