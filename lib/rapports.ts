// ═══════════════════════════════════════════════════════════
// Rapport Storage — fonctionne sur Vercel (serverless)
// Utilise un cache mémoire global + /tmp pour persistance runtime
// ═══════════════════════════════════════════════════════════

import fs from "fs";
import path from "path";

// En serverless, /tmp est le seul répertoire writable
const RAPPORTS_DIR = process.env.VERCEL
    ? path.join("/tmp", "rapports")
    : path.join(process.cwd(), "data", "rapports");

export interface RapportData {
    domain: string;
    url: string;
    score: number;
    maxScore: number;
    level: "invisible" | "partial" | "visible" | "excellent";
    levelLabel: string;
    pageTitle: string;
    wordCount: number;
    responseTime: number;
    hasLlmsTxt: boolean;
    categories: {
        accessibilite: { score: number; maxScore: number };
        semantique: { score: number; maxScore: number };
        eeat: { score: number; maxScore: number };
        format: { score: number; maxScore: number };
    };
    crawlers: {
        name: string;
        company: string;
        status: "allowed" | "blocked" | "not_mentioned";
    }[];
    recommendations: string[];
    testedAt: string;
    updatedAt: string;
}

// Cache mémoire global (survit entre les requêtes dans le même process)
const memoryCache = new Map<string, RapportData>();

function sanitizeDomain(domain: string): string {
    return domain
        .replace(/^(https?:\/\/)?(www\.)?/, "")
        .split("/")[0]
        .toLowerCase()
        .replace(/[^a-z0-9.-]/g, "");
}

function getFilePath(domain: string): string {
    return path.join(RAPPORTS_DIR, `${sanitizeDomain(domain)}.json`);
}

export function saveRapport(data: RapportData): void {
    const key = sanitizeDomain(data.domain);
    memoryCache.set(key, data);

    // Aussi sauvegarder en fichier pour persistance
    try {
        if (!fs.existsSync(RAPPORTS_DIR)) {
            fs.mkdirSync(RAPPORTS_DIR, { recursive: true });
        }
        fs.writeFileSync(getFilePath(data.domain), JSON.stringify(data, null, 2), "utf-8");
    } catch {
        // On serverless, /tmp writes might fail — memory cache is the fallback
    }
}

export function getRapport(domain: string): RapportData | null {
    const key = sanitizeDomain(domain);

    // 1. Memory cache
    if (memoryCache.has(key)) {
        return memoryCache.get(key)!;
    }

    // 2. File system
    try {
        const filePath = getFilePath(domain);
        if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, "utf-8");
            const data = JSON.parse(raw) as RapportData;
            memoryCache.set(key, data);
            return data;
        }
    } catch {
        // File not found or corrupted
    }

    return null;
}

export function listRapports(): RapportData[] {
    // Merge memory + file system
    const all = new Map<string, RapportData>();

    // From files
    try {
        if (fs.existsSync(RAPPORTS_DIR)) {
            const files = fs.readdirSync(RAPPORTS_DIR).filter((f) => f.endsWith(".json"));
            for (const file of files) {
                try {
                    const raw = fs.readFileSync(path.join(RAPPORTS_DIR, file), "utf-8");
                    const data = JSON.parse(raw) as RapportData;
                    all.set(sanitizeDomain(data.domain), data);
                } catch {
                    // skip
                }
            }
        }
    } catch {
        // /tmp might not exist yet
    }

    // Memory cache overrides files (more recent)
    memoryCache.forEach((data, key) => {
        all.set(key, data);
    });

    return Array.from(all.values()).sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
}

export { sanitizeDomain };
