"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp } from "lucide-react"
import { PageHeader } from "@/components/page-header"

const incomeStatement = {
  revenue: {
    copper: 25200,
    zinc: 16800,
    gold: 11000,
    silver: 5400,
    total: 58400,
  },
  cogs: {
    rawMaterial: 8500,
    inventoryChange: -450,
    total: 8050,
  },
  variableCosts: {
    sampling: 280,
    electricity: 2800,
    lpg: 450,
    slagDisposal: 320,
    water: 1000,
    reagents: 3200,
    consumables: 1900,
    labor: 2400,
    staffCosts: 800,
    development: 150,
    travel: 120,
    maintenance: 1800,
    transport: 1200,
    ict: 180,
    hse: 420,
    utilities: 680,
    admin: 500,
    total: 18200,
  },
  sellingExpenses: {
    copper: 850,
    zinc: 560,
    gold: 380,
    silver: 180,
    total: 1970,
  },
  ga: {
    labor: 1200,
    staffCosts: 450,
    development: 280,
    travel: 180,
    maintenance: 320,
    transport: 150,
    ict: 220,
    hse: 180,
    utilities: 120,
    admin: 380,
    depreciation: 1200,
    total: 4680,
  },
  financeCosts: {
    bankLoan: 680,
    shareholderLoans: 420,
    leasedAssets: 180,
    shortTermLoans: 120,
    deferredFinance: 85,
    guaranteeCharges: 95,
    lcCharges: 140,
    latePayment: 25,
    fxGains: -180,
    total: 1565,
  },
}

const budget = {
  revenue: 55000,
  grossProfit: 32000,
  operatingMargin: 28000,
  ebitda: 21000,
  netIncome: 16500,
}

export default function IncomeStatementPage() {
  const grossProfit = incomeStatement.revenue.total - incomeStatement.cogs.total - incomeStatement.variableCosts.total
  const operatingMargin = grossProfit - incomeStatement.sellingExpenses.total
  const ebitda = operatingMargin - incomeStatement.ga.total + incomeStatement.ga.depreciation
  const netIncome = ebitda - incomeStatement.ga.depreciation - incomeStatement.financeCosts.total

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader title="Income Statement" description="Comprehensive profit & loss statement with budget comparison" />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(incomeStatement.revenue.total / 1000).toFixed(1)}M</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>
                +{(((incomeStatement.revenue.total - budget.revenue) / budget.revenue) * 100).toFixed(1)}% vs budget
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gross Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(grossProfit / 1000).toFixed(1)}M</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+{(((grossProfit - budget.grossProfit) / budget.grossProfit) * 100).toFixed(1)}% vs budget</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Operating Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(operatingMargin / 1000).toFixed(1)}M</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>
                +{(((operatingMargin - budget.operatingMargin) / budget.operatingMargin) * 100).toFixed(1)}% vs budget
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">EBITDA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(ebitda / 1000).toFixed(1)}M</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+{(((ebitda - budget.ebitda) / budget.ebitda) * 100).toFixed(1)}% vs budget</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(netIncome / 1000).toFixed(1)}M</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+{(((netIncome - budget.netIncome) / budget.netIncome) * 100).toFixed(1)}% vs budget</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="detailed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="detailed">Detailed Statement</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Breakdown</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income Statement - YTD</CardTitle>
              <CardDescription>All amounts in thousands USD</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Revenue Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-bold text-lg border-b pb-2">
                    <span>REVENUE</span>
                    <span>${(incomeStatement.revenue.total / 1000).toFixed(1)}M</span>
                  </div>
                  <div className="pl-4 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Copper Concentrate Sales</span>
                      <span>${(incomeStatement.revenue.copper / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Zinc Concentrate Sales</span>
                      <span>${(incomeStatement.revenue.zinc / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Gold Doré Sales</span>
                      <span>${(incomeStatement.revenue.gold / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Silver Bullion Sales</span>
                      <span>${(incomeStatement.revenue.silver / 1000).toFixed(1)}M</span>
                    </div>
                  </div>
                </div>

                {/* COGS Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-semibold border-b pb-2">
                    <span>COST OF GOODS SOLD</span>
                    <span className="text-red-600">-${(incomeStatement.cogs.total / 1000).toFixed(1)}M</span>
                  </div>
                  <div className="pl-4 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Cost of Raw Material</span>
                      <span>${(incomeStatement.cogs.rawMaterial / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Change in Inventory</span>
                      <span className="text-green-600">
                        ${(incomeStatement.cogs.inventoryChange / 1000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </div>

                {/* Variable Costs */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-semibold border-b pb-2">
                    <span>VARIABLE COSTS</span>
                    <span className="text-red-600">-${(incomeStatement.variableCosts.total / 1000).toFixed(1)}M</span>
                  </div>
                  <div className="pl-4 space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Reagents</span>
                      <span>${(incomeStatement.variableCosts.reagents / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Electricity</span>
                      <span>${(incomeStatement.variableCosts.electricity / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Labor Costs</span>
                      <span>${(incomeStatement.variableCosts.labor / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Consumables</span>
                      <span>${(incomeStatement.variableCosts.consumables / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Transport & Logistics</span>
                      <span>${(incomeStatement.variableCosts.transport / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Maintenance & Contracting</span>
                      <span>${(incomeStatement.variableCosts.maintenance / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Water & Effluent Disposal</span>
                      <span>${(incomeStatement.variableCosts.water / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Other Variable Costs</span>
                      <span>
                        $
                        {(
                          (incomeStatement.variableCosts.total -
                            incomeStatement.variableCosts.reagents -
                            incomeStatement.variableCosts.electricity -
                            incomeStatement.variableCosts.labor -
                            incomeStatement.variableCosts.consumables -
                            incomeStatement.variableCosts.transport -
                            incomeStatement.variableCosts.maintenance -
                            incomeStatement.variableCosts.water) /
                          1000
                        ).toFixed(1)}
                        M
                      </span>
                    </div>
                  </div>
                </div>

                {/* Gross Profit */}
                <div className="flex items-center justify-between font-bold text-lg bg-muted p-3 rounded">
                  <span>GROSS PROFIT</span>
                  <span className="text-green-600">${(grossProfit / 1000).toFixed(1)}M</span>
                </div>

                {/* Selling Expenses */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-semibold border-b pb-2">
                    <span>SELLING EXPENSES</span>
                    <span className="text-red-600">-${(incomeStatement.sellingExpenses.total / 1000).toFixed(1)}M</span>
                  </div>
                  <div className="pl-4 space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Copper Selling Expense</span>
                      <span>${(incomeStatement.sellingExpenses.copper / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Zinc Selling Expense</span>
                      <span>${(incomeStatement.sellingExpenses.zinc / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Gold Selling Expense</span>
                      <span>${(incomeStatement.sellingExpenses.gold / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Silver Selling Expense</span>
                      <span>${(incomeStatement.sellingExpenses.silver / 1000).toFixed(1)}M</span>
                    </div>
                  </div>
                </div>

                {/* Operating Margin */}
                <div className="flex items-center justify-between font-bold text-lg bg-muted p-3 rounded">
                  <span>OPERATING MARGIN</span>
                  <span className="text-green-600">${(operatingMargin / 1000).toFixed(1)}M</span>
                </div>

                {/* G&A */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-semibold border-b pb-2">
                    <span>GENERAL & ADMINISTRATIVE</span>
                    <span className="text-red-600">-${(incomeStatement.ga.total / 1000).toFixed(1)}M</span>
                  </div>
                  <div className="pl-4 space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Depreciation & Amortization</span>
                      <span>${(incomeStatement.ga.depreciation / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Labor & Staff Costs</span>
                      <span>${((incomeStatement.ga.labor + incomeStatement.ga.staffCosts) / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Administrative Expenses</span>
                      <span>
                        $
                        {(
                          (incomeStatement.ga.total -
                            incomeStatement.ga.depreciation -
                            incomeStatement.ga.labor -
                            incomeStatement.ga.staffCosts) /
                          1000
                        ).toFixed(1)}
                        M
                      </span>
                    </div>
                  </div>
                </div>

                {/* EBITDA */}
                <div className="flex items-center justify-between font-bold text-lg bg-green-50 p-3 rounded">
                  <span>EBITDA</span>
                  <span className="text-green-600">${(ebitda / 1000).toFixed(1)}M</span>
                </div>

                {/* Finance Costs */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-semibold border-b pb-2">
                    <span>FINANCE COSTS</span>
                    <span className="text-red-600">-${(incomeStatement.financeCosts.total / 1000).toFixed(1)}M</span>
                  </div>
                  <div className="pl-4 space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Interest on Bank Loans</span>
                      <span>${(incomeStatement.financeCosts.bankLoan / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Interest on Shareholder Loans</span>
                      <span>${(incomeStatement.financeCosts.shareholderLoans / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>FX Gains/(Losses)</span>
                      <span className="text-green-600">
                        ${(incomeStatement.financeCosts.fxGains / 1000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Other Finance Costs</span>
                      <span>
                        $
                        {(
                          (incomeStatement.financeCosts.total -
                            incomeStatement.financeCosts.bankLoan -
                            incomeStatement.financeCosts.shareholderLoans +
                            incomeStatement.financeCosts.fxGains) /
                          1000
                        ).toFixed(1)}
                        M
                      </span>
                    </div>
                  </div>
                </div>

                {/* Net Income */}
                <div className="flex items-center justify-between font-bold text-xl bg-green-100 p-4 rounded">
                  <span>NET INCOME</span>
                  <span className="text-green-600">${(netIncome / 1000).toFixed(1)}M</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis by Product</CardTitle>
              <CardDescription>Detailed breakdown with quantities and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Copper Concentrate</h3>
                    <span className="text-2xl font-bold">${(incomeStatement.revenue.copper / 1000).toFixed(1)}M</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Quantity Sold</p>
                      <p className="font-semibold">2,980 MT</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Price</p>
                      <p className="font-semibold">$8,456/MT</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">% of Revenue</p>
                      <p className="font-semibold">43.2%</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Zinc Concentrate</h3>
                    <span className="text-2xl font-bold">${(incomeStatement.revenue.zinc / 1000).toFixed(1)}M</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Quantity Sold</p>
                      <p className="font-semibold">6,270 MT</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Price</p>
                      <p className="font-semibold">$2,680/MT</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">% of Revenue</p>
                      <p className="font-semibold">28.8%</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Gold Doré Bars</h3>
                    <span className="text-2xl font-bold">${(incomeStatement.revenue.gold / 1000).toFixed(1)}M</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Quantity Sold</p>
                      <p className="font-semibold">5,380 oz</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Price</p>
                      <p className="font-semibold">$2,045/oz</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">% of Revenue</p>
                      <p className="font-semibold">18.8%</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Silver Bullion</h3>
                    <span className="text-2xl font-bold">${(incomeStatement.revenue.silver / 1000).toFixed(1)}M</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Quantity Sold</p>
                      <p className="font-semibold">217,740 oz</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Price</p>
                      <p className="font-semibold">$24.80/oz</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">% of Revenue</p>
                      <p className="font-semibold">9.2%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cost Structure Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Variable Costs</span>
                    <span className="font-bold">
                      ${(incomeStatement.variableCosts.total / 1000).toFixed(1)}M (56.2%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-1" style={{ width: "56.2%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fixed Costs (G&A)</span>
                    <span className="font-bold">${(incomeStatement.ga.total / 1000).toFixed(1)}M (14.5%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-2" style={{ width: "14.5%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">COGS</span>
                    <span className="font-bold">${(incomeStatement.cogs.total / 1000).toFixed(1)}M (24.9%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-3" style={{ width: "24.9%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Selling Expenses</span>
                    <span className="font-bold">
                      ${(incomeStatement.sellingExpenses.total / 1000).toFixed(1)}M (6.1%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-4" style={{ width: "6.1%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Margin Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gross Margin</span>
                  <div className="text-right">
                    <p className="font-bold">{((grossProfit / incomeStatement.revenue.total) * 100).toFixed(1)}%</p>
                    <Badge variant="outline" className="text-green-600">
                      Excellent
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Operating Margin</span>
                  <div className="text-right">
                    <p className="font-bold">{((operatingMargin / incomeStatement.revenue.total) * 100).toFixed(1)}%</p>
                    <Badge variant="outline" className="text-green-600">
                      Strong
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">EBITDA Margin</span>
                  <div className="text-right">
                    <p className="font-bold">{((ebitda / incomeStatement.revenue.total) * 100).toFixed(1)}%</p>
                    <Badge variant="outline" className="text-green-600">
                      Above Target
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Net Margin</span>
                  <div className="text-right">
                    <p className="font-bold">{((netIncome / incomeStatement.revenue.total) * 100).toFixed(1)}%</p>
                    <Badge variant="outline" className="text-green-600">
                      Healthy
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
