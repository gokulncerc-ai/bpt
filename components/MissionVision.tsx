import Image from "next/image";
import Reveal from "./Reveal";
import Krishnakumar from "../public/krishna-kumar.jpg";
import krishnadas from "../public/krishnadas.png";

// Content list for "Why Choose P K Das College of Physiotherapy?"
const whyChoosePoints = [
  {
    title: "Quality Academic Learning",
    desc: "Build a foundation in Physiotherapy through structured and comprehensive academic education.",
  },
  {
    title: "Practical Skill Development",
    desc: "Gain hands‑on learning opportunities to understand and apply Physiotherapy techniques effectively.",
  },
  {
    title: "Clinical Exposure",
    desc: "Get opportunities to understand healthcare settings, patient care, rehabilitation and professional practices.",
  },
  {
    title: "Modern Learning Environment",
    desc: "Learn in an environment with appropriate facilities and resources for Physiotherapy education.",
  },
  {
    title: "Experienced Faculty",
    desc: "Learn under the guidance of dedicated faculty members who support students throughout their academic journey.",
  },
  {
    title: "Student‑Focused Education",
    desc: "Receive guidance and support to encourage growth, confidence and overall development.",
  },
  {
    title: "Patient‑Centred Approach",
    desc: "Develop empathy, communication and professional values that're essential for responsible healthcare practice.",
  },
  {
    title: "Career‑Oriented Learning",
    desc: "Gain knowledge and skills that can help prepare students for career opportunities in Physiotherapy.",
  },
  {
    title: "Multidisciplinary Exposure",
    desc: "Understand the importance of teamwork and collaboration within the healthcare environment.",
  },
  {
    title: "Professional Development",
    desc: "Develop communication, critical thinking, teamwork and ethical skills alongside knowledge.",
  },
  {
    title: "New‑Age Learning Approach",
    desc: "As an established institution P K Das College of Physiotherapy aims to create a forward‑looking learning environment aligned with the evolving field of Physiotherapy.",
  },
  {
    title: "Supportive Campus Environment",
    desc: "Experience an academic atmosphere that encourages learning, participation and personal growth.",
  },
];

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function MissionVision() {
  return (
    <>
      <div className="tick-rule bg-paper" />

      {/* =========================================================
          MISSION & VISION
      ========================================================= */}
      <section id="mission" className="bg-paper pt-20 md:pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-7">
            {/* Mission — solid navy */}
            <Reveal className="brand-gradient rounded-3xl p-9 md:p-11 relative overflow-hidden shadow-lg text-white">
              <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-secondary/30 blur-2xl" />
              <span className="relative text-[13px] font-semibold tracking-wide text-secondary-light">
                Our Mission
              </span>
              <p className="relative text-[17px] md:text-[19px] leading-relaxed mt-4 font-medium">
                P K Das College of Physiotherapy’s mission is to provide
                students with a foundation in Physiotherapy through quality
                academic education, practical training and clinical learning.
                P K Das College of Physiotherapy aims to create a learning
                environment where students can develop professional knowledge,
                practical skills, communication abilities, critical thinking,
                empathy and ethical values. P K Das College of Physiotherapy is
                committed to encouraging students to follow practices and to
                develop the confidence needed to contribute effectively to
                patient care and rehabilitation.
              </p>
            </Reveal>

            {/* Vision — white with green accent */}
            <Reveal
              delay={0.1}
              className="bg-white border border-mist border-t-4 border-t-green rounded-3xl p-9 md:p-11 relative overflow-hidden shadow-sm"
            >
              <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-green/10 blur-2xl" />
              <span className="relative text-[13px] font-semibold tracking-wide text-green-dark">
                Our Vision
              </span>
              <p className="relative text-[17px] md:text-[19px] leading-relaxed mt-4 font-medium text-primary">
                P K Das College of Physiotherapy’s vision is to remain as a
                centre for quality Physiotherapy education and professional
                development. P K Das College of Physiotherapy aims to nurture
                confident, compassionate and responsible Physiotherapists who
                can contribute positively to healthcare and society. Through
                quality education, practical learning and clinical exposure
                P K Das College of Physiotherapy aspires to prepare students to
                meet the changing needs of the healthcare sector.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY CHOOSE
      ========================================================= */}
      <section
        id="why-choose"
        className="bg-paper py-12 md:py-16 border-t border-mist"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <span className="eyebrow">Key Advantages</span>
            <h2 className="section-title mt-2">
              Why Choose P K Das College of Physiotherapy?
            </h2>
            <div className="title-bar mx-auto" />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoosePoints.map((item, index) => (
              <Reveal
                key={item.title}
                delay={(index % 3) * 0.05}
                className="bg-white border border-mist rounded-2xl p-6 card-hover"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green/15 text-green-dark">
                    <CheckIcon />
                  </span>
                  <h3 className="font-display text-[17px] font-semibold text-primary leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="text-primary/70 text-[14px] leading-relaxed mt-3">
                  {item.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          MANAGEMENT
      ========================================================= */}
      <section id="management" className="bg-paper pb-20 md:pb-28 pt-12">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal className="text-center mb-16">
            <h2 className="section-title">Management</h2>
            <div className="title-bar mx-auto" />
          </Reveal>

          <div className="space-y-24">
            {/* BLOCK 1: Chairman (content left, image right) */}
            <Reveal
              delay={0.1}
              className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              <div className="md:col-span-7 flex flex-col justify-between h-full pt-1 order-2 md:order-1">
                <div className="space-y-4 text-primary/75 text-[15px] md:text-[16px] leading-relaxed">
                  <p>
                    It gives me pleasure to welcome you to P K Das College of
                    Physiotherapy. The establishment of this institution marks a
                    step toward providing aspiring healthcare professionals with
                    opportunities to build meaningful careers in Physiotherapy.
                  </p>
                  <p>
                    At P K Das College of Physiotherapy, P K Das College of
                    Physiotherapy believes that good education should combine
                    knowledge with experience. P K Das College of Physiotherapy
                    aims to provide students with an academic foundation along
                    with opportunities to develop practical and clinical skills.
                  </p>
                  <p className="border-l-4 border-green pl-4 text-primary font-medium">
                    P K Das College of Physiotherapy also believes in nurturing
                    qualities such as compassion, discipline, communication,
                    teamwork and professional responsibility. I wish all
                    students a successful and fulfilling journey at P K Das
                    College of Physiotherapy.
                  </p>
                </div>

                <div className="mt-8 text-left">
                  <p className="font-bold text-primary text-[16px]">
                    Adv. Dr. P. Krishnadas
                  </p>
                  <p className="text-secondary-dark font-semibold text-[14px]">
                    Chairman &amp; Managing Trustee
                  </p>
                  <p className="text-primary/65 text-[14px]">
                    Nehru group of institutions
                  </p>
                </div>
              </div>

              <div className="md:col-span-5 order-1 md:order-2">
                <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-lg ring-1 ring-mist w-full aspect-[4/3] md:aspect-[5/4]">
                  <Image
                    src={krishnadas}
                    alt="Adv. Dr. P. Krishnadas"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Reveal>

            {/* BLOCK 2: CEO (image left, content right) */}
            <Reveal className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="md:col-span-5">
                <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-lg ring-1 ring-mist w-full aspect-[4/3] md:aspect-[5/4]">
                  <Image
                    src={Krishnakumar}
                    alt="Dr. P. Krishnakumar"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="md:col-span-7 flex flex-col justify-between h-full pt-1">
                <div className="space-y-4 text-primary/75 text-[15px] md:text-[16px] leading-relaxed">
                  <p>
                    The Nehru Group of Institutions enable our students and
                    professionals to seek quality education and a successful
                    career. All our efforts are aimed to make sure that we show
                    them the right path and give that final push for students
                    and faculty to achieve their true destiny.
                  </p>
                  <p>
                    Everything in this day and age is interconnected and
                    education is no exception. We at Nehru Group of Institutions
                    always have focused on equipping our students with vital
                    skill sets so as to compete effectively in today&apos;s
                    global market.
                  </p>
                  <p>
                    Our support is with you always and I wish you all the
                    success in every endeavour you take up for the growth and
                    development of the students and faculty of Nehru Group of
                    Institutions.
                  </p>
                </div>

                <div className="mt-8 text-right">
                  <p className="font-bold text-primary text-[16px]">
                    Dr. P. Krishnakumar
                  </p>
                  <p className="text-secondary-dark font-semibold text-[14px]">
                    CEO &amp; Secretary
                  </p>
                  <p className="text-primary/65 text-[14px]">
                    Nehru Group of Institutions
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}