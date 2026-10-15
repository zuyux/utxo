import { readFile, writeFile } from "node:fs/promises"
import { createHash } from "node:crypto"
import { offlineLanguages, offlineTranslations } from "../lib/seed-offline-translations.mjs"

const lists = Object.fromEntries(await Promise.all(offlineLanguages.map(async ([,, name]) => [name, JSON.parse(await readFile(new URL(`../lib/seed-wordlists/${name}.json`, import.meta.url), "utf8"))])))
const core = (await readFile(new URL("../lib/seed-generator.mjs", import.meta.url), "utf8")).replaceAll("export ", "")
const script = `${core}
const lists = ${JSON.stringify(lists)};
const translations = ${JSON.stringify(offlineTranslations)};
const languages = ${JSON.stringify(offlineLanguages)};
const form = document.querySelector('form');
const input = document.querySelector('#entropy');
const output = document.querySelector('#output');
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
function resetResult() { revision++; output.replaceChildren(); const value = input.value.replace(/\\s/g, ''); progress.textContent = value.length + ' / ' + document.querySelector('#length').value + ' ' + copy.progress; }
function applyLanguage() {
 const language = interfaceSelect.value; copy = translations[language];
 document.documentElement.lang = language; document.title = copy.title;
 document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = copy[element.dataset.i18n]; });
 resetResult();
}
interfaceSelect.value = preferredLanguage(navigator.languages?.length ? navigator.languages : [navigator.language]);
interfaceSelect.addEventListener('change', applyLanguage);
applyLanguage();
form.addEventListener('input', resetResult);
form.addEventListener('change', resetResult);
form.addEventListener('submit', async (event) => {
 event.preventDefault(); resetResult(); const current = revision;
 try {
  const compact = input.value.replace(/\\s/g, '');
  const isDice = document.querySelector('#mode').value === 'dice';
  if (isDice && !/^[1-6]*$/.test(compact)) { output.textContent = copy.invalidDice; return; }
  if (compact.length !== Number(document.querySelector('#length').value) || (!isDice && !/^[01]+$/.test(compact))) { output.textContent = copy.invalidLength; return; }
  const bits = isDice ? diceToBits(input.value) : compact;
  const dictionary = document.querySelector('#language').value;
  const result = await entropyToMnemonic(bits, lists[dictionary]);
  if (current !== revision) return;
  const heading = document.createElement('h2'); heading.textContent = copy.recovery; output.append(heading);
  const list = document.createElement('ol'); list.lang = languages.find(item => item[2] === dictionary)[0];
  result.words.forEach((word, index) => { const li = document.createElement('li'); li.textContent = word + ' · ' + result.indices[index] + ' · ' + result.indices[index].toString(2).padStart(11, '0'); list.append(li); }); output.append(list);
  const details = document.createElement('p'); details.textContent = copy.checksum + ' ' + result.checksum + '. ' + copy.finalIndex + ' ' + result.indices.at(-1); output.append(details);
 } catch { if(current === revision) output.textContent = copy.failure; }
});
document.querySelector('#clear').addEventListener('click', () => { input.value = ''; resetResult(); });
window.addEventListener('pagehide', () => { input.value = ''; resetResult(); });`
const hash = createHash("sha256").update(script).digest("base64")
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;")
const translated = (tag, key, attributes = "") => `<${tag} data-i18n="${key}"${attributes ? ` ${attributes}` : ""}>${escape(offlineTranslations.en[key])}</${tag}>`
const options = (dictionary = false) => offlineLanguages.map(([code, label, file]) => `<option value="${dictionary ? file : code}">${label}</option>`).join("")
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'sha256-${hash}'; style-src 'unsafe-inline'; connect-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none'">
<title>${offlineTranslations.en.title}</title>
<style>body{font:16px/1.6 system-ui,sans-serif;max-width:760px;margin:auto;padding:24px;color:#171717;background:#fff}h1{line-height:1.2}label{display:block;margin-top:16px}select,textarea,button{font:inherit;padding:10px;border:1px solid #888;border-radius:6px;background:#fff;color:#111;max-width:100%;box-sizing:border-box}textarea{width:100%;min-height:150px}button{margin:16px 8px 0 0;cursor:pointer}ol{columns:2}aside{border:1px solid #888;padding:16px}#output{overflow-wrap:anywhere}.example{margin-top:32px;padding:16px;border:1px solid #888;border-radius:6px}.example pre{white-space:pre-wrap;overflow-wrap:anywhere}.example-warning{font-weight:600}.print-note{display:none}@media(max-width:480px){ol{columns:1}}@media print{form,#output,.interface-controls{display:none}.print-note{display:block}}</style></head>
<body><div class="interface-controls">${translated("label", "interface", 'for="interface-language"')}<select id="interface-language">${options()}</select></div>
${translated("h1", "title")}${translated("p", "subtitle")}${translated("aside", "safety")}
${translated("h2", "diceHeading")}${translated("p", "diceInstructions")}${translated("p", "checksumInstructions")}
<form autocomplete="off">${translated("label", "dictionary", 'for="language"')}<select id="language">${options(true)}</select>
${translated("p", "compatibility")}
${translated("label", "length", 'for="length"')}<select id="length">${translated("option", "twelve", 'value="128"')}${translated("option", "twentyFour", 'value="256"')}</select>
${translated("label", "mode", 'for="mode"')}<select id="mode">${translated("option", "dice", 'value="dice"')}${translated("option", "bits", 'value="bits"')}</select>
${translated("label", "input", 'for="entropy"')}<textarea id="entropy" spellcheck="false" autocomplete="off" autocapitalize="off" autocorrect="off" required></textarea><p id="progress" role="status"></p>
${translated("button", "calculate", 'type="submit"')}${translated("button", "clear", 'type="button" id="clear"')}</form>
<section id="output" aria-live="polite"></section>
<section class="example" aria-labelledby="example-title">
${translated("h2", "exampleTitle", 'id="example-title"')}${translated("p", "exampleWarning", 'class="example-warning"')}
${translated("h3", "exampleRolls")}<pre dir="ltr">${Array.from({ length: 8 }, () => Array(16).fill("1").join(" ")).join("\n")}</pre>
${translated("p", "exampleExplanation")}${translated("h3", "examplePhrase")}
<p lang="en" dir="ltr" class="example-phrase">${Array(11).fill("abandon").concat("about").join(" ")}</p>
</section>
${translated("h2", "backupHeading")}${translated("p", "backup")}${translated("p", "printNote", 'class="print-note"')}
<p>github.com/zuyux/utxo-lat · github.com/bitcoin/bips/blob/master/bip-0039.mediawiki · MIT License</p>
<script>${script}</script></body></html>\n`
const target = new URL("../public/seed-offline.html", import.meta.url)
if (process.argv.includes("--check")) {
  if (await readFile(target, "utf8") !== html) throw new Error("Offline artifact is stale. Run npm run seed:offline.")
  console.log("Offline artifact matches source.")
} else { await writeFile(target, html); console.log("Built self-contained public/seed-offline.html") }
