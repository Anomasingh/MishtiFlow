"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Loader2 } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
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

      router.push("/dashboard")
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
        <Image src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&h=1600&fit=crop&q=80" alt="Sweet Shop Display" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-accent/20 p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg font-semibold text-primary">MishtiFlow</span>
            </Link>
          </div>

          <Card className="border-2 shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="font-serif text-2xl">Hey, welcome back!</CardTitle>
              <CardDescription>Sign in to browse and purchase sweets</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
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

                <div className="pt-2 rounded-lg bg-muted/50 p-3">
                  <p className="text-sm text-muted-foreground font-medium mb-1">Just trying it out?</p>
                  <p className="text-xs text-muted-foreground">
                    Use: <span className="font-mono">user@mishtiflow.com</span> /{" "}
                    <span className="font-mono">user123</span>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>

                <Link href="/admin-login" className="w-full">
                  <Button type="button" variant="outline" className="w-full h-11 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700">
                    Admin Login
                  </Button>
                </Link>

                <div className="text-center text-sm">
                  <p className="text-muted-foreground">
                    New here?{" "}
                    <Link href="/register" className="font-semibold text-primary hover:underline">
                      Create account
                    </Link>
                  </p>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
