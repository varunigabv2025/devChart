"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: "todo" | "inprogress" | "done";
  assignedTo: string;
  dueDate: string;
  role?: "admin" | "user";
};

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  async function fetchTasks() {
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();

      if (Array.isArray(data)) {
        setTasks(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "inprogress"
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "done"
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-cyan-100 p-8">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            📋 Kanban Board
          </h1>

          <div className="grid md:grid-cols-3 gap-6">

            {/* TODO */}
            <div className="bg-white rounded-3xl p-5 shadow-lg">

              <h2 className="text-xl font-bold text-slate-800 mb-4">
                📝 To Do ({todoTasks.length})
              </h2>

              <div className="space-y-4">

                {todoTasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-slate-50 rounded-2xl p-4 border"
                  >
                    <h3 className="font-bold">
                      {task.title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-2">
                      {task.description}
                    </p>

                    <div className="mt-3 flex justify-between text-sm">
                      <span>
                        👤 {task.assignedTo}
                      </span>

                      <span>
                        📅 {task.dueDate}
                      </span>
                    </div>
                  </div>
                ))}

              </div>

            </div>

            {/* IN PROGRESS */}
            <div className="bg-white rounded-3xl p-5 shadow-lg">

              <h2 className="text-xl font-bold text-orange-600 mb-4">
                ⚡ In Progress ({inProgressTasks.length})
              </h2>

              <div className="space-y-4">

                {inProgressTasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-orange-50 rounded-2xl p-4 border border-orange-200"
                  >
                    <h3 className="font-bold">
                      {task.title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-2">
                      {task.description}
                    </p>

                    <div className="mt-3 flex justify-between text-sm">
                      <span>
                        👤 {task.assignedTo}
                      </span>

                      <span>
                        📅 {task.dueDate}
                      </span>
                    </div>
                  </div>
                ))}

              </div>

            </div>

            {/* DONE */}
            <div className="bg-white rounded-3xl p-5 shadow-lg">

              <h2 className="text-xl font-bold text-green-600 mb-4">
                ✅ Done ({doneTasks.length})
              </h2>

              <div className="space-y-4">

                {doneTasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-green-50 rounded-2xl p-4 border border-green-200"
                  >
                    <h3 className="font-bold">
                      {task.title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-2">
                      {task.description}
                    </p>

                    <div className="mt-3 flex justify-between text-sm">
                      <span>
                        👤 {task.assignedTo}
                      </span>

                      <span>
                        📅 {task.dueDate}
                      </span>
                    </div>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}