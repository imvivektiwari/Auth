import { authIsNotRequired } from "@/lib/auth-utils";
import ResetPasswordPage from "@/pages/ResetPasswordPage";


export default async function ResetPassword() {
    await authIsNotRequired();
    return <ResetPasswordPage />
}
