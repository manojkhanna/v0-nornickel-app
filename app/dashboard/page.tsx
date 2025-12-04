import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Pickaxe, Gem, DollarSign, Users, Package, AlertCircle, Database } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const supabase = await createClient()

  let miningOps = null
  let cuZnProcessing = null
  let auAgProcessing = null
  let financialMetrics = null
  let projects = null
  let salesOrders = null
  let databaseError = false

  try {
    const results = await Promise.allSettled([
      supabase.from("mining_operations").select("*").order("date", { ascending: false }).limit(7),
      supabase.from("cu_zn_processing").select("*").order("date", { ascending: false }).limit(7),
      supabase.from("au_ag_processing").select("*").order("date", { ascending: false }).limit(7),
      supabase.from("financial_metrics").select("*").order("period_start", { ascending: false }).limit(1).single(),
      supabase.from("projects").select("*").eq("status", "in_progress"),
      supabase.from("sales_orders").select("*").in("status", ["pending", "confirmed"]),
    ])

    if (results[0].status === "fulfilled") miningOps = results[0].value.data
    if (results[1].status === "fulfilled") cuZnProcessing = results[1].value.data
    if (results[2].status === "fulfilled") auAgProcessing = results[2].value.data
    if (results[3].status === "fulfilled") financialMetrics = results[3].value.data
    if (results[4].status === "fulfilled") projects = results[4].value.data
    if (results[5].status === "fulfilled") salesOrders = results[5].value.data

    // Check if any queries failed (likely due to missing tables)
    databaseError = results.some((r) => r.status === "rejected")
  } catch (error) {
    console.error("[v0] Dashboard data fetch error:", error)
    databaseError = true
  }

  // Calculate KPIs with fallback values
  const totalMinedOre = miningOps?.reduce((sum, op) => sum + (Number(op.mined_ore_mt) || 0), 0) || 12450
  const avgCuGrade =
    cuZnProcessing?.reduce((sum, p) => sum + (Number(p.cu_concentrate_percent) || 0), 0) /
      (cuZnProcessing?.length || 1) || 24.5
  const totalAuRecovered = auAgProcessing?.reduce((sum, p) => sum + (Number(p.au_recovered_oz) || 0), 0) || 1250.3
  const totalRevenue = financialMetrics?.total_revenue || 45600000
  const ebitda = financialMetrics?.ebitda || 12300000

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Executive Dashboard</h1>
        <p className="text-slate-600 mt-1">Overview of mining operations and key metrics</p>
      </div>

      {databaseError && (
        <Alert className="border-amber-200 bg-amber-50">
          <Database className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-900 font-semibold">Database Setup Required</AlertTitle>
          <AlertDescription className="text-amber-800">
            <p className="mb-2">
              The database tables need to be initialized. Please run the SQL scripts in the{" "}
              <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">scripts/</code> folder.
            </p>
            <p className="text-sm">
              Showing demo data for now. Once the database is set up, real-time data will be displayed.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Ore Mined (7d)</CardTitle>
            <Pickaxe className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalMinedOre.toLocaleString()} MT</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+5.2%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Cu Concentrate Grade</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgCuGrade.toFixed(1)}%</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+2.1%</span> from target
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Gold Recovered (7d)</CardTitle>
            <Gem className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalAuRecovered.toFixed(1)} oz</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-red-600" />
              <span className="text-red-600">-1.3%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Monthly EBITDA</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${(ebitda / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-slate-500 mt-1">Revenue: ${(totalRevenue / 1000000).toFixed(1)}M</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects & Sales */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{project.project_name}</p>
                      <p className="text-sm text-slate-500">
                        Budget: ${(Number(project.budget) / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                      In Progress
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-slate-500 mb-2">
                    {databaseError ? "Demo: Processing Plant Expansion" : "No active projects"}
                  </p>
                  {databaseError && <p className="text-xs text-slate-400">Budget: $8.5M • 65% Complete</p>}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Pending Sales Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {salesOrders && salesOrders.length > 0 ? (
                salesOrders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{order.order_number}</p>
                      <p className="text-sm text-slate-500 capitalize">
                        {order.product_type} - {order.customer_name}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        order.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-slate-500 mb-2">
                    {databaseError ? "Demo: 3 orders pending" : "No pending orders"}
                  </p>
                  {databaseError && <p className="text-xs text-slate-400">Cu Concentrate • Zn Concentrate • Au Doré</p>}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <Link href="/processing/copper-zinc/mining">
                <Pickaxe className="h-5 w-5 text-amber-600" />
                <span className="text-sm font-medium">Cu-Zn Mining</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <Link href="/processing/gold-silver/mining">
                <Gem className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium">Au-Ag Mining</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <Link href="/financials/overview">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Financials</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <Link href="/reports">
                <Package className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Reports</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
