import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, Cog, Users, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amaklogo-hiMjLWPWzO0aqaGrdfoW2iHvGppUdw.png"
            alt="AMAK Mining"
            width={150}
            height={60}
            className="object-contain"
          />
          <div className="flex gap-4">
            <Button asChild variant="outline" className="border-slate-300 bg-transparent">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-slate-900 text-white hover:bg-slate-800">
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold text-white leading-tight">Mining Operations Management System</h1>
            <p className="mb-8 text-xl text-slate-300 leading-relaxed">
              Comprehensive solution for Copper-Zinc and Gold-Silver processing operations, financial tracking, and
              workforce management
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="bg-amber-600 text-white hover:bg-amber-700 font-semibold">
                <Link href="/auth/signup">
                  Start Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Comprehensive Mining Operations Platform
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                <Cog className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">Process Tracking</h3>
              <p className="text-sm text-slate-600">
                Monitor crushing, grinding, flotation, leaching, and smelting operations in real-time
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <BarChart3 className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">Financial Metrics</h3>
              <p className="text-sm text-slate-600">
                Track revenue, costs, EBITDA, and profitability across all operations
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Users className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">Workforce Management</h3>
              <p className="text-sm text-slate-600">
                Manage shifts, track attendance, and optimize workforce allocation
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <TrendingUp className="h-6 w-6 text-purple-700" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">Executive Dashboard</h3>
              <p className="text-sm text-slate-600">
                Comprehensive insights for senior management and strategic decision-making
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600">
          <p>&copy; 2025 AMAK Mining - Al Masane Al Kobra Mining Co. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
