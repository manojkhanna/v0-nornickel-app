"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ShiftDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shift: {
    id: number
    shift: string
    time: string
    workers: number
    supervisor: string
    status: string
    department: string
  }
}

export function ShiftDetailModal({ open, onOpenChange, shift }: ShiftDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl flex items-center gap-2">
                {shift.shift} - {shift.department}
                <Badge variant={shift.status === "active" ? "default" : "outline"}>{shift.status}</Badge>
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {shift.time}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Shift Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" />
                Total Workers
              </p>
              <p className="text-3xl font-bold mt-1">{shift.workers}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Supervisor</p>
              <p className="text-lg font-semibold mt-1">{shift.supervisor}</p>
            </div>
          </div>

          {/* Attendance Breakdown */}
          <div className="space-y-3">
            <h3 className="font-semibold">Attendance Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Present</span>
                </div>
                <span className="font-bold">{shift.workers - 3} workers</span>
              </div>
              <Progress value={((shift.workers - 3) / shift.workers) * 100} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Late</span>
                </div>
                <span className="font-bold">2 workers</span>
              </div>
              <Progress value={(2 / shift.workers) * 100} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm">Absent</span>
                </div>
                <span className="font-bold">1 worker</span>
              </div>
              <Progress value={(1 / shift.workers) * 100} className="h-2" />
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-3">
            <h3 className="font-semibold">Performance Metrics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Productivity</p>
                <p className="text-2xl font-bold text-blue-600">92.3%</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +3.2% vs target
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Efficiency</p>
                <p className="text-2xl font-bold text-green-600">89.8%</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +1.8% vs target
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Safety Score</p>
                <p className="text-2xl font-bold text-amber-600">98.5%</p>
                <p className="text-xs text-muted-foreground mt-1">No incidents</p>
              </div>
            </div>
          </div>

          {/* Production Output */}
          <div className="space-y-3">
            <h3 className="font-semibold">Production Output</h3>
            <div className="space-y-2 p-4 border rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm">Ore Mined</span>
                <span className="font-bold">2,450 MT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Material Processed</span>
                <span className="font-bold">2,280 MT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Concentrate Produced</span>
                <span className="font-bold">185 MT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Equipment Downtime</span>
                <span className="font-bold text-yellow-600">45 minutes</span>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="space-y-3">
            <h3 className="font-semibold">Recent Activities</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Shift started on time</p>
                  <p className="text-xs text-muted-foreground">06:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Safety briefing completed</p>
                  <p className="text-xs text-muted-foreground">06:15 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Minor equipment delay - Crusher #2</p>
                  <p className="text-xs text-muted-foreground">09:30 AM (Resolved at 10:15 AM)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>Export Shift Report</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
