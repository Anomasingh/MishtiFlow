import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDb, ObjectId } from "@/lib/mongo"

export async function GET() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const db = await getDb()
    const usersCollection = db.collection("users")

    // Fetch full user details
    const user = await usersCollection.findOne({ _id: new ObjectId(currentUser.userId) })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("[v0] Get current user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
