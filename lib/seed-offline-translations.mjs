const keys = ['title', 'subtitle', 'safety', 'diceHeading', 'diceInstructions', 'checksumInstructions', 'dictionary', 'compatibility', 'length', 'twelve', 'twentyFour', 'mode', 'dice', 'bits', 'input', 'calculate', 'clear', 'recovery', 'checksum', 'finalIndex', 'progress', 'backupHeading', 'backup', 'printNote', 'interface', 'invalidDice', 'invalidLength', 'failure']
const text = {
en: [
'Physical BIP39 Seed Generator',
'Standalone offline checksum calculator · open source · no dependencies',
'Save this HTML file and open the saved copy on a trusted offline device before entering real dice rolls. All ten dictionaries are included. No network requests are made and your input is not saved. A compromised device or browser extension can still expose secrets. This tool has not had an independent security audit.',
'Generate entropy with a physical die',
'Use a fair six-sided die. Roll independently: 1, 3, 5 → 0; 2, 4, 6 → 1. Record every roll in order. Use exactly 128 rolls for 12 words or 256 rolls for 24 words. Do not pick patterns, discard unwanted rolls, or reuse rolls for another wallet. This tool cannot detect biased dice.',
'The calculator hashes your entropy with SHA-256, appends the first 4 or 8 checksum bits, and divides the result into 11-bit word indices (0–2047). Look up those indices on the poster. The last word includes entropy and checksum; it cannot be chosen freely.',
'Dictionary language',
'English has the widest wallet compatibility. Confirm your wallet supports the chosen language. Never translate a generated phrase. Changing the instruction language does not change the dictionary.',
'Phrase length', '12 words · 128 rolls / bits', '24 words · 256 rolls / bits', 'Input format', 'Dice faces (1–6)', 'Entropy bits (0–1)', 'Your recorded rolls or bits — private', 'Calculate checksum and phrase', 'Clear private data', 'Recovery phrase — write down in order', 'Checksum bits:', 'Final word index (0–2047):', 'rolls or bits', 'Back up on paper',
'Write all 12 or 24 words in exact order, numbered. Check every word and verify recovery with a trusted offline wallet before depositing funds. Keep the paper private, dry and secure; consider a second secure location. Do not photograph, upload, email or share it. Back up an optional passphrase separately. Clear the input and close the file when finished; clearing cannot guarantee erasure from device memory.',
'Private entropy and generated phrases are excluded from printing.', 'Instruction language', 'Use only dice faces 1–6 and whitespace.', 'Enter exactly the selected number of rolls or bits. Binary input must contain only 0 and 1.', 'Calculation failed. Check browser support for SHA-256 and your input.'
],
es: [
'Generador físico de semillas BIP39', 'Calculadora de verificación sin conexión · código abierto · sin dependencias',
'Guarda este archivo HTML y abre la copia guardada en un dispositivo de confianza sin conexión antes de ingresar tiradas reales. Incluye los diez diccionarios. No realiza solicitudes de red ni guarda tus datos. Un dispositivo comprometido o una extensión del navegador puede exponer secretos. Esta herramienta no ha tenido una auditoría de seguridad independiente.',
'Genera entropía con un dado físico',
'Usa un dado equilibrado de seis caras. Tira de forma independiente: 1, 3, 5 → 0; 2, 4, 6 → 1. Registra cada tirada en orden. Usa exactamente 128 tiradas para 12 palabras o 256 para 24. No elijas patrones, descartes tiradas ni las reutilices para otra billetera. Esta herramienta no detecta dados sesgados.',
'La calculadora aplica SHA-256 a tu entropía, añade los primeros 4 u 8 bits de verificación y divide el resultado en índices de 11 bits (0–2047). Busca esos índices en el póster. La última palabra incluye entropía y verificación; no puede elegirse libremente.',
'Idioma del diccionario',
'El inglés tiene mayor compatibilidad con billeteras. Confirma que tu billetera admite el idioma elegido. Nunca traduzcas una frase generada. Cambiar el idioma de las instrucciones no cambia el diccionario.',
'Longitud de la frase', '12 palabras · 128 tiradas / bits', '24 palabras · 256 tiradas / bits', 'Formato de entrada', 'Caras del dado (1–6)', 'Bits de entropía (0–1)', 'Tus tiradas o bits registrados — privados', 'Calcular verificación y frase', 'Borrar datos privados', 'Frase de recuperación — escribe en orden', 'Bits de verificación:', 'Índice de la última palabra (0–2047):', 'tiradas o bits', 'Respaldo en papel',
'Escribe las 12 o 24 palabras numeradas en su orden exacto. Revisa cada palabra y verifica la recuperación con una billetera de confianza sin conexión antes de depositar fondos. Guarda el papel en privado, seco y seguro; considera una segunda ubicación segura. No lo fotografíes, subas, envíes por correo ni compartas. Respalda una contraseña adicional por separado. Borra los datos y cierra el archivo al terminar; borrarlos no garantiza eliminarlos de la memoria del dispositivo.',
'La entropía privada y las frases generadas se excluyen de la impresión.', 'Idioma de las instrucciones', 'Usa solo caras del dado del 1 al 6 y espacios en blanco.', 'Ingresa exactamente la cantidad seleccionada de tiradas o bits. La entrada binaria solo admite 0 y 1.', 'No se pudo calcular. Comprueba que tu navegador admite SHA-256 y revisa los datos.'
],
pt: [
'Gerador físico de sementes BIP39', 'Calculadora de verificação offline · código aberto · sem dependências',
'Salve este arquivo HTML e abra a cópia salva em um dispositivo de confiança offline antes de inserir lançamentos reais. Inclui os dez dicionários. Não faz solicitações de rede nem salva seus dados. Um dispositivo comprometido ou extensão do navegador pode expor segredos. Esta ferramenta não passou por auditoria de segurança independente.',
'Gere entropia com um dado físico',
'Use um dado equilibrado de seis faces. Faça lançamentos independentes: 1, 3, 5 → 0; 2, 4, 6 → 1. Registre cada lançamento em ordem. Use exatamente 128 lançamentos para 12 palavras ou 256 para 24. Não escolha padrões, descarte lançamentos ou reutilize-os em outra carteira. Esta ferramenta não detecta dados enviesados.',
'A calculadora aplica SHA-256 à entropia, acrescenta os primeiros 4 ou 8 bits de verificação e divide o resultado em índices de 11 bits (0–2047). Consulte esses índices no pôster. A última palavra inclui entropia e verificação; não pode ser escolhida livremente.',
'Idioma do dicionário',
'O inglês tem maior compatibilidade com carteiras. Confirme que sua carteira aceita o idioma escolhido. Nunca traduza uma frase gerada. Alterar o idioma das instruções não muda o dicionário.',
'Tamanho da frase', '12 palavras · 128 lançamentos / bits', '24 palavras · 256 lançamentos / bits', 'Formato de entrada', 'Faces do dado (1–6)', 'Bits de entropia (0–1)', 'Seus lançamentos ou bits registrados — privados', 'Calcular verificação e frase', 'Limpar dados privados', 'Frase de recuperação — escreva em ordem', 'Bits de verificação:', 'Índice da última palavra (0–2047):', 'lançamentos ou bits', 'Backup em papel',
'Escreva as 12 ou 24 palavras numeradas na ordem exata. Confira cada palavra e verifique a recuperação com uma carteira de confiança offline antes de depositar fundos. Guarde o papel privado, seco e seguro; considere outro local seguro. Não fotografe, carregue, envie por e-mail ou compartilhe. Guarde uma senha adicional separadamente. Limpe os dados e feche o arquivo ao terminar; limpar não garante a remoção da memória do dispositivo.',
'A entropia privada e as frases geradas são excluídas da impressão.', 'Idioma das instruções', 'Use apenas faces de dado de 1 a 6 e espaços em branco.', 'Insira exatamente a quantidade selecionada de lançamentos ou bits. A entrada binária aceita apenas 0 e 1.', 'Falha no cálculo. Confira o suporte do navegador a SHA-256 e os dados inseridos.'
],
fr: [
'Générateur physique de phrases BIP39', 'Calculateur de somme de contrôle hors ligne · code ouvert · sans dépendances',
'Enregistrez ce fichier HTML et ouvrez la copie sur un appareil de confiance hors ligne avant de saisir de vrais lancers. Les dix dictionnaires sont inclus. Aucune requête réseau et aucune sauvegarde de vos données. Un appareil compromis ou une extension peut exposer vos secrets. Cet outil n’a pas fait l’objet d’un audit de sécurité indépendant.',
'Générer de l’entropie avec un dé physique',
'Utilisez un dé équilibré à six faces. Effectuez des lancers indépendants : 1, 3, 5 → 0 ; 2, 4, 6 → 1. Notez chaque lancer dans l’ordre. Il faut exactement 128 lancers pour 12 mots ou 256 pour 24. Ne choisissez pas de motifs, ne rejetez aucun lancer et ne les réutilisez pas pour un autre portefeuille. Cet outil ne détecte pas les dés biaisés.',
'Le calculateur applique SHA-256 à votre entropie, ajoute les 4 ou 8 premiers bits de contrôle et divise le résultat en indices de 11 bits (0–2047). Retrouvez ces indices sur l’affiche. Le dernier mot contient de l’entropie et des bits de contrôle ; il ne se choisit pas librement.',
'Langue du dictionnaire',
'L’anglais offre la meilleure compatibilité. Vérifiez que votre portefeuille accepte la langue choisie. Ne traduisez jamais une phrase générée. Changer la langue des instructions ne change pas le dictionnaire.',
'Longueur de la phrase', '12 mots · 128 lancers / bits', '24 mots · 256 lancers / bits', 'Format de saisie', 'Faces du dé (1–6)', 'Bits d’entropie (0–1)', 'Vos lancers ou bits — privés', 'Calculer le contrôle et la phrase', 'Effacer les données privées', 'Phrase de récupération — noter dans l’ordre', 'Bits de contrôle :', 'Indice du dernier mot (0–2047) :', 'lancers ou bits', 'Sauvegarder sur papier',
'Écrivez les 12 ou 24 mots numérotés dans l’ordre exact. Vérifiez chaque mot et testez la récupération avec un portefeuille de confiance hors ligne avant de déposer des fonds. Gardez le papier privé, au sec et en sécurité ; envisagez un second lieu sûr. Ne le photographiez pas, ne le téléversez pas, ne l’envoyez pas par courriel et ne le partagez pas. Sauvegardez séparément une éventuelle phrase secrète supplémentaire. Effacez les données et fermez le fichier après usage ; cela ne garantit pas leur effacement de la mémoire.',
'L’entropie privée et les phrases générées sont exclues de l’impression.', 'Langue des instructions', 'Utilisez uniquement les faces 1 à 6 et des espaces blancs.', 'Saisissez exactement le nombre sélectionné de lancers ou de bits. La saisie binaire accepte uniquement 0 et 1.', 'Échec du calcul. Vérifiez la prise en charge de SHA-256 par le navigateur et votre saisie.'
],
it: [
'Generatore fisico di frasi BIP39', 'Calcolatore di checksum offline · codice aperto · senza dipendenze',
'Salva questo file HTML e apri la copia su un dispositivo affidabile offline prima di inserire lanci reali. Sono inclusi tutti i dieci dizionari. Non vengono effettuate richieste di rete né salvati i dati inseriti. Un dispositivo compromesso o un’estensione può esporre i segreti. Questo strumento non ha ricevuto una verifica di sicurezza indipendente.',
'Genera entropia con un dado fisico',
'Usa un dado equilibrato a sei facce. Esegui lanci indipendenti: 1, 3, 5 → 0; 2, 4, 6 → 1. Registra ogni lancio in ordine. Servono esattamente 128 lanci per 12 parole o 256 per 24. Non scegliere schemi, scartare lanci o riutilizzarli per un altro portafoglio. Lo strumento non rileva dadi sbilanciati.',
'Il calcolatore applica SHA-256 all’entropia, aggiunge i primi 4 o 8 bit di checksum e divide il risultato in indici da 11 bit (0–2047). Cerca gli indici sul poster. L’ultima parola contiene entropia e checksum e non può essere scelta liberamente.',
'Lingua del dizionario',
'L’inglese offre la compatibilità più ampia. Verifica che il portafoglio supporti la lingua scelta. Non tradurre mai una frase generata. Cambiare la lingua delle istruzioni non cambia il dizionario.',
'Lunghezza della frase', '12 parole · 128 lanci / bit', '24 parole · 256 lanci / bit', 'Formato di inserimento', 'Facce del dado (1–6)', 'Bit di entropia (0–1)', 'I tuoi lanci o bit registrati — privati', 'Calcola checksum e frase', 'Cancella dati privati', 'Frase di recupero — scrivi in ordine', 'Bit di checksum:', 'Indice dell’ultima parola (0–2047):', 'lanci o bit', 'Backup su carta',
'Scrivi le 12 o 24 parole numerate nell’ordine esatto. Controlla ogni parola e verifica il recupero con un portafoglio affidabile offline prima di depositare fondi. Conserva il foglio in un luogo privato, asciutto e sicuro; considera un secondo luogo sicuro. Non fotografarlo, caricarlo online, inviarlo per email o condividerlo. Conserva separatamente un’eventuale passphrase aggiuntiva. Cancella i dati e chiudi il file al termine; la cancellazione non garantisce la rimozione dalla memoria del dispositivo.',
'L’entropia privata e le frasi generate sono escluse dalla stampa.', 'Lingua delle istruzioni', 'Usa solo facce del dado da 1 a 6 e spazi bianchi.', 'Inserisci esattamente il numero selezionato di lanci o bit. Il formato binario accetta solo 0 e 1.', 'Calcolo non riuscito. Verifica il supporto SHA-256 del browser e i dati inseriti.'
],
cs: [
'Fyzický generátor obnovovacích frází BIP39', 'Offline kalkulačka kontrolního součtu · otevřený zdrojový kód · bez závislostí',
'Uložte tento soubor HTML a před zadáním skutečných hodů otevřete uloženou kopii na důvěryhodném zařízení bez připojení k síti. Obsahuje všech deset slovníků. Neodesílá síťové požadavky a neukládá vstupy. Napadené zařízení nebo rozšíření prohlížeče může odhalit tajné údaje. Nástroj neprošel nezávislým bezpečnostním auditem.',
'Vytvořte entropii fyzickou kostkou',
'Použijte vyváženou šestistěnnou kostku. Házejte nezávisle: 1, 3, 5 → 0; 2, 4, 6 → 1. Každý hod zaznamenejte v pořadí. Pro 12 slov je potřeba přesně 128 hodů, pro 24 slov 256 hodů. Nevolte vzory, nevyřazujte nechtěné hody a nepoužívejte je pro další peněženku. Nástroj neodhalí nevyváženou kostku.',
'Kalkulačka zpracuje entropii pomocí SHA-256, připojí prvních 4 nebo 8 bitů kontrolního součtu a rozdělí výsledek na 11bitové indexy slov (0–2047). Indexy vyhledejte na plakátu. Poslední slovo obsahuje entropii i kontrolní součet; nelze ho zvolit libovolně.',
'Jazyk slovníku',
'Angličtina má nejširší podporu peněženek. Ověřte podporu zvoleného jazyka. Vygenerovanou frázi nikdy nepřekládejte. Změna jazyka pokynů nemění slovník.',
'Délka fráze', '12 slov · 128 hodů / bitů', '24 slov · 256 hodů / bitů', 'Formát vstupu', 'Stěny kostky (1–6)', 'Bity entropie (0–1)', 'Vaše zaznamenané hody nebo bity — soukromé', 'Vypočítat kontrolní součet a frázi', 'Vymazat soukromé údaje', 'Obnovovací fráze — zapište v pořadí', 'Bity kontrolního součtu:', 'Index posledního slova (0–2047):', 'hodů nebo bitů', 'Záloha na papíře',
'Zapište všech 12 nebo 24 slov očíslovaných v přesném pořadí. Zkontrolujte každé slovo a před vložením prostředků ověřte obnovu v důvěryhodné offline peněžence. Papír uchovávejte v soukromí, suchu a bezpečí; zvažte druhé bezpečné místo. Nefotografujte ho, nenahrávejte, neposílejte e-mailem ani nesdílejte. Volitelnou dodatečnou přístupovou frázi zálohujte odděleně. Po dokončení vymažte vstup a zavřete soubor; vymazání nezaručuje odstranění z paměti zařízení.',
'Soukromá entropie a vygenerované fráze jsou z tisku vyloučeny.', 'Jazyk pokynů', 'Použijte pouze stěny kostky 1–6 a bílé znaky.', 'Zadejte přesně zvolený počet hodů nebo bitů. Binární vstup smí obsahovat pouze 0 a 1.', 'Výpočet se nezdařil. Ověřte podporu SHA-256 v prohlížeči a zadané údaje.'
],
ja: [
'物理サイコロによるBIP39シード生成ツール', 'オフラインのチェックサム計算機 · オープンソース · 外部依存なし',
'このHTMLファイルを保存し、実際の出目を入力する前に、信頼できるオフライン端末で保存したファイルを開いてください。10種類の辞書を内蔵しています。ネットワーク通信は行わず、入力内容も保存しません。ただし、侵害された端末やブラウザー拡張機能から秘密情報が漏れる可能性があります。本ツールは独立したセキュリティ監査を受けていません。',
'実物のサイコロでエントロピーを作る',
'偏りのない6面サイコロを使い、毎回独立して振ってください。1・3・5 → 0、2・4・6 → 1として、すべての出目を順番に記録します。12語には正確に128回、24語には256回の出目が必要です。パターンを選んだり、気に入らない出目を捨てたり、別のウォレットに再利用したりしないでください。本ツールではサイコロの偏りを検出できません。',
'計算機はエントロピーをSHA-256でハッシュ化し、先頭の4または8ビットをチェックサムとして追加して、結果を11ビットの単語インデックス（0～2047）に分割します。ポスターでそのインデックスを確認してください。最後の単語にはエントロピーとチェックサムが含まれるため、自由には選べません。',
'辞書の言語',
'英語は最も多くのウォレットで対応しています。選んだ言語にウォレットが対応していることを確認してください。生成したフレーズを翻訳しないでください。説明の言語を変えても辞書は変わりません。',
'フレーズの長さ', '12語 · 128回 / ビット', '24語 · 256回 / ビット', '入力形式', 'サイコロの出目（1～6）', 'エントロピービット（0～1）', '記録した出目またはビット — 秘密情報', 'チェックサムとフレーズを計算', '秘密情報を消去', '復元フレーズ — 順番に書き写してください', 'チェックサムビット：', '最後の単語のインデックス（0～2047）：', '回またはビット', '紙にバックアップする',
'12語または24語を正確な順番で番号を付けて紙に書いてください。各単語を確認し、入金する前に信頼できるオフラインウォレットで復元を確認してください。紙は他人に見せず、乾燥した安全な場所に保管し、別の安全な場所への予備の保管も検討してください。撮影、アップロード、メール送信、共有はしないでください。追加のパスフレーズを使う場合は別に保管してください。終了後は入力を消去してファイルを閉じてください。消去しても端末のメモリーから完全に削除される保証はありません。',
'秘密のエントロピーと生成されたフレーズは印刷されません。', '説明の言語', '出目は1～6と空白だけで入力してください。', '選んだ数と同じ回数の出目またはビットを入力してください。2進数は0と1だけを使用してください。', '計算できませんでした。ブラウザーのSHA-256対応と入力内容を確認してください。'
],
ko: [
'실물 주사위 BIP39 시드 생성기', '오프라인 체크섬 계산기 · 오픈 소스 · 외부 의존성 없음',
'이 HTML 파일을 저장하고 실제 주사위 결과를 입력하기 전에 신뢰할 수 있는 오프라인 기기에서 저장한 파일을 여세요. 10개 사전이 모두 포함되어 있습니다. 네트워크 요청을 하지 않으며 입력 내용을 저장하지 않습니다. 하지만 감염된 기기나 브라우저 확장 프로그램은 비밀 정보를 노출할 수 있습니다. 이 도구는 독립적인 보안 감사를 받지 않았습니다.',
'실물 주사위로 엔트로피 생성하기',
'편향이 없는 6면 주사위를 사용하세요. 매번 독립적으로 던져 1, 3, 5 → 0, 2, 4, 6 → 1로 기록하세요. 모든 결과를 순서대로 기록합니다. 12단어는 정확히 128회, 24단어는 256회가 필요합니다. 패턴을 고르거나 마음에 들지 않는 결과를 버리거나 다른 지갑에 재사용하지 마세요. 이 도구는 주사위의 편향을 감지하지 못합니다.',
'계산기는 엔트로피를 SHA-256으로 해시한 뒤 처음 4비트 또는 8비트를 체크섬으로 덧붙이고, 결과를 11비트 단어 인덱스(0–2047)로 나눕니다. 포스터에서 해당 인덱스를 찾으세요. 마지막 단어에는 엔트로피와 체크섬이 모두 포함되므로 임의로 선택할 수 없습니다.',
'사전 언어',
'영어는 가장 많은 지갑에서 지원됩니다. 지갑이 선택한 언어를 지원하는지 확인하세요. 생성된 구문을 번역하지 마세요. 설명 언어를 바꿔도 사전은 바뀌지 않습니다.',
'구문 길이', '12단어 · 128회 / 비트', '24단어 · 256회 / 비트', '입력 형식', '주사위 눈(1–6)', '엔트로피 비트(0–1)', '기록한 주사위 결과 또는 비트 — 비밀 정보', '체크섬과 구문 계산', '비밀 정보 지우기', '복구 구문 — 순서대로 적으세요', '체크섬 비트:', '마지막 단어 인덱스(0–2047):', '회 또는 비트', '종이에 백업하기',
'12개 또는 24개 단어를 정확한 순서대로 번호를 붙여 종이에 적으세요. 각 단어를 확인하고 자금을 입금하기 전에 신뢰할 수 있는 오프라인 지갑으로 복구를 확인하세요. 종이는 비공개로 건조하고 안전한 곳에 보관하고, 별도의 안전한 장소에 두 번째 사본을 보관하는 것도 고려하세요. 사진 촬영, 업로드, 이메일 전송, 공유를 하지 마세요. 선택적인 추가 암호 문구는 별도로 백업하세요. 작업 후 입력을 지우고 파일을 닫으세요. 지우더라도 기기 메모리에서 완전히 삭제된다는 보장은 없습니다.',
'비밀 엔트로피와 생성된 구문은 인쇄에서 제외됩니다.', '설명 언어', '주사위 눈 1–6과 공백만 입력하세요.', '선택한 개수와 정확히 같은 수의 결과 또는 비트를 입력하세요. 이진 입력에는 0과 1만 사용할 수 있습니다.', '계산에 실패했습니다. 브라우저의 SHA-256 지원 및 입력을 확인하세요.'
],
'zh-hans': [
'实体骰子 BIP39 种子生成器', '独立离线校验和计算器 · 开源 · 无外部依赖',
'请保存此 HTML 文件，并在输入真实骰子结果之前，在可信的离线设备上打开保存的副本。文件包含全部十种词表，不发送网络请求，也不保存输入。但被入侵的设备或浏览器扩展仍可能泄露秘密。本工具尚未经过独立安全审计。',
'使用实体骰子生成熵',
'使用无偏的六面骰子，每次独立投掷：1、3、5 → 0；2、4、6 → 1。按顺序记录每次结果。12 个词需要恰好 128 次投掷，24 个词需要 256 次。不要选择规律、丢弃不喜欢的结果，或将这些结果用于另一个钱包。本工具无法检测骰子是否有偏。',
'计算器对熵执行 SHA-256，附加前 4 或 8 个校验位，再将结果分成 11 位的单词索引（0–2047）。请在海报上查找这些索引。最后一个词同时包含熵和校验位，不能自由选择。',
'词表语言',
'英语的钱包兼容性最广。请确认钱包支持所选语言。切勿翻译生成的助记词。更改说明语言不会更改词表。',
'助记词长度', '12 个词 · 128 次 / 位', '24 个词 · 256 次 / 位', '输入格式', '骰子点数（1–6）', '熵比特（0–1）', '记录的点数或比特 — 私密信息', '计算校验和及助记词', '清除私密数据', '恢复助记词 — 按顺序抄写', '校验位：', '最后一个词的索引（0–2047）：', '次或位', '纸质备份',
'将全部 12 或 24 个词按准确顺序编号并写在纸上。逐词检查，并在存入资金前使用可信的离线钱包验证恢复。纸张应保密，存放在干燥安全的地方；可考虑在另一处安全地点保留副本。不要拍照、上传、发送电子邮件或分享。如使用额外口令，请单独备份。完成后清除输入并关闭文件；清除操作无法保证数据已从设备内存中彻底移除。',
'私密熵和生成的助记词不会打印。', '说明语言', '只能输入骰子点数 1–6 和空白字符。', '请输入与所选数量完全一致的点数或比特。二进制输入只能包含 0 和 1。', '计算失败。请检查浏览器是否支持 SHA-256，并检查输入内容。'
],
'zh-hant': [
'實體骰子 BIP39 種子產生器', '獨立離線校驗和計算器 · 開源 · 無外部相依套件',
'請儲存此 HTML 檔案，並在輸入真實骰子結果之前，在可信任的離線裝置上開啟儲存的副本。檔案包含全部十種詞表，不傳送網路請求，也不儲存輸入。但遭入侵的裝置或瀏覽器擴充功能仍可能洩露秘密。本工具尚未經過獨立安全稽核。',
'使用實體骰子產生熵',
'使用無偏的六面骰子，每次獨立投擲：1、3、5 → 0；2、4、6 → 1。依序記錄每次結果。12 個詞需要恰好 128 次投擲，24 個詞需要 256 次。不要選擇規律、捨棄不喜歡的結果，或將這些結果用於另一個錢包。本工具無法偵測骰子是否有偏。',
'計算器對熵執行 SHA-256，附加前 4 或 8 個校驗位元，再將結果分成 11 位元的單詞索引（0–2047）。請在海報上查找這些索引。最後一個詞同時包含熵和校驗位元，不能自由選擇。',
'詞表語言',
'英語的錢包相容性最廣。請確認錢包支援所選語言。切勿翻譯產生的助記詞。變更說明語言不會變更詞表。',
'助記詞長度', '12 個詞 · 128 次 / 位元', '24 個詞 · 256 次 / 位元', '輸入格式', '骰子點數（1–6）', '熵位元（0–1）', '記錄的點數或位元 — 私密資訊', '計算校驗和及助記詞', '清除私密資料', '恢復助記詞 — 依序抄寫', '校驗位元：', '最後一個詞的索引（0–2047）：', '次或位元', '紙本備份',
'將全部 12 或 24 個詞依正確順序編號並寫在紙上。逐詞檢查，並在存入資金前使用可信任的離線錢包驗證恢復。紙張應保密，存放在乾燥安全的地方；可考慮在另一處安全地點保留副本。不要拍照、上傳、傳送電子郵件或分享。如使用額外密語，請單獨備份。完成後清除輸入並關閉檔案；清除操作無法保證資料已從裝置記憶體中完全移除。',
'私密熵和產生的助記詞不會列印。', '說明語言', '只能輸入骰子點數 1–6 和空白字元。', '請輸入與所選數量完全一致的點數或位元。二進位輸入只能包含 0 和 1。', '計算失敗。請檢查瀏覽器是否支援 SHA-256，並檢查輸入內容。'
],
}

export const offlineLanguages = [
  ['en', 'English', 'english'], ['es', 'Español', 'spanish'], ['pt', 'Português', 'portuguese'], ['fr', 'Français', 'french'], ['it', 'Italiano', 'italian'], ['cs', 'Čeština', 'czech'], ['ja', '日本語', 'japanese'], ['ko', '한국어', 'korean'], ['zh-hans', '中文（简体）', 'chinese_simplified'], ['zh-hant', '中文（繁體）', 'chinese_traditional'],
]
// Public BIP39 example: deliberately predictable, never suitable for funds.
const exampleKeys = ['exampleTitle', 'exampleWarning', 'exampleRolls', 'exampleExplanation', 'examplePhrase']
const examples = {
  en: ['Worked example · 12 words', 'Public example only. Never use this phrase for funds or copy this predictable roll pattern for a real wallet.', 'Example input: 128 rolls, each showing 1', 'With the English dictionary selected, 128 rolls of 1 produce 128 zero bits. SHA-256 gives checksum bits 0011. The first eleven 11-bit groups have index 0; the last group is 00000000011, index 3. The result is eleven instances of “abandon”, followed by “about”. This example always uses the English dictionary, regardless of your current selections.', 'Example recovery phrase · English dictionary'],
  es: ['Ejemplo paso a paso · 12 palabras', 'Solo es un ejemplo público. Nunca uses esta frase para fondos ni copies este patrón predecible de tiradas para una billetera real.', 'Entrada de ejemplo: 128 tiradas, todas con resultado 1', 'Con el diccionario en inglés seleccionado, 128 tiradas de 1 producen 128 bits en cero. SHA-256 da los bits de verificación 0011. Los primeros once grupos de 11 bits tienen índice 0; el último es 00000000011, índice 3. El resultado es “abandon” once veces, seguido de “about”. Este ejemplo siempre usa el diccionario en inglés, independientemente de tus selecciones actuales.', 'Frase de recuperación de ejemplo · diccionario en inglés'],
  pt: ['Exemplo passo a passo · 12 palavras', 'Apenas um exemplo público. Nunca use esta frase para fundos nem copie este padrão previsível de lançamentos para uma carteira real.', 'Entrada de exemplo: 128 lançamentos, todos com resultado 1', 'Com o dicionário em inglês selecionado, 128 lançamentos de 1 produzem 128 bits zero. SHA-256 fornece os bits de verificação 0011. Os primeiros onze grupos de 11 bits têm índice 0; o último é 00000000011, índice 3. O resultado é “abandon” onze vezes, seguido de “about”. Este exemplo sempre usa o dicionário em inglês, independentemente das seleções atuais.', 'Frase de recuperação de exemplo · dicionário em inglês'],
  fr: ['Exemple détaillé · 12 mots', 'Exemple public uniquement. N’utilisez jamais cette phrase pour des fonds et ne reproduisez pas cette suite prévisible de lancers pour un vrai portefeuille.', 'Exemple de saisie : 128 lancers donnant tous 1', 'Avec le dictionnaire anglais sélectionné, 128 lancers donnant 1 produisent 128 bits à zéro. SHA-256 donne les bits de contrôle 0011. Les onze premiers groupes de 11 bits ont l’indice 0 ; le dernier est 00000000011, indice 3. Le résultat est onze fois « abandon », puis « about ». Cet exemple utilise toujours le dictionnaire anglais, quels que soient vos choix actuels.', 'Exemple de phrase de récupération · dictionnaire anglais'],
  it: ['Esempio guidato · 12 parole', 'Solo un esempio pubblico. Non usare mai questa frase per fondi e non copiare questa sequenza prevedibile di lanci per un vero portafoglio.', 'Dati di esempio: 128 lanci, tutti con risultato 1', 'Con il dizionario inglese selezionato, 128 lanci di 1 producono 128 bit zero. SHA-256 fornisce i bit di checksum 0011. I primi undici gruppi da 11 bit hanno indice 0; l’ultimo è 00000000011, indice 3. Il risultato è undici volte “abandon”, seguito da “about”. Questo esempio usa sempre il dizionario inglese, indipendentemente dalle selezioni attuali.', 'Frase di recupero di esempio · dizionario inglese'],
  cs: ['Ukázkový příklad · 12 slov', 'Pouze veřejný příklad. Tuto frázi nikdy nepoužívejte pro prostředky a tento předvídatelný vzor hodů nekopírujte pro skutečnou peněženku.', 'Ukázkový vstup: 128 hodů, pokaždé padne 1', 'Při výběru anglického slovníku vytvoří 128 hodů s výsledkem 1 celkem 128 nulových bitů. SHA-256 poskytne kontrolní bity 0011. Prvních jedenáct 11bitových skupin má index 0; poslední skupina je 00000000011, index 3. Výsledkem je jedenáctkrát „abandon“ a poté „about“. Tento příklad vždy používá anglický slovník bez ohledu na aktuální výběr.', 'Ukázková obnovovací fráze · anglický slovník'],
  ja: ['計算例 · 12語', '公開された例です。このフレーズを資金の保管に使用したり、この予測可能な出目のパターンを実際のウォレットに使ったりしないでください。', '入力例：128回すべての出目が1', '英語の辞書を選択した場合、128回の出目がすべて1なら、128ビットすべてが0になります。SHA-256によるチェックサムは0011です。最初の11個の11ビットグループのインデックスは0、最後のグループは00000000011でインデックスは3です。結果は「abandon」が11回、最後が「about」です。この例は現在の選択に関係なく常に英語の辞書を使用します。', '復元フレーズの例 · 英語の辞書'],
  ko: ['계산 예시 · 12단어', '공개된 예시일 뿐입니다. 이 구문을 자금 보관에 사용하거나 이 예측 가능한 패턴을 실제 지갑에 사용하지 마세요.', '입력 예시: 128회 모두 주사위 눈 1', '영어 사전을 선택한 경우 128회 모두 눈 1이 나오면 128개의 0비트가 됩니다. SHA-256 체크섬 비트는 0011입니다. 처음 11개 11비트 그룹은 인덱스 0이며, 마지막 그룹은 00000000011로 인덱스 3입니다. 결과는 “abandon” 11개 다음에 “about”입니다. 이 예시는 현재 선택과 관계없이 항상 영어 사전을 사용합니다.', '복구 구문 예시 · 영어 사전'],
  'zh-hans': ['计算示例 · 12个词', '仅为公开示例。切勿用此助记词存放资金，也不要将这种可预测的投掷模式用于真实钱包。', '示例输入：128次投掷，每次点数均为1', '选择英语词表时，128次点数1会产生128个零比特。SHA-256得到的校验位是0011。前11组11位二进制的索引均为0；最后一组是00000000011，索引为3。结果为11个“abandon”，最后是“about”。本示例始终使用英语词表，不受当前选择影响。', '恢复助记词示例 · 英语词表'],
  'zh-hant': ['計算範例 · 12個詞', '僅為公開範例。切勿用此助記詞存放資金，也不要將這種可預測的投擲模式用於真實錢包。', '範例輸入：128次投擲，每次點數均為1', '選擇英語詞表時，128次點數1會產生128個零位元。SHA-256得到的校驗位元是0011。前11組11位元二進位的索引均為0；最後一組是00000000011，索引為3。結果為11個「abandon」，最後是「about」。本範例始終使用英語詞表，不受目前選擇影響。', '恢復助記詞範例 · 英語詞表'],
}
export const offlineTranslations = Object.fromEntries(Object.entries(text).map(([language, values]) => {
  if (values.length !== keys.length || values.some(value => !value)) throw new Error(`Incomplete offline translation: ${language}`)
  const example = examples[language]
  if (!example || example.length !== exampleKeys.length || example.some(value => !value)) throw new Error(`Incomplete example translation: ${language}`)
  return [language, { ...Object.fromEntries(keys.map((key, index) => [key, values[index]])), ...Object.fromEntries(exampleKeys.map((key, index) => [key, example[index]])) }]
}))
