"use client";
import { IconX } from "@tabler/icons-react";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { hidePopUp } from "../../store/popUpContentSlice/popUpContentSlice";
import { Button } from "../ui/button";
import Spinner from "../spinner/Spinner";

interface Props {
  open: boolean;
  isActionable?: boolean;
  actionFunction?: () => void;
  children?: React.ReactNode;
  actionText?: string;
  popUpHeading: string;
  popUpDescription: string;
  actionPreforming?: boolean;
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
  actionPreforming,
}: // changeOpenState,
Props) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const closeDialog = useCallback(() => {
    if (dialogRef.current && !actionPreforming) {
      dialogRef.current.close();
      dispatch(hidePopUp());
    }
  }, [dispatch, actionPreforming]);

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
    <dialog
      ref={dialogRef}
      onClick={(e) => handelClickOutside(e)}
      className="p-0 bg-transparent"
    >
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center"
        onClick={closeDialog}
      >
        <div
          id="main-section"
          className={`bg-popover text-foreground rounded-lg shadow-lg p-4 w-full max-w-md`}
          onClick={(event) => event.stopPropagation()}
        >
          <div id="heading-section">
            <div
              id="title"
              className="flex items-center justify-between mb-2 select-none"
            >
              <h2 className="font-sans font-semibold">
                {popUpHeading || "Pop-Up Window"}
              </h2>
              <Button
                variant="outline"
                className="rounded-xl cursor-pointer"
                onClick={closeDialog}
                disabled={actionPreforming}
              >
                <IconX />
              </Button>
            </div>
            <p className="text-sm font-medium">
              {popUpDescription || "This is a pop-up window content."}
            </p>
          </div>
          <div id="content">{children}</div>
          <div id="button-section" className="mt-4 flex justify-end gap-2">
            {isActionable && actionFunction && (
              <Button
                variant="default"
                className="px-4 py-2 cursor-pointer text-foreground bg-accent/90 hover:bg-accent/70 w-1/2 border border-foreground/40 shadow"
                onClick={actionFunction}
                disabled={actionPreforming}
              >
                {actionPreforming && <Spinner />}
                {actionText || "Take Action"}
              </Button>
            )}
            <Button
              variant="default"
              className="px-4 py-2 cursor-pointer bg-destructive/90 text-foreground hover:bg-destructive/70 border border-foreground/40 w-1/2 shadow"
              onClick={closeDialog}
              disabled={actionPreforming}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default PopUpWindow;
