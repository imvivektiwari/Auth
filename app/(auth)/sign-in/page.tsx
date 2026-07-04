import { authIsNotRequired } from "@/lib/auth-utils";
import SignInPage from "@/pages/SignInPage";


export default async function SignIn() {
    await authIsNotRequired();
    return <SignInPage />
}
