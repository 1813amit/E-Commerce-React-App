import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const user = localStorage.getItem("currentUser");

const initialState = {
  isAuthenticated: !!token,
  token: token || null,
  user: user ? JSON.parse(user) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("currentUser", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
