"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosPublic from "@/lib/axios";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Image from "next/image";
import toast from "react-hot-toast";
import { FiHeart, FiMessageCircle, FiEdit2, FiTrash2, FiUser, FiClock, FiTarget, FiDollarSign } from "react-icons/fi";
import { HiLightBulb } from "react-icons/hi";
import Link from "next/link";

const CATEGORY_COLORS = {
  Tech: "bg-blue-100 text-blue-700",
  Health: "bg-green-100 text-green-700",
  AI: "bg-purple-100 text-purple-700",
  Education: "bg-yellow-100 text-yellow-700",
  Finance: "bg-emerald-100 text-emerald-700",
  Social: "bg-pink-100 text-pink-700",
  Other: "bg-gray-100 text-gray-700",
};

const FALLBACK = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80";

export default function IdeaDetailPage({ id }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const [comment, setComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [liked, setLiked] = useState(false);

  const { data: idea, isLoading } = useQuery({
    queryKey: ["idea", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/ideas/${id}`);
      return res.data;
    },
  });

  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/comments/${id}`);
      return res.data;
    },
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      const action = liked ? "unlike" : "like";
      await axiosSecure.patch(`/ideas/${id}/like`, { action });
      setLiked(!liked);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["idea", id] });
    },
    onError: () => toast.error("Please login to like ideas"),
  });

  const addCommentMutation = useMutation({
    mutationFn: async (text) => {
      await axiosSecure.post("/comments", {
        ideaId: id,
        text,
        userEmail: user.email,
        userName: user.displayName,
        userPhoto: user.photoURL,
      });
    },
    onSuccess: () => {
      setComment("");
      toast.success("Comment added!");
      qc.invalidateQueries({ queryKey: ["comments", id] });
    },
    onError: () => toast.error("Failed to add comment"),
  });

  const editCommentMutation = useMutation({
    mutationFn: async ({ cId, text }) => {
      await axiosSecure.patch(`/comments/${cId}`, { text });
    },
    onSuccess: () => {
      setEditCommentId(null);
      toast.success("Comment updated!");
      qc.invalidateQueries({ queryKey: ["comments", id] });
    },
    onError: () => toast.error("Failed to update comment"),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (cId) => {
      await axiosSecure.delete(`/comments/${cId}`);
    },
    onSuccess: () => {
      toast.success("Comment deleted");
      qc.invalidateQueries({ queryKey: ["comments", id] });
    },
    onError: () => toast.error("Failed to delete comment"),
  });

  if (isLoading) return <LoadingSpinner fullPage />;
  if (!idea) return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <p className="text-5xl mb-4">😕</p>
        <h2 className="text-2xl font-bold mb-2">Idea not found</h2>
        <Link href="/ideas" className="btn-primary mt-4">Browse Ideas</Link>
      </div>
    </div>
  );

  const colorClass = CATEGORY_COLORS[idea.category] || CATEGORY_COLORS.Other;
  const date = idea.createdAt ? new Date(idea.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero image */}
        <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden mb-8 shadow-xl">
          <Image src={idea.imageURL || FALLBACK} alt={idea.title} fill className="object-cover" sizes="(max-width: 900px) 100vw, 900px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <span className={`badge ${colorClass} text-sm`}>{idea.category}</span>
          </div>
        </div>

        {/* Title & meta */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
            {idea.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5"><FiUser size={14} /> {idea.authorName}</span>
            <span className="flex items-center gap-1.5"><FiClock size={14} /> {date}</span>
            {idea.targetAudience && (
              <span className="flex items-center gap-1.5"><FiTarget size={14} /> {idea.targetAudience}</span>
            )}
            {idea.estimatedBudget && (
              <span className="flex items-center gap-1.5"><FiDollarSign size={14} /> {idea.estimatedBudget}</span>
            )}
          </div>
        </div>

        {/* Tags */}
        {idea.tags && idea.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {idea.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-semibold">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Content sections */}
        <div className="space-y-6 mb-10">
          <Section title="Short Description" icon={<HiLightBulb />}>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{idea.shortDescription}</p>
          </Section>
          <Section title="Problem Statement" icon="🎯">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{idea.problemStatement}</p>
          </Section>
          <Section title="Proposed Solution" icon="💡">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{idea.proposedSolution}</p>
          </Section>
          {idea.detailedDescription && (
            <Section title="Detailed Description" icon="📋">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{idea.detailedDescription}</p>
            </Section>
          )}
        </div>

        {/* Likes */}
        <div className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-100 dark:border-gray-800">
          <button
            onClick={() => {
              if (!user) { toast.error("Please login to like ideas"); return; }
              likeMutation.mutate();
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              liked
                ? "bg-pink-500 text-white shadow-md shadow-pink-200"
                : "bg-pink-50 dark:bg-pink-900/20 text-pink-500 hover:bg-pink-100"
            }`}
          >
            <FiHeart size={16} className={liked ? "fill-white" : ""} />
            {(idea.likes || 0) + (liked ? 1 : 0)} Likes
          </button>
          <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <FiMessageCircle size={16} /> {comments.length} Comments
          </span>
        </div>

        {/* Comments section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Discussion ({comments.length})
          </h2>

          {/* Add comment */}
          {user ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!comment.trim()) return;
                addCommentMutation.mutate(comment);
              }}
              className="mb-8"
            >
              <div className="flex gap-3">
                <Image
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "U")}&background=6366f1&color=fff`}
                  alt={user.displayName || "You"}
                  width={40}
                  height={40}
                  className="rounded-full flex-shrink-0 object-cover"
                />
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts on this idea..."
                    rows={3}
                    className="input-field resize-none mb-2"
                  />
                  <button
                    type="submit"
                    disabled={addCommentMutation.isPending || !comment.trim()}
                    className="btn-primary text-sm disabled:opacity-60"
                  >
                    {addCommentMutation.isPending ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="mb-8 p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-3">Join the conversation!</p>
              <Link href="/login" className="btn-primary text-sm">Login to Comment</Link>
            </div>
          )}

          {/* Comments list */}
          {commentsLoading ? (
            <LoadingSpinner />
          ) : comments.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <FiMessageCircle size={40} className="mx-auto mb-3 opacity-40" />
              <p>No comments yet. Start the discussion!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c._id} className="card p-5 flex gap-3">
                  <Image
                    src={c.userPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.userName || "U")}&background=6366f1&color=fff`}
                    alt={c.userName}
                    width={38}
                    height={38}
                    className="rounded-full flex-shrink-0 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{c.userName}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>

                    {editCommentId === c._id ? (
                      <div>
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          rows={2}
                          className="input-field resize-none mb-2 text-sm"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => editCommentMutation.mutate({ cId: c._id, text: editText })}
                            disabled={editCommentMutation.isPending}
                            className="btn-primary text-xs px-3 py-1.5"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditCommentId(null)}
                            className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{c.text}</p>
                    )}

                    {user && user.email === c.userEmail && editCommentId !== c._id && (
                      <div className="flex gap-3 mt-2">
                        <button
                          onClick={() => { setEditCommentId(c._id); setEditText(c.text); }}
                          className="text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1"
                        >
                          <FiEdit2 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm("Delete this comment?")) {
                              deleteCommentMutation.mutate(c._id);
                            }
                          }}
                          className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1"
                        >
                          <FiTrash2 size={12} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="card p-6">
      <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-3">
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}
