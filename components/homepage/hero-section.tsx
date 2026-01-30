"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * Hero Section with Framer Motion animations
 * Entry animations for title, subtitle, and CTA buttons
 */
export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          {/* Main heading */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground tracking-tight text-balance leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            AI Influence Detection System
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl font-serif font-extralight text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            A hybrid approach to estimate how much a student submission is
            influenced by Large Language Models
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <Button asChild size="lg" className="text-base font-serif px-8">
              <Link href="/analyze/student">
                Start Analysis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base font-serif px-8 bg-transparent"
            >
              <a href="#how-it-works">Learn How It Works</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
