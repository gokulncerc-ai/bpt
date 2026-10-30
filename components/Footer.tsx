import Link from "next/link";
import Image from "next/image";
import { contact } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative bg-primary-dark text-white/75">
      {/* Brand colour strip along the top edge */}
      <div className="h-1 w-full bg-gradient-to-r from-secondary via-aqua to-green" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid md:grid-cols-[1.2fr_1fr_1fr] gap-10">
        {/* ---------- Brand ---------- */}
        <div>
          <div className="flex items-center gap-4">
            {/* The logo has navy text, so it sits on a white tile */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white p-2.5 shadow-md border border-slate-100">
              <Image
                src="/BPTLOGO.png"
                alt="P K Das College of Physiotherapy logo"
                width={72}
                height={72}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="font-display text-white font-bold text-[16px] leading-snug">
              P K Das College
              <br />
              of Physiotherapy
            </div>
          </div>
          <p className="mt-5 text-[14px] leading-relaxed max-w-sm">
            {contact.address}. Affiliated to the Kerala University of Health
            Sciences (KUHS).
          </p>
        </div>

        {/* ---------- Explore ---------- */}
        <div>
          <div className="text-white font-semibold text-[14px] mb-4 pb-2 border-b-2 border-secondary inline-block">
            Explore
          </div>
          <ul className="space-y-2.5 text-[14px]">
            <li>
              <a href="/#about" className="hover:text-secondary-light transition">
                About the College
              </a>
            </li>
            <li>
              <a href="/#mission" className="hover:text-secondary-light transition">
                Mission &amp; Vision
              </a>
            </li>
            <li>
              <a href="/#departments" className="hover:text-secondary-light transition">
                Departments
              </a>
            </li>
            <li>
              <a href="/#admissions" className="hover:text-secondary-light transition">
                Admissions
              </a>
            </li>
            <li>
              <Link href="/application-form-2026/" className="hover:text-secondary-light transition">
                Online Application Form
              </Link>
            </li>
          </ul>
        </div>

        {/* ---------- Contact ---------- */}
        <div>
          <div className="text-white font-semibold text-[14px] mb-4 pb-2 border-b-2 border-green inline-block">
            Contact
          </div>
          <ul className="space-y-2.5 text-[14px]">
            <li>
              <a
                href={contact.admissionHotlineHref}
                className="font-semibold hover:text-secondary-light transition"
              >
                {contact.admissionHotline}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-secondary-light transition break-words"
              >
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row gap-2 justify-between text-[12.5px] text-white/55">
          <span>
            © {new Date().getFullYear()} P K Das College of Physiotherapy. All
            rights reserved.
          </span>
          <span>A unit of P K Das Institute of Medical Sciences</span>
        </div>
      </div>
    </footer>
  );
}
