import type { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { ExploreClient } from "@/components/explore/explore-client"

export const metadata: Metadata = {
  title: "Explore",
  description: "Location intelligence map of Azerbaijan",
}

export default function ExplorePage() {
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
        <SiteHeader title="Explore" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <ExploreClient />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
