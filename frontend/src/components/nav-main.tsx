"use client";

import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ProjectSelector from "./project-selector";
import { Separator } from "./ui/separator";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const router = useRouter();
  const pathName = usePathname();

  const navigationRef = React.useRef("");

  React.useEffect(() => {
    if (navigationRef.current == pathName) {
      navigationRef.current = "";
    }
  }, [pathName]);

  const [projectDataLoading, setProjectDataLoading] = React.useState(true);
  const [projectDetails, setProjectDetails] = React.useState<{
    id: string;
    name: string;
  } | null>(null);

  React.useEffect(() => {
    const storedData = localStorage.getItem("project_details");
    setProjectDataLoading(true);
    if (storedData) {
      try {
        const data: { id: string; name: string } = JSON.parse(storedData);
        setProjectDetails(data);
      } catch (error) {
        console.error("Failed to parse project_details:", error);
      }
    }
    setProjectDataLoading(false);
  }, []);

  const projects = useSelector((state: RootState) => state.project.projects);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <ProjectSelector
            initialValue={projectDetails?.name}
            initialProjectId={projectDetails?.id}
            projectLoading={projectDataLoading}
          />
          <SidebarMenuItem className="flex items-center gap-2">
            {projects.length > 0 && (
              <SidebarMenuButton
                tooltip="Quick Create"
                className="border cursor-pointer hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                variant="outline"
              >
                <IconCirclePlusFilled />
                <span>Create Page</span>
              </SidebarMenuButton>
            )}
            {/* <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button> */}
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator />
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => {
                  if (navigationRef.current != item.url) {
                    router.push(item.url);
                  }
                  navigationRef.current = item.url;
                }}
                className={
                  item.url == pathName ? "bg-sidebar-accent text-black " : ""
                }
                disabled={item.url == pathName}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
