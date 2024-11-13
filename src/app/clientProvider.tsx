"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "./component/ThemeProvider";
import store from "./component/redux/store/store";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
