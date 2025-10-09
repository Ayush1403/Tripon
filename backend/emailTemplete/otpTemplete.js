// emailTemplates/otpEmail.js
export const otpEmailTemplate = (fullName, otp) => {
  return `
  <body style="margin:0; padding:0; font-family: 'Helvetica', Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5; padding: 40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
            <tr>
              <td style="background-color: #4f46e5; padding: 30px; text-align: center; color: #ffffff;">
                <h1 style="margin: 0; font-size: 28px;">Your Company</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px; color: #333333; line-height: 1.6; font-size: 16px;">
                <h2 style="margin-top: 0; color: #111827;">Hello, ${fullName}</h2>
                <p>Thank you for signing up! Use the OTP below to verify your account:</p>
                <p style="text-align: center; font-size: 24px; font-weight: bold; margin: 30px 0; color: #4f46e5;">${otp}</p>
                <p>This OTP will expire in 10 minutes.</p>
                <p>Thank you,<br>Your Company Team</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
                <p style="margin: 0;">&copy; 2025 Your Company. All rights reserved.</p>
                <p style="margin: 0;">1234 Street Address, City, Country</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  `;
};
