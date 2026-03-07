import type { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { CampaignsClient } from "@/components/campaigns/campaigns-client"

export const metadata: Metadata = {
  title: "Campaigns",
  description: "Ad empowerment and audience targeting",
}

export default function CampaignsPage() {
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
        <SiteHeader title="Campaigns" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <CampaignsClient />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
