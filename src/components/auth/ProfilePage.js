"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { name: user?.displayName || "", photoURL: user?.photoURL || "" },
  });

  const onSubmit = async ({ name, photoURL }) => {
    try {
      await updateUserProfile(name, photoURL);
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const avatarSrc = user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || "U")}&background=6366f1&color=fff&size=200`;

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900/30">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">My Profile</h1>

        <div className="card p-8">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <Image
                src={avatarSrc}
                alt={user?.displayName || "User"}
                width={96}
                height={96}
                className="rounded-full object-cover ring-4 ring-indigo-100 dark:ring-indigo-900"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.displayName}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</p>
          </div>

          {!editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Display Name</label>
                <p className="text-gray-800 dark:text-gray-100 font-medium">{user?.displayName || "—"}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                <p className="text-gray-800 dark:text-gray-100 font-medium">{user?.email}</p>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="btn-primary flex items-center gap-2 mt-4"
              >
                <FiEdit2 size={15} /> Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Display Name</label>
                <input {...register("name", { required: true })} className="input-field" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Photo URL</label>
                <input {...register("photoURL")} type="url" className="input-field" placeholder="https://..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center gap-2">
                  <FiSave size={15} /> {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
                <button type="button" onClick={() => setEditing(false)} className="btn-outline flex items-center gap-2">
                  <FiX size={15} /> Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
