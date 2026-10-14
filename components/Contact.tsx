import Reveal from "./Reveal";
import { contact } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" className="bg-green/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">

        {/* =========================================================
            SECTION HEADER
        ========================================================= */}
        <Reveal className="max-w-2xl">
          <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-green">
            Reach Now
          </span>

          <h2 className="font-display text-[30px] md:text-[38px] font-semibold text-navy mt-3">
            Find us in Vaniyamkulam
          </h2>
        </Reveal>


        {/* =========================================================
            CONTACT + MAP
        ========================================================= */}
        <div className="mt-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-8">


          {/* =======================================================
              CONTACT INFORMATION
          ======================================================= */}
          <Reveal className="space-y-6">

            {/* Campus Address */}
            <InfoCard
              accent="green"
              icon={<LocationIcon />}
              title="Campus Address"
            >
              {contact.institution}
              <br />
              {contact.address}
            </InfoCard>


            {/* Admission Hotline */}
            <InfoCard
              accent="amber"
              icon={<PhoneIcon />}
              title="Admission Hotline"
            >
              <div className="text-navy/45 text-[12.5px] mt-2 font-mono uppercase tracking-wide">
                Enquiry 2026–27
              </div>
              {contact.enquiryNumbers.map((n) => (
                <a
                  key={n}
                  href={`tel:${n}`}
                  className="block hover:text-green transition-colors"
                >
                  {n}
                </a>
              ))}
            </InfoCard>

            {/* Admission Mail */}
            <InfoCard
              accent="green"
              icon={<MailIcon />}
              title="Admission Mail"
            >
              <a
                href={`mailto:${contact.email}`}
                className="block hover:text-green transition-colors"
              >
                {contact.email}
              </a>
            </InfoCard>

          </Reveal>


          {/* =======================================================
              GOOGLE MAP
          ======================================================= */}
          <Reveal delay={0.1}>
            <div
              className="
                relative
                w-full
                h-[430px]
                md:h-[500px]
                rounded-2xl
                overflow-hidden
                border
                border-mist
                bg-white
                shadow-[0_12px_35px_rgba(16,35,75,0.08)]
              "
            >

              {/* Google Maps iframe */}
              <iframe
                title="P.K. Das Institute of Medical Sciences Hospital and Medical College location"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  border-0
                "
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={contact.mapEmbedSrc}
              />


              {/* =================================================
                  MAP LOCATION BADGE
              ================================================= */}
              <div
                className="
                  absolute
                  left-4
                  right-4
                  bottom-4
                  flex
                  flex-col
                  sm:flex-row
                  justify-between
                  items-stretch
                  sm:items-end
                  gap-3
                "
              >

                {/* Location information */}
                <div
                  className="
                    bg-white/95
                    backdrop-blur-md
                    rounded-xl
                    px-4
                    py-3
                    shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                    border
                    border-white
                  "
                >
                  <div className="font-display font-semibold text-navy text-[13.5px]">
                    P.K. Das Institute of Medical Sciences
                  </div>

                  <div className="text-navy/55 text-[12px] mt-0.5">
                    Vaniyamkulam, Ottapalam
                  </div>

                  <div className="text-navy/45 text-[11.5px] mt-0.5">
                    Palakkad District – 679522
                  </div>
                </div>

                {/* Open Google Maps button */}
                <a
                  href={contact.mapLinkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    bg-navy
                    hover:bg-navy-2
                    transition-all
                    duration-300
                    text-white
                    text-[13px]
                    font-semibold
                    rounded-xl
                    px-4
                    py-3
                    shadow-[0_10px_30px_rgba(0,0,0,0.18)]
                    flex
                    items-center
                    justify-center
                    gap-2
                    whitespace-nowrap
                    hover:-translate-y-0.5
                  "
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
  accent: "green" | "amber";
  children: React.ReactNode;
}) {
  const bg =
    accent === "green"
      ? "bg-green/10 text-green"
      : "bg-amber/10 text-amber-dark";

  return (
    <div
      className="
        bg-white
        border
        border-mist
        rounded-2xl
        p-7
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_15px_35px_rgba(16,35,75,0.08)]
      "
    >
      <div className="flex items-start gap-4">

        {/* Icon */}
        <div
          className={`
            shrink-0
            w-10
            h-10
            rounded-full
            flex
            items-center
            justify-center
            ${bg}
          `}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="min-w-0">

          <div className="font-display font-semibold text-navy text-[16px]">
            {title}
          </div>

          <div className="text-navy/65 text-[14.5px] mt-1.5 leading-relaxed break-words">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="m22 6-10 7L2 6" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
