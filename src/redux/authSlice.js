import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  adminData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.adminData = action.payload.adminData;
    },
    logout: (state) => {
      state.status = false;
      state.adminData = null;
    },
    setAuthStatus: (state, action) => {
      state.status = action.payload.status;
      state.userData = action.payload.userData || null;
    },
  },
});

export const { login, logout, setAuthStatus } = authSlice.actions;

export default authSlice.reducer;
