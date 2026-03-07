"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RiKey2Line,
  RiCodeSSlashLine,
  RiBookOpenLine,
  RiBarChart2Line,
  RiLinksLine,
  RiHistoryLine,
} from "@remixicon/react"
import { ApiKeys } from "./api-keys"
import { Playground } from "./playground"
import { Documentation } from "./documentation"
import { UsageDashboard } from "./usage-dashboard"
import { WebhookConfig } from "./webhook-config"
import { Changelog } from "./changelog"

export function DevelopersClient() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height))] flex-col overflow-hidden p-4">
      <Tabs defaultValue="api-keys" className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="mb-4 shrink-0 flex-wrap gap-1">
          <TabsTrigger value="api-keys" className="gap-2">
            <RiKey2Line className="size-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="playground" className="gap-2">
            <RiCodeSSlashLine className="size-4" />
            Playground
          </TabsTrigger>
          <TabsTrigger value="documentation" className="gap-2">
            <RiBookOpenLine className="size-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="usage" className="gap-2">
            <RiBarChart2Line className="size-4" />
            Usage
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="gap-2">
            <RiLinksLine className="size-4" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="changelog" className="gap-2">
            <RiHistoryLine className="size-4" />
            Changelog
          </TabsTrigger>
        </TabsList>
        <TabsContent value="api-keys" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <ApiKeys />
        </TabsContent>
        <TabsContent value="playground" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <Playground />
        </TabsContent>
        <TabsContent value="documentation" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <Documentation />
        </TabsContent>
        <TabsContent value="usage" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <UsageDashboard />
        </TabsContent>
        <TabsContent value="webhooks" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <WebhookConfig />
        </TabsContent>
        <TabsContent value="changelog" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <Changelog />
        </TabsContent>
      </Tabs>
    </div>
  )
}
