import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userInfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUserDetails: (state, action) => {
      state.userInfo = action.payload;
    },
    logoutDetails: (state) => {
      return INITIAL_STATE;
    },
  },
});

export const { setUserDetails, logoutDetails } = userSlice.actions;
export default userSlice.reducer;
