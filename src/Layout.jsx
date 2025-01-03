import React from "react";
import { NavMenu } from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <NavMenu />
      <div className="dark bg-background flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold text-white">BuyNothingNepal</h1>
        {children}
      </div>
    </>
  );
};

export default Layout;
