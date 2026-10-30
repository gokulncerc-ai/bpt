import Link from "next/link";
import Reveal from "./Reveal";

// The page that opens when someone clicks "Kerala University of Health Sciences (KUHS)".
// Change this one line to point to your page. Keep the trailing "/" (next.config.js has trailingSlash: true).
// The page must exist, e.g. D:\BPT\app\kuhs-affiliation\page.tsx for "/kuhs-affiliation/".
const KUHS_PAGE = "https://www.pkdascollegeofphysiotherapy.com/#admissions";
export default function About() {
  return (
    <section id="about" className="bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
        <Reveal>
          <span className="eyebrow">Welcome</span>
          <h2 className="section-title mt-3 font-sans font-extrabold uppercase tracking-tight">
            <span className="text-[#1e3c76]">PK</span>{" "}
            <span className="text-[#29aad8]">DAS</span>{" "}
            <span className="text-[#1e3c76]">COLLEGE</span>
            <br className="hidden md:block" />
            <span className="text-[#1e3c76]">OF PHYSIOTHERAPY</span>
          </h2>
          <div className="title-bar" />
          <p className="mt-6 text-primary/75 leading-relaxed">
            Renowned as the top Physiotherapy college in Kerala, P K Das College
            of Physiotherapy offers the best Physiotherapy education. We offer
            hands‑on training for musculoskeletal disorders, sports injuries,
            neurological conditions, rehabilitation and patient care.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="space-y-5 text-primary/75 leading-relaxed text-[15.5px] border-l-4 border-secondary/60 pl-6 md:pl-8"
        >
          <p>
            Located at Vaniyamkulam, Ottapalam, Palakkad, P K Das College of
            Physiotherapy is affiliated with the{" "}
            <Link
              href={KUHS_PAGE}
              className="font-bold text-primary decoration-secondary decoration-2 underline-offset-4 transition-colors hover:text-secondary-dark"
            >
              Kerala University of Health Sciences (KUHS)
            </Link>
            . P K Das College of Physiotherapy is committed to nurturing
            skilled, compassionate and competent Physiotherapy professionals
            who can contribute meaningfully to the healthcare sector.
          </p>
          <p>
            P K Das College of Physiotherapy offers an eco‑friendly learning
            environment. It is supported by infrastructure, well‑equipped
            classrooms, advanced laboratories and clinical training facilities.
            With access to a superspeciality hospital and an advanced clinical
            setup, P K Das College of Physiotherapy students receive exposure
            to real‑world healthcare practice and patient care.
          </p>
          <p>
            Teaching and training at P K Das College of Physiotherapy are
            delivered through lectures, small‑group tutorials, presentations,
            practical sessions, laboratory‑based learning, peer‑group learning
            evaluation, clinical training and independent study. All are
            guided throughout by medical and Physiotherapy professionals.
          </p>
          <p>
            The focus at P K Das College of Physiotherapy, a leading
            Physiotherapy college in Kerala, extends beyond theory. It includes
            skill, clinical reasoning, communication, professional ethics and
            compassionate patient‑care. This prepares students to meet the
            evolving demands of the Physiotherapy profession.
          </p>
        </Reveal>
      </div>
    </section>
  );
}