"use client"

import { useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { RiDownloadLine } from "@remixicon/react"
import { cn } from "@/lib/utils"
import { downloadJson } from "@/lib/download-json"
import type { DistrictId } from "@/lib/mock/explore-data"
import { DISTRICTS } from "@/lib/mock/explore-data"
import {
  AUDIENCE_SEGMENTS,
  BUDGET_RECOMMENDATIONS,
} from "@/lib/mock/campaigns-data"

const ageConfig: ChartConfig = {
  percent: { label: "Share", color: "var(--chart-1)" },
}

const BEHAVIOR_TAGS = ["Commuter", "Shopper", "Tourist", "Weekend Visitor"]

export function AudienceBuilder() {
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>(
    AUDIENCE_SEGMENTS[0].id
  )
  const [selectedDistricts, setSelectedDistricts] = useState<Set<DistrictId>>(
    new Set()
  )

  const segment = AUDIENCE_SEGMENTS.find((s) => s.id === selectedSegmentId)!
  const coverageDistricts =
    selectedDistricts.size > 0
      ? segment.districts.filter((d) => selectedDistricts.has(d))
      : segment.districts
  const coverageWithBudget = coverageDistricts.map((id) => ({
    id,
    name: DISTRICTS.find((d) => d.id === id)?.name ?? id,
    budget: BUDGET_RECOMMENDATIONS.find((b) => b.districtId === id),
  }))

  const toggleDistrict = (id: DistrictId) => {
    setSelectedDistricts((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const exportForGoogleAds = () => {
    const payload = {
      geo_targets: coverageDistricts.map((id) => {
        const d = DISTRICTS.find((x) => x.id === id)
        return d
          ? { name: d.name, coordinates: d.polygon[0] }
          : { name: id, coordinates: [40.4, 49.9] }
      }),
      demographics: {
        age_ranges: segment.ageBands.map((a) => a.band),
        income: segment.incomeTier,
        gender_index: segment.genderIndex,
      },
      estimated_reach: segment.estimatedSize,
    }
    downloadJson("google-ads-audience.json", payload)
  }

  const exportForMeta = () => {
    const payload = {
      custom_audience: {
        locations: coverageDistricts.map((id) => ({
          district_id: id,
          district_name: DISTRICTS.find((d) => d.id === id)?.name ?? id,
        })),
        age_min: 18,
        age_max: 65,
        income_tier: segment.incomeTier,
        estimated_size: segment.estimatedSize,
      },
    }
    downloadJson("meta-ads-audience.json", payload)
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {DISTRICTS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => toggleDistrict(d.id)}
                  className={cn(
                    "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                    selectedDistricts.size === 0 || selectedDistricts.has(d.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {d.name}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {selectedDistricts.size === 0
                ? "All districts selected"
                : `${selectedDistricts.size} districts selected`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Audience Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {AUDIENCE_SEGMENTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSegmentId(s.id)}
                  className={cn(
                    "block w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                    selectedSegmentId === s.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-muted/50"
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Behavior</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {BEHAVIOR_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Audience Brief</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={exportForGoogleAds}>
                <RiDownloadLine className="mr-1 size-4" />
                Export for Google Ads
              </Button>
              <Button size="sm" variant="outline" onClick={exportForMeta}>
                <RiDownloadLine className="mr-1 size-4" />
                Export for Meta
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-2xl font-semibold tabular-nums">
                {segment.estimatedSize.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Estimated audience size
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Overlap with existing base</p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${segment.overlapWithBase}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {segment.overlapWithBase}% overlap
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Demographic Composition</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={ageConfig} className="h-[160px]">
              <BarChart
                data={segment.ageBands}
                margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
              >
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
          <CardHeader>
            <CardTitle className="text-sm">Geographic Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {coverageWithBudget.map(({ id, name, budget }) => (
                <li key={id} className="flex items-center justify-between">
                  <span className="text-sm">{name}</span>
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${(budget?.footfallWeight ?? 20) / 28 * 100}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recommended Budget by District</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {coverageWithBudget
                .filter((x) => x.budget)
                .map(({ name, budget }) => (
                  <li key={name} className="flex justify-between">
                    <span>{name}</span>
                    <span className="tabular-nums text-muted-foreground">
                      ${budget!.recommendedBudget.toLocaleString()}
                    </span>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
