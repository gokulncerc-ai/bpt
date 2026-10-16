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
              border-slate-100
              shadow-[0_18px_45px_rgba(30,60,118,0.08)]
              flex
              items-center
              justify-between
              transition-all
              duration-300
              hover:shadow-[0_22px_55px_rgba(30,60,118,0.12)]
            "
          >
            {/* =====================================================
                LOGO & BRANDING
            ===================================================== */}
            <Link
              href="#top"
              onClick={closeMobileMenu}
              className="group flex items-center gap-3 shrink-0"
            >
              <div className="relative flex items-center justify-center">
                <Image
                  src="/BPTLOGO.png"
                  alt="P K DAS COLLEGE OF PHYSIOTHERAPY"
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

              {/* Exact Brand Logo Typography Match */}
              <div className="leading-none">
                {/* PK DAS Line */}
                <div className="font-sans font-extrabold text-[18px] md:text-[22px] tracking-tight">
                  <span className="text-[#1e3c76]">PK</span>{" "}
                  <span className="text-[#29aad8]">DAS</span>
                </div>

                {/* COLLEGE OF PHYSIOTHERAPY Line */}
                <div className="font-sans font-extrabold text-[9px] md:text-[10.5px] tracking-[0.08em] text-[#1e3c76] uppercase mt-1">
                  COLLEGE OF PHYSIOTHERAPY
                </div>
              </div>
            </Link>

            {/* =====================================================
                DESKTOP NAVIGATION LINKS
            ===================================================== */}
            <nav className="hidden lg:flex items-center ml-auto mr-7 gap-7 xl:gap-9">
              <NavLink href="#about">About</NavLink>

              <NavLink href="#mission">Mission &amp; Vision</NavLink>

              <NavLink href="#departments">Departments</NavLink>

              <NavLink href="#admissions">Admissions</NavLink>

              <NavLink href="#contact">Contact</NavLink>
            </nav>

            {/* =====================================================
                DESKTOP ACTION BUTTONS
            ===================================================== */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* Enquire Button - Primary Navy Outline */}
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
                  border-[#1e3c76]/30
                  bg-white
                  text-[#1e3c76]
                  font-semibold
                  text-[13px]
                  xl:text-[14px]
                  transition-all
                  duration-300
                  hover:bg-[#1e3c76]
                  hover:text-white
                  hover:-translate-y-0.5
                  hover:shadow-[0_10px_25px_-8px_rgba(30,60,118,0.4)]
                "
              >
                Enquire Now
              </a>

              {/* Apply Button - Brand Green Solid (#43ab5e) */}
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
                  bg-[#43ab5e]
                  text-white
                  font-semibold
                  text-[13px]
                  xl:text-[14px]
                  shadow-[0_12px_28px_-10px_rgba(67,171,94,0.5)]
                  transition-all
                  duration-300
                  hover:bg-[#389450]
                  hover:-translate-y-1
                  hover:shadow-[0_17px_35px_-10px_rgba(67,171,94,0.65)]
                "
              >
                Apply Now
              </a>
            </div>

            {/* =====================================================
                MOBILE MENU TOGGLE BUTTON (#1e3c76)
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
                bg-[#1e3c76]
                text-white
                flex
                items-center
                justify-center
                shrink-0
                transition-all
                duration-300
                hover:bg-[#29aad8]
                hover:scale-105
                focus:outline-none
                focus:ring-2
                focus:ring-[#29aad8]/40
              "
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            {/* =====================================================
                MOBILE DROPDOWN MENU
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
                  border-slate-100
                  shadow-[0_25px_60px_rgba(30,60,118,0.15)]
                  overflow-hidden
                  lg:hidden
                  animate-fadeDown
                "
              >
                <div className="p-5">
                  <nav className="flex flex-col gap-1">
                    <MobileNavLink href="#about" onClick={closeMobileMenu}>
                      About
                    </MobileNavLink>

                    <MobileNavLink href="#mission" onClick={closeMobileMenu}>
                      Mission &amp; Vision
                    </MobileNavLink>

                    <MobileNavLink
                      href="#departments"
                      onClick={closeMobileMenu}
                    >
                      Departments
                    </MobileNavLink>

                    <MobileNavLink
                      href="#admissions"
                      onClick={closeMobileMenu}
                    >
                      Admissions
                    </MobileNavLink>

                    <MobileNavLink href="#contact" onClick={closeMobileMenu}>
                      Contact
                    </MobileNavLink>
                  </nav>

                  {/* Mobile CTAs */}
                  <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-2 gap-3">
                    <a
                      href={APPLY_FORM}
                      onClick={closeMobileMenu}
                      className="
                        h-[50px]
                        rounded-full
                        border
                        border-[#1e3c76]/30
                        flex
                        items-center
                        justify-center
                        text-[#1e3c76]
                        font-semibold
                        text-[14px]
                        transition-all
                        duration-300
                        hover:bg-[#1e3c76]
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
                        bg-[#43ab5e]
                        text-white
                        flex
                        items-center
                        justify-center
                        font-semibold
                        text-[14px]
                        shadow-[0_10px_25px_-10px_rgba(67,171,94,0.6)]
                        transition-all
                        duration-300
                        hover:bg-[#389450]
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
   DESKTOP NAV LINK COMPONENT
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
        text-[#1e3c76]/85
        transition-colors
        duration-300
        hover:text-[#29aad8]
        whitespace-nowrap
      "
    >
      {children}

      {/* Underline - Cyan (#29aad8) */}
      <span
        className="
          absolute
          left-1/2
          bottom-1
          h-[2.5px]
          w-0
          rounded-full
          bg-[#29aad8]
          -translate-x-1/2
          transition-all
          duration-300
          group-hover:w-full
        "
      />

      {/* Subtle Hover Glow Spot */}
      <span
        className="
          absolute
          left-1/2
          top-1/2
          w-2
          h-2
          rounded-full
          bg-[#1ba2bd]
          opacity-0
          scale-0
          -translate-x-1/2
          -translate-y-1/2
          transition-all
          duration-300
          group-hover:opacity-[0.08]
          group-hover:scale-[8]
          pointer-events-none
        "
      />
    </a>
  );
}

/* ================================================================
   MOBILE NAV LINK COMPONENT
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
        text-[#1e3c76]
        transition-all
        duration-300
        hover:bg-[#29aad8]/10
        hover:text-[#29aad8]
        hover:translate-x-1
      "
    >
      <span>{children}</span>

      <span
        className="
          text-[#29aad8]
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
   SVG ICONS
================================================================ */

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