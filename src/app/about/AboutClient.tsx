"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

export default function AboutClient() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-8 md:py-16">
        {/* ── Intro ── */}
        <motion.h1
          className="font-serif text-4xl md:text-[2.8rem] font-normal text-charcoal leading-[1.15] tracking-[-0.01em]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hi there, I&rsquo;m Gia.
        </motion.h1>

        <motion.div
          className="mt-7 space-y-4 text-[15px] md:text-[16px] text-charcoal/65 leading-[1.7]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
        >
          <p>
            I&rsquo;m interested in understanding how to build intelligence that
            can solve scientific discovery and general problem-solving. I hope to
            contribute to building this type of intelligence and other beautiful
            things that elegantly solve big questions.
          </p>

          <p>
            I&rsquo;m deeply passionate about pursuing poetic and scientific
            truths. I think I am both a poet and scientist at heart! I aim to
            live with love, optimism, patience &amp; a boundless sense of wonder
            at the miracles and beauty of the universe.
          </p>

          <p>
            I can usually be found smiling in the sun, looking for new coffee
            shops, reading a new book, looking at the stars, or running very very
            slowly.
          </p>

          <p>Outside of that I&rsquo;m:</p>
          <ul className="space-y-0.5 ml-1">
            <li className="flex items-start gap-2">
              <span className="text-charcoal/30 mt-[2px]">&bull;</span>
              Host an art pop-up concept called{" "}
              <a
                href="https://www.instagram.com/intheemargins/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/80 underline underline-offset-[3px] decoration-charcoal/25 hover:decoration-charcoal/50 transition-colors"
              >
                In The Margins
              </a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-charcoal/30 mt-[2px]">&bull;</span>
              Facilitate an artist collective @ Penn, Circle
            </li>
            <li className="flex items-start gap-2">
              <span className="text-charcoal/30 mt-[2px]">&bull;</span>
              Read poetry &amp; try to find it in the world
            </li>
            <li className="flex items-start gap-2">
              <span className="text-charcoal/30 mt-[2px]">&bull;</span>
              Spend time with people I love, ideally in the sun
            </li>
          </ul>
        </motion.div>

        <motion.p
          className="mt-6 text-[15px] md:text-[16px] text-charcoal/65 leading-[1.7]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Say hello at{" "}
          <a
            href="mailto:thegiagupta@gmail.com"
            className="text-charcoal/80 underline underline-offset-[3px] decoration-charcoal/25 hover:decoration-charcoal/50 transition-colors"
          >
            thegiagupta@gmail.com
          </a>
          .
        </motion.p>

        {/* ── Two photos ── */}
        <motion.div
          className="mt-14 grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.6 }}
        >
          <div className="aspect-[3/4] overflow-hidden bg-charcoal/[0.04]">
            <img
              src="/images/about-1.jpg"
              alt="In the trees"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[3/4] overflow-hidden bg-charcoal/[0.04]">
            <img
              src="/images/about-2.jpg"
              alt="On the subway"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
