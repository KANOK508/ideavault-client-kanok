"use client";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiPlusCircle } from "react-icons/fi";

const CATEGORIES = ["Tech", "Health", "AI", "Education", "Finance", "Social", "Environment", "Other"];

export default function AddIdeaForm() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    const tags = data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
    const idea = {
      ...data,
      tags,
      authorName: user.displayName,
      authorEmail: user.email,
      authorPhoto: user.photoURL,
    };
    try {
      await axiosSecure.post("/ideas", idea);
      toast.success("Idea submitted successfully!");
      reset();
      router.push("/my-ideas");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit idea");
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900/30">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <FiPlusCircle className="text-indigo-600" /> Share Your Idea
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Describe your startup concept and get community feedback
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-6">
          {/* Title */}
          <Field label="Idea Title *" error={errors.title?.message}>
            <input
              {...register("title", { required: "Title is required" })}
              className="input-field"
              placeholder="Your brilliant startup idea name"
            />
          </Field>

          {/* Short Description */}
          <Field label="Short Description *" error={errors.shortDescription?.message}>
            <textarea
              {...register("shortDescription", { required: "Short description is required" })}
              rows={2}
              className="input-field resize-none"
              placeholder="One or two sentences that hook the reader"
            />
          </Field>

          {/* Detailed Description */}
          <Field label="Detailed Description">
            <textarea
              {...register("detailedDescription")}
              rows={4}
              className="input-field resize-none"
              placeholder="Expand on your idea — features, business model, revenue streams..."
            />
          </Field>

          {/* Category */}
          <Field label="Category *" error={errors.category?.message}>
            <select
              {...register("category", { required: "Category is required" })}
              className="input-field cursor-pointer"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          {/* Tags */}
          <Field label="Tags (comma-separated, optional)">
            <input
              {...register("tags")}
              className="input-field"
              placeholder="e.g. saas, marketplace, b2b"
            />
          </Field>

          {/* Image URL */}
          <Field label="Cover Image URL">
            <input
              {...register("imageURL")}
              className="input-field"
              placeholder="https://images.unsplash.com/..."
              type="url"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Estimated Budget */}
            <Field label="Estimated Budget (optional)">
              <input
                {...register("estimatedBudget")}
                className="input-field"
                placeholder="e.g. $50K - $200K"
              />
            </Field>

            {/* Target Audience */}
            <Field label="Target Audience *" error={errors.targetAudience?.message}>
              <input
                {...register("targetAudience", { required: "Target audience is required" })}
                className="input-field"
                placeholder="e.g. Small business owners"
              />
            </Field>
          </div>

          {/* Problem Statement */}
          <Field label="Problem Statement *" error={errors.problemStatement?.message}>
            <textarea
              {...register("problemStatement", { required: "Problem statement is required" })}
              rows={3}
              className="input-field resize-none"
              placeholder="What problem does your idea solve?"
            />
          </Field>

          {/* Proposed Solution */}
          <Field label="Proposed Solution *" error={errors.proposedSolution?.message}>
            <textarea
              {...register("proposedSolution", { required: "Proposed solution is required" })}
              rows={3}
              className="input-field resize-none"
              placeholder="How does your idea solve the problem?"
            />
          </Field>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-base">
            {isSubmitting ? "Submitting..." : "Submit Idea "}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children, error }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
