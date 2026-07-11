import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const authSession = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("Session not found");
    }
    return session;
  } catch {}
};

export const authRequired = async () => {
  try {
    await auth.api.revokeOtherSessions({
      headers: await headers(),
    });
  } catch (ex) {
    //TODO: Check why this throws exception, but revoke other session works
    //console.log(ex);
  }

  const session = await authSession();
  if (!session) {
    redirect("/sign-in");
  }
  return session;
};
