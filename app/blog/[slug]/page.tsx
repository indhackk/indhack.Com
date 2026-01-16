import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronLeft, ArrowRight, Phone } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { AuditCTA } from "@/components/blog/AuditCTA";
import { BlogServiceCTA } from "@/components/BlogServiceCTA";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Back Link */}
                <Link href="/blog" className="inline-flex items-center text-sauge hover:text-ink transition-colors mb-8 group">
                    <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                    Retour au blog
                </Link>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            "headline": post.title,
                            "description": post.description,
                            "image": `https://indhack.com${post.image}`,
                            "datePublished": post.date,
                            "author": {
                                "@type": "Person",
                                "name": post.author || "Indiana Aflalo"
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": "IndHack",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "https://indhack.com/images/logo-indhack.png"
                                }
                            },
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": `https://indhack.com/blog/${params.slug}`
                            }
                        })
                    }}
                />

                {/* Post Header */}
                <header className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-soft mb-6">
                        <span className="bg-sauge/10 text-sauge px-3 py-1 rounded-lg font-bold uppercase tracking-wider text-xs">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(post.date), "dd MMMM yyyy", { locale: fr })}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-heading font-bold text-ink mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <p className="text-xl text-soft leading-relaxed italic border-l-4 border-sauge pl-6 mb-10">
                        {post.description}
                    </p>

                    <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
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
                <div className="grid lg:grid-cols-4 gap-12">

                    {/* Sidebar with Table of Contents */}
                    <aside className="lg:col-span-1 order-last lg:order-first">
                        <div className="sticky top-32 space-y-8">

                            {/* Table des matières */}
                            <div className="hidden lg:block">
                                <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                                    Sommaire
                                </h3>
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
                                <h3 className="font-heading font-bold text-lg mb-4">Besoin d'aide ?</h3>
                                <p className="text-white/70 text-sm mb-6">
                                    Passons de la théorie à la pratique ensemble.
                                </p>
                                <AuditCTA className="w-full bg-sauge hover:bg-white hover:text-ink transition-all mb-3 rounded-xl">
                                    Audit Gratuit
                                </AuditCTA>
                                <a href="tel:0661139748" className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4" />
                                    06 61 13 97 48
                                </a>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <h3 className="font-heading font-bold text-ink mb-4">Auteur</h3>
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
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h2: ({ node, children, ...props }) => {
                                    // Génération d'ID pour l'ancrage
                                    const text = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                    return <h2 id={text} {...props}>{children}</h2>
                                },
                                h3: ({ node, children, ...props }) => {
                                    const text = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                    return <h3 id={text} {...props}>{children}</h3>
                                }
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>

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
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                        Cet article vous a été utile ?
                    </h2>
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
    );
}
