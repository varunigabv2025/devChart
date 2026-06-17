import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await connectDB();

    const {
      name,
      email,
      password,
      role,
    } = await request.json();

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          message:
            "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
        role,
      });

    return NextResponse.json(
      {
        message:
          "Registration Successful",
        user,
      },
      {
        status: 201,
      }
    );
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