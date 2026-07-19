import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db";
import { sendVerificationEmail } from "./send-verification-email";
import { sendPasswordResetEmail } from "./send-password-reset-email";
import { send2FAOTP } from "./send-2FA-OTP";

export const auth = betterAuth({
  appName: process.env.APP_NAME,
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
      const isProd = process.env.NODE_ENV === "production";
      const emailTo = isProd ? user.email : process.env.EMAIL_TO;
      try {
        await sendPasswordResetEmail({
          to: emailTo as string,
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
      const isProd = process.env.NODE_ENV === "production";
      const emailTo = isProd ? user.email : process.env.EMAIL_TO;
      try {
        await sendVerificationEmail({
          to: emailTo as string,
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
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },
  session: {
    expiresIn: 60 * 30, // 30min
  },
  plugins: [
    twoFactor({
      skipVerificationOnEnable: true,
      otpOptions: {
        async sendOTP({ user, otp }, ctx) {
          const isProd = process.env.NODE_ENV === "production";
          const emailTo = isProd ? user.email : process.env.EMAIL_TO;
          send2FAOTP({
            to: process.env.EMAIL_TO as string,
            otp: otp,
            userName: user.name,
          });
        },
      },
    }),
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
//allowPasswordless: true
