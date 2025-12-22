import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

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
}

const initialState: PopUpContentState = {
  title: "",
  message: "",
  isVisible: false,
  type: null,
};

const createProject = createAsyncThunk(
  "popUpContent/createProject",
  async (projectData: { name: string; description: string }) => {}
);

const deleteProject = createAsyncThunk(
  "popUpContent/deleteProject",
  async (projectData: { name: string; description: string }) => {}
);

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
      }>
    ) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.isVisible = true;
      state.type = action.payload.type;
    },
    hidePopUp: (state) => {
      state.isVisible = false;
      state.type = null;
    },
  },
});

export const { showPopUp, hidePopUp } = popUpContentSlice.actions;

export default popUpContentSlice.reducer;
