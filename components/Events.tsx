import Image from "next/image";
import Reveal from "./Reveal";
import { events } from "../lib/content";
import eventone from "../public/events/eventone.webp";
import eventtwo from "../public/events/eventtwo.webp";
import eventthree from "../public/events/eventthree.webp";
import eventfour from "../public/events/eventfour.webp";
import eventfive from "../public/events/eventfive.webp";
import eventsix from "../public/events/eventsix.webp";
import eventseven from "../public/events/eventseven.webp";
import eventeight from "../public/events/eventeight.webp";
import eventnine from "../public/events/eventnine.webp";

const eventImages = [
    eventone,
    eventtwo,
    eventthree,
    eventfour,
    eventfive,
    eventsix,
    eventseven,
    eventeight,
    eventnine,
];

export default function Events() {
    return (
        <section
            id="events"
            className="scroll-mt-24"
        >
            <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
                {/* Section Header */}
                <Reveal className="max-w-2xl">
                    <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-green font-semibold">
                        Events
                    </span>

                    <h2 className="font-display text-[30px] md:text-[38px] font-semibold text-navy mt-3">
                        Past Events
                    </h2>

                    <p className="mt-4 text-navy/65 leading-relaxed">
                        A showcase of our vibrant campus life and the activities that
                        happen throughout the year.
                    </p>
                </Reveal>

                {/* Events Grid */}
                <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((e, i) => (
                        <Reveal
                            key={e.name}
                            delay={(i % 3) * 0.06}
                            className="bg-paper border border-mist rounded-2xl overflow-hidden card-hover flex flex-col"
                        >
                            {/* Event Image */}
                            <div className="relative w-full h-48 overflow-hidden bg-navy/5">
                                <Image
                                    src={eventImages[i] || eventone}
                                    alt={e.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            {/* Event Content */}
                            <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-display font-semibold text-navy text-[18px]">
                                        {e.name}
                                    </h3>

                                    <p className="text-navy/60 text-[14px] mt-2 leading-relaxed">
                                        {e.text}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}