"use client";
import { IconX } from "@tabler/icons-react";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { hidePopUp } from "../../store/popUpContentSlice/popUpContentSlice";
import { Button } from "../ui/button";

interface Props {
  open: boolean;
  isActionable?: boolean;
  actionFunction?: () => void;
  children?: React.ReactNode;
  actionText?: string;
  popUpHeading: string;
  popUpDescription: string;
  // changeOpenState: (open: boolean) => void;
}

function PopUpWindow({
  open,
  isActionable,
  actionFunction,
  children,
  actionText,
  popUpDescription,
  popUpHeading,
}: // changeOpenState,
Props) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const closeDialog = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
      dispatch(hidePopUp());
    }
  }, [dispatch]);

  const handelClickOutside = (
    event: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      closeDialog();
    }
  };

  React.useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    } else {
      closeDialog();
    }
  }, [open, closeDialog]);

  return (
    <dialog ref={dialogRef} onClick={(e) => handelClickOutside(e)}>
      <div id="main-section" className="p-4">
        <div id="heading-section">
          <h2 className="text-lg font-medium mb-4">
            {popUpHeading || "Pop-Up Window"}
          </h2>
          <p>{popUpDescription || "This is a pop-up window content."}</p>
          <button
            className="mt-4 px-4 py-2  text-white rounded"
            onClick={closeDialog}
          >
            <IconX />
          </button>
        </div>
        <div id="content">{children}</div>
        <div id="button-section" className="mt-4">
          {isActionable && actionFunction && (
            <Button
              variant="default"
              className="px-4 py-2"
              onClick={actionFunction}
            >
              {actionText || "Take Action"}
            </Button>
          )}
          <Button
            variant="destructive"
            className="px-4 py-2"
            onClick={closeDialog}
          >
            Close
          </Button>
        </div>
      </div>
    </dialog>
  );
}

export default PopUpWindow;
