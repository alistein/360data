"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type {
  NotificationRule,
  NotificationTrigger,
  NotificationChannel,
} from "@/lib/mock/management-data"
import { NOTIFICATION_RULES } from "@/lib/mock/management-data"
import { toast } from "sonner"

const TRIGGER_LABELS: Record<NotificationTrigger, string> = {
  quota_80: "Monthly quota reaches 80%",
  report_ready: "Report is ready",
  footfall_drop_20: "Footfall drops >20% at monitored location",
}

const CHANNEL_LABELS: Record<NotificationChannel, string> = {
  email: "Email",
  webhook: "Webhook",
}

export function Notifications() {
  const [rules, setRules] = useState<NotificationRule[]>(NOTIFICATION_RULES)

  const handleToggle = (id: string, enabled: boolean) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled } : r))
    )
  }

  const handleTargetChange = (id: string, target: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, target } : r))
    )
  }

  const handleSave = () => {
    toast.success("Notification settings saved")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm">Alert Rules</CardTitle>
          <Button size="sm" onClick={handleSave}>
            Save Changes
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Configure alerts for quota, report completion, and footfall
            thresholds.
          </p>
          <div className="space-y-4">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex flex-wrap items-center gap-4 rounded-lg border border-border p-4"
              >
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="font-medium">
                    {TRIGGER_LABELS[rule.trigger]}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {CHANNEL_LABELS[rule.channel]}
                    </Badge>
                    <Input
                      type={rule.channel === "email" ? "email" : "url"}
                      placeholder={
                        rule.channel === "email"
                          ? "email@example.com"
                          : "https://..."
                      }
                      value={rule.target}
                      onChange={(e) =>
                        handleTargetChange(rule.id, e.target.value)
                      }
                      className="h-8 w-64 font-mono text-xs"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`enabled-${rule.id}`}
                    checked={rule.enabled}
                    onCheckedChange={(checked) =>
                      handleToggle(rule.id, checked === true)
                    }
                  />
                  <Label htmlFor={`enabled-${rule.id}`} className="text-xs">
                    Enabled
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
