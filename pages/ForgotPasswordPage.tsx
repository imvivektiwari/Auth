"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.requestPasswordReset({
        email: email,
        //redirectTo: "http://localhost:3000/reset-password", // optional
      });
      if (error) {
        setError(
          error?.message ||
            "An error occurred while requesting password reset.",
        );
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <SuccessMessage />;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Better Auth
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Forgot your password? Enter your email and we'll send you a link to
            reset it.
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

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-500 px-2 py-2 font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Please wait..." : "Send Reset Link"}
          </button>

          <Link
            href="/sign-in"
            className="text-sm text-cyan-400 hover:underline text-center block"
          >
            Back to Sign In
          </Link>
        </form>
      </div>
    </main>
  );
}

const SuccessMessage = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Better Auth
          </p>
          <p className="mt-2 text-sm text-slate-400">
            A password reset link has been sent. Please check your email.
          </p>
        </div>

        <Link
          href="/sign-in"
          className="text-sm text-cyan-400 hover:underline text-center block"
        >
          Back to Sign In
        </Link>
      </div>
    </main>
  );
};
