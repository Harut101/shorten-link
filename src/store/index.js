import { configureStore } from "@reduxjs/toolkit";
import linksReducers from "./reducers/linksReducers";

export const store = configureStore({
  reducer: {
    links: linksReducers,
  },
});
