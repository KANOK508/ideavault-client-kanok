"use client";
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "@/lib/axios";
import IdeaCard from "@/components/home/IdeaCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import Link from "next/link";

const CATEGORIES = ["all", "Tech", "Health", "AI", "Education", "Finance", "Social", "Environment", "Other"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "popular", label: "Most Popular" },
];

export default function IdeasPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["ideas", search, category, sort, page],
    queryFn: async () => {
      const params = { sort, page, limit: 9 };
      if (search) params.search = search;
      if (category !== "all") params.category = category;
      const res = await axiosPublic.get("/ideas", { params });
      return res.data;
    },
    keepPreviousData: true,
  });

  const ideas = data?.ideas || [];
  const totalPages = data?.totalPages || 1;

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const clearSearch = () => {
    setSearch("");
    setPage(1);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            Explore Ideas
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Discover {data?.total || "..."} startup ideas from our community
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search ideas by title..."
              value={search}
              onChange={handleSearch}
              className="input-field pl-11 pr-10"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 capitalize ${
                  category === cat
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="input-field w-auto min-w-[160px] cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : ideas.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">💡</p>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              No ideas found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {search ? `No results for "${search}"` : "Be the first to share an idea!"}
            </p>
            <Link href="/add-idea" className="btn-primary">
              Add an Idea
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {ideas.map((idea) => (
                <IdeaCard key={idea._id} idea={idea} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                      page === p
                        ? "bg-indigo-600 text-white shadow-md"
                        : "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
