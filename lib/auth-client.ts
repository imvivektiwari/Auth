import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    twoFactorClient({
      // twoFactorPage: "/two-factor",
      // onTwoFactorRedirect(context) {
      //   console.log(context);
      //   console.log("Two-factor verification required");
      // },
    }),
  ],
});
