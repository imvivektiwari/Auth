"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TextField from "@/ui/TextField/TextField";

const TwoFAForm = () => {
  const [session, setSession] = useState<any>(null);
  const [formData, setFormData] = useState({
    password: "",
    twoFAEnabled: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formError, setFormError] = useState("");

  const fetchSession = async () => {
    const sessionData = await authClient.getSession();
    console.log(sessionData);
    setSession(sessionData);
    setFormData((prev) => ({
      ...prev,
      twoFAEnabled: sessionData?.data?.user?.twoFactorEnabled || false,
    }));
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    const password = formData.password;
    const twoFAEnabled = formData.twoFAEnabled;
    try {
      let res = null;
      if (twoFAEnabled) {
        res = await authClient.twoFactor.enable({
          password,
          issuer: "My App",
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

  const handleChange = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (name == "twoFAEnabled") {
      setFormData((prev) => ({
        ...prev,
        [name]: event.target.checked,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  return (
    <form className="mt-6 mb-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="twoFAEnabled" className="block text-sm font-medium">
          <input
            type="checkbox"
            checked={formData.twoFAEnabled}
            id="twoFAEnabled"
            onChange={(event) => handleChange("twoFAEnabled", event)}
            className="mr-3"
          />
          Two Factor Authentication
        </label>
      </div>

      <TextField
        name="password"
        type="password"
        value={formData.password}
        label="Password"
        placeholder="Enter your password"
        rightLabel={
          <div className="mb-5">
            <Link href="/forgot-password">Forgot Password?</Link>
          </div>
        }
        onChange={(event) => handleChange("password", event)}
      />

      {formError ? <p className="text-sm text-rose-400">{formError}</p> : null}
      <button
        disabled={loading}
        type="submit"
        className="flex justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        {loading ? "Loading..." : " Save MFA"}
      </button>
    </form>
  );
};

export default TwoFAForm;
