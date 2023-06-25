import { createSlice } from "@reduxjs/toolkit";
import {
  getSenderMasks,
  sendSMSBlast,
  showSMSBlastPrompt,
  getBlastActivityList,
  getBlastDetails,
  downloadBlastFile
} from "./blastActions";

// Initial state
const initialState = {
  senderMasks: {},
  newBlastDetails: {},
  blastPromptType: null,
  activityList: {},
  blastDetails: {},
  downloadURL: "",
  isDownloadLoading: false,
  isLoading: false,
  error: null
};

// Actual Slice
export const blastSlice = createSlice({
  name: "blast",
  initialState,
  reducers: {},
  extraReducers: /* istanbul ignore next */ (builder) => { builder
    // get sender masks lifecycle
    .addCase(getSenderMasks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getSenderMasks.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.senderMasks = payload;
    })
    .addCase(getSenderMasks.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    })
    // send SMS blast lifecycle
    .addCase(sendSMSBlast.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(sendSMSBlast.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.newBlastDetails = payload;
    })
    .addCase(sendSMSBlast.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    })
    // get blast activity list lifecycle
    .addCase(getBlastActivityList.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getBlastActivityList.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.activityList = payload;
    })
    .addCase(getBlastActivityList.rejected, (state, { payload }) => {
      state.activityList = {};
      state.isLoading = false;
      state.error = payload;
    })
    // get blast details lifecycle
    .addCase(getBlastDetails.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getBlastDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.blastDetails = payload;
    })
    .addCase(getBlastDetails.rejected, (state, { payload }) => {
      state.blastDetails = {};
      state.isLoading = false;
      state.error = payload;
    })
    // download blast file lifecycle
    .addCase(downloadBlastFile.pending, (state) => {
      state.isDownloadLoading = true;
      state.error = null;
    })
    .addCase(downloadBlastFile.fulfilled, (state, { payload }) => {
      state.isDownloadLoading = false;
      state.downloadURL = payload;
    })
    .addCase(downloadBlastFile.rejected, (state, { payload }) => {
      state.downloadURL = "";
      state.isDownloadLoading = false;
      state.error = payload;
    })
    // show send sms blast success or failed prompt
    .addCase(showSMSBlastPrompt, (state, { payload }) => {
      state.blastPromptType = payload ? payload.type : null;
    });
  }
});

export const blastState = (state) => state.blast;

export default blastSlice.reducer;