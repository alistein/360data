"use client"

import { useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChartTooltip } from "@/components/ui/chart"
import { RiDownloadLine } from "@remixicon/react"
import { downloadJson } from "@/lib/download-json"
import type { DistrictId } from "@/lib/mock/explore-data"
import { DISTRICTS, getDistrictById } from "@/lib/mock/explore-data"

const PIE_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"]

export function TradeAreaTool() {
  const [districtId, setDistrictId] = useState<DistrictId>("nizami")
  const [radiusKm, setRadiusKm] = useState(2)

  const district = getDistrictById(districtId)
  if (!district) return null

  const catchmentPopulation = Math.round(radiusKm * 8500)
  const districtsInRadius = Math.min(
    Math.ceil(radiusKm * 1.2),
    DISTRICTS.length
  )

  const agePieData = district.demographics.age.map((a, i) => ({
    name: a.band,
    value: a.percent,
    fill: PIE_COLORS[i % PIE_COLORS.length],
  }))

  const incomePieData = [
    { name: "Low", value: district.demographics.income.low, fill: PIE_COLORS[0] },
    { name: "Mid", value: district.demographics.income.mid, fill: PIE_COLORS[1] },
    { name: "High", value: district.demographics.income.high, fill: PIE_COLORS[2] },
  ]

  const exportAudience = () => {
    const payload = {
      trade_area: {
        center_district: districtId,
        center_name: district.name,
        radius_km: radiusKm,
        estimated_catchment: catchmentPopulation,
        districts_in_radius: districtsInRadius,
      },
      demographics: {
        age: district.demographics.age,
        income: district.demographics.income,
        gender_index: district.demographics.genderIndex,
      },
    }
    downloadJson("trade-area-audience.json", payload)
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Center Location</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={districtId} onValueChange={(v) => setDistrictId(v as DistrictId)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DISTRICTS.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Radius</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <input
                type="range"
                min={0.5}
                max={5}
                step={0.5}
                value={radiusKm}
                onChange={(e) => setRadiusKm(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm tabular-nums">{radiusKm} km</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Trade Area</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              This radius covers approximately {districtsInRadius} district
              {districtsInRadius !== 1 ? "s" : ""} around {district.name}.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Demographic Profile</CardTitle>
            <Button size="sm" variant="outline" onClick={exportAudience}>
              <RiDownloadLine className="mr-1 size-4" />
              Export Audience
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-2xl font-semibold tabular-nums">
                {catchmentPopulation.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Estimated catchment population
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium">Age Bands</p>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie
                      data={agePieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {agePieData.map((_, i) => (
                        <Cell key={i} fill={agePieData[i].fill} />
                      ))}
                    </Pie>
                    <ChartTooltip formatter={(v) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Income Tier</p>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie
                      data={incomePieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {incomePieData.map((_, i) => (
                        <Cell key={i} fill={incomePieData[i].fill} />
                      ))}
                    </Pie>
                    <ChartTooltip formatter={(v) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
