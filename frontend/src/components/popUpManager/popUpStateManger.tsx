"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import PopUpWindow from "../popUpWindow/pop-up";
import ProjectCreationForm from "../project-creation-from";
import { useRouter } from "next/navigation";
import { hidePopUp } from "@/store/popUpContentSlice/popUpContentSlice";

function PopUpStateManager() {
  const popUpContent = useSelector((state: RootState) => state.popUpContent);
  const [actionText, setActionText] = React.useState<string>("");
  const [isPreformingAction, setIsPreformingAction] =
    React.useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

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
          ) : null}
        </PopUpWindow>
      )}
    </>
  );
}

export default PopUpStateManager;
