import type { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { AiChatClient } from "@/components/ai/ai-chat-client"

export const metadata: Metadata = {
  title: "Botcell",
  description: "Chat with Botcell",
}

export default function AiChatPage() {
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
        <SiteHeader title="Botcell" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AiChatClient />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
