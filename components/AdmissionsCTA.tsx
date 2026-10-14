"use client";

import { useState } from "react";
import Reveal from "./Reveal";

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionItem({ title, isOpen, onToggle, children }: AccordionItemProps) {
  return (
    <div className="border border-mist rounded-2xl bg-white overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-paper"
      >
        <h3 className="font-display text-[18px] md:text-[20px] font-semibold text-navy">
          {title}
        </h3>
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full bg-paper border border-mist text-navy font-semibold text-lg transition-transform duration-300 ${isOpen ? "rotate-180 bg-green/10 text-green border-green/30" : ""
            }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-2 text-navy/75 text-[15px] leading-relaxed border-t border-mist/60 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}

export default function AdmissionsCTA() {
  // Manage state for open accordion sections (defaults to opening BPT details)
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
          ADMISSION DETAILS SECTION (ACCORDION)
      ========================================================= */}
      <section id="admission-details" className="bg-paper py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-green font-semibold">
              Course &amp; Scope
            </span>
            <h2 className="font-display text-[32px] md:text-[42px] font-semibold text-navy mt-3">
              Admission Details
            </h2>
          </Reveal>

          <Reveal className="space-y-4">
            {/* ACCORDION ITEM 1 */}
            <AccordionItem
              title="Bachelor of Physiotherapy (BPT)"
              isOpen={openIndex === 0}
              onToggle={() => toggleAccordion(0)}
            >
              <div className="space-y-4">
                <p>
                  Physiotherapy is the provision of services to people and populations to develop, maintain, and restore maximum movement and functional ability throughout the lifespan. Physiotherapy is concerned with identifying and maximizing movement potential, within the spheres of promotion, prevention, treatment, and rehabilitation. It involves the interaction between physiotherapists, patients or clients, families, and caregivers, in a process of assessing movement potential and establishing agreed-upon goals and objectives using knowledge and skills unique to Physiotherapists.
                </p>
                <div className="inline-block bg-navy/5 px-4 py-2 rounded-lg font-mono text-[13.5px] text-navy font-semibold">
                  Duration: <span className="text-green">5 Years</span>
                </div>
              </div>
            </AccordionItem>

            {/* ACCORDION ITEM 2 */}
            <AccordionItem
              title="Eligibility Criteria"
              isOpen={openIndex === 1}
              onToggle={() => toggleAccordion(1)}
            >
              <div className="space-y-3">
                <p>
                  The eligibility for studying this course, the candidate has to get <strong>50% pass</strong> in the Higher Secondary Examination with Physics, Chemistry, Biology (or Botany and Zoology) as their main subjects.
                </p>
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-[14px] font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  NEET Appearance is mandatory.
                </div>
              </div>
            </AccordionItem>

            {/* ACCORDION ITEM 3 */}
            <AccordionItem
              title="Career Prospects & Job Profiles"
              isOpen={openIndex === 2}
              onToggle={() => toggleAccordion(2)}
            >
              <ul className="grid sm:grid-cols-2 gap-2.5 pt-1">
                {careerProfiles.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-green font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionItem>
            {/* ACCORDION ITEM 4 */}
            <AccordionItem
              title="Scope of Physiotherapy"
              isOpen={openIndex === 3}
              onToggle={() => toggleAccordion(3)}
            >
              <ul className="grid sm:grid-cols-2 gap-2.5 pt-1">
                {scopeFields.map((field, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-green font-bold mt-0.5">•</span>
                    <span>{field}</span>
                  </li>
                ))}
              </ul>
            </AccordionItem>
          </Reveal>
        </div>
      </section>
      {/* =========================================================
          CURRENT ADMISSIONS CTA SECTION
      ========================================================= */}
      <section id="admissions" className="relative overflow-hidden bg-[#A8C0E0]">
        <div className="relative max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-24 text-center">
          <Reveal>
            <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-navy font-semibold">
              Admissions Open
            </span>
            <h2 className="font-display text-[30px] md:text-[42px] font-semibold text-navy mt-4 leading-tight">
              Begin your career in physiotherapy at P K Das College.
            </h2>
            <p className="mt-4 text-navy/80 max-w-xl mx-auto leading-relaxed">
              Speak with our admission team or send in your application
              seats for the new academic year are open.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeNZi8r2gbHvLu9wPG5GALbA4HN3PeTT5cK1WyEh1pHMDBeFw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-navy hover:bg-navy/90 transition rounded-full px-8 py-4 font-semibold text-[15px] text-white shadow-md"
              >
                Apply Now
              </a>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeNZi8r2gbHvLu9wPG5GALbA4HN3PeTT5cK1WyEh1pHMDBeFw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-navy/30 text-navy hover:bg-navy hover:text-white transition rounded-full px-8 py-4 font-semibold text-[15px]"
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
