import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import SparklesText from "../ui/sparkles-text";
import { motion, useScroll, useTransform } from "framer-motion";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => (
  <figure
    className={cn(
      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2",
      "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      "transition-colors duration-300"
    )}
  >
    <div className="flex flex-row items-center gap-2">
      <img
        className="rounded-full"
        width="32"
        height="32"
        alt={`${name}'s avatar`}
        src={img}
      />
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium dark:text-white">
          {name}
        </figcaption>
        <p className="text-xs font-medium text-gray-500 dark:text-white/40">
          {username}
        </p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm text-gray-600 dark:text-gray-300">
      {body}
    </blockquote>
  </figure>
);

export default function Reviews() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="relative flex h-[80vh] w-full flex-col items-center pt-16 gap-8 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800"
    >
      <SparklesText
        className="text-5xl text-center font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text"
        text="REVIEWS"
        sparklesCount={2}
      />
      <div className="w-full">
        <Marquee pauseOnHover className="[--duration:20s] mb-8">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background" />
    </motion.div>
  );
}
