import { combineReducers } from "@reduxjs/toolkit";
import errors from "./reducers/errorReducer";
import home from "./reducers/homeReducer";

const appReducer = combineReducers({
  errors,
  home,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
