import connectDB from "@/lib/mongodb";
import Task from "@/models/Tasks";

export async function GET() {
  try {
    console.log("GET API HIT");

    await connectDB();

    console.log("DB CONNECTED");

    const tasks = await Task.find({});

    console.log("TASKS:", tasks);

    return Response.json(tasks);
  } catch (error) {
    console.error("GET ERROR:", error);

    return Response.json(
      {
        message: "Failed to fetch tasks",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const task = await Task.create({
      title: body.title,
      description: body.description,

      priority: body.priority || "low",

      status: body.status || "todo",

      assignedTo:
        body.assignedTo || "Unassigned",

      dueDate: body.dueDate || "",

      role: body.role || "user",
    });

    return Response.json(task, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to create task",
      },
      {
        status: 500,
      }
    );
  }
}