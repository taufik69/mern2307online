import { configureStore } from "@reduxjs/toolkit";
import { exclusiveApi } from "./api/exclusive.api";
export const store = configureStore({
  reducer: {
    [exclusiveApi.reducerPath]: exclusiveApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exclusiveApi.middleware),
});
