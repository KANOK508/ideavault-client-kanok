import PrivateRoute from "@/components/shared/PrivateRoute";
import MyInteractionsPage from "@/components/ideas/MyInteractionsPage";

export const metadata = { title: "My Interactions" };

export default function MyInteractions() {
  return (
    <PrivateRoute>
      <MyInteractionsPage />
    </PrivateRoute>
  );
}
