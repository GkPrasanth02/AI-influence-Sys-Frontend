"use client";

import React from "react"

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextareaInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

/**
 * Reusable labeled textarea component for text input
 */
export function TextareaInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  icon,
}: TextareaInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-foreground">
        {icon}
        {label}
      </Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[140px] resize-y bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      />
    </div>
  );
}
