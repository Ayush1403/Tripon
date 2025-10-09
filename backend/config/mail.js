// utils/mail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); 

export const createTransporter = () => {
  if (!process.env.MAIL_ID || !process.env.MAIL_PASS) {
    throw new Error("MAIL_ID or MAIL_PASS missing in .env");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });
};
