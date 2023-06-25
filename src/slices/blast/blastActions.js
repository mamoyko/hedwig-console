import axios from "axios";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const getSenderMasks = createAsyncThunk(
  "sendermasks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/sendermasks");
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

export const sendSMSBlast = createAsyncThunk(
  "blasts",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/blasts", values, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
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

export const getBlastActivityList = createAsyncThunk(
  "blastActivityList",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/blasts/list", { params: params });
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

export const getBlastDetails = createAsyncThunk(
  "blastDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/blasts/details/${id}`);
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

export const downloadBlastFile = createAsyncThunk(
  "downloadBlastFile",
  async ({ blastId, params }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/blasts/${blastId}/download`, { params: params });
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

export const showSMSBlastPrompt = createAction("SHOW_BLAST_PROMPT");