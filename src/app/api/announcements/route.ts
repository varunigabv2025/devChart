import connectDB from "@/lib/mongodb";
import Announcement from "@/models/Announcement";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const announcements =
      await Announcement.find({})
        .sort({
          createdAt: -1,
        });

    return NextResponse.json(
      announcements
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to fetch announcements",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    await connectDB();

    const {
      title,
      message,
    } = await request.json();

    const announcement =
      await Announcement.create({
        title,
        message,
      });

    return NextResponse.json(
      announcement,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to create announcement",
      },
      {
        status: 500,
      }
    );
  }
}