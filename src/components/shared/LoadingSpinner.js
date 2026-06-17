export default function LoadingSpinner({ fullPage = false }) {
  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-16">
      <Spinner />
    </div>
  );
}

function Spinner() {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-gray-800"></div>
      <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 animate-spin"></div>
    </div>
  );
}
