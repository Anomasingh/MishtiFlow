import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

if (!uri) {
  console.error("[v0] MONGODB_URI environment variable is not set")
  process.exit(1)
}

async function createDatabase() {
  const client = new MongoClient(uri!)

  try {
    await client.connect()
    console.log("[v0] Connected to MongoDB")

    const db = client.db()

    // Create collections if they don't exist
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map((c) => c.name)

    if (!collectionNames.includes("users")) {
      await db.createCollection("users")
      console.log("[v0] Created users collection")

      // Create unique index on email
      await db.collection("users").createIndex({ email: 1 }, { unique: true })
      console.log("[v0] Created unique index on email")
    } else {
      console.log("[v0] Users collection already exists")
    }

    if (!collectionNames.includes("sweets")) {
      await db.createCollection("sweets")
      console.log("[v0] Created sweets collection")

      // Create indexes for sweets
      await db.collection("sweets").createIndex({ name: 1 })
      await db.collection("sweets").createIndex({ category: 1 })
      await db.collection("sweets").createIndex({ price: 1 })
      console.log("[v0] Created indexes on sweets collection")
    } else {
      console.log("[v0] Sweets collection already exists")
    }

    console.log("[v0] Database setup completed successfully")
  } catch (error) {
    console.error("[v0] Error:", error)
    throw error
  } finally {
    await client.close()
  }
}

createDatabase()
