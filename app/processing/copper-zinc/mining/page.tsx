"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Mountain, Gauge, Plus } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { MiningDataEntryModal } from "@/components/mining-data-entry-modal"

// Demo data for copper-zinc mining operations
const demoMiningOps = [
  {
    id: 1,
    date: "2025-02-06",
    drilled_volume_mt: 1250,
    mined_ore_mt: 2450,
    ore_grade_cu_percent: 1.85,
    ore_grade_zn_percent: 3.42,
    rom_stockpile_mt: 15800,
  },
  {
    id: 2,
    date: "2025-02-05",
    drilled_volume_mt: 1180,
    mined_ore_mt: 2380,
    ore_grade_cu_percent: 1.92,
    ore_grade_zn_percent: 3.38,
    rom_stockpile_mt: 15200,
  },
  {
    id: 3,
    date: "2025-02-04",
    drilled_volume_mt: 1320,
    mined_ore_mt: 2520,
    ore_grade_cu_percent: 1.78,
    ore_grade_zn_percent: 3.55,
    rom_stockpile_mt: 14800,
  },
  {
    id: 4,
    date: "2025-02-03",
    drilled_volume_mt: 1290,
    mined_ore_mt: 2480,
    ore_grade_cu_percent: 1.88,
    ore_grade_zn_percent: 3.45,
    rom_stockpile_mt: 14500,
  },
  {
    id: 5,
    date: "2025-02-02",
    drilled_volume_mt: 1210,
    mined_ore_mt: 2420,
    ore_grade_cu_percent: 1.95,
    ore_grade_zn_percent: 3.32,
    rom_stockpile_mt: 14200,
  },
]

export default function CuZnMiningPage() {
  const [isMiningModalOpen, setIsMiningModalOpen] = useState(false)

  const miningOps = demoMiningOps
  const totalMined = miningOps.reduce((sum, op) => sum + op.mined_ore_mt, 0)
  const avgCuGrade = miningOps.reduce((sum, op) => sum + op.ore_grade_cu_percent, 0) / miningOps.length
  const avgZnGrade = miningOps.reduce((sum, op) => sum + op.ore_grade_zn_percent, 0) / miningOps.length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mining Operations - Copper-Zinc"
        description="Track drilling, blasting, and ore extraction activities"
        actions={
          <Button onClick={() => setIsMiningModalOpen(true)} className="bg-slate-900 hover:bg-slate-800 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Mining Data
          </Button>
        }
      />

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Ore Mined</CardTitle>
            <Mountain className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalMined.toLocaleString()} MT</div>
            <p className="text-xs text-slate-500 mt-1">Last {miningOps.length} operations</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Copper Grade</CardTitle>
            <Gauge className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgCuGrade.toFixed(2)}%</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              Within target range
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Zinc Grade</CardTitle>
            <Gauge className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgZnGrade.toFixed(2)}%</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              Above target
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Operations Table */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Recent Mining Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Drilled (MT)</TableHead>
                <TableHead>Mined Ore (MT)</TableHead>
                <TableHead>Cu Grade (%)</TableHead>
                <TableHead>Zn Grade (%)</TableHead>
                <TableHead>ROM Stockpile (MT)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {miningOps.map((op) => (
                <TableRow key={op.id}>
                  <TableCell className="font-medium">{new Date(op.date).toLocaleDateString()}</TableCell>
                  <TableCell>{op.drilled_volume_mt.toLocaleString()}</TableCell>
                  <TableCell>{op.mined_ore_mt.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {op.ore_grade_cu_percent.toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {op.ore_grade_zn_percent.toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell>{op.rom_stockpile_mt.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MiningDataEntryModal open={isMiningModalOpen} onOpenChange={setIsMiningModalOpen} processType="copper-zinc" />
    </div>
  )
}
