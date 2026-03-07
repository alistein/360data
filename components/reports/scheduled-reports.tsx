"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { RiAddLine } from "@remixicon/react"
import { getReportTemplate, REPORT_TEMPLATES } from "@/lib/mock/reports-data"

interface ScheduleEntry {
  id: string
  templateId: string
  frequency: "weekly" | "monthly"
  email: string
  enabled: boolean
  nextRun: string
}

const INITIAL_SCHEDULES: ScheduleEntry[] = [
  { id: "s1", templateId: "retail-site", frequency: "weekly", email: "analyst@company.com", enabled: true, nextRun: "2025-03-10" },
  { id: "s2", templateId: "tourism", frequency: "monthly", email: "tourism@company.com", enabled: true, nextRun: "2025-03-31" },
  { id: "s3", templateId: "branch-optimisation", frequency: "monthly", email: "ops@company.com", enabled: false, nextRun: "2025-04-01" },
  { id: "s4", templateId: "real-estate", frequency: "weekly", email: "re@company.com", enabled: true, nextRun: "2025-03-10" },
]

export function ScheduledReports() {
  const [schedules, setSchedules] = useState<ScheduleEntry[]>(INITIAL_SCHEDULES)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTemplateId, setNewTemplateId] = useState<string>(REPORT_TEMPLATES[0].id)
  const [newFrequency, setNewFrequency] = useState<"weekly" | "monthly">("weekly")
  const [newEmail, setNewEmail] = useState("")

  const toggleEnabled = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    )
  }

  const addSchedule = () => {
    if (!newEmail.trim()) return
    const nextRun =
      newFrequency === "weekly"
        ? "2025-03-17"
        : "2025-04-01"
    setSchedules((prev) => [
      ...prev,
      {
        id: `s${Date.now()}`,
        templateId: newTemplateId,
        frequency: newFrequency,
        email: newEmail.trim(),
        enabled: true,
        nextRun,
      },
    ])
    setNewEmail("")
    setShowAddForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Scheduled Reports</h2>
        <Button
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <RiAddLine className="mr-1 size-4" />
          Add Schedule
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">New Schedule</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-end gap-4">
            <div className="min-w-[200px]">
              <label className="mb-2 block text-xs font-medium">Template</label>
              <Select value={newTemplateId} onValueChange={setNewTemplateId}>
                <SelectTrigger>
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
            <div className="min-w-[120px]">
              <label className="mb-2 block text-xs font-medium">Frequency</label>
              <Select
                value={newFrequency}
                onValueChange={(v) => setNewFrequency(v as "weekly" | "monthly")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[220px]">
              <label className="mb-2 block text-xs font-medium">Email</label>
              <Input
                type="email"
                placeholder="analyst@company.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <Button onClick={addSchedule}>Save</Button>
            <Button variant="ghost" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {schedules.map((s) => {
          const template = getReportTemplate(s.templateId)
          return (
            <Card key={s.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-medium">{template?.name ?? s.templateId}</p>
                  <Badge variant="secondary">
                    {s.frequency === "weekly" ? "Weekly" : "Monthly"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{s.email}</span>
                  <span className="text-xs text-muted-foreground">
                    Next: {s.nextRun}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={s.enabled}
                      onChange={() => toggleEnabled(s.id)}
                      className="rounded border-input"
                    />
                    Enabled
                  </label>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
