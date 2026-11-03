import PageShell from "@/components/PageShell";
import MissionVision from "@/components/MissionVision";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata({
    title: "Mission, Vision & Management | P K Das College of Physiotherapy",
    description:
        "Read the mission, vision and management messages of P K Das College of Physiotherapy, and why students choose our KUHS-affiliated BPT programme in Palakkad.",
    path: "/mission-vision/",
});

export default function Page() {
    return (
        <PageShell
            title="Mission, Vision & Management"
            description="What we stand for, why students choose us, and a message from our management."
            path="/mission-vision/"
        >
            <MissionVision />
        </PageShell>
    );
}