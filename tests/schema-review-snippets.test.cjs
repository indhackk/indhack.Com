const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");

const schemaSourceFiles = [
  "app/layout.tsx",
  "components/seo/JsonLdSchemas.tsx",
  "components/templates/CityPageTemplateV2.tsx",
  "app/laboratoire-geo/vultifrine/page.tsx",
];

test("public JSON-LD schemas do not publish synthetic review ratings", () => {
  const offenders = [];

  for (const relativePath of schemaSourceFiles) {
    const source = fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
    if (/\baggregateRating\b|\breviewRating\b|@type["']?\s*:\s*["']Review["']/.test(source)) {
      offenders.push(relativePath);
    }
  }

  assert.deepEqual(offenders, []);
});
