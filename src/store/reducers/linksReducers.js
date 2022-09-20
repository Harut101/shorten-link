import { createSlice } from "@reduxjs/toolkit";

const linksSlice = createSlice({
  name: "links",
  initialState: [],
  reducers: {
    addLinks(_, action) {
      return action.payload;
    },
  },
});

export const { addLinks } = linksSlice.actions;
export default linksSlice.reducer;
