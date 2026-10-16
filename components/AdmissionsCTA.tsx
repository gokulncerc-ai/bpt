"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeNZi8r2gbHvLu9wPG5GALbA4HN3PeTT5cK1WyEh1pHMDBeFw/viewform";

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionItem({ title, isOpen, onToggle, children }: AccordionItemProps) {
  return (
    <div
      className={`bg-white overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-secondary shadow-md"
          : "border-mist shadow-sm hover:shadow-md hover:border-secondary/50"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-paper"
      >
        <h3
          className={`font-display text-[18px] md:text-[20px] font-semibold transition-colors ${
            isOpen ? "text-secondary-dark" : "text-primary"
          }`}
        >
          {title}
        </h3>
        <span
          className={`flex shrink-0 items-center justify-center w-8 h-8 rounded-full border font-semibold text-lg transition-colors ${
            isOpen
              ? "bg-secondary text-white border-secondary"
              : "bg-paper text-primary border-mist"
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-4 text-primary/75 text-[15px] leading-relaxed border-t border-mist animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}

export default function AdmissionsCTA() {
  // Which accordion section is open (BPT details open by default)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const careerProfiles = [
    "Consultant Physiotherapist in Multi-specialty Hospitals, Health Care Centers, NGOs",
    "Corporate Physiotherapist in MNCs",
    "Lecturer",
    "Clinical researcher",
    "Osteopath",
    "Ergonomic Care Advisor",
    "Health Care Physiotherapy Instructor in Modern Gymnasiums",
    "Physiotherapist in Special Schools for Physically Challenged Children",
    "Physiotherapist in Old Age Homes",
    "Sports rehabilitator in Sports Associations and Sports Team",
    "Entrepreneurs in Rehabilitation Centers",
    "Government Sectors",
    "Job opportunities in all abroad countries",
  ];

  const scopeFields = [
    "Master of Physiotherapy in Neurology",
    "Master of Physiotherapy in Musculoskeletal",
    "Master of Physiotherapy in Orthopaedics",
    "Master of Physiotherapy in Cardio respiratory",
    "Master of Physiotherapy in Pediatrics",
    "Master of Physiotherapy in Hand Conditions",
    "Master of Physiotherapy in Geriatrics",
    "Master of Physiotherapy in obstetrics and gynecology",
    "Master of Physiotherapy in Community Medicine",
    "Master of Physiotherapy in Sports Medicine",
    "Master of Physiotherapy in Integumentary Physiotherapy",
  ];

  return (
    <>
      {/* =========================================================
          ADMISSION DETAILS (ACCORDION)
      ========================================================= */}
      <section id="admission-details" className="bg-paper py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow">Course &amp; Scope</span>
            <h2 className="section-title mt-3">Admission Details</h2>
            <div className="title-bar mx-auto" />
          </Reveal>

          <Reveal className="space-y-4">
            {/* 1 */}
            <AccordionItem
              title="Bachelor of Physiotherapy (BPT)"
              isOpen={openIndex === 0}
              onToggle={() => toggleAccordion(0)}
            >
              <div className="space-y-4">
                <p>
                  Physiotherapy is the provision of services to people and
                  populations to develop, maintain, and restore maximum movement
                  and functional ability throughout the lifespan. Physiotherapy
                  is concerned with identifying and maximizing movement
                  potential, within the spheres of promotion, prevention,
                  treatment, and rehabilitation. It involves the interaction
                  between physiotherapists, patients or clients, families, and
                  caregivers, in a process of assessing movement potential and
                  establishing agreed-upon goals and objectives using knowledge
                  and skills unique to Physiotherapists.
                </p>
                <div className="inline-block bg-primary/5 border border-primary/10 px-4 py-2 rounded-lg text-[14px] text-primary font-semibold">
                  Duration: <span className="text-green-dark">5 Years</span>
                </div>
              </div>
            </AccordionItem>

            {/* 2 */}
            <AccordionItem
              title="Eligibility Criteria"
              isOpen={openIndex === 1}
              onToggle={() => toggleAccordion(1)}
            >
              <div className="space-y-3">
                <p>
                  To be eligible for this course, the candidate must have passed
                  the Higher Secondary Examination with at least{" "}
                  <strong className="text-primary">50%</strong>, with Physics,
                  Chemistry and Biology (or Botany and Zoology) as main
                  subjects.
                </p>
                <div className="p-3.5 bg-green-light border border-green/30 rounded-xl text-green-dark text-[14px] font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green" />
                  NEET appearance is mandatory.
                </div>
              </div>
            </AccordionItem>

            {/* 3 */}
            <AccordionItem
              title="Career Prospects & Job Profiles"
              isOpen={openIndex === 2}
              onToggle={() => toggleAccordion(2)}
            >
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {careerProfiles.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionItem>

            {/* 4 */}
            <AccordionItem
              title="Scope of Physiotherapy"
              isOpen={openIndex === 3}
              onToggle={() => toggleAccordion(3)}
            >
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {scopeFields.map((field, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    <span>{field}</span>
                  </li>
                ))}
              </ul>
            </AccordionItem>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          ADMISSIONS OPEN CTA
      ========================================================= */}
      <section
        id="admissions"
        className="relative overflow-hidden brand-gradient text-white"
      >
        <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-secondary/25 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-24 w-80 h-80 rounded-full bg-green/25 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-24 text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-white/15 border border-white/25 px-4 py-1.5 text-[13px] font-semibold tracking-wide">
              Admissions Open
            </span>
            <h2 className="font-display text-[28px] md:text-[42px] font-bold mt-5 leading-tight">
              Begin your career in physiotherapy at P K Das College.
            </h2>
            <p className="mt-4 text-white/85 max-w-xl mx-auto leading-relaxed">
              Speak with our admission team or send in your application. Seats
              for the new academic year are open.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary hover:bg-secondary hover:text-white transition rounded-full px-8 py-4 font-bold text-[15px] shadow-lg"
              >
                Apply Now
              </a>
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/70 text-white hover:bg-white hover:text-primary transition rounded-full px-8 py-4 font-bold text-[15px]"
              >
                Enquire Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}