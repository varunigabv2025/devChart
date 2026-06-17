"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function AnnouncementsPage() {
  const [role, setRole] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [
    announcements,
    setAnnouncements,
  ] = useState<any[]>([]);

  const [
    editingId,
    setEditingId,
  ] = useState("");

  useEffect(() => {
    const storedRole =
      localStorage.getItem(
        "role"
      );

    if (storedRole) {
      setRole(storedRole);
    }

    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    const response =
      await fetch(
        "/api/announcements"
      );

    const data =
      await response.json();

    setAnnouncements(data);
  }

  async function createAnnouncement() {
    if (!title || !message) {
      alert(
        "Fill all fields"
      );
      return;
    }

    await fetch(
      "/api/announcements",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
          message,
        }),
      }
    );

    setTitle("");
    setMessage("");

    fetchAnnouncements();

    alert(
      "Announcement Posted"
    );
  }

  async function updateAnnouncement() {
    const response =
      await fetch(
        `/api/announcements/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            message,
          }),
        }
      );

    if (!response.ok) {
      alert(
        "Update Failed"
      );
      return;
    }

    setEditingId("");
    setTitle("");
    setMessage("");

    fetchAnnouncements();

    alert(
      "Announcement Updated"
    );
  }

  async function deleteAnnouncement(
    id: string
  ) {
    const confirmDelete =
      confirm(
        "Delete announcement?"
      );

    if (!confirmDelete)
      return;

    await fetch(
      `/api/announcements/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchAnnouncements();
  }

 return (
  <>
    <Navbar />

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-cyan-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

          <h1 className="text-5xl font-extrabold text-slate-800">
            📢 Announcement Center
          </h1>

          <p className="text-slate-500 mt-3">
            Stay updated with
            workshops, hackathons,
            meetings and events.
          </p>

         <div className="mt-5 inline-flex items-center gap-3 bg-indigo-100 text-indigo-700 px-5 py-2.5 rounded-full text-sm font-semibold">
  <span className="text-base">
    📢
  </span>

  <span>
    {announcements.length} Active
    Announcement
    {announcements.length !== 1
      ? "s"
      : ""}
  </span>
</div>

        </div>

        {role === "admin" && (
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

            <h2 className="text-2xl font-bold mb-4">

              {editingId
                ? "✏ Edit Announcement"
                : "➕ Create Announcement"}

            </h2>

            <input
              type="text"
              placeholder="Announcement Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="w-full p-4 border rounded-2xl mb-4"
            />

            <textarea
              placeholder="Announcement Message"
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              className="w-full p-4 border rounded-2xl mb-4 h-32"
            />

            {editingId ? (
                <div className="flex gap-4 mt-4">

                <button
  onClick={updateAnnouncement}
  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md"
>
  Save Changes
</button>

                <button
                  onClick={() => {
                    setEditingId(
                      ""
                    );

                    setTitle(
                      ""
                    );

                    setMessage(
                      ""
                    );
                  }}
                  className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold"
                >
                   Cancel
                </button>

              </div>
            ) : (
              <button
                onClick={
                  createAnnouncement
                }
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                📢 Post Announcement
              </button>
            )}

          </div>
        )}

        <div className="grid gap-8 mt-8">

          {announcements.map(
            (announcement) => (
              <div
                key={
                  announcement._id
                }
                className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6"
              >

                <div className="flex justify-between">

                  <div>

                    <h2 className="text-2xl font-bold text-indigo-600">
                      📢{" "}
                      {
                        announcement.title
                      }
                    </h2>

                    <p className="text-slate-600 mt-3">
                      {
                        announcement.message
                      }
                    </p>

                    <p className="text-xs text-slate-400 mt-4">
                      {announcement.createdAt
                        ? new Date(
                            announcement.createdAt
                          ).toLocaleDateString()
                        : ""}
                    </p>

                  </div>

                  {role ===
                    "admin" && (
                    <div className="flex gap-2">

                      <button
  onClick={() => {
    setEditingId(announcement._id);
    setTitle(announcement.title);
    setMessage(announcement.message);
  }}
  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-medium"
>
  Edit
</button>

                    <button
  onClick={() =>
    deleteAnnouncement(
      announcement._id
    )
  }
  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium"
>
  Delete
</button>

                    </div>
                  )}

                </div>

              </div>
            )
          )}

        </div>

      </div>

        </div>
  </>
);
}