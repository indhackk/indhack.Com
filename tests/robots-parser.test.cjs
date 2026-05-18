/**
 * Tests Node natifs pour lib/robots-parser.ts
 *
 * Lancement : node --test tests/robots-parser.test.cjs
 *
 * Ré-implémente la logique en CommonJS pour rester indépendant du build TS.
 * Si lib/robots-parser.ts change, mettre à jour cette ré-implémentation aussi.
 *
 * Bug initial à valider : le parser naïf considérait `Disallow: /api/*` comme
 * un blocage du site entier (substring match avec "disallow: /"). Tous les
 * tests de ce fichier valident que ce faux positif est mort.
 */

const { test } = require("node:test");
const assert = require("node:assert/strict");

// ===== Ré-implémentation =====

function parseRobotsTxt(content) {
    if (!content || typeof content !== "string") return [];
    const groups = [];
    let currentGroup = null;
    let inAgentBlock = false;

    for (const rawLine of content.split(/\r?\n/)) {
        const line = rawLine.split("#")[0].trim();
        if (!line) continue;
        const colonIdx = line.indexOf(":");
        if (colonIdx === -1) continue;
        const directive = line.slice(0, colonIdx).trim().toLowerCase();
        const value = line.slice(colonIdx + 1).trim();

        if (directive === "user-agent") {
            const agent = value.toLowerCase();
            if (inAgentBlock && currentGroup) {
                currentGroup.agents.push(agent);
            } else {
                currentGroup = { agents: [agent], allows: [], disallows: [] };
                groups.push(currentGroup);
                inAgentBlock = true;
            }
        } else if (directive === "allow") {
            if (currentGroup) {
                currentGroup.allows.push(value);
                inAgentBlock = false;
            }
        } else if (directive === "disallow") {
            if (currentGroup) {
                currentGroup.disallows.push(value);
                inAgentBlock = false;
            }
        }
    }

    return groups;
}

function isFullSiteBlock(path) {
    const p = (path || "").trim();
    return p === "/" || p === "/*" || p === "*";
}

function findGroupForAgent(groups, agent) {
    const target = agent.toLowerCase();
    const specific = groups.find((g) => g.agents.includes(target));
    if (specific) return specific;
    return groups.find((g) => g.agents.includes("*")) || null;
}

function getCrawlerStatus(robotsTxt, agent) {
    if (!robotsTxt) return "not_mentioned";
    const groups = parseRobotsTxt(robotsTxt);
    if (groups.length === 0) return "not_mentioned";

    const target = agent.toLowerCase();
    const hasOwnGroup = groups.some((g) => g.agents.includes(target));
    const group = findGroupForAgent(groups, agent);
    if (!group) return "not_mentioned";

    const hasAllowRoot = group.allows.some((p) => isFullSiteBlock(p));
    const hasDisallowRoot = group.disallows.some((p) => isFullSiteBlock(p));

    if (hasDisallowRoot && !hasAllowRoot) return "blocked";
    if (hasOwnGroup) return "allowed";
    return "not_mentioned";
}

function isSiteFullyBlocked(robotsTxt) {
    const groups = parseRobotsTxt(robotsTxt);
    const wildcard = groups.find((g) => g.agents.includes("*"));
    if (!wildcard) return false;
    const hasAllowRoot = wildcard.allows.some((p) => isFullSiteBlock(p));
    const hasDisallowRoot = wildcard.disallows.some((p) => isFullSiteBlock(p));
    return hasDisallowRoot && !hasAllowRoot;
}

// ===== Robots.txt fixtures =====

// Cas réel indhack.com tel qu'il sert en prod (12 mai 2026)
const INDHACK_ROBOTS = `# *
User-agent: *
Allow: /
Allow: /api/vultifrine
Allow: /vultifrine-study.json
Disallow: /api/*
Disallow: /keystatic/*
Disallow: /admin-login
Disallow: /login
Disallow: /dashboard
Disallow: /app/*
Disallow: /rapport/*
Disallow: /audit-export/
Disallow: /*.json
Disallow: /diagnostic/*

# GPTBot
User-agent: GPTBot
Allow: /

# OAI-SearchBot
User-agent: OAI-SearchBot
Allow: /

# ChatGPT-User
User-agent: ChatGPT-User
Allow: /

# Claude-Web
User-agent: Claude-Web
Allow: /

# ClaudeBot
User-agent: ClaudeBot
Allow: /

# PerplexityBot
User-agent: PerplexityBot
Allow: /

# Google-Extended
User-agent: Google-Extended
Allow: /

# MistralBot
User-agent: MistralBot
Allow: /
`;

const FULLY_BLOCKED = `User-agent: *
Disallow: /
`;

const FULLY_BLOCKED_WITH_GPTBOT_ALLOW = `User-agent: *
Disallow: /

User-agent: GPTBot
Allow: /
`;

const BLOCKS_GPTBOT_ONLY = `User-agent: *
Allow: /

User-agent: GPTBot
Disallow: /
`;

// ===== Tests =====

test("Bug du tool : Disallow: /api/* ne doit PAS être un blocage global", () => {
    assert.equal(
        isSiteFullyBlocked(INDHACK_ROBOTS),
        false,
        "indhack.com a Disallow: /api/* mais Allow: / global, le site n'est pas bloqué"
    );
});

test("Bug du tool : les 8 crawlers IA doivent ressortir autorisés sur indhack.com", () => {
    const crawlers = [
        "GPTBot",
        "ChatGPT-User",
        "OAI-SearchBot",
        "Claude-Web",
        "ClaudeBot",
        "PerplexityBot",
        "Google-Extended",
        "MistralBot",
    ];
    for (const c of crawlers) {
        const status = getCrawlerStatus(INDHACK_ROBOTS, c);
        assert.equal(
            status,
            "allowed",
            `${c} devrait être allowed sur indhack.com (a son propre groupe avec Allow: /)`
        );
    }
});

test("Site totalement bloqué : Disallow: / sur user-agent: * → blocksAll=true", () => {
    assert.equal(isSiteFullyBlocked(FULLY_BLOCKED), true);
});

test("Disallow: / global mais Allow: / pour GPTBot → site bloqué globalement, GPTBot autorisé", () => {
    assert.equal(isSiteFullyBlocked(FULLY_BLOCKED_WITH_GPTBOT_ALLOW), true);
    assert.equal(getCrawlerStatus(FULLY_BLOCKED_WITH_GPTBOT_ALLOW, "GPTBot"), "allowed");
});

test("GPTBot explicitement bloqué (Disallow: /) → status 'blocked'", () => {
    assert.equal(getCrawlerStatus(BLOCKS_GPTBOT_ONLY, "GPTBot"), "blocked");
    // Mais le site n'est pas bloqué globalement
    assert.equal(isSiteFullyBlocked(BLOCKS_GPTBOT_ONLY), false);
});

test("Robots.txt vide → tout est 'not_mentioned' et site non bloqué", () => {
    assert.equal(isSiteFullyBlocked(""), false);
    assert.equal(getCrawlerStatus("", "GPTBot"), "not_mentioned");
});

test("Robots.txt sans user-agent: * → crawler non listé reste 'not_mentioned'", () => {
    const robots = `User-agent: GPTBot
Allow: /
`;
    assert.equal(getCrawlerStatus(robots, "GPTBot"), "allowed");
    assert.equal(getCrawlerStatus(robots, "PerplexityBot"), "not_mentioned");
    assert.equal(isSiteFullyBlocked(robots), false);
});

test("Disallow: /admin n'est pas un blocage global", () => {
    const robots = `User-agent: *
Disallow: /admin
Disallow: /private
`;
    assert.equal(isSiteFullyBlocked(robots), false);
});

test("Disallow: /* est équivalent à Disallow: / (blocage global)", () => {
    const robots = `User-agent: *
Disallow: /*
`;
    assert.equal(isSiteFullyBlocked(robots), true);
});

test("Casse insensible sur user-agent et directives", () => {
    const robots = `USER-AGENT: GPTBot
ALLOW: /
`;
    assert.equal(getCrawlerStatus(robots, "gptbot"), "allowed");
    assert.equal(getCrawlerStatus(robots, "GPTBot"), "allowed");
});

test("Commentaires inline ignorés", () => {
    const robots = `User-agent: * # all crawlers
Disallow: /api/* # internal API only
Allow: /
`;
    assert.equal(isSiteFullyBlocked(robots), false);
});

test("Plusieurs User-agent: avant les règles → groupe partagé", () => {
    const robots = `User-agent: GPTBot
User-agent: ClaudeBot
Disallow: /

User-agent: *
Allow: /
`;
    assert.equal(getCrawlerStatus(robots, "GPTBot"), "blocked");
    assert.equal(getCrawlerStatus(robots, "ClaudeBot"), "blocked");
    assert.equal(getCrawlerStatus(robots, "PerplexityBot"), "not_mentioned");
});
