
import PageShell from "@/components/PageShell";
import AdmissionsCTA from "@/components/AdmissionsCTA";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata({
    title: "BPT Admission in Kerala | Physiotherapy Colleges in Palakkad, Thrissur",
    description:
        "PK Das College of Physiotherapy offers BPT admission in Kerala, providing aspiring students with quality physiotherapy education to build a career in healthcare.",
    keywords: [
        "BPT Colleges in Kerala",
        "BPT Admission in Kerala",
        "Physiotherapy Admission in Kerala",
        "Bachelor of Physiotherapy Palakkad",
    ],
    path: "/admissions/",
});

export default function Page() {
    return (
        <PageShell
            title="Admissions"
            description="PK Das College of Physiotherapy offers BPT admission in Kerala, providing aspiring students with quality physiotherapy education to build a career in healthcare."
            path="/admissions/"
        >
            <AdmissionsCTA />
        </PageShell>
    );
}