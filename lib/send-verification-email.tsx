import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendVerificationEmailParams = {
  to: string;
  verificationUrl: string;
  userName: string;
};

export const sendVerificationEmail = async ({
  to,
  verificationUrl,
  userName,
}: SendVerificationEmailParams) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM as string,
      to: [to],
      subject: "Hello world",
      html: emailHTML(userName, verificationUrl),
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

const emailHTML = (userName: string, verificationUrl: string) => {
  const appName = process.env.APP_NAME;
  return `<html>
        <body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '20px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
                <h1 style={{ color: '#333333' }}>Hello ${userName},</h1>
                <p style={{ color: '#555555' }}>Thank you for signing up for ${appName}! Please verify your email address by clicking the button below:</p>
                <a href=${verificationUrl} style={{ display: 'inline-block', padding: '10px 20px', marginTop: '20px', backgroundColor: '#0070f3', color: '#ffffff', textDecoration: 'none', borderRadius: '5px' }}>Verify Email</a>
                <p style={{ color: '#555555', marginTop: '20px' }}>If you did not sign up for ${appName}, please ignore this email.</p>
                <p style={{ color: '#555555', marginTop: '20px' }}>Best regards,<br />The ${appName} Team</p>
            </div>
        </body>
    </html>`;
};
