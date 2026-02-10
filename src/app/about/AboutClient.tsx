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
            I&rsquo;m interested in understanding intelligence as a tool for
            solving problems and coming up with good new ideas. Aligned AI, 
            robotics, & neurotech seem like promising ways to help humanity
            make progress. I'm deeply passionate about pursuing poetic and
            scientific truths. Whatever I do, I hope to do it with love,
            humility, curiosity & a boundless sense of wonder at the miracles
            and beauty of the universe.
          </p>

          <p>Outside of that I&rsquo;m:</p>
          <ul className="list-disc list-inside space-y-1 text-charcoal/60">
            <li>Host an art pop-up concept called In The Margins</li>
            <li>Facilitate an artist collective @ Penn, Cirlce</li>
            <li>Read poetry & try to find it in the world</li>
            <li>Spend time with people I love, ideally in the sun</li>
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
