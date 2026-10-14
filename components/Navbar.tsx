"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { contact } from "@/lib/content";

const APPLY_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSeNZi8r2gbHvLu9wPG5GALbA4HN3PeTT5cK1WyEh1pHMDBeFw/viewform";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* =========================================================
          TOP UTILITY BAR
      ========================================================= */}
      <div className="bg-[#A8C0E0] text-navy text-[12px]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-2.5 flex items-center justify-end gap-4">
          {/* Admission information */}
          <div className="text-navy font-bold tracking-wide text-[10px] sm:text-[11px] uppercase whitespace-nowrap bg-white/40 border border-white/40 px-3 py-1 rounded-full">
            ADMISSION ENQUIRY 2026–27 ·{" "}
            {contact.enquiryNumbers.join(" / ")}
          </div>
        </div>
      </div>

      {/* =========================================================
          MAIN HEADER
      ========================================================= */}
      <header className="sticky top-0 z-50 pt-3 pb-3 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8">
          <div
            className="
              relative
              h-[76px]
              md:h-[82px]
              px-5
              md:px-7
              rounded-[42px]
              bg-white/95
              backdrop-blur-xl
              border
              border-white/70
              shadow-[0_18px_45px_rgba(15,118,110,0.10)]
              flex
              items-center
              justify-between
              transition-all
              duration-300
              hover:shadow-[0_22px_55px_rgba(15,118,110,0.14)]
            "
          >
            {/* =====================================================
                LOGO
            ===================================================== */}
            <Link
              href="#top"
              onClick={closeMobileMenu}
              className="group flex items-center gap-3 shrink-0"
            >
              <div className="relative flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="P.K. Das Institute of Medical Sciences"
                  width={54}
                  height={54}
                  className="
                    h-[48px]
                    w-[48px]
                    md:h-[54px]
                    md:w-[54px]
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-[1.04]
                  "
                  priority
                />
              </div>
              <div className="leading-tight">
                <div className="font-display font-semibold text-[16px] md:text-[18px] text-navy tracking-[-0.01em]">
                  P K DAS COLLEGE
                </div>

                <div className="font-mono text-[9px] md:text-[10px] tracking-[0.18em] text-green uppercase mt-0.5">
                  OF PHYSIOTHERAPY
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center ml-auto mr-7 gap-7 xl:gap-9">
              <NavLink href="#about">About</NavLink>

              <NavLink href="#mission">
                Mission &amp; Vision
              </NavLink>

              <NavLink href="#departments">
                Departments
              </NavLink>

              {/* <NavLink href="#events">
                Events
              </NavLink> */}
              <NavLink href="#admissions">
                Admissions
              </NavLink>

              <NavLink href="#contact">
                Contact
              </NavLink>
            </nav>

            {/* =====================================================
                DESKTOP ACTION BUTTONS
            ===================================================== */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <a
                href={APPLY_FORM}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  h-[48px]
                  px-5
                  xl:px-6
                  rounded-full
                  border
                  border-navy/25
                  bg-white
                  text-navy
                  font-semibold
                  text-[13px]
                  xl:text-[14px]
                  transition-all
                  duration-300
                  hover:bg-navy
                  hover:text-white
                  hover:-translate-y-0.5
                "
              >
                Enquire Now
              </a>

              <a
                href={APPLY_FORM}
                className="
                    inline-flex
                    items-center
                    justify-center
                    h-[48px]
                    px-5
                    xl:px-6
                    rounded-full
                    bg-amber
                    text-white
                    font-semibold
                    text-[13px]
                    xl:text-[14px]
                    shadow-[0_12px_28px_-10px_rgba(245,158,11,0.65)]
                    transition-all
                    duration-300
                    hover:bg-amber-dark
                    hover:-translate-y-1
                    hover:shadow-[0_17px_35px_-10px_rgba(245,158,11,0.75)]
                  "
              >
                Apply Now
              </a>
            </div>

            {/* =====================================================
                MOBILE MENU BUTTON
            ===================================================== */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
              className="
                lg:hidden
                w-[48px]
                h-[48px]
                rounded-full
                bg-green
                text-white
                flex
                items-center
                justify-center
                shrink-0
                transition-all
                duration-300
                hover:bg-green-dark
                hover:scale-105
                focus:outline-none
                focus:ring-2
                focus:ring-green/30
              "
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            {/* =====================================================
                MOBILE MENU
            ===================================================== */}
            {mobileOpen && (
              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-[calc(100%+10px)]
                  rounded-[28px]
                  bg-white
                  border
                  border-navy/5
                  shadow-[0_25px_60px_rgba(15,118,110,0.16)]
                  overflow-hidden
                  lg:hidden
                  animate-fadeDown
                "
              >
                <div className="p-5">
                  {/* Mobile navigation */}
                  <nav className="flex flex-col gap-1">
                    <MobileNavLink
                      href="#about"
                      onClick={closeMobileMenu}
                    >
                      About
                    </MobileNavLink>

                    <MobileNavLink
                      href="#mission"
                      onClick={closeMobileMenu}
                    >
                      Mission &amp; Vision
                    </MobileNavLink>

                    <MobileNavLink
                      href="#departments"
                      onClick={closeMobileMenu}
                    >
                      Departments
                    </MobileNavLink>

                    <MobileNavLink
                      href="#events"
                      onClick={closeMobileMenu}
                    >
                      Events
                    </MobileNavLink>

                    <MobileNavLink
                      href="#admissions"
                      onClick={closeMobileMenu}
                    >
                      Admissions
                    </MobileNavLink>

                    <MobileNavLink
                      href="#contact"
                      onClick={closeMobileMenu}
                    >
                      Contact
                    </MobileNavLink>
                  </nav>

                  {/* Mobile CTA buttons */}
                  <div className="mt-5 pt-5 border-t border-navy/10 grid grid-cols-2 gap-3">
                    <a
                      href={APPLY_FORM}
                      onClick={closeMobileMenu}
                      className="
                        h-[50px]
                        rounded-full
                        border
                        border-navy/25
                        flex
                        items-center
                        justify-center
                        text-navy
                        font-semibold
                        text-[14px]
                        transition-all
                        duration-300
                        hover:bg-navy
                        hover:text-white
                      "
                    >
                      Enquire Now
                    </a>

                    <a
                      href={APPLY_FORM}
                      onClick={closeMobileMenu}
                      className="
                          h-[50px]
                          rounded-full
                          bg-amber
                          text-white
                          flex
                          items-center
                          justify-center
                          font-semibold
                          text-[14px]
                          shadow-[0_10px_25px_-10px_rgba(245,158,11,0.7)]
                          transition-all
                          duration-300
                          hover:bg-amber-dark
                        "
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

/* ================================================================
   DESKTOP NAV LINK
================================================================ */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="
        group
        relative
        py-3
        text-[14px]
        xl:text-[14.5px]
        font-semibold
        text-navy/80
        transition-colors
        duration-300
        hover:text-green
        whitespace-nowrap
      "
    >
      {children}

      {/* Underline */}
      <span
        className="
          absolute
          left-1/2
          bottom-1
          h-[2px]
          w-0
          rounded-full
          bg-green
          -translate-x-1/2
          transition-all
          duration-300
          group-hover:w-full
        "
      />

      {/* Small hover dot */}
      <span
        className="
          absolute
          left-1/2
          top-1/2
          w-2
          h-2
          rounded-full
          bg-green
          opacity-0
          scale-0
          -translate-x-1/2
          -translate-y-1/2
          transition-all
          duration-300
          group-hover:opacity-[0.06]
          group-hover:scale-[8]
          pointer-events-none
        "
      />
    </a>
  );
}

/* ================================================================
   MOBILE NAV LINK
================================================================ */

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="
        group
        flex
        items-center
        justify-between
        min-h-[52px]
        px-4
        rounded-2xl
        text-[15px]
        font-semibold
        text-navy
        transition-all
        duration-300
        hover:bg-[#F0FBF7]
        hover:text-green
        hover:translate-x-1
      "
    >
      <span>{children}</span>

      <span
        className="
          text-green
          opacity-0
          -translate-x-2
          transition-all
          duration-300
          group-hover:opacity-100
          group-hover:translate-x-0
        "
      >
        <ArrowIcon />
      </span>
    </a>
  );
}

/* ================================================================
   ICONS
================================================================ */

function PhoneIcon() {
  return (
    <svg
      width="13"
      height="13"
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
      width="13"
      height="13"
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

function MenuIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
