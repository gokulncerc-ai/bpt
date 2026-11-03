"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Apply / Enquire still open the Google Form (change here if you want a different address)
const APPLY_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSeNZi8r2gbHvLu9wPG5GALbA4HN3PeTT5cK1WyEh1pHMDBeFw/viewform";

// Every menu item is now a real page (no # links).
const NAV_ITEMS = [
  { href: "/about/", label: "About" },
  { href: "/mission-vision/", label: "Mission & Vision" },
  { href: "/departments/", label: "Departments" },
  { href: "/admissions/", label: "Admissions" },
  { href: "/contact/", label: "Contact" },
];

const trim = (p: string) => p.replace(/\/+$/, "") || "/";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const isActive = (href: string) => trim(pathname) === trim(href);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 pt-3 pb-3 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8">
        <div className="relative h-[76px] md:h-[82px] px-5 md:px-7 rounded-[42px] bg-white/95 backdrop-blur-xl border border-slate-100 shadow-[0_18px_45px_rgba(30,60,118,0.08)] flex items-center justify-between transition-all duration-300 hover:shadow-[0_22px_55px_rgba(30,60,118,0.12)]">
          {/* ===================== LOGO & BRANDING ===================== */}
          <Link href="/" onClick={closeMobileMenu} className="group flex items-center gap-3 shrink-0">
            <div className="relative flex items-center justify-center">
              <Image
                src="/BPTLOGO.png"
                alt="P K DAS COLLEGE OF PHYSIOTHERAPY"
                width={54}
                height={54}
                className="h-[48px] w-[48px] md:h-[54px] md:w-[54px] object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                priority
              />
            </div>

            <div className="leading-none">
              <div className="font-sans font-extrabold text-[18px] md:text-[22px] tracking-tight">
                <span className="text-[#1e3c76]">PK</span> <span className="text-[#29aad8]">DAS</span>
              </div>
              <div className="font-sans font-extrabold text-[9px] md:text-[10.5px] tracking-[0.08em] text-[#1e3c76] uppercase mt-1">
                COLLEGE OF PHYSIOTHERAPY
              </div>
            </div>
          </Link>

          {/* ===================== DESKTOP LINKS ===================== */}
          <nav aria-label="Main" className="hidden lg:flex items-center ml-auto mr-7 gap-7 xl:gap-9">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href} active={isActive(item.href)}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* ===================== DESKTOP BUTTONS ===================== */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href={APPLY_FORM}
              className="group inline-flex items-center justify-center h-[48px] px-5 xl:px-6 rounded-full border border-[#1e3c76]/30 bg-white text-[#1e3c76] font-semibold text-[13px] xl:text-[14px] transition-all duration-300 hover:bg-[#1e3c76] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-8px_rgba(30,60,118,0.4)]"
            >
              Enquire Now
            </a>
            <a
              href={APPLY_FORM}
              className="inline-flex items-center justify-center h-[48px] px-5 xl:px-6 rounded-full bg-[#43ab5e] text-white font-semibold text-[13px] xl:text-[14px] shadow-[0_12px_28px_-10px_rgba(67,171,94,0.5)] transition-all duration-300 hover:bg-[#389450] hover:-translate-y-1 hover:shadow-[0_17px_35px_-10px_rgba(67,171,94,0.65)]"
            >
              Apply Now
            </a>
          </div>

          {/* ===================== MOBILE TOGGLE ===================== */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className="lg:hidden w-[48px] h-[48px] rounded-full bg-[#1e3c76] text-white flex items-center justify-center shrink-0 transition-all duration-300 hover:bg-[#29aad8] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#29aad8]/40"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* ===================== MOBILE MENU ===================== */}
          {mobileOpen && (
            <div className="absolute left-0 right-0 top-[calc(100%+10px)] rounded-[28px] bg-white border border-slate-100 shadow-[0_25px_60px_rgba(30,60,118,0.15)] overflow-hidden lg:hidden animate-fadeDown">
              <div className="p-5">
                <nav aria-label="Mobile" className="flex flex-col gap-1">
                  <MobileNavLink href="/" active={isActive("/")} onClick={closeMobileMenu}>
                    Home
                  </MobileNavLink>
                  {NAV_ITEMS.map((item) => (
                    <MobileNavLink
                      key={item.href}
                      href={item.href}
                      active={isActive(item.href)}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </MobileNavLink>
                  ))}
                </nav>

                <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <a
                    href={APPLY_FORM}
                    onClick={closeMobileMenu}
                    className="h-[50px] rounded-full border border-[#1e3c76]/30 flex items-center justify-center text-[#1e3c76] font-semibold text-[14px] transition-all duration-300 hover:bg-[#1e3c76] hover:text-white"
                  >
                    Enquire Now
                  </a>
                  <a
                    href={APPLY_FORM}
                    onClick={closeMobileMenu}
                    className="h-[50px] rounded-full bg-[#43ab5e] text-white flex items-center justify-center font-semibold text-[14px] shadow-[0_10px_25px_-10px_rgba(67,171,94,0.6)] transition-all duration-300 hover:bg-[#389450]"
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
  );
}

/* ================================================================
   DESKTOP NAV LINK (highlights the page you are on)
================================================================ */
function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group relative py-3 text-[14px] xl:text-[14.5px] font-semibold transition-colors duration-300 hover:text-[#29aad8] whitespace-nowrap ${active ? "text-[#29aad8]" : "text-[#1e3c76]/85"
        }`}
    >
      {children}
      <span
        className={`absolute left-1/2 bottom-1 h-[2.5px] rounded-full bg-[#29aad8] -translate-x-1/2 transition-all duration-300 group-hover:w-full ${active ? "w-full" : "w-0"
          }`}
      />
    </Link>
  );
}

/* ================================================================
   MOBILE NAV LINK
================================================================ */
function MobileNavLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`group flex items-center justify-between min-h-[52px] px-4 rounded-2xl text-[15px] font-semibold transition-all duration-300 hover:bg-[#29aad8]/10 hover:text-[#29aad8] hover:translate-x-1 ${active ? "bg-[#29aad8]/10 text-[#29aad8]" : "text-[#1e3c76]"
        }`}
    >
      <span>{children}</span>
      <span
        className={`text-[#29aad8] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
          }`}
      >
        <ArrowIcon />
      </span>
    </Link>
  );
}

/* ================================================================
   ICONS
================================================================ */
function MenuIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}