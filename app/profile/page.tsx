import { authRequired } from "@/lib/auth-utils";
import ProfilePage from "@/pages/UpdatePasswordPage";

const Profile = async () => {
  await authRequired();
  return <ProfilePage />;
};

export default Profile;
