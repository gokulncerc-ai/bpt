import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MissionVision from "@/components/MissionVision";
import Departments from "@/components/Departments";
import AdmissionsCTA from "@/components/AdmissionsCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { contact } from "@/lib/content";
import { SITE_URL } from "@/lib/siteUrl";

// Homepage SEO metadata
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

// College structured data for search engines
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "@id": `${SITE_URL}/#college`,

  name: "P K Das College of Physiotherapy",

  alternateName: [
    "PK Das College of Physiotherapy",
    "P K Das College",
  ],

  url: `${SITE_URL}/`,

  logo: `${SITE_URL}/BPTLOGO.png`,

  image: `${SITE_URL}/BPTLOGO3.png`,

  description:
    "P K Das College of Physiotherapy is located at Vaniyamkulam, Ottapalam, Palakkad, Kerala, and offers a Bachelor of Physiotherapy programme with academic learning and hospital-linked clinical training.",

  telephone: contact.admissionHotline,

  email: contact.email,

  address: {
    "@type": "PostalAddress",
    streetAddress: "Vaniyamkulam",
    addressLocality: "Ottapalam",
    addressRegion: "Kerala",
    postalCode: "679522",
    addressCountry: "IN",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.7828475,
    longitude: 76.3269766,
  },
};

export default function Home() {
  return (
    <main id="top">
      {/* College structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Homepage sections */}
      <Navbar />

      <Hero />

      <About />

      <MissionVision />

      <Departments />

      <AdmissionsCTA />

      <Contact />

      <Footer />
    </main>
  );
}