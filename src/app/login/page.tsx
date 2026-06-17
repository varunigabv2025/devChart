"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Login Failed"
        );
        return;
      }

      localStorage.setItem(
        "userId",
        data.user.id
      );

      localStorage.setItem(
        "role",
        data.user.role
      );

      localStorage.setItem(
        "name",
        data.user.name
      );

      alert(
        "✅ Login Successful"
      );

      router.push(
        "/dashboard"
      );
    } catch (error) {
      console.error(error);

      alert(
        "❌ Login Failed"
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-cyan-100 flex items-center justify-center p-4">

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-4xl text-white shadow-lg">
            🚀
          </div>

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            DevChart
          </h1>

          <p className="text-slate-500 mt-3">
            Student Club Collaboration Platform
          </p>

        </div>

        {/* Demo Access */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">

          <h3 className="text-lg font-bold text-slate-800 mb-4">
            🚀 Quick Demo Access
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <button
              type="button"
              onClick={() => {
                setEmail(
                  "admin@devchart.com"
                );
                setPassword(
                  "admin123"
                );
              }}
              className="p-4 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 transition"
            >
              <p className="font-bold text-purple-700">
                👑 Admin Demo
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Full Workspace Access
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setEmail(
                  "member@devchart.com"
                );
                setPassword(
                  "member123"
                );
              }}
              className="p-4 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 transition"
            >
              <p className="font-bold text-blue-700">
                👤 Member Demo
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Standard Member Access
              </p>
            </button>

          </div>

        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="📧 Email Address"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full p-4 border border-slate-300 rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full p-4 border border-slate-300 rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <p className="text-center text-sm text-slate-500 mb-4">
          Select a demo account above or enter your credentials
        </p>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition shadow-lg"
        >
          🔐 Login
        </button>

        <p className="text-center text-slate-400 text-sm mt-6">
          Built for Student Clubs • DevChart
        </p>

      </div>

    </div>
  );
}