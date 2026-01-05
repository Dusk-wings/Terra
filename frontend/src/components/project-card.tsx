import React from "react";
import { Card, CardContent, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { ChevronRight } from "lucide-react";
import { SupabaseProjectData } from "@/store/projectSlice/projectSlice";

function ProjectCard({
  project,
  action,
  isSmall = false,
}: {
  project: SupabaseProjectData;
  action?: () => void;
  isSmall?: boolean;
}) {
  return (
    <Card
      className="cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={action}
    >
      <CardContent
        className={` ${
          !isSmall ? "grid grid-rows-3" : "flex flex-col"
        } gap-4 h-full`}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <CardDescription>Project Name</CardDescription>
            <CardTitle className={`font-serif ${isSmall ? 'text-lg' : 'text-2xl'} font-medium`}>
              {project.projects.project_name}
            </CardTitle>
          </div>
          <ChevronRight />
        </div>
        {!isSmall && (
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Project Description</p>
            <p className="line-clamp-2 text-sm">
              {project.projects.project_description}
            </p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Badge variant="secondary">
              {project.role.slice(0, 1).toUpperCase() + project.role.slice(1)}
            </Badge>
            <Badge
              variant="secondary"
              className={
                project.projects.project_status == "active"
                  ? "text-primary"
                  : ""
              }
            >
              {project.projects.project_status.slice(0, 1).toUpperCase() +
                project.projects.project_status.slice(1)}
            </Badge>
            {isSmall && (
              <Badge>{project.projects.is_public ? "Public" : "Private"}</Badge>
            )}
          </div>
          {!isSmall && (
            <Badge>{project.projects.is_public ? "Public" : "Private"}</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
