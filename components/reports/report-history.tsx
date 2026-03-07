"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
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
import { RiDownloadLine, RiSearchLine } from "@remixicon/react"
import { downloadJson } from "@/lib/download-json"
import {
  GENERATED_REPORTS,
  getReportTemplate,
} from "@/lib/mock/reports-data"

export function ReportHistory() {
  const [search, setSearch] = useState("")

  const filtered = GENERATED_REPORTS.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleDownload = (report: (typeof GENERATED_REPORTS)[0]) => {
    const template = getReportTemplate(report.templateId)
    const payload = {
      id: report.id,
      title: report.title,
      template: report.templateId,
      templateName: template?.name,
      location: report.location,
      createdAt: report.createdAt,
      fileSize: report.fileSize,
      status: report.status,
    }
    downloadJson(`${report.title.replace(/\s+/g, "-")}.json`, payload)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Report History</CardTitle>
          <div className="relative mt-2 max-w-sm">
            <RiSearchLine className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>File Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell>{report.location}</TableCell>
                  <TableCell>{report.createdAt}</TableCell>
                  <TableCell>{report.fileSize}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        report.status === "completed" ? "default" : "secondary"
                      }
                    >
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={report.status === "processing"}
                      onClick={() => handleDownload(report)}
                    >
                      <RiDownloadLine className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No reports match your search.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
