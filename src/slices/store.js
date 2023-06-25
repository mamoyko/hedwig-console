import { combineReducers, configureStore } from "@reduxjs/toolkit";
import configReducer from "./config";
// Reducers
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import blastReducer from "./blast/blastSlice";
import auditTrailReducer from "./auditTrail/auditTrailSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  blast: blastReducer,
  config: configReducer,
  user: userReducer,
  auditTrail: auditTrailReducer
});

export const store = preloadedState => configureStore({
  reducer: rootReducer,
  preloadedState
});
