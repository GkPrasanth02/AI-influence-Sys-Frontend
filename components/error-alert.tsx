"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
}

/**
 * User-friendly error alert component
 */
export function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className="bg-destructive/10 border-destructive/50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
      <AlertTitle className="font-semibold">Analysis Error</AlertTitle>
      <AlertDescription className="mt-1">
        {message}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-2 text-sm underline hover:no-underline focus:outline-none"
          >
            Dismiss
          </button>
        )}
      </AlertDescription>
    </Alert>
  );
}
