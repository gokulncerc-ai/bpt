import type { Metadata } from "next";
import ApplicationForm from "@/components/ApplicationForm";
import { SITE_URL } from "@/lib/siteUrl";

const PAGE_URL = `${SITE_URL}/application-form-2026/`;

export const metadata: Metadata = {
  title: "Online Application Form 2026-27 | P K Das College of Physiotherapy",

  description:
    "Apply online for the Bachelor of Physiotherapy (BPT) programme 2026-27 at P K Das College of Physiotherapy, Vaniyamkulam, Ottapalam, Palakkad.",

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    siteName: "P K Das College of Physiotherapy",
    locale: "en_IN",
    url: PAGE_URL,
    title: "Online Application Form 2026-27 | P K Das College of Physiotherapy",
    description:
      "Apply online for the Bachelor of Physiotherapy (BPT) programme 2026-27 at P K Das College of Physiotherapy, Kerala.",
    images: [
      {
        url: "/BPTLOGO3.png",
        alt: "P K Das College of Physiotherapy",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ApplicationFormPage() {
  return <ApplicationForm />;
}