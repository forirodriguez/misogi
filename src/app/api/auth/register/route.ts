import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import * as z from "zod";
import { Prisma } from "@prisma/client";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function getDefaultAvatar(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = userSchema.parse(body);

    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "email-exists",
          message:
            "This email is already registered. Please try logging in instead.",
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate default avatar
    const defaultAvatar = getDefaultAvatar(name);

    // Prepare user data
    const userData: Prisma.UserCreateInput = {
      name,
      email,
      password: hashedPassword,
      image: defaultAvatar,
      emailVerified: new Date(),
    };

    // Create user
    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    return NextResponse.json({
      success: true,
      user,
      message: "Registration successful!",
    });
  } catch (error) {
    console.error("REGISTRATION_ERROR", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "validation-error",
          message: "Please check your input and try again.",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "server-error",
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
