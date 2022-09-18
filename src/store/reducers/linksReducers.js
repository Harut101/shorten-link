import { createSlice } from "@reduxjs/toolkit";

const linksSlice = createSlice({
  name: "links",
  initialState: [],
  reducers: {
    addLink(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addLink } = linksSlice.actions;
export default linksSlice.reducer;
