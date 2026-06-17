import PrivateRoute from "@/components/shared/PrivateRoute";
import MyIdeasPage from "@/components/ideas/MyIdeasPage";

export const metadata = { title: "My Ideas" };

export default function MyIdeas() {
  return (
    <PrivateRoute>
      <MyIdeasPage />
    </PrivateRoute>
  );
}
