"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import TextField from "@/ui/TextField/TextField";
import CompanyLogo from "@/ui/CompanyLogo/CompanyLogo";

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

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <CompanyLogo />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Forgot password ?
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {!success && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            {error ? <p className="text-sm text-rose-400">{error}</p> : null}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {loading ? "Please wait..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        )}
        {success && <SuccessMessage />}

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          <Link
            href="/sign-in"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

const SuccessMessage = () => {
  return (
    <p className="text-center text-sm/6 text-gray-400">
      A password reset link has been sent. Please check your email.
    </p>
  );
};
