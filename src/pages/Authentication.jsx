import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.95,
  },
};

const pageTransition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
};

const Authentication = () => {
  const location = useLocation();
  const shouldRedirect = !["/auth/login", "/auth/register"].includes(
    location.pathname
  );

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className=""
    >
      <div className="flex flex-col items-center justify-center">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {shouldRedirect && (
            <Route
              path="*"
              element={
                <Navigate to="/auth/login" replace state={{ from: location }} />
              }
            />
          )}
        </Routes>
      </div>
    </motion.div>
  );
};

export default Authentication;
