import type { Metadata } from "next";

/**
 * One helper so every page gets: its own title, description, canonical address
 * and correct link-preview (Open Graph) tags.
 * `path` must start AND end with "/"  (next.config.js has trailingSlash: true).
 */
export function pageMetadata({
    title,
    description,
    path,
}: {
    title: string;
    description: string;
    path: string;
}): Metadata {
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            type: "website",
            siteName: "P K Das College of Physiotherapy",
            locale: "en_IN",
            url: path,
            title,
            description,
            images: [{ url: "/BPTLOGO3.png", alt: "P K Das College of Physiotherapy" }],
        },
    };
}