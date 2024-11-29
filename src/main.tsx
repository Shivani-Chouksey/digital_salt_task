import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: Infinity,
      staleTime: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
      refetchOnWindowFocus: false, // Prevent automatic refetch on window focus
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <App />
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
