import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Features from "@/components/sections/Features";
import Reviews from "@/components/sections/Reviews";
import WorkingProcess from "@/components/WorkingProcess";

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const Home = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <Hero />
      <Features />
      <WorkingProcess />
      <Reviews />
    </motion.div>
  );
};

export default Home;
