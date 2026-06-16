import connectDB from "@/lib/mongodb";
import Task from "@/models/Tasks";

export async function GET() {
  try {
    await connectDB();

    const tasks = await Task.find().sort({
      createdAt: -1,
    });

    return Response.json(tasks, {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to fetch tasks",
      },
      {
        status: 500,
      }
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