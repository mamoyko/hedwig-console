import axios from "axios";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const getUserInfo = createAsyncThunk(
  "user/me",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/user/me");
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const resetUserState = createAction("RESET_USER_STATE");