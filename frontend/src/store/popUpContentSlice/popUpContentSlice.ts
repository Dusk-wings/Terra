import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PopUpActionType =
  | "CREATE_PROJECT"
  | "DELETE_PROJECT"
  | "INFO"
  | "WARNING"
  | "ERROR"
  | "REDIRECT_PROJECT"
  | "PROJECT_LOAD_ERROR"
  | "SEARCH_PROJECT"
  | null;

interface PopUpContentState {
  title: string;
  message: string;
  isVisible: boolean;
  type: PopUpActionType;
  isActionable: boolean;
  redirect_path?: string | null;
}

const initialState: PopUpContentState = {
  title: "",
  message: "",
  isVisible: false,
  type: null,
  isActionable: false,
  redirect_path: null,
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
        redirect_path?: string | null;
      }>
    ) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.isVisible = true;
      state.isActionable = action.payload.isActionable;
      state.type = action.payload.type;
      state.redirect_path = action.payload.redirect_path
        ? action.payload.redirect_path
        : null;
    },
    hidePopUp: (state) => {
      state.isVisible = false;
      state.type = null;
      state.isActionable = false;
      state.title = "";
      state.message = "";
      state.redirect_path = null;
    },
  },
});

export const { showPopUp, hidePopUp } = popUpContentSlice.actions;

export default popUpContentSlice.reducer;
