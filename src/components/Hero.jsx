import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import HeroBg from "../assets/images/hero-bg.png";

const BoxReveal = ({ children, boxColor, duration }) => {
  return (
    <div className="relative">
      <div className="relative z-10">{children}</div>
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [1, 0] }}
        transition={{
          duration,
          times: [0, 1],
          ease: "easeInOut",
        }}
        style={{ backgroundColor: boxColor, originX: 0 }}
      />
    </div>
  );
};

export const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const theme = localStorage.getItem("vite-ui-theme");

  const boxColor =
    theme === "dark"
      ? "#26D968"
      : theme === "light"
      ? "#679E68"
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "#26D968"
      : "#679E68";
  return (
    <motion.div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${HeroBg})`,
          y,
        }}
      />
      <div className="relative w-full h-full flex flex-col justify-center items-center bg-gradient-to-b from-primary/0 via-primary/25 to-primary/65 py-40">
        <BoxReveal boxColor={"#ffffff"} duration={0.5}>
          <h1 className="text-7xl bg-primary font-bold text-white drop-shadow-2xl uppercase">
            Welcome to
          </h1>
        </BoxReveal>
        <BoxReveal boxColor={boxColor} duration={1}>
          <h1 className="text-9xl font-bold uppercase underline text-primary">
            Buy Nothing
          </h1>
        </BoxReveal>
        <BoxReveal boxColor={boxColor} duration={1.5}>
          <h1 className="text-9xl font-bold uppercase underline text-primary">
            Nepal
          </h1>
        </BoxReveal>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-xl text-center text-white drop-shadow-xl font-semibold"
        >
          A platform to give and get things for free,{" "}
          <span className="underline font-semibold">without money</span>, in
          Nepal📍
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
        >
          <Button className="mt-8 bg-primary" variant="secondary">
            Get Started
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
