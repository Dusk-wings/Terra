"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import PopUpWindow from "../popUpWindow/pop-up";

function PopUpStateManager() {
  const dispatch = useDispatch<AppDispatch>();
  const popUpContent = useSelector((state: RootState) => state.popUpContent);


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
        ></PopUpWindow>
      )}
    </>
  );
}

export default PopUpStateManager;
