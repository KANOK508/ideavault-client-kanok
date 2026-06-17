// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// import { usePathname } from "next/navigation";
// import useAuth from "@/hooks/useAuth";
// import toast from "react-hot-toast";
// import {
//   FiMenu,
//   FiX,
//   FiSun,
//   FiMoon,
//   FiLogOut,
//   FiUser,
//   FiChevronDown,
// } from "react-icons/fi";
// import { HiLightBulb } from "react-icons/hi";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/ideas", label: "IDEAS" },
//   { href: "/add-idea", label: "ADD IDEA", private: true },
//   { href: "/my-ideas", label: "MY IDEAS", private: true },
//   { href: "/my-interactions", label: "MY INTERACTION", private: true },
// ];

// export default function Navbar() {
//   const { user, logout, theme, toggleTheme, loading } = useAuth();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const pathname = usePathname();

//   const handleLogout = async () => {
//     await logout();
//     toast.success("Logged out successfully!");
//     setDropdownOpen(false);
//   };

//   const visibleLinks = navLinks.filter((l) => !l.private || user);

//   return (
//     <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2 group">
//             <HiLightBulb className="text-3xl text-yellow-600 group-hover:rotate-12 transition-transform duration-300" />
//             <span className="text-xl font-extrabold text-yellow-600 tracking-tight">
//               IdeaVault
//             </span>
//           </Link>

//           {/* Desktop links */}
//           <div className="hidden md:flex items-center gap-1">
//             {visibleLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
//                   pathname === link.href
//                     ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
//                     : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Right side */}
//           <div className="flex items-center gap-3">
//             {/* Theme toggle */}
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors"
//               aria-label="Toggle theme"
//             >
//               {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
//             </button>

//             {!loading && (
//               <>
//                 {user ? (
//                   <div className="relative">
//                     <button
//                       onClick={() => setDropdownOpen(!dropdownOpen)}
//                       className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                     >
//                       <Image
//                         src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "User")}&background=6366f1&color=fff`}
//                         alt={user.displayName || "User"}
//                         width={36}
//                         height={36}
//                         className="rounded-full object-cover"
//                       />
//                       <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
//                         {user.displayName}
//                       </span>
//                       <FiChevronDown
//                         size={14}
//                         className={`text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
//                       />
//                     </button>

//                     {dropdownOpen && (
//                       <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 z-50">
//                         <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
//                           <p className="text-xs text-gray-500">Signed in as</p>
//                           <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
//                             {user.email}
//                           </p>
//                         </div>
//                         <Link
//                           href="/profile"
//                           onClick={() => setDropdownOpen(false)}
//                           className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors"
//                         >
//                           <FiUser size={15} /> Profile
//                         </Link>
//                         <button
//                           onClick={handleLogout}
//                           className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors"
//                         >
//                           <FiLogOut size={15} /> Logout
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <Link
//                       href="/login"
//                       className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-lg transition-colors"
//                     >
//                       Login
//                     </Link>
//                     <Link href="/signup" className="btn-primary text-sm">
//                       Register
//                     </Link>
//                   </div>
//                 )}
//               </>
//             )}

//             {/* Mobile menu button */}
//             <button
//               className="md:hidden p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-800"
//               onClick={() => setMobileOpen(!mobileOpen)}
//             >
//               {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {mobileOpen && (
//         <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 pb-4">
//           <div className="flex flex-col gap-1 pt-3">
//             {visibleLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setMobileOpen(false)}
//                 className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
//                   pathname === link.href
//                     ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600"
//                     : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }






"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiLogOut,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";
import { HiLightBulb } from "react-icons/hi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/add-idea", label: "Add Idea", private: true },
  { href: "/my-ideas", label: "My Ideas", private: true },
  { href: "/my-interactions", label: "My Interactions", private: true },
];

export default function Navbar() {
  const { user, logout, theme, toggleTheme, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
    setDropdownOpen(false);
  };

  const visibleLinks = navLinks.filter((l) => !l.private || user);

  return (
    // Floating wrapper with modern layout breathing room
    <div className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4 bg-transparent">
      <nav className="max-w-7xl mx-auto rounded-2xl bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl border border-gray-200/50 dark:border-indigo-950/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] transition-all duration-300">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Group */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 group-hover:border-indigo-500/40 transition-all duration-300">
                <HiLightBulb className="text-xl text-indigo-500 dark:text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
                Idea<span className="text-indigo-500 dark:text-indigo-400">Vault</span>
              </span>
            </Link>

            {/* Desktop Navigation Cards/Pills */}
            <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-gray-100/40 dark:bg-gray-900/30 border border-gray-200/30 dark:border-gray-800/20">
              {visibleLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? "bg-white dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200/40 dark:border-indigo-500/20"
                        : "text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/50 dark:hover:bg-gray-900/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Control Center */}
            <div className="flex items-center gap-2">
              {/* Theme Selector Button Card */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200/40 dark:border-gray-800/40 text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-900/80 transition-all shadow-sm"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
              </button>

              {!loading && (
                <>
                  {user ? (
                    /* User Profile Navigation Dropdown Card */
                    <div className="relative">
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 p-1.5 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200/40 dark:border-gray-800/40 hover:bg-white dark:hover:bg-gray-900/80 transition-all shadow-sm"
                      >
                        <Image
                          src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "User")}&background=6366f1&color=fff`}
                          alt={user.displayName || "User"}
                          width={28}
                          height={28}
                          className="rounded-lg object-cover ring-1 ring-gray-200 dark:ring-gray-800"
                        />
                        <span className="hidden sm:block text-xs font-semibold text-gray-700 dark:text-gray-300 max-w-[90px] truncate">
                          {user.displayName}
                        </span>
                        <FiChevronDown
                          size={13}
                          className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/60 dark:border-indigo-950/60 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                          <div className="px-3 py-2.5 mb-1 rounded-xl bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-900">
                            <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Account</p>
                            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate mt-0.5">
                              {user.email}
                            </p>
                          </div>
                          <Link
                            href="/profile"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                          >
                            <FiUser size={14} className="text-gray-400" /> My Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 w-full text-left transition-colors"
                          >
                            <FiLogOut size={14} /> Log Out
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Public Gate Action Controls */
                    <div className="flex items-center gap-1.5">
                      <Link
                        href="/login"
                        className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 px-3 py-2 rounded-xl transition-colors"
                      >
                        Login
                      </Link>
                      <Link 
                        href="/signup" 
                        className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-indigo-500/10 transition-all duration-200"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </>
              )}

              {/* Mobile Card Menu Icon */}
              <button
                className="md:hidden p-2 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200/40 dark:border-gray-800/40 text-gray-500 hover:text-indigo-500"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Panel Box */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200/50 dark:border-indigo-950/40 px-4 py-3 bg-white/95 dark:bg-gray-950/95 rounded-b-2xl">
            <div className="flex flex-col gap-1">
              {visibleLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40"
                        : "text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}