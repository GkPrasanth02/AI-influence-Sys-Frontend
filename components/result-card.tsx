"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ResultCardProps {
  /** Similarity influence score percentage (0-100) */
  similarityScore: number | null;
  /** Classifier AI probability percentage (for future use) */
  classifierScore?: number | null;
  /** Final AI influence score percentage (for future use) */
  finalScore?: number | null;
}

/**
 * Displays analysis results with progress bars and score explanations
 * Extensible to display additional metrics in the future
 */
export function ResultCard({
  similarityScore,
  classifierScore,
  finalScore,
}: ResultCardProps) {
  // Determine score color based on value
  const getScoreColor = (score: number) => {
    if (score < 30) return "text-success";
    if (score < 60) return "text-warning";
    return "text-destructive";
  };

  const getProgressColor = (score: number) => {
    if (score < 30) return "bg-success";
    if (score < 60) return "bg-warning";
    return "bg-destructive";
  };

  const getExplanation = (score: number) => {
    if (score < 30) {
      return "Low similarity detected. The submission appears to be largely original work.";
    }
    if (score < 60) {
      return "Moderate similarity detected. Some portions may have been influenced by AI-generated content.";
    }
    return "High similarity detected. The submission shows significant patterns consistent with AI-generated text.";
  };

  if (similarityScore === null) return null;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
          Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Similarity Score (S%) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Similarity Influence Score (S%)
            </span>
            <span className={`text-2xl font-bold ${getScoreColor(similarityScore)}`}>
              {similarityScore.toFixed(2)}%
            </span>
          </div>
          <div className="relative">
            <Progress value={similarityScore} className="h-3 bg-secondary" />
            <div
              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(similarityScore)}`}
              style={{ width: `${similarityScore}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {getExplanation(similarityScore)}
          </p>
        </div>

        {/* Classifier Score (C%) - Future Extension */}
        {classifierScore !== undefined && classifierScore !== null && (
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Classifier AI Probability (C%)
              </span>
              <span className={`text-2xl font-bold ${getScoreColor(classifierScore)}`}>
                {classifierScore.toFixed(2)}%
              </span>
            </div>
            <div className="relative">
              <Progress value={classifierScore} className="h-3 bg-secondary" />
              <div
                className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(classifierScore)}`}
                style={{ width: `${classifierScore}%` }}
              />
            </div>
          </div>
        )}

        {/* Final Score (F%) - Future Extension */}
        {finalScore !== undefined && finalScore !== null && (
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Final AI Influence Score (F%)
              </span>
              <span className={`text-2xl font-bold ${getScoreColor(finalScore)}`}>
                {finalScore.toFixed(2)}%
              </span>
            </div>
            <div className="relative">
              <Progress value={finalScore} className="h-3 bg-secondary" />
              <div
                className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(finalScore)}`}
                style={{ width: `${finalScore}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
