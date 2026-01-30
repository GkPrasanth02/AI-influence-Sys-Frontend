"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ClickSpark from "@/components/ui/ClickSpark";
/**
 * CTA Section with scroll-triggered animations
 * Final call-to-action to start analysis
 */
export function CTASection() {
  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground text-balance"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Ready to Analyze?
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg text-pretty"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Start detecting AI influence in student submissions with our
            powerful analysis tool.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <ClickSpark
            sparkCount={8}
            sparkSize={10}
            sparkRadius={15}
            sparkColor = '#000000'
            duration ={800}
            extraScale={1.2}
            >
              <Button asChild size="lg" className="text-base px-8">
                <Link href="/analyze/student">
                  Go to Analyzer
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </ClickSpark>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
