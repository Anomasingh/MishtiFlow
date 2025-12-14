"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ShoppingCart, CheckCircle2, Sparkles } from "lucide-react"

interface Sweet {
  id: string
  name: string
  price: number
  quantity: number
}

interface PurchaseDialogProps {
  sweet: Sweet
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function PurchaseDialog({ sweet, open, onClose, onSuccess }: PurchaseDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await fetch(`/api/sweets/${sweet.id}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to purchase")
      }

      setSuccess(true)
      setTimeout(() => {
        onSuccess()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const total = sweet.price * quantity

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {success ? (
          <div className="py-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <CheckCircle2 className="h-16 w-16 text-chart-3" />
                <Sparkles className="h-6 w-6 text-primary absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">Order placed!</h3>
            <p className="text-muted-foreground">We're packing your {sweet.name} now 🎉</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-primary" />
                Almost there!
              </DialogTitle>
              <DialogDescription>How much {sweet.name} would you like?</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                  {error}
                </div>
              )}

              <div className="rounded-lg bg-muted p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sweet</span>
                  <span className="font-semibold">{sweet.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price each</span>
                  <span className="font-semibold">₹{sweet.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">We have</span>
                  <span className="font-semibold">{sweet.quantity} pieces</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">How many? *</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  max={sweet.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                  required
                  disabled={isLoading}
                  className="h-12 text-lg"
                />
              </div>

              <div className="rounded-lg bg-primary/10 p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">You'll pay</span>
                  <span className="font-serif text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Not now
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Yes, place order"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
