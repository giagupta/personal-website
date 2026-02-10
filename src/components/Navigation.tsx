"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/runs", label: "Wanders" },
  { href: "/shelf", label: "Shelf" },
  { href: "/blog", label: "Writing" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-charcoal/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-start gap-10">
        <Link
          href="/"
          className="text-sm font-medium text-charcoal tracking-wide"
        >
          Gia
        </Link>
        <div className="flex flex-col gap-0.5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "text-charcoal"
                    : "text-charcoal/35 hover:text-charcoal"
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
