import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import { rtkQueryErrorLogger } from "@/redux/api/errorMiddleware";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
