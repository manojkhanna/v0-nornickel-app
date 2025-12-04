"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, TrendingUp, Ship, DollarSign, Package } from "lucide-react"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PageHeader } from "@/components/page-header"
import { SalesDataEntryModal } from "@/components/sales-data-entry-modal"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const salesOrders = [
  {
    id: "SO-2025-001",
    customer: "Jiangxi Copper Corporation",
    country: "China",
    product: "Copper Concentrate",
    quantity: 1250,
    unit: "MT",
    price: 8450,
    total: 10562500,
    status: "shipped",
    orderDate: "2025-01-05",
    shipDate: "2025-01-18",
    paymentStatus: "paid",
  },
  {
    id: "SO-2025-002",
    customer: "Korea Zinc Co.",
    country: "South Korea",
    product: "Zinc Concentrate",
    quantity: 2800,
    unit: "MT",
    price: 2680,
    total: 7504000,
    status: "in-transit",
    orderDate: "2025-01-08",
    shipDate: "2025-01-22",
    paymentStatus: "pending",
  },
  {
    id: "SO-2025-003",
    customer: "Sumitomo Metal Mining",
    country: "Japan",
    product: "Gold Doré Bars",
    quantity: 850,
    unit: "oz",
    price: 2045,
    total: 1738250,
    status: "processing",
    orderDate: "2025-01-12",
    shipDate: "2025-02-05",
    paymentStatus: "advance-paid",
  },
  {
    id: "SO-2025-004",
    customer: "Zijin Mining Group",
    country: "China",
    product: "Copper Concentrate",
    quantity: 980,
    unit: "MT",
    price: 8420,
    total: 8251600,
    status: "confirmed",
    orderDate: "2025-01-15",
    shipDate: "2025-02-10",
    paymentStatus: "pending",
  },
  {
    id: "SO-2025-005",
    customer: "Teck Resources",
    country: "Canada",
    product: "Zinc Concentrate",
    quantity: 1500,
    unit: "MT",
    price: 2695,
    total: 4042500,
    status: "confirmed",
    orderDate: "2025-01-18",
    shipDate: "2025-02-15",
    paymentStatus: "pending",
  },
]

const salesTrend = [
  { month: "Jul", copper: 18500, zinc: 12200, gold: 3200, silver: 1800 },
  { month: "Aug", copper: 19800, zinc: 13100, gold: 3400, silver: 1900 },
  { month: "Sep", copper: 21200, zinc: 14500, gold: 3600, silver: 2100 },
  { month: "Oct", copper: 22500, zinc: 15200, gold: 3800, silver: 2200 },
  { month: "Nov", copper: 23800, zinc: 16100, gold: 4000, silver: 2400 },
  { month: "Dec", copper: 25200, zinc: 16800, gold: 4200, silver: 2500 },
]

const customerDistribution = [
  { region: "China", value: 45, orders: 12 },
  { region: "South Korea", value: 22, orders: 6 },
  { region: "Japan", value: 18, orders: 5 },
  { region: "Canada", value: 8, orders: 2 },
  { region: "Others", value: 7, orders: 3 },
]

export default function SalesOrdersPage() {
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<(typeof salesOrders)[0] | null>(null)

  const totalRevenue = salesOrders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = salesOrders.filter((o) => o.status === "confirmed" || o.status === "processing").length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales Operations"
        description="Manage orders, shipments, and customer relationships"
        actions={
          <Button onClick={() => setIsSalesModalOpen(true)} className="bg-slate-900 hover:bg-slate-800 text-white">
            <ShoppingCart className="mr-2 h-4 w-4" />
            New Order
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesOrders.length}</div>
            <p className="text-xs text-muted-foreground">Active sales orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-green-600">+18.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Awaiting shipment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesOrders.filter((o) => o.status === "in-transit").length}</div>
            <p className="text-xs text-muted-foreground">Currently shipping</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="trends">Sales Trends</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales Orders</CardTitle>
              <CardDescription>Track and manage all sales orders and shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{order.id}</h3>
                        <Badge
                          variant={
                            order.status === "shipped"
                              ? "default"
                              : order.status === "in-transit"
                                ? "outline"
                                : order.status === "processing"
                                  ? "secondary"
                                  : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                        <Badge
                          variant={
                            order.paymentStatus === "paid"
                              ? "default"
                              : order.paymentStatus === "advance-paid"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {order.paymentStatus}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-medium">{order.customer}</span>
                        <span>•</span>
                        <span>{order.country}</span>
                        <span>•</span>
                        <span>{order.product}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span>
                          Quantity:{" "}
                          <span className="font-medium">
                            {order.quantity.toLocaleString()} {order.unit}
                          </span>
                        </span>
                        <span>•</span>
                        <span>
                          Price:{" "}
                          <span className="font-medium">
                            ${order.price.toLocaleString()}/{order.unit}
                          </span>
                        </span>
                        <span>•</span>
                        <span>
                          Ship Date:{" "}
                          <span className="font-medium">{new Date(order.shipDate).toLocaleDateString()}</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="text-2xl font-bold">${(order.total / 1000000).toFixed(2)}M</p>
                      <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Revenue Trend</CardTitle>
              <CardDescription>6-month revenue breakdown by product (in thousands USD)</CardDescription>
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
                  <LineChart data={salesTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="copper" stroke="#f97316" strokeWidth={3} name="Copper" />
                    <Line type="monotone" dataKey="zinc" stroke="#3b82f6" strokeWidth={3} name="Zinc" />
                    <Line type="monotone" dataKey="gold" stroke="#eab308" strokeWidth={3} name="Gold" />
                    <Line type="monotone" dataKey="silver" stroke="#64748b" strokeWidth={3} name="Silver" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Copper Concentrate</span>
                    <span className="font-bold">$131.2M (46%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-1" style={{ width: "46%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Zinc Concentrate</span>
                    <span className="font-bold">$87.9M (31%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-2" style={{ width: "31%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Gold Doré Bars</span>
                    <span className="font-bold">$42.2M (15%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-3" style={{ width: "15%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Silver Bullion</span>
                    <span className="font-bold">$22.9M (8%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-4" style={{ width: "8%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">YoY Growth</p>
                    <p className="text-2xl font-bold text-green-600">+24.5%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Order Value</p>
                    <p className="text-2xl font-bold">$6.4M</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Orders/Month</p>
                    <p className="text-2xl font-bold">18.5</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Distribution by Region</CardTitle>
              <CardDescription>Sales breakdown by geographic region</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: { label: "Revenue %", color: "#3b82f6" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="region" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#3b82f6" name="Revenue %" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Jiangxi Copper Corporation</p>
                    <p className="text-sm text-muted-foreground">China</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$42.5M</p>
                    <p className="text-sm text-muted-foreground">12 orders</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Korea Zinc Co.</p>
                    <p className="text-sm text-muted-foreground">South Korea</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$28.8M</p>
                    <p className="text-sm text-muted-foreground">6 orders</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sumitomo Metal Mining</p>
                    <p className="text-sm text-muted-foreground">Japan</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$18.2M</p>
                    <p className="text-sm text-muted-foreground">5 orders</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Zijin Mining Group</p>
                    <p className="text-sm text-muted-foreground">China</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$15.6M</p>
                    <p className="text-sm text-muted-foreground">4 orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Active Customers</p>
                  <p className="text-3xl font-bold">28</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">New Customers (YTD)</p>
                  <p className="text-3xl font-bold text-green-600">5</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Customer Retention Rate</p>
                  <p className="text-3xl font-bold">94.2%</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Avg Customer Lifetime Value</p>
                  <p className="text-3xl font-bold">$12.8M</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <SalesDataEntryModal open={isSalesModalOpen} onOpenChange={setIsSalesModalOpen} />

      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedOrder.id} - Order Details</DialogTitle>
              <DialogDescription>Complete information for this sales order</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="text-lg font-semibold">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Country</p>
                    <p className="text-lg font-semibold">{selectedOrder.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Product</p>
                    <p className="text-lg font-semibold">{selectedOrder.product}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="text-lg font-semibold">{new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ship Date</p>
                    <p className="text-lg font-semibold">{new Date(selectedOrder.shipDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="flex gap-2">
                      <Badge>{selectedOrder.status}</Badge>
                      <Badge variant="outline">{selectedOrder.paymentStatus}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Quantity</span>
                    <span className="font-semibold">
                      {selectedOrder.quantity.toLocaleString()} {selectedOrder.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unit Price</span>
                    <span className="font-semibold">
                      ${selectedOrder.price.toLocaleString()}/{selectedOrder.unit}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>Total Value</span>
                    <span className="text-green-600">${(selectedOrder.total / 1000000).toFixed(2)}M</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                  Close
                </Button>
                <Button>Download Invoice</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
