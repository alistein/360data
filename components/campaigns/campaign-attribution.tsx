"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"
import { RiArrowUpLine } from "@remixicon/react"
import { CAMPAIGNS } from "@/lib/mock/campaigns-data"

const trendConfig: ChartConfig = {
  footfall: { label: "Footfall", color: "var(--chart-1)" },
}

export function CampaignAttribution() {
  const [campaignId, setCampaignId] = useState<string>(CAMPAIGNS[0].id)

  const campaign = CAMPAIGNS.find((c) => c.id === campaignId)
  if (!campaign) return null

  const footfallDelta = campaign.afterFootfall - campaign.beforeFootfall

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Select Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={campaignId} onValueChange={setCampaignId}>
            <SelectTrigger className="w-full max-w-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CAMPAIGNS.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Before / After Footfall</CardTitle>
          <p className="text-xs text-muted-foreground">
            Campaign ran {campaign.startDate} – {campaign.endDate}
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={trendConfig} className="h-[200px]">
            <AreaChart
              data={campaign.timeline}
              margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
            >
              <defs>
                <linearGradient id="attributionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Area
                type="monotone"
                dataKey="footfall"
                stroke="var(--chart-1)"
                fill="url(#attributionGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Lift Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-2xl font-semibold tabular-nums">
                +{footfallDelta.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Footfall delta</p>
            </div>
            <div>
              <Badge variant="default" className="gap-1">
                <RiArrowUpLine className="size-3" />
                +{campaign.lift}% lift
              </Badge>
            </div>
            <div>
              <Badge variant="secondary">95% confidence</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">District-Level Lift</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium">District</th>
                  <th className="pb-2 text-right font-medium">Before</th>
                  <th className="pb-2 text-right font-medium">After</th>
                  <th className="pb-2 text-right font-medium">Lift</th>
                </tr>
              </thead>
              <tbody>
                {campaign.districtLift.map((d) => (
                  <tr key={d.districtId} className="border-b last:border-0">
                    <td className="py-2">{d.districtName}</td>
                    <td className="py-2 text-right tabular-nums">
                      {d.beforeFootfall.toLocaleString()}
                    </td>
                    <td className="py-2 text-right tabular-nums">
                      {d.afterFootfall.toLocaleString()}
                    </td>
                    <td className="py-2 text-right tabular-nums text-primary">
                      +{d.lift}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
