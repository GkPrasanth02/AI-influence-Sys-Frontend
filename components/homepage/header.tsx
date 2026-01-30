"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scan } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Scan className="w-5 h-5 text-primary" />
            </div>
            <span className="font-serif font-semibold text-foreground hidden sm:inline">
              AI Detector
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#how-it-works"
              className="text-sm font-serif text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <Link
              href="/analyze/student"
              className="text-sm font-serif text-muted-foreground hover:text-foreground transition-colors"
            >
              Analyzer
            </Link>
          </nav>

          {/* CTA */}
          <Button asChild size="sm" className="text-sm font-serif px-6">
            <Link href="/analyze/student">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
