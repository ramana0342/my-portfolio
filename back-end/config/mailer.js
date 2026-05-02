import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.APP_EMAIL,
//     pass: process.env.APP_EMAIL_PASS,
//   },
// });



export const transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 587,
secure: false, 
requireTLS: true,
logger: true,
debug: true,
auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASS
},

});
