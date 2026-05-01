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
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});