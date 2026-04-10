import { configureStore } from "@reduxjs/toolkit";
import reviewSlice from "./slices/reviewSlice";

export const store = configureStore({
  reducer: {
    reviews: reviewSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
