"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import LoadingCard from "./loading-card";
import ProjectCard from "./project-card";
import { showPopUp } from "@/store/popUpContentSlice/popUpContentSlice";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

function ProjectSection() {
  const projects = useSelector((state: RootState) => state.project);

  const dispatch = useDispatch<AppDispatch>();

  const navigator = useRouter();

  React.useEffect(() => {
    if (projects.projectsError) {
      dispatch(
        showPopUp({
          title: "Unable to load the projects",
          message: `${projects.projectErrorText}, Please press the retry button if the error persist reload the page or try again latter`,
          type: "PROJECT_LOAD_ERROR",
          isActionable: true,
        })
      );
    }
  });

  return (
    <div className="px-4 lg:px-6 flex flex-col gap-4">
      {projects.projectsLoading ? (
        <>
          <div className="w-2/5 bg-secondary/80 animate-pulse h-8 rounded-md mt-4"></div>
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        </>
      ) : projects.projectsError ? (
        <>
          <h1 className="font-serif font-medium text-3xl mt-4">
            There was an error while loading your projects,
          </h1>
          <p className="text-sm mt-2">
            {projects.projectErrorText}, Please reload the page or try again
            after a while
          </p>
        </>
      ) : (
        <>
          <div
            className="flex gap-2 bg-card items-center w-2/3 md:w-2/5 mt-4 p-2 md:py-1 rounded-md cursor-text"
            onClick={() =>
              dispatch(
                showPopUp({
                  title: "Search For Project",
                  message: "Enter the name of the project to search for",
                  type: "SEARCH_PROJECT",
                  isActionable: false,
                })
              )
            }
          >
            <Search size={16} />
            <p className="md:text-sm">Search for project</p>
          </div>

          <h1 className="font-serif font-medium text-xl md:text-3xl ">
            The Projects that you are part of,
          </h1>

          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-3 mb-4">
            {projects.completeProject.map((project) => (
              <ProjectCard
                project={project}
                key={project.project_id}
                action={() =>
                  navigator.push(`/dashboard/project/${project.project_id}`)
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectSection;
