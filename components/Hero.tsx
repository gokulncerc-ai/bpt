"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import collegeImage from "../public/college_pic.jpeg";
import collegeImage1 from "../public/collegeone.jpeg";
import collegeImage2 from "../public/collegetwo.jpeg";
import collegeStudents1 from "../public/collegestud.jpg";
import PhysiotherapyStudents2 from "../public/collegestuds.jpg";

const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeNZi8r2gbHvLu9wPG5GALbA4HN3PeTT5cK1WyEh1pHMDBeFw/viewform";

const heroImages = [
  { src: collegeImage, alt: "P K Das College of Physiotherapy campus" },
  { src: collegeImage1, alt: "P K Das College campus" },
  { src: collegeImage2, alt: "P K Das College facilities" },
  { src: collegeStudents1, alt: "P K Das College students" },
  { src: PhysiotherapyStudents2, alt: "P K Das College of Physiotherapy students" },
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  // Change the background image every 4 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative min-h-[680px] md:min-h-[760px] lg:min-h-[800px] overflow-hidden text-white">
      {/* ---------- Background carousel ---------- */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Navy tint concentrated behind the text, fading to the photo on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/55 to-primary/5" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-primary-dark/80 to-transparent" />
      </div>

      {/* ---------- Soft colour glows ---------- */}
      <div className="absolute z-[1] -left-32 -bottom-32 w-[420px] h-[420px] rounded-full bg-green/15 blur-3xl pointer-events-none" />
      <div className="absolute z-[1] -right-32 top-20 w-[380px] h-[380px] rounded-full bg-secondary/15 blur-3xl pointer-events-none" />

      {/* ---------- Content ---------- */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-32 pb-20 md:pt-40 md:pb-28 min-h-[680px] md:min-h-[760px] lg:min-h-[800px] flex items-center">
        <div className="w-full max-w-3xl animate-fadeUp">
          {/* Location badge */}
          <div className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-semibold tracking-wide text-white bg-white/10 border border-white/25 backdrop-blur-md rounded-full px-4 py-2 mb-7">
            <span className="w-2 h-2 rounded-full bg-green" />
            Vaniyamkulam, Palakkad, Kerala
          </div>

          {/* Heading */}
          <h1 className="font-display text-[34px] sm:text-[44px] md:text-[54px] lg:text-[60px] font-bold leading-[1.1] tracking-tight text-white">
            The best Physiotherapy College in Palakkad
          </h1>

          <p className="mt-5 text-lg sm:text-xl md:text-2xl font-semibold text-secondary-light">
            Measure&nbsp;&nbsp;|&nbsp;&nbsp;Understand&nbsp;&nbsp;|&nbsp;&nbsp;Restore
          </p>

          <p className="mt-5 text-[16px] md:text-[18px] text-white/90 max-w-2xl leading-relaxed">
            P K Das College of Physiotherapy offers a KUHS affiliated programme
            built on clinical exposure covering musculoskeletal care, sports
            injury and neuro‑rehabilitation.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#43ab5e] hover:bg-[#389450] text-white transition-all duration-300 rounded-full px-8 py-3.5 font-bold text-[15px] shadow-[0_14px_30px_-10px_rgba(67,171,94,0.65)] hover:-translate-y-0.5 hover:shadow-[0_18px_35px_-10px_rgba(67,171,94,0.75)]"
          >
            Apply Now
          </a>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/70 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-primary transition rounded-full px-8 py-3.5 font-bold text-[15px]"
            >
              Enquire Now
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center gap-3 text-[13px] font-semibold">
            <span className="rounded-full bg-white/10 border border-white/20 px-4 py-1.5">
              Affiliated to KUHS
            </span>
            <span className="rounded-full bg-white/10 border border-white/20 px-4 py-1.5">
              Superspeciality Hospital Access
            </span>
          </div>
        </div>
      </div>

      {/* ---------- Carousel indicators ---------- */}
      <div className="absolute z-20 bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show hero image ${index + 1}`}
            onClick={() => setCurrentImage(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentImage === index
                ? "w-8 bg-secondary"
                : "w-1.5 bg-white/60 hover:bg-white/90"
            }`}
          />
        ))}
      </div>

      <div className="relative z-20 tick-rule" />
    </section>
  );
}