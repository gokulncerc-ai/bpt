import Image from "next/image";
import Reveal from "./Reveal";
import { highlights } from "@/lib/content";
import Krishnakumar from "../public/krishna-kumar.jpg";
import principal from "../public/principal.jpg";

export default function MissionVision() {
  return (
    <>
      <div className="tick-rule bg-paper" />

      {/* =========================================================
          MISSION & VISION SECTION
      ========================================================= */}
      <section id="mission" className="bg-paper pt-20 md:pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-5 md:px-8">

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-7">
            <Reveal className="bg-[#A8C0E0] border border-navy/10 rounded-3xl p-9 md:p-11 relative overflow-hidden shadow-sm">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/20 blur-2xl" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-navy font-semibold">
                Our Mission
              </span>
              <p className="font-display text-[21px] md:text-[24px] leading-snug mt-4 text-navy">
                To educate and empower future physiotherapists with
                comprehensive clinical and professional skills enabling
                them to excel in leadership and research, contribute to
                communities, promote health, prevent disability, improve
                physical function and encourage active, healthy movement.
              </p>
            </Reveal>

            <Reveal
              delay={0.1}
              className="bg-[#A8C0E0] border border-navy/10 rounded-3xl p-9 md:p-11 relative overflow-hidden shadow-sm"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/20 blur-2xl" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-navy font-semibold">
                Our Vision
              </span>
              <p className="font-display text-[21px] md:text-[24px] leading-snug mt-4 text-navy">
                To produce highly motivated, competent and compassionate
                physiotherapists equipped with the knowledge, skills and
                professional values to meet national and international
                standards in physiotherapy education and practice.
              </p>
            </Reveal>
          </div>

          {/* Highlights Grid */}
          <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map((h, i) => (
              <Reveal
                key={h.n}
                delay={i * 0.05}
                className="bg-white rounded-2xl border border-mist p-6 card-hover"
              >
                <div className="font-mono text-amber-dark text-[12px] tracking-widest">
                  {h.n}
                </div>
                <div className="font-display text-navy font-semibold mt-2 text-[16px]">
                  {h.title}
                </div>
                <p className="text-navy/60 text-[13.5px] mt-1.5">{h.text}</p>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          MANAGEMENT SECTION (Continuous background, no gap)
      ========================================================= */}
      <section id="management" className="bg-paper pb-20 md:pb-28 pt-8">
        <div className="max-w-7xl mx-auto px-5 md:px-8">

          {/* Title Header */}
          <Reveal className="text-center mb-16">
            <h2 className="font-display text-[32px] md:text-[44px] font-semibold text-navy">
              Management
            </h2>
          </Reveal>

          <div className="space-y-24">

            {/* BLOCK 1: Dr. P. Krishnakumar (Image Left, Content Right) */}
            <Reveal className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="md:col-span-5">
                <div className="relative overflow-hidden rounded-xl border border-mist shadow-sm w-full aspect-[4/3] md:aspect-[5/4]">
                  <Image
                    src={Krishnakumar}
                    alt="Dr. P. Krishnakumar"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="md:col-span-7 flex flex-col justify-between h-full pt-1">
                <div className="space-y-4 text-navy/70 text-[15px] md:text-[16px] leading-relaxed">
                  <p>
                    The Nehru Group of Institutions enable our students and professionals to seek quality education and a successful career. All our efforts are aimed to make sure that we show them the right path and give that final push for students and faculty to achieve their true destiny.
                  </p>
                  <p>
                    Everything in this day and age is interconnected, and education is no exception. We at Nehru Group of Institutions always have focused on equipping our students with vital skill sets so as to compete effectively in today&apos;s global market.
                  </p>
                  <p>
                    Our support is with you always, and I wish you all the success in every endeavour you take up for the growth and development of the students and faculty of Nehru Group of Institutions.
                  </p>
                </div>
                {/* Signature Block (Right Aligned) */}
                <div className="mt-8 text-right">
                  <p className="font-semibold text-navy text-[16px]">
                    Dr.P.Krishnakumar
                  </p>
                  <p className="text-navy/65 text-[14px]">
                    CEO &amp; Secretary,
                  </p>
                  <p className="text-navy/65 text-[14px]">
                    Nehru Group of Institution
                  </p>
                </div>
              </div>
            </Reveal>


            {/* BLOCK 2: Dr. A. K. Nasia (Content Left, Image Right) */}
            <Reveal delay={0.1} className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="md:col-span-7 flex flex-col justify-between h-full pt-1 order-2 md:order-1">
                <div className="space-y-4 text-navy/70 text-[15px] md:text-[16px] leading-relaxed">
                  <p>
                    Learning is a never-ending process. It requires absolute involvement and complete commitment from both - the teacher &amp; the taught. It is an intellectual cum moral exercise where the &apos;giver and the receiver&apos; ought to vibrate on identical wave-lengths.
                  </p>
                  <p>
                    Your time as a student is one of the most exciting and challenging periods in your life, so choosing the right institution for higher studies is an important decision. Our &ldquo;Nehru College of Physiotherapy&rdquo; is striving extensively to achieve excellence by improving the standards and scaling new heights in the field of Physiotherapy.
                  </p>
                  <p className="italic text-navy/80 pt-2 font-medium">
                    &ldquo;A desire can change nothing; a decision can change something but a determination can change everything&rdquo;
                  </p>
                </div>

                {/* Signature Block (Left Aligned) */}
                <div className="mt-8 text-left">
                  <p className="font-semibold text-navy text-[16px]">
                    Dr.A.K.Nasia
                  </p>
                  <p className="text-navy/65 text-[14px]">
                    Principal,
                  </p>
                  <p className="text-navy/65 text-[14px]">
                    Nehru College of Physiotherapy
                  </p>
                </div>
              </div>

              <div className="md:col-span-5 order-1 md:order-2">
                <div className="relative overflow-hidden rounded-xl border border-mist shadow-sm w-full aspect-[4/3] md:aspect-[5/4]">
                  <Image
                    src={principal}
                    alt="Dr. A. K. Nasia"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </>
  );
}