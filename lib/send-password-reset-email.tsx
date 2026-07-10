import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendPasswordResetEmailParams = {
  to: string;
  resetUrl: string;
};
export async function sendPasswordResetEmail({
  to,
  resetUrl,
}: SendPasswordResetEmailParams) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM as string,
      to: [to],
      subject: "Password Reset Request",
      html: emailHTML(resetUrl, "Better Auth")
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
}


const emailHTML = (resetUrl: string, appName: string) => {
  return `<html>
        <body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '20px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
                <h1 style={{ color: '#333333' }}>Password Reset Request</h1>
                <p style={{ color: '#555555' }}>You have requested to reset your password for ${appName}. Please click the button below to reset it:</p>
                <a href=${resetUrl} style={{ display: 'inline-block', padding: '10px 20px', marginTop: '20px', backgroundColor: '#0070f3', color: '#ffffff', textDecoration: 'none', borderRadius: '5px' }>Reset Password</a>
                <p style={{ color: '#555555', marginTop: '20px' }}>If you did not request this, please ignore this email.</p>
                <p style={{ color: '#555555', marginTop: '20px' }}>Best regards,<br />The ${appName} Team</p>
            </div>
        </body>
    </html>`;
}