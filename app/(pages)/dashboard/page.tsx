import Link from "next/link";

export default async function DashboardPage() {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
        Dashboard
      </p>

      <p className="mt-3 text-slate-400">
        Your Better Auth session is active and Prisma is connected for
        persistence.
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href="/sign-out"
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
}
