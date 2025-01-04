import React from "react";
import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        {children}
      </div>
    </>
  );
};

export default Layout;
