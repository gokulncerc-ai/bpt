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
            <span className="eyebrow">Departments</span>
            <h2 className="section-title mt-3">
              Nine labs. One clinical mindset
            </h2>
            <div className="title-bar" />
            <p className="mt-5 text-primary/70 leading-relaxed">
              At P K Das College of Physiotherapy, our departments are designed
              to turn theory into patient-ready skill.
            </p>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((d, i) => (
              <Reveal
                key={d.name}
                delay={(i % 3) * 0.06}
                className="group bg-paper border border-mist rounded-2xl overflow-hidden card-hover flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden bg-primary/5">
                  <Image
                    src={departmentImages[i] || departmentone}
                    alt={d.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/50 to-transparent" />
                  {/* Brand strip */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-secondary via-aqua to-green" />
                </div>

                {/* Text */}
                <div className="p-6 md:p-7 flex-1">
                  <h3 className="font-display font-semibold text-primary text-[18px]">
                    {d.name}
                  </h3>
                  <p className="text-primary/65 text-[14px] mt-2 leading-relaxed">
                    {d.text}
                  </p>
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