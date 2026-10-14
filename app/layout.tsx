import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "P K Das College of Physiotherapy | Ottapalam, Palakkad",
  description:
    "P K Das College of Physiotherapy, Vaniyamkulam, Ottapalam, Palakkad — a KUHS-affiliated physiotherapy programme with hospital-linked clinical training. Apply now or enquire about admissions 2024-25.",
  keywords: [
    "physiotherapy college Palakkad",
    "physiotherapy course Ottapalam",
    "P K Das College of Physiotherapy",
    "BPT Kerala",
    "KUHS physiotherapy",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="font-body text-ink antialiased bg-paper">
        {children}
      </body>
    </html>
  );
}
