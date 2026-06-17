"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { FiEdit2, FiTrash2, FiEye, FiPlusCircle } from "react-icons/fi";
import { useForm } from "react-hook-form";

const CATEGORIES = ["Tech", "Health", "AI", "Education", "Finance", "Social", "Environment", "Other"];
const FALLBACK = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=70";

export default function MyIdeasPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const [editingIdea, setEditingIdea] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { data: ideas = [], isLoading } = useQuery({
    queryKey: ["my-ideas", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-ideas/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/ideas/${id}`),
    onSuccess: () => {
      toast.success("Idea deleted");
      setDeleteId(null);
      qc.invalidateQueries({ queryKey: ["my-ideas"] });
    },
    onError: () => toast.error("Failed to delete idea"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => axiosSecure.put(`/ideas/${id}`, data),
    onSuccess: () => {
      toast.success("Idea updated!");
      setEditingIdea(null);
      qc.invalidateQueries({ queryKey: ["my-ideas"] });
    },
    onError: () => toast.error("Failed to update idea"),
  });

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Ideas</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">You have shared {ideas.length} idea{ideas.length !== 1 ? "s" : ""}</p>
          </div>
          <Link href="/add-idea" className="btn-primary flex items-center gap-2">
            <FiPlusCircle size={16} /> New Idea
          </Link>
        </div>

        {ideas.length === 0 ? (
          <div className="text-center py-24 card">
            <p className="text-5xl mb-4">💡</p>
            <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">No ideas yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Share your first startup idea with the community!</p>
            <Link href="/add-idea" className="btn-primary">Add an Idea</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <div key={idea._id} className="card overflow-hidden group">
                <div className="relative h-40">
                  <Image src={idea.imageURL || FALLBACK} alt={idea.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <span className="absolute top-3 left-3 badge bg-white/90 text-gray-800 text-xs">{idea.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-1">{idea.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">{idea.shortDescription}</p>
                  <div className="flex items-center gap-2">
                    <Link href={`/ideas/${idea._id}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <FiEye size={14} /> View
                    </Link>
                    <button
                      onClick={() => setEditingIdea(idea)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                    >
                      <FiEdit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(idea._id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium rounded-xl border border-red-200 dark:border-red-900/50 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <FiTrash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingIdea && (
          <EditModal
            idea={editingIdea}
            onClose={() => setEditingIdea(null)}
            onSave={(data) => updateMutation.mutate({ id: editingIdea._id, data })}
            loading={updateMutation.isPending}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
              <div className="text-5xl mb-4">🗑️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Idea?</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">This action cannot be undone. All comments will also be deleted.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                <button onClick={() => deleteMutation.mutate(deleteId)} disabled={deleteMutation.isPending} className="flex-1 btn-danger py-2.5 text-sm">
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EditModal({ idea, onClose, onSave, loading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: idea.title,
      shortDescription: idea.shortDescription,
      detailedDescription: idea.detailedDescription,
      category: idea.category,
      tags: idea.tags?.join(", "),
      imageURL: idea.imageURL,
      estimatedBudget: idea.estimatedBudget,
      targetAudience: idea.targetAudience,
      problemStatement: idea.problemStatement,
      proposedSolution: idea.proposedSolution,
    },
  });

  const onSubmit = (data) => {
    const tags = data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
    onSave({ ...data, tags });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Idea</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Title *</label>
            <input {...register("title", { required: true })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Short Description *</label>
            <textarea {...register("shortDescription", { required: true })} rows={2} className="input-field resize-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Category *</label>
            <select {...register("category", { required: true })} className="input-field cursor-pointer">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Cover Image URL</label>
            <input {...register("imageURL")} className="input-field" type="url" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Tags</label>
            <input {...register("tags")} className="input-field" placeholder="tag1, tag2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Problem Statement *</label>
            <textarea {...register("problemStatement", { required: true })} rows={3} className="input-field resize-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Proposed Solution *</label>
            <textarea {...register("proposedSolution", { required: true })} rows={3} className="input-field resize-none" />
          </div>
          <div className="pt-4 flex gap-3 sticky bottom-0 bg-white dark:bg-gray-900 pb-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 btn-primary text-sm">{loading ? "Saving..." : "Save Changes"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
