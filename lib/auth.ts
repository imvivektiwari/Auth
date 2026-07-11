import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db";
import { sendVerificationEmail } from "./send-verification-email";
import { sendPasswordResetEmail } from "./send-password-reset-email";

export const auth = betterAuth({
  appName: "My App",
  baseURL: process.env.APP_BASE_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    //custom password hashing and verifying
    // password: {
    //   hash: hashPassword,
    //   verify: verifyPassword,
    // },
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    onExistingUserSignUp: async ({ user }, request) => {
      // Handle existing user sign-up logic here
    },
    resetPasswordTokenExpiresIn: 1000 * 60 * 5, // 5 minuts
    sendResetPassword: async ({ user, url, token }, request) => {
      const resetUrl = `${process.env.APP_BASE_URL}/reset-password?token=${token}`;
      try {
        await sendPasswordResetEmail({
          to: process.env.EMAIL_TO as string,
          resetUrl: resetUrl,
        });
      } catch (err) {
        console.log("Error sending password reset email:", err);
      }
    },
    onPasswordReset: async ({ user }, request) => {
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // Implement your email sending logic here
      try {
        await sendVerificationEmail({
          to: process.env.EMAIL_TO as string,
          verificationUrl: url,
          userName: user.name,
        });
      } catch (err) {
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
  session: {
    expiresIn: 60 * 60, // 1 hr
  },
  plugins: [nextCookies(), twoFactor()],
});

export type Session = typeof auth.$Infer.Session;
