import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.isLoggedIn = true;
    },
    removeToken: (state) => {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
