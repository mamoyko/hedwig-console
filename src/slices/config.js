import { createSlice } from "@reduxjs/toolkit";

export const configData = {
  "development": {
    "SERVER_URL": "http://localhost:3001/api",
    "HEDWIG_TOKEN": "HEDWIG_CONSOLE_TOKEN"
  },
  "test": {
    "SERVER_URL": "https://hedwig-console-test.voyagerapis.com/api",
    "HEDWIG_TOKEN": "HEDWIG_CONSOLE_TOKEN"
  },
  "staging": {
    "SERVER_URL": "http://localhost:3003/",
    "HEDWIG_TOKEN": "HEDWIG_CONSOLE_TOKEN"
  },
  "production": {
    "SERVER_URL": "http://localhost:3004/",
    "HEDWIG_TOKEN": "HEDWIG_CONSOLE_TOKEN"
  }
};

export const configSlice = createSlice({
  name: "config",
  initialState: configData[process.env.REACT_APP_NODE_ENV],
  reducers: {},
});

export const configState = (state) => state.config;

export default configSlice.reducer;