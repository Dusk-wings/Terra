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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { showPopUp } from "@/store/popUpContentSlice/popUpContentSlice";

interface Props {
  initialValue?: string;
  initialProjectId?: string;
  projects?: { id: string; name: string }[];
}

function ProjectSelector({ initialValue, projects, initialProjectId }: Props) {
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


  return (
    <div>
      {projects && projects.length > 0 ? (
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
                    key={item.id}
                    value={item.id}
                    defaultChecked={initialProjectId == item.id}
                  >
                    {item.name}
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
          className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
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
