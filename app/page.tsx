import { authRequired } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await authRequired();
  if (session) {
    redirect("/dashboard");
  }
}
