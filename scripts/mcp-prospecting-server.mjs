#!/usr/bin/env node
/**
 * MCP Prospecting Server for Claude Code
 *
 * Ce serveur MCP permet à Claude Code d'accéder aux données de prospection
 * basées sur l'étude GMB des restaurants de la Côte d'Azur.
 *
 * Usage: node scripts/mcp-prospecting-server.mjs
 *
 * Tools disponibles:
 * - search_prospects: Rechercher des prospects par ville/critères
 * - get_hot_leads: Obtenir les leads chauds (score faible)
 * - get_prospect_details: Détails d'un prospect spécifique
 * - export_prospects_csv: Exporter en CSV
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "../public/data/gmb-study-cote-azur-2026.json");

// Load GMB data
let gmbData = null;
let allProspects = [];

function loadData() {
    try {
        const raw = fs.readFileSync(DATA_PATH, "utf-8");
        gmbData = JSON.parse(raw);

        // Flatten all restaurants into prospects array
        allProspects = [];
        for (const [cityName, cityData] of Object.entries(gmbData.citiesData)) {
            if (cityData.restaurants) {
                for (const restaurant of cityData.restaurants) {
                    allProspects.push({
                        ...restaurant,
                        cityName,
                        population: cityData.cityInfo?.population,
                        // Calculate lead score (inverse of completeness - lower = hotter lead)
                        leadScore: 10 - (restaurant.analysis?.completenessScore || 0),
                        // Identify specific opportunities
                        opportunities: identifyOpportunities(restaurant),
                    });
                }
            }
        }

        console.error(`[MCP Prospecting] Loaded ${allProspects.length} prospects from ${Object.keys(gmbData.citiesData).length} cities`);
    } catch (err) {
        console.error("[MCP Prospecting] Error loading data:", err.message);
    }
}

function identifyOpportunities(restaurant) {
    const opportunities = [];
    const analysis = restaurant.analysis || {};

    if (!analysis.hasWebsite) opportunities.push("Création site web");
    if (!analysis.hasPhone) opportunities.push("Ajout téléphone GMB");
    if (!analysis.hasHours) opportunities.push("Ajout horaires GMB");
    if (!analysis.hasPhotos) opportunities.push("Ajout photos GMB");
    if (analysis.reviewCount < 10) opportunities.push("Stratégie avis clients");
    if (analysis.completenessScore < 5) opportunities.push("Optimisation fiche GMB complète");
    if (analysis.rating && analysis.rating < 4.0) opportunities.push("Gestion e-réputation");

    return opportunities;
}

// Create MCP server
const server = new Server(
    {
        name: "indhack-prospecting",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "search_prospects",
                description: "Rechercher des prospects (restaurants) par ville et/ou critères. Retourne les entreprises locales qui ont besoin de services SEO/web.",
                inputSchema: {
                    type: "object",
                    properties: {
                        city: {
                            type: "string",
                            description: "Filtrer par ville (Nice, Cannes, Antibes, Monaco, Menton, Grasse, Cagnes-sur-Mer, Vence, Saint-Paul-de-Vence, Villefranche-sur-Mer)",
                        },
                        minLeadScore: {
                            type: "number",
                            description: "Score de lead minimum (1-10, plus haut = plus chaud). Par défaut 5.",
                        },
                        hasWebsite: {
                            type: "boolean",
                            description: "true = avec site web, false = sans site web (opportunité création)",
                        },
                        maxResults: {
                            type: "number",
                            description: "Nombre max de résultats (défaut 20)",
                        },
                    },
                },
            },
            {
                name: "get_hot_leads",
                description: "Obtenir les leads les plus chauds - restaurants avec le plus d'opportunités business (pas de site, fiche incomplète, peu d'avis).",
                inputSchema: {
                    type: "object",
                    properties: {
                        limit: {
                            type: "number",
                            description: "Nombre de leads à retourner (défaut 10)",
                        },
                        city: {
                            type: "string",
                            description: "Filtrer par ville (optionnel)",
                        },
                    },
                },
            },
            {
                name: "get_cities_stats",
                description: "Obtenir les statistiques par ville - nombre de prospects, score moyen, opportunités principales.",
                inputSchema: {
                    type: "object",
                    properties: {},
                },
            },
            {
                name: "get_prospect_details",
                description: "Obtenir les détails complets d'un prospect par son nom.",
                inputSchema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "Nom du restaurant",
                        },
                    },
                    required: ["name"],
                },
            },
            {
                name: "export_prospects_csv",
                description: "Exporter les prospects en format CSV pour import dans un CRM.",
                inputSchema: {
                    type: "object",
                    properties: {
                        city: {
                            type: "string",
                            description: "Filtrer par ville (optionnel)",
                        },
                        minLeadScore: {
                            type: "number",
                            description: "Score minimum (optionnel)",
                        },
                    },
                },
            },
            {
                name: "generate_outreach_message",
                description: "Générer un message de prospection personnalisé pour un restaurant.",
                inputSchema: {
                    type: "object",
                    properties: {
                        restaurantName: {
                            type: "string",
                            description: "Nom du restaurant",
                        },
                        channel: {
                            type: "string",
                            enum: ["email", "linkedin", "phone"],
                            description: "Canal de prospection",
                        },
                    },
                    required: ["restaurantName"],
                },
            },
        ],
    };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
        case "search_prospects": {
            let results = [...allProspects];

            if (args?.city) {
                results = results.filter(p =>
                    p.cityName.toLowerCase().includes(args.city.toLowerCase())
                );
            }

            if (args?.minLeadScore !== undefined) {
                results = results.filter(p => p.leadScore >= args.minLeadScore);
            }

            if (args?.hasWebsite !== undefined) {
                results = results.filter(p =>
                    args.hasWebsite ? p.website : !p.website
                );
            }

            // Sort by lead score (hottest first)
            results.sort((a, b) => b.leadScore - a.leadScore);

            const limit = args?.maxResults || 20;
            results = results.slice(0, limit);

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            totalFound: results.length,
                            prospects: results.map(p => ({
                                name: p.name,
                                city: p.cityName,
                                rating: p.rating,
                                reviews: p.reviews,
                                website: p.website || "AUCUN",
                                leadScore: p.leadScore,
                                opportunities: p.opportunities,
                                address: p.address,
                            })),
                        }, null, 2),
                    },
                ],
            };
        }

        case "get_hot_leads": {
            let results = [...allProspects];

            if (args?.city) {
                results = results.filter(p =>
                    p.cityName.toLowerCase().includes(args.city.toLowerCase())
                );
            }

            // Sort by lead score and number of opportunities
            results.sort((a, b) => {
                const scoreA = a.leadScore + a.opportunities.length;
                const scoreB = b.leadScore + b.opportunities.length;
                return scoreB - scoreA;
            });

            const limit = args?.limit || 10;
            results = results.slice(0, limit);

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            hotLeads: results.map((p, i) => ({
                                rank: i + 1,
                                name: p.name,
                                city: p.cityName,
                                leadScore: p.leadScore,
                                opportunities: p.opportunities,
                                website: p.website || "AUCUN SITE WEB",
                                rating: p.rating,
                                reviews: p.reviews,
                                address: p.address,
                                pitchAngle: p.opportunities.length > 3
                                    ? "Fiche GMB très incomplète - besoin urgent d'optimisation"
                                    : p.opportunities.includes("Création site web")
                                        ? "Pas de site web - opportunité création"
                                        : "Amélioration visibilité locale",
                            })),
                        }, null, 2),
                    },
                ],
            };
        }

        case "get_cities_stats": {
            const stats = {};

            for (const prospect of allProspects) {
                if (!stats[prospect.cityName]) {
                    stats[prospect.cityName] = {
                        city: prospect.cityName,
                        population: prospect.population,
                        totalProspects: 0,
                        avgLeadScore: 0,
                        withoutWebsite: 0,
                        withLowRating: 0,
                        opportunities: {},
                    };
                }

                const s = stats[prospect.cityName];
                s.totalProspects++;
                s.avgLeadScore += prospect.leadScore;
                if (!prospect.website) s.withoutWebsite++;
                if (prospect.rating && prospect.rating < 4.0) s.withLowRating++;

                for (const opp of prospect.opportunities) {
                    s.opportunities[opp] = (s.opportunities[opp] || 0) + 1;
                }
            }

            // Calculate averages
            for (const city of Object.values(stats)) {
                city.avgLeadScore = Math.round((city.avgLeadScore / city.totalProspects) * 10) / 10;
            }

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            totalCities: Object.keys(stats).length,
                            totalProspects: allProspects.length,
                            citiesStats: Object.values(stats).sort((a, b) => b.totalProspects - a.totalProspects),
                        }, null, 2),
                    },
                ],
            };
        }

        case "get_prospect_details": {
            const prospect = allProspects.find(p =>
                p.name.toLowerCase().includes(args.name.toLowerCase())
            );

            if (!prospect) {
                return {
                    content: [{ type: "text", text: `Prospect "${args.name}" non trouvé.` }],
                };
            }

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            ...prospect,
                            analysis: prospect.analysis,
                            suggestedApproach: generateApproach(prospect),
                        }, null, 2),
                    },
                ],
            };
        }

        case "export_prospects_csv": {
            let results = [...allProspects];

            if (args?.city) {
                results = results.filter(p =>
                    p.cityName.toLowerCase().includes(args.city.toLowerCase())
                );
            }

            if (args?.minLeadScore) {
                results = results.filter(p => p.leadScore >= args.minLeadScore);
            }

            results.sort((a, b) => b.leadScore - a.leadScore);

            // Generate CSV
            const headers = ["Nom", "Ville", "Adresse", "Note", "Avis", "Site Web", "Lead Score", "Opportunités"];
            const rows = results.map(p => [
                `"${p.name}"`,
                p.cityName,
                `"${p.address || ""}"`,
                p.rating || "",
                p.reviews || 0,
                p.website || "",
                p.leadScore,
                `"${p.opportunities.join(", ")}"`,
            ]);

            const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

            // Save to file
            const outputPath = path.join(__dirname, "../public/data/prospects-export.csv");
            fs.writeFileSync(outputPath, csv, "utf-8");

            return {
                content: [
                    {
                        type: "text",
                        text: `CSV exporté avec ${results.length} prospects.\nFichier: public/data/prospects-export.csv\n\nAperçu:\n${csv.split("\n").slice(0, 10).join("\n")}...`,
                    },
                ],
            };
        }

        case "generate_outreach_message": {
            const prospect = allProspects.find(p =>
                p.name.toLowerCase().includes(args.restaurantName.toLowerCase())
            );

            if (!prospect) {
                return {
                    content: [{ type: "text", text: `Restaurant "${args.restaurantName}" non trouvé.` }],
                };
            }

            const channel = args.channel || "email";
            const message = generateOutreachMessage(prospect, channel);

            return {
                content: [{ type: "text", text: message }],
            };
        }

        default:
            throw new Error(`Unknown tool: ${name}`);
    }
});

function generateApproach(prospect) {
    const approaches = [];

    if (!prospect.website) {
        approaches.push({
            priority: 1,
            service: "Création site web",
            pitch: `${prospect.name} n'a pas de site web. C'est une opportunité de création avec optimisation SEO local dès le départ.`,
        });
    }

    if (prospect.opportunities.includes("Optimisation fiche GMB complète")) {
        approaches.push({
            priority: 2,
            service: "Optimisation Google Business Profile",
            pitch: `La fiche GMB de ${prospect.name} est incomplète (score ${prospect.analysis?.completenessScore}/10). Une optimisation complète améliorerait significativement la visibilité.`,
        });
    }

    if (prospect.reviews < 10) {
        approaches.push({
            priority: 3,
            service: "Stratégie avis clients",
            pitch: `Avec seulement ${prospect.reviews} avis, ${prospect.name} manque de preuve sociale. Une stratégie de collecte d'avis boosterait la crédibilité.`,
        });
    }

    return approaches;
}

function generateOutreachMessage(prospect, channel) {
    const mainOpp = prospect.opportunities[0] || "Visibilité locale";

    if (channel === "email") {
        return `
OBJET: ${prospect.name} - Améliorer votre visibilité sur Google

Bonjour,

Je me permets de vous contacter car j'ai remarqué que votre restaurant ${prospect.name} à ${prospect.cityName} n'apparaît pas de façon optimale sur Google.

${!prospect.website ? "Vous n'avez actuellement pas de site web, ce qui vous fait perdre des clients qui recherchent un restaurant en ligne." : ""}
${prospect.analysis?.completenessScore < 5 ? "Votre fiche Google Business Profile est incomplète, ce qui limite votre visibilité dans les recherches locales." : ""}
${prospect.reviews < 10 ? `Avec ${prospect.reviews} avis, vous manquez de preuves sociales pour rassurer les nouveaux clients.` : ""}

Je suis consultant SEO spécialisé dans la restauration sur la Côte d'Azur. J'aide les restaurants comme le vôtre à apparaître en premier sur Google quand quelqu'un cherche "restaurant ${prospect.cityName}".

Seriez-vous disponible pour un appel de 15 minutes cette semaine ?

Cordialement,
[Votre nom]
IndHack - Consultant SEO
https://indhack.com
        `.trim();
    }

    if (channel === "linkedin") {
        return `
Bonjour,

Je viens de découvrir ${prospect.name} à ${prospect.cityName}. ${prospect.rating ? `Belle note de ${prospect.rating} étoiles !` : ""}

J'ai remarqué quelques opportunités pour améliorer votre visibilité en ligne${!prospect.website ? " (notamment l'absence de site web)" : ""}.

Je suis consultant SEO spécialisé restauration sur la Côte d'Azur. Seriez-vous ouvert à échanger 10 min sur ce sujet ?
        `.trim();
    }

    if (channel === "phone") {
        return `
SCRIPT APPEL - ${prospect.name}

1. ACCROCHE:
"Bonjour, je suis [Nom] de IndHack, je travaille avec des restaurants de ${prospect.cityName} pour améliorer leur visibilité sur Google."

2. QUALIFICATION:
"Est-ce que vous êtes le/la propriétaire ou gérant(e) de ${prospect.name} ?"

3. PROBLÈME:
${!prospect.website ? '"J\'ai remarqué que vous n\'avez pas de site web. Beaucoup de clients potentiels vous cherchent en ligne sans vous trouver."' : '"Votre fiche Google n\'est pas optimisée, ce qui limite votre visibilité quand les gens cherchent un restaurant."'}

4. SOLUTION:
"Je propose un audit gratuit de 15 minutes pour vous montrer exactement comment améliorer ça."

5. CLOSING:
"Seriez-vous disponible mardi ou jeudi en début d'après-midi ?"

OBJECTIONS:
- "Pas le temps" → "Je comprends. C'est justement pour vous faire gagner du temps que je propose cet audit gratuit de 15 min."
- "Ça marche bien comme ça" → "Super ! Et si vous pouviez avoir 20% de clients en plus grâce à Google, ça vous intéresserait ?"
        `.trim();
    }

    return "Canal non reconnu. Utilisez: email, linkedin, ou phone.";
}

// Main
async function main() {
    loadData();

    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error("[MCP Prospecting] Server started");
}

main().catch(console.error);
