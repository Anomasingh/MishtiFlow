"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Loader2, Sparkles } from "lucide-react"
import Image from "next/image"

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Check if user is admin
      if (data.user.role !== "ADMIN") {
        setError("Access denied. Admin credentials required.")
        await fetch("/api/auth/logout", { method: "POST" })
        return
      }

      router.push("/admin")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=1200&h=1600&fit=crop&q=80" alt="Sweet Shop Display" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gradient-to-br from-background via-red-50/50 to-orange-50/50 p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg font-semibold text-primary">MishtiFlow</span>
            </Link>
          </div>

          <Card className="border-2 shadow-xl border-orange-200">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-orange-600" />
                <CardTitle className="font-serif text-2xl">Admin Access</CardTitle>
              </div>
              <CardDescription>Sign in with admin credentials to manage inventory</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@mishtiflow.com"
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Admin Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Sign in as Admin
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Not an admin?{" "}
                  <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                    User login
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Admin access is restricted. Unauthorized access attempts will be logged.
          </p>
        </div>
      </div>
    </div>
  )
}
