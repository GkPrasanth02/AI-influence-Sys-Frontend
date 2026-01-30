"use client";

import { useRouter } from "next/navigation";
import { useAnalysis } from "@/context/analysis-context";
import { StepLayout } from "@/components/wizard/step-layout";
import { StepCard } from "@/components/wizard/step-card";
import { FileText } from "lucide-react";

/**
 * Step 1: Student Input
 * Collects the student's answer for analysis
 */
export default function StudentStep() {
  const router = useRouter();
  const { data, updateStudentAnswer } = useAnalysis();

  const handleNext = () => {
    router.push("/analyze/chatgpt");
  };

  return (
    <StepLayout
      currentStep={1}
      totalSteps={5}
      title="Enter Student Answer"
      subtitle="Paste or type the student's submission that you want to analyze for AI influence"
    >
      <StepCard
        label="Student Answer"
        placeholder="Enter the student's written response here..."
        helperText="This is the text that will be compared against AI-generated responses to detect potential influence."
        value={data.studentAnswer}
        onChange={updateStudentAnswer}
        onNext={handleNext}
        icon={<FileText className="w-5 h-5" />}
      />
    </StepLayout>
  );
}
