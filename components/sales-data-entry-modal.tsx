"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save } from "lucide-react"
import { format } from "date-fns"

interface SalesDataEntryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SalesDataEntryModal({ open, onOpenChange }: SalesDataEntryModalProps) {
  const [orderDate, setOrderDate] = useState<Date>(new Date())
  const [shipmentDate, setShipmentDate] = useState<Date | undefined>()
  const [formData, setFormData] = useState({
    orderNumber: `ORD-${Date.now()}`,
    customer: "",
    product: "copper",
    quantity: "",
    unit: "MT",
    price: "",
    destination: "",
    paymentTerms: "30-days",
    status: "pending",
    notes: "",
  })

  const handleSubmit = () => {
    console.log("[v0] Sales order entry:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">New Sales Order</DialogTitle>
          <DialogDescription>Create a new sales order for mineral concentrate or precious metals</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Order Details</TabsTrigger>
            <TabsTrigger value="product">Product Info</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Order Number</Label>
                <Input id="orderNumber" value={formData.orderNumber} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="orderDate">Order Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {orderDate ? format(orderDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={orderDate} onSelect={(d) => d && setOrderDate(d)} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="customer">Customer Name</Label>
                <Input
                  id="customer"
                  placeholder="e.g., Jiangxi Copper Corporation"
                  value={formData.customer}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Select
                  value={formData.paymentTerms}
                  onValueChange={(value) => setFormData({ ...formData, paymentTerms: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="advance">Advance Payment</SelectItem>
                    <SelectItem value="15-days">Net 15 Days</SelectItem>
                    <SelectItem value="30-days">Net 30 Days</SelectItem>
                    <SelectItem value="60-days">Net 60 Days</SelectItem>
                    <SelectItem value="lc">Letter of Credit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Order Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="ready">Ready to Ship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="product" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="product">Product Type</Label>
                <Select
                  value={formData.product}
                  onValueChange={(value) => setFormData({ ...formData, product: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="copper">Copper Concentrate</SelectItem>
                    <SelectItem value="zinc">Zinc Concentrate</SelectItem>
                    <SelectItem value="gold">Gold Doré Bars</SelectItem>
                    <SelectItem value="silver">Silver Bullion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <div className="flex gap-2">
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="e.g., 500"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="flex-1"
                  />
                  <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MT">MT</SelectItem>
                      <SelectItem value="oz">oz</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Unit Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 8450"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Total Value</Label>
                <div className="text-2xl font-bold text-green-600">
                  ${((Number(formData.quantity) || 0) * (Number(formData.price) || 0)).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Product Specifications</h4>
              <div className="grid gap-2 text-sm">
                {formData.product === "copper" && (
                  <>
                    <div className="flex justify-between">
                      <span>Cu Content:</span>
                      <span className="font-bold">25-28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Moisture:</span>
                      <span className="font-bold">{"<"}8%</span>
                    </div>
                  </>
                )}
                {formData.product === "zinc" && (
                  <>
                    <div className="flex justify-between">
                      <span>Zn Content:</span>
                      <span className="font-bold">48-52%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Moisture:</span>
                      <span className="font-bold">{"<"}8%</span>
                    </div>
                  </>
                )}
                {formData.product === "gold" && (
                  <>
                    <div className="flex justify-between">
                      <span>Purity:</span>
                      <span className="font-bold">85-95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Form:</span>
                      <span className="font-bold">Doré Bars</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Select
                  value={formData.destination}
                  onValueChange={(value) => setFormData({ ...formData, destination: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="china">China (Shanghai/Ningbo)</SelectItem>
                    <SelectItem value="korea">South Korea (Busan)</SelectItem>
                    <SelectItem value="japan">Japan (Tokyo/Osaka)</SelectItem>
                    <SelectItem value="india">India (Mumbai)</SelectItem>
                    <SelectItem value="europe">Europe (Rotterdam)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shipmentDate">Expected Shipment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {shipmentDate ? format(shipmentDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={shipmentDate}
                      onSelect={setShipmentDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Shipping Notes</Label>
                <textarea
                  id="notes"
                  className="w-full min-h-[100px] p-3 border rounded-md"
                  placeholder="Enter any special shipping instructions, packaging requirements, or documentation notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Shipping Information</h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Port of Loading:</span>
                    <span className="font-bold">Jazan Seaport, Saudi Arabia</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Transit:</span>
                    <span className="font-bold">18-25 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Incoterms:</span>
                    <span className="font-bold">FOB Jazan</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-slate-900 hover:bg-slate-800">
            <Save className="mr-2 h-4 w-4" />
            Create Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
