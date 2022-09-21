import { createSlice } from "@reduxjs/toolkit";

const linksSlice = createSlice({
  name: "links",
  initialState: [],
  reducers: {
    addLinks(_, action) {
      return action.payload;
    },

    addLink(state, action) {
      state.unshift(action.payload);
    },
  },
});

export const { addLinks, addLink } = linksSlice.actions;
export default linksSlice.reducer;
