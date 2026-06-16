"use client";

import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";
import React, { useEffect, useState } from "react";

type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: "todo" | "inprogress" | "done";
  assignedTo: string;
  dueDate: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] =
  useState<Task | null>(null);

  async function fetchTasks() {
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleStatusChange(
    id: string,
    status: "todo" | "inprogress" | "done"
  ) {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "done"
  ).length;

  const filteredTasks = tasks.filter(
    (task) =>
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      
     {editingTask && (
  <div
    className="fixed bg-red-600 text-white p-6 rounded-xl"
    style={{
      top: "120px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 99999,
    }}
  >
    Editing: {editingTask.title}
  </div>
)}

      <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-cyan-100 p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Student Club Workspace 🚀
            </h1>

            <p className="text-slate-500 mt-3 text-xl">
              Manage events, members, tasks and announcements in one place.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-5 mb-8">

            <div className="bg-white rounded-3xl shadow-lg p-5">
              <h3 className="text-slate-500">
                Total Tasks
              </h3>

              <p className="text-3xl font-bold">
                {tasks.length}
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-5">
              <h3 className="text-slate-500">
                Pending
              </h3>

              <p className="text-3xl font-bold text-orange-500">
                {pendingTasks}
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-5">
              <h3 className="text-slate-500">
                Completed
              </h3>

              <p className="text-3xl font-bold text-green-500">
                {completedTasks}
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-5">
              <h3 className="text-slate-500">
                Completion Rate
              </h3>

              <p className="text-3xl font-bold text-indigo-600">
                {tasks.length
                  ? Math.round(
                      (completedTasks /
                        tasks.length) *
                        100
                    )
                  : 0}
                %
              </p>
            </div>

          </div>

          {/* Announcement */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl shadow-xl p-7 mb-8">

            <h2 className="text-2xl font-bold mb-2">
              📢 Club Announcement
            </h2>

            <p>
              AI Workshop scheduled on June 20.
              Complete assigned tasks before the event.
            </p>

          </div>

          {/* Tasks */}
          <div className="bg-white rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              📋 All Tasks
            </h2>

            <input
              type="text"
              placeholder="🔍 Search tasks..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full p-4 mb-6 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {loading ? (
              <p>Loading tasks...</p>
            ) : filteredTasks.length === 0 ? (
              <p className="text-slate-500">
                No tasks found.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredTasks.map((task) => (
                  <TaskCard
  key={task._id}
  id={task._id}
  title={task.title}
  description={task.description}
  priority={task.priority}
  status={task.status}
  assignedTo={task.assignedTo}
  dueDate={task.dueDate}
  onDelete={handleDelete}
  onStatusChange={handleStatusChange}
  onEdit={() => setEditingTask(task)}
/>
                ))}

              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
}