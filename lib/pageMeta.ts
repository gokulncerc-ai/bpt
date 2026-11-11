
import type { Metadata } from "next";

export function pageMetadata({
    title,
    description,
    path,
    keywords,
}: {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
}): Metadata {
    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: path,
        },
        openGraph: {
            type: "website",
            siteName: "P K Das College of Physiotherapy",
            locale: "en_IN",
            url: path,
            title,
            description,
            images: [
                {
                    url: "/BPTLOGO3.png",
                    alt: "P K Das College of Physiotherapy",
                },
            ],
        },
    };
}