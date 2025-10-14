// config/mail.js
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.RESEND_API) {
  throw new Error("RESEND_API key missing in .env");
}

export const resend = new Resend(process.env.RESEND_API);

export const sendMail = async({to , subject , html , from}) => {
  try {
    const response  = await resend.emails.send({
      from: from || "TripOn <onboarding@resend.dev>",
      to,
      subject,
      html,
    })
    console.log("Email Sent")

    return response;
  } catch (error) {
    console.log("Email Sending failed due to : " ,error);
  }
}
