"use client";

import * as React from "react";
import {
  IconCamera,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconSpeakerphone,
  IconCoin
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Logo from "../../public/tera-logo.png";
import { Separator } from "./ui/separator";
// import {  CircleDollarSign, Megaphone } from "lucide-react";

interface Props extends React.ComponentProps<typeof Sidebar> {
  user: { name: string; email: string; avatar?: string };
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Pages",
      url: "/dashboard/pages",
      icon: IconListDetails,
    },
    // {
    //   title: "Analytics",
    //   url: "/dashboard/analytics",
    //   icon: IconChartBar,
    // },
    {
      title: "Team",
      url: "/dashboard/team",
      icon: IconUsers,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: IconFolder,
    },
    {
      title: "Monetization",
      url: "/dashboard/projects",
      icon: IconCoin,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
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
      icon: IconFileDescription,
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
      icon: IconFileAi,
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
      title: "Advertisement",
      url: "#",
      icon: IconSpeakerphone,
    },
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    // {
    //   title: "Get Help",
    //   url: "#",
    //   icon: IconHelp,
    // },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
    {
      name: "AI Insights",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ user, ...props }: Props) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-transparent hover:text-inherit active:bg-transparent"
            >
              <span>
                {/* <Link href="/dashboard"> */}
                <Image
                  src={Logo}
                  alt="Terra Logo"
                  className="h-5 w-auto"
                  sizes="auto"
                />
                {/* </Link> */}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="scroll-container-vertical">
        <NavMain items={data.navMain} />
        <Separator />
        <NavDocuments items={data.documents} />
        <Separator />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
