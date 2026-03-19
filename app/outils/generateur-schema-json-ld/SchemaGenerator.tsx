"use client";

import { useState, useCallback } from "react";
import {
    Building2,
    HelpCircle,
    FileText,
    Users,
    User,
    Package,
    ListOrdered,
    Calendar,
    Navigation,
    Copy,
    Check,
    ExternalLink,
    Plus,
    Trash2,
    Eye,
} from "lucide-react";

// Types de schema supportés
const SCHEMA_TYPES = [
    { id: "LocalBusiness", label: "LocalBusiness", icon: Building2, description: "Entreprise locale (magasin, restaurant, cabinet...)" },
    { id: "FAQPage", label: "FAQPage", icon: HelpCircle, description: "Page de questions/réponses" },
    { id: "Article", label: "Article", icon: FileText, description: "Article de blog ou actualité" },
    { id: "Organization", label: "Organization", icon: Users, description: "Organisation ou entreprise" },
    { id: "Person", label: "Person", icon: User, description: "Personne (freelance, expert...)" },
    { id: "Product", label: "Product", icon: Package, description: "Produit e-commerce" },
    { id: "HowTo", label: "HowTo", icon: ListOrdered, description: "Tutoriel étape par étape" },
    { id: "Event", label: "Event", icon: Calendar, description: "Événement" },
    { id: "BreadcrumbList", label: "BreadcrumbList", icon: Navigation, description: "Fil d'Ariane" },
];

// Templates par secteur
const SECTOR_TEMPLATES = [
    { id: "restaurant", label: "Restaurant", schemaType: "LocalBusiness", businessType: "Restaurant" },
    { id: "avocat", label: "Avocat", schemaType: "LocalBusiness", businessType: "LegalService" },
    { id: "dentiste", label: "Dentiste", schemaType: "LocalBusiness", businessType: "Dentist" },
    { id: "plombier", label: "Plombier", schemaType: "LocalBusiness", businessType: "Plumber" },
    { id: "coiffeur", label: "Coiffeur", schemaType: "LocalBusiness", businessType: "HairSalon" },
    { id: "agence-immo", label: "Agence Immobilière", schemaType: "LocalBusiness", businessType: "RealEstateAgent" },
    { id: "agence-web", label: "Agence Web", schemaType: "Organization", businessType: "ProfessionalService" },
];

interface FAQItem {
    question: string;
    answer: string;
}

interface HowToStep {
    name: string;
    text: string;
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface OpeningHours {
    days: string[];
    opens: string;
    closes: string;
}

export function SchemaGenerator() {
    const [activeType, setActiveType] = useState("LocalBusiness");
    const [copied, setCopied] = useState(false);

    // LocalBusiness fields
    const [businessName, setBusinessName] = useState("");
    const [businessType, setBusinessType] = useState("LocalBusiness");
    const [description, setDescription] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("FR");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [logo, setLogo] = useState("");
    const [image, setImage] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [openingHours, setOpeningHours] = useState<OpeningHours[]>([
        { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" }
    ]);

    // FAQPage fields
    const [faqItems, setFaqItems] = useState<FAQItem[]>([
        { question: "", answer: "" },
        { question: "", answer: "" },
    ]);

    // Article fields
    const [articleTitle, setArticleTitle] = useState("");
    const [articleAuthor, setArticleAuthor] = useState("");
    const [articleDate, setArticleDate] = useState("");
    const [articleModified, setArticleModified] = useState("");
    const [articleImage, setArticleImage] = useState("");
    const [articlePublisher, setArticlePublisher] = useState("");
    const [articlePublisherLogo, setArticlePublisherLogo] = useState("");

    // Organization fields
    const [orgName, setOrgName] = useState("");
    const [orgLogo, setOrgLogo] = useState("");
    const [orgUrl, setOrgUrl] = useState("");
    const [orgSameAs, setOrgSameAs] = useState<string[]>([""]);

    // Person fields
    const [personName, setPersonName] = useState("");
    const [personJobTitle, setPersonJobTitle] = useState("");
    const [personWorksFor, setPersonWorksFor] = useState("");
    const [personUrl, setPersonUrl] = useState("");
    const [personImage, setPersonImage] = useState("");
    const [personSameAs, setPersonSameAs] = useState<string[]>([""]);

    // Product fields
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productBrand, setProductBrand] = useState("");
    const [productSku, setProductSku] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCurrency, setProductCurrency] = useState("EUR");
    const [productAvailability, setProductAvailability] = useState("InStock");

    // HowTo fields
    const [howToName, setHowToName] = useState("");
    const [howToDescription, setHowToDescription] = useState("");
    const [howToSteps, setHowToSteps] = useState<HowToStep[]>([
        { name: "", text: "" },
        { name: "", text: "" },
    ]);

    // Event fields
    const [eventName, setEventName] = useState("");
    const [eventStartDate, setEventStartDate] = useState("");
    const [eventEndDate, setEventEndDate] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventImage, setEventImage] = useState("");
    const [eventUrl, setEventUrl] = useState("");

    // BreadcrumbList fields
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
        { name: "Accueil", url: "" },
        { name: "", url: "" },
    ]);

    // Generate JSON-LD based on active type
    const generateSchema = useCallback(() => {
        switch (activeType) {
            case "LocalBusiness":
                return {
                    "@context": "https://schema.org",
                    "@type": businessType || "LocalBusiness",
                    ...(businessName && { name: businessName }),
                    ...(description && { description }),
                    ...(streetAddress && {
                        address: {
                            "@type": "PostalAddress",
                            streetAddress,
                            addressLocality: city,
                            postalCode,
                            addressCountry: country,
                        }
                    }),
                    ...(phone && { telephone: phone }),
                    ...(email && { email }),
                    ...(website && { url: website }),
                    ...(logo && { logo }),
                    ...(image && { image }),
                    ...(latitude && longitude && {
                        geo: {
                            "@type": "GeoCoordinates",
                            latitude: parseFloat(latitude),
                            longitude: parseFloat(longitude),
                        }
                    }),
                    ...(priceRange && { priceRange }),
                    ...(openingHours.length > 0 && openingHours[0].opens && {
                        openingHoursSpecification: openingHours.map(oh => ({
                            "@type": "OpeningHoursSpecification",
                            dayOfWeek: oh.days,
                            opens: oh.opens,
                            closes: oh.closes,
                        }))
                    }),
                };

            case "FAQPage":
                const validFaqs = faqItems.filter(f => f.question && f.answer);
                return {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: validFaqs.map(faq => ({
                        "@type": "Question",
                        name: faq.question,
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: faq.answer,
                        }
                    }))
                };

            case "Article":
                return {
                    "@context": "https://schema.org",
                    "@type": "Article",
                    ...(articleTitle && { headline: articleTitle }),
                    ...(articleImage && { image: articleImage }),
                    ...(articleDate && { datePublished: articleDate }),
                    ...(articleModified && { dateModified: articleModified }),
                    ...(articleAuthor && {
                        author: {
                            "@type": "Person",
                            name: articleAuthor,
                        }
                    }),
                    ...(articlePublisher && {
                        publisher: {
                            "@type": "Organization",
                            name: articlePublisher,
                            ...(articlePublisherLogo && { logo: { "@type": "ImageObject", url: articlePublisherLogo } }),
                        }
                    }),
                };

            case "Organization":
                const validSameAs = orgSameAs.filter(s => s.trim());
                return {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    ...(orgName && { name: orgName }),
                    ...(orgUrl && { url: orgUrl }),
                    ...(orgLogo && { logo: orgLogo }),
                    ...(validSameAs.length > 0 && { sameAs: validSameAs }),
                };

            case "Person":
                const validPersonSameAs = personSameAs.filter(s => s.trim());
                return {
                    "@context": "https://schema.org",
                    "@type": "Person",
                    ...(personName && { name: personName }),
                    ...(personJobTitle && { jobTitle: personJobTitle }),
                    ...(personWorksFor && { worksFor: { "@type": "Organization", name: personWorksFor } }),
                    ...(personUrl && { url: personUrl }),
                    ...(personImage && { image: personImage }),
                    ...(validPersonSameAs.length > 0 && { sameAs: validPersonSameAs }),
                };

            case "Product":
                return {
                    "@context": "https://schema.org",
                    "@type": "Product",
                    ...(productName && { name: productName }),
                    ...(productDescription && { description: productDescription }),
                    ...(productImage && { image: productImage }),
                    ...(productBrand && { brand: { "@type": "Brand", name: productBrand } }),
                    ...(productSku && { sku: productSku }),
                    ...(productPrice && {
                        offers: {
                            "@type": "Offer",
                            price: productPrice,
                            priceCurrency: productCurrency,
                            availability: `https://schema.org/${productAvailability}`,
                        }
                    }),
                };

            case "HowTo":
                const validSteps = howToSteps.filter(s => s.name && s.text);
                return {
                    "@context": "https://schema.org",
                    "@type": "HowTo",
                    ...(howToName && { name: howToName }),
                    ...(howToDescription && { description: howToDescription }),
                    step: validSteps.map((step, index) => ({
                        "@type": "HowToStep",
                        position: index + 1,
                        name: step.name,
                        text: step.text,
                    }))
                };

            case "Event":
                return {
                    "@context": "https://schema.org",
                    "@type": "Event",
                    ...(eventName && { name: eventName }),
                    ...(eventDescription && { description: eventDescription }),
                    ...(eventStartDate && { startDate: eventStartDate }),
                    ...(eventEndDate && { endDate: eventEndDate }),
                    ...(eventLocation && {
                        location: {
                            "@type": "Place",
                            name: eventLocation,
                        }
                    }),
                    ...(eventImage && { image: eventImage }),
                    ...(eventUrl && { url: eventUrl }),
                };

            case "BreadcrumbList":
                const validBreadcrumbs = breadcrumbs.filter(b => b.name);
                return {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: validBreadcrumbs.map((item, index) => ({
                        "@type": "ListItem",
                        position: index + 1,
                        name: item.name,
                        ...(item.url && { item: item.url }),
                    }))
                };

            default:
                return {};
        }
    }, [
        activeType, businessName, businessType, description, streetAddress, city, postalCode, country,
        phone, email, website, logo, image, latitude, longitude, priceRange, openingHours,
        faqItems, articleTitle, articleAuthor, articleDate, articleModified, articleImage, articlePublisher, articlePublisherLogo,
        orgName, orgLogo, orgUrl, orgSameAs, personName, personJobTitle, personWorksFor, personUrl, personImage, personSameAs,
        productName, productDescription, productImage, productBrand, productSku, productPrice, productCurrency, productAvailability,
        howToName, howToDescription, howToSteps, eventName, eventStartDate, eventEndDate, eventLocation, eventDescription, eventImage, eventUrl,
        breadcrumbs
    ]);

    const schema = generateSchema();
    const schemaString = JSON.stringify(schema, null, 2);

    const handleCopy = async () => {
        const scriptTag = `<script type="application/ld+json">\n${schemaString}\n</script>`;
        await navigator.clipboard.writeText(scriptTag);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const applyTemplate = (templateId: string) => {
        const template = SECTOR_TEMPLATES.find(t => t.id === templateId);
        if (template) {
            setActiveType(template.schemaType);
            setBusinessType(template.businessType);
        }
    };

    // Calculate completeness score
    const calculateScore = () => {
        let filled = 0;
        let total = 0;

        switch (activeType) {
            case "LocalBusiness":
                total = 10;
                if (businessName) filled++;
                if (description) filled++;
                if (streetAddress) filled++;
                if (city) filled++;
                if (phone) filled++;
                if (website) filled++;
                if (logo) filled++;
                if (openingHours[0]?.opens) filled++;
                if (latitude && longitude) filled++;
                if (priceRange) filled++;
                break;
            case "FAQPage":
                total = faqItems.length * 2;
                faqItems.forEach(f => {
                    if (f.question) filled++;
                    if (f.answer) filled++;
                });
                break;
            case "Article":
                total = 6;
                if (articleTitle) filled++;
                if (articleAuthor) filled++;
                if (articleDate) filled++;
                if (articleImage) filled++;
                if (articlePublisher) filled++;
                if (articleModified) filled++;
                break;
            default:
                return 100;
        }

        return total > 0 ? Math.round((filled / total) * 100) : 0;
    };

    const score = calculateScore();

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Form */}
            <div className="space-y-6">
                {/* Schema Type Tabs */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
                    <div className="flex flex-wrap gap-2">
                        {SCHEMA_TYPES.map((type) => {
                            const Icon = type.icon;
                            const isActive = activeType === type.id;
                            return (
                                <button
                                    key={type.id}
                                    onClick={() => setActiveType(type.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                        isActive
                                            ? "bg-sauge text-white"
                                            : "bg-white/5 text-soft-light hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {type.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Sector Templates */}
                {activeType === "LocalBusiness" && (
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
                        <label className="block text-sm font-bold text-white mb-3">
                            Templates sectoriels
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {SECTOR_TEMPLATES.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => applyTemplate(template.id)}
                                    className="px-3 py-1.5 bg-white/5 hover:bg-sauge/20 text-soft-light hover:text-white rounded-lg text-sm transition-colors border border-white/10 hover:border-sauge/30"
                                >
                                    {template.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Dynamic Form */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 space-y-4">
                    {activeType === "LocalBusiness" && (
                        <>
                            <FormField label="Nom de l'entreprise *" value={businessName} onChange={setBusinessName} placeholder="Ma Super Entreprise" />
                            <FormField label="Type d'activité" value={businessType} onChange={setBusinessType} placeholder="Restaurant, Plumber, LegalService..." />
                            <FormField label="Description" value={description} onChange={setDescription} placeholder="Description courte de votre activité" multiline />
                            <FormField label="Adresse" value={streetAddress} onChange={setStreetAddress} placeholder="123 rue du Commerce" />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField label="Ville" value={city} onChange={setCity} placeholder="Nice" />
                                <FormField label="Code postal" value={postalCode} onChange={setPostalCode} placeholder="06000" />
                            </div>
                            <FormField label="Téléphone" value={phone} onChange={setPhone} placeholder="+33 4 93 00 00 00" />
                            <FormField label="Email" value={email} onChange={setEmail} placeholder="contact@example.com" type="email" />
                            <FormField label="Site web" value={website} onChange={setWebsite} placeholder="https://example.com" type="url" />
                            <FormField label="URL du logo" value={logo} onChange={setLogo} placeholder="https://example.com/logo.png" type="url" />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField label="Latitude" value={latitude} onChange={setLatitude} placeholder="43.7102" />
                                <FormField label="Longitude" value={longitude} onChange={setLongitude} placeholder="7.2620" />
                            </div>
                            <FormField label="Gamme de prix" value={priceRange} onChange={setPriceRange} placeholder="€€" />
                        </>
                    )}

                    {activeType === "FAQPage" && (
                        <>
                            <p className="text-sm text-soft-light mb-4">Ajoutez vos questions et réponses pour créer une page FAQ structurée.</p>
                            {faqItems.map((item, index) => (
                                <div key={index} className="p-4 bg-white/5 rounded-xl space-y-3 border border-white/10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-white">Question {index + 1}</span>
                                        {faqItems.length > 1 && (
                                            <button
                                                onClick={() => setFaqItems(faqItems.filter((_, i) => i !== index))}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        value={item.question}
                                        onChange={(e) => {
                                            const newItems = [...faqItems];
                                            newItems[index].question = e.target.value;
                                            setFaqItems(newItems);
                                        }}
                                        placeholder="Votre question ?"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-sauge/50 focus:border-sauge/50"
                                    />
                                    <textarea
                                        value={item.answer}
                                        onChange={(e) => {
                                            const newItems = [...faqItems];
                                            newItems[index].answer = e.target.value;
                                            setFaqItems(newItems);
                                        }}
                                        placeholder="La réponse..."
                                        rows={3}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-sauge/50 focus:border-sauge/50 resize-none"
                                    />
                                </div>
                            ))}
                            <button
                                onClick={() => setFaqItems([...faqItems, { question: "", answer: "" }])}
                                className="flex items-center gap-2 text-white font-medium hover:text-white/80 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Ajouter une question
                            </button>
                        </>
                    )}

                    {activeType === "Article" && (
                        <>
                            <FormField label="Titre de l'article *" value={articleTitle} onChange={setArticleTitle} placeholder="Comment optimiser son SEO en 2026" />
                            <FormField label="Auteur *" value={articleAuthor} onChange={setArticleAuthor} placeholder="Indiana Aflalo" />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField label="Date de publication" value={articleDate} onChange={setArticleDate} type="date" />
                                <FormField label="Date de modification" value={articleModified} onChange={setArticleModified} type="date" />
                            </div>
                            <FormField label="URL de l'image" value={articleImage} onChange={setArticleImage} placeholder="https://example.com/image.jpg" type="url" />
                            <FormField label="Nom de l'éditeur" value={articlePublisher} onChange={setArticlePublisher} placeholder="IndHack" />
                            <FormField label="Logo de l'éditeur (URL)" value={articlePublisherLogo} onChange={setArticlePublisherLogo} placeholder="https://example.com/logo.png" type="url" />
                        </>
                    )}

                    {activeType === "Organization" && (
                        <>
                            <FormField label="Nom de l'organisation *" value={orgName} onChange={setOrgName} placeholder="IndHack" />
                            <FormField label="URL du site" value={orgUrl} onChange={setOrgUrl} placeholder="https://indhack.com" type="url" />
                            <FormField label="URL du logo" value={orgLogo} onChange={setOrgLogo} placeholder="https://indhack.com/logo.png" type="url" />
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-white">Réseaux sociaux</label>
                                {orgSameAs.map((url, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="url"
                                            value={url}
                                            onChange={(e) => {
                                                const newUrls = [...orgSameAs];
                                                newUrls[index] = e.target.value;
                                                setOrgSameAs(newUrls);
                                            }}
                                            placeholder="https://linkedin.com/company/..."
                                            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-sauge/50 focus:border-sauge/50"
                                        />
                                        {orgSameAs.length > 1 && (
                                            <button onClick={() => setOrgSameAs(orgSameAs.filter((_, i) => i !== index))} className="text-red-400 hover:text-red-300">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button onClick={() => setOrgSameAs([...orgSameAs, ""])} className="flex items-center gap-2 text-white font-medium">
                                    <Plus className="w-4 h-4" /> Ajouter un réseau
                                </button>
                            </div>
                        </>
                    )}

                    {activeType === "Person" && (
                        <>
                            <FormField label="Nom complet *" value={personName} onChange={setPersonName} placeholder="Indiana Aflalo" />
                            <FormField label="Titre / Fonction" value={personJobTitle} onChange={setPersonJobTitle} placeholder="Consultante SEO" />
                            <FormField label="Employeur" value={personWorksFor} onChange={setPersonWorksFor} placeholder="IndHack" />
                            <FormField label="Site web personnel" value={personUrl} onChange={setPersonUrl} placeholder="https://indhack.com" type="url" />
                            <FormField label="Photo (URL)" value={personImage} onChange={setPersonImage} placeholder="https://..." type="url" />
                        </>
                    )}

                    {activeType === "Product" && (
                        <>
                            <FormField label="Nom du produit *" value={productName} onChange={setProductName} placeholder="iPhone 16 Pro" />
                            <FormField label="Description" value={productDescription} onChange={setProductDescription} placeholder="Description du produit" multiline />
                            <FormField label="Image (URL)" value={productImage} onChange={setProductImage} placeholder="https://..." type="url" />
                            <FormField label="Marque" value={productBrand} onChange={setProductBrand} placeholder="Apple" />
                            <FormField label="SKU / Référence" value={productSku} onChange={setProductSku} placeholder="IP16PRO-256" />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField label="Prix" value={productPrice} onChange={setProductPrice} placeholder="1199" />
                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">Disponibilité</label>
                                    <select
                                        value={productAvailability}
                                        onChange={(e) => setProductAvailability(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-sauge/50 focus:border-sauge/50"
                                    >
                                        <option value="InStock" className="bg-ink">En stock</option>
                                        <option value="OutOfStock" className="bg-ink">Rupture</option>
                                        <option value="PreOrder" className="bg-ink">Précommande</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    )}

                    {activeType === "HowTo" && (
                        <>
                            <FormField label="Titre du tutoriel *" value={howToName} onChange={setHowToName} placeholder="Comment installer WordPress" />
                            <FormField label="Description" value={howToDescription} onChange={setHowToDescription} placeholder="Guide étape par étape pour..." multiline />
                            <p className="text-sm font-bold text-white mt-4">Étapes :</p>
                            {howToSteps.map((step, index) => (
                                <div key={index} className="p-4 bg-white/5 rounded-xl space-y-3 border border-white/10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-white">Étape {index + 1}</span>
                                        {howToSteps.length > 1 && (
                                            <button onClick={() => setHowToSteps(howToSteps.filter((_, i) => i !== index))} className="text-red-400 hover:text-red-300">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        value={step.name}
                                        onChange={(e) => {
                                            const newSteps = [...howToSteps];
                                            newSteps[index].name = e.target.value;
                                            setHowToSteps(newSteps);
                                        }}
                                        placeholder="Nom de l'étape"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30"
                                    />
                                    <textarea
                                        value={step.text}
                                        onChange={(e) => {
                                            const newSteps = [...howToSteps];
                                            newSteps[index].text = e.target.value;
                                            setHowToSteps(newSteps);
                                        }}
                                        placeholder="Instructions..."
                                        rows={2}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 resize-none"
                                    />
                                </div>
                            ))}
                            <button onClick={() => setHowToSteps([...howToSteps, { name: "", text: "" }])} className="flex items-center gap-2 text-white font-medium">
                                <Plus className="w-4 h-4" /> Ajouter une étape
                            </button>
                        </>
                    )}

                    {activeType === "Event" && (
                        <>
                            <FormField label="Nom de l'événement *" value={eventName} onChange={setEventName} placeholder="Conférence SEO 2026" />
                            <FormField label="Description" value={eventDescription} onChange={setEventDescription} placeholder="Description de l'événement" multiline />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField label="Date de début" value={eventStartDate} onChange={setEventStartDate} type="datetime-local" />
                                <FormField label="Date de fin" value={eventEndDate} onChange={setEventEndDate} type="datetime-local" />
                            </div>
                            <FormField label="Lieu" value={eventLocation} onChange={setEventLocation} placeholder="Palais des Congrès, Nice" />
                            <FormField label="URL de l'événement" value={eventUrl} onChange={setEventUrl} placeholder="https://..." type="url" />
                            <FormField label="Image (URL)" value={eventImage} onChange={setEventImage} placeholder="https://..." type="url" />
                        </>
                    )}

                    {activeType === "BreadcrumbList" && (
                        <>
                            <p className="text-sm text-soft-light mb-4">Configurez votre fil d'Ariane (breadcrumb) pour améliorer la navigation et le SEO.</p>
                            {breadcrumbs.map((item, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <span className="text-sm text-soft-light w-8">{index + 1}.</span>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => {
                                            const newItems = [...breadcrumbs];
                                            newItems[index].name = e.target.value;
                                            setBreadcrumbs(newItems);
                                        }}
                                        placeholder="Nom"
                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30"
                                    />
                                    <input
                                        type="url"
                                        value={item.url}
                                        onChange={(e) => {
                                            const newItems = [...breadcrumbs];
                                            newItems[index].url = e.target.value;
                                            setBreadcrumbs(newItems);
                                        }}
                                        placeholder="URL"
                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30"
                                    />
                                    {breadcrumbs.length > 1 && (
                                        <button onClick={() => setBreadcrumbs(breadcrumbs.filter((_, i) => i !== index))} className="text-red-400 hover:text-red-300">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button onClick={() => setBreadcrumbs([...breadcrumbs, { name: "", url: "" }])} className="flex items-center gap-2 text-white font-medium">
                                <Plus className="w-4 h-4" /> Ajouter un niveau
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Right: Preview */}
            <div className="space-y-6">
                {/* Completeness Score */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-white">Complétude</span>
                        <span className={`text-2xl font-bold ${score >= 70 ? 'text-emerald-400' : score >= 40 ? 'text-amber-400' : 'text-red-400'}`}>
                            {score}%
                        </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${score >= 70 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : score >= 40 ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 'bg-gradient-to-r from-red-500 to-red-400'}`}
                            style={{ width: `${score}%` }}
                        />
                    </div>
                    <p className="text-sm text-soft-light mt-2">
                        {score >= 70 ? "Excellent ! Votre schema est bien rempli." : score >= 40 ? "Bon début. Complétez les champs recommandés." : "Ajoutez plus d'informations pour un schema efficace."}
                    </p>
                </div>

                {/* JSON Preview */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden sticky top-24">
                    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-red-500" />
                                <span className="w-3 h-3 rounded-full bg-amber-500" />
                                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                            </div>
                            <span className="font-mono text-sm text-soft-light ml-2">schema.json</span>
                        </div>
                        <div className="flex gap-2">
                            <a
                                href="https://search.google.com/test/rich-results"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-1.5 text-sm text-soft-light hover:text-white transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Tester
                            </a>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-1.5 bg-sauge text-white rounded-lg text-sm font-medium hover:bg-sauge/80 transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copié !" : "Copier"}
                            </button>
                        </div>
                    </div>
                    <pre className="p-4 text-sm overflow-x-auto max-h-[500px] font-mono">
                        <code className="text-white/80">
                            {`<script type="application/ld+json">\n${schemaString}\n</script>`.split('\n').map((line, i) => (
                                <div key={i} className="leading-relaxed">
                                    {line.includes('"@') ? (
                                        <span className="text-violet-400">{line}</span>
                                    ) : line.includes('":') ? (
                                        <>
                                            <span className="text-cyan-400">{line.split('":')[0]}"</span>
                                            <span className="text-white">:</span>
                                            <span className="text-emerald-400">{line.split('":')[1]}</span>
                                        </>
                                    ) : (
                                        <span>{line}</span>
                                    )}
                                </div>
                            ))}
                        </code>
                    </pre>
                </div>

                {/* Instructions */}
                <div className="bg-sauge/10 rounded-2xl p-6 border border-sauge/20">
                    <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-white" />
                        Comment utiliser ce code ?
                    </h3>
                    <ol className="space-y-2 text-sm text-soft-light">
                        <li className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-sauge/20 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                            <span>Copiez le code JSON-LD ci-dessus</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-sauge/20 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                            <span>Collez-le dans le <code className="bg-white/10 px-1.5 py-0.5 rounded text-white">&lt;head&gt;</code> de votre page</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-sauge/20 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                            <span>Testez avec <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="text-white underline">Rich Results Test</a></span>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-sauge/20 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                            <span>Attendez que Google recrawle votre page</span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

// Helper component for form fields
function FormField({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    multiline = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    multiline?: boolean;
}) {
    return (
        <div>
            <label className="block text-sm font-bold text-white mb-2">{label}</label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-sauge/50 focus:border-sauge/50 transition-all resize-none"
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-sauge/50 focus:border-sauge/50 transition-all"
                />
            )}
        </div>
    );
}
