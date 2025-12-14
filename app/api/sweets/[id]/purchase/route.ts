import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDb, ObjectId } from "@/lib/mongo"
import { purchaseSchema } from "@/lib/validators"

// POST /api/sweets/:id/purchase - Purchase a sweet
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid sweet ID" }, { status: 400 })
    }

    const body = await request.json()
    const validation = purchaseSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 })
    }

    const { quantity } = validation.data

    const db = await getDb()
    const sweetsCollection = db.collection("sweets")

    // Atomic update: decrease quantity only if enough stock available
    const result = await sweetsCollection.findOneAndUpdate(
      { 
        _id: new ObjectId(id), 
        quantity: { $gte: quantity } 
      },
      { 
        $inc: { quantity: -quantity },
        $set: { updatedAt: new Date() }
      },
      { returnDocument: "after" }
    )

    if (!result) {
      // Check if sweet exists or just out of stock
      const sweet = await sweetsCollection.findOne({ _id: new ObjectId(id) })

      if (!sweet) {
        return NextResponse.json({ error: "Sweet not found" }, { status: 404 })
      }

      return NextResponse.json({ error: "Insufficient stock available" }, { status: 400 })
    }

    return NextResponse.json({
      message: "Purchase successful",
      sweet: {
        ...result,
        id: result._id.toString(),
        _id: undefined,
      },
    })
  } catch (error) {
    console.error("[v0] Purchase error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
