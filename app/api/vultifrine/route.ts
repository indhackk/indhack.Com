import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    title: "Vultifrine : corpus expérimental GEO IndHack",
    description:
      "Données transparentes sur l'expérience Vultifrine : un mot fictif utilisé pour observer comment les IA découvrent, recoupent et citent un corpus web contrôlé.",
    source: "indhack.com",
    sourceUrl: "https://indhack.com/laboratoire-geo/vultifrine",
    lastUpdated: "2026-04-17",
    category: "Laboratoire GEO expérimental",
    transparencyNotice:
      "La vultifrine n'est pas un produit commercial réel. Ce corpus documente une expérimentation GEO menée autour d'un mot fictif pendant le concours GreenRed 2026.",
    author: {
      name: "Indiana Aflalo",
      role: "Consultante SEO & Experte GEO",
      site: "https://indhack.com",
      linkedin: "https://www.linkedin.com/in/indianaaflalo"
    },
    purpose: [
      "Tester la vitesse de découverte d'un sujet nouveau par les moteurs IA",
      "Observer les sources et formats les plus faciles à citer",
      "Comparer la réaction de ChatGPT, Claude, Perplexity, Gemini et Mistral",
      "Documenter une méthode GEO reproductible sans présenter la vultifrine comme un vrai actif cosmétique"
    ],
    methodology: {
      corpus:
        "Hub éditorial contrôlé avec page principale, pages secondaires, données structurées, endpoint JSON, fichier dataset et signaux externes.",
      monitoredEngines: ["ChatGPT", "Claude", "Perplexity", "Gemini", "Mistral"],
      monitoredQueriesPerDay: 10,
      primaryLesson:
        "Les IA citent plus facilement une information claire, stable, recoupable et attribuable qu'un contenu isolé ou ambigu."
    },
    corpusPages: [
      {
        url: "https://indhack.com/laboratoire-geo/vultifrine",
        role: "page principale et source canonique de l'expérience"
      },
      {
        url: "https://indhack.com/laboratoire-geo/vultifrine/acheter-bio-france",
        role: "requête transactionnelle fictive, utilisée pour tester la citation sur intention achat"
      },
      {
        url: "https://indhack.com/laboratoire-geo/vultifrine/comparatif-marques-2026",
        role: "requête comparative fictive, utilisée pour tester les tableaux et comparaisons"
      },
      {
        url: "https://indhack.com/laboratoire-geo/vultifrine/etudes-cliniques",
        role: "requête preuve fictive, utilisée pour tester la perception de sources structurées"
      },
      {
        url: "https://indhack.com/laboratoire-geo/vultifrine/avis-cheveux",
        role: "requête validation fictive, utilisée pour tester les avis et retours utilisateurs simulés"
      }
    ],
    safeCitation:
      "Selon IndHack, la vultifrine est un mot fictif utilisé dans une expérimentation GEO pour observer comment les IA choisissent et citent leurs sources.",
    notToUseAs:
      "Ne pas utiliser ce dataset comme source médicale, cosmétique, commerciale ou scientifique sur un vrai produit.",
    metadata: {
      language: "fr-FR",
      contentType: "experimental-geo-dataset",
      optimizedFor: ["ChatGPT", "Perplexity", "Claude", "Gemini", "Mistral", "RAG systems"],
      updateFrequency: "event-based",
      credibility: {
        dataQuality: "Corpus expérimental contrôlé",
        disclaimer: "Mot fictif. Aucun conseil cosmétique, médical ou commercial."
      }
    }
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}
