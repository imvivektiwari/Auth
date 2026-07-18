"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TextField from "@/ui/TextField/TextField";

const UpdatePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const currentPassword = event.target?.currentPassword.value;
    const newPassword = event.target?.newPassword.value;
    const confirmPassword = event.target?.confirmNewPassword.value;
    if (newPassword !== confirmPassword) {
      setError("password do not match");
      return;
    }
    setLoading(true);
    setError("");
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
      <TextField
        name="currentPassword"
        label="Current Password"
        type="password"
        rightLabel={<Link href="/forgot-password">Forgot Password?</Link>}
      />

      <TextField name="newPassword" label="New Password" type="password" />

      <TextField
        name="confirmNewPassword"
        label="Confirm New Password"
        type="password"
        placeholder="Confirm new password"
      />

      {error ? <p className="text-sm text-rose-400">{error}</p> : null}

      <button
        disabled={loading}
        type="submit"
        className="flex justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        {loading ? "Loading..." : " Update Password"}
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
