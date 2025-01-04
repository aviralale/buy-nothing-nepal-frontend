import React from "react";
import Layout from "./Layout";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
