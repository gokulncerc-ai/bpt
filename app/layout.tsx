import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_URL } from "@/lib/siteUrl";
// One typeface for the whole site (matches the logo wordmark).
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e3c76",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Best Physiotherapy Colleges in Kerala | Top BPT Colleges in Palakkad",
  description:
    "P K Das College of Physiotherapy is one of the best physiotherapy colleges in Kerala, offering a KUHS-affiliated programme with hands-on clinical exposure.",
  keywords: [
    "Best Physiotherapy College in Kerala",
    "Top Physiotherapy College in Kerala",
    "Physiotherapy Colleges in Kerala",
    "BPT Colleges in Kerala",
    "BPT College in Palakkad",
    "physiotherapy college Palakkad",
    "physiotherapy course Ottapalam",
    "P K Das College of Physiotherapy",
    "BPT Kerala",
    "KUHS physiotherapy",
  ],
  // Google Search Console verification (renders <meta name="google-site-verification" ...>)
  verification: {
    google: "pUGZe9Hi99MCs1t4_Ncc0ERZP9upRuSvr-0jHRWqSmE",
  },
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
      <body className="font-body text-ink antialiased bg-paper overflow-x-clip">
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PGP2GRRJEN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-PGP2GRRJEN');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}