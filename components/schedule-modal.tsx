"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"

interface ScheduleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScheduleModal({ open, onOpenChange }: ScheduleModalProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedShift, setSelectedShift] = useState<string>("")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("")

  const handleSchedule = () => {
    console.log("[v0] Scheduling shift:", { date, selectedShift, selectedDepartment })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Schedule Shift</DialogTitle>
          <DialogDescription>Create and manage shift schedules for your workforce</DialogDescription>
        </DialogHeader>

        <div className="max-h-[65vh] overflow-y-auto pr-2">
          <div className="grid gap-12 py-4">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </div>

              <div className="space-y-20">
                <div className="space-y-2">
                  <Label htmlFor="shift">Shift Type</Label>
                  <Select value={selectedShift} onValueChange={setSelectedShift}>
                    <SelectTrigger id="shift">
                      <SelectValue placeholder="Select shift" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={8}>
                      <SelectItem value="day">Day Shift (06:00 - 14:00)</SelectItem>
                      <SelectItem value="afternoon">Afternoon Shift (14:00 - 22:00)</SelectItem>
                      <SelectItem value="night">Night Shift (22:00 - 06:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={8}>
                      <SelectItem value="mining">Mining Operations</SelectItem>
                      <SelectItem value="processing">Processing Plant</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="quality">Quality Control</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supervisor">Supervisor</Label>
                  <Select>
                    <SelectTrigger id="supervisor">
                      <SelectValue placeholder="Assign supervisor" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={8}>
                      <SelectItem value="ahmed">Ahmed Al-Rashid</SelectItem>
                      <SelectItem value="mohammed">Mohammed Hassan</SelectItem>
                      <SelectItem value="fatima">Fatima Al-Zahrani</SelectItem>
                      <SelectItem value="khalid">Khalid Ibrahim</SelectItem>
                      <SelectItem value="sara">Sara Al-Mutairi</SelectItem>
                      <SelectItem value="omar">Omar Abdullah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workers">Required Workers</Label>
                  <Select>
                    <SelectTrigger id="workers">
                      <SelectValue placeholder="Number of workers" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={8}>
                      <SelectItem value="20">20 workers</SelectItem>
                      <SelectItem value="30">30 workers</SelectItem>
                      <SelectItem value="40">40 workers</SelectItem>
                      <SelectItem value="50">50 workers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Current Schedule Overview</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Day Shift</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">95 workers scheduled</span>
                  </div>
                  <Badge variant="outline" className="mt-2 text-green-600">
                    Fully staffed
                  </Badge>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Afternoon Shift</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">66 workers scheduled</span>
                  </div>
                  <Badge variant="outline" className="mt-2 text-yellow-600">
                    Need 10 more
                  </Badge>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Night Shift</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">25 workers scheduled</span>
                  </div>
                  <Badge variant="outline" className="mt-2 text-red-600">
                    Understaffed
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t pt-4 bg-white sticky bottom-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSchedule} className="bg-slate-900 hover:bg-slate-800 text-white">
            Create Schedule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
