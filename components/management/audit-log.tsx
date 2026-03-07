"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AUDIT_LOG } from "@/lib/mock/management-data"
import { RiFileDownloadLine } from "@remixicon/react"
import { toast } from "sonner"

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

export function AuditLog() {
  const [search, setSearch] = useState("")

  const filteredEntries = useMemo(() => {
    if (!search.trim()) return AUDIT_LOG
    const q = search.toLowerCase()
    return AUDIT_LOG.filter(
      (e) =>
        e.user.toLowerCase().includes(q) ||
        e.action.toLowerCase().includes(q) ||
        e.resource.toLowerCase().includes(q)
    )
  }, [search])

  const handleExportCsv = () => {
    toast.success("Audit log export started")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-sm">Audit Log</CardTitle>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search by user or action..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 w-64"
            />
            <Button size="sm" variant="outline" onClick={handleExportCsv}>
              <RiFileDownloadLine className="size-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground text-sm">
            Who accessed what, when — for enterprise and compliance.
          </p>
          <div className="max-h-[400px] overflow-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                      {formatTimestamp(entry.timestamp)}
                    </TableCell>
                    <TableCell className="font-medium">{entry.user}</TableCell>
                    <TableCell>{entry.action}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {entry.resource}
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs">
                      {entry.ip}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredEntries.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No matching entries.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
