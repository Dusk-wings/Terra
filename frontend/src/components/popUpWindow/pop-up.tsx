import { IconX } from "@tabler/icons-react";
import React, { useCallback } from "react";

interface Props {
  open: boolean;
  isActionable?: boolean;
  actionFunction?: () => void;
  children?: React.ReactNode;
  actionText?: string;
  popUpHeading: string;
  popUpDescription: string;
  changeOpenState: (open: boolean) => void;
}

function PopUpWindow({
  open,
  isActionable,
  actionFunction,
  children,
  actionText,
  popUpDescription,
  popUpHeading,
  changeOpenState,
}: Props) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  const closeDialog = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
      changeOpenState(false);
    }
  }, [changeOpenState]);

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
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={actionFunction}
            >
              {actionText || "Take Action"}
            </button>
          )}
          <button
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={closeDialog}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default PopUpWindow;
