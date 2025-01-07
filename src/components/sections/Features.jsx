import React from "react";
import Section from "./Section";
import { ChevronRight, Repeat, Gift, SearchCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { MagicCard } from "../ui/magic-card";
import SparklesText from "../ui/sparkles-text";
import { motion, useScroll, useTransform } from "framer-motion";

const FeaturesCard = ({
  title,
  description,
  buttonText1,
  buttonText2,
  link1,
  link2,
  Icon,
}) => {
  const theme = localStorage.getItem("vite-ui-theme");
  const gradientColorCard =
    theme === "dark"
      ? "#262626"
      : theme === "light"
      ? "#D9D9D955"
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "#262626"
      : "#D9D9D955";
  return (
    <MagicCard
      className="flex flex-col  h-full p-8 rounded-lg hover:scale-105 transition-transform duration-200"
      gradientColor={gradientColorCard}
    >
      <div className="flex flex-col justify-center w-full items-center gap-4">
        <h1 className="text-2xl uppercase font-bold text-center">{title}</h1>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2"
        >
          <Icon className="w-10 h-10 text-primary" />
        </motion.div>
        <p className="text-sm text-center">{description}</p>
        <div className="flex justify-between w-full">
          <Link
            className="mt-4 flex items-center justify-center gap-2 bg-primary text-background p-2 rounded-md hover:bg-opacity-80 transition duration-150"
            to={link1}
          >
            <span className="">{buttonText1}</span>
            <ChevronRight className="transition duration-150 w-4 h-4 " />
          </Link>
          <Link
            className="mt-4 flex items-center justify-center gap-2 p-2 rounded-md transition duration-150 border border-[#1c2338]"
            to={link2}
          >
            <span className="">{buttonText2}</span>
            <ChevronRight className="transition duration-150 w-4 h-4 " />
          </Link>
        </div>
      </div>
    </MagicCard>
  );
};

export const Features = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <Section>
      <motion.div style={{ scale }} className="w-full flex flex-col gap-8">
        <SparklesText
          className="text-5xl text-center font-bold"
          text="FEATURES"
          sparklesCount={2}
        />
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col md:flex-row justify-between mx-4 md:mx-20 gap-8 md:gap-20">
            <FeaturesCard
              Icon={Repeat}
              title="Exchange"
              description="Trade your unused items with others in a mutually beneficial way. Create connections and find value in swapping items instead of purchasing new ones."
              buttonText1="Create Exchange"
              buttonText2="View Exchanges"
              link1="/create-exchanges"
              link2="/exchanges"
            />
            <FeaturesCard
              Icon={Gift}
              title="Giveaway"
              description="Easily give away items you no longer need to others in your community. Help reduce waste and spread joy by passing along items that could still be useful."
              buttonText1="Create Giveaway"
              buttonText2="View Giveaways"
              link1="/create-giveaway"
              link2="/giveaways"
            />
            <FeaturesCard
              Icon={SearchCheck}
              title="Request"
              description="Reach out to your community to request items you need. Whether it's a book, tool, or household item, ask and connect with those willing to share."
              buttonText1="Create Request"
              buttonText2="View Requests"
              link1="/create-request"
              link2="/requests"
            />
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Features;
