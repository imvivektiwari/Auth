import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/80 p-10 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Authenticated</p>
        <h1 className="mt-3 text-3xl font-semibold">Welcome, {session.user.name || session.user.email}</h1>
        <img src={session.user.image || "/default-avatar.png"} alt="Profile" className="mt-4 h-20 w-20 rounded-full" />
        <p className="mt-3 text-slate-400">
          Your Better Auth session is active and Prisma is connected for persistence.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/sign-out" className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700">
            Sign Out
          </Link>
        </div>
      </div>
    </main>
  );
}
