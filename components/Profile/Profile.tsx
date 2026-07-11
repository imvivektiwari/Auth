"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = () => {
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState("");

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

  if (!session) return;

  return (
    <div>
      Welcome, {session?.data?.user?.name}
      <div>
        <Link
          href="/sign-out"
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default Profile;
