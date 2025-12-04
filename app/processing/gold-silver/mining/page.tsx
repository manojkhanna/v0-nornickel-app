"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gem, Sparkles, TrendingUp, Plus } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { MiningDataEntryModal } from "@/components/mining-data-entry-modal"

// Demo data for gold-silver mining operations
const demoMiningOps = [
  {
    id: 1,
    date: "2025-02-06",
    drilled_volume_mt: 980,
    mined_ore_mt: 1850,
    ore_grade_au_gpt: 2.45,
    ore_grade_ag_gpt: 18.5,
    rom_stockpile_mt: 12400,
  },
  {
    id: 2,
    date: "2025-02-05",
    drilled_volume_mt: 1020,
    mined_ore_mt: 1920,
    ore_grade_au_gpt: 2.38,
    ore_grade_ag_gpt: 19.2,
    rom_stockpile_mt: 12100,
  },
  {
    id: 3,
    date: "2025-02-04",
    drilled_volume_mt: 950,
    mined_ore_mt: 1780,
    ore_grade_au_gpt: 2.52,
    ore_grade_ag_gpt: 17.8,
    rom_stockpile_mt: 11800,
  },
  {
    id: 4,
    date: "2025-02-03",
    drilled_volume_mt: 1010,
    mined_ore_mt: 1890,
    ore_grade_au_gpt: 2.41,
    ore_grade_ag_gpt: 18.9,
    rom_stockpile_mt: 11500,
  },
  {
    id: 5,
    date: "2025-02-02",
    drilled_volume_mt: 990,
    mined_ore_mt: 1820,
    ore_grade_au_gpt: 2.48,
    ore_grade_ag_gpt: 19.5,
    rom_stockpile_mt: 11200,
  },
]

export default function AuAgMiningPage() {
  const [isMiningModalOpen, setIsMiningModalOpen] = useState(false)

  const miningOps = demoMiningOps
  const totalMined = miningOps.reduce((sum, op) => sum + op.mined_ore_mt, 0)
  const avgAuGrade = miningOps.reduce((sum, op) => sum + op.ore_grade_au_gpt, 0) / miningOps.length
  const avgAgGrade = miningOps.reduce((sum, op) => sum + op.ore_grade_ag_gpt, 0) / miningOps.length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mining Operations - Gold-Silver"
        description="Track precious metals ore extraction and grades"
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
            <Gem className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalMined.toLocaleString()} MT</div>
            <p className="text-xs text-slate-500 mt-1">Last {miningOps.length} operations</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Gold Grade</CardTitle>
            <Sparkles className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgAuGrade.toFixed(2)} g/t</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              High grade ore
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Silver Grade</CardTitle>
            <Sparkles className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgAgGrade.toFixed(1)} g/t</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              Excellent recovery potential
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
                <TableHead>Au Grade (g/t)</TableHead>
                <TableHead>Ag Grade (g/t)</TableHead>
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
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {op.ore_grade_au_gpt.toFixed(2)} g/t
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">
                      {op.ore_grade_ag_gpt.toFixed(1)} g/t
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

      <MiningDataEntryModal open={isMiningModalOpen} onOpenChange={setIsMiningModalOpen} processType="gold-silver" />
    </div>
  )
}
