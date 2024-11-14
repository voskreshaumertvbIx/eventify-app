"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "./component/ThemeProvider";
import  { persistor, store } from "./redux/store/store";
import { PersistGate } from "redux-persist/lib/integration/react";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>{children}</ThemeProvider></PersistGate>
    </Provider>
  );
}
