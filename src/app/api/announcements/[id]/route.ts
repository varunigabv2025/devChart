import connectDB from "@/lib/mongodb";
import Task from "@/models/Tasks";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: any
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const updatedTask =
      await Task.findByIdAndUpdate(
        params.id,
        {
          ...body,
        },
        {
          new: true,
        }
      );

    if (!updatedTask) {
      return NextResponse.json(
        {
          message:
            "Task not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      updatedTask
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Task update failed",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: any
) {
  try {
    await connectDB();

    const deletedTask =
      await Task.findByIdAndDelete(
        params.id
      );

    if (!deletedTask) {
      return NextResponse.json(
        {
          message:
            "Task not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message:
        "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Task delete failed",
      },
      {
        status: 500,
      }
    );
  }
}