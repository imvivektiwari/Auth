import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const authSession = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session) {
            throw new Error("No active session found");
        }
        return session;
    } catch (err) {
        //throw new Error("Error getting auth session: " + (err instanceof Error ? err.message : String(err)));
    }
}

export const authIsRequired = async () => {
    const session = await authSession();
    if (!session) {
        redirect("/sign-in");
    }
    return session;
}


export const authIsNotRequired = async () => {
    const session = await authSession();
    if (session) {
        redirect("/");
    }
}

