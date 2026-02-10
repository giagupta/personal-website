"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

export default function AboutClient() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-20">
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-light text-charcoal leading-tight"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hi there, I&rsquo;m Gia.
        </motion.h1>

        {/* Bio */}
        <motion.div
          className="mt-6 space-y-4 text-[15px] md:text-base text-charcoal/70 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <p>
            I&rsquo;m a student, runner, and curious person interested in design,
            technology, and the spaces between them. I like thinking about how
            things work and why they feel the way they do.
          </p>

          <p>Outside of that I&rsquo;m:</p>
          <ul className="list-disc list-inside space-y-1 text-charcoal/60">
            <li>Going on long wanders and thinking too much</li>
            <li>Reading whatever catches my eye</li>
            <li>Collecting things for my shelf</li>
            <li>Writing about things I find interesting</li>
          </ul>
        </motion.div>

        {/* Links */}
        <motion.p
          className="mt-6 text-[15px] md:text-base text-charcoal/70 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Say hello at{" "}
          <a
            href="mailto:gia@example.com"
            className="text-charcoal underline underline-offset-2 decoration-charcoal/30 hover:decoration-charcoal/60 transition-colors"
          >
            gia@example.com
          </a>
          .
        </motion.p>

        {/* Photos */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-3 md:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="aspect-[3/4] rounded-sm overflow-hidden bg-charcoal/5">
            <img
              src="/images/about-1.jpg"
              alt="Photo 1"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="aspect-[3/4] rounded-sm overflow-hidden bg-charcoal/5">
            <img
              src="/images/about-2.jpg"
              alt="Photo 2"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
