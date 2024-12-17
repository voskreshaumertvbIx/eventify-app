import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../userApi/userApi";
import { mapApi } from "../userApi/mapApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [mapApi.reducerPath]:mapApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware).concat(mapApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
