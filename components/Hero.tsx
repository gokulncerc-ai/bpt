"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import collegeImage from "../public/college_pic.jpg";
import collegeImage1 from "../public/collegeone.jpeg";
import collegeImage2 from "../public/collegetwo.jpeg";
import collegeImage3 from "../public/collegethree.jpg";
import collegeStudents1 from "../public/collegestud.jpg";
import PhysiotherapyStudents2 from "../public/collegestuds.jpg";

const heroImages = [
  {
    src: collegeImage,
    alt: "P K Das College of Physiotherapy campus",
  },
  {
    src: collegeImage1,
    alt: "P K Das College campus",
  },
  {
    src: collegeImage2,
    alt: "P K Das College facilities",
  },
  {
    src: collegeImage3,
    alt: "P K Das College infrastructure",
  },
  {
    src: collegeStudents1,
    alt: "P K Das College students",
  },
  {
    src: PhysiotherapyStudents2,
    alt: "P K Das College of Physiotherapy students",
  },
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  /*
   * Automatically change the background image every 4 seconds.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[680px] md:min-h-[760px] lg:min-h-[800px] overflow-hidden text-white">

      {/* =========================================================
          BACKGROUND IMAGE CAROUSEL
      ========================================================= */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${currentImage === index ? "opacity-100" : "opacity-0"
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

        {/* =======================================================
            LIGHT, DIRECTIONAL OVERLAY — keeps the photo visible.
            Instead of a flat dark wash over the whole image, the
            teal tint is concentrated behind the text (left side)
            and fades out toward the right and center, so the
            campus photo itself stays the focal point.
        ======================================================= */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/35 to-navy/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-navy/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/75 to-transparent" />
      </div>

      {/* =========================================================
          SOFT DECORATIVE ACCENTS
      ========================================================= */}
      <div className="absolute z-[1] -left-32 -bottom-32 w-[420px] h-[420px] rounded-full bg-green/10 blur-3xl pointer-events-none" />
      <div className="absolute z-[1] -right-32 top-20 w-[380px] h-[380px] rounded-full bg-amber/10 blur-3xl pointer-events-none" />

      {/* =========================================================
          HERO CONTENT
      ========================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-32 pb-20 md:pt-40 md:pb-28 min-h-[680px] md:min-h-[760px] lg:min-h-[800px] flex items-center">
        <div className="w-full max-w-4xl animate-fadeUp">

          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-[12px] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-white bg-white/10 border border-white/25 backdrop-blur-md rounded-full px-4 py-2 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            Vaniamkulam · Palakkad · Kerala
          </div>

          {/* Main Heading */}
          <h1 className="max-w-4xl font-serif text-[36px] font-normal leading-[1.12] tracking-[-0.015em] text-white sm:text-[46px] md:text-[56px] lg:text-[64px]">
            The best Physiotherapy College in{" "}
            <span className="italic text-[#D2B87C]">
              Palakkad
            </span>
            <span className="mt-4 block font-sans text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-[#D2B87C]">
              Measure <span className="mx-1 text-white/60">•</span> Understand <span className="mx-1 text-white/60">•</span> Restore
            </span>
            <span className="mt-2 block text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white/80">
              The Science of Physiotherapy.
            </span>
          </h1> 

          {/* Subtitle Description */}
          <p className="mt-6 text-[16px] md:text-[18px] text-white/90 max-w-2xl leading-relaxed">
            P K Das College of Physiotherapy offers a KUHS affiliated programme that is built on clinical exposure covering 
            musculoskeletal care, sports injury and neuro‑rehabilitation.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeNZi8r2gbHvLu9wPG5GALbA4HN3PeTT5cK1WyEh1pHMDBeFw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber hover:bg-amber-dark text-white transition rounded-full px-7 py-3.5 font-semibold text-[15px] shadow-[0_14px_30px_-10px_rgba(245,158,11,.6)]"
            >
              Apply Now
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeNZi8r2gbHvLu9wPG5GALbA4HN3PeTT5cK1WyEh1pHMDBeFw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/60 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-navy hover:border-white transition rounded-full px-7 py-3.5 font-semibold text-[15px]"
            >
              Enquire Now
            </a>
          </div>

          {/* Trust Information Badges */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/90 text-[12px] sm:text-[13px] font-mono uppercase tracking-wide">
            <span>Affiliated · KUHS</span>
            <span className="w-1 h-1 rounded-full bg-white/50 hidden sm:inline-block" />
            <span>Superspeciality Hospital Access</span>
          </div>

        </div>
      </div>

      {/* =========================================================
          CAROUSEL INDICATORS
      ========================================================= */}
      <div className="absolute z-20 bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show hero image ${index + 1}`}
            onClick={() => setCurrentImage(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${currentImage === index
              ? "w-8 bg-amber"
              : "w-1.5 bg-white/60 hover:bg-white/90"
              }`}
          />
        ))}
      </div>
      {/* Bottom Rule Accent */}
      <div className="relative z-20 tick-rule" />
    </section>
  );
}
