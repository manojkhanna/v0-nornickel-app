"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, AlertCircle, CheckCircle, Calendar } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { ShiftDetailModal } from "@/components/shift-detail-modal"
import { ScheduleModal } from "@/components/schedule-modal"
import { ManageWorkersModal } from "@/components/manage-workers-modal"
import { HandoverNotesModal } from "@/components/handover-notes-modal"

// Demo shift data
const currentShifts = [
  {
    id: 1,
    shift: "Day Shift",
    time: "06:00 - 14:00",
    workers: 45,
    supervisor: "Ahmed Al-Rashid",
    status: "active",
    department: "Mining",
  },
  {
    id: 2,
    shift: "Day Shift",
    time: "06:00 - 14:00",
    workers: 32,
    supervisor: "Mohammed Hassan",
    status: "active",
    department: "Processing",
  },
  {
    id: 3,
    shift: "Day Shift",
    time: "06:00 - 14:00",
    workers: 18,
    supervisor: "Fatima Al-Zahrani",
    status: "active",
    department: "Maintenance",
  },
  {
    id: 4,
    shift: "Afternoon Shift",
    time: "14:00 - 22:00",
    workers: 38,
    supervisor: "Khalid Ibrahim",
    status: "scheduled",
    department: "Mining",
  },
  {
    id: 5,
    shift: "Afternoon Shift",
    time: "14:00 - 22:00",
    workers: 28,
    supervisor: "Sara Al-Mutairi",
    status: "scheduled",
    department: "Processing",
  },
  {
    id: 6,
    shift: "Night Shift",
    time: "22:00 - 06:00",
    workers: 25,
    supervisor: "Omar Abdullah",
    status: "scheduled",
    department: "Mining",
  },
]

const attendanceData = [
  { day: "Mon", present: 142, absent: 8, late: 5 },
  { day: "Tue", present: 145, absent: 5, late: 3 },
  { day: "Wed", present: 143, absent: 7, late: 4 },
  { day: "Thu", present: 148, absent: 2, late: 2 },
  { day: "Fri", present: 146, absent: 4, late: 3 },
  { day: "Sat", present: 144, absent: 6, late: 4 },
  { day: "Sun", present: 140, absent: 10, late: 5 },
]

const productivityData = [
  { shift: "Day", mining: 95, processing: 92, maintenance: 88 },
  { shift: "Afternoon", mining: 88, processing: 85, maintenance: 82 },
  { shift: "Night", mining: 78, processing: 75, maintenance: 70 },
]

const recentActivities = [
  { time: "08:45", activity: "Day shift started", department: "All Departments", type: "info" },
  { time: "09:15", activity: "Equipment maintenance completed", department: "Crushing Plant", type: "success" },
  { time: "10:30", activity: "Safety inspection passed", department: "Mining Operations", type: "success" },
  { time: "11:20", activity: "Minor delay reported", department: "Flotation Circuit", type: "warning" },
  { time: "12:00", activity: "Production target achieved", department: "Processing", type: "success" },
]

export default function ShiftManagementPage() {
  const [selectedShift, setSelectedShift] = useState<(typeof currentShifts)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isManageWorkersModalOpen, setIsManageWorkersModalOpen] = useState(false)
  const [isHandoverNotesModalOpen, setIsHandoverNotesModalOpen] = useState(false)

  const handleViewShift = (shift: (typeof currentShifts)[0]) => {
    setSelectedShift(shift)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Shift Management"
        description="Monitor workforce, attendance, and shift performance"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsScheduleModalOpen(true)}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button
              onClick={() => setIsManageWorkersModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white"
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Workers
            </Button>
          </div>
        }
      />

      {/* Current Status Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95</div>
            <p className="text-xs text-muted-foreground">Day shift currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.7%</div>
            <p className="text-xs text-green-600">+2.3% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Shift</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Day</div>
            <p className="text-xs text-muted-foreground">06:00 - 14:00 (5h 15m remaining)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidents Today</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-yellow-600">Minor delay reported</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Shifts</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active & Scheduled Shifts</CardTitle>
              <CardDescription>Real-time shift status across all departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentShifts.map((shift) => (
                  <div key={shift.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{shift.shift}</h3>
                          <Badge variant={shift.status === "active" ? "default" : "outline"}>{shift.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{shift.time}</p>
                      </div>
                      <div className="h-8 w-px bg-border" />
                      <div>
                        <p className="text-sm font-medium">{shift.department}</p>
                        <p className="text-xs text-muted-foreground">Supervisor: {shift.supervisor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold">{shift.workers}</p>
                        <p className="text-xs text-muted-foreground">Workers</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleViewShift(shift)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Shift Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Day Shift (06:00-14:00)</span>
                    <span className="font-bold">95 workers</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-1" style={{ width: "63%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Afternoon Shift (14:00-22:00)</span>
                    <span className="font-bold">66 workers</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-2" style={{ width: "44%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Night Shift (22:00-06:00)</span>
                    <span className="font-bold">25 workers</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chart-3" style={{ width: "17%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mining Operations</span>
                  <span className="font-bold">108 workers</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Processing Plant</span>
                  <span className="font-bold">60 workers</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Maintenance</span>
                  <span className="font-bold">18 workers</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Quality Control</span>
                  <span className="font-bold">8 workers</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Logistics</span>
                  <span className="font-bold">12 workers</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shift Handover</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Next Handover</p>
                  <p className="text-2xl font-bold">14:00</p>
                  <p className="text-xs text-muted-foreground">Day → Afternoon shift</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Handover Status</p>
                  <Badge variant="outline" className="text-green-600">
                    All reports submitted
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setIsHandoverNotesModalOpen(true)}
                >
                  View Handover Notes
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Overview</CardTitle>
              <CardDescription>Attendance tracking for the current week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  present: { label: "Present", color: "#10b981" },
                  absent: { label: "Absent", color: "#ef4444" },
                  late: { label: "Late", color: "#f59e0b" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="present" fill="#10b981" name="Present" />
                    <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                    <Bar dataKey="late" fill="#f59e0b" name="Late" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Present</span>
                  <span className="text-2xl font-bold">1,008</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Absent</span>
                  <span className="text-2xl font-bold text-red-600">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Late</span>
                  <span className="text-2xl font-bold text-yellow-600">26</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Attendance Rate</span>
                  <span className="text-2xl font-bold text-green-600">96.1%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Mining Team A</p>
                    <p className="text-xs text-muted-foreground">Ahmed Al-Rashid</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    100%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Processing Team B</p>
                    <p className="text-xs text-muted-foreground">Sara Al-Mutairi</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    98.5%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Maintenance Team</p>
                    <p className="text-xs text-muted-foreground">Fatima Al-Zahrani</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    97.2%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Absence Reasons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sick Leave</span>
                  <span className="font-bold">18 (42.9%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Personal Leave</span>
                  <span className="font-bold">12 (28.6%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Vacation</span>
                  <span className="font-bold">8 (19.0%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Unexcused</span>
                  <span className="font-bold text-red-600">4 (9.5%)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Productivity by Shift</CardTitle>
              <CardDescription>Performance metrics across different shifts and departments</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  mining: { label: "Mining", color: "#f97316" },
                  processing: { label: "Processing", color: "#3b82f6" },
                  maintenance: { label: "Maintenance", color: "#8b5cf6" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="shift" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="mining" fill="#f97316" name="Mining" />
                    <Bar dataKey="processing" fill="#3b82f6" name="Processing" />
                    <Bar dataKey="maintenance" fill="#8b5cf6" name="Maintenance" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Day Shift Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Efficiency</span>
                    <span className="text-2xl font-bold text-green-600">91.7%</span>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    Above target (85%)
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Metrics</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ore Mined</span>
                      <span className="font-medium">2,450 MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processed</span>
                      <span className="font-medium">2,280 MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Downtime</span>
                      <span className="font-medium">45 min</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Afternoon Shift Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Efficiency</span>
                    <span className="text-2xl font-bold text-green-600">85.0%</span>
                  </div>
                  <Badge variant="outline">On target (85%)</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Metrics</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ore Mined</span>
                      <span className="font-medium">2,180 MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processed</span>
                      <span className="font-medium">2,050 MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Downtime</span>
                      <span className="font-medium">72 min</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Night Shift Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Efficiency</span>
                    <span className="text-2xl font-bold text-yellow-600">74.3%</span>
                  </div>
                  <Badge variant="outline" className="text-yellow-600">
                    Below target (85%)
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Metrics</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ore Mined</span>
                      <span className="font-medium">1,680 MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processed</span>
                      <span className="font-medium">1,520 MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Downtime</span>
                      <span className="font-medium">125 min</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Shift Activities</CardTitle>
              <CardDescription>Real-time updates from all shifts and departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                      {activity.type === "success" && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {activity.type === "warning" && <AlertCircle className="h-5 w-5 text-yellow-600" />}
                      {activity.type === "info" && <Clock className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{activity.activity}</p>
                        <span className="text-sm text-muted-foreground">{activity.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedShift && <ShiftDetailModal open={isModalOpen} onOpenChange={setIsModalOpen} shift={selectedShift} />}
      <ScheduleModal open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen} />
      <ManageWorkersModal open={isManageWorkersModalOpen} onOpenChange={setIsManageWorkersModalOpen} />
      <HandoverNotesModal open={isHandoverNotesModalOpen} onOpenChange={setIsHandoverNotesModalOpen} />
    </div>
  )
}
