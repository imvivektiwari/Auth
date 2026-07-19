import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    twoFactorClient({
      // twoFactorPage: "/two-factor",
      onTwoFactorRedirect({ twoFactorMethods }) {
        if (twoFactorMethods?.includes("otp")) {
          if (typeof window == "undefined") return;
          window.location.href = "/two-factor";
        }
      },
    }),
  ],
});
