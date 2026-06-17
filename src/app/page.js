import Banner from "@/components/home/Banner";
import TrendingIdeas from "@/components/home/TrendingIdeas";
import HowItWorks from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";

export const metadata = {
  title: "IdeaVault – Startup Idea Sharing Platform",
};

export default function HomePage() {
  return (
    <>
      <Banner />
      <TrendingIdeas />
      <HowItWorks />
      <Newsletter />
    </>
  );
}
