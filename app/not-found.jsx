import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-slate-800">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-slate-700">Page Not Found</h2>
      <p className="mt-2 text-slate-500 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
