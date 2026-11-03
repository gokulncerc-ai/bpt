import PageShell from "@/components/PageShell";
import About from "@/components/About";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata({
    title: "About Us | P K Das College of Physiotherapy, Ottapalam",
    description:
        "About P K Das College of Physiotherapy, Vaniyamkulam, Ottapalam: a KUHS-affiliated physiotherapy college with laboratories and hospital-linked clinical training.",
    path: "/about/",
});

export default function Page() {
    return (
        <PageShell
            title="About Us"
            description="Our campus, our affiliation with KUHS and how we teach."
            path="/about/"
        >
            <About />
        </PageShell>
    );
}