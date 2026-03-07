"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { ApiKey } from "@/lib/mock/developers-data"
import { API_KEYS } from "@/lib/mock/developers-data"
import {
  RiAddLine,
  RiFileCopyLine,
  RiRefreshLine,
  RiCloseCircleLine,
} from "@remixicon/react"
import { toast } from "sonner"

function generateFakeKey(env: "sandbox" | "production"): string {
  const prefix = env === "production" ? "sk_live_" : "sk_test_"
  const suffix = Math.random().toString(36).slice(2, 6)
  return `${prefix}••••••••••••${suffix}`
}

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

export function ApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>(API_KEYS)
  const [environment, setEnvironment] = useState<"sandbox" | "production">(
    "production"
  )
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [createName, setCreateName] = useState("")
  const [createProject, setCreateProject] = useState("")
  const [createEnv, setCreateEnv] = useState<"sandbox" | "production">(
    "production"
  )

  const filteredKeys = keys.filter((k) => k.environment === environment)

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success("Key copied to clipboard")
  }

  const handleCreate = () => {
    if (!createName.trim() || !createProject.trim()) {
      toast.error("Name and project are required")
      return
    }
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: createName.trim(),
      key: generateFakeKey(createEnv),
      environment: createEnv,
      project: createProject.trim(),
      createdAt: new Date().toISOString(),
      lastUsed: null,
      status: "active",
    }
    setKeys((prev) => [...prev, newKey])
    setShowCreateForm(false)
    setCreateName("")
    setCreateProject("")
    setCreateEnv("production")
    toast.success("API key created")
  }

  const handleRotate = (id: string) => {
    setKeys((prev) =>
      prev.map((k) =>
        k.id === id
          ? {
              ...k,
              key: generateFakeKey(k.environment),
              lastUsed: new Date().toISOString(),
            }
          : k
      )
    )
    toast.success("Key rotated")
  }

  const handleRevoke = (id: string) => {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: "revoked" as const } : k))
    )
    toast.success("Key revoked")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm">API Keys</CardTitle>
          <div className="flex items-center gap-2">
            <ToggleGroup
              type="single"
              value={environment}
              onValueChange={(v) => v && setEnvironment(v as "sandbox" | "production")}
            >
              <ToggleGroupItem value="sandbox">Sandbox</ToggleGroupItem>
              <ToggleGroupItem value="production">Production</ToggleGroupItem>
            </ToggleGroup>
            <Button
              size="sm"
              onClick={() => setShowCreateForm((v) => !v)}
              className="gap-1.5"
            >
              <RiAddLine className="size-4" />
              Create Key
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showCreateForm && (
            <div className="flex flex-wrap gap-4 rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="create-name">Name</Label>
                <Input
                  id="create-name"
                  placeholder="e.g. Production Main"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  className="w-48"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="create-project">Project</Label>
                <Input
                  id="create-project"
                  placeholder="e.g. 360data Dashboard"
                  value={createProject}
                  onChange={(e) => setCreateProject(e.target.value)}
                  className="w-48"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Environment</Label>
                <ToggleGroup
                  type="single"
                  value={createEnv}
                  onValueChange={(v) => v && setCreateEnv(v as "sandbox" | "production")}
                >
                  <ToggleGroupItem value="sandbox">Sandbox</ToggleGroupItem>
                  <ToggleGroupItem value="production">Production</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="flex items-end gap-2">
                <Button size="sm" onClick={handleCreate}>
                  Create
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell>{key.project}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                        {key.key}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => handleCopy(key.key)}
                        className="shrink-0"
                      >
                        <RiFileCopyLine className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {formatDate(key.createdAt)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {formatDate(key.lastUsed)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        key.status === "active" ? "default" : "destructive"
                      }
                    >
                      {key.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {key.status === "active" && (
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleRotate(key.id)}
                          className="gap-1"
                        >
                          <RiRefreshLine className="size-3.5" />
                          Rotate
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleRevoke(key.id)}
                          className="gap-1 text-destructive hover:text-destructive"
                        >
                          <RiCloseCircleLine className="size-3.5" />
                          Revoke
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredKeys.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No API keys in {environment}. Create one above.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
