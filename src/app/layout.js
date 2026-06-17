import "./globals.css";
// import AuthProvider from "@/context/AuthProvider";
// import { EmailAuthProvider } from "firebase/auth/web-extension";
import AuthProvider from "../context/AuthProvider"
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/context/QueryProvider";

export const metadata = {
  title: {
    default: "IdeaVault – Startup Idea Sharing Platform",
    template: "%s | IdeaVault",
  },
  description:
    "Share your startup ideas, discover trending concepts, and collaborate with innovators worldwide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <QueryProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  borderRadius: "12px",
                  fontWeight: 500,
                },
              }}
            />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
