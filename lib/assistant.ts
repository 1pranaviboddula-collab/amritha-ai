import type { Lang } from './i18n'
import type { Medicine, Visit } from './store'

type Ctx = { medicines: Medicine[]; visits: Visit[]; name: string }

const L = (en: string, hi: string, te: string, lang: Lang) =>
  lang === 'hi' ? hi : lang === 'te' ? te : en

const has = (q: string, words: string[]) => words.some((w) => q.includes(w))

export function getReply(query: string, lang: Lang, ctx: Ctx): string {
  const q = query.toLowerCase()

  // Blood pressure medicine
  if (has(q, ['bp', 'blood pressure', 'pressure', 'रक्तचाप', 'बीपी', 'రక్తపోటు'])) {
    const bp = ctx.medicines.find((m) => /pressure|bp/i.test(m.condition))
    if (bp) {
      return L(
        `Your blood pressure medicine is ${bp.name}. Take it ${bp.times.join(' and ')}, ${bp.dosage}.`,
        `आपकी रक्तचाप की दवा ${bp.name} है। इसे ${bp.times.join(' और ')} पर लें, ${bp.dosage}।`,
        `మీ రక్తపోటు మందు ${bp.name}. దీన్ని ${bp.times.join(', ')} కి తీసుకోండి, ${bp.dosage}.`,
        lang,
      )
    }
  }

  // Fever
  if (has(q, ['fever', 'temperature', 'बुखार', 'ज्वर', 'జ్వరం', 'జ్వరము'])) {
    return L(
      'For a mild fever, please rest, drink warm water, and you may take paracetamol after food. If the fever is above 102°F or lasts more than 2 days, please contact your doctor or use the red emergency button.',
      'हल्के बुखार के लिए आराम करें, गर्म पानी पिएँ और भोजन के बाद पैरासिटामोल ले सकते हैं। यदि बुखार 102°F से अधिक हो या 2 दिन से ज़्यादा रहे, तो डॉक्टर से संपर्क करें या लाल आपातकालीन बटन दबाएँ।',
      'తేలికపాటి జ్వరానికి విశ్రాంతి తీసుకోండి, వెచ్చని నీరు తాగండి, భోజనం తర్వాత పారాసిటమాల్ తీసుకోవచ్చు. జ్వరం 102°F కంటే ఎక్కువ ఉంటే లేదా 2 రోజులకు మించి ఉంటే డాక్టర్‌ను సంప్రదించండి లేదా ఎరుపు బటన్ నొక్కండి.',
      lang,
    )
  }

  // Pain
  if (has(q, ['pain', 'hurt', 'leg', 'ache', 'दर्द', 'नोव', 'నొప్పి', 'కాలు'])) {
    return L(
      'I am sorry you are in pain. Please rest the area and apply a warm or cold pack. If the pain is severe, sudden, or comes with swelling, please see your doctor soon.',
      'मुझे खेद है कि आपको दर्द हो रहा है। उस हिस्से को आराम दें और गर्म या ठंडी सिकाई करें। यदि दर्द तेज़, अचानक या सूजन के साथ हो, तो जल्द डॉक्टर को दिखाएँ।',
      'మీకు నొప్పి ఉన్నందుకు బాధగా ఉంది. ఆ ప్రాంతానికి విశ్రాంతి ఇవ్వండి, వెచ్చని లేదా చల్లని కాపడం పెట్టండి. నొప్పి తీవ్రంగా, హఠాత్తుగా లేదా వాపుతో ఉంటే వెంటనే డాక్టర్‌ను కలవండి.',
      lang,
    )
  }

  // Forgot medicine
  if (has(q, ['forgot', 'missed', 'भूल', 'छूट', 'మర్చి', 'మిస్'])) {
    return L(
      'If you missed a dose and it is close to the time, take it now. If it is almost time for the next dose, skip the missed one — never take two together. I can also mark your medicines as taken in the Medicines screen.',
      'यदि आप खुराक भूल गए और समय पास है, तो अभी ले लें। यदि अगली खुराक का समय पास है, तो छूटी हुई खुराक छोड़ दें — दो कभी एक साथ न लें। मैं दवाइयाँ स्क्रीन में इन्हें ली गई भी दिखा सकती हूँ।',
      'మీరు ఒక మోతాదు మర్చిపోయి, సమయం దగ్గరగా ఉంటే ఇప్పుడు తీసుకోండి. తదుపరి మోతాదు సమయం దగ్గరగా ఉంటే మిస్ అయినదాన్ని వదిలేయండి — రెండింటిని కలిపి తీసుకోవద్దు.',
      lang,
    )
  }

  // Medicine list / when
  if (has(q, ['medicine', 'medication', 'tablet', 'दवा', 'गोली', 'మందు', 'మాత్ర'])) {
    const pending = ctx.medicines.filter((m) => !m.taken)
    if (pending.length === 0) {
      return L(
        'You have taken all your medicines for today. Well done!',
        'आपने आज की सभी दवाइयाँ ले ली हैं। बहुत बढ़िया!',
        'మీరు ఈరోజు అన్ని మందులు తీసుకున్నారు. చాలా బాగుంది!',
        lang,
      )
    }
    const list = pending.map((m) => `${m.name} (${m.times.join(', ')})`).join('; ')
    return L(
      `You still have ${pending.length} medicine(s) to take today: ${list}.`,
      `आज आपको ${pending.length} दवाइयाँ लेनी बाकी हैं: ${list}।`,
      `ఈరోజు మీరు ఇంకా ${pending.length} మందులు తీసుకోవాలి: ${list}.`,
      lang,
    )
  }

  // Visits
  if (has(q, ['doctor', 'visit', 'appointment', 'डॉक्टर', 'मुलाकात', 'డాక్టర్', 'సందర్శన'])) {
    const next = ctx.visits.filter((v) => !v.past).sort((a, b) => a.date.localeCompare(b.date))[0]
    if (next) {
      return L(
        `Your next appointment is with ${next.doctor} on ${next.date} at ${next.time}.`,
        `आपकी अगली मुलाकात ${next.doctor} के साथ ${next.date} को ${next.time} पर है।`,
        `మీ తదుపరి సందర్శన ${next.doctor} తో ${next.date} న ${next.time} కి ఉంది.`,
        lang,
      )
    }
  }

  // Greeting
  if (has(q, ['namaste', 'hello', 'hi ', 'नमस्ते', 'నమస్తే'])) {
    return L(
      `Namaste ${ctx.name}. How are you feeling today? You can ask me about your medicines or doctor visits.`,
      `नमस्ते ${ctx.name}। आज आप कैसा महसूस कर रहे हैं? आप मुझसे अपनी दवाइयों या डॉक्टर मुलाकातों के बारे में पूछ सकते हैं।`,
      `నమస్తే ${ctx.name}. ఈరోజు మీరు ఎలా ఉన్నారు? మీ మందులు లేదా డాక్టర్ సందర్శనల గురించి అడగవచ్చు.`,
      lang,
    )
  }

  // Fallback
  return L(
    "I heard you. I can help with your medicines, doctor visits, and general health guidance. For emergencies, please use the red button on the home screen.",
    'मैंने आपको सुना। मैं आपकी दवाइयों, डॉक्टर मुलाकातों और सामान्य स्वास्थ्य मार्गदर्शन में मदद कर सकती हूँ। आपात स्थिति के लिए होम स्क्रीन पर लाल बटन का उपयोग करें।',
    'నేను విన్నాను. మీ మందులు, డాక్టర్ సందర్శనలు, సాధారణ ఆరోగ్య మార్గదర్శనంలో సహాయం చేయగలను. అత్యవసరాలకు హోమ్ స్క్రీన్‌లోని ఎరుపు బటన్ వాడండి.',
    lang,
  )
}
