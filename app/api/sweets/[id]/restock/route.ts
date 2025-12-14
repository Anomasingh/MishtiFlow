import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDb, ObjectId } from "@/lib/mongo"
import { restockSchema } from "@/lib/validators"

// POST /api/sweets/:id/restock - Restock a sweet (ADMIN only)
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 })
    }

    const { id } = await params
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid sweet ID" }, { status: 400 })
    }

    const body = await request.json()
    const validation = restockSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 })
    }

    const { quantity } = validation.data

    const db = await getDb()
    const sweetsCollection = db.collection("sweets")

    const result = await sweetsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $inc: { quantity: quantity },
        $set: { updatedAt: new Date() }
      },
      { returnDocument: "after" }
    )

    if (!result) {
      return NextResponse.json({ error: "Sweet not found" }, { status: 404 })
    }

    return NextResponse.json({
      sweet: {
        ...result,
        id: result._id.toString(),
        _id: undefined,
      },
    })
  } catch (error) {
    console.error("[v0] Restock error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
