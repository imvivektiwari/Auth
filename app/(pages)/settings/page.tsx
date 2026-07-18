import { authRequired } from "@/lib/auth-utils";
import UpdatePasswordForm from "@/components/UpdatePasswordForm";
import Tabs from "@/ui/tabs/Tabs";
import TwoFAForm from "@/components/MFAForm";

const Settings = async () => {
  await authRequired();

  return (
    <Tabs
      slots={{
        tabs: [
          {
            label: "Update Password",
          },
          {
            label: "Update 2FA",
          },
        ],
        tabContent: [
          <UpdatePasswordForm key={"updatePasswordForm"} />,
          <TwoFAForm key={"TwoFAForm"} />,
        ],
      }}
    />
  );
};

export default Settings;
