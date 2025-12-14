"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, AlertCircle } from "lucide-react"
import { useState } from "react"
import { PurchaseDialog } from "@/components/purchase-dialog"
import { useRouter } from "next/navigation"

interface SweetCardProps {
  sweet: {
    id: string
    name: string
    category: string
    price: number
    quantity: number
    description?: string
    imageUrl?: string
  }
  showPurchase?: boolean
}

export function SweetCard({ sweet, showPurchase = true }: SweetCardProps) {
  const router = useRouter()
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)

  const isOutOfStock = sweet.quantity === 0
  const isLowStock = sweet.quantity > 0 && sweet.quantity <= 10

  function handlePurchaseClick() {
    setShowPurchaseDialog(true)
  }

  function handlePurchaseSuccess() {
    setShowPurchaseDialog(false)
    router.refresh()
  }

  const fallbackImage = `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(`${sweet.name} indian sweet dessert close up food photography`)}`

  return (
    <>
      <Card className="group overflow-hidden transition-all hover:shadow-xl border-2">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={sweet.imageUrl || fallbackImage}
            alt={sweet.name}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <Badge variant="destructive" className="text-lg">
                Sold Out
              </Badge>
            </div>
          )}
          {!isOutOfStock && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-chart-3/90 text-white backdrop-blur-sm">Fresh Today</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="font-serif text-xl font-semibold text-card-foreground">{sweet.name}</h3>
            <Badge variant="secondary" className="shrink-0">
              {sweet.category}
            </Badge>
          </div>
          {sweet.description && (
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{sweet.description}</p>
          )}
          <div className="flex items-center justify-between">
            <p className="font-serif text-2xl font-bold text-primary">₹{sweet.price}</p>
            {isLowStock && !isOutOfStock && (
              <div className="flex items-center gap-1 text-sm text-destructive font-medium">
                <AlertCircle className="h-4 w-4" />
                <span>Grab fast! {sweet.quantity} left</span>
              </div>
            )}
            {!isLowStock && !isOutOfStock && (
              <span className="text-sm text-muted-foreground">{sweet.quantity} in stock</span>
            )}
          </div>
        </CardContent>
        {showPurchase && (
          <CardFooter className="p-6 pt-0">
            <Button className="w-full gap-2" disabled={isOutOfStock} onClick={handlePurchaseClick}>
              <ShoppingCart className="h-4 w-4" />
              {isOutOfStock ? "Sold Out" : "Add to Order"}
            </Button>
          </CardFooter>
        )}
      </Card>

      {showPurchaseDialog && (
        <PurchaseDialog
          sweet={sweet}
          open={showPurchaseDialog}
          onClose={() => setShowPurchaseDialog(false)}
          onSuccess={handlePurchaseSuccess}
        />
      )}
    </>
  )
}
