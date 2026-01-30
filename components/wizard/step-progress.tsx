"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

/**
 * Step Progress Indicator
 * Shows current progress through the multi-step wizard
 */

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNumber = i + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <motion.div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                transition-colors duration-300
                ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                      ? "bg-primary/20 text-primary border-2 border-primary"
                      : "bg-muted text-muted-foreground"
                }
              `}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              ) : (
                stepNumber
              )}
            </motion.div>

            {/* Connector line */}
            {stepNumber < totalSteps && (
              <motion.div
                className={`
                  w-6 h-0.5 mx-1
                  ${isCompleted ? "bg-primary" : "bg-muted"}
                `}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.3 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
