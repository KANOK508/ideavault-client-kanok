import IdeaDetailPage from "@/components/ideas/IdeaDetailPage";

export const metadata = { title: "Idea Details" };

export default function IdeaDetail({ params }) {
  return <IdeaDetailPage id={params.id} />;
}
