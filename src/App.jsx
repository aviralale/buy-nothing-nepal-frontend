import React from "react";
import Layout from "./Layout";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";

const App = () => {
  const location = useLocation();

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/auth/*" element={<Authentication />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
