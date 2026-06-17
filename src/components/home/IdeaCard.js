import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiMessageCircle, FiArrowRight } from "react-icons/fi";

const CATEGORY_COLORS = {
  Tech: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Health: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  AI: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Education: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  Finance: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Social: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  Other: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80";

export default function IdeaCard({ idea }) {
  const {
    _id,
    title,
    shortDescription,
    category,
    imageURL,
    likes = 0,
    authorName,
    createdAt,
  } = idea;

  const colorClass = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
  const date = createdAt ? new Date(createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

  return (
    <div className="card group flex flex-col h-full overflow-hidden">
      {/* Image */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <Image
          src={imageURL || FALLBACK_IMAGE}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <span className={`absolute top-3 left-3 badge ${colorClass}`}>
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-snug mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {shortDescription}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mb-4">
          <span className="font-medium text-gray-600 dark:text-gray-300 truncate max-w-[120px]">
            {authorName}
          </span>
          <span>{date}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
            <span className="flex items-center gap-1.5">
              <FiHeart size={14} className="text-pink-500" />
              {likes}
            </span>
          </div>
          <Link
            href={`/ideas/${_id}`}
            className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:gap-2.5 transition-all duration-200"
          >
            View Details <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
