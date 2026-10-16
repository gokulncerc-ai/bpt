import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// One typeface for the whole site (matches the logo wordmark).
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "P K Das College of Physiotherapy | Ottapalam, Palakkad",
  description:
    "P K Das College of Physiotherapy, Vaniyamkulam, Ottapalam, Palakkad — a KUHS-affiliated physiotherapy programme with hospital-linked clinical training. Apply now or enquire about admissions 2026-27.",
  keywords: [
    "physiotherapy college Palakkad",
    "physiotherapy course Ottapalam",
    "P K Das College of Physiotherapy",
    "BPT Kerala",
    "KUHS physiotherapy",
  ],
  // Favicon: the file lives in D:\BPT\public\BPTLOGO.png
  icons: {
    icon: "/BPTLOGO.png",
    shortcut: "/BPTLOGO.png",
    apple: "/BPTLOGO.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-body text-ink antialiased bg-paper">
        {children}
      </body>
    </html>
  );
}