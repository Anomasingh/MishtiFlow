import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { registerSchema } from "@/lib/validators"
import { getDb } from "@/lib/mongo"
import { signToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = registerSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 })
    }

    const { email, password, name, role } = validation.data

    const db = await getDb()
    const usersCollection = db.collection("users")

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user with specified role
    const insertResult = await usersCollection.insertOne({
      email,
      password: hashedPassword,
      name,
      role: role || "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const user = {
      id: insertResult.insertedId.toString(),
      email,
      name,
      role: role || "USER",
    }

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Create response with cookie
    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 },
    )

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("[v0] Register error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
