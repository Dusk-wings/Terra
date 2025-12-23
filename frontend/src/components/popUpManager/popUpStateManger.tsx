"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import PopUpWindow from "../popUpWindow/pop-up";

function PopUpStateManager() {
  const dispatch = useDispatch<AppDispatch>();
  const popUpContent = useSelector((state: RootState) => state.popUpContent);
  const [actionText, setActionText] = React.useState<string>("");
  const [isPreformingAction, setIsPreformingAction] = React.useState<boolean>(false);

  React.useEffect(() => {
    switch (popUpContent.type) {
      case "CREATE_PROJECT":
        setActionText("Create");
        break;
      case "DELETE_PROJECT":
        setActionText("Delete");
        break;
      default:
        setActionText("Take Action");
        break;
    }
  }, [popUpContent.type]);

  const actionFunction = () => {};

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
        ></PopUpWindow>
      )}
    </>
  );
}

export default PopUpStateManager;
