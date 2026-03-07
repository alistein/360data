"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import { USAGE_STATS } from "@/lib/mock/developers-data"

const dailyConfig: ChartConfig = {
  calls: { label: "Calls", color: "var(--chart-1)" },
}

const endpointConfig: ChartConfig = {
  calls: { label: "Calls", color: "var(--chart-2)" },
}

const dailyData = USAGE_STATS.dailyCalls.map((d) => ({
  ...d,
  label: new Date(d.date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  }),
}))

const endpointData = USAGE_STATS.callsByEndpoint.slice(0, 5)

const quotaPercent = Math.min(
  100,
  (USAGE_STATS.callsThisMonth / USAGE_STATS.quota) * 100
)

export function UsageDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-xs text-muted-foreground">
              Calls Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">
              {USAGE_STATS.callsToday.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-xs text-muted-foreground">
              Calls This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">
              {USAGE_STATS.callsThisMonth.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-xs text-muted-foreground">
              Quota Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">
              {(USAGE_STATS.quota - USAGE_STATS.callsThisMonth).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-xs text-muted-foreground">
              Avg Latency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">
              {USAGE_STATS.avgLatencyMs} ms
            </p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-xs text-muted-foreground">
              Error Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">
              {USAGE_STATS.errorRatePercent}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Daily Calls (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={dailyConfig} className="h-[200px]">
            <AreaChart
              data={dailyData}
              margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
            >
              <defs>
                <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Area
                type="monotone"
                dataKey="calls"
                stroke="var(--chart-1)"
                fill="url(#usageGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Calls by Endpoint (Top 5)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={endpointConfig} className="h-[180px]">
              <BarChart
                data={endpointData}
                layout="vertical"
                margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="endpoint"
                  width={120}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                />
                <Bar
                  dataKey="calls"
                  fill="var(--chart-2)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Quota Progress</CardTitle>
            <p className="text-xs text-muted-foreground">
              {USAGE_STATS.callsThisMonth.toLocaleString()} /{" "}
              {USAGE_STATS.quota.toLocaleString()} calls used
            </p>
          </CardHeader>
          <CardContent>
            <Progress value={quotaPercent} className="h-3" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
