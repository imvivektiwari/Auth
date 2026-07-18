"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TextField from "@/ui/TextField/TextField";
import { authClient } from "@/lib/auth-client";
import CompanyLogo from "@/ui/CompanyLogo/CompanyLogo";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token: string =
    new URLSearchParams(window?.location?.search)?.get("token") || "";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.resetPassword({
        newPassword: password,
        token: token,
      });
      if (error) {
        setError(
          error?.message || "An error occurred while resetting the password.",
        );
      } else {
        router.push("/");
        router.refresh();
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
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {loading ? "Please wait..." : "Reset Password"}
            </button>
          </div>
        </form>

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
