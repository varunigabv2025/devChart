import Navbar from "@/components/Navbar";
import connectDB from "@/lib/mongodb";
import Link from "next/link";

export default async function Home() {
  await connectDB();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-8 py-20">

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Side */}
            <div>

              <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 font-medium">
                🚀 Student Club Collaboration Platform
              </span>

              <h1 className="text-6xl font-extrabold mt-6 text-slate-800 leading-tight">

                <span className="animate-word">
                  Manage
                </span>{" "}

                <span className="animate-word">
                  Your
                </span>{" "}

                <span className="animate-word">
                  Club,
                </span>

                <br />

                <span className="animate-word text-indigo-600">
                  Tasks
                </span>{" "}

                <span className="animate-word text-indigo-600">
                  &
                </span>{" "}

                <span className="animate-word text-indigo-600">
                  Events
                </span>

                <br />

                <span className="animate-word">
                  In
                </span>{" "}

                <span className="animate-word">
                  One
                </span>{" "}

                <span className="animate-word">
                  Place
                </span>

              </h1>

              <p className="text-slate-600 text-xl mt-6">
                Collaborate with members, assign tasks,
                manage events and track progress using a
                single platform built for student clubs.
              </p>

              <div className="mt-8">
                <Link href="/dashboard">
                  <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg">
                    🚀 Explore Workspace
                  </button>
                </Link>
              </div>

            </div>

            {/* Right Side */}
            <div>
              <img
                src="/logo.svg"
                alt="Club Platform"
                className="w-full max-w-lg mx-auto"
              />
            </div>

          </div>

          {/* Features */}

          <div className="grid md:grid-cols-3 gap-6 mt-24">

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all">
              <h2 className="text-2xl font-bold mb-3">
                📋 Task Management
              </h2>

              <p className="text-slate-500">
                Create, assign and track club tasks efficiently.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all">
              <h2 className="text-2xl font-bold mb-3">
                📢 Announcements
              </h2>

              <p className="text-slate-500">
                Share club-wide updates and important notices.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all">
              <h2 className="text-2xl font-bold mb-3">
                👥 Collaboration
              </h2>

              <p className="text-slate-500">
                Work together with members and manage events.
              </p>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}