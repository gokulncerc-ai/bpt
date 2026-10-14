import Image from "next/image";
import Reveal from "./Reveal";
import { departments } from "@/lib/content";

import departmentone from "../public/anatomymuseum.jpg";
import departmenttwo from "../public/physiologymuseum.jpg";
import departmentthree from "../public/microbiologylab.jpg";
import departmentfour from "../public/exercisetherapylab.webp";
import departmentfive from "../public/massagetherapy.jpg";
import departmentsix from "../public/electrotherapylab.jpg";
import departmentseven from "../public/cardiologylab.jpg";
import departmenteight from "../public/orthopaediclab.jpg";
import departmentnine from "../public/lasertherapy.avif";

// Array matching the order of the departments
const departmentImages = [
  departmentone,
  departmenttwo,
  departmentthree,
  departmentfour,
  departmentfive,
  departmentsix,
  departmentseven,
  departmenteight,
  departmentnine,
];

export default function Departments() {
  return (
    <>
      <section id="departments" className="bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-green font-semibold">
              Departments
            </span>
            <h2 className="font-display text-[30px] md:text-[38px] font-semibold text-navy mt-3">
              Nine labs. One clinical mindset
            </h2>
            <p className="mt-4 text-navy/65 leading-relaxed">
              At PK Das College of Physiotherapy, our departments are designed to turn theory into patient-ready skill.
            </p>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((d, i) => (
              <Reveal
                key={d.name}
                delay={(i % 3) * 0.06}
                className="bg-paper border border-mist rounded-2xl overflow-hidden card-hover flex flex-col"
              >
                {/* Department Image Container */}
                <div className="relative w-full h-48 overflow-hidden bg-navy/5">
                  <Image
                    src={departmentImages[i] || departmentone}
                    alt={d.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Card Text Content */}
                <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-navy text-[18px]">
                      {d.name}
                    </h3>
                    <p className="text-navy/60 text-[14px] mt-2 leading-relaxed">
                      {d.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <div className="tick-rule bg-paper" />
    </>
  );
}
