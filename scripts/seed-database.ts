import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

const uri = process.env.MONGODB_URI

if (!uri) {
  console.error("[v0] MONGODB_URI environment variable is not set")
  process.exit(1)
}

async function seedDatabase() {
  const client = new MongoClient(uri!)

  try {
    await client.connect()
    console.log("[v0] Connected to MongoDB")

    const db = client.db()
    const usersCollection = db.collection("users")
    const sweetsCollection = db.collection("sweets")

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10)
    const adminExists = await usersCollection.findOne({ email: "admin@mishtiflow.com" })
    
    if (!adminExists) {
      await usersCollection.insertOne({
        email: "admin@mishtiflow.com",
        password: hashedPassword,
        name: "Admin User",
        role: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      console.log("[v0] Admin user created")
    } else {
      console.log("[v0] Admin user already exists")
    }

    // Create regular user
    const userPassword = await bcrypt.hash("user123", 10)
    const userExists = await usersCollection.findOne({ email: "user@mishtiflow.com" })
    
    if (!userExists) {
      await usersCollection.insertOne({
        email: "user@mishtiflow.com",
        password: userPassword,
        name: "Test User",
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      console.log("[v0] Test user created")
    } else {
      console.log("[v0] Test user already exists")
    }

    console.log("[v0] Users seeded successfully")
    console.log("[v0] Admin: admin@mishtiflow.com / admin123")
    console.log("[v0] User: user@mishtiflow.com / user123")

    // Seed sweets - Using placeholder.com for reliable loading
    const sweets = [
      {
        name: "Gulab Jamun",
        category: "Milk Based",
        price: 45,
        quantity: 100,
        description: "Soft milk dumplings soaked in aromatic rose syrup",
        imageUrl: "https://via.placeholder.com/400/8B4513/FFFFFF?text=Gulab+Jamun",
      },
      {
        name: "Rasgulla",
        category: "Milk Based",
        price: 40,
        quantity: 80,
        description: "Spongy cottage cheese balls in light sugar syrup",
        imageUrl: "https://via.placeholder.com/400/F5F5DC/333333?text=Rasgulla",
      },
      {
        name: "Jalebi",
        category: "Fried",
        price: 35,
        quantity: 120,
        description: "Crispy spirals soaked in saffron sugar syrup",
        imageUrl: "https://via.placeholder.com/400/FFA500/FFFFFF?text=Jalebi",
      },
      {
        name: "Kaju Katli",
        category: "Dry Fruit",
        price: 120,
        quantity: 50,
        description: "Premium cashew fudge with silver leaf",
        imageUrl: "https://via.placeholder.com/400/C0C0C0/333333?text=Kaju+Katli",
      },
      {
        name: "Barfi",
        category: "Milk Based",
        price: 60,
        quantity: 90,
        description: "Rich milk fudge with pistachios and cardamom",
        imageUrl: "https://via.placeholder.com/400/FFE4B5/333333?text=Barfi",
      },
      {
        name: "Sandesh",
        category: "Milk Based",
        price: 50,
        quantity: 70,
        description: "Bengali cottage cheese delicacy with subtle sweetness",
        imageUrl: "https://via.placeholder.com/400/FFFACD/333333?text=Sandesh",
      },
      {
        name: "Ladoo",
        category: "Flour Based",
        price: 40,
        quantity: 150,
        description: "Golden spheres of gram flour, ghee and cardamom",
        imageUrl: "https://via.placeholder.com/400/FFD700/333333?text=Ladoo",
      },
      {
        name: "Rasmalai",
        category: "Milk Based",
        price: 55,
        quantity: 60,
        description: "Creamy milk patties soaked in sweet saffron milk",
        imageUrl: "https://via.placeholder.com/400/FFF8DC/333333?text=Rasmalai",
      },
      {
        name: "Mysore Pak",
        category: "Flour Based",
        price: 65,
        quantity: 75,
        description: "Rich South Indian sweet made with gram flour and ghee",
        imageUrl: "https://via.placeholder.com/400/DAA520/FFFFFF?text=Mysore+Pak",
      },
      {
        name: "Peda",
        category: "Milk Based",
        price: 50,
        quantity: 110,
        description: "Soft milk sweet flavored with cardamom and saffron",
        imageUrl: "https://via.placeholder.com/400/F4A460/FFFFFF?text=Peda",
      },
      {
        name: "Soan Papdi",
        category: "Flour Based",
        price: 70,
        quantity: 0,
        description: "Flaky, crispy layers that melt in your mouth",
        imageUrl: "https://via.placeholder.com/400/CD853F/FFFFFF?text=Soan+Papdi",
      },
      {
        name: "Kheer",
        category: "Milk Based",
        price: 45,
        quantity: 8,
        description: "Creamy rice pudding with nuts and aromatic spices",
        imageUrl: "https://via.placeholder.com/400/FAEBD7/333333?text=Kheer",
      },
    ]

    // Clear existing sweets
    await sweetsCollection.deleteMany({})
    console.log("[v0] Cleared existing sweets")

    // Insert new sweets
    for (const sweet of sweets) {
      await sweetsCollection.insertOne({
        ...sweet,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    console.log("[v0] Sweets seeded successfully")
  } catch (error) {
    console.error("[v0] Seed error:", error)
    throw error
  } finally {
    await client.close()
  }
}

seedDatabase()
