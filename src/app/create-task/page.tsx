"use client";

import Navbar from "@/components/Navbar";
import React, { useState } from "react";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("low");

  const [assignedTo, setAssignedTo] =
    useState("Varuniga");

  const [role, setRole] =
    useState("user");

  const [dueDate, setDueDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "/api/tasks",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            title,
            description,
            priority,
            assignedTo,
            role,
            dueDate,
            status: "todo",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to create task"
        );
      }

      setTitle("");
      setDescription("");
      setPriority("low");
      setAssignedTo("Varuniga");
      setRole("user");
      setDueDate("");

      alert(
        "✅ Task created successfully!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "❌ Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-cyan-100 p-8">

        <div className="max-w-4xl mx-auto">

          <div className="mb-8">

            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create New Task 🚀
            </h1>

            <p className="text-slate-500 mt-3">
              Assign tasks and manage
              your team workflow.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6"
          >

            <div>

              <label className="block font-semibold mb-2">
                Task Title
              </label>

              <input
                type="text"
                required
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                placeholder="Enter task title"
                className="w-full p-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            <div>

              <label className="block font-semibold mb-2">
                Description
              </label>

              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Describe the task..."
                className="w-full p-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="block font-semibold mb-2">
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(
                      e.target.value
                    )
                  }
                  className="w-full p-4 rounded-2xl border border-slate-300"
                >
                  <option value="low">
                    🟢 Low
                  </option>

                  <option value="medium">
                    🟡 Medium
                  </option>

                  <option value="high">
                    🔴 High
                  </option>
                </select>

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Assign To
                </label>

                <select
                  value={assignedTo}
                  onChange={(e) =>
                    setAssignedTo(
                      e.target.value
                    )
                  }
                  className="w-full p-4 rounded-2xl border border-slate-300"
                >
                  <option>
                    Varuniga
                  </option>

                  <option>
                    Rahul
                  </option>

                  <option>
                    Priya
                  </option>

                  <option>
                    Arun
                  </option>
                </select>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="block font-semibold mb-2">
                  Role
                </label>

                <select
                  value={role}
                  onChange={(e) =>
                    setRole(
                      e.target.value
                    )
                  }
                  className="w-full p-4 rounded-2xl border border-slate-300"
                >
                  <option value="user">
                    👤 User
                  </option>

                  <option value="admin">
                    👑 Admin
                  </option>
                </select>

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Due Date
                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) =>
                    setDueDate(
                      e.target.value
                    )
                  }
                  className="w-full p-4 rounded-2xl border border-slate-300"
                />

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:opacity-90 transition"
            >
              {loading
                ? "Creating..."
                : "🚀 Create Task"}
            </button>

          </form>

        </div>

      </div>
    </>
  );
};

export default CreateTask;