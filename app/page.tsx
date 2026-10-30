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
// import Events from "@/components/Events";

// The one official address of this page (tells Google "index THIS address").
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: SITE_URL + "/" },
};

// Structured data: tells Google exactly what this website is (name, address, phone, logo).
const collegeSchema = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  name: "P K Das College of Physiotherapy",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/BPTLOGO.png`,
  image: `${SITE_URL}/BPTLOGO3.png`,
  description:
    "KUHS-affiliated Bachelor of Physiotherapy (BPT) college at Vaniyamkulam, Ottapalam, Palakkad, Kerala, with hospital-linked clinical training.",
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

// WebSite schema helps Google understand the site entity and display sitelinks.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "P K Das College of Physiotherapy",
  url: `${SITE_URL}/`,
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collegeSchema, websiteSchema]).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <Navbar />
      <Hero />
      <About />
      <MissionVision />
      <Departments />
      {/* <Events /> */}
      <AdmissionsCTA />
      <Contact />
      <Footer />
    </main>
  );
}
