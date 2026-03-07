import type { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { ReportsClient } from "@/components/reports/reports-client"

export const metadata: Metadata = {
  title: "Reports",
  description: "Pre-built and custom report generation",
}

export default function ReportsPage() {
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
        <SiteHeader title="Reports" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <ReportsClient />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
