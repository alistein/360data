"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RiFileChartLine,
  RiCalendarLine,
  RiHistoryLine,
  RiToolsLine,
} from "@remixicon/react"
import { ReportBuilder } from "./report-builder"
import { ReportHistory } from "./report-history"
import { ReportTemplates } from "./report-templates"
import { ScheduledReports } from "./scheduled-reports"

export function ReportsClient() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height))] flex-col overflow-hidden p-4">
      <Tabs defaultValue="templates" className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="mb-4 shrink-0">
          <TabsTrigger value="templates" className="gap-2">
            <RiFileChartLine className="size-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="builder" className="gap-2">
            <RiToolsLine className="size-4" />
            Report Builder
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="gap-2">
            <RiCalendarLine className="size-4" />
            Scheduled
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <RiHistoryLine className="size-4" />
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="templates" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <ReportTemplates />
        </TabsContent>
        <TabsContent value="builder" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <ReportBuilder />
        </TabsContent>
        <TabsContent value="scheduled" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <ScheduledReports />
        </TabsContent>
        <TabsContent value="history" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <ReportHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
