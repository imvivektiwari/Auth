import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db";
import { sendVerificationEmail } from "./send-verification-email";


export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      // Implement your email sending logic here
      try {
        await sendVerificationEmail({
          to: 'vivektiwari.2896@gmail.com',
          verificationUrl: url,
          userName: user.name
        });
      }
      catch (err) {
        console.log("Error sending verification email:", err);
      }
    },
  },
  socialProviders: {
    google: {
      // requireEmailVerification: true,
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
