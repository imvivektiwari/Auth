"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const TwoFAForm = () => {
  const [session, setSession] = useState<any>(null);
  const [formData, setFormData] = useState({
    twoFAEnabled: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await authClient.getSession();
      setSession(sessionData);
    };
    fetchSession();
  }, []);

  console.log(session);

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    const password = event.target?.password.value;
    const twoFAEnabled = event.target?.twoFAEnabled.value;

    try {
      let res = null;
      if (twoFAEnabled) {
        res = await authClient.twoFactor.enable({
          password,
        });
      } else {
        res = await authClient.twoFactor.disable({
          password,
        });
      }

      if (res?.error) {
        setFormError(res?.error?.message || "Something went wrong");
      } else {
        router.push("/sign-out?reason=password_updated");
        router.refresh();
      }
    } catch (error: any) {
      setFormError(error?.message);
    }
    setLoading(false);
  };

  return (
    <form className="mt-6 mb-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-300"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 outline-none ring-0"
          placeholder="Enter your current password"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-slate-300"
        >
          <input
            type="checkbox"
            checked={formData.twoFAEnabled}
            id="twoFAEnabled"
            onChange={(event: any) => {
              console.log(event.target.checked);
              setFormData({
                twoFAEnabled: event.target.checked,
              });
            }}
          />
          Two Factor Authentication
        </label>
      </div>
      {formError ? <p className="text-sm text-rose-400">{formError}</p> : null}
      <button
        type="submit"
        className="rounded-lg bg-cyan-600 px-4 py-2 text-sm text-white hover:bg-cyan-700"
      >
        {loading ? "Loading..." : " Save MFA"}
      </button>
    </form>
  );
};

export default TwoFAForm;
