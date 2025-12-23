import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PopUpActionType =
  | "CREATE_PROJECT"
  | "DELETE_PROJECT"
  | "INFO"
  | "WARNING"
  | "ERROR"
  | null;

interface PopUpContentState {
  title: string;
  message: string;
  isVisible: boolean;
  type: PopUpActionType;
  isActionable: boolean;
}

const initialState: PopUpContentState = {
  title: "",
  message: "",
  isVisible: false,
  type: null,
  isActionable: false,
};


const popUpContentSlice = createSlice({
  name: "popUpContent",
  initialState,
  reducers: {
    showPopUp: (
      state,
      action: PayloadAction<{
        title: string;
        message: string;
        type: PopUpActionType;
        isActionable: boolean;
      }>
    ) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.isVisible = true;
      state.isActionable = action.payload.isActionable;
      state.type = action.payload.type;
    },
    hidePopUp: (state) => {
      state.isVisible = false;
      state.type = null;
      state.isActionable = false;
      state.title = "";
      state.message = "";
    },
  },
});

export const { showPopUp, hidePopUp } = popUpContentSlice.actions;

export default popUpContentSlice.reducer;
