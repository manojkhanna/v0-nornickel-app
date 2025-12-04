"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Calendar, BarChart3, PieChart, Eye } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ReportModal } from "@/components/report-modal"

const reports = [
  {
    id: 1,
    name: "Monthly Production Report",
    category: "Operations",
    description: "Comprehensive production metrics across all processing stages",
    frequency: "Monthly",
    lastGenerated: "2025-01-31",
    format: "PDF",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Financial Performance Summary",
    category: "Finance",
    description: "Income statement, EBITDA, and cost analysis",
    frequency: "Monthly",
    lastGenerated: "2025-01-31",
    format: "Excel",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "Sales & Shipment Report",
    category: "Sales",
    description: "Order status, shipments, and customer analytics",
    frequency: "Weekly",
    lastGenerated: "2025-02-03",
    format: "PDF",
    size: "1.2 MB",
  },
  {
    id: 4,
    name: "Shift Performance Analysis",
    category: "Operations",
    description: "Attendance, productivity, and efficiency by shift",
    frequency: "Weekly",
    lastGenerated: "2025-02-03",
    format: "Excel",
    size: "980 KB",
  },
  {
    id: 5,
    name: "Project Status Dashboard",
    category: "Projects",
    description: "Progress, budget utilization, and milestone tracking",
    frequency: "Monthly",
    lastGenerated: "2025-01-31",
    format: "PDF",
    size: "3.1 MB",
  },
  {
    id: 6,
    name: "Copper-Zinc Processing KPIs",
    category: "Operations",
    description: "Detailed metrics from mining through concentrate shipment",
    frequency: "Daily",
    lastGenerated: "2025-02-06",
    format: "Excel",
    size: "1.5 MB",
  },
  {
    id: 7,
    name: "Gold-Silver Recovery Report",
    category: "Operations",
    description: "Leaching, absorption, and smelting performance",
    frequency: "Daily",
    lastGenerated: "2025-02-06",
    format: "Excel",
    size: "1.3 MB",
  },
  {
    id: 8,
    name: "Integration Data Summary",
    category: "Systems",
    description: "SAGE, SCADA, and LIMS data ingestion status",
    frequency: "Daily",
    lastGenerated: "2025-02-06",
    format: "PDF",
    size: "850 KB",
  },
  {
    id: 9,
    name: "Executive Summary",
    category: "Executive",
    description: "High-level overview for senior management",
    frequency: "Monthly",
    lastGenerated: "2025-01-31",
    format: "PDF",
    size: "2.8 MB",
  },
  {
    id: 10,
    name: "HSE Compliance Report",
    category: "Safety",
    description: "Health, safety, and environmental metrics",
    frequency: "Monthly",
    lastGenerated: "2025-01-31",
    format: "PDF",
    size: "1.9 MB",
  },
]

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<(typeof reports)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewReport = (report: (typeof reports)[0]) => {
    setSelectedReport(report)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Generate and download comprehensive operational reports"
        actions={
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Custom Report
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">Available report types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Reports</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.filter((r) => r.frequency === "Daily").length}</div>
            <p className="text-xs text-muted-foreground">Generated daily</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operations Reports</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.filter((r) => r.category === "Operations").length}</div>
            <p className="text-xs text-muted-foreground">Operational metrics</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Financial Reports</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.filter((r) => r.category === "Finance").length}</div>
            <p className="text-xs text-muted-foreground">Financial analysis</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="executive">Executive</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{report.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Frequency</p>
                      <p className="font-medium">{report.frequency}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Format</p>
                      <p className="font-medium">{report.format}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Size</p>
                      <p className="font-medium">{report.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewReport(report)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reports
              .filter((r) => r.category === "Operations")
              .map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{report.name}</CardTitle>
                        <CardDescription>{report.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{report.frequency}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewReport(report)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reports
              .filter((r) => r.category === "Finance")
              .map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{report.name}</CardTitle>
                        <CardDescription>{report.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{report.frequency}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewReport(report)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="executive" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reports
              .filter((r) => r.category === "Executive")
              .map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{report.name}</CardTitle>
                        <CardDescription>{report.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{report.frequency}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewReport(report)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedReport && <ReportModal open={isModalOpen} onOpenChange={setIsModalOpen} report={selectedReport} />}
    </div>
  )
}
