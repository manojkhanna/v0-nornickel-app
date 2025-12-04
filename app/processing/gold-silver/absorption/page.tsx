import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Filter, Activity, TrendingUp } from "lucide-react"

export default async function AuAgAbsorptionPage() {
  const supabase = await createClient()

  const { data: absorptionData } = await supabase
    .from("au_ag_processing")
    .select("*")
    .not("carbon_activity_percent", "is", null)
    .order("date", { ascending: false })
    .limit(10)

  const avgCarbonActivity =
    absorptionData?.reduce((sum, d) => sum + (Number(d.carbon_activity_percent) || 0), 0) /
      (absorptionData?.length || 1) || 0
  const avgAuAbsorbed =
    absorptionData?.reduce((sum, d) => sum + (Number(d.au_absorbed_percent) || 0), 0) / (absorptionData?.length || 1) ||
    0
  const avgAgAbsorbed =
    absorptionData?.reduce((sum, d) => sum + (Number(d.ag_absorbed_percent) || 0), 0) / (absorptionData?.length || 1) ||
    0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Carbon Absorption (CIP) - Gold-Silver</h1>
        <p className="text-slate-600 mt-1">Monitor activated carbon performance and metal adsorption</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Carbon Activity</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgCarbonActivity.toFixed(1)}%</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              High efficiency
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Gold Absorbed</CardTitle>
            <Filter className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgAuAbsorbed.toFixed(1)}%</div>
            <p className="text-xs text-slate-500 mt-1">Excellent capture rate</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Silver Absorbed</CardTitle>
            <Filter className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgAgAbsorbed.toFixed(1)}%</div>
            <p className="text-xs text-slate-500 mt-1">Optimal performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Absorption Data Table */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Recent Carbon Absorption Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Carbon Activity %</TableHead>
                <TableHead>Au Absorbed %</TableHead>
                <TableHead>Ag Absorbed %</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {absorptionData && absorptionData.length > 0 ? (
                absorptionData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell className="font-medium">{new Date(data.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {Number(data.carbon_activity_percent).toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        {Number(data.au_absorbed_percent).toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">
                        {Number(data.ag_absorbed_percent).toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Optimal</Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500">
                    No absorption data available
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
          <CardTitle className="text-lg font-bold text-slate-900">Carbon-in-Pulp (CIP) Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 mb-1">Carbon Addition</h4>
                <p className="text-sm text-slate-600">
                  Activated carbon is added to the leach slurry in a series of CIP adsorption tanks. The carbon attracts
                  and binds gold and silver ions from the solution.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 mb-1">Metal Adsorption</h4>
                <p className="text-sm text-slate-600">
                  As the slurry flows through multiple tanks, the carbon becomes progressively loaded with gold and
                  silver. The loaded carbon is periodically separated for elution.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 mb-1">Carbon Regeneration</h4>
                <p className="text-sm text-slate-600">
                  After elution, the carbon is regenerated in a kiln at high temperatures and reused in the absorption
                  circuit, creating a closed-loop system.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
