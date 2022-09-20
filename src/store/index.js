import { configureStore } from "@reduxjs/toolkit";
import linksReducers from "./reducers/linksReducers";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    links: linksReducers,
  },
});
