import { configureStore } from "@reduxjs/toolkit";
import linksReducers from "./reducers/linksReducers";
import authReducer from "./reducers/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    links: linksReducers,
  },
});
