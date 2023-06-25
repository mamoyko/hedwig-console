import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./authActions";

// Initial state
const initialState = {
  isLoggedIn: false,
  token: null,
  isLoading: false,
  error: null
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: /* istanbul ignore next */ (builder) => { builder
    // user login lifecycle
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.token = payload.token;
    })
    .addCase(loginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    })
    // user logout lifecycle
    .addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    })
    .addCase(logoutUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  }
});

export const authState = (state) => state.auth;

export default authSlice.reducer;