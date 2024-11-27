import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import pageReducer from "../features/page/pageSlice";
import scannedCodeReducer from "../features/scannedResult/scannedCodeSlice";
import statusReducer from "../features/status/statusSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    page: pageReducer,
    scannedCode: scannedCodeReducer,
    status: statusReducer,
  },
});

export default store;
