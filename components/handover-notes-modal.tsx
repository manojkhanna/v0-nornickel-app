"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, AlertCircle, CheckCircle, FileText } from "lucide-react"

interface HandoverNotesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const handoverNotes = [
  {
    id: 1,
    shift: "Day → Afternoon",
    time: "14:00",
    date: "Nov 6, 2025",
    supervisor: "Ahmed Al-Rashid",
    department: "Mining",
    notes:
      "All equipment operational. Crusher maintenance completed. Production target exceeded by 8%. No safety incidents. Blasting scheduled for afternoon shift at Zone C.",
    issues: ["Minor hydraulic leak in Excavator #3 - scheduled for repair"],
    completed: ["Routine maintenance on conveyor belt", "Safety inspection passed"],
  },
  {
    id: 2,
    shift: "Afternoon → Night",
    time: "22:00",
    date: "Nov 5, 2025",
    supervisor: "Khalid Ibrahim",
    department: "Mining",
    notes:
      "Blasting completed successfully in Zone C. New ore face exposed. Equipment running smoothly. Fuel levels adequate for night shift.",
    issues: ["Weather forecast shows possible rain - monitor drainage systems"],
    completed: ["Blasting operations in Zone C", "Equipment refueling"],
  },
  {
    id: 3,
    shift: "Night → Day",
    time: "06:00",
    date: "Nov 6, 2025",
    supervisor: "Omar Abdullah",
    department: "Mining",
    notes:
      "Quiet night shift. Ore extraction continued from Zone C. All safety protocols followed. Equipment ready for day shift handover.",
    issues: [],
    completed: ["Night production targets met", "Equipment inspection completed"],
  },
]

export function HandoverNotesModal({ open, onOpenChange }: HandoverNotesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Shift Handover Notes</DialogTitle>
          <DialogDescription>Review and manage shift transition documentation</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="view" className="space-y-4">
          <TabsList>
            <TabsTrigger value="view">View Notes</TabsTrigger>
            <TabsTrigger value="create">Create New Note</TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="space-y-4">
            {handoverNotes.map((note) => (
              <div key={note.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{note.shift}</h3>
                      <Badge variant="outline">{note.department}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {note.time}
                      </span>
                      <span>{note.date}</span>
                      <span>Supervisor: {note.supervisor}</span>
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white">Submitted</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <Label className="font-medium">Handover Notes</Label>
                  </div>
                  <p className="text-sm leading-relaxed pl-6">{note.notes}</p>
                </div>

                {note.completed.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <Label className="font-medium">Completed Tasks</Label>
                    </div>
                    <ul className="space-y-1 pl-6">
                      {note.completed.map((task, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {note.issues.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <Label className="font-medium">Issues & Alerts</Label>
                    </div>
                    <ul className="space-y-1 pl-6">
                      {note.issues.map((issue, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-yellow-600">⚠</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Shift Transition</Label>
                  <div className="p-3 border rounded-lg bg-muted">
                    <p className="font-medium">Day → Afternoon</p>
                    <p className="text-sm text-muted-foreground">14:00 handover</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Department</Label>
                  <div className="p-3 border rounded-lg bg-muted">
                    <p className="font-medium">Mining Operations</p>
                    <p className="text-sm text-muted-foreground">Supervisor: Ahmed Al-Rashid</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="handover-notes">Handover Notes</Label>
                <Textarea
                  id="handover-notes"
                  placeholder="Describe shift activities, equipment status, production metrics, and any important information for the incoming shift..."
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground">
                  Include: equipment status, production metrics, safety incidents, pending tasks
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="completed-tasks">Completed Tasks</Label>
                <Textarea
                  id="completed-tasks"
                  placeholder="List all tasks completed during your shift (one per line)..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issues">Issues & Alerts</Label>
                <Textarea
                  id="issues"
                  placeholder="Report any issues, concerns, or alerts for the incoming shift (one per line)..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recommendations">Recommendations</Label>
                <Textarea
                  id="recommendations"
                  placeholder="Any recommendations or action items for the next shift..."
                  className="min-h-[60px]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white">Submit Handover Notes</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
