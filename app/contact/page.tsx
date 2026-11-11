
import PageShell from "@/components/PageShell";
import Contact from "@/components/Contact";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata({
    title: "Contact PK Das College of Physiotherapy | Physiotherapy College in Kerala",
    description:
        "PK Das College of Physiotherapy welcomes enquiries about BPT admissions, course details and eligibility. Contact us to learn more about studying at one of the top physiotherapy colleges in Kerala.",
    keywords: [
        "PK Das College of Physiotherapy Contact",
        "Physiotherapy Colleges in Kerala",
        "BPT Colleges in Kerala",
        "Physiotherapy College in Ottapalam",
    ],
    path: "/contact/",
});

export default function Page() {
    return (
        <PageShell
            title="Contact Us"
            description="PK Das College of Physiotherapy welcomes enquiries about BPT admissions, course details and eligibility. Contact us to learn more about studying at one of the top physiotherapy colleges in Kerala."
            path="/contact/"
        >
            <Contact />
        </PageShell>
    );
}