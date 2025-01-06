import React from "react";
import Layout from "./Layout";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import { AuthProvider } from "./lib/context/AuthContext";
import PublicRoute from "./lib/auth/PublicRoute";

const App = () => {
  const location = useLocation();

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<PublicRoute />}>
                <Route path="/auth/*" element={<Authentication />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
