import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDb } from "@/lib/mongo"
import { sweetSchema } from "@/lib/validators"

// GET /api/sweets - List all sweets with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get("name")
    const category = searchParams.get("category")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")

    const db = await getDb()
    const sweetsCollection = db.collection("sweets")

    const filter: any = {}

    if (name) {
      filter.name = { $regex: name, $options: "i" }
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" }
    }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number.parseFloat(minPrice)
      if (maxPrice) filter.price.$lte = Number.parseFloat(maxPrice)
    }

    const sweets = await sweetsCollection
      .find(filter)
      .sort({ name: 1 })
      .toArray()

    const sweetsWithId = sweets.map((sweet) => ({
      ...sweet,
      id: sweet._id.toString(),
      _id: undefined,
    }))

    return NextResponse.json({ sweets: sweetsWithId })
  } catch (error) {
    console.error("[v0] Get sweets error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/sweets - Create a new sweet (ADMIN only)
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const validation = sweetSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 })
    }

    const { name, category, price, quantity, description, imageUrl } = validation.data

    const db = await getDb()
    const sweetsCollection = db.collection("sweets")

    const insertResult = await sweetsCollection.insertOne({
      name,
      category,
      price,
      quantity,
      description: description || null,
      imageUrl: imageUrl || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const sweet = await sweetsCollection.findOne({ _id: insertResult.insertedId })

    return NextResponse.json(
      {
        sweet: {
          ...sweet,
          id: sweet?._id.toString(),
          _id: undefined,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Create sweet error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
