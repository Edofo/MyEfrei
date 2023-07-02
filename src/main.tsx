import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "react-query";

import "./index.scss";

import { PopupProvider } from "@/contexts/PopupContext";
import { MessageProvider } from "@/contexts/MessageContext";

import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 2,
            retryDelay(failureCount, error: any) {
                if (error?.status === 404) {
                    return 0;
                }
                return Math.min(1000 * 2 ** failureCount, 30000); // 30 seconds
            },
            // refetchInterval: 10 * 60 * 1000, // 10 minutes
            staleTime: 10 * 60 * 1000, // 10 minutes
        },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <PopupProvider>
                    <MessageProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </MessageProvider>
                </PopupProvider>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
