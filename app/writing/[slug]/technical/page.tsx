import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/ArticlePage";
import { articles, bySlug } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = bySlug((await params).slug);
  if (!a) return {};
  return {
    title: a.technical.title,
    description: a.technical.dek,
    alternates: { canonical: `/writing/${a.slug}/technical` },
    openGraph: { title: a.technical.title, description: a.technical.dek, type: "article", ...(a.hero ? { images: [a.hero.src] } : {}) },
  };
}

export default async function Technical({ params }: { params: Promise<{ slug: string }> }) {
  const a = bySlug((await params).slug);
  if (!a) notFound();
  return <ArticlePage a={a} kind="technical" />;
}
