"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RiTeamLine,
  RiBankCardLine,
  RiKey2Line,
  RiBellLine,
  RiShieldCheckLine,
  RiSettings3Line,
} from "@remixicon/react"
import { UserManagement } from "./user-management"
import { PlanBilling } from "./plan-billing"
import { ApiKeysOverview } from "./api-keys-overview"
import { Notifications } from "./notifications"
import { AuditLog } from "./audit-log"
import { DataPreferences } from "./data-preferences"

export function ManagementClient() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height))] flex-col overflow-hidden p-4">
      <Tabs defaultValue="users" className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="mb-4 shrink-0 flex-wrap gap-1">
          <TabsTrigger value="users" className="gap-2">
            <RiTeamLine className="size-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <RiBankCardLine className="size-4" />
            Plan & Billing
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="gap-2">
            <RiKey2Line className="size-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <RiBellLine className="size-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="audit" className="gap-2">
            <RiShieldCheckLine className="size-4" />
            Audit Log
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <RiSettings3Line className="size-4" />
            Data Preferences
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <UserManagement />
        </TabsContent>
        <TabsContent value="billing" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <PlanBilling />
        </TabsContent>
        <TabsContent value="api-keys" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <ApiKeysOverview />
        </TabsContent>
        <TabsContent value="notifications" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <Notifications />
        </TabsContent>
        <TabsContent value="audit" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <AuditLog />
        </TabsContent>
        <TabsContent value="preferences" className="flex-1 overflow-auto data-[state=inactive]:hidden">
          <DataPreferences />
        </TabsContent>
      </Tabs>
    </div>
  )
}
