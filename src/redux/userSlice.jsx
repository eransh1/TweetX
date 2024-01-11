import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('is_logged_in',true)
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem('is_logged_in')
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, setUserData } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectUserDoc = (state) => state.user.userData;

export default userSlice.reducer;
