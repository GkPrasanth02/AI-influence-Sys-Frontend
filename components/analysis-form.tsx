"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextareaInput } from "@/components/textarea-input";
import { ResultCard } from "@/components/result-card";
import { ErrorAlert } from "@/components/error-alert";

/* ---------- Icons ---------- */

const StudentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" className="text-primary">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const ChatGPTIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M12 8V4H8" />
  </svg>
);

const GeminiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
    <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8" />
  </svg>
);

const ClaudeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const LoadingSpinner = () => (
  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10"
      stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4z" />
  </svg>
);

interface AnalysisResult {
  similarity_score: number;
  classifier_score?: number;
  final_score?: number;
}

const stepVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ---------- MAIN COMPONENT ---------- */

export function AnalysisForm() {
  // ✅ STEP CONTROLLER (FIXED LOCATION)
  const [step, setStep] = useState(0);

  // Form state
  const [studentAnswer, setStudentAnswer] = useState("");
  const [chatgptAnswer, setChatgptAnswer] = useState("");
  const [geminiAnswer, setGeminiAnswer] = useState("");
  const [claudeAnswer, setClaudeAnswer] = useState("");

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const isFormValid =
    studentAnswer && chatgptAnswer && geminiAnswer && claudeAnswer;

  const handleAnalyze = async () => {
    setError(null);
    setResult(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student: studentAnswer,
          llms: [chatgptAnswer, geminiAnswer, claudeAnswer],
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch {
      setError("Backend not reachable. Start the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>AI Influence Analysis</CardTitle>
          <CardDescription>
            Step {step + 1} of 4 — enter responses one at a time
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-6"
            >

              {step === 0 && (
                <>
                  <TextareaInput
                    label="Student Answer"
                    value={studentAnswer}
                    onChange={setStudentAnswer}
                    icon={<StudentIcon />}
                  />
                  <Button
                    className="w-full"
                    onClick={() => setStep(1)}
                    disabled={!studentAnswer.trim()}
                  >
                    Next
                  </Button>
                </>
              )}

              {step === 1 && (
                <>
                  <TextareaInput
                    label="ChatGPT Answer"
                    value={chatgptAnswer}
                    onChange={setChatgptAnswer}
                    icon={<ChatGPTIcon />}
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!chatgptAnswer.trim()}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <TextareaInput
                    label="Gemini Answer"
                    value={geminiAnswer}
                    onChange={setGeminiAnswer}
                    icon={<GeminiIcon />}
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!geminiAnswer.trim()}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <TextareaInput
                    label="Claude Answer"
                    value={claudeAnswer}
                    onChange={setClaudeAnswer}
                    icon={<ClaudeIcon />}
                  />
                  <Button
                    className="w-full"
                    onClick={handleAnalyze}
                    disabled={!isFormValid || isLoading}
                  >
                    {isLoading ? <LoadingSpinner /> : "Analyze AI Influence"}
                  </Button>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </CardContent>

      </Card>

      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}
      {result && (
        <ResultCard
          similarityScore={result.similarity_score}
          classifierScore={result.classifier_score}
          finalScore={result.final_score}
        />
    )}

    </div>
  );
}
