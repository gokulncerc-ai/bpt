import PageShell from "@/components/PageShell";
import Contact from "@/components/Contact";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata({
    title: "Contact & Location | P K Das College of Physiotherapy, Ottapalam",
    description:
        "Contact P K Das College of Physiotherapy, Vaniyamkulam, Ottapalam, Palakkad - 679522. Admission phone numbers, email and map directions.",
    path: "/contact/",
});

export default function Page() {
    return (
        <PageShell
            title="Contact Us"
            description="Address, phone numbers, email and a map to reach the campus."
            path="/contact/"
        >
            <Contact />
        </PageShell>
    );
}