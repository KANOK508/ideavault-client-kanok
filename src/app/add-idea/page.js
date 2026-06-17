import PrivateRoute from "@/components/shared/PrivateRoute";
import AddIdeaForm from "@/components/ideas/AddIdeaForm";

export const metadata = { title: "Add an Idea" };

export default function AddIdea() {
  return (
    <PrivateRoute>
      <AddIdeaForm />
    </PrivateRoute>
  );
}
