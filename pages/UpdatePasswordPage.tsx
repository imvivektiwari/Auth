"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState("");
  const user = session?.data?.user;

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await authClient.getSession();
        if (sessionData?.error) {
          setError(sessionData?.error?.message || "Something went wrong");
        } else {
          setSession(sessionData);
        }
      } catch (error: any) {
        setError(error?.message);
        console.error("Error fetching session:", error);
      }
    };
    fetchSession();
  }, []);

  const handleSubmit = async (event: any) => {
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
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/80 p-10 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          Profile Page
        </p>
        <h1 className="mt-3 text-3xl font-semibold">
          Welcome, {user?.name || user?.email}
        </h1>
        {/* Update password form would go here */}
        <form className="mt-6" onSubmit={handleSubmit}>
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
            Update Password
          </button>
        </form>
      </div>
    </main>
  );
};

export default ProfilePage;
