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
import { Loader2, Package } from "lucide-react"

interface Sweet {
  id: string
  name: string
  quantity: number
}

interface RestockDialogProps {
  sweet: Sweet
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function RestockDialog({ sweet, open, onClose, onSuccess }: RestockDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const quantity = Number.parseInt(formData.get("quantity") as string)

    try {
      const response = await fetch(`/api/sweets/${sweet.id}/restock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to restock")
      }

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              Restock Sweet
            </DialogTitle>
            <DialogDescription>Add stock to {sweet.name}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                {error}
              </div>
            )}

            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Current Stock</p>
              <p className="text-2xl font-bold">{sweet.quantity} units</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Add Quantity *</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                placeholder="50"
                required
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">Enter the number of units to add to stock</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Restocking...
                </>
              ) : (
                "Restock"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
