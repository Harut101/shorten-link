import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: false,
  reducers: {
    authorize(state) {
      state = true;
    },

    unauthorize(state) {
      state = false;
    },
  },
});

export const { authorize, unauthorize } = authSlice.actions;
export default authSlice.reducer;
