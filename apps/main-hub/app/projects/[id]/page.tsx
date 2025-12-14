import { redirect } from "next/navigation";

const redirects: Record<string, string> = {
    geekslab: "/geekslab",
    nexastore: "/nexastore",
    qms: "/qms",
    ecommerce: "/nexastore",
    dashboard: "/evidence-layer",
};

export function generateStaticParams() {
    return Object.keys(redirects).map((id) => ({ id }));
}

export default function ProjectPage({ params }: { params: { id: string } }) {
    redirect(redirects[params.id] ?? "/portfolio");
}
