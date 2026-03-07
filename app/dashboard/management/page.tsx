import type { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { ManagementClient } from "@/components/management/management-client"

export const metadata: Metadata = {
  title: "Management",
  description: "User management, plan & billing, API keys overview, notifications, audit log, data preferences",
}

export default function ManagementPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Management" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <ManagementClient />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
