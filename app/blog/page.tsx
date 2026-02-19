import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog SEO & GEO | Conseils Référencement 2026 – IndHack",
    description: "Articles experts sur le SEO, GEO, IA générative et stratégies digitales. Guides pratiques d'une consultante SEO freelance.",
    alternates: {
        canonical: "https://indhack.com/blog"
    },
    openGraph: {
        title: "Blog SEO & GEO | Conseils Référencement 2026 – IndHack",
        description: "Articles experts sur le SEO, GEO, IA générative et stratégies digitales. Guides pratiques d'une consultante SEO freelance.",
        url: "https://indhack.com/blog",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog SEO & GEO | Conseils Référencement 2026 – IndHack",
        description: "Articles experts sur le SEO, GEO, IA générative et stratégies digitales. Guides pratiques d'une consultante SEO freelance.",
    }
};

export default function BlogListingPage() {
    const posts = getAllPosts();

    return (
        <>
            <Breadcrumb items={getServiceBreadcrumb("Blog SEO", "/blog")} />
            <main className="pt-32 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <p className="text-sauge font-medium mb-4">Blog & Ressources</p>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink mb-6">
                        Conseils d'une <strong>consultante SEO</strong> pour votre croissance
                    </h1>
                    <p className="text-xl text-soft leading-relaxed">
                        Découvrez mes analyses sur le <strong>référencement naturel</strong>,
                        l'<strong>IA générative (GEO)</strong> et les stratégies digitales qui performent.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {["Tous", "IA & SEO", "Stratégie", "SEO Local", "Technique"].map((cat, i) => (
                        <button key={i} className="px-5 py-2 rounded-full bg-white border border-gray-100 text-sm font-medium hover:border-sauge hover:text-sauge transition-all shadow-sm">
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <article
                            key={post.slug}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-sauge/20 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <Link href={`/blog/${post.slug}`} className="block relative h-56 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-sauge shadow-sm">
                                    {post.category}
                                </div>
                            </Link>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs text-soft mb-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {format(new Date(post.date), "dd MMMM yyyy", { locale: fr })}
                                    </span>
                                </div>

                                <h2 className="text-xl font-heading font-bold text-ink mb-3 group-hover:text-sauge transition-colors leading-tight">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>

                                <div className="text-soft text-sm mb-6 line-clamp-3 leading-relaxed">
                                    <ReactMarkdown>{post.description}</ReactMarkdown>
                                </div>

                                <div className="mt-auto">
                                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sauge font-bold text-sm group/link">
                                        Lire l'article
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
        </>
    );
}
