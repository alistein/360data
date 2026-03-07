"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ENDPOINTS } from "@/lib/mock/developers-data"
import { RiSendPlaneLine } from "@remixicon/react"

export function Playground() {
  const [selectedId, setSelectedId] = useState<string>(ENDPOINTS[0].id)
  const [params, setParams] = useState<Record<string, string>>({})
  const [response, setResponse] = useState<{
    data: unknown
    status: number
    latency: number
    timestamp: string
  } | null>(null)

  const endpoint = ENDPOINTS.find((e) => e.id === selectedId)
  if (!endpoint) return null

  const paramEntries = endpoint.parameters.map((p) => ({
    ...p,
    value: params[p.name] ?? "",
  }))

  const handleParamChange = (name: string, value: string) => {
    setParams((prev) => ({ ...prev, [name]: value }))
  }

  const handleSend = () => {
    const latency = Math.floor(80 + Math.random() * 120)
    setResponse({
      data: endpoint.exampleResponse,
      status: 200,
      latency,
      timestamp: new Date().toISOString(),
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Request</CardTitle>
          <p className="text-xs text-muted-foreground">
            Select an endpoint and fill parameters, then send a request.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>Endpoint</Label>
            <Select value={selectedId} onValueChange={setSelectedId}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ENDPOINTS.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    <span className="font-mono text-xs">
                      {e.method} {e.path}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {paramEntries.length > 0 && (
            <div className="space-y-3">
              <Label>Parameters</Label>
              <div className="grid gap-3 sm:grid-cols-2">
                {paramEntries.map((p) => (
                  <div key={p.name} className="flex flex-col gap-1.5">
                    <Label htmlFor={`param-${p.name}`} className="text-xs">
                      {p.name}
                      {p.required && (
                        <span className="text-destructive ml-0.5">*</span>
                      )}
                    </Label>
                    <Input
                      id={`param-${p.name}`}
                      placeholder={p.description}
                      value={p.value}
                      onChange={(e) => handleParamChange(p.name, e.target.value)}
                      className="font-mono text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button onClick={handleSend} className="gap-2">
            <RiSendPlaneLine className="size-4" />
            Send Request
          </Button>
        </CardContent>
      </Card>

      {response && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Response</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{response.status}</Badge>
              <Badge variant="secondary">{response.latency} ms</Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(response.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-xs font-mono">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
