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
                    alt: post.title,
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
            <main className="pt-28 pb-20 bg-[#fafafa] relative overflow-hidden">
                <div className="absolute top-0 -left-1/4 w-1/2 h-[500px] bg-sauge/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
                <div className="absolute top-1/4 -right-1/4 w-1/2 h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

                <div className="container mx-auto px-4 max-w-7xl">

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

                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-ink mb-8 leading-[1.15] tracking-tight max-w-5xl">
                            {post.title}
                        </h1>

                        <div className="text-xl md:text-2xl text-soft/90 leading-relaxed font-light border-l-4 border-sauge pl-8 mb-12 max-w-4xl">
                            <ReactMarkdown>{post.description}</ReactMarkdown>
                        </div>

                        <div className="relative h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </header>

                    {/* Post Content */}
                    <div className="grid lg:grid-cols-12 gap-12 xl:gap-16 items-start">

                        {/* Sidebar with Table of Contents */}
                        <aside className="lg:col-span-4 xl:col-span-3 order-last lg:order-first">
                            <div className="sticky top-32 space-y-8">

                                {/* Table des matières */}
                                <div className="hidden lg:block bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-100 shadow-sm ring-1 ring-black/5">
                                    <div className="text-xs font-bold text-ink uppercase tracking-wider mb-6 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-sauge shadow-[0_0_10px_rgba(var(--sauge),0.5)]" />
                                        Sommaire
                                    </div>
                                    <nav className="space-y-2">
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
                                                    className={`block py-1.5 border-l-2 pl-4 transition-all duration-300 ${isH3
                                                        ? 'text-soft/70 border-transparent hover:text-sauge hover:border-sauge ml-3 text-sm'
                                                        : 'text-soft/90 border-transparent hover:text-sauge hover:border-sauge font-medium text-sm hover:pl-5'
                                                        }`}
                                                >
                                                    {cleanTitle}
                                                </a>
                                            );
                                        })}
                                    </nav>
                                </div>

                                <div className="bg-gradient-to-br from-ink to-ink/90 p-8 rounded-[2rem] text-white shadow-xl shadow-ink/10 relative overflow-hidden group border border-ink/50">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150" />
                                    <div className="font-heading font-bold text-xl mb-3 relative z-10">Besoin d'un expert ?</div>
                                    <p className="text-white/70 text-sm mb-8 leading-relaxed relative z-10 font-light">
                                        Ne laissez pas votre SEO au hasard. Diagnostiquons votre site gratuitement.
                                    </p>
                                    <AuditCTA className="w-full bg-sauge hover:bg-white hover:text-ink transition-all duration-300 mb-4 rounded-xl py-6 font-bold shadow-lg shadow-sauge/20 relative z-10 hover:scale-[1.02]">
                                        Lancer mon audit
                                    </AuditCTA>
                                    <a href="tel:0661139748" className="flex items-center justify-center gap-2 text-sm text-white/60 hover:text-white transition-colors relative z-10 font-medium">
                                        <Phone className="w-4 h-4" />
                                        06 61 13 97 48
                                    </a>
                                </div>

                                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-100 shadow-sm ring-1 ring-black/5">
                                    <div className="text-xs font-bold text-ink uppercase tracking-wider mb-6 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                        Auteur
                                    </div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-inner ring-2 ring-sauge/20">
                                            <Image
                                                src="/images/indiana-aflalo.jpg"
                                                alt="Indiana Aflalo"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-bold text-ink text-base">Indiana Aflalo</div>
                                            <div className="text-sm text-soft/80">Consultante SEO</div>
                                        </div>
                                    </div>
                                    <Link href="/a-propos" className="text-sm font-medium text-sauge hover:text-ink transition-colors flex items-center gap-2 group">
                                        Voir mon profil <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <article className="lg:col-span-8 xl:col-span-9 prose prose-lg md:prose-xl prose-headings:font-heading prose-headings:font-bold prose-headings:text-ink prose-headings:scroll-mt-32 prose-headings:tracking-tight prose-p:text-soft/90 prose-p:leading-relaxed prose-li:text-soft/90 prose-strong:text-ink prose-a:text-sauge prose-a:decoration-sauge/30 hover:prose-a:decoration-sauge prose-blockquote:border-sauge prose-blockquote:bg-sauge/5 prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:rounded-2xl prose-blockquote:font-light prose-blockquote:text-ink/80 prose-blockquote:not-italic prose-blockquote:shadow-sm prose-img:rounded-3xl prose-img:shadow-lg max-w-none bg-white p-8 md:p-14 rounded-[2.5rem] shadow-sm border border-gray-100 ring-1 ring-black/5">
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
                    <section className="mt-24 py-16 px-8 md:px-12 bg-gradient-to-br from-white to-gray-50 rounded-[3rem] text-center border border-gray-100 shadow-xl shadow-gray-200/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sauge/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="text-3xl md:text-4xl font-heading font-extrabold text-ink mb-6 tracking-tight">
                                Cet article vous a été utile ?
                            </div>
                            <p className="text-lg text-soft/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                                Ne laissez pas votre potentiel de croissance inexploité. Discutons ensemble de la stratégie SEO qui propulsera votre entreprise vers de nouveaux sommets.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <AuditCTA className="bg-sauge hover:bg-sauge/90 hover:scale-105 transition-all duration-300 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg shadow-sauge/20">
                                    Réserver mon audit gratuit
                                </AuditCTA>
                                <Link href="/contact">
                                    <Button variant="outline" className="border-2 border-ink text-ink hover:bg-ink hover:text-white rounded-full px-8 py-6 text-lg font-bold transition-all duration-300 hover:scale-105">
                                        Me contacter
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </>
    );
}
