"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await authClient.signIn.email({
        email: email,
        password: password,
        //callbackURL: "/",
      });

      if (result.error) {
        setError(result.error.message || "Login failed");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Better Auth
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Sign in with your email or Google account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 outline-none ring-0"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 outline-none ring-0"
              placeholder="••••••••"
              required
            />
          </div>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-500 px-2 py-2 font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Please wait..." : "Sign in"}
          </button>

          <Link
            href="/forgot-password"
            className="text-sm text-cyan-400 hover:underline text-center block"
          >
            Forgot your password?
          </Link>
        </form>

        <div className="my-6 flex items-center gap-3 text-sm text-slate-500">
          <div className="h-px flex-1 bg-slate-800" />
          <span>or</span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full rounded-lg border border-slate-700 bg-white px-4 py-2 font-medium text-slate-900 transition hover:bg-slate-100"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-400">
          <Link href="/sign-up" className="text-cyan-400 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
