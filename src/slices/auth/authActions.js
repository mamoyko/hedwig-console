import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { configData } from "../config";

import jwt_decode from "jwt-decode";

const CONFIG = configData[process.env.REACT_APP_NODE_ENV];

export const loginUser = createAsyncThunk(
  "user/login",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/user/login", values);
      const user = jwt_decode(data.token);
      /* istanbul ignore next */
      sessionStorage.setItem(CONFIG.HEDWIG_TOKEN, data.token);
      /* istanbul ignore next */
      return {
        token: data.token,
        email: user.email,
        role: user.role
      };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/user/logout");

      if (data.message) {
        sessionStorage.removeItem(CONFIG.HEDWIG_TOKEN);
      }
      return {};
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);