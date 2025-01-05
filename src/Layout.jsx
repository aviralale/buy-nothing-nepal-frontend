import React from "react";
import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center pt-16">
        {children}
      </div>
    </div>
  );
};

export default Layout;
