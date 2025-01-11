import React from "react";
import Section from "./Section";
import { ChevronRight, Repeat, Gift, SearchCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { MagicCard } from "../ui/magic-card";
import SparklesText from "../ui/sparkles-text";
import { motion, useScroll, useTransform } from "framer-motion";
import NumberTicker from "../ui/number-ticker";

const StatDivider = () => (
  <div className="h-16 w-px bg-primary/20 self-center" />
);

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
      className="flex flex-col h-full p-8 rounded-lg hover:scale-105 transition-transform duration-200 backdrop-blur-sm"
      gradientColor={gradientColorCard}
    >
      <div className="flex flex-col justify-center w-full items-center gap-4">
        <h1 className="text-2xl uppercase font-bold text-center text-primary">
          {title}
        </h1>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2 shadow-lg"
        >
          <Icon className="w-10 h-10 text-primary" />
        </motion.div>
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          {description}
        </p>
        <div className="flex justify-between w-full gap-4">
          <Link
            className="mt-4 flex-1 flex items-center justify-center gap-2 bg-primary text-background p-2 rounded-md hover:bg-primary/90 transition duration-150 shadow-md"
            to={link1}
          >
            <span>{buttonText1}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            className="mt-4 flex-1 flex items-center justify-center gap-2 p-2 rounded-md transition duration-150 border border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            to={link2}
          >
            <span>{buttonText2}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </MagicCard>
  );
};

export const Features = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const stats = [
    { label: "GIVEAWAYS", value: 995 },
    { label: "EXCHANGES", value: 996 },
    { label: "REQUESTS", value: 894 },
  ];

  return (
    <Section className="py-20">
      <motion.div style={{ scale }} className="w-full flex flex-col gap-12">
        <SparklesText
          className="text-6xl text-center font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text"
          text="FEATURES"
          sparklesCount={3}
        />
        <div className="flex flex-col items-center justify-center w-full h-full gap-16">
          <div className="flex flex-col md:flex-row justify-between mx-4 md:mx-20 gap-8 md:gap-8">
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
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl text-center uppercase font-semibold">
              Till today,
            </h1>
            <div className="flex items-center gap-8">
              {stats.map(({ label, value }, index) => (
                <React.Fragment key={label}>
                  <div className="text-center">
                    <p className="whitespace-pre-wrap items-center tracking-tighter flex flex-col">
                      <span className="text-6xl font-bold text-primary">
                        <NumberTicker value={value} />
                        <span className="text-primary/80">+</span>
                      </span>
                      <span className="text-lg font-semibold mt-2">
                        {label}
                      </span>
                    </p>
                  </div>
                  {index < 2 && <StatDivider />}
                </React.Fragment>
              ))}
            </div>
            <h1 className="text-5xl text-center uppercase font-semibold">
              are handled.
            </h1>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Features;
