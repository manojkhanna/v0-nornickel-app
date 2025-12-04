import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { LineChartClient } from "@/components/charts/line-chart-client"
import { Beaker, Droplets, TrendingUp, AlertCircle } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default async function AuAgLeachingPage() {
  const supabase = await createClient()

  const { data: leachingData } = await supabase
    .from("au_ag_processing")
    .select("*")
    .eq("stage", "leaching")
    .order("date", { ascending: false })
    .limit(10)

  const totalLeached = leachingData?.reduce((sum, d) => sum + (Number(d.ore_leached_mt) || 0), 0) || 0
  const totalCyanide = leachingData?.reduce((sum, d) => sum + (Number(d.cyanide_consumed_kg) || 0), 0) || 0
  const avgRecovery =
    leachingData?.reduce((sum, d) => sum + (Number(d.recovery_rate_percent) || 0), 0) / (leachingData?.length || 1) || 0

  // Prepare chart data
  const chartData =
    leachingData
      ?.slice(0, 7)
      .reverse()
      .map((d) => ({
        date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        gold: Number(d.solution_grade_au_mgl).toFixed(2),
        silver: Number(d.solution_grade_ag_mgl).toFixed(1),
        recovery: Number(d.recovery_rate_percent).toFixed(1),
      })) || []

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leaching (Cyanidation) - Gold-Silver"
        description="Monitor cyanide leaching process and metal dissolution"
      />

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Ore Leached</CardTitle>
            <Beaker className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalLeached.toLocaleString()} MT</div>
            <p className="text-xs text-slate-500 mt-1">Last 10 batches</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Cyanide Used</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalCyanide.toLocaleString()} kg</div>
            <p className="text-xs text-slate-500 mt-1">Within safe limits</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Recovery Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgRecovery.toFixed(1)}%</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              Excellent efficiency
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Process Status</CardTitle>
            <Droplets className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Optimal</div>
            <p className="text-xs text-slate-500 mt-1">All parameters normal</p>
          </CardContent>
        </Card>
      </div>

      {/* Recovery Trend Chart */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Recovery Rate Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChartClient
            data={chartData}
            xKey="date"
            lines={[{ key: "recovery", name: "Recovery Rate (%)", color: "#10b981" }]}
            height={300}
            yAxisLabel="%"
          />
        </CardContent>
      </Card>

      {/* Leaching Data Table */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Recent Leaching Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Ore Leached (MT)</TableHead>
                <TableHead>Cyanide (kg)</TableHead>
                <TableHead>Au Grade (mg/L)</TableHead>
                <TableHead>Ag Grade (mg/L)</TableHead>
                <TableHead>Recovery %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leachingData && leachingData.length > 0 ? (
                leachingData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell className="font-medium">{new Date(data.date).toLocaleDateString()}</TableCell>
                    <TableCell>{Number(data.ore_leached_mt).toLocaleString()}</TableCell>
                    <TableCell>{Number(data.cyanide_consumed_kg).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        {Number(data.solution_grade_au_mgl).toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">
                        {Number(data.solution_grade_ag_mgl).toFixed(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        {Number(data.recovery_rate_percent).toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-500">
                    No leaching data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Process Description */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Cyanide Leaching Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Chemical Dissolution:</span> Ground ore slurry is mixed
              with sodium cyanide solution (NaCN) in leaching tanks. The cyanide chemically dissolves gold and silver
              from the ore into a liquid solution.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Oxygen Addition:</span> Air or oxygen is introduced to
              accelerate the leaching reaction, improving metal dissolution rates and overall recovery efficiency.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Pregnant Solution:</span> The resulting metal-rich solution
              (pregnant leach solution) contains dissolved gold and silver, ready for carbon absorption and recovery.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
