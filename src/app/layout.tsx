import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gia — Personal",
  description: "A vintage-inspired personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="paper-texture min-h-screen">
        <Navigation />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
