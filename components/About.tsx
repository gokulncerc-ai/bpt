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
            Best Physiotherapy course in Palakkad offering one of the
            leading physiotherapy education programmes in Ottapalam,
            Vaniyamkulam, with comprehensive knowledge and hands-on training
            across musculoskeletal disorders, sports injuries, neurological
            conditions, rehabilitation and patient care.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5 text-navy/75 leading-relaxed text-[15.5px]">
          <p>
            Located at Vaniyamkulam, Ottapalam, Palakkad, the college is
            affiliated to the{" "}
            <strong className="text-navy">
              Kerala University of Health Sciences (KUHS)
            </strong>
            . We are committed to nurturing highly skilled, compassionate and
            competent physiotherapy professionals who can contribute
            meaningfully to the healthcare sector.
          </p>
          <p>
            The college offers a stimulating and eco-friendly learning
            environment supported by modern infrastructure, well-equipped
            classrooms, advanced laboratories and clinical training
            facilities. With access to a superspeciality hospital and an
            advanced clinical setup, students receive valuable exposure to
            real-world healthcare practice and patient care.
          </p>
          <p>
            Teaching and training are delivered through lectures, small-group
            tutorials, presentations, practical sessions, laboratory-based
            learning, peer-group learning, clinical training and independent
            study guided throughout by experienced medical and
            physiotherapy professionals.
          </p>
          <p>
            The focus extends beyond theory to practical skill, clinical
            reasoning, communication, professional ethics and compassionate
            patient care preparing students to meet the evolving demands of
            the physiotherapy profession.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
