import type { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { DevelopersClient } from "@/components/developers/developers-client"

export const metadata: Metadata = {
  title: "Developers",
  description: "API keys, playground, documentation, usage, webhooks, and changelog",
}

export default function DevelopersPage() {
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
        <SiteHeader title="Developers" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DevelopersClient />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
