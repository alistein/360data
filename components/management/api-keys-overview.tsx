"use client"

import { useState, useMemo } from "react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { TeamApiKey } from "@/lib/mock/management-data"
import { TEAM_API_KEYS } from "@/lib/mock/management-data"
import { RiCloseCircleLine } from "@remixicon/react"
import { toast } from "sonner"

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

export function ApiKeysOverview() {
  const [keys, setKeys] = useState<TeamApiKey[]>(TEAM_API_KEYS)
  const [ownerFilter, setOwnerFilter] = useState<string>("all")

  const owners = useMemo(() => {
    const set = new Set(keys.map((k) => k.owner))
    return Array.from(set).sort()
  }, [keys])

  const filteredKeys = useMemo(() => {
    if (ownerFilter === "all") return keys
    return keys.filter((k) => k.owner === ownerFilter)
  }, [keys, ownerFilter])

  const handleRevoke = (id: string, label: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id))
    toast.success(`API key "${label}" revoked`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm">All Team API Keys</CardTitle>
          <Select value={ownerFilter} onValueChange={setOwnerFilter}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Filter by owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All owners</SelectItem>
              {owners.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Owner</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.owner}</TableCell>
                  <TableCell>{key.label}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        key.environment === "production"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {key.environment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                      {key.prefix}
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {formatDate(key.lastUsed)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleRevoke(key.id, key.label)}
                      className="gap-1 text-destructive hover:text-destructive"
                    >
                      <RiCloseCircleLine className="size-3.5" />
                      Revoke
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredKeys.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No API keys found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
