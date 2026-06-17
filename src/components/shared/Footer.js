// import Link from "next/link";
// import { HiLightBulb } from "react-icons/hi";
// import {
//   FaGithub,
//   FaLinkedin,
// } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-950 text-gray-400 pt-14 pb-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
//           {/* Brand */}
//           <div className="lg:col-span-2">
//             <Link href="/" className="flex items-center gap-2 mb-4">
//               <HiLightBulb className="text-3xl text-indigo-400" />
//               <span className="text-xl font-extrabold text-white">IdeaVault</span>
//             </Link>
//             <p className="text-sm leading-relaxed max-w-xs">
//               A community-driven platform where startup ideas come to life.
//               Share, discover, and validate your next big idea.
//             </p>
//             <div className="flex gap-4 mt-5">
//               <a
//                 href="#"
//                 className="text-gray-500 hover:text-white transition-colors"
//                 aria-label="GitHub"
//               >
//                 <FaGithub size={20} />
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-500 hover:text-white transition-colors"
//                 aria-label="X (Twitter)"
//               >
//                 <FaXTwitter size={20} />
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-500 hover:text-white transition-colors"
//                 aria-label="LinkedIn"
//               >
//                 <FaLinkedin size={20} />
//               </a>
//             </div>
//           </div>

//           {/* Platform */}
//           <div>
//             <h4 className="text-white font-semibold mb-4">Platform</h4>
//             <ul className="space-y-2 text-sm">
//               {[
//                 { href: "/ideas", label: "Browse Ideas" },
//                 { href: "/add-idea", label: "Submit an Idea" },
//                 { href: "/my-ideas", label: "My Ideas" },
//                 { href: "/my-interactions", label: "My Interactions" },
//               ].map((l) => (
//                 <li key={l.href}>
//                   <Link
//                     href={l.href}
//                     className="hover:text-indigo-400 transition-colors"
//                   >
//                     {l.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Categories */}
//           <div>
//             <h4 className="text-white font-semibold mb-4">Categories</h4>
//             <ul className="space-y-2 text-sm">
//               {["Tech", "Health", "AI", "Education", "Finance", "Social"].map(
//                 (c) => (
//                   <li key={c}>
//                     <Link
//                       href={`/ideas?category=${c}`}
//                       className="hover:text-indigo-400 transition-colors"
//                     >
//                       {c}
//                     </Link>
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Contact & copyright */}
//         <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
//           <p>© {new Date().getFullYear()} IdeaVault. All rights reserved.</p>
//           <p>
//             Contact:{" "}
//             <a
//               href="mailto:hello@ideavault.io"
//               className="text-indigo-400 hover:underline"
//             >
//              kanokfaishalhaque018@gmail.com
//             </a>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }




import Link from "next/link";
import { HiLightBulb } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-gray-950 to-indigo-950 text-gray-400 pt-16 pb-8 border-t border-indigo-950/50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Floating Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          
          {/* Card 1: Brand Info (Spans 6 columns on medium, 5 on large layouts) */}
          <div className="md:col-span-6 lg:col-span-5 p-6 rounded-2xl bg-gray-900/40 backdrop-blur-md border border-gray-800/60 flex flex-col justify-between shadow-xl">
            <div>
              <Link href="/" className="group inline-flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 group-hover:border-indigo-500/40 transition-all duration-300">
                  <HiLightBulb className="text-xl text-indigo-400" />
                </div>
                <span className="text-xl font-black text-white tracking-tight">
                  Idea<span className="text-indigo-400">Vault</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-gray-400/90">
                A community-driven incubator platform where startup concepts evolve into market-ready ventures. Share, discover, and validate your next big milestone.
              </p>
            </div>

            {/* Social Icons inside Brand Card */}
            <div className="flex gap-3 mt-6">
              {[
                { href: "#", icon: <FaGithub size={18} />, label: "GitHub" },
                { href: "#", icon: <FaXTwitter size={16} />, label: "X" },
                { href: "#", icon: <FaLinkedin size={18} />, label: "LinkedIn" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-950/60 text-gray-500 hover:text-indigo-400 border border-gray-800/40 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Card 2: Platform Menu Navigation Links (Spans 3 columns) */}
          <div className="md:col-span-3 p-6 rounded-2xl bg-gray-900/40 backdrop-blur-md border border-gray-800/60 shadow-xl">
            <h4 className="text-xs font-bold tracking-wider text-gray-200 uppercase mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/ideas", label: "Browse Ideas" },
                { href: "/add-idea", label: "Submit an Idea" },
                { href: "/my-ideas", label: "My Ideas" },
                { href: "/my-interactions", label: "My Interactions" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block hover:text-indigo-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Categories Filter Lists (Spans 4 columns) */}
          <div className="md:col-span-3 lg:col-span-4 p-6 rounded-2xl bg-gray-900/40 backdrop-blur-md border border-gray-800/60 shadow-xl">
            <h4 className="text-xs font-bold tracking-wider text-gray-200 uppercase mb-4">
              Categories
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {["Tech", "Health", "AI", "Education", "Finance", "Social"].map((category) => (
                <Link
                  key={category}
                  href={`/ideas?category=${category}`}
                  className="p-2 rounded-lg bg-gray-950/30 hover:bg-indigo-950/40 text-gray-400 hover:text-indigo-400 border border-gray-900/50 hover:border-indigo-500/20 transition-all duration-200"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Base Copyright Info Bar */}
        <div className="pt-6 border-t border-gray-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-wide text-gray-500">
          <p>© {new Date().getFullYear()} IdeaVault. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-normal">
            <span>Contact:</span>
            <a
              href="mailto:kanokfaishalhaque018@gmail.com"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              kanokfaishalhaque018@gmail.com
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}