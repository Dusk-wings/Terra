"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import PopUpWindow from "../popUpWindow/pop-up";
import ProjectCreationForm from "../project-creation-from";
import { useRouter } from "next/navigation";
import { hidePopUp } from "@/store/popUpContentSlice/popUpContentSlice";
import { fetchCompleteProjectDetails } from "@/store/projectSlice/projectSlice";
import SearchForm from "../search-form";

function PopUpStateManager() {
  const popUpContent = useSelector((state: RootState) => state.popUpContent);
  const [actionText, setActionText] = React.useState<string>("");
  const [isPreformingAction, setIsPreformingAction] =
    React.useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const projectLoading = useSelector(
    (state: RootState) => state.project.projectsLoading
  );
  const [retrying, setRetrying] = useState(false);

  React.useEffect(() => {
    if (retrying) {
      if (!projectLoading) {
        setIsPreformingAction(false);
        setRetrying(false);
        dispatch(hidePopUp());
      }
    }
  }, [retrying, projectLoading, dispatch]);

  React.useEffect(() => {
    switch (popUpContent.type) {
      case "CREATE_PROJECT":
        setActionText("Create");
        break;
      case "DELETE_PROJECT":
        setActionText("Delete");
        break;
      case "REDIRECT_PROJECT":
        setActionText("Proceed");
        break;
      case "PROJECT_LOAD_ERROR":
        setActionText("Retry");
        break;
      default:
        setActionText("Take Action");
        break;
    }
  }, [popUpContent.type]);

  const navigation = useRouter();

  const actionFunction = () => {
    if (popUpContent.type === "REDIRECT_PROJECT") {
      if (popUpContent.redirect_path) {
        setIsPreformingAction(true);
        navigation.push(popUpContent.redirect_path);
        setIsPreformingAction(false);
        dispatch(hidePopUp());
      }
    } else if (popUpContent.type == "PROJECT_LOAD_ERROR") {
      setIsPreformingAction(true);
      dispatch(fetchCompleteProjectDetails());
      setRetrying(true);
    }
  };

  return (
    <>
      {popUpContent.isVisible && (
        <PopUpWindow
          open={popUpContent.isVisible}
          popUpDescription={popUpContent.message}
          popUpHeading={popUpContent.title}
          isActionable={popUpContent.isActionable}
          actionFunction={actionFunction}
          actionText={actionText}
          actionPreforming={isPreformingAction}
        >
          {popUpContent.type === "CREATE_PROJECT" ? (
            <ProjectCreationForm
              setIsPreformingAction={setIsPreformingAction}
            />
          ) : popUpContent.type == "SEARCH_PROJECT" ? (
            <SearchForm
              placeholder="Search for projects"
              searchContainerText="Searched projects will be shown here"
            />
          ) : null}
        </PopUpWindow>
      )}
    </>
  );
}

export default PopUpStateManager;
