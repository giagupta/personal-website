"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "about" },
  { href: "/blog", label: "writing" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full pt-8 pb-4 md:pt-12 md:pb-6">
      <div className="flex flex-col items-center gap-4">
        {/* Centered title */}
        <Link
          href="/"
          className="font-serif text-2xl md:text-3xl text-charcoal tracking-[-0.01em]"
        >
          Gia Gupta
        </Link>

        {/* Horizontal links */}
        <div className="flex items-center gap-8 md:gap-12">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm md:text-[15px] underline underline-offset-[3px] transition-colors ${
                  isActive
                    ? "text-charcoal decoration-charcoal/40"
                    : "text-charcoal/60 decoration-charcoal/25 hover:text-charcoal hover:decoration-charcoal/40"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
