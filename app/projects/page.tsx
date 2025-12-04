"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { FolderKanban, Clock, DollarSign, Users, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ProjectDetailModal } from "@/components/project-detail-modal"
import { NewProjectModal } from "@/components/new-project-modal"

const projects = [
  {
    id: 1,
    name: "Flotation Circuit Upgrade",
    description: "Modernization of copper-zinc flotation cells to improve recovery rates",
    status: "in-progress",
    progress: 68,
    budget: 2500000,
    spent: 1700000,
    startDate: "2024-01-15",
    endDate: "2025-06-30",
    manager: "Dr. Hassan Al-Qahtani",
    team: 12,
    priority: "high",
    category: "Capital Project",
    milestones: [
      { name: "Design Phase", status: "completed", date: "2024-03-01" },
      { name: "Equipment Procurement", status: "completed", date: "2024-06-15" },
      { name: "Installation", status: "in-progress", date: "2024-12-01" },
      { name: "Commissioning", status: "pending", date: "2025-05-01" },
    ],
  },
  {
    id: 2,
    name: "Tailings Management Expansion",
    description: "Expansion of tailings storage facility to increase capacity by 40%",
    status: "in-progress",
    progress: 45,
    budget: 4200000,
    spent: 1890000,
    startDate: "2024-03-01",
    endDate: "2025-12-31",
    manager: "Eng. Fatima Al-Dosari",
    team: 18,
    priority: "high",
    category: "Infrastructure",
    milestones: [
      { name: "Environmental Assessment", status: "completed", date: "2024-05-01" },
      { name: "Site Preparation", status: "in-progress", date: "2024-10-01" },
      { name: "Construction", status: "pending", date: "2025-03-01" },
      { name: "Commissioning", status: "pending", date: "2025-11-01" },
    ],
  },
  {
    id: 3,
    name: "Energy Efficiency Program",
    description: "Implementation of energy-saving measures across all processing plants",
    status: "in-progress",
    progress: 82,
    budget: 850000,
    spent: 697000,
    startDate: "2024-02-01",
    endDate: "2025-03-31",
    manager: "Eng. Mohammed Al-Shehri",
    team: 8,
    priority: "medium",
    category: "Operational Excellence",
    milestones: [
      { name: "Energy Audit", status: "completed", date: "2024-04-01" },
      { name: "Equipment Upgrades", status: "completed", date: "2024-09-01" },
      { name: "Process Optimization", status: "in-progress", date: "2024-12-01" },
      { name: "Final Validation", status: "pending", date: "2025-03-01" },
    ],
  },
  {
    id: 4,
    name: "SCADA System Integration",
    description: "Integration of real-time monitoring and control systems across operations",
    status: "planning",
    progress: 15,
    budget: 1200000,
    spent: 180000,
    startDate: "2024-11-01",
    endDate: "2025-10-31",
    manager: "Eng. Sara Al-Mutairi",
    team: 6,
    priority: "medium",
    category: "Digital Transformation",
    milestones: [
      { name: "Requirements Analysis", status: "completed", date: "2024-12-01" },
      { name: "System Design", status: "in-progress", date: "2025-02-01" },
      { name: "Implementation", status: "pending", date: "2025-05-01" },
      { name: "Testing & Rollout", status: "pending", date: "2025-09-01" },
    ],
  },
  {
    id: 5,
    name: "Mine Expansion Phase 2",
    description: "Extension of mining operations to new ore body zones",
    status: "completed",
    progress: 100,
    budget: 5800000,
    spent: 5650000,
    startDate: "2023-01-01",
    endDate: "2024-10-31",
    manager: "Eng. Khalid Al-Rashid",
    team: 25,
    priority: "high",
    category: "Capital Project",
    milestones: [
      { name: "Geological Survey", status: "completed", date: "2023-03-01" },
      { name: "Infrastructure Development", status: "completed", date: "2023-09-01" },
      { name: "Mining Operations", status: "completed", date: "2024-06-01" },
      { name: "Ramp-up", status: "completed", date: "2024-10-01" },
    ],
  },
]

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)

  const handleViewProject = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const activeProjects = projects.filter((p) => p.status === "in-progress" || p.status === "planning")
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Project Management"
        description="Track and manage mining and processing operations projects"
        actions={
          <Button onClick={() => setIsNewProjectModalOpen(true)} className="bg-slate-900 text-white hover:bg-slate-800">
            <FolderKanban className="mr-2 h-4 w-4" />
            New Project
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length}</div>
            <p className="text-xs text-muted-foreground">Out of {projects.length} total projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalBudget / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((totalSpent / totalBudget) * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">${(totalSpent / 1000000).toFixed(1)}M spent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.reduce((sum, p) => sum + p.team, 0)}</div>
            <p className="text-xs text-muted-foreground">Across active projects</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle>{project.name}</CardTitle>
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
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {project.manager}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(project.startDate).toLocaleDateString()} -{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                      <Badge variant="outline">{project.category}</Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleViewProject(project)}>
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Progress</span>
                    <span className="text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="text-lg font-bold">${(project.budget / 1000000).toFixed(2)}M</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Spent</p>
                    <p className="text-lg font-bold">${(project.spent / 1000000).toFixed(2)}M</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="text-lg font-bold">${((project.budget - project.spent) / 1000000).toFixed(2)}M</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Milestones</p>
                  <div className="grid gap-2 md:grid-cols-4">
                    {project.milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 p-2 border-2 rounded ${
                          milestone.status === "completed"
                            ? "bg-green-50 border-green-300"
                            : milestone.status === "in-progress"
                              ? "bg-blue-50 border-blue-300"
                              : "bg-slate-50 border-slate-300"
                        }`}
                      >
                        {milestone.status === "completed" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                        {milestone.status === "in-progress" && <Clock className="h-4 w-4 text-blue-600" />}
                        {milestone.status === "pending" && <AlertTriangle className="h-4 w-4 text-slate-400" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{milestone.name}</p>
                          <p className="text-xs opacity-70">{new Date(milestone.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {projects
            .filter((p) => p.status === "in-progress")
            .map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{project.name}</CardTitle>
                        <Badge variant="outline">in-progress</Badge>
                        <Badge variant={project.priority === "high" ? "destructive" : "outline"}>
                          {project.priority} priority
                        </Badge>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleViewProject(project)}>
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Progress</span>
                      <span className="text-muted-foreground">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Budget Utilization</p>
                      <p className="text-lg font-bold">{((project.spent / project.budget) * 100).toFixed(1)}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Team Size</p>
                      <p className="text-lg font-bold">{project.team} members</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Days to Completion</p>
                      <p className="text-lg font-bold">
                        {Math.ceil(
                          (new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                        )}{" "}
                        days
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          {projects
            .filter((p) => p.status === "planning")
            .map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{project.name}</CardTitle>
                        <Badge variant="secondary">planning</Badge>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleViewProject(project)}>
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Planned Budget</p>
                      <p className="text-lg font-bold">${(project.budget / 1000000).toFixed(2)}M</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="text-lg font-bold">{new Date(project.startDate).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="text-lg font-bold">
                        {Math.ceil(
                          (new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) /
                            (1000 * 60 * 60 * 24 * 30),
                        )}{" "}
                        months
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {projects
            .filter((p) => p.status === "completed")
            .map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{project.name}</CardTitle>
                        <Badge>completed</Badge>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleViewProject(project)}>
                      View Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Final Budget</p>
                      <p className="text-lg font-bold">${(project.budget / 1000000).toFixed(2)}M</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="text-lg font-bold">${(project.spent / 1000000).toFixed(2)}M</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Variance</p>
                      <p className="text-lg font-bold text-green-600">
                        {((1 - project.spent / project.budget) * 100).toFixed(1)}% under budget
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Completion Date</p>
                      <p className="text-lg font-bold">{new Date(project.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
      {selectedProject && (
        <ProjectDetailModal open={isModalOpen} onOpenChange={setIsModalOpen} project={selectedProject} />
      )}
      <NewProjectModal open={isNewProjectModalOpen} onOpenChange={setIsNewProjectModalOpen} />
    </div>
  )
}
