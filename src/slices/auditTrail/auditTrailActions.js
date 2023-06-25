import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAuditTrailList = createAsyncThunk(
  "getAuditTrailList",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/blasts/audit-trail", { params: params });
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