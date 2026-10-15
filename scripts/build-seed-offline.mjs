import { readFile, writeFile } from "node:fs/promises"
import { createHash } from "node:crypto"
import { build } from "esbuild"
import { offlineLanguages, offlineTranslations } from "../lib/seed-offline-translations.mjs"

const lists = Object.fromEntries(await Promise.all(offlineLanguages.map(async ([,, name]) => [name, JSON.parse(await readFile(new URL(`../lib/seed-wordlists/${name}.json`, import.meta.url), "utf8"))])))
const core = (await readFile(new URL("../lib/seed-generator.mjs", import.meta.url), "utf8")).replaceAll("export ", "")
const keyBundle = await build({ entryPoints: [new URL("../lib/seed-public-key.mjs", import.meta.url).pathname], bundle: true, write: false, format: "iife", globalName: "SeedKeys", platform: "browser", target: "es2020", minify: true })
const script = `${keyBundle.outputFiles[0].text}\n${core}
const lists = ${JSON.stringify(lists)};
const translations = ${JSON.stringify(offlineTranslations)};
const languages = ${JSON.stringify(offlineLanguages)};
const form = document.querySelector('form');
const input = document.querySelector('#entropy');
const passphrase = document.querySelector('#passphrase');
const output = document.querySelector('#output');
const randomOutput = document.querySelector('#random-output');
const progress = document.querySelector('#progress');
const interfaceSelect = document.querySelector('#interface-language');
let revision = 0;
let copy = translations.en;
function preferredLanguage(locales) {
 for (const locale of locales) {
  const code = locale.toLowerCase();
  if (code === 'zh' || code.startsWith('zh-')) return /(?:hant|tw|hk|mo)/.test(code) ? 'zh-hant' : 'zh-hans';
  const base = code.split('-')[0]; if (translations[base]) return base;
 }
 return 'en';
}
function resetResult() { revision++; output.replaceChildren(); randomOutput.replaceChildren(); const value = input.value.replace(/\\s/g, ''); progress.textContent = value.length + ' / ' + document.querySelector('#length').value + ' ' + copy.progress; }
function applyLanguage() {
 const language = interfaceSelect.value; copy = translations[language];
 document.documentElement.lang = language; document.title = copy.title;
 document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = copy[element.dataset.i18n]; });
 resetResult();
}
interfaceSelect.value = preferredLanguage(navigator.languages?.length ? navigator.languages : [navigator.language]);
interfaceSelect.addEventListener('change', applyLanguage);
applyLanguage();
function updatePoster() {
 const dictionary = document.querySelector('#language').value;
 const selected = languages.find(item => item[2] === dictionary);
 document.querySelector('#poster-title').textContent = 'BIP39 — ' + selected[1] + ' — 2,048';
 const grid = document.querySelector('#poster-grid'); grid.replaceChildren(); grid.lang = selected[0];
 lists[dictionary].forEach((word, index) => {
  const row = document.createElement('div');
  const number = document.createElement('span'); number.textContent = String(index).padStart(4, '0') + ' · ' + index.toString(2).padStart(11, '0');
  const value = document.createElement('strong'); value.textContent = word;
  row.append(number, value); grid.append(row);
 });
}
document.querySelector('#language').addEventListener('change', updatePoster);
document.querySelector('#print-dictionary').addEventListener('click', () => { updatePoster(); window.print(); });
window.addEventListener('beforeprint', updatePoster);
updatePoster();
form.addEventListener('input', resetResult);
form.addEventListener('change', resetResult);
async function calculate(event, target = output) {
 event?.preventDefault(); resetResult(); const current = revision;
 try {
  const compact = input.value.replace(/\\s/g, '');
  const isDice = document.querySelector('#mode').value === 'dice';
  if (isDice && !/^[1-6]*$/.test(compact)) { target.textContent = copy.invalidDice; return; }
  if (compact.length !== Number(document.querySelector('#length').value) || (!isDice && !/^[01]+$/.test(compact))) { target.textContent = copy.invalidLength; return; }
  const bits = isDice ? diceToBits(input.value) : compact;
  const dictionary = document.querySelector('#language').value;
  const result = await entropyToMnemonic(bits, lists[dictionary]);
  if (current !== revision) return;
  if (target === randomOutput) {
   const phrase = document.createElement('p'); phrase.lang = languages.find(item => item[2] === dictionary)[0]; phrase.textContent = result.words.join(' '); target.append(phrase); await showPublicKey(result.words, target, current); return;
  }
  const heading = document.createElement('h2'); heading.textContent = copy.recovery; target.append(heading);
  const list = document.createElement('ol'); list.lang = languages.find(item => item[2] === dictionary)[0];
  result.words.forEach((word, index) => { const li = document.createElement('li'); li.textContent = word + ' · ' + result.indices[index] + ' · ' + result.indices[index].toString(2).padStart(11, '0'); list.append(li); }); target.append(list);
  const details = document.createElement('p'); details.textContent = copy.checksum + ' ' + result.checksum + '. ' + copy.finalIndex + ' ' + result.indices.at(-1); target.append(details);
  await showPublicKey(result.words, target, current);
 } catch { if(current === revision) target.textContent = copy.failure; }
}
async function showPublicKey(words, target, current) {
 try {
  const key = await SeedKeys.mnemonicToPublicKey(words, passphrase.value);
  if (current !== revision) return;
  const heading = document.createElement('h3'); heading.textContent = copy.publicKey; target.append(heading);
  const note = document.createElement('p'); note.textContent = copy.publicKeyNote; target.append(note);
  const path = document.createElement('p'); path.textContent = SeedKeys.receivingKeyPath; path.dir = 'ltr'; target.append(path);
  const value = document.createElement('code'); value.textContent = key; value.dir = 'ltr'; target.append(value);
 } catch { if (current === revision) { const error = document.createElement('p'); error.textContent = copy.publicKeyFailure; target.append(error); } }
}
form.addEventListener('submit', (event) => { calculate(event); });
document.querySelector('#clear').addEventListener('click', () => { input.value = ''; passphrase.value = ''; resetResult(); });
document.querySelector('#generate').addEventListener('click', () => {
 input.value = ''; resetResult();
 try {
  const bits = generateEntropy(Number(document.querySelector('#length').value));
  document.querySelector('#mode').value = 'bits';
  input.value = bits;
  calculate(null, randomOutput);
 } catch { randomOutput.textContent = copy.randomFailure; }
});
window.addEventListener('pagehide', () => { input.value = ''; passphrase.value = ''; resetResult(); });`
const hash = createHash("sha256").update(script).digest("base64")
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;")
const translated = (tag, key, attributes = "") => `<${tag} data-i18n="${key}"${attributes ? ` ${attributes}` : ""}>${escape(offlineTranslations.en[key])}</${tag}>`
const options = (dictionary = false) => offlineLanguages.map(([code, label, file]) => `<option value="${dictionary ? file : code}">${label}</option>`).join("")
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'sha256-${hash}'; style-src 'unsafe-inline'; connect-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none'">
<title>${offlineTranslations.en.title}</title>
<style>body{font:16px/1.6 system-ui,sans-serif;max-width:760px;margin:auto;padding:24px;color:#171717;background:#fff}h1{line-height:1.2}label{display:block;margin-top:16px}select,textarea,input,button{font:inherit;padding:10px;border:1px solid #888;border-radius:6px;background:#fff;color:#111;max-width:100%;box-sizing:border-box}select,textarea,input{width:100%}textarea{min-height:150px}button{margin:16px 8px 0 0;cursor:pointer}#generate{width:100%;margin-right:0}ol{columns:2}aside{border:1px solid #888;padding:16px}#output,#random-output{overflow-wrap:anywhere}.random-generator{margin-top:32px;padding:16px;border:1px solid #888;border-radius:6px}.random-generator summary{cursor:pointer;font-weight:600}.example{margin-top:32px;padding:16px;border:1px solid #888;border-radius:6px}.example pre{white-space:pre-wrap;overflow-wrap:anywhere}.example-warning{font-weight:600}.print-note{display:none}.control-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;align-items:start}.control-grid button{width:100%;margin-right:0;align-self:end}.print-control{align-self:end}.control-grid label{margin-top:0}.dictionary-panel{border:1px solid #888;border-radius:12px;padding:20px}.dictionary-poster{display:none}@media(max-width:480px){ol{columns:1}.control-grid{grid-template-columns:1fr}}@media print{@page{size:A1 portrait;margin:12mm}body{max-width:none;padding:0;font-size:10pt}body>*:not(.dictionary-poster){display:none!important}.dictionary-poster{display:block}#poster-grid{display:grid;grid-auto-flow:column;grid-template-rows:repeat(128,5.5mm);grid-template-columns:repeat(16,minmax(0,1fr));gap:0 3mm}#poster-grid>div{break-inside:avoid;line-height:1.2;border-bottom:0.1mm solid #ddd;padding:0.4mm 0}#poster-grid span{display:block;font:4.5pt monospace;white-space:nowrap}#poster-grid strong{font-size:7pt}}</style></head>
<body><div class="interface-controls">${translated("label", "interface", 'for="interface-language"')}<select id="interface-language">${options()}</select></div>
${translated("h1", "title")}${translated("p", "subtitle")}${translated("aside", "safety")}
${translated("h2", "diceHeading")}${translated("p", "diceInstructions")}${translated("p", "checksumInstructions")}
<form autocomplete="off"><section class="dictionary-panel"><div class="control-grid"><div>${translated("label", "dictionary", 'for="language"')}<select id="language">${options(true)}</select></div><div class="print-control">${translated("button", "printDictionary", 'type="button" id="print-dictionary"')}</div></div>${translated("p", "printHelp")}</section>
${translated("p", "compatibility")}
<div class="control-grid"><div>${translated("label", "length", 'for="length"')}<select id="length">${translated("option", "twelve", 'value="128"')}${translated("option", "twentyFour", 'value="256"')}</select>
</div><div>${translated("label", "mode", 'for="mode"')}<select id="mode">${translated("option", "dice", 'value="dice"')}${translated("option", "bits", 'value="bits"')}</select>
</div><div>${translated("label", "input", 'for="entropy"')}<textarea id="entropy" spellcheck="false" autocomplete="off" autocapitalize="off" autocorrect="off" required></textarea><p id="progress" role="status"></p>
</div><div>${translated("label", "passphrase", 'for="passphrase"')}<input id="passphrase" type="password" autocomplete="off" spellcheck="false" autocapitalize="off" autocorrect="off" aria-describedby="passphrase-help">
${translated("p", "passphraseHelp", 'id="passphrase-help"')}
</div>${translated("button", "calculate", 'type="submit"')}${translated("button", "clear", 'type="button" id="clear"')}</div></form>
<section id="output" aria-live="polite"></section>
<section class="example" aria-labelledby="example-title">
${translated("h2", "exampleTitle", 'id="example-title"')}${translated("p", "exampleWarning", 'class="example-warning"')}
${translated("h3", "exampleRolls")}<pre dir="ltr">${Array.from({ length: 8 }, () => Array(16).fill("1").join(" ")).join("\n")}</pre>
${translated("p", "exampleExplanation")}${translated("h3", "examplePhrase")}
<p lang="en" dir="ltr" class="example-phrase">${Array(11).fill("abandon").concat("about").join(" ")}</p>
</section>
${translated("h2", "backupHeading")}${translated("p", "backup")}${translated("p", "printNote", 'class="print-note"')}
<details class="random-generator">
${translated("summary", "generate")}
${translated("p", "randomInstructions")}${translated("button", "generate", 'type="button" id="generate"')}
<section id="random-output" aria-live="polite"></section>
</details>
<p>github.com/zuyux/utxo · github.com/bitcoin/bips/blob/master/bip-0039.mediawiki · MIT License</p>
<article class="dictionary-poster"><h1 id="poster-title"></h1><div id="poster-grid"></div><p>https://github.com/bitcoin/bips/tree/master/bip-0039</p></article>
<script>${script}</script></body></html>\n`
const target = new URL("../public/seed-offline.html", import.meta.url)
if (process.argv.includes("--check")) {
  if (await readFile(target, "utf8") !== html) throw new Error("Offline artifact is stale. Run npm run seed:offline.")
  console.log("Offline artifact matches source.")
} else { await writeFile(target, html); console.log("Built self-contained public/seed-offline.html") }
