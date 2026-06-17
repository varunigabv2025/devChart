import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  return NextResponse.json({
    message:
      "Login API Working",
  });
}

export async function POST(
  request: Request
) {
  try {
    await connectDB();

    const {
      email,
      password,
    } = await request.json();

    const user =
      await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return NextResponse.json(
        {
          message:
            "Invalid password",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json({
      message:
        "Login Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        message:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}