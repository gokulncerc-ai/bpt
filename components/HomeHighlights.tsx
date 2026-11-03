import Reveal from "./Reveal";
import { highlights } from "@/lib/content";

/** Four key facts about the college, taken from `highlights` in lib/content.ts. */
export default function HomeHighlights() {
    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
                <Reveal className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
                    <span className="eyebrow">Why students choose us</span>
                    <h2 className="section-title mt-2">A physiotherapy college built on clinical learning</h2>
                    <div className="title-bar mx-auto" />
                </Reveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {highlights.map((h, i) => (
                        <Reveal
                            key={h.title}
                            delay={i * 0.06}
                            className="bg-paper border border-mist rounded-2xl p-6 card-hover"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary-dark text-[14px] font-bold">
                                {h.n}
                            </span>
                            <h3 className="mt-4 font-display text-[17px] font-semibold text-primary">{h.title}</h3>
                            <p className="mt-2 text-[14px] leading-relaxed text-primary/70">{h.text}</p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}