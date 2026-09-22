/* ==========================================================================
   glossary.js — Glossary of Key Terms
   Ramayana: Beyond What We Were Told
   ========================================================================== */

const GLOSSARY_DATA = [
  {
    term: "Kanda",
    sanskrit: "काण्ड",
    definition: "A major division or 'book' of the Ramayana epic. The traditional text has seven Kandas: Bala, Ayodhya, Aranya, Kishkindha, Sundara, Yuddha, and Uttara.",
    context: "The six Kandas from Bala to Yuddha are generally accepted as the core text, while the Uttara Kanda is widely regarded by scholars as a later addition."
  },
  {
    term: "Sarga",
    sanskrit: "सर्ग",
    definition: "A chapter or canto within a Kanda. Each Sarga typically forms a self-contained narrative unit within the larger book.",
    context: "The critical edition identifies which Sargas belong to the oldest recoverable layer of the text and which are later interpolations."
  },
  {
    term: "Critical Edition",
    sanskrit: null,
    definition: "A scholarly reconstruction of a text's oldest recoverable form, produced by systematic comparison of all available manuscripts to identify the earliest readings and distinguish later additions.",
    context: "The Baroda Critical Edition of the Valmiki Ramayana (1960-1975) compared hundreds of manuscripts to establish the most authoritative text."
  },
  {
    term: "Recension",
    sanskrit: null,
    definition: "A particular version or textual tradition of a work, distinguished by systematic differences from other versions. The Ramayana has two major recensions: Northern and Southern.",
    context: "The Northern and Southern recensions of the Ramayana differ significantly in length and content, with the Southern generally being longer."
  },
  {
    term: "Interpolation",
    sanskrit: null,
    definition: "A passage inserted into a text at a later date by someone other than the original author. Interpolations may be single verses, entire chapters, or even whole books.",
    context: "The critical edition identified thousands of interpolated verses in the Ramayana, revealing how the text grew over centuries of transmission."
  },
  {
    term: "Anushtubh",
    sanskrit: "अनुष्टुभ्",
    definition: "The most common Sanskrit verse meter, consisting of four padas (quarter-verses) of eight syllables each, for a total of 32 syllables per verse.",
    context: "The Ramayana is composed primarily in anushtubh meter. Deviations from standard anushtubh patterns can help identify later additions to the text."
  },
  {
    term: "Dharma",
    sanskrit: "धर्म",
    definition: "A complex term encompassing cosmic order, moral law, duty, righteousness, and proper conduct. It varies by context, social position, and life stage.",
    context: "The tension between personal dharma (svadharma), kingly duty (rajadharma), and universal ethics is central to many of the Ramayana's most contested episodes."
  },
  {
    term: "Adharma",
    sanskrit: "अधर्म",
    definition: "The opposite of dharma: disorder, unrighteousness, violation of moral or cosmic law. Actions that transgress the established order.",
    context: "The Shambuka episode raises the question of whether a Shudra performing tapas constitutes adharma, reflecting the ideology of the Uttara Kanda's composers."
  },
  {
    term: "Tapas",
    sanskrit: "तपस्",
    definition: "Ascetic heat or spiritual power generated through austerities, penance, and meditation. Literally 'heat' — the transformative energy of disciplined practice.",
    context: "In the Shambuka episode, the question of who is permitted to perform tapas becomes a matter of life and death, reflecting varna-based restrictions."
  },
  {
    term: "Brahmahatya",
    sanskrit: "ब्रह्महत्या",
    definition: "The sin of killing a Brahmin, considered one of the gravest transgressions in Hindu dharma. It requires extensive penance to expiate.",
    context: "Rama's killing of Ravana raises the question of brahmahatya since Ravana was a Brahmin by birth, a tension addressed in some later Puranic texts through the Shiva penance narrative."
  },
  {
    term: "Shakti",
    sanskrit: "शक्ति",
    definition: "Divine feminine power or energy; the active, creative principle of the cosmos. Also refers to a specific weapon or the personified goddess.",
    context: "Feminist readings of the Ramayana explore how Sita embodies or is denied shakti across different versions of the epic."
  },
  {
    term: "Purusha",
    sanskrit: "पुरुष",
    definition: "The cosmic person or primordial being; also refers to the male principle, spirit, or consciousness as distinct from prakriti (nature/matter).",
    context: "The Purusha Sukta hymn's description of the four varnas emerging from the cosmic body is invoked in discussions of the Shambuka episode's caste ideology."
  },
  {
    term: "Varna",
    sanskrit: "वर्ण",
    definition: "The four-fold social classification in Hindu tradition: Brahmins (priests/scholars), Kshatriyas (warriors/rulers), Vaishyas (merchants/farmers), and Shudras (servants/laborers).",
    context: "The Shambuka episode enforces varna boundaries by depicting Rama killing a Shudra for performing austerities deemed reserved for higher varnas."
  },
  {
    term: "Pativrata",
    sanskrit: "पतिव्रता",
    definition: "A woman devoted entirely to her husband; the ideal of wifely devotion and chastity that became a defining virtue in Hindu patriarchal tradition.",
    context: "Sita is held up as the ultimate pativrata, yet the fire ordeal and exile episodes test this ideal to its breaking point, prompting centuries of reinterpretation."
  },
  {
    term: "Agni Pariksha",
    sanskrit: "अग्नि परीक्षा",
    definition: "The fire ordeal or 'test by fire' — the episode in which Sita enters fire to prove her chastity after being rescued from Ravana's captivity.",
    context: "Manuscript evidence shows the fire ordeal passage exists in varying forms across recensions, and scholars debate whether it belongs to the oldest layer of the text."
  },
  {
    term: "Loka-dharma",
    sanskrit: "लोकधर्म",
    definition: "The dharma of public opinion or worldly custom; social norms and expectations that govern behavior beyond strictly scriptural injunctions.",
    context: "In the Uttara Kanda, Rama invokes loka-dharma as the reason for exiling Sita — he must maintain public confidence in his queen's purity regardless of his personal belief."
  },
  {
    term: "Ashvamedha",
    sanskrit: "अश्वमेध",
    definition: "The Vedic horse sacrifice, a royal ritual of the highest order. A consecrated horse is released to roam for a year; any territory it enters unchallenged falls under the king's dominion.",
    context: "In the Uttara Kanda, Rama performs the ashvamedha — the occasion at which Lava and Kusha recite the Ramayana and Sita makes her final appearance."
  },
  {
    term: "Rakshasa",
    sanskrit: "राक्षस",
    definition: "A class of powerful beings often characterized as demons or anti-gods in Hindu mythology. They possess shape-shifting abilities and great martial prowess.",
    context: "Ravana and his clan are Rakshasas, but the Valmiki Ramayana portrays them with considerable complexity — Ravana is also a great scholar and devotee of Shiva."
  },
  {
    term: "Avatar",
    sanskrit: "अवतार",
    definition: "A 'descent' or incarnation of a deity into the mortal world. Rama is regarded as an avatar of Vishnu in Hindu theology.",
    context: "The Bala Kanda and Uttara Kanda frame Rama as a Vishnu avatar, but the core books (Ayodhya through Yuddha) largely treat him as a human hero — a key textual-historical distinction."
  },
  {
    term: "Bhakti",
    sanskrit: "भक्ति",
    definition: "Devotion, love, and personal surrender to a chosen deity. The bhakti movement emphasized a direct emotional relationship with God over ritual and learning.",
    context: "The bhakti movement transformed the Ramayana from a literary epic into a devotional scripture, producing retellings like Tulsidas's Ramcharitmanas that reshaped popular understanding."
  },
  {
    term: "Dharmashastra",
    sanskrit: "धर्मशास्त्र",
    definition: "Texts codifying Hindu religious and social law, including rules of conduct for different varnas, life stages, and ritual obligations. Major examples include the Manusmriti and Yajnavalkya Smriti.",
    context: "The Shambuka episode reflects dharmashastra ideology about restricting tapas to certain varnas, a framework that may postdate the original epic composition."
  },
  {
    term: "Purana",
    sanskrit: "पुराण",
    definition: "A genre of encyclopedic Sanskrit texts covering cosmology, genealogy, mythology, philosophy, and geography. There are eighteen major Puranas and many minor ones.",
    context: "Several Puranas contain Ramayana episodes not found in Valmiki, including the Rama-Shiva penance at Rameswaram, which appears in the Skanda Purana and Shiva Purana."
  },
  {
    term: "Ramlila",
    sanskrit: "रामलीला",
    definition: "A dramatic folk re-enactment of the Ramayana story, performed annually across North India, typically during the Navaratri period culminating in Dussehra.",
    context: "The tradition of Ramlila performances, particularly the famous Ramnagar Ramlila near Varanasi, is a major vehicle through which non-textual Ramayana elements became established in popular consciousness."
  },
  {
    term: "Shloka",
    sanskrit: "श्लोक",
    definition: "A verse or stanza, typically in anushtubh meter. The basic unit of composition in Sanskrit epic and classical literature.",
    context: "The Ramayana is traditionally said to contain 24,000 shlokas in its standard form, though the critical edition's count differs after removing interpolations."
  },
  {
    term: "Colophon",
    sanskrit: null,
    definition: "A statement at the end of a manuscript or text section identifying the scribe, date of copying, patron, or other circumstances of production.",
    context: "Colophons in Ramayana manuscripts provide crucial evidence for dating copies and tracing the transmission history of different recensions."
  },
  {
    term: "Devanagari",
    sanskrit: "देवनागरी",
    definition: "The script used to write Sanskrit, Hindi, Marathi, and several other Indian languages. Literally 'city of the gods.'",
    context: "Many Northern recension Ramayana manuscripts are written in Devanagari, while Southern manuscripts use regional scripts such as Grantha, Telugu, and Malayalam."
  },
  {
    term: "Manuscript",
    sanskrit: null,
    definition: "A handwritten copy of a text, produced before the era of printing. Each manuscript is a unique physical artifact with its own copying history and potential variations.",
    context: "The Baroda Critical Edition examined manuscripts from across India to reconstruct the Ramayana's oldest recoverable text, finding significant regional variation."
  },
  {
    term: "Uttara Kanda",
    sanskrit: "उत्तरकाण्ड",
    definition: "The seventh and final book of the Ramayana, containing Sita's exile, the Shambuka episode, Rama's horse sacrifice, and Sita's final departure into the earth.",
    context: "Scholarly consensus holds that the Uttara Kanda was composed later than the core narrative (Books 2-6), based on linguistic, stylistic, and thematic evidence."
  },
  {
    term: "Baroda Critical Edition",
    sanskrit: null,
    definition: "The critical edition of the Valmiki Ramayana published by the Oriental Institute, Baroda (1960-1975), under the general editorship of G.H. Bhatt and others.",
    context: "This edition remains the standard scholarly reference for the Ramayana text, having established which verses can be traced to the oldest recoverable form of the epic."
  },
  {
    term: "Mahabharata",
    sanskrit: "महाभारत",
    definition: "The other great Sanskrit epic of India, attributed to Vyasa. At roughly 100,000 verses it is the longest epic poem in world literature.",
    context: "The Mahabharata contains its own summary of the Rama story (the Ramopakhyana), which serves as an independent early witness to the narrative and notably lacks several later Ramayana episodes."
  },
  {
    term: "Vedic",
    sanskrit: "वैदिक",
    definition: "Relating to the Vedas, the oldest stratum of Sanskrit literature (c. 1500-500 BCE). Vedic religion centered on fire sacrifice (yajna) and cosmic order (rita).",
    context: "The Ramayana contains both Vedic elements (fire rituals, Brahmanical authority) and post-Vedic innovations (bhakti devotion, avatar theology), reflecting its long compositional history."
  }
];
