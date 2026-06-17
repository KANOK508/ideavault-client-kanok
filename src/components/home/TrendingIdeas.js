"use client";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "@/lib/axios";
import IdeaCard from "./IdeaCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Link from "next/link";
import { FiTrendingUp } from "react-icons/fi";

export default function TrendingIdeas() {
  const { data: ideas = [], isLoading } = useQuery({
    queryKey: ["trending-ideas"],
    queryFn: async () => {
      const res = await axiosPublic.get("/ideas/trending");
      return res.data;
    },
  });

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FiTrendingUp className="text-indigo-600" size={20} />
              <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                Hot Right Now
              </span>
            </div>
            <h2 className="section-title">Trending Ideas</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              The most exciting startup concepts from our community
            </p>
          </div>
          <Link href="/ideas" className="btn-outline flex-shrink-0">
            View All Ideas
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : ideas.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">No ideas yet. Be the first to share!</p>
            <Link href="/add-idea" className="btn-primary mt-4 inline-block">
              Add an Idea
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.slice(0, 6).map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
