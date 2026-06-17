"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail } from "react-icons/fi";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      toast.success("You're on the list! We'll be in touch soon.");
      setEmail("");
      setLoading(false);
    }, 800);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <FiMail className="text-white" size={26} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Stay in the Loop
        </h2>
        <p className="text-indigo-100 mb-8 text-lg">
          Get weekly updates on the hottest startup ideas and innovation trends.
          No spam, ever.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-5 py-3.5 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/30"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-indigo-600 font-bold px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-70 flex-shrink-0"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
