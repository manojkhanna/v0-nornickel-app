"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, PieChart, BarChart3, Activity } from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart as RePieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PageHeader } from "@/components/page-header"

// Demo financial data
const revenueData = [
  { month: "Jan", copper: 4200, zinc: 2800, gold: 1500, silver: 800 },
  { month: "Feb", copper: 4500, zinc: 3000, gold: 1600, silver: 850 },
  { month: "Mar", copper: 4800, zinc: 3200, gold: 1700, silver: 900 },
  { month: "Apr", copper: 5100, zinc: 3400, gold: 1800, silver: 950 },
  { month: "May", copper: 5400, zinc: 3600, gold: 1900, silver: 1000 },
  { month: "Jun", copper: 5700, zinc: 3800, gold: 2000, silver: 1050 },
]

const costBreakdown = [
  { name: "Variable Costs", value: 12500, color: "#f97316" },
  { name: "Fixed Costs", value: 8200, color: "#3b82f6" },
  { name: "Selling Expenses", value: 3400, color: "#8b5cf6" },
  { name: "G&A", value: 2800, color: "#06b6d4" },
  { name: "Finance Costs", value: 1900, color: "#ec4899" },
]

const ebitdaData = [
  { month: "Jan", ebitda: 3200, target: 3000 },
  { month: "Feb", ebitda: 3500, target: 3200 },
  { month: "Mar", ebitda: 3800, target: 3400 },
  { month: "Apr", ebitda: 4100, target: 3600 },
  { month: "May", ebitda: 4400, target: 3800 },
  { month: "Jun", ebitda: 4700, target: 4000 },
]

const variableCosts = [
  { category: "Reagents", amount: 3200, budget: 3000, variance: 6.7 },
  { category: "Electricity", amount: 2800, budget: 2900, variance: -3.4 },
  { category: "Labor", amount: 2400, budget: 2500, variance: -4.0 },
  { category: "Consumables", amount: 1900, budget: 1800, variance: 5.6 },
  { category: "Transport", amount: 1200, budget: 1300, variance: -7.7 },
  { category: "Water & Disposal", amount: 1000, budget: 1000, variance: 0 },
]

export default function FinancialOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader title="Financial Metrics" description="Comprehensive financial performance and cost analysis" />

      {/* Key Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$58.4M</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">EBITDA</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4.7M</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+17.5% above target</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Costs</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$28.8M</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+3.2% from budget</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operating Margin</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50.7%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+2.3% improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="ebitda">EBITDA Trend</TabsTrigger>
          <TabsTrigger value="variable">Variable Costs</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Metal Type</CardTitle>
              <CardDescription>Monthly revenue breakdown across all metal products (in thousands USD)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  copper: { label: "Copper", color: "#f97316" },
                  zinc: { label: "Zinc", color: "#3b82f6" },
                  gold: { label: "Gold", color: "#eab308" },
                  silver: { label: "Silver", color: "#64748b" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="copper" fill="#f97316" name="Copper" stackId="a" />
                    <Bar dataKey="zinc" fill="#3b82f6" name="Zinc" stackId="a" />
                    <Bar dataKey="gold" fill="#eab308" name="Gold" stackId="a" />
                    <Bar dataKey="silver" fill="#64748b" name="Silver" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Product</CardTitle>
                <CardDescription>YTD contribution percentage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Copper Concentrate</span>
                    <span className="text-sm font-bold">43.2%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-1" style={{ width: "43.2%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Zinc Concentrate</span>
                    <span className="text-sm font-bold">28.7%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-2" style={{ width: "28.7%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Gold Doré Bars</span>
                    <span className="text-sm font-bold">18.9%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-3" style={{ width: "18.9%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Silver Bullion</span>
                    <span className="text-sm font-bold">9.2%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-4" style={{ width: "9.2%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Selling Prices Achieved</CardTitle>
                <CardDescription>Average prices vs. market benchmark</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Copper ($/MT)</p>
                    <p className="text-2xl font-bold">$8,450</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    +2.3% vs market
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Zinc ($/MT)</p>
                    <p className="text-2xl font-bold">$2,680</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    +1.8% vs market
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Gold ($/oz)</p>
                    <p className="text-2xl font-bold">$2,045</p>
                  </div>
                  <Badge variant="outline" className="text-red-600">
                    -0.5% vs market
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Silver ($/oz)</p>
                    <p className="text-2xl font-bold">$24.80</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    +1.2% vs market
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cost Structure</CardTitle>
                <CardDescription>Total cost breakdown by category (in thousands USD)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Amount", color: "#f97316" },
                  }}
                  className="h-[350px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={costBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {costBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </RePieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Categories</CardTitle>
                <CardDescription>Detailed breakdown with budget comparison</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {costBreakdown.map((cost, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{cost.name}</span>
                      <span className="text-sm font-bold">${(cost.value / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(cost.value / 28800) * 100}%`,
                          backgroundColor: cost.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cost of Production by Metal</CardTitle>
              <CardDescription>Unit costs and efficiency metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Copper ($/MT)</p>
                    <p className="text-2xl font-bold">$3,450</p>
                    <Badge variant="outline" className="text-green-600">
                      -5.2% vs budget
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Zinc ($/MT)</p>
                    <p className="text-2xl font-bold">$1,280</p>
                    <Badge variant="outline" className="text-red-600">
                      +2.8% vs budget
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Gold ($/oz)</p>
                    <p className="text-2xl font-bold">$890</p>
                    <Badge variant="outline" className="text-green-600">
                      -3.1% vs budget
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Silver ($/oz)</p>
                    <p className="text-2xl font-bold">$12.40</p>
                    <Badge variant="outline" className="text-green-600">
                      -1.5% vs budget
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ebitda" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>EBITDA Performance</CardTitle>
              <CardDescription>Monthly EBITDA vs. target (in thousands USD)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  ebitda: { label: "Actual EBITDA", color: "#10b981" },
                  target: { label: "Target", color: "#6b7280" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ebitdaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="ebitda"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Actual EBITDA"
                      dot={{ fill: "#10b981", r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#6b7280"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Target"
                      dot={{ fill: "#6b7280", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>YTD EBITDA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$23.7M</div>
                <p className="text-sm text-muted-foreground mt-2">Target: $21.0M</p>
                <Badge variant="outline" className="mt-2 text-green-600">
                  +12.9% above target
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>EBITDA Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">40.6%</div>
                <p className="text-sm text-muted-foreground mt-2">Industry avg: 35%</p>
                <Badge variant="outline" className="mt-2 text-green-600">
                  +5.6pp above avg
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forecast FY</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$48.2M</div>
                <p className="text-sm text-muted-foreground mt-2">Budget: $42.0M</p>
                <Badge variant="outline" className="mt-2 text-green-600">
                  +14.8% vs budget
                </Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="variable" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Variable Costs Analysis</CardTitle>
              <CardDescription>Actual vs. budget with variance analysis (in thousands USD)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {variableCosts.map((cost, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{cost.category}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">Actual: ${cost.amount}K</span>
                        <span className="text-sm text-muted-foreground">Budget: ${cost.budget}K</span>
                        <Badge
                          variant={cost.variance > 0 ? "destructive" : "outline"}
                          className={cost.variance <= 0 ? "text-green-600" : ""}
                        >
                          {cost.variance > 0 ? "+" : ""}
                          {cost.variance.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                    <div className="relative h-2 rounded-full bg-muted">
                      <div
                        className={`h-2 rounded-full ${cost.variance > 0 ? "bg-red-500" : "bg-green-500"}`}
                        style={{ width: `${(cost.amount / Math.max(...variableCosts.map((c) => c.amount))) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Key Variable Cost Drivers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reagent Consumption</span>
                    <span className="text-sm font-bold">2,450 MT</span>
                  </div>
                  <p className="text-xs text-muted-foreground">+6.7% above budget due to ore grade variation</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Energy Consumption</span>
                    <span className="text-sm font-bold">18.2 GWh</span>
                  </div>
                  <p className="text-xs text-muted-foreground">-3.4% below budget from efficiency improvements</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consumables Usage</span>
                    <span className="text-sm font-bold">1,890 units</span>
                  </div>
                  <p className="text-xs text-muted-foreground">+5.6% above budget from increased maintenance</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Reagent Optimization</span>
                    <Badge>High Priority</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Potential savings: $180K/month through dosage optimization
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Energy Efficiency</span>
                    <Badge variant="outline">Medium Priority</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Potential savings: $95K/month from off-peak scheduling
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Transport Consolidation</span>
                    <Badge variant="outline">Medium Priority</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Potential savings: $65K/month from route optimization</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
