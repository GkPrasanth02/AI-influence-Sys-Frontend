import { Scan } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Scan className="w-5 h-5 text-primary" />
            </div>
            <span className="font-serif font-semibold text-foreground">
              AI Influence Detection System
            </span>
          </div>

          {/* Info */}
          <div className="text-center md:text-right">
            <p className="text-sm font-extralight text-muted-foreground">
              AI Influence Detection System © {new Date().getFullYear()}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Advanced NLP techniques were Used to build this system.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
