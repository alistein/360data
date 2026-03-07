"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Webhook } from "@/lib/mock/developers-data"
import { WEBHOOKS } from "@/lib/mock/developers-data"
import { RiAddLine, RiDeleteBinLine, RiSendPlaneLine } from "@remixicon/react"
import { toast } from "sonner"

const WEBHOOK_EVENTS = [
  "footfall.threshold",
  "district.update",
  "report.ready",
] as const

function formatDate(iso: string | null): string {
  if (!iso) return "Never"
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const mockPayload = {
  event: "footfall.threshold",
  timestamp: new Date().toISOString(),
  data: {
    district_id: "nizami",
    date: "2025-03-07",
    footfall: 12500,
    threshold: 10000,
  },
}

export function WebhookConfig() {
  const [webhooks, setWebhooks] = useState<Webhook[]>(WEBHOOKS)
  const [showAddForm, setShowAddForm] = useState(false)
  const [addUrl, setAddUrl] = useState("")
  const [addEvent, setAddEvent] = useState<string>(WEBHOOK_EVENTS[0])

  const handleToggle = (id: string, enabled: boolean) => {
    setWebhooks((prev) =>
      prev.map((w) => (w.id === id ? { ...w, enabled } : w))
    )
    toast.success(enabled ? "Webhook enabled" : "Webhook disabled")
  }

  const handleDelete = (id: string) => {
    setWebhooks((prev) => prev.filter((w) => w.id !== id))
    toast.success("Webhook deleted")
  }

  const handleTest = (webhook: Webhook) => {
    toast.info("Mock payload sent", {
      description: JSON.stringify(mockPayload, null, 2),
      duration: 5000,
    })
  }

  const handleAdd = () => {
    if (!addUrl.trim()) {
      toast.error("URL is required")
      return
    }
    const newWebhook: Webhook = {
      id: `wh-${Date.now()}`,
      url: addUrl.trim(),
      event: addEvent,
      enabled: true,
      lastTriggered: null,
    }
    setWebhooks((prev) => [...prev, newWebhook])
    setShowAddForm(false)
    setAddUrl("")
    setAddEvent(WEBHOOK_EVENTS[0])
    toast.success("Webhook added")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm">Webhooks</CardTitle>
          <Button
            size="sm"
            onClick={() => setShowAddForm((v) => !v)}
            className="gap-1.5"
          >
            <RiAddLine className="size-4" />
            Add Webhook
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddForm && (
            <div className="flex flex-wrap gap-4 rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="add-url">URL</Label>
                <Input
                  id="add-url"
                  placeholder="https://example.com/webhook"
                  value={addUrl}
                  onChange={(e) => setAddUrl(e.target.value)}
                  className="w-80 font-mono text-xs"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Event</Label>
                <Select value={addEvent} onValueChange={setAddEvent}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {WEBHOOK_EVENTS.map((e) => (
                      <SelectItem key={e} value={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <Button size="sm" onClick={handleAdd}>
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {webhooks.map((webhook) => (
              <div
                key={webhook.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border p-4"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <code className="block truncate text-xs font-mono">
                    {webhook.url}
                  </code>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {webhook.event}
                    </Badge>
                    <span className="text-muted-foreground text-xs">
                      Last triggered: {formatDate(webhook.lastTriggered)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`enabled-${webhook.id}`}
                      checked={webhook.enabled}
                      onCheckedChange={(checked) =>
                        handleToggle(webhook.id, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`enabled-${webhook.id}`}
                      className="text-xs"
                    >
                      Enabled
                    </Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTest(webhook)}
                    className="gap-1"
                  >
                    <RiSendPlaneLine className="size-3.5" />
                    Test
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDelete(webhook.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <RiDeleteBinLine className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {webhooks.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No webhooks configured. Add one above.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
