import ProjectSection from "@/components/project-section";
import ReduxWrapper from "@/components/reduxWrapper/ReduxWrapper";
import React from "react";

function ProjectPage() {
  return (
    <ReduxWrapper>
      <ProjectSection />
    </ReduxWrapper>
  );
}

export default ProjectPage;
