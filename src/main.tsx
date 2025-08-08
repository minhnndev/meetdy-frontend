import { Toaster } from "@/components/ui/toaster";
import { persistOptions, PersistQueryClientProvider, queryClient } from "@/queries/core";
import store from "@/redux/store";
import AppRoutes from "@/routes";
import "@/styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ReduxProvider store={store}>
            <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
                <AppRoutes />
                <Toaster />
            </PersistQueryClientProvider>
        </ReduxProvider>
    </StrictMode>
);
