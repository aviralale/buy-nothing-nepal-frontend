import React from "react";
import { motion } from "framer-motion";
import { Gift, Users, MessageCircle, Handshake } from "lucide-react";
import Section from "./sections/Section";
import SparklesText from "./ui/sparkles-text";

const ProcessCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg max-w-xs mx-auto"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="p-4 rounded-full bg-primary mb-4"
      >
        <Icon size={32} className="text-white" />
      </motion.div>
      <h3 className="text-xl font-bold  mb-2">{title}</h3>
      <p className=" text-center">{description}</p>
    </motion.div>
  );
};

const WorkingProcess = () => {
  const processes = [
    {
      icon: Gift,
      title: "List Your Items",
      description: "Post items you want to give away for free to the community",
      delay: 0.2,
    },
    {
      icon: Users,
      title: "Connect",
      description: "Find people in your area interested in your items",
      delay: 0.4,
    },
    {
      icon: MessageCircle,
      title: "Communicate",
      description: "Chat with interested members and arrange pickup",
      delay: 0.6,
    },
    {
      icon: Handshake,
      title: "Exchange",
      description: "Meet up and give your items a new home",
      delay: 0.8,
    },
  ];

  return (
    <Section>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full py-20 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <SparklesText
            className="text-6xl text-center font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text"
            text="HOW IT WORKS?"
            sparklesCount={3}
          />
          <p className="text-white/80 max-w-2xl mx-auto">
            Join our community and start giving or receiving items for free in
            four simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {processes.map((process, index) => (
            <ProcessCard key={index} {...process} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default WorkingProcess;
