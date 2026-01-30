"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAnalysis } from "@/context/analysis-context";
import { StepLayout } from "@/components/wizard/step-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle,
  RotateCcw,
  Home,
  TrendingUp,
  Shield,
  Target,
} from "lucide-react";

/**
 * Step 5: Analysis Results
 * Displays the AI influence detection results with animated visualizations
 */
export default function ResultPage() {
  const router = useRouter();
  const { result, error, isLoading, resetAll } = useAnalysis();

  // Redirect to start if no data
  useEffect(() => {
    if (!result && !error && !isLoading) {
      // Small delay to allow context to hydrate
      const timer = setTimeout(() => {
        if (!result && !error) {
          router.push("/analyze/student");
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [result, error, isLoading, router]);

  const handleStartOver = () => {
    resetAll();
    router.push("/analyze/student");
  };

  // Determine score category for styling
  const getScoreCategory = (score: number) => {
    if (score < 30) return { label: "Low AI Influence", color: "text-success" };
    if (score < 60)
      return { label: "Moderate AI Influence", color: "text-warning" };
    return { label: "High AI Influence", color: "text-destructive" };
  };

  const scoreCategory = result ? getScoreCategory(result.similarityScore) : null;

  return (
    <StepLayout
      currentStep={5}
      totalSteps={5}
      title="Analysis Complete"
      subtitle="Review the AI influence detection results below"
    >
      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-destructive/50 bg-destructive/10">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-destructive/20">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Analysis Failed
                </h3>
              </div>
              <p className="text-muted-foreground mb-6">{error}</p>
              <div className="flex gap-3">
                <Button onClick={handleStartOver} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="relative w-20 h-20 mx-auto mb-6">
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="text-muted-foreground">Analyzing text similarity...</p>
        </motion.div>
      )}

      {/* Results */}
      {result && !error && (
        <div className="space-y-6">
          {/* Main Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden">
              <CardContent className="p-6 md:p-8">
                {/* Score Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Similarity Influence Score (S%)
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Semantic overlap with AI responses
                      </p>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-primary/10">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Score Display */}
                <motion.div
                  className="text-center py-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted/30"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        className="text-primary"
                        initial={{ strokeDasharray: "0 440" }}
                        animate={{
                          strokeDasharray: `${(result.similarityScore / 100) * 440} 440`,
                        }}
                        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span
                        className="text-4xl font-bold text-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                      >
                        {result.similarityScore.toFixed(2)}%
                      </motion.span>
                      <motion.span
                        className={`text-sm font-medium ${scoreCategory?.color}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.3 }}
                      >
                        {scoreCategory?.label}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <Progress value={result.similarityScore} className="h-3" />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>0% - Low</span>
                    <span>50% - Moderate</span>
                    <span>100% - High</span>
                  </div>
                </motion.div>

                {/* Explanation */}
                <motion.p
                  className="text-sm text-muted-foreground text-center mt-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  This score represents semantic overlap between the student
                  submission and LLM-generated responses. Higher scores indicate
                  greater similarity to AI-generated content.
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Scores (Future Extension) */}
          {(result.classifierProbability !== undefined ||
            result.finalScore !== undefined) && (
            <motion.div
              className="grid gap-4 md:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {result.classifierProbability !== undefined && (
                <Card className="border-border/50 bg-card/80">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          Classifier Probability (C%)
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          ML classifier confidence
                        </p>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-foreground">
                      {result.classifierProbability.toFixed(2)}%
                    </div>
                    <Progress
                      value={result.classifierProbability}
                      className="h-2 mt-3"
                    />
                  </CardContent>
                </Card>
              )}

              {result.finalScore !== undefined && (
                <Card className="border-border/50 bg-card/80">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          Final AI Influence (F%)
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Combined hybrid score
                        </p>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-foreground">
                      {result.finalScore.toFixed(2)}%
                    </div>
                    <Progress value={result.finalScore} className="h-2 mt-3" />
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
          >
            <Button onClick={handleStartOver} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Analyze Another
            </Button>
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
        </div>
      )}
    </StepLayout>
  );
}
