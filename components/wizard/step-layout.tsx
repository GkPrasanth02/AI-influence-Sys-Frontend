"use client";

import React from "react"

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepProgress } from "./step-progress";

/**
 * Step Layout Component
 * Wraps each step page with consistent header, animations, and progress indicator
 */

interface StepLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
}

// Animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function StepLayout({
  children,
  currentStep,
  totalSteps,
  title,
  subtitle,
}: StepLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
              <div className="hidden sm:flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Scan className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">
                  AI Detector
                </span>
              </div>
            </div>

            <StepProgress currentStep={currentStep} totalSteps={totalSteps} />

            <div className="w-24" />
          </div>
        </div>
      </header>

      {/* Main Content with Animation */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          className="w-full max-w-2xl"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Step Title */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground text-sm md:text-base text-pretty">
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Step Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
