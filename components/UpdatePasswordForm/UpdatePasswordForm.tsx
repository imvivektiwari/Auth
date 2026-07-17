"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UpdatePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    const currentPassword = event.target?.currentPassword.value;
    const newPassword = event.target?.newPassword.value;
    const confirmPassword = event.target?.confirmPassword.value;
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    try {
      const { data, error } = await authClient.changePassword({
        newPassword: newPassword,
        currentPassword: currentPassword,
        revokeOtherSessions: true,
      });
      if (error) {
        setError(error?.message || "Something went wrong");
      } else {
        router.push("/sign-out?reason=password_updated");
        router.refresh();
      }
    } catch (error: any) {
      setError(error?.message);
    }
    setLoading(false);
  };

  return (
    <form className="mt-6 mb-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="currentPassword"
          className="block text-sm font-medium text-slate-300"
        >
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 outline-none ring-0"
          placeholder="Enter your current password"
        />
        <Link href="/forgot-password">Forgot Password?</Link>
      </div>
      <div className="mb-4">
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-slate-300"
        >
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 outline-none ring-0"
          placeholder="Enter your new password"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-slate-300"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 outline-none ring-0"
          placeholder="Confirm your new password"
        />
      </div>
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      <button
        type="submit"
        className="rounded-lg bg-cyan-600 px-4 py-2 text-sm text-white hover:bg-cyan-700"
      >
        {loading ? "Loading..." : " Update Password"}
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
