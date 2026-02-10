"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { BlogPost } from "@/types";

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleClick = (post: BlogPost) => {
    if (post.url) {
      window.open(post.url, "_blank", "noopener,noreferrer");
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-light text-charcoal">
            Writing
          </h1>
        </motion.div>

        {/* Index list */}
        <div className="font-mono">
          {posts.map((post, i) => (
            <motion.button
              key={post.id}
              onClick={() => handleClick(post)}
              className="w-full text-left group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
            >
              <div className="flex items-baseline gap-4 md:gap-6 py-2.5 border-b border-charcoal/5 group-hover:border-charcoal/15 transition-colors">
                <span className="text-xs text-charcoal/25 tabular-nums flex-shrink-0">
                  {String(i + 1).padStart(3, "0")}
                </span>
                <span className="text-sm uppercase tracking-wide text-charcoal/60 group-hover:text-charcoal transition-colors truncate">
                  {post.title}
                </span>
                {post.url && (
                  <svg className="w-3 h-3 text-charcoal/20 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                )}
                {post.tag && (
                  <span className="hidden md:inline text-[10px] text-charcoal/20 uppercase tracking-widest ml-auto flex-shrink-0">
                    {post.tag}
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Post detail modal — only for posts with body, no url */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setSelectedPost(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <div className="p-6 md:p-8">
                <p className="text-[10px] text-charcoal/25 uppercase tracking-widest font-mono">
                  {selectedPost.date}
                  {selectedPost.tag && ` — ${selectedPost.tag}`}
                </p>
                <h2 className="mt-2 text-xl font-medium text-charcoal">
                  {selectedPost.title}
                </h2>
                <div className="mt-1 w-8 h-[1px] bg-charcoal/10" />
                {selectedPost.body && (
                  <p className="mt-5 text-sm text-charcoal/65 leading-relaxed whitespace-pre-line">
                    {selectedPost.body}
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center text-charcoal/25 hover:text-charcoal/60 hover:bg-charcoal/5 transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
