"use client"

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react"
import { cn } from "@/lib/utils"
import type { DistrictId } from "@/lib/mock/explore-data"
import { getDistrictById } from "@/lib/mock/explore-data"

const peakHoursConfig: ChartConfig = {
  count: { label: "Footfall", color: "var(--chart-1)" },
}

const dayOfWeekConfig: ChartConfig = {
  count: { label: "Visitors", color: "var(--chart-2)" },
}

const ageConfig: ChartConfig = {
  percent: { label: "Share", color: "var(--chart-3)" },
}

const dwellConfig: ChartConfig = {
  under15: { label: "Under 15 min", color: "var(--chart-1)" },
  between15and60: { label: "15–60 min", color: "var(--chart-2)" },
  over60: { label: "60+ min", color: "var(--chart-3)" },
}

const trendConfig: ChartConfig = {
  footfall: { label: "Footfall", color: "var(--chart-1)" },
}

const PIE_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"]

export function LocationPanel({
  districtId,
  onClose,
}: {
  districtId: DistrictId | null
  onClose: () => void
}) {
  const district = districtId ? getDistrictById(districtId) : null

  const dwellPieData = district
    ? [
        { name: "Under 15 min", value: district.dwellTime.under15, fill: PIE_COLORS[0] },
        {
          name: "15–60 min",
          value: district.dwellTime.between15and60,
          fill: PIE_COLORS[1],
        },
        { name: "60+ min", value: district.dwellTime.over60, fill: PIE_COLORS[2] },
      ]
    : []

  const incomePieData = district
    ? [
        { name: "Low", value: district.demographics.income.low, fill: PIE_COLORS[0] },
        { name: "Mid", value: district.demographics.income.mid, fill: PIE_COLORS[1] },
        { name: "High", value: district.demographics.income.high, fill: PIE_COLORS[2] },
      ]
    : []

  return (
    <div
      className={cn(
        "absolute right-0 top-0 z-[1000] flex h-full w-96 flex-col border-l bg-background shadow-xl transition-transform duration-300 ease-in-out",
        districtId ? "translate-x-0" : "translate-x-full"
      )}
    >
      {district ? (
        <>
      <div className="flex flex-col gap-2 border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{district.name}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close panel"
          >
            ×
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {district.avgDailyFootfall.toLocaleString()} / day
          </Badge>
          <Badge
            variant={district.trend >= 0 ? "default" : "destructive"}
            className="gap-0.5"
          >
            {district.trend >= 0 ? (
              <RiArrowUpLine className="size-3" />
            ) : (
              <RiArrowDownLine className="size-3" />
            )}
            {district.trend >= 0 ? "+" : ""}
            {district.trend}%
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          vs last quarter
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="behaviour">Behaviour</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Peak Hours (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={peakHoursConfig} className="h-[180px]">
                  <BarChart data={district.peakHours} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="hour"
                      tickFormatter={(h) => `${h}`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Day of Week</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={dayOfWeekConfig} className="h-[140px]">
                  <BarChart data={district.dayOfWeek} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="demographics" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Age Bands</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={ageConfig} className="h-[140px]">
                  <BarChart data={district.demographics.age} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="band"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent formatter={(v) => `${v}%`} />} />
                    <Bar dataKey="percent" fill="var(--color-percent)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Income Tier</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={120}>
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
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Gender Index</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold tabular-nums">
                  {district.demographics.genderIndex}
                </p>
                <p className="text-xs text-muted-foreground">
                  M/F ratio (1 = balanced)
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="behaviour" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Dwell Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie
                      data={dwellPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {dwellPieData.map((_, i) => (
                        <Cell key={i} fill={dwellPieData[i].fill} />
                      ))}
                    </Pie>
                    <ChartTooltip formatter={(v) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Visitor Origin</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {district.visitorOrigin.map((vo) => (
                    <li
                      key={vo.district}
                      className="flex justify-between"
                    >
                      <span>{vo.district}</span>
                      <span className="tabular-nums text-muted-foreground">
                        {vo.percent}%
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="border-t p-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Trend (12 weeks)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trendConfig} className="h-[80px]">
              <AreaChart data={district.trendLine} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <defs>
                  <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="footfall"
                  stroke="var(--chart-1)"
                  fill="url(#trendGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
        </>
      ) : null}
    </div>
  )
}
