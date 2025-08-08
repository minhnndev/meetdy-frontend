// import { Toaster } from "@/components/ui/toaster";
// import { persistOptions, PersistQueryClientProvider, queryClient } from "@/queries/core";
// import store from "@/redux/store";
// import AppRoutes from "@/routes";
// import "@/styles/index.css";
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { Provider as ReduxProvider } from "react-redux";

// createRoot(document.getElementById("root")!).render(
//     <StrictMode>
//         <ReduxProvider store={store}>
//             <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
//                 <AppRoutes />
//                 <Toaster />
//             </PersistQueryClientProvider>
//         </ReduxProvider>
//     </StrictMode>
// );

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@/styles/App.css";

import { fetchUserProfile } from "@/store/globalSlice";
import AdminProtectedRoute from "@/components/legacy/AdminProtectedRoute";
import JoinFromLink from "@/components/legacy/JoinFromLink";
import NotFoundPage from "@/components/legacy/NotFoundPage";
import ProtectedRoute from "@/components/legacy/ProtectedRoute";

import Account from "@/features/Account";
import Admin from "@/features/Admin";
import Home from "@/features/Home";
import { fetchInfoWebs } from "@/features/Home/homeSlice";

import ChatLayout from "@/layout/ChatLayout";

function App() {
    const dispatch = useDispatch();
    const [isFetch, setIsFetch] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (token) await dispatch(fetchUserProfile());

            setIsFetch(true);
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        dispatch(fetchInfoWebs());
    }, []);

    if (!isFetch) return "";

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/jf-link/:conversationId" element={<JoinFromLink />} />

                    <ProtectedRoute path="/chat" element={<ChatLayout />} />

                    <AdminProtectedRoute path="/admin" element={<Admin />} />

                    <Route path="/account" element={<Account />} />

                    <Route element={<NotFoundPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
