import { createSlice } from "@reduxjs/toolkit";
import { getAuditTrailList } from "./auditTrailActions";

// Initial state
const initialState = {
  auditTrailList: {},
  isLoading: false,
  error: null
};

// Actual Slice
export const auditTrailSlice = createSlice({
  name: "auditTrail",
  initialState,
  reducers: {},
  extraReducers: /* istanbul ignore next */ (builder) => { builder
    // get blast activity list lifecycle
    .addCase(getAuditTrailList.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getAuditTrailList.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.auditTrailList = payload;
    })
    .addCase(getAuditTrailList.rejected, (state, { payload }) => {
      state.auditTrailList = {};
      state.isLoading = false;
      state.error = payload;
    });
  }
});

export const auditTrailState = (state) => state.auditTrail;

export default auditTrailSlice.reducer;