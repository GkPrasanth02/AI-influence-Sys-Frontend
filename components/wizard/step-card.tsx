"use client";

import React from "react"

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";

/**
 * Step Card Component
 * Reusable card for text input steps in the wizard
 */

interface StepCardProps {
  label: string;
  placeholder: string;
  helperText: string;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  isLastStep?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function StepCard({
  label,
  placeholder,
  helperText,
  value,
  onChange,
  onNext,
  isLastStep = false,
  isLoading = false,
  icon,
}: StepCardProps) {
  const isDisabled = !value.trim() || isLoading;

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-xl">
      <CardContent className="p-6 md:p-8">
        {/* Label with Icon */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {icon && (
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
          )}
          <Label className="text-lg font-semibold text-foreground">
            {label}
          </Label>
        </motion.div>

        {/* Helper Text */}
        <motion.p
          className="text-sm text-muted-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {helperText}
        </motion.p>

        {/* Textarea */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Textarea
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[200px] resize-none bg-input border-border/50 focus:border-primary/50 transition-colors text-foreground placeholder:text-muted-foreground/50"
          />
        </motion.div>

        {/* Character Count */}
        <motion.div
          className="flex justify-between items-center mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <span className="text-xs text-muted-foreground">
            {value.length} characters
          </span>
        </motion.div>

        {/* Next/Analyze Button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <Button
            onClick={onNext}
            disabled={isDisabled}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : isLastStep ? (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Analyze AI Influence
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
