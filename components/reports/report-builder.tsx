"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RiDownloadLine } from "@remixicon/react"
import { cn } from "@/lib/utils"
import { downloadJson } from "@/lib/download-json"
import type { DistrictId } from "@/lib/mock/explore-data"
import { DISTRICTS } from "@/lib/mock/explore-data"
import {
  getReportTemplate,
  REPORT_TEMPLATES,
} from "@/lib/mock/reports-data"

const METRICS = [
  "Footfall",
  "Demographics",
  "Dwell Time",
  "Visitor Origin",
  "Trend",
  "Benchmark",
]

const FORMATS = ["PDF", "CSV", "JSON"] as const

const MONTHS = [
  "Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024",
  "Jul 2024", "Aug 2024", "Sep 2024", "Oct 2024", "Nov 2024", "Dec 2024",
  "Jan 2025", "Feb 2025", "Mar 2025",
]

export function ReportBuilder() {
  const [templateId, setTemplateId] = useState<string>(REPORT_TEMPLATES[0].id)
  const [selectedDistricts, setSelectedDistricts] = useState<Set<DistrictId>>(
    new Set(["nizami"])
  )
  const [startMonth, setStartMonth] = useState<string>("Jan 2025")
  const [endMonth, setEndMonth] = useState<string>("Mar 2025")
  const [selectedMetrics, setSelectedMetrics] = useState<Set<string>>(
    new Set(["Footfall", "Demographics", "Benchmark"])
  )
  const [format, setFormat] = useState<(typeof FORMATS)[number]>("PDF")

  const template = getReportTemplate(templateId)

  const toggleDistrict = (id: DistrictId) => {
    setSelectedDistricts((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleMetric = (m: string) => {
    setSelectedMetrics((prev) => {
      const next = new Set(prev)
      if (next.has(m)) next.delete(m)
      else next.add(m)
      return next
    })
  }

  const exportReport = () => {
    const payload = {
      template: templateId,
      templateName: template?.name,
      districts: Array.from(selectedDistricts),
      dateRange: { start: startMonth, end: endMonth },
      metrics: Array.from(selectedMetrics),
      format,
      generatedAt: new Date().toISOString(),
    }
    downloadJson(`custom-report-${templateId}.${format.toLowerCase()}`, payload)
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Report Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Template</label>
              <Select value={templateId} onValueChange={setTemplateId}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_TEMPLATES.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Locations</label>
              <div className="flex flex-wrap gap-2">
                {DISTRICTS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => toggleDistrict(d.id)}
                    className={cn(
                      "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                      selectedDistricts.has(d.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Start Month</label>
                <Select value={startMonth} onValueChange={setStartMonth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">End Month</label>
                <Select value={endMonth} onValueChange={setEndMonth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Metrics</label>
              <div className="flex flex-wrap gap-2">
                {METRICS.map((m) => (
                  <label key={m} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedMetrics.has(m)}
                      onChange={() => toggleMetric(m)}
                      className="rounded border-input"
                    />
                    <span className="text-sm">{m}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Format</label>
              <div className="flex gap-4">
                {FORMATS.map((f) => (
                  <label key={f} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="format"
                      checked={format === f}
                      onChange={() => setFormat(f)}
                    />
                    <span className="text-sm">{f}</span>
                  </label>
                ))}
              </div>
            </div>
            <Button className="w-full">Generate Report</Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Live Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Template</p>
              <p className="font-medium">{template?.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Districts</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {Array.from(selectedDistricts).map((id) => (
                  <span
                    key={id}
                    className="rounded bg-muted px-2 py-0.5 text-xs"
                  >
                    {DISTRICTS.find((d) => d.id === id)?.name ?? id}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Date Range</p>
              <p className="text-sm">{startMonth} – {endMonth}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Metrics</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {Array.from(selectedMetrics).map((m) => (
                  <span
                    key={m}
                    className="rounded border border-border px-2 py-0.5 text-xs"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={exportReport}>
              <RiDownloadLine className="mr-1 size-4" />
              Export
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
