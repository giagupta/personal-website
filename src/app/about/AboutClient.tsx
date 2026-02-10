"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

/* Placeholder work items — replace images with your own */
const workSections = [
  {
    title: "Art",
    items: [
      { src: "/images/work/art-1.jpg", num: 1 },
      { src: "/images/work/art-2.jpg", num: 2 },
      { src: "/images/work/art-3.jpg", num: 3 },
    ],
  },
  {
    title: "Business",
    items: [
      { src: "/images/work/biz-1.jpg", num: 4 },
      { src: "/images/work/biz-2.jpg", num: 5 },
      { src: "/images/work/biz-3.jpg", num: 6 },
    ],
  },
  {
    title: "Research",
    items: [
      { src: "/images/work/res-1.jpg", num: 7 },
      { src: "/images/work/res-2.jpg", num: 8 },
      { src: "/images/work/res-3.jpg", num: 9 },
    ],
  },
];

export default function AboutClient() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-14 md:py-24">
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
            I&rsquo;m a student, runner, and curious person interested in design,
            technology, and the spaces between them. I like thinking about how
            things work and why they feel the way they do.
          </p>

          <p>Outside of that I&rsquo;m:</p>
          <ul className="space-y-0.5 ml-1">
            <li className="flex items-start gap-2">
              <span className="text-charcoal/30 mt-[2px]">&bull;</span>
              Going on long wanders and thinking too much
            </li>
            <li className="flex items-start gap-2">
              <span className="text-charcoal/30 mt-[2px]">&bull;</span>
              Reading whatever catches my eye
            </li>
            <li className="flex items-start gap-2">
              <span className="text-charcoal/30 mt-[2px]">&bull;</span>
              Collecting things for my shelf
            </li>
            <li className="flex items-start gap-2">
              <span className="text-charcoal/30 mt-[2px]">&bull;</span>
              Writing about things I find interesting
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
            href="mailto:gia@example.com"
            className="text-charcoal/80 underline underline-offset-[3px] decoration-charcoal/25 hover:decoration-charcoal/50 transition-colors"
          >
            gia@example.com
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
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="aspect-[3/4] overflow-hidden bg-charcoal/[0.04]">
            <img
              src="/images/about-2.jpg"
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </motion.div>

        {/* ── My Work ── */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="font-serif text-2xl md:text-3xl font-normal text-charcoal tracking-[-0.01em]">
            My Work
          </h2>

          {workSections.map((section, si) => (
            <motion.div
              key={section.title}
              className="mt-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + si * 0.08, duration: 0.5 }}
            >
              {/* Section subheader */}
              <p className="font-serif text-charcoal/50 italic text-sm md:text-base mb-4 tracking-wide">
                {section.title}
              </p>

              {/* 3-col photo grid */}
              <div className="grid grid-cols-3 gap-2.5">
                {section.items.map((item) => (
                  <div key={item.num}>
                    <div className="aspect-[4/3] overflow-hidden bg-charcoal/[0.04]">
                      <img
                        src={item.src}
                        alt={`${section.title} ${item.num}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <p className="mt-1.5 text-center font-serif italic text-charcoal/35 text-xs">
                      ({item.num})
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
