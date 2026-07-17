import { Resend } from "resend";
import { auth } from "./auth";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

type Send2FATOTP = {
  to: string;
  userName: string;
  otp: string;
};

export const send2FAOTP = async ({ to, otp, userName }: Send2FATOTP) => {
  console.log("Sending verification email to:", to);
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM as string,
      to: [to],
      subject: "Hello world",
      //react: <VerificationEmail verificationUrl={verificationUrl} userName={userName} />
      html: emailHTML(userName, otp, "Better Auth"),
    });

    if (error) {
      console.log("Error sending verification email:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.log("Error sending verification email:", error);
    return Response.json({ error }, { status: 500 });
  }
};

const emailHTML = (userName: string, totp: string, appName: string) => {
  return `<html>
        <body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '20px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
                <h1 style={{ color: '#333333' }}>Hello ${userName},</h1>
                <p style={{ color: '#555555' }}>Thank you for signing up for ${appName}!</p>
                <p  style={{ color: '#555555' }}> OTP ${totp}</p>
                <p style={{ color: '#555555', marginTop: '20px' }}>If you did not sign up for ${appName}, please ignore this email.</p>
                <p style={{ color: '#555555', marginTop: '20px' }}>Best regards,<br />The ${appName} Team</p>
            </div>
        </body>
    </html>`;
};
