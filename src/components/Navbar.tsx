"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [role, setRole] =
    useState("");

  useEffect(() => {
    const storedRole =
      localStorage.getItem(
        "role"
      );

    if (storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
    }
  }, []);

  function handleLogout() {
    localStorage.clear();

    window.location.href =
      "/login";
  }

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

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {!isLoggedIn ? (
            <>
              <Link href="/login">
                <button className="px-5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <button className="px-5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition">
                  Dashboard
                </button>
              </Link>

              <Link href="/kanban">
                <button className="px-5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition">
                  Kanban
                </button>
              </Link>
              <Link href="/announcements">
  <button className="px-5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition">
    Announcements
  </button>
</Link>
<Link href="/team">
  <button className="px-5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition">
    Team
  </button>
</Link>

              {role === "admin" && (
                <Link href="/create-task">
                  <button className="px-5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition">
                    Create Task
                  </button>
                </Link>
              )}

              {/* Role Badge Only */}
              <div
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {role === "admin"
                  ? "👑 Admin"
                  : "👤 Member"}
              </div>

              <button
                onClick={
                  handleLogout
                }
                className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}