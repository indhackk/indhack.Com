import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Phone } from "lucide-react";
import { Breadcrumb, getBlogBreadcrumb } from "@/components/Breadcrumb";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { AuditCTA } from "@/components/blog/AuditCTA";
import { BlogServiceCTA } from "@/components/BlogServiceCTA";
import { InArticleCTA } from "@/components/blog/InArticleCTA";
import type { Metadata } from "next";

interface PageProps {
    params: { slug: string };
}

// Fonction pour extraire les FAQ du contenu markdown
function extractFAQItems(content: string): Array<{ question: string; answer: string }> {
    const faqItems: Array<{ question: string; answer: string }> = [];

    // Cherche la section FAQ (commence par ## FAQ ou ## Questions fréquentes)
    const faqMatch = content.match(/## (?:FAQ|Questions fréquentes)[^\n]*\n([\s\S]*?)(?=\n## [^#]|$)/i);
    if (!faqMatch) return faqItems;

    const faqSection = faqMatch[1];

    // Pattern: **Question ?**\nRéponse (jusqu'à la prochaine question ou fin)
    const questionPattern = /\*\*([^*]+\?)\*\*\s*\n([^*]+?)(?=\n\*\*[^*]+\?\*\*|\n---|\n##|$)/g;

    let match;
    while ((match = questionPattern.exec(faqSection)) !== null) {
        const question = match[1].trim();
        const answer = match[2].trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
        if (question && answer) {
            faqItems.push({ question, answer });
        }
    }

    return faqItems;
}

// Génération statique des pages blog pour inclusion dans le sitemap
export function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return {
            title: "Article non trouvé",
        };
    }

    return {
        title: `${post.title}`,
        description: post.description,
        keywords: post.keywords,
        authors: [{ name: post.author || "Indiana Aflalo" }],
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            authors: [post.author || "Indiana Aflalo"],
            images: [
                {
                    url: `https://indhack.com${post.image}`,
                    width: 1200,
                    height: 630,
                    alt: post.imageAlt || post.title,
                }
            ],
            locale: "fr_FR",
            siteName: "IndHack",
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [`https://indhack.com${post.image}`],
        },
        alternates: {
            canonical: `https://indhack.com/blog/${params.slug}`,
        },
        robots: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    };
}

export default function BlogPostPage({ params }: PageProps) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <Breadcrumb items={getBlogBreadcrumb(post.title, params.slug)} />
            <main className="pt-28 pb-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">

                    {/* Schema.org BlogPosting - Optimisé GEO */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "BlogPosting",
                                "headline": post.title,
                                "description": post.description,
                                "image": {
                                    "@type": "ImageObject",
                                    "url": `https://indhack.com${post.image}`,
                                    "width": 1200,
                                    "height": 630
                                },
                                "datePublished": post.date,
                                "dateModified": post.date,
                                "author": {
                                    "@type": "Person",
                                    "name": post.author || "Indiana Aflalo",
                                    "url": "https://indhack.com/a-propos",
                                    "jobTitle": "Consultante SEO",
                                    "worksFor": {
                                        "@type": "Organization",
                                        "name": "IndHack"
                                    },
                                    "sameAs": [
                                        "https://www.linkedin.com/in/indianaaflalo"
                                    ]
                                },
                                "publisher": {
                                    "@type": "Organization",
                                    "name": "IndHack",
                                    "url": "https://indhack.com",
                                    "logo": {
                                        "@type": "ImageObject",
                                        "url": "https://indhack.com/images/logo-indhack.webp",
                                        "width": 200,
                                        "height": 60
                                    }
                                },
                                "mainEntityOfPage": {
                                    "@type": "WebPage",
                                    "@id": `https://indhack.com/blog/${params.slug}`
                                },
                                "keywords": post.keywords.join(", "),
                                "articleSection": post.category,
                                "inLanguage": "fr-FR",
                                "isAccessibleForFree": true,
                                "speakable": {
                                    "@type": "SpeakableSpecification",
                                    "cssSelector": ["h1", ".prose h2", ".prose p:first-of-type"]
                                }
                            })
                        }}
                    />

                    {/* Schema.org FAQPage - Généré automatiquement depuis le contenu */}
                    {(() => {
                        const faqItems = extractFAQItems(post.content);
                        if (faqItems.length === 0) return null;
                        return (
                            <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{
                                    __html: JSON.stringify({
                                        "@context": "https://schema.org",
                                        "@type": "FAQPage",
                                        "mainEntity": faqItems.map(item => ({
                                            "@type": "Question",
                                            "name": item.question,
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": item.answer
                                            }
                                        }))
                                    })
                                }}
                            />
                        );
                    })()}

                    {/* Schema.org BreadcrumbList est inclus dans le composant Breadcrumb */}

                    {/* Post Header */}
                    <header className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-soft mb-6">
                            <span className="bg-sauge/10 text-sauge px-3 py-1 rounded-lg font-bold uppercase tracking-wider text-xs">
                                {post.category}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Dernière mise à jour : {format(new Date(post.date), "dd MMMM yyyy", { locale: fr })}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-ink mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="text-xl text-soft leading-relaxed italic border-l-4 border-sauge pl-6 mb-10">
                            <ReactMarkdown>{post.description}</ReactMarkdown>
                        </div>

                        <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={post.image}
                                alt={post.imageAlt || post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </header>

                    {/* Post Content */}
                    <div className="grid lg:grid-cols-4 gap-12">

                        {/* Sidebar with Table of Contents */}
                        <aside className="lg:col-span-1 order-last lg:order-first">
                            <div className="sticky top-32 space-y-8">

                                {/* Table des matières */}
                                <div className="hidden lg:block">
                                    <div className="text-xs font-bold text-ink uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                                        Sommaire
                                    </div>
                                    <nav className="space-y-1">
                                        {post.content.split('\n').filter(line => line.startsWith('##')).map((line, i) => {
                                            // Nettoyage basique des titres markdown pour l'affichage
                                            const cleanTitle = line.replace(/^#+\s+/, '').replace(/\*\*/g, '');
                                            // Création d'un ID basique (dans un vrai cas il faut slugifier comme remark)
                                            const slug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

                                            const isH3 = line.startsWith('###');

                                            return (
                                                <a
                                                    key={i}
                                                    href={`#${slug}`}
                                                    className={`block text-sm py-1 border-l-2 pl-3 transition-colors ${isH3
                                                        ? 'text-soft/80 border-transparent hover:text-sauge hover:border-sauge ml-2 text-xs'
                                                        : 'text-soft border-transparent hover:text-sauge hover:border-sauge font-medium'
                                                        }`}
                                                >
                                                    {cleanTitle}
                                                </a>
                                            );
                                        })}
                                    </nav>
                                </div>

                                <div className="bg-ink p-6 rounded-2xl text-white">
                                    <div className="font-heading font-bold text-lg mb-4">Besoin d'aide ?</div>
                                    <p className="text-soft-light text-sm mb-6">
                                        Passons de la théorie à la pratique ensemble.
                                    </p>
                                    <AuditCTA className="w-full bg-sauge hover:bg-white hover:text-ink transition-all mb-3 rounded-xl">
                                        Audit Gratuit
                                    </AuditCTA>
                                    <a href="tel:0661139748" className="flex items-center justify-center gap-2 text-sm text-soft-light hover:text-white transition-colors">
                                        <Phone className="w-4 h-4" />
                                        06 61 13 97 48
                                    </a>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    <div className="font-heading font-bold text-ink mb-4">Auteur</div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                            <Image
                                                src="/images/indiana-aflalo.jpg"
                                                alt="Indiana Aflalo"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-bold text-ink text-sm">Indiana Aflalo</div>
                                            <div className="text-xs text-soft">Consultante SEO</div>
                                        </div>
                                    </div>
                                    <Link href="/a-propos" className="text-xs font-medium text-sauge hover:text-ink transition-colors flex items-center gap-1">
                                        Voir mon profil <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <article className="lg:col-span-3 prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-headings:text-ink prose-headings:scroll-mt-32 prose-p:text-soft prose-li:text-soft prose-strong:text-ink prose-a:text-sauge prose-blockquote:border-sauge prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:rounded-xl max-w-none">
                            {(() => {
                                // Split content by H2 sections pour injecter le CTA après le 3ème H2
                                const sections = post.content.split(/\n(?=## )/);
                                const CTA_INSERT_AFTER = 3; // Après le 3ème H2

                                const createIdFromText = (text: React.ReactNode) =>
                                    String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

                                // Custom components to add IDs to headings (node prop filtered to avoid DOM warning)
                                const markdownComponents = {
                                    h2: ({ node: _node, children, ...props }: { node?: unknown; children?: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) => (
                                        <h2 id={createIdFromText(children)} {...props}>{children}</h2>
                                    ),
                                    h3: ({ node: _node, children, ...props }: { node?: unknown; children?: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) => (
                                        <h3 id={createIdFromText(children)} {...props}>{children}</h3>
                                    )
                                };

                                // Si moins de 4 sections, pas de split (article court)
                                if (sections.length <= CTA_INSERT_AFTER) {
                                    return (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                            {post.content}
                                        </ReactMarkdown>
                                    );
                                }

                                // Première partie : sections 0 à CTA_INSERT_AFTER-1
                                const firstPart = sections.slice(0, CTA_INSERT_AFTER).join('\n');
                                // Deuxième partie : sections CTA_INSERT_AFTER et suivantes
                                const secondPart = sections.slice(CTA_INSERT_AFTER).join('\n');

                                return (
                                    <>
                                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                            {firstPart}
                                        </ReactMarkdown>
                                        <InArticleCTA />
                                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                            {secondPart}
                                        </ReactMarkdown>
                                    </>
                                );
                            })()}

                            {/* Tags */}
                            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
                                {post.keywords.map((kw, i) => (
                                    <span key={i} className="text-xs font-medium text-soft bg-gray-50 px-3 py-1 rounded-full">
                                        #{kw}
                                    </span>
                                ))}
                            </div>

                            {/* Service CTA contextuel */}
                            <BlogServiceCTA category={post.category} />
                        </article>

                    </div>

                    {/* Final CTA Area */}
                    <section className="mt-20 py-12 px-8 bg-gray-50 rounded-3xl text-center border border-gray-100">
                        <div className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                            Cet article vous a été utile ?
                        </div>
                        <p className="text-soft mb-8 max-w-xl mx-auto">
                            Partagez-le ou contactez-moi pour discuter de votre stratégie SEO en détail.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <AuditCTA className="bg-sauge hover:bg-ink text-white rounded-full px-8 py-6">
                                Réserver mon audit gratuit
                            </AuditCTA>
                            <Link href="/contact">
                                <Button variant="outline" className="border-2 border-ink text-ink hover:bg-ink hover:text-white rounded-full px-8 py-6">
                                    Me contacter
                                </Button>
                            </Link>
                        </div>
                    </section>

                </div>
            </main>
        </>
    );
}
