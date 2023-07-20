import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as ApiService from "../../services/Api";
import { setCurrentErrorMessage } from "../actions";
import type { RootState } from "../store";
import { Link } from "../../types/Link";

export interface HomeState {
  isLoading: boolean;
  links: Link[];
}

const initialState: HomeState = {
  isLoading: true,
  links: [],
};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
/* eslint-disable no-param-reassign */
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getLinksRequest(state) {
      state.isLoading = false;
    },
    getLinksSuccess(state, action: PayloadAction<Link[]>) {
      state.links = action.payload;
      state.isLoading = false;
    },
    getLinksFail(state) {
      state.isLoading = false;
    },
  },
});

export const { getLinksRequest, getLinksSuccess, getLinksFail } =
  homeSlice.actions;

export const HomeSelectors = {
  selectHomeState: (state: RootState) => state.home,
};

export const getLinks = () => async (dispatch) => {
  try {
    dispatch(getLinksRequest());
    const response = await ApiService.getLinks();
    if (response?.status === 200) {
      dispatch(getLinksSuccess(response?.data));
    }
  } catch (error: any) {
    dispatch(getLinksFail());
    dispatch(setCurrentErrorMessage(error?.message));
  }
};

export default homeSlice.reducer;
