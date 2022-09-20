import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
  },
  reducers: {
    authorize(_, action) {
      return {
        ...action.payload,
        loggedIn: true,
      };
    },

    unauthorize() {
      return {
        loggedIn: false,
      };
    },
  },
});

export const { authorize, unauthorize } = userSlice.actions;
export default userSlice.reducer;
