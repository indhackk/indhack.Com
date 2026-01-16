import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    ui: {
        brand: {
            name: 'IndHack Admin',
        },
        navigation: {
            'Contenu': ['posts', 'pages'],
            'SEO Local': ['cities', 'cityServices'],
            'Services': ['services'],
            'Configuration': ['settings', 'homepage', 'navigation'],
        },
    },
    collections: {
        // =====================
        // BLOG
        // =====================
        posts: collection({
            label: 'Articles de Blog',
            slugField: 'title',
            path: 'content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Titre' } }),
                description: fields.text({
                    label: 'Description (meta)',
                    multiline: true,
                }),
                publishedDate: fields.date({
                    label: 'Date de publication',
                }),
                author: fields.text({
                    label: 'Auteur',
                    defaultValue: 'Indiana Aflalo',
                }),
                category: fields.select({
                    label: 'Catégorie',
                    options: [
                        { label: 'SEO Technique', value: 'seo-technique' },
                        { label: 'SEO Local', value: 'seo-local' },
                        { label: 'Référencement', value: 'referencement' },
                        { label: 'Actualités', value: 'actualites' },
                        { label: 'Études de cas', value: 'etudes-de-cas' },
                        { label: 'Guides', value: 'guides' },
                    ],
                    defaultValue: 'seo-technique',
                }),
                image: fields.image({
                    label: 'Image de couverture',
                    directory: 'public/images/blog',
                    publicPath: '/images/blog/',
                }),
                tags: fields.array(
                    fields.text({ label: 'Tag' }),
                    { label: 'Tags', itemLabel: props => props.value }
                ),
                content: fields.mdx({
                    label: 'Contenu',
                }),
            },
        }),

        // =====================
        // PAGES GÉNÉRALES
        // =====================
        pages: collection({
            label: 'Pages du site',
            slugField: 'title',
            path: 'content/pages/*',
            format: { data: 'json' },
            schema: {
                title: fields.slug({ name: { label: 'Titre de la page' } }),
                slug: fields.text({ label: 'URL (sans /)' }),

                // SEO
                metaTitle: fields.text({ label: 'Meta Title (max 60 car.)' }),
                metaDescription: fields.text({
                    label: 'Meta Description (max 160 car.)',
                    multiline: true,
                }),

                // Hero Section
                heroEnabled: fields.checkbox({ label: 'Afficher Hero', defaultValue: true }),
                heroTitle: fields.text({ label: 'Titre Hero (H1)' }),
                heroSubtitle: fields.text({
                    label: 'Sous-titre Hero',
                    multiline: true,
                }),
                heroImage: fields.image({
                    label: 'Image Hero',
                    directory: 'public/images/pages',
                    publicPath: '/images/pages/',
                }),
                heroCTA: fields.text({ label: 'Texte bouton CTA' }),

                // Blocs de contenu
                contentBlocks: fields.array(
                    fields.object({
                        blockType: fields.select({
                            label: 'Type de bloc',
                            options: [
                                { label: '📝 Texte', value: 'text' },
                                { label: '📋 Liste à puces', value: 'bullets' },
                                { label: '🎯 CTA', value: 'cta' },
                                { label: '🖼️ Image', value: 'image' },
                                { label: '💬 Témoignage', value: 'testimonial' },
                                { label: '📊 Stats', value: 'stats' },
                                { label: '❓ FAQ', value: 'faq' },
                                { label: '🔗 Liens internes', value: 'links' },
                            ],
                            defaultValue: 'text',
                        }),
                        title: fields.text({ label: 'Titre du bloc' }),
                        subtitle: fields.text({ label: 'Sous-titre (optionnel)' }),
                        content: fields.text({
                            label: 'Contenu texte',
                            multiline: true,
                        }),
                        items: fields.array(
                            fields.object({
                                text: fields.text({ label: 'Texte' }),
                                link: fields.text({ label: 'Lien (optionnel)' }),
                            }),
                            { label: 'Items', itemLabel: props => props.fields.text.value }
                        ),
                        image: fields.image({
                            label: 'Image',
                            directory: 'public/images/pages',
                            publicPath: '/images/pages/',
                        }),
                        backgroundColor: fields.select({
                            label: 'Couleur de fond',
                            options: [
                                { label: 'Blanc', value: 'white' },
                                { label: 'Gris clair', value: 'gray' },
                                { label: 'Sombre', value: 'dark' },
                                { label: 'Sauge/Vert', value: 'sauge' },
                            ],
                            defaultValue: 'white',
                        }),
                    }),
                    {
                        label: 'Blocs de contenu',
                        itemLabel: props => `${props.fields.blockType.value}: ${props.fields.title.value || 'Sans titre'}`,
                    }
                ),
            },
        }),

        // =====================
        // PAGES VILLES (SEO LOCAL)
        // =====================
        cities: collection({
            label: 'Villes (Pages Mères)',
            slugField: 'name',
            path: 'content/cities/*',
            format: { data: 'json' },
            schema: {
                name: fields.slug({ name: { label: 'Nom de la ville' } }),
                slug: fields.text({ label: 'URL slug (ex: seo-nice)' }),
                department: fields.text({ label: 'Département' }),
                departmentCode: fields.text({ label: 'Code département (ex: 06)' }),
                region: fields.text({ label: 'Région' }),
                zipCode: fields.text({ label: 'Code postal' }),

                // Coordonnées GPS pour images géolocalisées
                latitude: fields.number({ label: 'Latitude' }),
                longitude: fields.number({ label: 'Longitude' }),

                // SEO
                metaTitle: fields.text({ label: 'Meta Title' }),
                metaDescription: fields.text({
                    label: 'Meta Description',
                    multiline: true,
                }),

                // Contenu Hero
                heroTitle: fields.text({ label: 'Titre Hero (H1)' }),
                heroSubtitle: fields.text({
                    label: 'Sous-titre Hero',
                    multiline: true,
                }),

                // Introduction
                introduction: fields.text({
                    label: 'Paragraphe d\'introduction',
                    multiline: true,
                }),

                // Sections de contenu
                sections: fields.array(
                    fields.object({
                        title: fields.text({ label: 'Titre de section (H2)' }),
                        content: fields.text({
                            label: 'Contenu HTML',
                            multiline: true,
                        }),
                        bullets: fields.array(
                            fields.text({ label: 'Point' }),
                            { label: 'Points clés', itemLabel: props => props.value }
                        ),
                    }),
                    {
                        label: 'Sections de contenu',
                        itemLabel: props => props.fields.title.value || 'Section',
                    }
                ),

                // FAQ
                faq: fields.array(
                    fields.object({
                        question: fields.text({ label: 'Question' }),
                        answer: fields.text({
                            label: 'Réponse',
                            multiline: true,
                        }),
                    }),
                    {
                        label: 'FAQ',
                        itemLabel: props => props.fields.question.value || 'Question',
                    }
                ),

                // Services liés
                linkedServices: fields.array(
                    fields.text({ label: 'Slug du service' }),
                    { label: 'Services liés', itemLabel: props => props.value }
                ),
            },
        }),

        // =====================
        // SERVICES PAR VILLE (Pages Filles)
        // =====================
        cityServices: collection({
            label: 'Services par Ville (Pages Filles)',
            slugField: 'title',
            path: 'content/city-services/*',
            format: { data: 'json' },
            schema: {
                title: fields.slug({ name: { label: 'Titre du service' } }),
                citySlug: fields.text({ label: 'Slug de la ville (ex: seo-nice)' }),
                serviceSlug: fields.text({ label: 'Slug du service (ex: audit-technique)' }),

                // SEO
                metaTitle: fields.text({ label: 'Meta Title' }),
                metaDescription: fields.text({
                    label: 'Meta Description',
                    multiline: true,
                }),

                // Contenu
                heroTitle: fields.text({ label: 'Titre Hero' }),
                heroSubtitle: fields.text({
                    label: 'Sous-titre',
                    multiline: true,
                }),
                category: fields.text({ label: 'Catégorie (ex: Audit SEO)' }),

                // Sections H2
                h2Sections: fields.array(
                    fields.object({
                        title: fields.text({ label: 'Titre H2' }),
                        content: fields.text({
                            label: 'Contenu HTML',
                            multiline: true,
                        }),
                        bullets: fields.array(
                            fields.text({ label: 'Point' }),
                            { label: 'Points clés' }
                        ),
                    }),
                    {
                        label: 'Sections H2',
                        itemLabel: props => props.fields.title.value || 'Section',
                    }
                ),

                // Méthodologie
                methodology: fields.array(
                    fields.object({
                        step: fields.number({ label: 'Numéro d\'étape' }),
                        title: fields.text({ label: 'Titre' }),
                        desc: fields.text({ label: 'Description', multiline: true }),
                    }),
                    {
                        label: 'Étapes méthodologie',
                        itemLabel: props => `${props.fields.step.value}. ${props.fields.title.value}`,
                    }
                ),

                // FAQ
                faq: fields.array(
                    fields.object({
                        question: fields.text({ label: 'Question' }),
                        answer: fields.text({
                            label: 'Réponse',
                            multiline: true,
                        }),
                    }),
                    {
                        label: 'FAQ',
                        itemLabel: props => props.fields.question.value || 'Question',
                    }
                ),
            },
        }),

        // =====================
        // PAGES SERVICES PRINCIPALES
        // =====================
        services: collection({
            label: 'Services Principaux',
            slugField: 'title',
            path: 'content/services/*',
            format: { data: 'json' },
            schema: {
                title: fields.slug({ name: { label: 'Nom du service' } }),
                slug: fields.text({ label: 'URL slug' }),
                icon: fields.text({ label: 'Icône Lucide (ex: Search, Target)' }),
                order: fields.number({ label: 'Ordre d\'affichage' }),

                // SEO
                metaTitle: fields.text({ label: 'Meta Title' }),
                metaDescription: fields.text({
                    label: 'Meta Description',
                    multiline: true,
                }),

                // Hero
                heroTitle: fields.text({ label: 'Titre Hero' }),
                heroSubtitle: fields.text({
                    label: 'Sous-titre',
                    multiline: true,
                }),
                heroImage: fields.image({
                    label: 'Image Hero',
                    directory: 'public/images/services',
                    publicPath: '/images/services/',
                }),

                // Features / Points clés
                features: fields.array(
                    fields.object({
                        title: fields.text({ label: 'Titre' }),
                        description: fields.text({ label: 'Description', multiline: true }),
                        icon: fields.text({ label: 'Icône' }),
                    }),
                    {
                        label: 'Points clés',
                        itemLabel: props => props.fields.title.value || 'Feature',
                    }
                ),

                // Blocs de contenu
                contentBlocks: fields.array(
                    fields.object({
                        type: fields.select({
                            label: 'Type',
                            options: [
                                { label: 'Texte', value: 'text' },
                                { label: 'Liste', value: 'list' },
                                { label: 'Processus', value: 'process' },
                                { label: 'Tarifs', value: 'pricing' },
                                { label: 'Témoignage', value: 'testimonial' },
                            ],
                            defaultValue: 'text',
                        }),
                        title: fields.text({ label: 'Titre' }),
                        content: fields.text({
                            label: 'Contenu',
                            multiline: true,
                        }),
                        items: fields.array(
                            fields.text({ label: 'Item' }),
                            { label: 'Items' }
                        ),
                    }),
                    {
                        label: 'Blocs de contenu',
                        itemLabel: props => `${props.fields.type.value}: ${props.fields.title.value || 'Bloc'}`,
                    }
                ),

                // FAQ
                faq: fields.array(
                    fields.object({
                        question: fields.text({ label: 'Question' }),
                        answer: fields.text({
                            label: 'Réponse',
                            multiline: true,
                        }),
                    }),
                    {
                        label: 'FAQ',
                        itemLabel: props => props.fields.question.value || 'Question',
                    }
                ),

                // CTA
                ctaTitle: fields.text({ label: 'Titre CTA final' }),
                ctaText: fields.text({ label: 'Texte bouton CTA' }),
            },
        }),
    },

    singletons: {
        // =====================
        // PARAMÈTRES GLOBAUX
        // =====================
        settings: singleton({
            label: 'Paramètres du site',
            path: 'content/settings',
            format: { data: 'json' },
            schema: {
                siteName: fields.text({ label: 'Nom du site', defaultValue: 'IndHack' }),
                siteTagline: fields.text({ label: 'Slogan' }),
                siteDescription: fields.text({
                    label: 'Description globale',
                    multiline: true,
                }),

                // Contact
                phone: fields.text({ label: 'Téléphone' }),
                email: fields.text({ label: 'Email' }),
                address: fields.text({ label: 'Adresse', multiline: true }),

                // Réseaux sociaux
                socialLinks: fields.object({
                    linkedin: fields.text({ label: 'LinkedIn URL' }),
                    twitter: fields.text({ label: 'Twitter/X URL' }),
                    instagram: fields.text({ label: 'Instagram URL' }),
                    youtube: fields.text({ label: 'YouTube URL' }),
                }),

                // Analytics
                googleAnalyticsId: fields.text({ label: 'Google Analytics ID' }),
                googleSearchConsoleId: fields.text({ label: 'Search Console ID' }),

                // SEO par défaut
                defaultMetaTitle: fields.text({ label: 'Meta title par défaut' }),
                defaultMetaDescription: fields.text({
                    label: 'Meta description par défaut',
                    multiline: true,
                }),
            },
        }),

        // =====================
        // PAGE D'ACCUEIL
        // =====================
        homepage: singleton({
            label: 'Page d\'accueil',
            path: 'content/homepage',
            format: { data: 'json' },
            schema: {
                // Hero
                heroTitle: fields.text({ label: 'Titre Hero principal' }),
                heroSubtitle: fields.text({
                    label: 'Sous-titre',
                    multiline: true,
                }),
                heroCTA: fields.text({ label: 'Texte CTA principal' }),
                heroSecondCTA: fields.text({ label: 'Texte CTA secondaire' }),

                // Section Services
                servicesTitle: fields.text({ label: 'Titre section Services' }),
                servicesSubtitle: fields.text({ label: 'Sous-titre Services' }),

                // Section À propos
                aboutTitle: fields.text({ label: 'Titre section À propos' }),
                aboutContent: fields.text({
                    label: 'Contenu À propos',
                    multiline: true,
                }),

                // Témoignages
                testimonialsTitle: fields.text({ label: 'Titre section Témoignages' }),
                testimonials: fields.array(
                    fields.object({
                        name: fields.text({ label: 'Nom' }),
                        company: fields.text({ label: 'Entreprise' }),
                        text: fields.text({ label: 'Témoignage', multiline: true }),
                        rating: fields.number({ label: 'Note (1-5)' }),
                    }),
                    {
                        label: 'Témoignages',
                        itemLabel: props => props.fields.name.value || 'Témoignage',
                    }
                ),

                // CTA Final
                finalCTATitle: fields.text({ label: 'Titre CTA final' }),
                finalCTASubtitle: fields.text({ label: 'Sous-titre CTA final' }),
                finalCTAButton: fields.text({ label: 'Texte bouton' }),
            },
        }),

        // =====================
        // NAVIGATION
        // =====================
        navigation: singleton({
            label: 'Navigation',
            path: 'content/navigation',
            format: { data: 'json' },
            schema: {
                mainMenu: fields.array(
                    fields.object({
                        label: fields.text({ label: 'Libellé' }),
                        href: fields.text({ label: 'Lien' }),
                        isDropdown: fields.checkbox({ label: 'Menu déroulant' }),
                        children: fields.array(
                            fields.object({
                                label: fields.text({ label: 'Libellé' }),
                                href: fields.text({ label: 'Lien' }),
                                description: fields.text({ label: 'Description' }),
                            }),
                            { label: 'Sous-menus' }
                        ),
                    }),
                    {
                        label: 'Menu principal',
                        itemLabel: props => props.fields.label.value || 'Item',
                    }
                ),

                footerLinks: fields.array(
                    fields.object({
                        category: fields.text({ label: 'Catégorie' }),
                        links: fields.array(
                            fields.object({
                                label: fields.text({ label: 'Libellé' }),
                                href: fields.text({ label: 'Lien' }),
                            }),
                            { label: 'Liens' }
                        ),
                    }),
                    {
                        label: 'Liens footer',
                        itemLabel: props => props.fields.category.value || 'Catégorie',
                    }
                ),
            },
        }),
    },
});
