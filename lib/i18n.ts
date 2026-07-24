export type Lang =
  | 'en'
  | 'hi'
  | 'te'
  | 'ta'
  | 'kn'
  | 'ml'
  | 'mr'
  | 'gu'
  | 'bn'
  | 'pa'
  | 'ur'
  | 'or'
  | 'as'
  | 'fr'
  | 'de'
  | 'es'
  | 'it'
  | 'pt'
  | 'ja'
  | 'ko'
  | 'zh'
  | 'ar'
  | 'ru'

export const LANGUAGES = [
  { code: 'en', short: 'EN', label: 'English', speech: 'en-IN' },
  { code: 'hi', short: 'हि', label: 'हिन्दी', speech: 'hi-IN' },
  { code: 'te', short: 'తె', label: 'తెలుగు', speech: 'te-IN' },
  { code: 'ta', short: 'த', label: 'தமிழ்', speech: 'ta-IN' },
  { code: 'kn', short: 'ಕ', label: 'ಕನ್ನಡ', speech: 'kn-IN' },
  { code: 'ml', short: 'മ', label: 'മലയാളം', speech: 'ml-IN' },
  { code: 'mr', short: 'म', label: 'मराठी', speech: 'mr-IN' },
  { code: 'gu', short: 'ગુ', label: 'ગુજરાતી', speech: 'gu-IN' },
  { code: 'bn', short: 'ব', label: 'বাংলা', speech: 'bn-IN' },
  { code: 'pa', short: 'ਪ', label: 'ਪੰਜਾਬੀ', speech: 'pa-IN' },
  { code: 'ur', short: 'ا', label: 'اردو', speech: 'ur-IN' },
  { code: 'or', short: 'ଓ', label: 'ଓଡ଼ିଆ', speech: 'or-IN' },
  { code: 'as', short: 'অ', label: 'অসমীয়া', speech: 'as-IN' },
  { code: 'es', short: 'ES', label: 'Español', speech: 'es-ES' },
  { code: 'fr', short: 'FR', label: 'Français', speech: 'fr-FR' },
  { code: 'de', short: 'DE', label: 'Deutsch', speech: 'de-DE' },
  { code: 'ja', short: 'JP', label: '日本語', speech: 'ja-JP' },
  { code: 'ko', short: 'KR', label: '한국어', speech: 'ko-KR' },
  { code: 'zh', short: '中', label: '中文', speech: 'zh-CN' },
  { code: 'ar', short: 'ع', label: 'العربية', speech: 'ar-SA' },
  { code: 'pt', short: 'PT', label: 'Português', speech: 'pt-PT' },
  { code: 'ru', short: 'RU', label: 'Русский', speech: 'ru-RU' },
  { code: 'it', short: 'IT', label: 'Italiano', speech: 'it-IT' },
] as const

type Dict = Record<string, Partial<Record<Lang, string>>>

export const t: Dict = {
  greeting: {
  en: 'Namaste',
  hi: 'नमस्ते',
  te: 'నమస్తే',
  ta: 'வணக்கம்',
  kn: 'ನಮಸ್ಕಾರ',
  ml: 'നമസ്കാരം',
  mr: 'नमस्कार',
  gu: 'નમસ્તે',
  bn: 'নমস্কার',
  pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
  ur: 'نمستے',
  or: 'ନମସ୍କାର',
  as: 'নমস্কাৰ',
  fr: 'Bonjour',
  de: 'Hallo',
  es: 'Hola',
  it: 'Ciao',
  pt: 'Olá',
  ja: 'こんにちは',
  ko: '안녕하세요',
  zh: '你好',
  ar: 'مرحبا',
  ru: 'Здравствуйте',
},

feeling: {
  en: 'How are you feeling today?',
  hi: 'आज आप कैसा महसूस कर रहे हैं?',
  te: 'ఈరోజు మీరు ఎలా ఉన్నారు?',
  ta: 'இன்று நீங்கள் எப்படி உணர்கிறீர்கள்?',
  kn: 'ಇಂದು ನೀವು ಹೇಗೆ ಅನಿಸುತ್ತಿದೆ?',
  ml: 'ഇന്ന് നിങ്ങൾക്ക് എങ്ങനെ തോന്നുന്നു?',
  mr: 'आज तुम्हाला कसे वाटत आहे?',
  gu: 'આજે તમને કેવું લાગે છે?',
  bn: 'আজ আপনি কেমন অনুভব করছেন?',
  pa: 'ਅੱਜ ਤੁਸੀਂ ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ?',
  ur: 'آج آپ کیسا محسوس کر رہے ہیں؟',
  or: 'ଆଜି ଆପଣ କେମିତି ଅନୁଭବ କରୁଛନ୍ତି?',
  as: 'আজি আপুনি কেনে অনুভৱ কৰিছে?',
  fr: 'Comment vous sentez-vous aujourd’hui ?',
  de: 'Wie fühlen Sie sich heute?',
  es: '¿Cómo se siente hoy?',
  it: 'Come si sente oggi?',
  pt: 'Como você está se sentindo hoje?',
  ja: '今日はどのように感じていますか？',
  ko: '오늘 기분이 어떠세요?',
  zh: '您今天感觉怎么样？',
  ar: 'كيف تشعر اليوم؟',
  ru: 'Как вы себя чувствуете сегодня?',
},
  readAloud: { en: 'Read this page aloud', hi: 'यह पेज पढ़कर सुनाएँ', te: 'ఈ పేజీని చదివి వినిపించు' },
  emergency: { en: 'EMERGENCY', hi: 'आपातकाल', te: 'అత్యవసరం' },
  callHelp: { en: 'Call for help now', hi: 'अभी मदद के लिए कॉल करें', te: 'ఇప్పుడు సహాయం కోసం కాల్ చేయండి' },
  emergencyDesc: {
    en: 'Caregiver + 108 + location',
    hi: 'देखभालकर्ता + 108 + स्थान',
    te: 'సంరక్షకుడు + 108 + లొకేషన్',
  },
  nextMedicine: { en: 'NEXT MEDICINE', hi: 'अगली दवा', te: 'తదుపరి మందు' },
  upcomingVisit: { en: 'UPCOMING VISIT', hi: 'आगामी मुलाकात', te: 'రాబోయే సందర్శన' },
  quickActions: { en: 'QUICK ACTIONS', hi: 'त्वरित कार्य', te: 'త్వరిత చర్యలు' },
  medicines: { en: 'Medicines', hi: 'दवाइयाँ', te: 'మందులు' },
  doctorVisits: { en: 'Doctor visits', hi: 'डॉक्टर मुलाकात', te: 'డాక్టర్ సందర్శనలు' },
  nearbyCare: { en: 'Nearby care', hi: 'नज़दीकी देखभाल', te: 'సమీప సంరక్షణ' },
  family: { en: 'Family', hi: 'परिवार', te: 'కుటుంబం' },
  history: { en: 'History', hi: 'इतिहास', te: 'చరిత్ర' },
  ashaPortal: { en: 'ASHA portal', hi: 'आशा पोर्टल', te: 'ఆశా పోర్టల్' },
  micHint: {
    en: 'Tap the blue microphone anytime. Speak in your language — Amritha will listen and help.',
    hi: 'कभी भी नीले माइक्रोफोन को दबाएँ। अपनी भाषा में बोलें — अमृता सुनेगी और मदद करेगी।',
    te: 'ఎప్పుడైనా నీలి మైక్రోఫోన్‌ను నొక్కండి. మీ భాషలో మాట్లాడండి — అమృత వింటుంది, సహాయం చేస్తుంది.',
  },
  // nav
  home: {
  en: 'Home',
  hi: 'होम',
  te: 'హోమ్',
  ta: 'முகப்பு',
  kn: 'ಮುಖಪುಟ',
  ml: 'ഹോം',
  mr: 'मुख्यपृष्ठ',
  gu: 'હોમ',
  bn: 'হোম',
  pa: 'ਘਰ',
  ur: 'ہوم',
  es: 'Inicio',
  fr: 'Accueil',
  de: 'Startseite',
  ja: 'ホーム',
  ko: '홈',
  zh: '主页',
  ar: 'الرئيسية',
  pt: 'Início',
  ru: 'Главная',
  it: 'Home'
},
  assistant: { 
  en: 'Assistant',
  hi: 'सहायक',
  te: 'సహాయకుడు',
  ta: 'உதவியாளர்',
  kn: 'ಸಹಾಯಕ',
  ml: 'സഹായി',
  mr: 'सहाय्यक',
  gu: 'સહાયક',
  bn: 'সহায়ক',
  pa: 'ਸਹਾਇਕ',
  ur: 'مددگار',
  or: 'ସହାୟକ',
  as: 'সহায়ক',
  es: 'Asistente',
  fr: 'Assistant',
  de: 'Assistent',
  ja: 'アシスタント',
  ko: '도우미',
  zh: '助手',
  ar: 'المساعد',
  pt: 'Assistente',
  ru: 'Помощник',
  it: 'Assistente'
},

visits: {
  en: 'Visits',
  hi: 'मुलाकातें',
  te: 'సందర్శనలు',
  ta: 'வருகைகள்',
  kn: 'ಭೇಟಿಗಳು',
  ml: 'സന്ദർശനങ്ങൾ',
  mr: 'भेटी',
  gu: 'મુલાકાતો',
  bn: 'সাক্ষাৎ',
  pa: 'ਮੁਲਾਕਾਤਾਂ',
  ur: 'ملاقاتیں',
  or: 'ସାକ୍ଷାତ',
  as: 'সাক্ষাৎ',
  es: 'Visitas',
  fr: 'Visites',
  de: 'Besuche',
  ja: '訪問',
  ko: '방문',
  zh: '访问',
  ar: 'الزيارات',
  pt: 'Visitas',
  ru: 'Визиты',
  it: 'Visite'
},

profile: {
  en: 'Profile',
  hi: 'प्रोफ़ाइल',
  te: 'ప్రొఫైల్',
  ta: 'சுயவிவரம்',
  kn: 'ಪ್ರೊಫೈಲ್',
  ml: 'പ്രൊഫൈൽ',
  mr: 'प्रोफाइल',
  gu: 'પ્રોફાઇલ',
  bn: 'প্রোফাইল',
  pa: 'ਪ੍ਰੋਫਾਈਲ',
  ur: 'پروفائل',
  or: 'ପ୍ରୋଫାଇଲ୍',
  as: 'প্ৰফাইল',
  es: 'Perfil',
  fr: 'Profil',
  de: 'Profil',
  ja: 'プロフィール',
  ko: '프로필',
  zh: '个人资料',
  ar: 'الملف الشخصي',
  pt: 'Perfil',
  ru: 'Профиль',
  it: 'Profilo'
},

myMedicines: {
  en: 'My medicines',
  hi: 'मेरी दवाइयाँ',
  te: 'నా మందులు',
  ta: 'என் மருந்துகள்',
  kn: 'ನನ್ನ ಔಷಧಿಗಳು',
  ml: 'എന്റെ മരുന്നുകൾ',
  mr: 'माझी औषधे',
  gu: 'મારી દવાઓ',
  bn: 'আমার ওষুধ',
  pa: 'ਮੇਰੀਆਂ ਦਵਾਈਆਂ',
  ur: 'میری دوائیں',
  or: 'ମୋ ଔଷଧ',
  as: 'মোৰ ঔষধ',
  es: 'Mis medicamentos',
  fr: 'Mes médicaments',
  de: 'Meine Medikamente',
  ja: '私の薬',
  ko: '내 약',
  zh: '我的药物',
  ar: 'أدويتي',
  pt: 'Meus medicamentos',
  ru: 'Мои лекарства',
  it: 'Le mie medicine'
},
  pendingToday: { en: 'pending today', hi: 'आज बाकी', te: 'ఈరోజు పెండింగ్' },
  allDone: { en: 'All done for today', hi: 'आज के लिए सब पूरा', te: 'ఈరోజుకి అంతా పూర్తయింది' },
  scanPrescription: { en: 'Scan prescription', hi: 'पर्ची स्कैन करें', te: 'ప్రిస్క్రిప్షన్ స్కాన్' },
  cameraOcr: { en: 'Camera + OCR', hi: 'कैमरा + OCR', te: 'కెమెరా + OCR' },
  addManually: { en: 'Add manually', hi: 'हाथ से जोड़ें', te: 'మాన్యువల్‌గా జోడించు' },
  enterDetails: { en: 'Enter details or by voice', hi: 'विवरण या आवाज़ से', te: 'వివరాలు లేదా వాయిస్‌తో' },
  toTake: { en: 'TO TAKE', hi: 'लेनी है', te: 'తీసుకోవాలి' },
  alreadyTaken: { en: 'ALREADY TAKEN', hi: 'ले ली गई', te: 'తీసుకున్నవి' },
  markTaken: { en: 'Mark as taken', hi: 'ली गई के रूप में चिह्नित करें', te: 'తీసుకున్నట్లు గుర్తించు' },
  taken: { en: 'Taken', hi: 'ले ली', te: 'తీసుకున్నారు' },
  undo: { en: 'Undo', hi: 'पूर्ववत करें', te: 'రద్దు' },
  // add medicine form
  medicineName: { en: 'Medicine name', hi: 'दवा का नाम', te: 'మందు పేరు' },
  forCondition: { en: 'For (condition)', hi: 'किसके लिए (रोग)', te: 'దేని కోసం (వ్యాధి)' },
  dosage: { en: 'Dosage', hi: 'खुराक', te: 'మోతాదు' },
  time: { en: 'Time', hi: 'समय', te: 'సమయం' },
  date: { en: 'Date', hi: 'तारीख़', te: 'తేదీ' },
  save: { en: 'Save', hi: 'सहेजें', te: 'సేవ్' },
  cancel: { en: 'Cancel', hi: 'रद्द करें', te: 'రద్దు చేయి' },
  // assistant
  voiceAssistant: { en: 'Voice Assistant', hi: 'वॉइस सहायक', te: 'వాయిస్ సహాయకుడు' },
  speaking: { en: 'Speaking', hi: 'भाषा', te: 'భాష' },
  intro: {
    en: 'Namaste. I am Amritha. You can speak to me in your own language. How can I help you today?',
    hi: 'नमस्ते। मैं अमृता हूँ। आप मुझसे अपनी भाषा में बात कर सकते हैं। आज मैं आपकी कैसे मदद करूँ?',
    te: 'నమస్తే. నేను అమృత. మీరు మీ భాషలో నాతో మాట్లాడవచ్చు. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?',
  },
  tryAsking: { en: 'TRY ASKING', hi: 'ऐसे पूछें', te: 'ఇలా అడగండి' },
  play: { en: 'Play', hi: 'सुनें', te: 'వినండి' },
  stop: { en: 'Stop', hi: 'रोकें', te: 'ఆపండి' },
  tapToSpeak: { en: 'Tap to speak', hi: 'बोलने के लिए दबाएँ', te: 'మాట్లాడటానికి నొక్కండి' },
  listening: { en: 'Listening…', hi: 'सुन रहे हैं…', te: 'వింటోంది…' },
  disclaimer: {
    en: 'Amritha gives general guidance only. It does not replace advice from a doctor. In emergencies, use the red button on the home screen.',
    hi: 'अमृता केवल सामान्य मार्गदर्शन देती है। यह डॉक्टर की सलाह का विकल्प नहीं है। आपात स्थिति में होम स्क्रीन पर लाल बटन का उपयोग करें।',
    te: 'అమృత సాధారణ మార్గదర్శనం మాత్రమే ఇస్తుంది. ఇది వైద్యుని సలహాకు ప్రత్యామ్నాయం కాదు. అత్యవసరంలో హోమ్ స్క్రీన్‌లోని ఎరుపు బటన్‌ను వాడండి.',
  },
  // visits
  myVisits: { en: 'My visits', hi: 'मेरी मुलाकातें', te: 'నా సందర్శనలు' },
  bookVisit: { en: 'Book a visit', hi: 'मुलाकात बुक करें', te: 'సందర్శన బుక్ చేయి' },
  upcoming: { en: 'UPCOMING', hi: 'आगामी', te: 'రాబోయేవి' },
  past: { en: 'PAST', hi: 'पिछली', te: 'గత' },
  joinVideo: { en: 'Join video call', hi: 'वीडियो कॉल में शामिल हों', te: 'వీడియో కాల్‌లో చేరండి' },
  getDirections: { en: 'Get directions', hi: 'दिशा-निर्देश पाएँ', te: 'దిశలను పొందండి' },
  doctorName: { en: 'Doctor name', hi: 'डॉक्टर का नाम', te: 'డాక్టర్ పేరు' },
  reason: { en: 'Reason', hi: 'कारण', te: 'కారణం' },
  mode: { en: 'Mode', hi: 'तरीका', te: 'విధానం' },
  video: { en: 'Video', hi: 'वीडियो', te: 'వీడియో' },
  inPerson: { en: 'In person', hi: 'व्यक्तिगत', te: 'వ్యక్తిగతంగా' },
  // profile
  emergencyContacts: { en: 'Emergency contacts', hi: 'आपातकालीन संपर्क', te: 'అత్యవసర సంప్రదింపులు' },
  healthInfo: { en: 'Health information', hi: 'स्वास्थ्य जानकारी', te: 'ఆరోగ్య సమాచారం' },
  conditions: { en: 'Conditions', hi: 'रोग', te: 'వ్యాధులు' },
  bloodGroup: { en: 'Blood group', hi: 'रक्त समूह', te: 'రక్త వర్గం' },
  age: { en: 'Age', hi: 'उम्र', te: 'వయసు' },
  settings: { en: 'Settings', hi: 'सेटिंग्स', te: 'సెట్టింగ్‌లు' },
  language: { en: 'Language', hi: 'भाषा', te: 'భాష' },
  largeText: { en: 'Larger text', hi: 'बड़ा अक्षर', te: 'పెద్ద అక్షరాలు' },
  call: { en: 'Call', hi: 'कॉल', te: 'కాల్' },
}

export function tr(key: string, lang: Lang): string {
  const entry = t[key]

  if (!entry) return key

  if (entry[lang]) {
    return entry[lang]!
  }

  return entry.en ?? key
}