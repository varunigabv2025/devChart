import connectDB from "@/lib/mongodb";
import Task from "@/models/Tasks";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const updatedTask =
      await Task.findByIdAndUpdate(
        id,
        {
          title: body.title,
          description: body.description,
          priority: body.priority,
          status: body.status,
          assignedTo: body.assignedTo,
          dueDate: body.dueDate,
          role: body.role,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedTask) {
      return Response.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(updatedTask, {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to update task",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedTask =
      await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return Response.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        message: "Task deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to delete task",
      },
      {
        status: 500,
      }
    );
  }
}