// config/mail.js
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
    // Add these timeout settings
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
    // Explicitly set these for production
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    tls: {
      rejectUnauthorized: true,
      minVersion: "TLSv1.2"
    },
    // Add pool and rate limiting for better reliability
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    // Enable debug logs in production (remove after fixing)
    debug: process.env.NODE_ENV !== 'production',
    logger: process.env.NODE_ENV !== 'production'
  });
};
