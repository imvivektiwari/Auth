import { authIsNotRequired } from "@/lib/auth-utils";
import SignUpPage from "@/pages/SignUpPage";


export default async function SignUp() {
    await authIsNotRequired();
    return <SignUpPage />
}
