import Link from "next/link";

export const metadata = { title: "404 – Page Not Found" };

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-indigo-600 text-9xl font-extrabold mb-4 select-none">404</div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Page Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link href="/" className="btn-primary">
        Go Back Home
      </Link>
    </div>
  );
}
