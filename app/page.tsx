'use client';

import { Header } from "@/components/homepage/header";
import { HeroSection } from "@/components/homepage/hero-section";
import { FeaturesSection } from "@/components/homepage/features-section";
import { HowItWorksSection } from "@/components/homepage/how-it-works-section";
import { MetricsSection } from "@/components/homepage/metrics-section";
import { CTASection } from "@/components/homepage/cta-section";
import { Footer } from "@/components/homepage/footer";
import LiquidEther from "@/components/ui/LiquidEther";
/**
 * AI Influence Detection System - Landing Page
 * University Capstone Project
 *
 * This homepage describes the system and explains how it works
 * for detecting AI influence in student submissions.
 */
export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <LiquidEther
          colors={[ '#bbffff', '#eeffff', '#ffffff' ]}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.3}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          color0="#bbffff"
          color1="#eeffff"
          color2="#ffffff"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <MetricsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
