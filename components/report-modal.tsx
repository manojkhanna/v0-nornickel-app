"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, BarChart3 } from "lucide-react"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ReportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  report: {
    id: number
    name: string
    category: string
    description: string
    frequency: string
    lastGenerated: string
    format: string
    size: string
  }
}

// Sample data for different report types
const productionData = [
  { day: "Mon", mined: 2450, processed: 2280, shipped: 2100 },
  { day: "Tue", mined: 2580, processed: 2420, shipped: 2250 },
  { day: "Wed", mined: 2420, processed: 2350, shipped: 2180 },
  { day: "Thu", mined: 2680, processed: 2510, shipped: 2380 },
  { day: "Fri", mined: 2550, processed: 2450, shipped: 2320 },
  { day: "Sat", mined: 2380, processed: 2280, shipped: 2150 },
  { day: "Sun", mined: 2200, processed: 2080, shipped: 1950 },
]

const financialData = [
  { month: "Jan", revenue: 42.5, costs: 28.3, ebitda: 14.2 },
  { month: "Feb", revenue: 45.2, costs: 29.8, ebitda: 15.4 },
  { month: "Mar", revenue: 48.1, costs: 31.2, ebitda: 16.9 },
  { month: "Apr", revenue: 46.8, costs: 30.5, ebitda: 16.3 },
  { month: "May", revenue: 49.5, costs: 32.1, ebitda: 17.4 },
  { month: "Jun", revenue: 51.2, costs: 33.4, ebitda: 17.8 },
]

const shiftData = [
  { shift: "Day", attendance: 96.5, productivity: 92.3, efficiency: 89.8 },
  { shift: "Afternoon", attendance: 94.2, productivity: 87.5, efficiency: 85.2 },
  { shift: "Night", attendance: 91.8, productivity: 78.4, efficiency: 76.1 },
]

export function ReportModal({ open, onOpenChange, report }: ReportModalProps) {
  const getReportData = () => {
    if (report.category === "Operations") return productionData
    if (report.category === "Finance") return financialData
    if (report.name.includes("Shift")) return shiftData
    return productionData
  }

  const data = getReportData()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl">{report.name}</DialogTitle>
              <DialogDescription>{report.description}</DialogDescription>
              <div className="flex items-center gap-2 pt-2">
                <Badge variant="outline">{report.category}</Badge>
                <Badge variant="outline">{report.frequency}</Badge>
                <Badge variant="outline">{report.format}</Badge>
              </div>
            </div>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Report Metadata */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Last Generated
              </p>
              <p className="font-medium">{new Date(report.lastGenerated).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <FileText className="h-3 w-3" />
                File Size
              </p>
              <p className="font-medium">{report.size}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <BarChart3 className="h-3 w-3" />
                Data Points
              </p>
              <p className="font-medium">{data.length} records</p>
            </div>
          </div>

          {/* Chart Visualization */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Data Visualization</h3>
            {report.category === "Operations" && (
              <ChartContainer
                config={{
                  mined: { label: "Mined", color: "#f59e0b" },
                  processed: { label: "Processed", color: "#3b82f6" },
                  shipped: { label: "Shipped", color: "#10b981" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="mined" fill="#f59e0b" name="Mined (MT)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="processed" fill="#3b82f6" name="Processed (MT)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="shipped" fill="#10b981" name="Shipped (MT)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
            {report.category === "Finance" && (
              <ChartContainer
                config={{
                  revenue: { label: "Revenue", color: "#10b981" },
                  costs: { label: "Costs", color: "#ef4444" },
                  ebitda: { label: "EBITDA", color: "#3b82f6" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue ($M)" />
                    <Line type="monotone" dataKey="costs" stroke="#ef4444" strokeWidth={2} name="Costs ($M)" />
                    <Line type="monotone" dataKey="ebitda" stroke="#3b82f6" strokeWidth={2} name="EBITDA ($M)" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
            {report.name.includes("Shift") && (
              <ChartContainer
                config={{
                  attendance: { label: "Attendance", color: "#10b981" },
                  productivity: { label: "Productivity", color: "#3b82f6" },
                  efficiency: { label: "Efficiency", color: "#f59e0b" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="shift" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="attendance" fill="#10b981" name="Attendance (%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="productivity" fill="#3b82f6" name="Productivity (%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="efficiency" fill="#f59e0b" name="Efficiency (%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {report.category === "Operations" && (
              <>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Mined</p>
                  <p className="text-2xl font-bold text-amber-600">17,260 MT</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Processed</p>
                  <p className="text-2xl font-bold text-blue-600">16,370 MT</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Shipped</p>
                  <p className="text-2xl font-bold text-green-600">15,330 MT</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Efficiency</p>
                  <p className="text-2xl font-bold">94.8%</p>
                </div>
              </>
            )}
            {report.category === "Finance" && (
              <>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">$283.3M</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Costs</p>
                  <p className="text-2xl font-bold text-red-600">$185.3M</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Total EBITDA</p>
                  <p className="text-2xl font-bold text-blue-600">$98.0M</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Margin</p>
                  <p className="text-2xl font-bold">34.6%</p>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
