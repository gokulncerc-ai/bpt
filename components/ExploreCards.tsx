import Link from "next/link";
import Reveal from "./Reveal";

const CARDS = [
    {
        href: "/about/",
        title: "About the College",
        text: "Our campus, our KUHS affiliation and how we teach and train students.",
        bar: "from-secondary to-aqua",
    },
    {
        href: "/mission-vision/",
        title: "Mission, Vision & Management",
        text: "What we stand for, why students choose us, and a message from our management.",
        bar: "from-primary to-secondary",
    },
    {
        href: "/departments/",
        title: "Departments & Labs",
        text: "Nine labs and museums that turn theory into patient-ready skill.",
        bar: "from-aqua to-green",
    },
    {
        href: "/admissions/",
        title: "Admissions",
        text: "BPT course details, eligibility, career scope and how to apply.",
        bar: "from-green to-secondary",
    },
    {
        href: "/contact/",
        title: "Contact & Location",
        text: "Address, phone numbers, email and a map to reach the campus.",
        bar: "from-secondary to-primary",
    },
];

/** Home-page tiles that link to every inner page (good for visitors AND for Google). */
export default function ExploreCards() {
    return (
        <>
            <section className="bg-paper">
                <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
                    <Reveal className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
                        <span className="eyebrow">Explore</span>
                        <h2 className="section-title mt-2">Find what you are looking for</h2>
                        <div className="title-bar mx-auto" />
                    </Reveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CARDS.map((c, i) => (
                            <Reveal key={c.href} delay={(i % 3) * 0.06}>
                                <Link
                                    href={c.href}
                                    className="group block h-full bg-white border border-mist rounded-2xl overflow-hidden card-hover"
                                >
                                    <div className={`h-1.5 bg-gradient-to-r ${c.bar}`} />
                                    <div className="p-6 md:p-7">
                                        <h3 className="font-display text-[18px] font-semibold text-primary">{c.title}</h3>
                                        <p className="mt-2 text-[14px] leading-relaxed text-primary/70">{c.text}</p>
                                        <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-secondary-dark">
                                            Read more
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
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m13 6 6 6-6 6" />
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- closing call to action ---------- */}
            <section className="relative overflow-hidden brand-gradient text-white">
                <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-secondary/25 blur-3xl pointer-events-none" />
                <div className="absolute -right-20 -bottom-24 w-80 h-80 rounded-full bg-green/25 blur-3xl pointer-events-none" />
                <div className="relative max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20 text-center">
                    <Reveal>
                        <span className="inline-block rounded-full bg-white/15 border border-white/25 px-4 py-1.5 text-[13px] font-semibold tracking-wide">
                            Admissions Open
                        </span>
                        <h2 className="font-display text-[26px] md:text-[38px] font-bold mt-5 leading-tight">
                            Begin your career in physiotherapy at P K Das College.
                        </h2>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/admissions/"
                                className="bg-white text-primary hover:bg-secondary hover:text-white transition rounded-full px-8 py-4 font-bold text-[15px] shadow-lg"
                            >
                                Admission details
                            </Link>
                            <Link
                                href="/contact/"
                                className="border border-white/70 text-white hover:bg-white hover:text-primary transition rounded-full px-8 py-4 font-bold text-[15px]"
                            >
                                Contact us
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}