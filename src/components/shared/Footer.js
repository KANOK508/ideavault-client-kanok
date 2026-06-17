import Link from "next/link";
import { HiLightBulb } from "react-icons/hi";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <HiLightBulb className="text-3xl text-indigo-400" />
              <span className="text-xl font-extrabold text-white">IdeaVault</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              A community-driven platform where startup ideas come to life.
              Share, discover, and validate your next big idea.
            </p>
            <div className="flex gap-4 mt-5">
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/ideas", label: "Browse Ideas" },
                { href: "/add-idea", label: "Submit an Idea" },
                { href: "/my-ideas", label: "My Ideas" },
                { href: "/my-interactions", label: "My Interactions" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {["Tech", "Health", "AI", "Education", "Finance", "Social"].map(
                (c) => (
                  <li key={c}>
                    <Link
                      href={`/ideas?category=${c}`}
                      className="hover:text-indigo-400 transition-colors"
                    >
                      {c}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Contact & copyright */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} IdeaVault. All rights reserved.</p>
          <p>
            Contact:{" "}
            <a
              href="mailto:hello@ideavault.io"
              className="text-indigo-400 hover:underline"
            >
             kanokfaishalhaque018@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
