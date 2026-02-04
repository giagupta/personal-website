"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="font-serif text-7xl md:text-9xl font-light text-charcoal tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Gia
          </motion.h1>
          <motion.div
            className="mt-6 w-16 h-[1px] bg-tan mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          />
          <motion.p
            className="mt-6 font-sans text-lg text-warm-gray tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            runner · reader · explorer
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-xs text-warm-gray/60 tracking-widest uppercase">
            scroll
          </span>
          <motion.div
            className="w-[1px] h-8 bg-tan/40"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-serif text-2xl md:text-3xl text-charcoal/80 leading-relaxed italic">
            &ldquo;The world is a book, and those who do not travel read only one page.&rdquo;
          </p>
          <p className="mt-4 text-sm text-warm-gray">— Saint Augustine</p>
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: "Runs", desc: "Routes & reflections from around the world", href: "/runs" },
            { title: "Shelf", desc: "Objects, ideas, and lessons collected along the way", href: "/shelf" },
            { title: "About", desc: "The story behind the postcards", href: "/about" },
          ].map((card, i) => (
            <motion.a
              key={card.href}
              href={card.href}
              className="group block p-8 bg-white/50 rounded-lg postcard-shadow hover:bg-white/80 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <h3 className="font-serif text-xl font-medium text-charcoal">{card.title}</h3>
              <p className="mt-2 text-sm text-warm-gray leading-relaxed">{card.desc}</p>
              <span className="mt-4 inline-block text-xs text-tan tracking-widest uppercase group-hover:tracking-[0.2em] transition-all">
                Explore →
              </span>
            </motion.a>
          ))}
        </motion.div>
      </section>

      <footer className="border-t border-tan/20 py-8 text-center">
        <p className="text-xs text-warm-gray/60 tracking-wide">
          Built with care · {new Date().getFullYear()}
        </p>
      </footer>
    </PageTransition>
  );
}
