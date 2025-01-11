import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center pt-24">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
