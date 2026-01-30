"use client";

import { motion } from "framer-motion";

/**
 * Metrics Section with scroll-triggered animations
 * Explains the three key scoring metrics
 */

const metrics = [
  {
    label: "Similarity Score (S%)",
    description:
      "Measures textual similarity between student submission and AI responses",
    color: "text-primary",
  },
  {
    label: "Classifier Probability (C%)",
    description:
      "Machine learning classifier confidence that content is AI-generated",
    color: "text-chart-2",
  },
  {
    label: "Final Influence Score (F%)",
    description:
      "Combined weighted score providing overall AI influence assessment",
    color: "text-chart-3",
  },
];

// Animation variants
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function MetricsSection() {
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
            Understanding the Scores
          </h2>
          <p className="text-muted-foreground font-serif text-lg text-pretty">
            Our system provides three key metrics to help you understand the
            level of AI influence.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={cardVariants}
              className="p-6 rounded-xl bg-card border border-border text-center"
            >
              <motion.div
                className={`text-3xl font-bold mb-3 ${metric.color}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                0-100%
              </motion.div>
              <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                {metric.label}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h4 className="text-lg font-serif font-semibold text-foreground mb-3 text-center">
            Score Interpretation
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <div className="font-semibold text-success mb-1">0-30%</div>
              <div className="text-muted-foreground">Low AI Influence</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <div className="font-semibold text-warning mb-1">31-70%</div>
              <div className="text-muted-foreground">Moderate Influence</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <div className="font-semibold text-destructive mb-1">71-100%</div>
              <div className="text-muted-foreground">High AI Influence</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
