"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X, SlidersHorizontal } from "lucide-react"
import { Card } from "@/components/ui/card"

const CATEGORIES = ["All Categories", "Milk Based", "Fried", "Dry Fruit"]

export function SearchFilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [name, setName] = useState(searchParams.get("name") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "All Categories")
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")
  const [showFilters, setShowFilters] = useState(false)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    applyFilters()
  }

  function applyFilters() {
    const params = new URLSearchParams()

    if (name) params.set("name", name)
    if (category && category !== "All Categories") params.set("category", category)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)

    router.push(`/dashboard?${params.toString()}`)
  }

  function clearFilters() {
    setName("")
    setCategory("All Categories")
    setMinPrice("")
    setMaxPrice("")
    router.push("/dashboard")
  }

  const hasActiveFilters = name || (category && category !== "All Categories") || minPrice || maxPrice

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Looking for something specific?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 pl-10"
          />
        </div>
        <Button type="submit" size="lg" className="gap-2">
          <Search className="h-5 w-5" />
          <span className="hidden sm:inline">Search</span>
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
      </form>

      {/* Advanced Filters */}
      {showFilters && (
        <Card className="p-6 border-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold">Narrow it down</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                <X className="h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="category">Type</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="h-11">
                  <SelectValue placeholder="Any type" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minPrice">Min Price (₹)</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPrice">Max Price (₹)</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button onClick={applyFilters} className="gap-2">
              Show Results
            </Button>
          </div>
        </Card>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtering by:</span>
          {name && (
            <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
              <span>"{name}"</span>
              <button
                type="button"
                onClick={() => {
                  setName("")
                  applyFilters()
                }}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {category && category !== "All Categories" && (
            <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
              <span>{category}</span>
              <button
                type="button"
                onClick={() => {
                  setCategory("All Categories")
                  applyFilters()
                }}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {minPrice && (
            <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
              <span>From ₹{minPrice}</span>
              <button
                type="button"
                onClick={() => {
                  setMinPrice("")
                  applyFilters()
                }}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {maxPrice && (
            <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
              <span>Up to ₹{maxPrice}</span>
              <button
                type="button"
                onClick={() => {
                  setMaxPrice("")
                  applyFilters()
                }}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
