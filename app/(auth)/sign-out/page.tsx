import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type PageProps = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Signout({ params, searchParams }: PageProps) {
  const { reason } = await searchParams;

  const signOut = async () => {
    await auth.api.signOut({
      headers: await headers(),
    });

    if (reason) {
      redirect(`/sign-in?reason=${reason}`);
    } else {
      redirect("/sign-in");
    }
  };

  await signOut();
}
