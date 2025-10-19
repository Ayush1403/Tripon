// config/mail.js
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.RESEND_API) {
  throw new Error("RESEND_API is required in .env");
}

export const resend = new Resend(process.env.RESEND_API);

export const sendMail = async ({ to, subject, html, from }) => {
  try {
    const response = await resend.emails.send({
      from: from || "TripOn <noreply@ayushsrivastava.in>",
      to,
      subject,
      html,
    });
    
    console.log("✅ Email Sent Successfully:", response.id);
    return response;
  } catch (error) {
    console.error("❌ Email Sending failed:");
    console.error("Error:", error.message);
    throw error;
  }
};
