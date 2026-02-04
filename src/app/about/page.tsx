"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal">
            About
          </h1>
          <div className="mt-4 w-12 h-[1px] bg-tan" />
        </motion.div>

        {/* Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white/50 rounded-lg p-8 postcard-shadow">
            <p className="font-serif text-xl text-charcoal/80 leading-relaxed italic">
              &ldquo;I collect places through my feet and ideas through my eyes.&rdquo;
            </p>
          </div>

          <div className="space-y-5 text-charcoal/70 leading-relaxed">
            <p>
              Hi, I&apos;m Gia. I run in new cities to learn how they breathe. I
              keep a shelf of objects that remind me of ideas worth holding onto.
              This website is where those two habits live.
            </p>
            <p>
              The <strong className="text-charcoal font-medium">Runs</strong>{" "}
              page maps the routes I&apos;ve traced around the world. Each one
              comes with a postcard — a snapshot and a thought from that morning.
            </p>
            <p>
              The <strong className="text-charcoal font-medium">Shelf</strong>{" "}
              page is my cabinet of curiosities: objects paired with the concepts
              they represent. A compass for navigation, a seedling for growth,
              and so on.
            </p>
            <p>
              This site is built with Next.js, styled with Tailwind, animated
              with Framer Motion, and mapped with Leaflet. It&apos;s designed to
              feel like a postcard you&apos;d actually want to keep.
            </p>
          </div>

          {/* Contact card */}
          <motion.div
            className="mt-12 bg-white/50 rounded-lg p-8 postcard-shadow text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="font-serif text-xl text-charcoal">Say hello</h2>
            <p className="mt-2 text-sm text-warm-gray">
              Want to chat about running routes, book recommendations, or just
              say hi?
            </p>
            <div className="mt-4 flex items-center justify-center gap-6">
              <a
                href="mailto:hello@example.com"
                className="text-sm text-tan hover:text-charcoal transition-colors tracking-wide"
              >
                Email
              </a>
              <span className="text-tan/30">|</span>
              <a
                href="#"
                className="text-sm text-tan hover:text-charcoal transition-colors tracking-wide"
              >
                Twitter
              </a>
              <span className="text-tan/30">|</span>
              <a
                href="#"
                className="text-sm text-tan hover:text-charcoal transition-colors tracking-wide"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <footer className="border-t border-tan/20 py-8 text-center mt-12">
        <p className="text-xs text-warm-gray/60 tracking-wide">
          Built with care · {new Date().getFullYear()}
        </p>
      </footer>
    </PageTransition>
  );
}
