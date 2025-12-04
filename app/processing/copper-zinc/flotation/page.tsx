import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChartClient } from "@/components/charts/bar-chart-client"
import { Droplets, Package, TrendingUp } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default async function CuZnFlotationPage() {
  const supabase = await createClient()

  const { data: flotationData } = await supabase
    .from("cu_zn_processing")
    .select("*")
    .eq("stage", "flotation")
    .order("date", { ascending: false })
    .limit(10)

  const totalCuConcentrate = flotationData?.reduce((sum, d) => sum + (Number(d.cu_concentrate_mt) || 0), 0) || 0
  const totalZnConcentrate = flotationData?.reduce((sum, d) => sum + (Number(d.zn_concentrate_mt) || 0), 0) || 0
  const avgCuGrade =
    flotationData?.reduce((sum, d) => sum + (Number(d.cu_concentrate_percent) || 0), 0) /
      (flotationData?.length || 1) || 0
  const avgZnGrade =
    flotationData?.reduce((sum, d) => sum + (Number(d.zn_concentrate_percent) || 0), 0) /
      (flotationData?.length || 1) || 0

  // Prepare chart data
  const chartData =
    flotationData
      ?.slice(0, 7)
      .reverse()
      .map((d) => ({
        date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        copper: Number(d.cu_concentrate_mt).toFixed(1),
        zinc: Number(d.zn_concentrate_mt).toFixed(1),
      })) || []

  return (
    <div className="space-y-6">
      <PageHeader title="Flotation - Copper-Zinc" description="Monitor concentrate production and recovery rates" />

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Cu Concentrate</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalCuConcentrate.toFixed(1)} MT</div>
            <p className="text-xs text-slate-500 mt-1">Last 10 batches</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Zn Concentrate</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalZnConcentrate.toFixed(1)} MT</div>
            <p className="text-xs text-slate-500 mt-1">Last 10 batches</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Cu Grade</CardTitle>
            <Droplets className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgCuGrade.toFixed(1)}%</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              High quality
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Zn Grade</CardTitle>
            <Droplets className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgZnGrade.toFixed(1)}%</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              Excellent recovery
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Production Chart */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Concentrate Production Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChartClient
            data={chartData}
            bars={[
              { dataKey: "copper", fill: "#3b82f6", name: "Copper (MT)" },
              { dataKey: "zinc", fill: "#a855f7", name: "Zinc (MT)" },
            ]}
            xAxisDataKey="date"
            yAxisLabel="MT"
          />
        </CardContent>
      </Card>

      {/* Flotation Data Table */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Recent Flotation Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Feed (MT)</TableHead>
                <TableHead>Cu Conc. (MT)</TableHead>
                <TableHead>Cu Grade (%)</TableHead>
                <TableHead>Zn Conc. (MT)</TableHead>
                <TableHead>Zn Grade (%)</TableHead>
                <TableHead>Tailings (MT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flotationData && flotationData.length > 0 ? (
                flotationData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell className="font-medium">{new Date(data.date).toLocaleDateString()}</TableCell>
                    <TableCell>{Number(data.concentrate_feed_mt).toLocaleString()}</TableCell>
                    <TableCell>{Number(data.cu_concentrate_mt).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {Number(data.cu_concentrate_percent).toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell>{Number(data.zn_concentrate_mt).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {Number(data.zn_concentrate_percent).toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell>{Number(data.tailings_mt).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-slate-500">
                    No flotation data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
