import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Hammer, Gauge, Activity } from "lucide-react"

export default async function CuZnCrushingPage() {
  const supabase = await createClient()

  const { data: crushingData } = await supabase
    .from("cu_zn_processing")
    .select("*")
    .order("date", { ascending: false })
    .limit(7)

  const totalCrushed = crushingData?.reduce((sum, d) => sum + (Number(d.ore_crushed_mt) || 0), 0) || 0
  const totalGround = crushingData?.reduce((sum, d) => sum + (Number(d.ore_ground_mt) || 0), 0) || 0
  const avgMillFeedRate =
    crushingData?.reduce((sum, d) => sum + (Number(d.mill_feed_rate_mtph) || 0), 0) / (crushingData?.length || 1) || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Crushing & Grinding - Copper-Zinc</h1>
        <p className="text-slate-600 mt-1">Monitor ore size reduction and mill performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Ore Crushed</CardTitle>
            <Hammer className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalCrushed.toLocaleString()} MT</div>
            <p className="text-xs text-slate-500 mt-1">Last 7 days</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Ore Ground</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalGround.toLocaleString()} MT</div>
            <p className="text-xs text-slate-500 mt-1">Last 7 days</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Mill Feed Rate</CardTitle>
            <Gauge className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgMillFeedRate.toFixed(1)} MT/h</div>
            <p className="text-xs text-slate-500 mt-1">Optimal throughput</p>
          </CardContent>
        </Card>
      </div>

      {/* Process Flow */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Crushing & Grinding Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 mb-1">Primary Crushing</h4>
                <p className="text-sm text-slate-600">
                  Raw ore from the mine passes through jaw crushers to reduce large rocks into smaller pieces (typically
                  10-15 cm).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 mb-1">Secondary Crushing</h4>
                <p className="text-sm text-slate-600">
                  Crushed ore moves to cone crushers for further size reduction to 2-5 cm pieces, preparing for
                  grinding.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 mb-1">Grinding (SAG & Ball Mills)</h4>
                <p className="text-sm text-slate-600">
                  Ore is ground into fine particles (less than 100 microns) using SAG and ball mills with water to
                  create a slurry suitable for flotation.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
