import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChartClient } from "@/components/charts/bar-chart-client"
import { Flame, Award, TrendingUp } from "lucide-react"

export default async function AuAgSmeltingPage() {
  const supabase = await createClient()

  const { data: smeltingData } = await supabase
    .from("au_ag_processing")
    .select("*")
    .not("au_dore_bars_qty", "is", null)
    .order("date", { ascending: false })
    .limit(10)

  const totalAuBars = smeltingData?.reduce((sum, d) => sum + (Number(d.au_dore_bars_qty) || 0), 0) || 0
  const totalAgBullion = smeltingData?.reduce((sum, d) => sum + (Number(d.ag_bullion_qty) || 0), 0) || 0
  const totalAuRecovered = smeltingData?.reduce((sum, d) => sum + (Number(d.au_recovered_oz) || 0), 0) || 0
  const totalAgRecovered = smeltingData?.reduce((sum, d) => sum + (Number(d.ag_recovered_oz) || 0), 0) || 0
  const avgAuPurity =
    smeltingData?.reduce((sum, d) => sum + (Number(d.au_dore_purity_percent) || 0), 0) / (smeltingData?.length || 1) ||
    0

  // Prepare chart data
  const chartData =
    smeltingData
      ?.slice(0, 7)
      .reverse()
      .map((d) => ({
        date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        gold: Number(d.au_recovered_oz).toFixed(1),
        silver: Number(d.ag_recovered_oz).toFixed(1),
      })) || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Smelting & Refining - Gold-Silver</h1>
        <p className="text-slate-600 mt-1">Track precious metals recovery and doré bar production</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Gold Doré Bars</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalAuBars}</div>
            <p className="text-xs text-slate-500 mt-1">Last 10 batches</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Silver Bullion</CardTitle>
            <Award className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalAgBullion}</div>
            <p className="text-xs text-slate-500 mt-1">Last 10 batches</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Gold Recovered</CardTitle>
            <Flame className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalAuRecovered.toFixed(1)} oz</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              High yield
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Au Purity</CardTitle>
            <Award className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgAuPurity.toFixed(1)}%</div>
            <p className="text-xs text-slate-500 mt-1">Premium quality</p>
          </CardContent>
        </Card>
      </div>

      {/* Production Chart */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Precious Metals Recovery Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChartClient
            data={chartData}
            xKey="date"
            bars={[
              { key: "gold", name: "Gold (oz)", color: "#eab308" },
              { key: "silver", name: "Silver (oz)", color: "#94a3b8" },
            ]}
            height={300}
            yAxisLabel="oz"
          />
        </CardContent>
      </Card>

      {/* Smelting Data Table */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Recent Smelting Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Au Recovered (oz)</TableHead>
                <TableHead>Au Doré Bars</TableHead>
                <TableHead>Au Purity %</TableHead>
                <TableHead>Ag Recovered (oz)</TableHead>
                <TableHead>Ag Bullion</TableHead>
                <TableHead>Ag Purity %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {smeltingData && smeltingData.length > 0 ? (
                smeltingData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell className="font-medium">{new Date(data.date).toLocaleDateString()}</TableCell>
                    <TableCell>{Number(data.au_recovered_oz).toFixed(2)}</TableCell>
                    <TableCell>{data.au_dore_bars_qty}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        {Number(data.au_dore_purity_percent).toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell>{Number(data.ag_recovered_oz).toFixed(2)}</TableCell>
                    <TableCell>{data.ag_bullion_qty}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">
                        {Number(data.ag_bullion_purity_percent).toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-slate-500">
                    No smelting data available
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
          <CardTitle className="text-lg font-bold text-slate-900">Smelting & Refining Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Elution & Electro-winning:</span> Loaded carbon is treated
              with hot caustic and cyanide solutions to strip the gold and silver. The metals are then deposited as
              metallic sludge using electro-winning cells.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Filtering & Drying:</span> The metallic sludge is filtered,
              dried in an oven, and treated with acid to remove impurities and residual base metals.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Smelting & Casting:</span> Purified material is melted in
              an induction furnace and poured into molds to form gold doré bars (85-95% gold) and silver bullion (95-96%
              silver), ready for final refining.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
