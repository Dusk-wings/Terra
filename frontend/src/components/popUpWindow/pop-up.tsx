"use client";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { hidePopUp } from "../../store/popUpContentSlice/popUpContentSlice";
import { Button } from "../ui/button";
import Spinner from "../spinner/Spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

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
  // const dialogRef = React.useRef<HTMLDialogElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const closeDialog = useCallback(() => {
    if (!actionPreforming) {
      // dialogRef.current.close();
      dispatch(hidePopUp());
    }
  }, [dispatch, actionPreforming]);


  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader id="heading-section" className="text-left">
          <DialogTitle
          // className="font-serif font-stretch-100% font-semibold text-lg"
          >
            {popUpHeading || "Pop-Up Window"}
          </DialogTitle>

          <DialogDescription
          // className="text-sm font-medium"
          >
            {popUpDescription || "This is a pop-up window content."}
          </DialogDescription>
        </DialogHeader>
        <div id="content">{children}</div>
        <DialogFooter
          id="button-section"
          className="mt-4 flex justify-end gap-2 flex-row"

        >
          {isActionable && actionFunction && (
            <Button
              variant="default"
              className="px-4 py-2 cursor-pointer text-foreground bg-accent/90 hover:bg-accent/70 w-1/2 border border-foreground/40 shadow"
              onClick={actionFunction}
              disabled={actionPreforming}
              type="submit"
              form="form"
            >
              {actionPreforming && <Spinner />}
              {actionText || "Take Action"}
            </Button>
          )}
          <DialogClose asChild>
            <Button
              variant="default"
              className="px-4 py-2 cursor-pointer bg-destructive/90 text-foreground hover:bg-destructive/70 border border-foreground/40 w-1/2 shadow"
              disabled={actionPreforming}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PopUpWindow;
