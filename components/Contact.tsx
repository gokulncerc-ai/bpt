import Reveal from "./Reveal";
import { contact } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" className="bg-paper overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 py-16 md:py-28">
        {/* ---------- Header ---------- */}
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Reach Now</span>
          <h2 className="section-title mt-3">Find us in Vaniyamkulam</h2>
          <div className="title-bar" />
        </Reveal>

        {/* grid-cols-1 = minmax(0,1fr): the column can never grow wider than the screen */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 lg:gap-8">
          {/* ---------- Contact info ---------- */}
          <Reveal className="min-w-0 space-y-5 sm:space-y-6">
            <InfoCard accent="primary" icon={<LocationIcon />} title="Campus Address">
              {contact.institution}
              <br />
              {contact.address}
            </InfoCard>

            <InfoCard accent="secondary" icon={<PhoneIcon />} title="Admission Hotline">
              <div className="text-primary/55 text-[13px] mt-2 font-semibold">
                Enquiry 2026–27
              </div>
              {contact.enquiryNumbers.map((n) => (
                <a
                  key={n}
                  href={`tel:${n}`}
                  className="block font-semibold hover:text-secondary-dark transition-colors"
                >
                  {n}
                </a>
              ))}
            </InfoCard>

            <InfoCard accent="green" icon={<MailIcon />} title="Admission Mail">
              <a
                href={`mailto:${contact.email}`}
                className="block font-semibold hover:text-secondary-dark transition-colors [overflow-wrap:anywhere]"
              >
                {contact.email}
              </a>
            </InfoCard>
          </Reveal>

          {/* ---------- Map ---------- */}
          <Reveal className="min-w-0" delay={0.1}>
            <div className="relative w-full rounded-2xl overflow-hidden border border-mist bg-white shadow-[0_12px_35px_rgba(30,60,118,0.12)]">
              {/* Map area */}
              <div className="relative w-full h-[300px] sm:h-[460px] md:h-[500px]">
                <iframe
                  title="P K DAS COLLEGE OF PHYSIOTHERAPY"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={contact.mapEmbedSrc}
                />
              </div>

              {/* Location badge + button:
                  - mobile: sits BELOW the map so it never covers it
                  - sm and up: floats over the bottom of the map */}
              <div className="flex flex-col gap-3 p-4 sm:p-0 sm:absolute sm:left-4 sm:right-4 sm:bottom-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0 bg-white/95 sm:backdrop-blur-md rounded-xl px-4 py-3 sm:shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-mist sm:border-0 border-l-4 border-l-secondary sm:border-l-4">
                  <div className="font-display font-bold text-primary text-[13px] sm:text-[13.5px] leading-snug">
                    P K DAS COLLEGE OF PHYSIOTHERAPY
                  </div>
                  <div className="text-primary/65 text-[12px] mt-0.5">
                    Vaniyamkulam, Ottapalam
                  </div>
                  <div className="text-primary/55 text-[11.5px] mt-0.5">
                    Palakkad District – 679522
                  </div>
                </div>

                <a
                  href={contact.mapLinkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-primary hover:bg-secondary transition-all duration-300 text-white text-[13px] font-semibold rounded-xl px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.18)] flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  Open in Google Maps
                  <ExternalIcon />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  accent,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  accent: "primary" | "secondary" | "green";
  children: React.ReactNode;
}) {
  const styles = {
    primary: { icon: "bg-primary/10 text-primary", bar: "border-l-primary" },
    secondary: { icon: "bg-secondary/15 text-secondary-dark", bar: "border-l-secondary" },
    green: { icon: "bg-green/15 text-green-dark", bar: "border-l-green" },
  }[accent];

  return (
    <div
      className={`w-full min-w-0 bg-white border border-mist border-l-4 ${styles.bar} rounded-2xl p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(30,60,118,0.12)]`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${styles.icon}`}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display font-bold text-primary text-[16px]">
            {title}
          </div>
          <div className="text-primary/70 text-[14.5px] mt-1.5 leading-relaxed break-words">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="m22 6-10 7L2 6" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}