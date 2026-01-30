"use client";

import { motion } from "framer-motion";
import { FileText, Bot, Cpu, BarChart3 } from "lucide-react";

/**
 * How It Works Section with scroll-triggered animations
 * Each step card animates in when it enters the viewport
 */

const steps = [
  {
    number: "01",
    title: "Student submits their answer",
    description:
      "The student's written response is entered into the system for analysis.",
    icon: FileText,
  },
  {
    number: "02",
    title: "System compares with LLM responses",
    description:
      "The submission is compared against responses from ChatGPT, Gemini, and Claude.",
    icon: Bot,
  },
  {
    number: "03",
    title: "Semantic similarity is computed",
    description:
      "Advanced NLP algorithms calculate the semantic overlap between texts.",
    icon: Cpu,
  },
  {
    number: "04",
    title: "AI influence score is generated",
    description:
      "A comprehensive score indicating the level of AI assistance is produced.",
    icon: BarChart3,
  },
];

// Animation variants for container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Animation variants for each card
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-muted-foreground font-serif text-lg text-pretty">
            A simple four-step process to analyze AI influence in student
            submissions.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={cardVariants}
                  className="relative flex gap-4 p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors group"
                >
                  {/* Step number and icon */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-bold text-primary/30">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Animated connector line */}
                  {index < steps.length - 1 && index % 2 === 0 && (
                    <motion.div
                      className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-border"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
