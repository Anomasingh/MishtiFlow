import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { getDb, ObjectId } from "@/lib/mongo"
import { Navbar } from "@/components/navbar"
import { AdminInventoryTable } from "@/components/admin-inventory-table"
import { AddSweetDialog } from "@/components/add-sweet-dialog"
import { Package, TrendingUp, AlertCircle, ShoppingBag } from "lucide-react"

async function getUser() {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  const db = await getDb()
  const usersCollection = db.collection("users")
  const user = await usersCollection.findOne({ _id: new ObjectId(currentUser.userId) })

  if (!user) return null

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
  }
}

async function getSweets() {
  const db = await getDb()
  const sweetsCollection = db.collection("sweets")
  const sweets = await sweetsCollection.find({}).sort({ name: 1 }).toArray()

  return sweets.map((sweet) => ({
    ...sweet,
    id: sweet._id.toString(),
    _id: undefined,
  }))
}

export default async function AdminPage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  if (user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const sweets = await getSweets()

  const totalItems = sweets.length
  const outOfStock = sweets.filter((s: any) => s.quantity === 0).length
  const lowStock = sweets.filter((s: any) => s.quantity > 0 && s.quantity <= 10).length
  const totalValue = sweets.reduce((sum: number, s: any) => sum + s.price * s.quantity, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 font-serif text-4xl font-bold text-foreground">Inventory Control</h1>
            <p className="text-lg text-muted-foreground">Keep track of what's in stock</p>
          </div>
          <AddSweetDialog />
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border-2 bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Items</p>
              <Package className="h-5 w-5 text-primary" />
            </div>
            <p className="font-serif text-3xl font-bold text-foreground">{totalItems}</p>
          </div>

          <div className="rounded-xl border-2 bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Inventory Value</p>
              <TrendingUp className="h-5 w-5 text-chart-3" />
            </div>
            <p className="font-serif text-3xl font-bold text-foreground">₹{totalValue.toFixed(0)}</p>
          </div>

          <div className="rounded-xl border-2 bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Low Stock</p>
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <p className="font-serif text-3xl font-bold text-foreground">{lowStock}</p>
          </div>

          <div className="rounded-xl border-2 bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Out of Stock</p>
              <ShoppingBag className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="font-serif text-3xl font-bold text-foreground">{outOfStock}</p>
          </div>
        </div>

        {/* Inventory Table */}
        <AdminInventoryTable sweets={sweets} />
      </div>
    </div>
  )
}
