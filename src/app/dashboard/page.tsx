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
  role?: "admin" | "user";
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] =
  useState("all");

const [roleFilter, setRoleFilter] =
  useState("all");
  const [editingTask, setEditingTask] =
  useState<any>(null);
  const [editTitle, setEditTitle] =
  useState("");

const [
  editDescription,
  setEditDescription,
] = useState("");

const [
  editPriority,
  setEditPriority,
] = useState("low");  

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
    const response = await fetch(
      `/api/tasks/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      alert("Delete Failed");
      return;
    }

    setTasks((prev: any) =>
      prev.filter(
        (task: any) =>
          task._id !== id
      )
    );
  } catch (error) {
    console.error(error);
  }
}
async function handleStatusChange(
  id: string,
  status:
    | "todo"
    | "inprogress"
    | "done"
) {
  try {
    const response = await fetch(
      `/api/tasks/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    if (!response.ok) {
      alert(
        "Status Update Failed"
      );
      return;
    }

    setTasks((prev) =>
      prev.map(
        (task: any) =>
          task._id === id
            ? {
                ...task,
                status,
              }
            : task
      )
    );
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
  const dueSoonTasks = tasks.filter((task) => {
  if (!task.dueDate) return false;

  const dueDate = new Date(task.dueDate);
  const today = new Date();

  const diff =
    (dueDate.getTime() - today.getTime()) /
    (1000 * 60 * 60 * 24);

  return diff >= 0 && diff <= 7;
});


  const filteredTasks = tasks.filter(
  (task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "all"
        ? true
        : task.priority ===
          priorityFilter;

    const matchesRole =
      roleFilter === "all"
        ? true
        : task.role ===
          roleFilter;
    

    return (
      matchesSearch &&
      matchesPriority &&
      matchesRole
    );
  }
);
async function handleUpdateTask() {
  try {
    const response = await fetch(
      `/api/tasks/${editingTask._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description:
            editDescription,
          priority:
            editPriority,
        }),
      }
    );

    if (!response.ok) {
      alert("Update Failed");
      return;
    }

    const updatedTask =
      await response.json();

    setTasks((prev) =>
      prev.map((task: any) =>
        task._id ===
        updatedTask._id
          ? updatedTask
          : task
      )
    );

    setEditingTask(null);

    alert("Task Updated");
  } catch (error) {
    console.error(error);
    alert("Update Failed");
  }
}
  return (
    <>
      <Navbar />
     
     
   
      
   
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
          {dueSoonTasks.length > 0 && (
  <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-3xl p-5 mb-6 shadow">
    <h2 className="font-bold text-xl">
      ⚠️ Due Soon Alert
    </h2>

    <p className="mt-2">
      {dueSoonTasks.length} task(s) are due within the next 7 days.
    </p>
  </div>
)}


          

          {/* Tasks */}
          <div className="bg-white rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              📋 All Tasks
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">

  <select
    value={priorityFilter}
    onChange={(e) =>
      setPriorityFilter(
        e.target.value
      )
    }
    className="p-4 rounded-2xl border border-slate-300"
  >
    <option value="all">
      All Priorities
    </option>

    <option value="high">
      🔴 High
    </option>

    <option value="medium">
      🟡 Medium
    </option>

    <option value="low">
      🟢 Low
    </option>
  </select>

  <select
    value={roleFilter}
    onChange={(e) =>
      setRoleFilter(
        e.target.value
      )
    }
    className="p-4 rounded-2xl border border-slate-300"
  >
    <option value="all">
      All Roles
    </option>

    <option value="admin">
      👑 Admin
    </option>

    <option value="user">
      👤 User
    </option>
  </select>

</div>

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
  role={task.role}
  onDelete={handleDelete}
  onStatusChange={handleStatusChange}
onEdit={(id) => {
 
  const taskToEdit =
    tasks.find(
      (t) => t._id === id
    );

 

  if (taskToEdit) {
    setEditingTask(
      taskToEdit
    );

    setEditTitle(
      taskToEdit.title
    );

    setEditDescription(
      taskToEdit.description
    );

    setEditPriority(
      taskToEdit.priority
    );
  }
}}
/>
                ))}

              </div>
            )}

          </div>

        </div>
           </div>

      {editingTask && (
        <div className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl">

            <h2 className="text-2xl font-bold mb-6">
              Edit Task
            </h2>

            <input
              type="text"
              value={editTitle}
              onChange={(e) =>
                setEditTitle(e.target.value)
              }
              className="w-full p-3 border rounded-xl mb-4"
            />

            <textarea
              value={editDescription}
              onChange={(e) =>
                setEditDescription(
                  e.target.value
                )
              }
              rows={4}
              className="w-full p-3 border rounded-xl mb-4"
            />

            <select
              value={editPriority}
              onChange={(e) =>
                setEditPriority(
                  e.target.value
                )
              }
              className="w-full p-3 border rounded-xl mb-6"
            >
              <option value="low">
                Low
              </option>
              <option value="medium">
                Medium
              </option>
              <option value="high">
                High
              </option>
            </select>

            <div className="flex gap-3">

              <button
                onClick={
                  handleUpdateTask
                }
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl"
              >
                Save Changes
              </button>

              <button
                onClick={() =>
                  setEditingTask(
                    null
                  )
                }
                className="flex-1 bg-slate-200 py-3 rounded-xl"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
}
