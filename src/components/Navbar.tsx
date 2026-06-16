import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <div className="cursor-pointer">
            <h1 className="text-3xl font-bold text-indigo-600">
              devChart
            </h1>

            <p className="text-xs text-slate-500">
              Student Club Collaboration Platform
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">

          <Link href="/dashboard">
            <button className="px-5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition-all duration-300">
              Dashboard
            </button>
          </Link>

          <Link href="/create-task">
            <button className="px-5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition-all duration-300">
              Create Task
            </button>
          </Link>

          <div className="w-11 h-11 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 text-lg font-semibold cursor-pointer hover:bg-indigo-100 transition-all duration-300">
            👤
          </div>

        </div>

      </div>
    </nav>
  );
}