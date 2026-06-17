import PrivateRoute from "@/components/shared/PrivateRoute";
import ProfilePage from "@/components/auth/ProfilePage";

export const metadata = { title: "My Profile" };

export default function Profile() {
  return (
    <PrivateRoute>
      <ProfilePage />
    </PrivateRoute>
  );
}
