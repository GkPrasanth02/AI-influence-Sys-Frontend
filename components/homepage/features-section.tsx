"use client";

import { motion } from "framer-motion";
import { FileText, Brain, BarChart3, Shield } from "lucide-react";

/**
 * Features Section with scroll-triggered animations
 * Cards fade and slide in when entering viewport
 */

const features = [
  {
    icon: FileText,
    title: "Multi-Source Comparison",
    description:
      "Compare student submissions against responses from multiple AI models including ChatGPT, Gemini, and Claude simultaneously.",
  },
  {
    icon: Brain,
    title: "Advanced NLP Analysis",
    description:
      "Utilize state-of-the-art natural language processing techniques to detect subtle similarities in writing patterns and style.",
  },
  {
    icon: BarChart3,
    title: "Detailed Scoring",
    description:
      "Receive comprehensive influence scores including Similarity Score (S%), Classifier Probability (C%), and Final Influence Score (F%).",
  },
  {
    icon: Shield,
    title: "Academic Integrity",
    description:
      "Support educators in maintaining academic standards while providing fair and transparent assessment tools.",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function FeaturesSection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4 text-balance">
            Comprehensive AI Detection
          </h2>
          <p className="text-muted-foreground font-serif text-lg text-pretty">
            Our system provides multiple layers of analysis to accurately assess
            AI influence in written content.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
            >
              <motion.div
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <feature.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
