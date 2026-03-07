"use client"

import { useState } from "react"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { RiDownloadLine, RiVipCrownLine } from "@remixicon/react"
import { downloadJson } from "@/lib/download-json"
import type { DistrictId } from "@/lib/mock/explore-data"
import { getDistrictById } from "@/lib/mock/explore-data"
import {
  BENCHMARK_DATA,
  getReportTemplate,
  REPORT_TEMPLATES,
  type ReportTemplate,
} from "@/lib/mock/reports-data"

const peakHoursConfig: ChartConfig = {
  count: { label: "Footfall", color: "var(--chart-1)" },
}

const dayOfWeekConfig: ChartConfig = {
  count: { label: "Visitors", color: "var(--chart-2)" },
}

const benchmarkConfig: ChartConfig = {
  location: { label: "Location", color: "var(--chart-1)" },
  average: { label: "District avg", color: "var(--chart-2)" },
}

const RECOMMENDATIONS = [
  "Consider extending operating hours to capture evening peak footfall.",
  "Target 25-34 demographic with tailored promotions based on visitor origin data.",
  "Monitor competitor density in adjacent districts for market expansion opportunities.",
]

function ReportPreview({
  template,
  districtId,
}: {
  template: ReportTemplate
  districtId: DistrictId
}) {
  const district = getDistrictById(districtId)
  if (!district) return null

  const benchmark = BENCHMARK_DATA[districtId] ?? 8000
  const insight = template.sampleInsight
    .replace("{{location}}", district.name)
    .replace("{{trend}}", String(district.trend))

  const benchmarkData = [
    {
      name: "Footfall",
      location: district.avgDailyFootfall,
      average: benchmark,
    },
  ]

  const exportPdf = () => {
    const payload = {
      template: template.id,
      location: district.name,
      insight,
      generatedAt: new Date().toISOString(),
    }
    downloadJson(`report-${template.id}-${district.name}.json`, payload)
  }

  return (
    <Card className="mt-4 border-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm">Report Preview</CardTitle>
        <div className="flex gap-2">
          {template.whiteLabel && (
            <Badge variant="secondary" className="gap-1">
              <RiVipCrownLine className="size-3" />
              White-label
            </Badge>
          )}
          <Button size="sm" variant="outline" onClick={exportPdf}>
            <RiDownloadLine className="mr-1 size-4" />
            Export PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">Executive Summary</p>
          <p className="text-sm text-muted-foreground">{insight}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={district.trend >= 0 ? "default" : "destructive"}>
            {district.trend >= 0 ? "+" : ""}
            {district.trend}% vs previous period
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium">Peak Hours (24h)</p>
            <ChartContainer config={peakHoursConfig} className="h-[140px]">
              <BarChart
                data={district.peakHours}
                margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Day of Week</p>
            <ChartContainer config={dayOfWeekConfig} className="h-[140px]">
              <BarChart
                data={district.dayOfWeek}
                margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Benchmark vs District Average</p>
          <ChartContainer config={benchmarkConfig} className="h-[80px]">
            <BarChart
              data={benchmarkData}
              margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="location" fill="var(--color-location)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="average" fill="var(--color-average)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Actionable Recommendations</p>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {RECOMMENDATIONS.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export function ReportTemplates() {
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null)
  const [previewDistrict, setPreviewDistrict] = useState<DistrictId>("nizami")

  const previewTemplate = previewTemplateId ? getReportTemplate(previewTemplateId) : null

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {REPORT_TEMPLATES.map((template) => (
          <Card key={template.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm">{template.name}</CardTitle>
                {template.whiteLabel && (
                  <Badge variant="outline" className="text-xs">
                    Enterprise
                  </Badge>
                )}
              </div>
              <Badge variant="secondary" className="w-fit text-xs">
                {template.industry}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">{template.description}</p>
              <div className="flex flex-wrap gap-1">
                {template.metrics.slice(0, 3).map((m) => (
                  <Badge key={m} variant="outline" className="text-xs">
                    {m}
                  </Badge>
                ))}
              </div>
              <Button
                size="sm"
                className="w-full"
                onClick={() =>
                  setPreviewTemplateId(previewTemplateId === template.id ? null : template.id)
                }
              >
                {previewTemplateId === template.id ? "Hide Preview" : "Generate Preview"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {previewTemplate && (
        <div>
          <div className="mb-2 flex items-center gap-2">
            <label className="text-sm font-medium">Preview location:</label>
            <select
              value={previewDistrict}
              onChange={(e) => setPreviewDistrict(e.target.value as DistrictId)}
              className="rounded-md border border-input bg-background px-2 py-1 text-sm"
            >
              <option value="nizami">Nizami</option>
              <option value="yasamal">Yasamal</option>
              <option value="sabail">Sabail</option>
              <option value="narimanov">Narimanov</option>
              <option value="nasimi">Nasimi</option>
            </select>
          </div>
          <ReportPreview template={previewTemplate} districtId={previewDistrict} />
        </div>
      )}
    </div>
  )
}
