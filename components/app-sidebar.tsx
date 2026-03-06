"use client"

import * as React from "react"

import { useAuth } from "@/components/auth-provider"
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { RiDashboardLine, RiListUnordered, RiBarChartLine, RiFolderLine, RiGroupLine, RiCameraLine, RiFileTextLine, RiSettingsLine, RiQuestionLine, RiSearchLine, RiDatabase2Line, RiFileChartLine, RiFileLine } from "@remixicon/react"

const mockUser = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: (
        <RiDashboardLine
        />
      ),
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: (
        <RiListUnordered
        />
      ),
    },
    {
      title: "Analytics",
      url: "#",
      icon: (
        <RiBarChartLine
        />
      ),
    },
    {
      title: "Projects",
      url: "#",
      icon: (
        <RiFolderLine
        />
      ),
    },
    {
      title: "Team",
      url: "#",
      icon: (
        <RiGroupLine
        />
      ),
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: (
        <RiCameraLine
        />
      ),
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: (
        <RiFileTextLine
        />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: (
        <RiFileTextLine
        />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: (
        <RiSettingsLine
        />
      ),
    },
    {
      title: "Get Help",
      url: "#",
      icon: (
        <RiQuestionLine
        />
      ),
    },
    {
      title: "Search",
      url: "#",
      icon: (
        <RiSearchLine
        />
      ),
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: (
        <RiDatabase2Line
        />
      ),
    },
    {
      name: "Reports",
      url: "#",
      icon: (
        <RiFileChartLine
        />
      ),
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: (
        <RiFileLine
        />
      ),
    },
  ],
}

function toNavUser(user: { displayName?: string | null; email?: string | null; photoURL?: string | null }) {
  return {
    name: user.displayName || user.email?.split("@")[0] || "User",
    email: user.email || "",
    avatar: user.photoURL || "/avatars/shadcn.jpg",
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()
  const navUser = user ? toNavUser(user) : mockUser

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/dashboard" className="flex items-center gap-2">
                <Image
                  src="/360DataLogo.svg"
                  alt="360Data"
                  width={24}
                  height={24}
                  className="size-5 dark:invert"
                />
                <span className="text-base font-semibold">360Data</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
