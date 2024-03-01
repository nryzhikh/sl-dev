import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/auth.context";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/login/LoginPage";
import { RefetchProvider } from '@/context/refetch.context';




ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RefetchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route element={<ProtectedRoute />} >
            <Route path="/" element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </RefetchProvider>
    </AuthProvider>
  </React.StrictMode>
);
