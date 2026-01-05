"use client";

import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
} from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Blocks, Dock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import React from "react";
import { showPopUp } from "@/store/popUpContentSlice/popUpContentSlice";

export function NavDocuments({ type }: { type: "Projects" | "Page" }) {
  const { isMobile } = useSidebar();

  const projectData = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (projectData.error) {
      dispatch(
        showPopUp({
          title: "Error",
          message: "Unable to load recent updates. Please try again later.",
          type: "ERROR",
          isActionable: false,
        })
      );
    }
  }, [dispatch, projectData.error]);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Recents Updates</SidebarGroupLabel>
      <SidebarMenu>
        {projectData.loading ? (
          <div className="w-full flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <SidebarMenuItem key={index} className="animate-pulse">
                <SidebarMenuButton asChild>
                  <div className="h-4 w-20 rounded-md bg-secondary/80" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </div>
        ) : (
          projectData.projects.map((item) => (
            <SidebarMenuItem key={item.project_id}>
              <SidebarMenuButton asChild>
                <a href={`/dashboard/project/${item.project_id}`}>
                  {type == "Projects" ? <Blocks /> : <Dock />}
                  <span>{item.project_name}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="data-[state=open]:bg-accent rounded-sm cursor-pointer"
                    title="More"
                  >
                    <IconDots />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-24 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <IconFolder />
                    <span>Open</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconShare3 />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <IconTrash />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))
        )}
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <IconDots className="text-sidebar-foreground/70" />
            <span>Load More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
