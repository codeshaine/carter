import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail", // Or another email service
  auth: {
    user: process.env.SERVER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// const mailOptions = {
//   from: process.env.SERVER_EMAIL,
//   to: "axioznot05@gmail.com",
//   subject: "okk ",
//   text: "testing the thign",
// };

export function sendMail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent:", info.response);
        resolve(info);
      }
    });
  });
}
