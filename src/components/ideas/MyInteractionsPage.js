"use client";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Link from "next/link";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { FiMessageCircle, FiExternalLink } from "react-icons/fi";

export default function MyInteractionsPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["my-comments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-comments/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Interactions</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Ideas you've commented on</p>
        </div>

        {comments.length === 0 ? (
          <div className="text-center py-24 card">
            <FiMessageCircle size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">No interactions yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Start commenting on ideas to see your activity here.</p>
            <Link href="/ideas" className="btn-primary">Browse Ideas</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c._id} className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                  <FiMessageCircle className="text-indigo-600 dark:text-indigo-400" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <Link
                      href={`/ideas/${c.ideaId}`}
                      className="font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 truncate"
                    >
                      {c.ideaTitle}
                      <FiExternalLink size={12} className="flex-shrink-0" />
                    </Link>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{c.text}</p>
                  {c.updatedAt && (
                    <span className="text-xs text-gray-400 italic mt-1 block">edited</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
