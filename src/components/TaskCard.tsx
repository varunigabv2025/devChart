type TaskCardProps = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: "todo" | "inprogress" | "done";
  assignedTo?: string;
  dueDate?: string;
  role?: string;

  onDelete?: (id: string) => void;

  onEdit?: (id: string) => void;

  onStatusChange?: (
    id: string,
    status: "todo" | "inprogress" | "done"
  ) => void;
};

export default function TaskCard({
  id,
  title,
  description,
  priority,
  status,
  assignedTo,
  dueDate,
  role,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskCardProps) {
  const badgeClass =
    priority.toLowerCase() === "high"
      ? "bg-red-100 text-red-600"
      : priority.toLowerCase() === "medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  const statusClass =
    status === "todo"
      ? "bg-gray-100 text-gray-700"
      : status === "inprogress"
      ? "bg-orange-100 text-orange-700"
      : "bg-green-100 text-green-700";

  const statusText =
    status === "todo"
      ? "📝 To Do"
      : status === "inprogress"
      ? "⚡ In Progress"
      : "✅ Done";

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-lg font-bold text-slate-800">
          {title}
        </h2>

        <div className="flex gap-2">

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}
          >
            {priority.toUpperCase()}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              role === "admin"
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {role === "admin"
              ? "👑 ADMIN"
              : "👤 USER"}
          </span>

        </div>

      </div>

      <p className="text-slate-500 text-sm mb-5">
        {description}
      </p>

      <div className="flex justify-between text-sm bg-slate-50 rounded-xl p-3 mb-4">

        <span>
          👤 {assignedTo || "Unassigned"}
        </span>

        <span>
          📅 {dueDate || "No Date"}
        </span>

      </div>

      <div
        className={`rounded-xl p-3 text-center font-medium mb-3 ${statusClass}`}
      >
        {statusText}
      </div>

      <div className="flex gap-2">

        {status === "todo" && (
          <button
            onClick={() =>
              onStatusChange?.(
                id,
                "inprogress"
              )
            }
            className="flex-1 bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
          >
            ▶ Start
          </button>
        )}

        {status === "inprogress" && (
          <button
            onClick={() =>
              onStatusChange?.(
                id,
                "done"
              )
            }
            className="flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition"
          >
            🏁 End Task
          </button>
        )}

        {status === "done" && (
          <button
            className="flex-1 bg-green-100 text-green-700 py-2 rounded-xl"
          >
            ✅ Finished
          </button>
        )}

        <button
          onClick={() => onEdit?.(id)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition"
        >
          ✏️
        </button>

        <button
          onClick={() => onDelete?.(id)}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
        >
          🗑
        </button>

      </div>

    </div>
  );
}