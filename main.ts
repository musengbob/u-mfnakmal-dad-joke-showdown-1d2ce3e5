// Dad Joke Showdown — u-mfnakmal-dad-joke-showdown-1d2ce3e5
// Writes one dad joke to output/entry.txt and validates it:
//  - UTF-8 text, 1-200 code points, not only whitespace
//  - output file is byte-identical to the joke
// No dependencies. Node 22.18+ (type stripping) or newer.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I asked the librarian if the library had books on paranoia. She whispered, 'They're right behind you.'";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "./output";
const outPath = join(outDir, "entry.txt");

const codePoints = [...JOKE].length;
if (codePoints < 1 || codePoints > 200) {
  console.error(`Joke is ${codePoints} code points; must be 1-200.`);
  process.exit(1);
}
if (!JOKE.trim()) {
  console.error("Joke is only whitespace.");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, JOKE, "utf8");

const written = readFileSync(outPath, "utf8");
if (written !== JOKE) {
  console.error("Output is not byte-identical to the joke.");
  process.exit(1);
}

console.log(`Wrote ${outPath} (${codePoints} code points, ${Buffer.byteLength(JOKE, "utf8")} bytes).`);
