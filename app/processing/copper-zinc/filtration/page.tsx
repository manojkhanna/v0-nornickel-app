import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Droplet, Package, TrendingDown } from "lucide-react"

export default async function CuZnFiltrationPage() {
  const supabase = await createClient()

  const { data: filtrationData } = await supabase
    .from("cu_zn_processing")
    .select("*")
    .not("wmt", "is", null)
    .order("date", { ascending: false })
    .limit(10)

  const totalWMT = filtrationData?.reduce((sum, d) => sum + (Number(d.wmt) || 0), 0) || 0
  const totalDMT = filtrationData?.reduce((sum, d) => sum + (Number(d.dmt) || 0), 0) || 0
  const avgMoisture =
    filtrationData?.reduce((sum, d) => sum + (Number(d.moisture_percent) || 0), 0) / (filtrationData?.length || 1) || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Filtration & Dewatering - Copper-Zinc</h1>
        <p className="text-slate-600 mt-1">Monitor moisture removal and concentrate preparation for shipment</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Wet Metric Tonnes</CardTitle>
            <Droplet className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalWMT.toFixed(1)} MT</div>
            <p className="text-xs text-slate-500 mt-1">Before dewatering</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Dry Metric Tonnes</CardTitle>
            <Package className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalDMT.toFixed(1)} MT</div>
            <p className="text-xs text-slate-500 mt-1">Ready for shipment</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Moisture Content</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgMoisture.toFixed(1)}%</div>
            <p className="text-xs text-slate-500 mt-1">Within specifications</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtration Data Table */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Recent Filtration Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Wet MT</TableHead>
                <TableHead>Dry MT</TableHead>
                <TableHead>Moisture %</TableHead>
                <TableHead>Water Removed</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtrationData && filtrationData.length > 0 ? (
                filtrationData.map((data) => {
                  const waterRemoved = Number(data.wmt) - Number(data.dmt)
                  return (
                    <TableRow key={data.id}>
                      <TableCell className="font-medium">{new Date(data.date).toLocaleDateString()}</TableCell>
                      <TableCell>{Number(data.wmt).toFixed(2)}</TableCell>
                      <TableCell>{Number(data.dmt).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {Number(data.moisture_percent).toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell>{waterRemoved.toFixed(2)} MT</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-500">
                    No filtration data available
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
          <CardTitle className="text-lg font-bold text-slate-900">Filtration Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Thickening:</span> The concentrate from flotation enters
              thickeners where solids settle to the bottom, reducing water content from 70-80% to approximately 50%.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Filtration:</span> Thickened concentrate passes through
              vacuum or pressure filters that remove remaining water, producing a filter cake with less than 10%
              moisture.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Storage & Shipment:</span> Dried concentrate is stored in
              silos and prepared for trucking to Jazan Seaport for export to refineries in Far East Asia.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
