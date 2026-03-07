"use client"

import { useState } from "react"
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { DISTRICTS } from "@/lib/mock/explore-data"
import { COMPETITORS } from "@/lib/mock/campaigns-data"

const footfallConfig: ChartConfig = {
  yours: { label: "Your footfall", color: "var(--chart-1)" },
  competitor: { label: "Competitor footfall", color: "var(--chart-2)" },
}

const PIE_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"]

export function CompetitorAnalysis() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set([COMPETITORS[0].id])
  )

  const selected = COMPETITORS.filter((c) => selectedIds.has(c.id))
  const primary = selected[0]

  const toggleCompetitor = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const comparisonData = primary
    ? DISTRICTS.slice(0, 6).map((d) => ({
        district: d.name,
        yours: d.avgDailyFootfall,
        competitor: primary.districtId === d.id ? primary.avgDailyFootfall : 0,
      }))
    : []

  const overlapData = primary
    ? [
        { name: "Your unique", value: 100 - primary.visitorOverlap, fill: PIE_COLORS[0] },
        { name: "Shared", value: primary.visitorOverlap, fill: PIE_COLORS[1] },
        { name: "Competitor unique", value: 100 - primary.visitorOverlap, fill: PIE_COLORS[2] },
      ]
    : []

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Select Competitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {COMPETITORS.map((c) => (
              <label
                key={c.id}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.has(c.id)}
                  onChange={() => toggleCompetitor(c.id)}
                  className="rounded border-input"
                />
                <span className="text-sm">{c.name}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {primary && (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Your Footfall vs {primary.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={footfallConfig} className="h-[220px]">
                  <BarChart
                    data={comparisonData}
                    margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="district"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="yours" fill="var(--color-yours)" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="competitor" fill="var(--color-competitor)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Visitor Overlap</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={overlapData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {overlapData.map((_, i) => (
                        <Cell key={i} fill={overlapData[i].fill} />
                      ))}
                    </Pie>
                    <ChartTooltip formatter={(v) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Top Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="rounded-lg border border-border bg-muted/30 px-3 py-2">
                  {DISTRICTS.find((d) => d.id === primary.districtId)?.name ?? primary.districtId} has{" "}
                  {primary.visitorOverlap}% visitor overlap with {primary.name}.
                </li>
                <li className="rounded-lg border border-border bg-muted/30 px-3 py-2">
                  {primary.name} sees {primary.avgDailyFootfall.toLocaleString()} daily visitors in{" "}
                  {DISTRICTS.find((d) => d.id === primary.districtId)?.name ?? primary.districtId}.
                </li>
                <li className="rounded-lg border border-border bg-muted/30 px-3 py-2">
                  Consider targeting shared visitors with retargeting campaigns.
                </li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
