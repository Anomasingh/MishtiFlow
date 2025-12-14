"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, ShoppingBag, TrendingUp, Heart, Shield, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-accent/30">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1600&h=800&fit=crop&q=80"
            alt="Indian Sweet Shop"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>

        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col">
              {/* Logo */}
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2 backdrop-blur-sm w-fit"
              >
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-serif text-lg font-semibold text-primary">MishtiFlow</span>
              </Link>

              <h1 className="mb-6 font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance">
                Your favorite{" "}
                <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                  mithai
                </span>
                , just a click away
              </h1>

              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl text-pretty">
                We've been making smiles since generations. Fresh gulab jamun, crispy jalebi, melt-in-your-mouth kaju
                katli – all the classics you love, made the way your grandmother would approve.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="gap-2 text-lg font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    See What's Fresh Today
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 text-lg font-semibold backdrop-blur-sm transition-all hover:scale-105 bg-transparent"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span>Made with love daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>100% pure ingredients</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Fresh within 24 hours</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/indian-sweets-platter.png"
                  alt="Assorted Indian Sweets"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-chart-2/20 blur-3xl" />
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg className="w-full text-background" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Why people keep coming back
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">Here's what makes us a little different</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-xl">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-card-foreground">Made Fresh, Daily</h3>
              <p className="leading-relaxed text-muted-foreground">
                Every morning at 5 AM, our halwais start preparing the day's batch. That's why everything tastes just
                right – soft, sweet, and exactly how it should be.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-xl">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-chart-2/10">
                <ShoppingBag className="h-7 w-7 text-chart-2" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-card-foreground">Super Easy to Order</h3>
              <p className="leading-relaxed text-muted-foreground">
                No complicated menus. Just sweets you know and love, with real-time stock updates so you're never
                disappointed.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-xl">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-chart-3/10">
                <TrendingUp className="h-7 w-7 text-chart-3" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-card-foreground">Never Runs Out</h3>
              <p className="leading-relaxed text-muted-foreground">
                We track everything live, so if you see it in stock, it's ready for you. No calling ahead, no surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-6 font-serif text-2xl leading-relaxed text-foreground md:text-3xl text-balance">
              "Finally, a place where I can order my favorite <span className="text-primary">kaju katli</span> at
              midnight and actually know if they have it in stock. Game changer!"
            </p>
            <p className="text-lg text-muted-foreground">— Priya R., Regular Customer</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-rose-50 opacity-30" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-3xl border bg-card/80 p-12 text-center shadow-2xl backdrop-blur-sm">
            <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Come on in, we saved you a spot
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Create an account in 30 seconds and start ordering. Or just browse around – we won't judge.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/register">
                <Button size="lg" className="gap-2 text-lg font-semibold shadow-lg shadow-primary/20">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="gap-2 text-lg font-semibold bg-transparent">
                  Browse Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
