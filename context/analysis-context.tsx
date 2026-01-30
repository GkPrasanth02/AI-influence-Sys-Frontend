"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

/**
 * Analysis Context
 * Persists user inputs across the multi-step wizard flow
 * Designed for extensibility to support additional LLM inputs
 */

export interface AnalysisData {
  studentAnswer: string;
  llmResponses: {
    chatgpt: string;
    gemini: string;
    claude: string;
    [key: string]: string; // Extensible for additional LLMs
  };
}

export interface AnalysisResult {
  similarityScore: number; // S%
  classifierProbability?: number; // C% (future)
  finalScore?: number; // F% (future)
}

interface AnalysisContextType {
  data: AnalysisData;
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  updateStudentAnswer: (answer: string) => void;
  updateLLMResponse: (llm: string, response: string) => void;
  setResult: (result: AnalysisResult) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetAll: () => void;
}

const defaultData: AnalysisData = {
  studentAnswer: "",
  llmResponses: {
    chatgpt: "",
    gemini: "",
    claude: "",
  },
};

const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined
);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AnalysisData>(defaultData);
  const [result, setResultState] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);

  const updateStudentAnswer = useCallback((answer: string) => {
    setData((prev) => ({ ...prev, studentAnswer: answer }));
  }, []);

  const updateLLMResponse = useCallback((llm: string, response: string) => {
    setData((prev) => ({
      ...prev,
      llmResponses: { ...prev.llmResponses, [llm]: response },
    }));
  }, []);

  const setResult = useCallback((newResult: AnalysisResult) => {
    setResultState(newResult);
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const setError = useCallback((err: string | null) => {
    setErrorState(err);
  }, []);

  const resetAll = useCallback(() => {
    setData(defaultData);
    setResultState(null);
    setErrorState(null);
    setIsLoading(false);
  }, []);

  return (
    <AnalysisContext.Provider
      value={{
        data,
        result,
        isLoading,
        error,
        updateStudentAnswer,
        updateLLMResponse,
        setResult,
        setLoading,
        setError,
        resetAll,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
}
