// config/mail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Validate required environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("EMAIL_USER and EMAIL_PASS are required in .env");
}

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail", // e.g., 'gmail', 'outlook', 'yahoo'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password for Gmail
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

export const sendMail = async ({ to, subject, html, from }) => {
  try {
    const mailOptions = {
      from: from || `"TripOn" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Email Sending failed due to:", error);
    throw error;
  }
};
