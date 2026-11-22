import type { LanguageCode } from '../types'

export interface UIStrings {
  tagline: string
  heroSubtitle: string
  uploadTitle: string
  uploadHint: string
  browse: string
  dropActive: string
  supportedFormats: string
  mockHint: string
  analyze: string
  analyzing: string
  cancel: string
  newReceipt: string
  resultsTitle: string
  itemsCount: string
  itemsCountOne: string
  subtotal: string
  vat: string
  total: string
  exportCsv: string
  exportJson: string
  lowConfidence: string
  lowConfidenceHint: string
  original: string
  quantity: string
  unitPrice: string
  lineTotal: string
  categorySubtotal: string
  mockBadge: string
  mockNote: string
  errorTitle: string
  tryAgain: string
  unsupportedFile: string
  tooLarge: string
  invalidFile: string
  analysisFailed: string
  invalidLanguage: string
  language: string
  source: string
  output: string
  changeFile: string
  removeFile: string
  date: string
  merchant: string
  receiptDetails: string
}

const en: UIStrings = {
  tagline: 'Every receipt, neatly sorted.',
  heroSubtitle:
    'Upload a photo or PDF. Get a categorized, translated item list in seconds.',
  uploadTitle: 'Upload your receipt',
  uploadHint: 'Drag a receipt image or PDF here, or choose a file.',
  browse: 'Choose file',
  dropActive: 'Drop your receipt here',
  supportedFormats: 'JPG, PNG, WebP or PDF · up to 15 MB',
  mockHint: 'Demo mode: any valid image or PDF works — contents are not read yet.',
  analyze: 'Analyze receipt',
  analyzing: 'Reading your receipt…',
  cancel: 'Cancel',
  newReceipt: 'New receipt',
  resultsTitle: 'Categorized items',
  itemsCount: '{count} items',
  itemsCountOne: '{count} item',
  subtotal: 'Subtotal',
  vat: 'VAT (included)',
  total: 'Total',
  exportCsv: 'Export CSV',
  exportJson: 'Export JSON',
  lowConfidence: 'Low confidence',
  lowConfidenceHint: 'This item may have been read incorrectly.',
  original: 'Original',
  quantity: 'Qty',
  unitPrice: 'Unit price',
  lineTotal: 'Line total',
  categorySubtotal: 'Category subtotal',
  mockBadge: 'Demo',
  mockNote: 'Mock analysis — no real OCR is performed yet.',
  errorTitle: 'Something went wrong',
  tryAgain: 'Try again',
  unsupportedFile: 'Unsupported file type. Use a JPG, PNG, WebP, or PDF.',
  tooLarge: 'This file is too large. The limit is 15 MB.',
  invalidFile: 'This file is empty or damaged.',
  analysisFailed: 'The receipt could not be analyzed. Please try again.',
  invalidLanguage: 'That language is not supported.',
  language: 'Language',
  source: 'Source',
  output: 'Result',
  changeFile: 'Change file',
  removeFile: 'Remove',
  date: 'Date',
  merchant: 'Merchant',
  receiptDetails: 'Receipt details',
}

const fi: UIStrings = {
  tagline: 'Jokainen kuitti siististi järjestettynä.',
  heroSubtitle:
    'Lataa kuva tai PDF. Saat luokitellun ja käännetyn ostoslistan sekunneissa.',
  uploadTitle: 'Lataa kuitisi',
  uploadHint: 'Vedä kuva tai PDF tähän tai valitse tiedosto.',
  browse: 'Valitse tiedosto',
  dropActive: 'Pudota kuitti tähän',
  supportedFormats: 'JPG, PNG, WebP tai PDF · enintään 15 Mt',
  mockHint: 'Demotila: mikä tahansa kelvollinen kuva tai PDF käy – sisältöä ei vielä lueta.',
  analyze: 'Analysoi kuitti',
  analyzing: 'Luetaan kuittia…',
  cancel: 'Peruuta',
  newReceipt: 'Uusi kuitti',
  resultsTitle: 'Luokitellut nimikkeet',
  itemsCount: '{count} nimikettä',
  itemsCountOne: '{count} nimike',
  subtotal: 'Välisumma',
  vat: 'ALV (sisältyy)',
  total: 'Yhteensä',
  exportCsv: 'Vie CSV',
  exportJson: 'Vie JSON',
  lowConfidence: 'Epävarma tunnistus',
  lowConfidenceHint: 'Tämä nimike on saatettu lukea väärin.',
  original: 'Alkuperäinen',
  quantity: 'Määrä',
  unitPrice: 'Yksikköhinta',
  lineTotal: 'Rivisumma',
  categorySubtotal: 'Kategorian summa',
  mockBadge: 'Demo',
  mockNote: 'Mock-analyysi – oikeaa OCR-tunnistusta ei vielä tehdä.',
  errorTitle: 'Jokin meni pieleen',
  tryAgain: 'Yritä uudelleen',
  unsupportedFile: 'Tiedostotyyppi ei ole tuettu. Käytä JPG-, PNG-, WebP- tai PDF-tiedostoa.',
  tooLarge: 'Tiedosto on liian suuri. Enimmäiskoko on 15 Mt.',
  invalidFile: 'Tiedosto on tyhjä tai vioittunut.',
  analysisFailed: 'Kuitin käsittely epäonnistui. Yritä uudelleen.',
  invalidLanguage: 'Valittu kieli ei ole tuettu.',
  language: 'Kieli',
  source: 'Lähde',
  output: 'Tulos',
  changeFile: 'Vaihda tiedosto',
  removeFile: 'Poista',
  date: 'Päiväys',
  merchant: 'Kauppa',
  receiptDetails: 'Kuitin tiedot',
}

const fa: UIStrings = {
  tagline: 'هر رسید، مرتب و دسته‌بندی‌شده.',
  heroSubtitle:
    'یک عکس یا PDF بارگذاری کنید و در چند ثانیه فهرست دسته‌بندی‌شده و ترجمه‌شده بگیرید.',
  uploadTitle: 'رسید خود را بارگذاری کنید',
  uploadHint: 'تصویر یا PDF رسید را اینجا رها کنید یا فایل را انتخاب کنید.',
  browse: 'انتخاب فایل',
  dropActive: 'رسید را اینجا رها کنید',
  supportedFormats: 'JPG، PNG، WebP یا PDF · حداکثر ۱۵ مگابایت',
  mockHint: 'حالت نمایشی: هر تصویر یا PDF معتبری کار می‌کند — محتوا هنوز خوانده نمی‌شود.',
  analyze: 'تحلیل رسید',
  analyzing: 'در حال خواندن رسید…',
  cancel: 'لغو',
  newReceipt: 'رسید جدید',
  resultsTitle: 'اقلام دسته‌بندی‌شده',
  itemsCount: '{count} قلم',
  itemsCountOne: '{count} قلم',
  subtotal: 'جمع جزء',
  vat: 'مالیات بر ارزش افزوده (شامل)',
  total: 'مجموع',
  exportCsv: 'خروجی CSV',
  exportJson: 'خروجی JSON',
  lowConfidence: 'اطمینان کم',
  lowConfidenceHint: 'ممکن است این قلم اشتباه خوانده شده باشد.',
  original: 'متن اصلی',
  quantity: 'تعداد',
  unitPrice: 'قیمت واحد',
  lineTotal: 'جمع ردیف',
  categorySubtotal: 'جمع دسته',
  mockBadge: 'نمایشی',
  mockNote: 'تحلیل آزمایشی است؛ هنوز OCR واقعی انجام نمی‌شود.',
  errorTitle: 'مشکلی پیش آمد',
  tryAgain: 'تلاش دوباره',
  unsupportedFile: 'نوع فایل پشتیبانی نمی‌شود. از JPG، PNG، WebP یا PDF استفاده کنید.',
  tooLarge: 'فایل بیش از حد بزرگ است. حداکثر اندازه ۱۵ مگابایت است.',
  invalidFile: 'فایل خالی یا خراب است.',
  analysisFailed: 'پردازش رسید ناموفق بود. دوباره تلاش کنید.',
  invalidLanguage: 'این زبان پشتیبانی نمی‌شود.',
  language: 'زبان',
  source: 'مبدأ',
  output: 'خروجی',
  changeFile: 'تغییر فایل',
  removeFile: 'حذف',
  date: 'تاریخ',
  merchant: 'فروشگاه',
  receiptDetails: 'جزئیات رسید',
}

const ar: UIStrings = {
  tagline: 'كل إيصال، منظم ومرتب.',
  heroSubtitle: 'ارفع صورة أو PDF واحصل على قائمة عناصر مصنفة ومترجمة في ثوانٍ.',
  uploadTitle: 'ارفع إيصالك',
  uploadHint: 'اسحب صورة أو ملف PDF للإيصال هنا، أو اختر ملفًا.',
  browse: 'اختر ملفًا',
  dropActive: 'أفلت الإيصال هنا',
  supportedFormats: 'JPG أو PNG أو WebP أو PDF · بحد أقصى ١٥ ميغابايت',
  mockHint: 'الوضع التجريبي: أي صورة أو PDF صالح يعمل — لا تتم قراءة المحتوى بعد.',
  analyze: 'تحليل الإيصال',
  analyzing: 'جارٍ قراءة الإيصال…',
  cancel: 'إلغاء',
  newReceipt: 'إيصال جديد',
  resultsTitle: 'العناصر المصنفة',
  itemsCount: '{count} عنصرًا',
  itemsCountOne: '{count} عنصر',
  subtotal: 'المجموع الفرعي',
  vat: 'ضريبة القيمة المضافة (مشمولة)',
  total: 'الإجمالي',
  exportCsv: 'تصدير CSV',
  exportJson: 'تصدير JSON',
  lowConfidence: 'ثقة منخفضة',
  lowConfidenceHint: 'ربما تمت قراءة هذا العنصر بشكل خاطئ.',
  original: 'النص الأصلي',
  quantity: 'الكمية',
  unitPrice: 'سعر الوحدة',
  lineTotal: 'إجمالي السطر',
  categorySubtotal: 'مجموع الفئة',
  mockBadge: 'تجريبي',
  mockNote: 'تحليل تجريبي — لا يتم تنفيذ OCR فعلي بعد.',
  errorTitle: 'حدث خطأ ما',
  tryAgain: 'حاول مرة أخرى',
  unsupportedFile: 'نوع الملف غير مدعوم. استخدم JPG أو PNG أو WebP أو PDF.',
  tooLarge: 'الملف كبير جدًا. الحد الأقصى ١٥ ميغابايت.',
  invalidFile: 'الملف فارغ أو تالف.',
  analysisFailed: 'تعذّرت معالجة الإيصال. حاول مرة أخرى.',
  invalidLanguage: 'هذه اللغة غير مدعومة.',
  language: 'اللغة',
  source: 'المصدر',
  output: 'الإخراج',
  changeFile: 'تغيير الملف',
  removeFile: 'إزالة',
  date: 'التاريخ',
  merchant: 'المتجر',
  receiptDetails: 'تفاصيل الإيصال',
}

const es: UIStrings = {
  tagline: 'Cada recibo, bien ordenado.',
  heroSubtitle:
    'Sube una foto o PDF y obtén una lista de artículos categorizada y traducida en segundos.',
  uploadTitle: 'Sube tu recibo',
  uploadHint: 'Arrastra una imagen o PDF del recibo aquí, o elige un archivo.',
  browse: 'Elegir archivo',
  dropActive: 'Suelta el recibo aquí',
  supportedFormats: 'JPG, PNG, WebP o PDF · máx. 15 MB',
  mockHint: 'Modo demo: sirve cualquier imagen o PDF válido; aún no se lee el contenido.',
  analyze: 'Analizar recibo',
  analyzing: 'Leyendo el recibo…',
  cancel: 'Cancelar',
  newReceipt: 'Nuevo recibo',
  resultsTitle: 'Artículos por categoría',
  itemsCount: '{count} artículos',
  itemsCountOne: '{count} artículo',
  subtotal: 'Subtotal',
  vat: 'IVA (incluido)',
  total: 'Total',
  exportCsv: 'Exportar CSV',
  exportJson: 'Exportar JSON',
  lowConfidence: 'Poca confianza',
  lowConfidenceHint: 'Puede que este artículo se haya leído mal.',
  original: 'Original',
  quantity: 'Cant.',
  unitPrice: 'Precio ud.',
  lineTotal: 'Total línea',
  categorySubtotal: 'Subtotal categoría',
  mockBadge: 'Demo',
  mockNote: 'Análisis simulado: todavía no se hace OCR real.',
  errorTitle: 'Algo salió mal',
  tryAgain: 'Reintentar',
  unsupportedFile: 'Tipo de archivo no compatible. Usa JPG, PNG, WebP o PDF.',
  tooLarge: 'El archivo es demasiado grande. El máximo es 15 MB.',
  invalidFile: 'El archivo está vacío o dañado.',
  analysisFailed: 'No se pudo procesar el recibo. Inténtalo de nuevo.',
  invalidLanguage: 'Ese idioma no es compatible.',
  language: 'Idioma',
  source: 'Origen',
  output: 'Resultado',
  changeFile: 'Cambiar archivo',
  removeFile: 'Quitar',
  date: 'Fecha',
  merchant: 'Comercio',
  receiptDetails: 'Detalles del recibo',
}

const fr: UIStrings = {
  tagline: 'Chaque reçu, parfaitement rangé.',
  heroSubtitle:
    "Importez une photo ou un PDF et obtenez une liste d'articles classée et traduite en quelques secondes.",
  uploadTitle: 'Importez votre reçu',
  uploadHint: 'Glissez une image ou un PDF du reçu ici, ou choisissez un fichier.',
  browse: 'Choisir un fichier',
  dropActive: 'Déposez le reçu ici',
  supportedFormats: 'JPG, PNG, WebP ou PDF · 15 Mo max.',
  mockHint:
    "Mode démo : toute image ou PDF valide fonctionne ; le contenu n'est pas encore lu.",
  analyze: 'Analyser le reçu',
  analyzing: 'Lecture du reçu…',
  cancel: 'Annuler',
  newReceipt: 'Nouveau reçu',
  resultsTitle: 'Articles par catégorie',
  itemsCount: '{count} articles',
  itemsCountOne: '{count} article',
  subtotal: 'Sous-total',
  vat: 'TVA (incluse)',
  total: 'Total',
  exportCsv: 'Exporter CSV',
  exportJson: 'Exporter JSON',
  lowConfidence: 'Confiance faible',
  lowConfidenceHint: 'Cet article a peut-être été mal lu.',
  original: 'Original',
  quantity: 'Qté',
  unitPrice: 'Prix unit.',
  lineTotal: 'Total ligne',
  categorySubtotal: 'Sous-total catégorie',
  mockBadge: 'Démo',
  mockNote: "Analyse simulée — l'OCR réel n'est pas encore activé.",
  errorTitle: 'Une erreur est survenue',
  tryAgain: 'Réessayer',
  unsupportedFile: 'Type de fichier non pris en charge. Utilisez JPG, PNG, WebP ou PDF.',
  tooLarge: 'Le fichier est trop volumineux. Maximum 15 Mo.',
  invalidFile: 'Le fichier est vide ou endommagé.',
  analysisFailed: 'Le traitement du reçu a échoué. Réessayez.',
  invalidLanguage: "Cette langue n'est pas prise en charge.",
  language: 'Langue',
  source: 'Source',
  output: 'Résultat',
  changeFile: 'Changer de fichier',
  removeFile: 'Retirer',
  date: 'Date',
  merchant: 'Commerçant',
  receiptDetails: 'Détails du reçu',
}

const de: UIStrings = {
  tagline: 'Jeder Beleg, ordentlich sortiert.',
  heroSubtitle:
    'Lade ein Foto oder PDF hoch und erhalte in Sekunden eine kategorisierte, übersetzte Artikelliste.',
  uploadTitle: 'Beleg hochladen',
  uploadHint: 'Ziehe ein Bild oder PDF des Belegs hierher oder wähle eine Datei.',
  browse: 'Datei auswählen',
  dropActive: 'Beleg hier ablegen',
  supportedFormats: 'JPG, PNG, WebP oder PDF · max. 15 MB',
  mockHint:
    'Demo-Modus: Jedes gültige Bild oder PDF funktioniert – der Inhalt wird noch nicht gelesen.',
  analyze: 'Beleg analysieren',
  analyzing: 'Beleg wird gelesen…',
  cancel: 'Abbrechen',
  newReceipt: 'Neuer Beleg',
  resultsTitle: 'Artikel nach Kategorie',
  itemsCount: '{count} Artikel',
  itemsCountOne: '{count} Artikel',
  subtotal: 'Zwischensumme',
  vat: 'MwSt. (enthalten)',
  total: 'Gesamt',
  exportCsv: 'CSV exportieren',
  exportJson: 'JSON exportieren',
  lowConfidence: 'Unsichere Erkennung',
  lowConfidenceHint: 'Dieser Artikel wurde möglicherweise falsch gelesen.',
  original: 'Original',
  quantity: 'Menge',
  unitPrice: 'Einzelpreis',
  lineTotal: 'Zeilensumme',
  categorySubtotal: 'Kategoriesumme',
  mockBadge: 'Demo',
  mockNote: 'Simulierte Analyse – echte OCR ist noch nicht aktiv.',
  errorTitle: 'Etwas ist schiefgelaufen',
  tryAgain: 'Erneut versuchen',
  unsupportedFile: 'Dateityp wird nicht unterstützt. Verwende JPG, PNG, WebP oder PDF.',
  tooLarge: 'Die Datei ist zu groß. Maximum: 15 MB.',
  invalidFile: 'Die Datei ist leer oder beschädigt.',
  analysisFailed: 'Der Beleg konnte nicht verarbeitet werden. Versuche es erneut.',
  invalidLanguage: 'Diese Sprache wird nicht unterstützt.',
  language: 'Sprache',
  source: 'Quelle',
  output: 'Ergebnis',
  changeFile: 'Datei ändern',
  removeFile: 'Entfernen',
  date: 'Datum',
  merchant: 'Händler',
  receiptDetails: 'Belegdetails',
}

const zh: UIStrings = {
  tagline: '每张收据，都整整齐齐。',
  heroSubtitle: '上传照片或 PDF，几秒内获得已分类、已翻译的商品清单。',
  uploadTitle: '上传你的收据',
  uploadHint: '将收据图片或 PDF 拖到这里，或选择文件。',
  browse: '选择文件',
  dropActive: '将收据放到这里',
  supportedFormats: 'JPG、PNG、WebP 或 PDF · 最大 15 MB',
  mockHint: '演示模式：任何有效的图片或 PDF 都可以，暂不读取内容。',
  analyze: '分析收据',
  analyzing: '正在读取收据…',
  cancel: '取消',
  newReceipt: '新收据',
  resultsTitle: '分类商品',
  itemsCount: '{count} 件商品',
  itemsCountOne: '{count} 件商品',
  subtotal: '小计',
  vat: '增值税（含）',
  total: '总计',
  exportCsv: '导出 CSV',
  exportJson: '导出 JSON',
  lowConfidence: '置信度低',
  lowConfidenceHint: '这件商品可能识别有误。',
  original: '原文',
  quantity: '数量',
  unitPrice: '单价',
  lineTotal: '小计',
  categorySubtotal: '分类小计',
  mockBadge: '演示',
  mockNote: '模拟分析 — 尚未启用真正的 OCR。',
  errorTitle: '出了点问题',
  tryAgain: '重试',
  unsupportedFile: '不支持的文件类型。请使用 JPG、PNG、WebP 或 PDF。',
  tooLarge: '文件太大。最大 15 MB。',
  invalidFile: '文件为空或已损坏。',
  analysisFailed: '收据处理失败，请重试。',
  invalidLanguage: '不支持该语言。',
  language: '语言',
  source: '原文',
  output: '输出',
  changeFile: '更换文件',
  removeFile: '移除',
  date: '日期',
  merchant: '商家',
  receiptDetails: '收据详情',
}

export const UI_STRINGS: Record<LanguageCode, UIStrings> = { en, fi, fa, ar, es, fr, de, zh }

export function getUi(language: LanguageCode): UIStrings {
  return UI_STRINGS[language]
}

export function formatTemplate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  )
}

export function formatItemCount(count: number, locale: string, t: UIStrings): string {
  const template = count === 1 ? t.itemsCountOne : t.itemsCount
  return formatTemplate(template, {
    count: new Intl.NumberFormat(locale).format(count),
  })
}

export function getErrorMessage(code: string, t: UIStrings): string {
  switch (code) {
    case 'unsupported_file_type':
    case 'unsupportedFile':
      return t.unsupportedFile
    case 'file_too_large':
    case 'tooLarge':
      return t.tooLarge
    case 'empty_file':
    case 'invalid_file':
    case 'invalidFile':
      return t.invalidFile
    case 'invalid_language':
      return t.invalidLanguage
    default:
      return t.analysisFailed
  }
}
