import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDb, ObjectId } from "@/lib/mongo"
import { updateSweetSchema } from "@/lib/validators"

// GET /api/sweets/:id - Get a single sweet
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid sweet ID" }, { status: 400 })
    }

    const db = await getDb()
    const sweetsCollection = db.collection("sweets")
    const sweet = await sweetsCollection.findOne({ _id: new ObjectId(id) })

    if (!sweet) {
      return NextResponse.json({ error: "Sweet not found" }, { status: 404 })
    }

    return NextResponse.json({
      sweet: {
        ...sweet,
        id: sweet._id.toString(),
        _id: undefined,
      },
    })
  } catch (error) {
    console.error("[v0] Get sweet error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/sweets/:id - Update a sweet (ADMIN only)
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
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
    const validation = updateSweetSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 })
    }

    const updates = validation.data

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 })
    }

    const db = await getDb()
    const sweetsCollection = db.collection("sweets")

    const result = await sweetsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updates, 
          updatedAt: new Date() 
        } 
      },
      { returnDocument: "after" },
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
    console.error("[v0] Update sweet error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/sweets/:id - Delete a sweet (ADMIN only)
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

    const db = await getDb()
    const sweetsCollection = db.collection("sweets")
    
    const result = await sweetsCollection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Sweet not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Sweet deleted successfully" })
  } catch (error) {
    console.error("[v0] Delete sweet error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
