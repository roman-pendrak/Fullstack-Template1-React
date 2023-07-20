import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { RootState } from "../store";

export interface ErrorsState {
  currentErrorMessage: string | null;
}

const initialState: ErrorsState = {
  currentErrorMessage: null,
};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
/* eslint-disable no-param-reassign */
const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setCurrentErrorMessage(state, action: PayloadAction<string>) {
      enqueueSnackbar(action.payload, {
        variant: "error",
        style: { marginBottom: "20px" },
      });
      state.currentErrorMessage = action.payload;
    },
  },
});

export const { setCurrentErrorMessage } = errorsSlice.actions;

export const ErrorsSelectors = {
  selectErrorsState: (state: RootState) => state.errors,
};

export default errorsSlice.reducer;
