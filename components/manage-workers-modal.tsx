"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

interface ManageWorkersModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const workers = [
  { id: 1, name: "Ahmed Al-Rashid", role: "Supervisor", department: "Mining", status: "active", shift: "Day" },
  { id: 2, name: "Mohammed Hassan", role: "Supervisor", department: "Processing", status: "active", shift: "Day" },
  { id: 3, name: "Fatima Al-Zahrani", role: "Supervisor", department: "Maintenance", status: "active", shift: "Day" },
  { id: 4, name: "Khalid Ibrahim", role: "Supervisor", department: "Mining", status: "active", shift: "Afternoon" },
  {
    id: 5,
    name: "Sara Al-Mutairi",
    role: "Supervisor",
    department: "Processing",
    status: "active",
    shift: "Afternoon",
  },
  { id: 6, name: "Omar Abdullah", role: "Supervisor", department: "Mining", status: "active", shift: "Night" },
  { id: 7, name: "Hassan Ali", role: "Operator", department: "Mining", status: "active", shift: "Day" },
  { id: 8, name: "Noor Khalid", role: "Operator", department: "Processing", status: "active", shift: "Day" },
  { id: 9, name: "Yusuf Ahmed", role: "Technician", department: "Maintenance", status: "on-leave", shift: "Day" },
  { id: 10, name: "Layla Hassan", role: "Operator", department: "Mining", status: "active", shift: "Afternoon" },
]

export function ManageWorkersModal({ open, onOpenChange }: ManageWorkersModalProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredWorkers = workers.filter((worker) => worker.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl bg-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Manage Workers</DialogTitle>
          <DialogDescription>View, add, and manage your workforce across all departments</DialogDescription>
        </DialogHeader>

        <div className="pr-2">
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex items-center justify-between sticky top-0 bg-white z-10 pb-4">
              <TabsList>
                <TabsTrigger value="all">All Workers</TabsTrigger>
                <TabsTrigger value="add">Add New Worker</TabsTrigger>
              </TabsList>

              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search workers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-2">
              <TabsContent value="all" className="space-y-4 mt-0">
                <div className="border rounded-lg">
                  <div className="grid grid-cols-6 gap-4 p-3 bg-muted font-medium text-sm">
                    <div>Name</div>
                    <div>Role</div>
                    <div>Department</div>
                    <div>Shift</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>

                  <div className="divide-y">
                    {filteredWorkers.map((worker) => (
                      <div key={worker.id} className="grid grid-cols-6 gap-4 p-3 items-center hover:bg-muted/50">
                        <div className="font-medium">{worker.name}</div>
                        <div className="text-sm text-muted-foreground">{worker.role}</div>
                        <div className="text-sm">{worker.department}</div>
                        <div className="text-sm">{worker.shift}</div>
                        <div>
                          <Badge variant={worker.status === "active" ? "default" : "outline"}>
                            {worker.status === "active" ? "Active" : "On Leave"}
                          </Badge>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Workers</p>
                    <p className="text-2xl font-bold">186</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-2xl font-bold text-green-600">178</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">On Leave</p>
                    <p className="text-2xl font-bold text-yellow-600">8</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Supervisors</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="add" className="space-y-6 mt-0">
                <div className="grid gap-20 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="worker-name">Full Name</Label>
                    <Input id="worker-name" placeholder="Enter worker name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="worker-id">Employee ID</Label>
                    <Input id="worker-id" placeholder="e.g., EMP-2025-001" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="worker-role">Role</Label>
                    <Select>
                      <SelectTrigger id="worker-role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={8}>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                        <SelectItem value="operator">Operator</SelectItem>
                        <SelectItem value="technician">Technician</SelectItem>
                        <SelectItem value="engineer">Engineer</SelectItem>
                        <SelectItem value="foreman">Foreman</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="worker-department">Department</Label>
                    <Select>
                      <SelectTrigger id="worker-department">
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
                    <Label htmlFor="worker-shift">Assigned Shift</Label>
                    <Select>
                      <SelectTrigger id="worker-shift">
                        <SelectValue placeholder="Select shift" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={8}>
                        <SelectItem value="day">Day Shift (06:00 - 14:00)</SelectItem>
                        <SelectItem value="afternoon">Afternoon Shift (14:00 - 22:00)</SelectItem>
                        <SelectItem value="night">Night Shift (22:00 - 06:00)</SelectItem>
                        <SelectItem value="rotating">Rotating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="worker-phone">Phone Number</Label>
                    <Input id="worker-phone" placeholder="+966 XXX XXX XXX" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="worker-email">Email</Label>
                    <Input id="worker-email" type="email" placeholder="worker@amak.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="worker-start">Start Date</Label>
                    <Input id="worker-start" type="date" />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t bg-white sticky bottom-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Worker
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
