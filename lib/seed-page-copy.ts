import { offlineTranslations } from "@/lib/seed-offline-translations.mjs"
import { seedCopy } from "@/lib/seed-copy"
import { physicalCopy } from "@/lib/seed-physical-copy"

// The safety and generation instructions share translations with the offline file.
const extraKeys = ["intro", "download", "poster", "spaces", "format", "help", "note", "back", "print", "search", "count", "empty", "source", "reference", "theme"] as const
const extra: Record<string, string[]> = {
  en: [physicalCopy.en.intro, physicalCopy.en.download, physicalCopy.en.poster, physicalCopy.en.spaces, physicalCopy.en.format, physicalCopy.en.help, physicalCopy.en.note, seedCopy.en.back, seedCopy.en.print, seedCopy.en.search, seedCopy.en.count, seedCopy.en.empty, seedCopy.en.source, seedCopy.en.reference, "Switch theme"],
  es: [physicalCopy.es.intro, physicalCopy.es.download, physicalCopy.es.poster, physicalCopy.es.spaces, physicalCopy.es.format, physicalCopy.es.help, physicalCopy.es.note, seedCopy.es.back, seedCopy.es.print, seedCopy.es.search, seedCopy.es.count, seedCopy.es.empty, seedCopy.es.source, seedCopy.es.reference, "Cambiar tema"],
  pt: [physicalCopy.pt.intro, physicalCopy.pt.download, physicalCopy.pt.poster, physicalCopy.pt.spaces, physicalCopy.pt.format, physicalCopy.pt.help, physicalCopy.pt.note, seedCopy.pt.back, seedCopy.pt.print, seedCopy.pt.search, seedCopy.pt.count, seedCopy.pt.empty, seedCopy.pt.source, seedCopy.pt.reference, "Alterar tema"],
  fr: [
    "Imprimez le dictionnaire, créez de l’aléa avec un dé physique et calculez le contrôle sur votre propre appareil hors ligne.",
    "Télécharger le calculateur hors ligne (.html)", "Affiche numérotée", "Mots séparés par des espaces", "Format d’impression",
    "Imprimez le dictionnaire complet ou enregistrez-le en PDF. Pour l’affiche, choisissez A1 portrait. Les indices commencent à 0 et affichent leur valeur binaire sur 11 bits.",
    "Utilisez un dé équilibré et des lancers indépendants : cet outil ne détecte pas les dés biaisés. Vérifiez les langues prises en charge par votre portefeuille ; l’anglais offre la meilleure compatibilité. Ne traduisez jamais une phrase. Le calculateur nécessite un appareil et un navigateur de confiance. Cet outil n’a pas fait l’objet d’un audit de sécurité indépendant.",
    "Retour à l’explorateur", "Imprimer / enregistrer en PDF", "Rechercher un mot du dictionnaire", "mots", "Aucun mot correspondant.", "Source officielle BIP39", "Liste publique · ce n’est pas une phrase de récupération", "Changer de thème",
  ],
  it: [
    "Stampa il dizionario, crea casualità con un dado fisico e calcola il checksum sul tuo dispositivo offline.",
    "Scarica il calcolatore offline (.html)", "Poster numerato", "Parole separate da spazi", "Formato di stampa",
    "Stampa il dizionario completo o salvalo in PDF. Per il poster scegli A1 verticale. Gli indici partono da 0 e includono il valore binario a 11 bit.",
    "Usa un dado equilibrato e lanci indipendenti: lo strumento non rileva dadi sbilanciati. Verifica le lingue supportate dal portafoglio; l’inglese offre la compatibilità più ampia. Non tradurre mai una frase. Il calcolatore richiede un dispositivo e un browser affidabili. Lo strumento non ha ricevuto una verifica di sicurezza indipendente.",
    "Torna all’esploratore", "Stampa / salva PDF", "Cerca una parola nel dizionario", "parole", "Nessuna parola corrispondente.", "Fonte ufficiale BIP39", "Elenco pubblico · non è una frase di recupero", "Cambia tema",
  ],
  cs: [
    "Vytiskněte slovník, vytvořte náhodnost fyzickou kostkou a vypočítejte kontrolní součet na vlastním offline zařízení.",
    "Stáhnout offline kalkulačku (.html)", "Číslovaný plakát", "Slova oddělená mezerami", "Formát tisku",
    "Vytiskněte celý slovník nebo ho uložte jako PDF. Pro plakát zvolte A1 na výšku. Indexy začínají na 0 a obsahují 11bitovou binární hodnotu.",
    "Použijte vyváženou kostku a nezávislé hody: nástroj neodhalí nevyváženou kostku. Ověřte jazyky podporované peněženkou; angličtina má nejširší podporu. Frázi nikdy nepřekládejte. Kalkulačka vyžaduje důvěryhodné zařízení a prohlížeč. Nástroj neprošel nezávislým bezpečnostním auditem.",
    "Zpět do průzkumníku", "Vytisknout / uložit PDF", "Vyhledat slovo ve slovníku", "slov", "Žádná odpovídající slova.", "Oficiální zdroj BIP39", "Veřejný seznam slov · nejde o obnovovací frázi", "Změnit motiv",
  ],
  ja: [
    "辞書を印刷し、実物のサイコロで乱数を作り、自分のオフライン端末でチェックサムを計算します。",
    "オフライン計算機をダウンロード（.html）", "番号付きポスター", "スペース区切りの単語", "印刷形式",
    "辞書全体を印刷またはPDFに保存できます。ポスターにはA1縦向きを選んでください。インデックスは0から始まり、11ビットの2進数も表示します。",
    "偏りのないサイコロで独立して振ってください。本ツールはサイコロの偏りを検出できません。ウォレットが対応する言語を確認してください。英語は最も広く対応しています。フレーズを翻訳しないでください。計算機には信頼できる端末とブラウザーが必要です。本ツールは独立したセキュリティ監査を受けていません。",
    "エクスプローラーに戻る", "印刷 / PDFに保存", "辞書の単語を検索", "語", "一致する単語がありません。", "BIP39公式ソース", "公開単語リスト · 復元フレーズではありません", "テーマを切り替え",
  ],
  ko: [
    "사전을 인쇄하고 실물 주사위로 무작위성을 만든 뒤 자신의 오프라인 기기에서 체크섬을 계산하세요.",
    "오프라인 계산기 다운로드 (.html)", "번호가 있는 포스터", "공백으로 구분된 단어", "인쇄 형식",
    "전체 사전을 인쇄하거나 PDF로 저장하세요. 포스터는 A1 세로를 선택하세요. 인덱스는 0부터 시작하며 11비트 이진수도 표시됩니다.",
    "편향이 없는 주사위를 독립적으로 던지세요. 이 도구는 주사위의 편향을 감지하지 못합니다. 지갑의 지원 언어를 확인하세요. 영어가 가장 널리 지원됩니다. 구문을 번역하지 마세요. 계산기는 신뢰할 수 있는 기기와 브라우저가 필요합니다. 이 도구는 독립적인 보안 감사를 받지 않았습니다.",
    "탐색기로 돌아가기", "인쇄 / PDF 저장", "사전 단어 검색", "단어", "일치하는 단어가 없습니다.", "BIP39 공식 소스", "공개 단어 목록 · 복구 구문이 아닙니다", "테마 변경",
  ],
  "zh-hans": [
    "打印词表，使用实体骰子生成随机性，并在自己的离线设备上计算校验和。",
    "下载离线计算器（.html）", "编号海报", "空格分隔的单词", "打印格式",
    "打印完整词表或保存为PDF。编号海报请选择A1纵向。索引从0开始，并显示11位二进制值。",
    "请使用无偏的骰子并独立投掷：本工具无法检测骰子是否有偏。请检查钱包支持的语言；英语兼容性最广。切勿翻译助记词。计算器需要可信的设备和浏览器。本工具尚未经过独立安全审计。",
    "返回浏览器", "打印 / 保存PDF", "搜索词表单词", "个词", "没有匹配的单词。", "BIP39官方来源", "公开词表 · 不是恢复助记词", "切换主题",
  ],
  "zh-hant": [
    "列印詞表，使用實體骰子產生隨機性，並在自己的離線裝置上計算校驗和。",
    "下載離線計算器（.html）", "編號海報", "空格分隔的單詞", "列印格式",
    "列印完整詞表或儲存為PDF。編號海報請選擇A1直向。索引從0開始，並顯示11位元二進位值。",
    "請使用無偏的骰子並獨立投擲：本工具無法偵測骰子是否有偏。請檢查錢包支援的語言；英語相容性最廣。切勿翻譯助記詞。計算器需要可信任的裝置和瀏覽器。本工具尚未經過獨立安全稽核。",
    "返回區塊瀏覽器", "列印 / 儲存PDF", "搜尋詞表單詞", "個詞", "沒有符合的單詞。", "BIP39官方來源", "公開詞表 · 不是恢復助記詞", "切換主題",
  ],
}

export function getSeedPageCopy(language: string) {
  const code = Object.hasOwn(extra, language) ? language : "en"
  const offline = offlineTranslations[code]
  const values = extra[code]
  const page = Object.fromEntries(extraKeys.map((key, index) => [key, values[index]])) as Record<(typeof extraKeys)[number], string>
  return {
    ...page,
    title: offline.title as string,
    language: offline.dictionary as string,
    heading: offline.diceHeading as string,
    steps: [page.download + ". " + offline.safety, offline.diceInstructions, offline.checksumInstructions, offline.backup] as string[],
  }
}
