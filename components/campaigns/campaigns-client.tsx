"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RiBarChart2Line, RiMapPinLine, RiUserSearchLine } from "@remixicon/react"
import { AudienceBuilder } from "./audience-builder"
import { CampaignAttribution } from "./campaign-attribution"
import { CompetitorAnalysis } from "./competitor-analysis"
import { TradeAreaTool } from "./trade-area-tool"

export function CampaignsClient() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height))] flex-col overflow-hidden p-4">
      <Tabs defaultValue="audience" className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="mb-4 shrink-0">
          <TabsTrigger value="audience" className="gap-2">
            <RiUserSearchLine className="size-4" />
            Audience Builder
          </TabsTrigger>
          <TabsTrigger value="trade-area" className="gap-2">
            <RiMapPinLine className="size-4" />
            Trade Area
          </TabsTrigger>
          <TabsTrigger value="competitor" className="gap-2">
            <RiBarChart2Line className="size-4" />
            Competitor Analysis
          </TabsTrigger>
          <TabsTrigger value="attribution" className="gap-2">
            Campaign Attribution
          </TabsTrigger>
        </TabsList>
        <TabsContent value="audience" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <AudienceBuilder />
        </TabsContent>
        <TabsContent value="trade-area" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <TradeAreaTool />
        </TabsContent>
        <TabsContent value="competitor" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <CompetitorAnalysis />
        </TabsContent>
        <TabsContent value="attribution" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <CampaignAttribution />
        </TabsContent>
      </Tabs>
    </div>
  )
}
