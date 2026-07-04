import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Next.js + Prisma + Better Auth</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Authentication is ready for your app.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            This project now includes Prisma with PostgreSQL support, Better Auth email/password auth, and Google social login.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/auth" className="rounded-lg bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">
              Open login / register
            </Link>
            <Link href="/dashboard" className="rounded-lg border border-slate-700 px-5 py-3 font-medium text-slate-200 transition hover:bg-slate-800">
              View protected dashboard
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
