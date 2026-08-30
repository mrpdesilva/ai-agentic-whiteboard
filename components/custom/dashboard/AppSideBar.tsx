"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs"
import { Archive, LayoutGrid, Settings, Sparkles, User } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import CreateNewBoardDialog from "./CreateNewBoardDialog"

export function AppSidebar() {

  const path = usePathname();

  const user = useUser();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <h2 className="text-xl font-bold">Whizboard</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <CreateNewBoardDialog/>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>My Boards</SidebarGroupLabel>
          <SidebarMenuButton className="p-5" isActive={path === "/dashboard"}>
            <LayoutGrid />
            <span>All Files</span>
          </SidebarMenuButton>

          <SidebarMenuButton className="p-5 mt-2" isActive={path === "/shared-files"}>
            <User />
            <span>Shared</span>
          </SidebarMenuButton>

          <SidebarMenuButton className="p-5 mt-2" isActive={path === "/archived"}>
            <Archive />
            <span>Archived</span>
          </SidebarMenuButton>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenuButton className="p-5 mt-2" isActive={path === "/ai"}>
            <Sparkles />
            <span>AI Helper</span>
          </SidebarMenuButton>

          <SidebarMenuButton className="p-5 mt-2" isActive={path === "/settings"}>
            <Settings />
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter>
        <CreateNewBoardDialog/>
        <div className="p-4 border rounded-md">
          <h2 className="text-sm flex justify-between mb-1">2 files created <span>total 3</span></h2>
          <Progress value={66} className="h-2 mt-2" />
        </div>

        <div className="flex items-center gap-2 p-4 border rounded-md">
          {user?.user?.imageUrl ? (
            <Image
              src={user.user.imageUrl}
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
              {user?.user?.firstName?.[0] || "U"}
            </div>
          )}
          <h2>{user?.user?.firstName} {user?.user?.lastName}</h2>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}