import Image from "next/image";
import { contact } from "@/lib/content";
export default function Footer() {
  return (
    <footer className="bg-navy text-white/60">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid md:grid-cols-[1.2fr_1fr_1fr] gap-10">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <div className="font-display text-white font-semibold text-[16px]">
              P K Das College of Physiotherapy
            </div>
          </div>
          <p className="mt-4 text-[13.5px] leading-relaxed max-w-sm">
            {contact.address}. Affiliated to the Kerala University of Health
            Sciences (KUHS).
          </p>
        </div>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
            Explore
          </div>
          <ul className="space-y-2.5 text-[14px]">
            <li><a href="#about" className="hover:text-amber transition">About the College</a></li>
            <li><a href="#mission" className="hover:text-amber transition">Mission &amp; Vision</a></li>
            <li><a href="#departments" className="hover:text-amber transition">Departments</a></li>
            <li><a href="#admissions" className="hover:text-amber transition">Admissions</a></li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
            Contact
          </div>
          <ul className="space-y-2.5 text-[14px]">
            <li>
              <a href={contact.admissionHotlineHref} className="hover:text-amber transition">
                {contact.admissionHotline}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-amber transition">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row gap-2 justify-between text-[12.5px] text-white/35">
          <span>© {new Date().getFullYear()} P K Das College of Physiotherapy. All rights reserved.</span>
          <span>A unit of P K Das Institute of Medical Sciences</span>
        </div>
      </div>
    </footer>
  );
}
