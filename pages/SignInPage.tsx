"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import TextField from "@/ui/TextField/TextField";
import CompanyLogo from "@/ui/CompanyLogo/CompanyLogo";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const email = event.target?.email.value;
    const password = event.target?.password.value;

    try {
      const result = await authClient.signIn.email({
        email: email,
        password: password,
      });

      if (result.error) {
        setError(result.error.message || "Login failed");
        return;
      }

      const isTwoFactorChallenge = Boolean(
        (result as { data?: { twoFactorRedirect?: boolean } })?.data
          ?.twoFactorRedirect,
      );

      if (isTwoFactorChallenge) {
        const { data, error } = await authClient.twoFactor.sendOtp({
          //@ts-ignore
          trustDevice: true,
        });

        if (error) {
          setError(error.message || "Login failed");
          return;
        }

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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <CompanyLogo />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField label="Email Address" type="email" name="email" />

          <TextField
            label="Password"
            type="password"
            name="password"
            rightLabel={
              <Link
                href="/forgot-password"
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Forgot password?
              </Link>
            }
          />

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {loading ? "Please wait..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center mt-8">
          <button
            type="button"
            onClick={handleGoogle}
            className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <FcGoogle fontSize={"1.2rem"} />
            <span>Continue with Google</span>
          </button>
        </div>
        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not a member?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
