import { getCurrentUser } from "@/lib/auth"
import { getDb, ObjectId } from "@/lib/mongo"
import { Navbar } from "@/components/navbar"
import { SweetCard } from "@/components/sweet-card"
import { SearchFilterBar } from "@/components/search-filter-bar"
import Image from "next/image"

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

async function getSweets(searchParams: {
  name?: string
  category?: string
  minPrice?: string
  maxPrice?: string
}) {
  const db = await getDb()
  const sweetsCollection = db.collection("sweets")

  const filter: any = {}

  if (searchParams.name) {
    filter.name = { $regex: searchParams.name, $options: "i" }
  }

  if (searchParams.category) {
    filter.category = { $regex: searchParams.category, $options: "i" }
  }

  if (searchParams.minPrice || searchParams.maxPrice) {
    filter.price = {}
    if (searchParams.minPrice) filter.price.$gte = Number.parseFloat(searchParams.minPrice)
    if (searchParams.maxPrice) filter.price.$lte = Number.parseFloat(searchParams.maxPrice)
  }

  const sweets = await sweetsCollection.find(filter).sort({ name: 1 }).toArray()

  return sweets.map((sweet) => ({
    ...sweet,
    id: sweet._id.toString(),
    _id: undefined,
  }))
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; category?: string; minPrice?: string; maxPrice?: string }>
}) {
  const user = await getUser()
  const params = await searchParams
  const sweets = await getSweets(params)

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <div className="container mx-auto px-4 py-12">
        <div className="relative mb-12 overflow-hidden rounded-3xl">
          <div className="relative h-48 md:h-64">
            <Image src="/Gemini_Generated_Image_4k97h34k97h34k97.png" alt="Our Sweet Collection" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8">
                <h1 className="mb-3 font-serif text-4xl font-bold text-foreground md:text-5xl">Fresh Today</h1>
                <p className="max-w-xl text-lg text-muted-foreground">
                  All made this morning. Guaranteed fresh, or we'll make it again.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <SearchFilterBar />
        </div>

        {/* Sweets Grid */}
        {sweets.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed bg-muted/20 p-12 text-center">
            <p className="mb-2 text-lg font-semibold text-foreground">Hmm, we couldn't find that</p>
            <p className="text-muted-foreground">Try searching for something else, or clear your filters</p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Found {sweets.length} {sweets.length === 1 ? "sweet" : "sweets"}
              </p>
              {params.name || params.category || params.minPrice || params.maxPrice ? (
                <p className="text-sm text-primary">Filters active</p>
              ) : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sweets.map((sweet: any) => (
                <SweetCard key={sweet.id} sweet={sweet} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
