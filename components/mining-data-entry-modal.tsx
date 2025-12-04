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

interface MiningDataEntryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  processType: "copper-zinc" | "gold-silver"
}

export function MiningDataEntryModal({ open, onOpenChange, processType }: MiningDataEntryModalProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [formData, setFormData] = useState({
    drilledVolume: "",
    minedOre: "",
    cuGrade: "",
    znGrade: "",
    auGrade: "",
    agGrade: "",
    romStockpile: "",
    shift: "day",
    supervisor: "",
    notes: "",
  })

  const handleSubmit = () => {
    console.log("[v0] Mining data entry:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {processType === "copper-zinc" ? "Copper-Zinc" : "Gold-Silver"} Mining Data Entry
          </DialogTitle>
          <DialogDescription>Record daily mining operations and ore extraction data</DialogDescription>
        </DialogHeader>

        <div className="max-h-[65vh] overflow-y-auto pr-2">
          <Tabs defaultValue="operations" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="grades">Ore Grades</TabsTrigger>
              <TabsTrigger value="stockpile">Stockpile</TabsTrigger>
            </TabsList>

            <TabsContent value="operations" className="space-y-6 mt-6">
              <div className="grid gap-20 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start" sideOffset={8}>
                      <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shift">Shift</Label>
                  <Select value={formData.shift} onValueChange={(value) => setFormData({ ...formData, shift: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={8} align="start">
                      <SelectItem value="day">Day Shift (06:00-14:00)</SelectItem>
                      <SelectItem value="afternoon">Afternoon Shift (14:00-22:00)</SelectItem>
                      <SelectItem value="night">Night Shift (22:00-06:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drilledVolume">Drilled Volume (MT)</Label>
                  <Input
                    id="drilledVolume"
                    type="number"
                    placeholder="e.g., 1250"
                    value={formData.drilledVolume}
                    onChange={(e) => setFormData({ ...formData, drilledVolume: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minedOre">Mined Ore (MT)</Label>
                  <Input
                    id="minedOre"
                    type="number"
                    placeholder="e.g., 2450"
                    value={formData.minedOre}
                    onChange={(e) => setFormData({ ...formData, minedOre: e.target.value })}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="supervisor">Supervisor</Label>
                  <Input
                    id="supervisor"
                    placeholder="e.g., Ahmed Al-Rashid"
                    value={formData.supervisor}
                    onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="grades" className="space-y-6 mt-6">
              <div className="grid gap-20 md:grid-cols-2">
                {processType === "copper-zinc" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="cuGrade">Copper Grade (%)</Label>
                      <Input
                        id="cuGrade"
                        type="number"
                        step="0.01"
                        placeholder="e.g., 1.85"
                        value={formData.cuGrade}
                        onChange={(e) => setFormData({ ...formData, cuGrade: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Target range: 1.5% - 2.5%</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="znGrade">Zinc Grade (%)</Label>
                      <Input
                        id="znGrade"
                        type="number"
                        step="0.01"
                        placeholder="e.g., 3.42"
                        value={formData.znGrade}
                        onChange={(e) => setFormData({ ...formData, znGrade: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Target range: 2.8% - 4.2%</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="auGrade">Gold Grade (g/t)</Label>
                      <Input
                        id="auGrade"
                        type="number"
                        step="0.01"
                        placeholder="e.g., 2.45"
                        value={formData.auGrade}
                        onChange={(e) => setFormData({ ...formData, auGrade: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Target range: 1.8 - 3.5 g/t</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="agGrade">Silver Grade (g/t)</Label>
                      <Input
                        id="agGrade"
                        type="number"
                        step="0.01"
                        placeholder="e.g., 18.5"
                        value={formData.agGrade}
                        onChange={(e) => setFormData({ ...formData, agGrade: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Target range: 12 - 25 g/t</p>
                    </div>
                  </>
                )}
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Grade Quality Assessment</h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Current Grade Quality:</span>
                    <span className="font-bold text-green-600">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recovery Potential:</span>
                    <span className="font-bold">92-95%</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stockpile" className="space-y-6 mt-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="romStockpile">ROM Stockpile (MT)</Label>
                  <Input
                    id="romStockpile"
                    type="number"
                    placeholder="e.g., 15800"
                    value={formData.romStockpile}
                    onChange={(e) => setFormData({ ...formData, romStockpile: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Current stockpile level before today's operations</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Operational Notes</Label>
                  <textarea
                    id="notes"
                    className="w-full min-h-[100px] p-3 border rounded-md"
                    placeholder="Enter any relevant notes about today's operations, equipment status, or observations..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Stockpile Status</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Current Level:</span>
                      <span className="font-bold">15,800 MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Capacity:</span>
                      <span className="font-bold">25,000 MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Utilization:</span>
                      <span className="font-bold text-green-600">63.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t bg-white sticky bottom-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-slate-900 hover:bg-slate-800">
            <Save className="mr-2 h-4 w-4" />
            Save Entry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
