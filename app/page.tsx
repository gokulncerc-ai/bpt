import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MissionVision from "@/components/MissionVision";
import Departments from "@/components/Departments";
import AdmissionsCTA from "@/components/AdmissionsCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Events from "@/components/Events";
export default function Home() {
  return (
    <main>
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
