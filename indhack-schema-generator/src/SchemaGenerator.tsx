"use client";

import React, { useState, useCallback, useEffect } from "react";
import type { SchemaGeneratorProps, SchemaType, FAQItem, HowToStep, BreadcrumbItem, OpeningHours } from "./types";

const SCHEMA_TYPES: { id: SchemaType; label: string; description: string }[] = [
  { id: "LocalBusiness", label: "LocalBusiness", description: "Local business (store, restaurant, office...)" },
  { id: "FAQPage", label: "FAQPage", description: "FAQ page with questions/answers" },
  { id: "Article", label: "Article", description: "Blog post or news article" },
  { id: "Organization", label: "Organization", description: "Organization or company" },
  { id: "Person", label: "Person", description: "Person (freelancer, expert...)" },
  { id: "Product", label: "Product", description: "E-commerce product" },
  { id: "HowTo", label: "HowTo", description: "Step-by-step tutorial" },
  { id: "Event", label: "Event", description: "Event" },
  { id: "BreadcrumbList", label: "BreadcrumbList", description: "Breadcrumb navigation" },
];

export function SchemaGenerator({
  type = "LocalBusiness",
  defaultValues = {},
  onGenerate,
  theme = "dark",
}: SchemaGeneratorProps) {
  const [activeType, setActiveType] = useState<SchemaType>(type);
  const [copied, setCopied] = useState(false);

  // LocalBusiness fields
  const [businessName, setBusinessName] = useState(defaultValues.businessName as string || "");
  const [businessType, setBusinessType] = useState(defaultValues.businessType as string || "LocalBusiness");
  const [description, setDescription] = useState(defaultValues.description as string || "");
  const [streetAddress, setStreetAddress] = useState(defaultValues.streetAddress as string || "");
  const [city, setCity] = useState(defaultValues.city as string || "");
  const [postalCode, setPostalCode] = useState(defaultValues.postalCode as string || "");
  const [country, setCountry] = useState(defaultValues.country as string || "FR");
  const [phone, setPhone] = useState(defaultValues.phone as string || "");
  const [email, setEmail] = useState(defaultValues.email as string || "");
  const [website, setWebsite] = useState(defaultValues.website as string || "");
  const [logo, setLogo] = useState(defaultValues.logo as string || "");
  const [latitude, setLatitude] = useState(defaultValues.latitude as string || "");
  const [longitude, setLongitude] = useState(defaultValues.longitude as string || "");
  const [priceRange, setPriceRange] = useState(defaultValues.priceRange as string || "");
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
  const [eventUrl, setEventUrl] = useState("");

  // BreadcrumbList fields
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { name: "Home", url: "" },
    { name: "", url: "" },
  ]);

  // Generate JSON-LD based on active type
  const generateSchema = useCallback(() => {
    let schema: Record<string, unknown> = {};

    switch (activeType) {
      case "LocalBusiness":
        schema = {
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
        break;

      case "FAQPage":
        const validFaqs = faqItems.filter(f => f.question && f.answer);
        schema = {
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
        break;

      case "Article":
        schema = {
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
        break;

      case "Organization":
        const validSameAs = orgSameAs.filter(s => s.trim());
        schema = {
          "@context": "https://schema.org",
          "@type": "Organization",
          ...(orgName && { name: orgName }),
          ...(orgUrl && { url: orgUrl }),
          ...(orgLogo && { logo: orgLogo }),
          ...(validSameAs.length > 0 && { sameAs: validSameAs }),
        };
        break;

      case "Person":
        schema = {
          "@context": "https://schema.org",
          "@type": "Person",
          ...(personName && { name: personName }),
          ...(personJobTitle && { jobTitle: personJobTitle }),
          ...(personWorksFor && { worksFor: { "@type": "Organization", name: personWorksFor } }),
          ...(personUrl && { url: personUrl }),
          ...(personImage && { image: personImage }),
        };
        break;

      case "Product":
        schema = {
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
        break;

      case "HowTo":
        const validSteps = howToSteps.filter(s => s.name && s.text);
        schema = {
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
        break;

      case "Event":
        schema = {
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
          ...(eventUrl && { url: eventUrl }),
        };
        break;

      case "BreadcrumbList":
        const validBreadcrumbs = breadcrumbs.filter(b => b.name);
        schema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: validBreadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            ...(item.url && { item: item.url }),
          }))
        };
        break;
    }

    return schema;
  }, [
    activeType, businessName, businessType, description, streetAddress, city, postalCode, country,
    phone, email, website, logo, latitude, longitude, priceRange, openingHours,
    faqItems, articleTitle, articleAuthor, articleDate, articleModified, articleImage, articlePublisher, articlePublisherLogo,
    orgName, orgLogo, orgUrl, orgSameAs, personName, personJobTitle, personWorksFor, personUrl, personImage,
    productName, productDescription, productImage, productBrand, productSku, productPrice, productCurrency, productAvailability,
    howToName, howToDescription, howToSteps, eventName, eventStartDate, eventEndDate, eventLocation, eventDescription, eventUrl,
    breadcrumbs
  ]);

  const schema = generateSchema();
  const schemaString = JSON.stringify(schema, null, 2);

  // Call onGenerate callback when schema changes
  useEffect(() => {
    if (onGenerate) {
      onGenerate(schema);
    }
  }, [schema, onGenerate]);

  const handleCopy = async () => {
    const scriptTag = `<script type="application/ld+json">\n${schemaString}\n</script>`;
    await navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-gray-900" : "bg-white";
  const textClass = isDark ? "text-white" : "text-gray-900";
  const inputClass = isDark
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500";

  return (
    <div className={`grid lg:grid-cols-2 gap-8 p-6 ${bgClass} rounded-2xl`}>
      {/* Left: Form */}
      <div className="space-y-6">
        {/* Schema Type Tabs */}
        <div className="flex flex-wrap gap-2">
          {SCHEMA_TYPES.map((schemaType) => (
            <button
              key={schemaType.id}
              onClick={() => setActiveType(schemaType.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeType === schemaType.id
                  ? "bg-green-600 text-white"
                  : isDark
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {schemaType.label}
            </button>
          ))}
        </div>

        {/* Dynamic Form */}
        <div className={`p-6 rounded-xl border ${isDark ? "border-gray-700" : "border-gray-200"}`}>
          {activeType === "LocalBusiness" && (
            <div className="space-y-4">
              <FormField label="Business Name *" value={businessName} onChange={setBusinessName} placeholder="My Business" isDark={isDark} />
              <FormField label="Business Type" value={businessType} onChange={setBusinessType} placeholder="Restaurant, Plumber, LegalService..." isDark={isDark} />
              <FormField label="Description" value={description} onChange={setDescription} placeholder="Short description of your business" isDark={isDark} multiline />
              <FormField label="Street Address" value={streetAddress} onChange={setStreetAddress} placeholder="123 Main St" isDark={isDark} />
              <div className="grid grid-cols-2 gap-4">
                <FormField label="City" value={city} onChange={setCity} placeholder="Nice" isDark={isDark} />
                <FormField label="Postal Code" value={postalCode} onChange={setPostalCode} placeholder="06000" isDark={isDark} />
              </div>
              <FormField label="Phone" value={phone} onChange={setPhone} placeholder="+33 4 93 00 00 00" isDark={isDark} />
              <FormField label="Email" value={email} onChange={setEmail} placeholder="contact@example.com" type="email" isDark={isDark} />
              <FormField label="Website" value={website} onChange={setWebsite} placeholder="https://example.com" type="url" isDark={isDark} />
              <FormField label="Logo URL" value={logo} onChange={setLogo} placeholder="https://example.com/logo.png" type="url" isDark={isDark} />
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Latitude" value={latitude} onChange={setLatitude} placeholder="43.7102" isDark={isDark} />
                <FormField label="Longitude" value={longitude} onChange={setLongitude} placeholder="7.2620" isDark={isDark} />
              </div>
              <FormField label="Price Range" value={priceRange} onChange={setPriceRange} placeholder="$$" isDark={isDark} />
            </div>
          )}

          {activeType === "FAQPage" && (
            <div className="space-y-4">
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-4`}>
                Add your questions and answers to create a structured FAQ page.
              </p>
              {faqItems.map((item, index) => (
                <div key={index} className={`p-4 rounded-xl space-y-3 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold ${textClass}`}>Question {index + 1}</span>
                    {faqItems.length > 1 && (
                      <button
                        onClick={() => setFaqItems(faqItems.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-400 text-sm"
                      >
                        Remove
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
                    placeholder="Your question?"
                    className={`w-full px-4 py-3 border rounded-xl ${inputClass}`}
                  />
                  <textarea
                    value={item.answer}
                    onChange={(e) => {
                      const newItems = [...faqItems];
                      newItems[index].answer = e.target.value;
                      setFaqItems(newItems);
                    }}
                    placeholder="The answer..."
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-xl resize-none ${inputClass}`}
                  />
                </div>
              ))}
              <button
                onClick={() => setFaqItems([...faqItems, { question: "", answer: "" }])}
                className="text-green-600 font-medium hover:text-green-500"
              >
                + Add Question
              </button>
            </div>
          )}

          {activeType === "Article" && (
            <div className="space-y-4">
              <FormField label="Article Title *" value={articleTitle} onChange={setArticleTitle} placeholder="How to optimize your SEO in 2026" isDark={isDark} />
              <FormField label="Author *" value={articleAuthor} onChange={setArticleAuthor} placeholder="John Doe" isDark={isDark} />
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Published Date" value={articleDate} onChange={setArticleDate} type="date" isDark={isDark} />
                <FormField label="Modified Date" value={articleModified} onChange={setArticleModified} type="date" isDark={isDark} />
              </div>
              <FormField label="Image URL" value={articleImage} onChange={setArticleImage} placeholder="https://example.com/image.jpg" type="url" isDark={isDark} />
              <FormField label="Publisher Name" value={articlePublisher} onChange={setArticlePublisher} placeholder="My Company" isDark={isDark} />
              <FormField label="Publisher Logo URL" value={articlePublisherLogo} onChange={setArticlePublisherLogo} placeholder="https://example.com/logo.png" type="url" isDark={isDark} />
            </div>
          )}

          {/* Add more schema type forms as needed */}
        </div>
      </div>

      {/* Right: Preview */}
      <div className="space-y-6">
        {/* JSON Preview */}
        <div className={`rounded-xl border overflow-hidden ${isDark ? "border-gray-700" : "border-gray-200"}`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"}`}>
            <span className={`font-mono text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>schema.json</span>
            <button
              onClick={handleCopy}
              className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-500 transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className={`p-4 text-sm overflow-x-auto max-h-[500px] font-mono ${isDark ? "bg-gray-900" : "bg-white"}`}>
            <code className={isDark ? "text-gray-300" : "text-gray-700"}>
              {`<script type="application/ld+json">\n${schemaString}\n</script>`}
            </code>
          </pre>
        </div>

        {/* Instructions */}
        <div className={`rounded-xl p-6 ${isDark ? "bg-green-900/20 border border-green-800" : "bg-green-50 border border-green-200"}`}>
          <h3 className={`font-bold mb-3 ${textClass}`}>How to use this code?</h3>
          <ol className={`space-y-2 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            <li>1. Copy the JSON-LD code above</li>
            <li>2. Paste it in the &lt;head&gt; of your page</li>
            <li>3. Test with Google's Rich Results Test</li>
            <li>4. Wait for Google to recrawl your page</li>
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
  isDark = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  isDark?: boolean;
}) {
  const inputClass = isDark
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500";

  return (
    <div>
      <label className={`block text-sm font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={`w-full px-4 py-3 border rounded-xl resize-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 ${inputClass}`}
        />
      )}
    </div>
  );
}
