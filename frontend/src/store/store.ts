import { configureStore } from "@reduxjs/toolkit";
import PopUpWindowReducer from "./popUpContentSlice/popUpContentSlice";

export const store = configureStore({
  reducer: {
    popUpContent: PopUpWindowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;