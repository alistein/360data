"use client"

import * as React from "react"

import { useAuth } from "@/components/auth-provider"
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
import {
  RiAdminLine,
  RiCodeLine,
  RiCompassDiscoverLine,
  RiFileChartLine,
  RiMegaphoneLine,
  RiQuestionLine,
  RiSearchLine,
  RiSettingsLine,
} from "@remixicon/react"

const mockUser = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

const data = {
  navMain: [
    {
      title: "Explore",
      url: "/dashboard/explore",
      icon: <RiCompassDiscoverLine />,
    },
    {
      title: "Campaigns",
      url: "/dashboard/campaigns",
      icon: <RiMegaphoneLine />,
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: <RiFileChartLine />,
    },
    {
      title: "Developers",
      url: "/dashboard/developers",
      icon: <RiCodeLine />,
    },
    {
      title: "Management",
      url: "/dashboard/management",
      icon: <RiAdminLine />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <RiSettingsLine />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <RiQuestionLine />,
    },
    {
      title: "Search",
      url: "#",
      icon: <RiSearchLine />,
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
              <a href="/dashboard/explore" className="flex items-center gap-2">
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
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
