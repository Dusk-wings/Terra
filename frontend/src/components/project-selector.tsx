"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
} from "./ui/select";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { IconFolderPlus } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { showPopUp } from "@/store/popUpContentSlice/popUpContentSlice";

interface Props {
  initialValue?: string;
  initialProjectId?: string;
  projectLoading?: boolean;
}

function ProjectSelector({
  initialValue,
  initialProjectId,
  projectLoading,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const createProject = () => {
    dispatch(
      showPopUp({
        title: "Create New Project",
        message: "Fill in the details to create a new project.",
        type: "CREATE_PROJECT",
        isActionable: true,
      })
    );
  };

  const projects = useSelector((state: RootState) => state.project.projects);
  const isProjectLoading = useSelector((state: RootState) => state.project.loading);
  const loadingError = useSelector((state: RootState) => state.project.error);

  return (
    <div>
      {projectLoading || isProjectLoading || loadingError ? (
        <SidebarMenuItem className="flex gap-2">
          <div className="bg-secondary/80 w-4/5 animate-pulse h-8 rounded-md"></div>
          <div className="bg-secondary/80 w-1/5 animate-pulse h-8 rounded-md"></div>
        </SidebarMenuItem>
      ) : projects && projects.length > 0 ? (
        <SidebarMenuItem className="grid grid-cols-6 items-center gap-2">
          <Select>
            <SelectTrigger className="w-full col-span-5 truncate min-w-0">
              <SelectValue
                placeholder={initialValue ? initialValue : "Projects"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Project</SelectLabel>
                {projects.map((item) => (
                  <SelectItem
                    key={item.project_id}
                    value={item.project_id}
                    defaultChecked={initialProjectId == item.project_id}
                  >
                    {item.project_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            title="Create Project"
            className="size-8 group-data-[collapsible=icon]:opacity-0 justify-self-end w-full h-full"
            variant="outline"
            onClick={createProject}
          >
            <IconFolderPlus />
          </Button>
        </SidebarMenuItem>
      ) : (
        <SidebarMenuButton
          tooltip="Quick Create"
          className="bg-primary/90  hover:bg-primary/70  active:bg-primary/70 active:text-primary-foreground min-w-8 duration-200 ease-linear cursor-pointer text-zinc-900/90 hover:text-zinc-900 w-full"
          onClick={createProject}
        >
          <IconFolderPlus />
          <span>Create Project</span>
        </SidebarMenuButton>
      )}
    </div>
  );
}

export default ProjectSelector;
