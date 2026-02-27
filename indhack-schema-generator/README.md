# Schema JSON-LD Generator — React Component

A lightweight, open-source React component for generating valid Schema.org JSON-LD structured data markup. Supports LocalBusiness, Article, FAQ, Product, Organization, and more.

## Features

- **10+ Schema types** supported (LocalBusiness, Article, FAQ, Product, Event, Organization, Person, Recipe, HowTo, BreadcrumbList)
- **Google Rich Results compliant** — follows Google's structured data guidelines
- **Zero dependencies** — pure React component
- **Copy-paste output** — generates ready-to-use JSON-LD code
- **i18n ready** — works with any language

## Quick Start

```bash
npm install indhack-schema-generator
```

```tsx
import { SchemaGenerator } from 'indhack-schema-generator';

function App() {
  return <SchemaGenerator type="LocalBusiness" />;
}
```

## Live Demo

**Try the full-featured version with a premium GUI for free:**

**[Schema JSON-LD Generator — INDHACK](https://indhack.com/outils/generateur-schema-json-ld)**

The hosted version includes:
- Visual form builder with real-time preview
- Instant validation against Google's requirements
- One-click copy for all schema types
- French & English interface

## Supported Schema Types

| Type | Google Rich Result | Status |
|------|-------------------|--------|
| LocalBusiness | Yes | Stable |
| Article | Yes | Stable |
| FAQ | Yes | Stable |
| Product | Yes | Stable |
| Organization | Yes | Stable |
| Person | Yes | Stable |
| Event | Yes | Stable |
| Recipe | Yes | Stable |
| HowTo | Yes | Stable |
| BreadcrumbList | Yes | Stable |

## Usage Examples

### LocalBusiness Schema

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "My Business",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Nice",
    "postalCode": "06000",
    "addressCountry": "FR"
  },
  "telephone": "+33 4 93 00 00 00",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }
}
```

### Article Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to implement JSON-LD",
  "author": {
    "@type": "Person",
    "name": "Indiana"
  },
  "datePublished": "2026-02-27",
  "publisher": {
    "@type": "Organization",
    "name": "IndHack",
    "logo": {
      "@type": "ImageObject",
      "url": "https://indhack.com/logo.png"
    }
  }
}
```

### FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is JSON-LD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON-LD is a method of encoding Linked Data using JSON."
      }
    }
  ]
}
```

## API Reference

### SchemaGenerator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `"LocalBusiness"` | The schema type to generate |
| `defaultValues` | `object` | `{}` | Pre-fill form with default values |
| `onGenerate` | `function` | - | Callback when schema is generated |
| `theme` | `"light" \| "dark"` | `"dark"` | Color theme |

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License — see [LICENSE](LICENSE) for details.

## Links

- [Live Demo](https://indhack.com/outils/generateur-schema-json-ld)
- [INDHACK — Outils SEO Gratuits](https://indhack.com/outils)
- [Blog — Conseils SEO](https://indhack.com/blog)
- [Report a Bug](https://github.com/indhack/indhack-schema-generator/issues)

---

Built with love by [INDHACK](https://indhack.com) — Consultante SEO & Developpeuse
