import Reveal from "./Reveal";
export default function About() {
  return (
    <section id="about" className="bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
        <Reveal>
          <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-green">
            Welcome
          </span>
          <h2 className="font-display text-[30px] md:text-[38px] font-semibold text-navy mt-3 leading-tight">
            P K Das College
            <br className="hidden md:block" /> of Physiotherapy
          </h2>
          <p className="mt-5 text-navy/70 leading-relaxed">
          Renowned as the top Physiotherapy college in Kerala, P K Das College of Physiotherapy offers the best Physiotherapy education. 
          We offer hands‑on training for musculoskeletal disorders sports injuries, neurological conditions, rehabilitation and patient care.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5 text-navy/75 leading-relaxed text-[15.5px]">
        
          <p>
          Located at Vaniyamkulam, Ottapalam, Palakkad, P K Das College of Physiotherapy is affiliated with the {" "}
            <strong className="text-navy">
              Kerala University of Health Sciences (KUHS)
            </strong>
            . P K Das College of Physiotherapy is committed to nurturing skilled,
            compassionate and competent Physiotherapy professionals who can contribute meaningfully to the healthcare sector.
          </p>
          <p>
          P K Das College of Physiotherapy offers an eco‑friendly learning environment. It is supported by infrastructure, 
          well‑equipped classrooms, advanced laboratories and clinical training facilities. With access to a superspeciality hospital
          and an advanced clinical setup P K Das College of Physiotherapy students receive exposure to real‑world healthcare practice and patient care.
          </p>
          <p>
          Teaching and training at P K Das College of Physiotherapy are delivered through lectures, small‑group tutorials,
          presentations, practical sessions, laboratory‑based learning, peer‑group learning evaluation, clinical training
          and independent study. All are guided throughout by medical and Physiotherapy professionals.
          </p>
          <p>
          The focus at P K Das College of Physiotherapy- Leading Physiotherapy college in Kerala, extends beyond theory. 
          It includes skill, clinical reasoning, communication, professional ethics and compassionate patient‑care. 
          This prepares students to meet the evolving demands of the Physiotherapy profession.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
