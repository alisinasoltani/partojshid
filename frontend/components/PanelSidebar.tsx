"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  ShieldUser,
  Command,
  Frame,
  StickyNote,
  Map,
  PieChart,
  Settings2,
  LayoutTemplate,
} from "lucide-react"

import logo from "@/public/images/partoLogo.png"
import Image from "next/image"

import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { Skeleton } from '@/components/ui/skeleton';

import { NavMain } from "@/components/ui/nav-main"
import { NavProjects } from "@/components/ui/nav-projects"
import { NavUser } from "@/components/ui/nav-user"
import { TeamSwitcher } from "@/components/ui/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Pages",
      url: "#",
      icon: LayoutTemplate,
      isActive: true,
      items: [
        {
          title: "Jeyshid",
          url: "#",
        },
        {
          title: "Lodge",
          url: "#",
        },
        {
          title: "Projects",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Blogs",
      url: "#",
      icon: StickyNote,
    },
    {
      name: "User Management",
      url: "#",
      icon: ShieldUser,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const token = Cookies.get('jeyshid');

  const { data: user, isLoading } = useQuery({
    queryKey: ['jeyshid'],
    queryFn: async () => {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Unauthorized');
      return res.json();
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  // if (isLoading) {
  //   return <Sidebar {...props}>
  //     <SidebarHeader>
  //       {/* <Image src={logo} width={24} alt="jeyshid logo" /> */}
  //       {/* Jeyshid */}
  //     </SidebarHeader>
  //     <SidebarContent>{/* ... */}</SidebarContent>
  //     <SidebarFooter>
  //       <Skeleton className="h-10 w-40" />
  //     </SidebarFooter>
  //   </Sidebar>;
  // }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row px-4 justify-start items-center gap-2">
        <Image src={logo} width={24} alt="jeyshid logo" />
        <h1 className="font-bold">Jeyshid</h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
