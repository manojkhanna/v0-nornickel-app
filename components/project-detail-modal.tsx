"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, AlertTriangle, Users, DollarSign, Calendar } from "lucide-react"

interface ProjectDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: {
    id: number
    name: string
    description: string
    status: string
    progress: number
    budget: number
    spent: number
    startDate: string
    endDate: string
    manager: string
    team: number
    priority: string
    category: string
    milestones: Array<{
      name: string
      status: string
      date: string
    }>
  }
}

export function ProjectDetailModal({ open, onOpenChange, project }: ProjectDetailModalProps) {
  const getMilestoneColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 border-green-300 text-green-800"
      case "in-progress":
        return "bg-blue-100 border-blue-300 text-blue-800"
      case "pending":
        return "bg-slate-100 border-slate-300 text-slate-600"
      default:
        return "bg-slate-100 border-slate-300 text-slate-600"
    }
  }

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-600" />
      case "pending":
        return <AlertTriangle className="h-5 w-5 text-slate-400" />
      default:
        return <AlertTriangle className="h-5 w-5 text-slate-400" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl">{project.name}</DialogTitle>
              <DialogDescription>{project.description}</DialogDescription>
              <div className="flex items-center gap-2 pt-2">
                <Badge
                  variant={
                    project.status === "completed"
                      ? "default"
                      : project.status === "in-progress"
                        ? "outline"
                        : "secondary"
                  }
                >
                  {project.status}
                </Badge>
                <Badge
                  variant={
                    project.priority === "high"
                      ? "destructive"
                      : project.priority === "medium"
                        ? "outline"
                        : "secondary"
                  }
                >
                  {project.priority} priority
                </Badge>
                <Badge variant="outline">{project.category}</Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Project Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" />
                Project Manager
              </p>
              <p className="font-semibold mt-1">{project.manager}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" />
                Team Size
              </p>
              <p className="text-2xl font-bold mt-1">{project.team}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Start Date
              </p>
              <p className="font-semibold mt-1">{new Date(project.startDate).toLocaleDateString()}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                End Date
              </p>
              <p className="font-semibold mt-1">{new Date(project.endDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Overall Progress</h3>
              <span className="text-2xl font-bold text-blue-600">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {project.progress < 100
                ? `${100 - project.progress}% remaining to completion`
                : "Project completed successfully"}
            </p>
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Budget & Spending
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold">${(project.budget / 1000000).toFixed(2)}M</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Spent</p>
                <p className="text-2xl font-bold text-blue-600">${(project.spent / 1000000).toFixed(2)}M</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold text-green-600">
                  ${((project.budget - project.spent) / 1000000).toFixed(2)}M
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Budget Utilization</span>
                <span className="font-bold">{((project.spent / project.budget) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(project.spent / project.budget) * 100} className="h-2" />
            </div>
          </div>

          {/* Milestones */}
          <div className="space-y-3">
            <h3 className="font-semibold">Project Milestones</h3>
            <div className="space-y-3">
              {project.milestones.map((milestone, index) => (
                <div key={index} className={`p-4 border-2 rounded-lg ${getMilestoneColor(milestone.status)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getMilestoneIcon(milestone.status)}
                      <div>
                        <p className="font-semibold">{milestone.name}</p>
                        <p className="text-sm opacity-80">{new Date(milestone.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        milestone.status === "completed"
                          ? "bg-green-50 text-green-700 border-green-300"
                          : milestone.status === "in-progress"
                            ? "bg-blue-50 text-blue-700 border-blue-300"
                            : "bg-slate-50 text-slate-600 border-slate-300"
                      }
                    >
                      {milestone.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Deliverables */}
          <div className="space-y-3">
            <h3 className="font-semibold">Key Deliverables</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Technical specifications document</span>
                </div>
                <Badge variant="outline" className="text-green-600">
                  Completed
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Equipment procurement and delivery</span>
                </div>
                <Badge variant="outline" className="text-green-600">
                  Completed
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Installation and integration</span>
                </div>
                <Badge variant="outline" className="text-blue-600">
                  In Progress
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">Testing and commissioning</span>
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>Export Project Report</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
