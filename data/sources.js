/* ==========================================================================
   sources.js — Source Database
   Ramayana: Beyond What We Were Told
   ========================================================================== */

const SOURCES_DATA = [

  /* ========================================================================
     CRITICAL EDITIONS / PRIMARY TEXTS
     ======================================================================== */

  {
    id: "SRC001",
    author: "Bhatt, G.H. et al.",
    title: "The Valmiki Ramayana: Critical Edition",
    year: "1960-1975",
    publisher: "Oriental Institute, Baroda",
    volumes: "7 volumes",
    type: "CRITICAL EDITION",
    usedIn: ["sita-exile", "ravana-dahan", "lakshmana-rekha", "agni-pariksha", "shambuka"],
    description: "The foundational critical edition based on analysis of hundreds of manuscripts across India, establishing the oldest recoverable text through rigorous stemmatic comparison."
  },
  {
    id: "SRC002",
    author: "Pollock, Sheldon (trans.)",
    title: "The Ramayana of Valmiki: An Epic of Ancient India, Vol. II — Ayodhyakanda",
    year: "1986",
    publisher: "Princeton University Press",
    type: "CRITICAL EDITION",
    usedIn: ["sita-exile", "shambuka"],
    description: "Annotated English translation of the Ayodhyakanda with extensive scholarly introduction on Rama's ideal kingship and the concept of dharma."
  },
  {
    id: "SRC003",
    author: "Pollock, Sheldon (trans.)",
    title: "The Ramayana of Valmiki: An Epic of Ancient India, Vol. III — Aranyakanda",
    year: "1991",
    publisher: "Princeton University Press",
    type: "CRITICAL EDITION",
    usedIn: ["lakshmana-rekha", "agni-pariksha"],
    description: "Translation of the Forest Book with critical apparatus examining the forest exile narrative and Sita's abduction."
  },
  {
    id: "SRC004",
    author: "Goldman, Robert P. (trans.)",
    title: "The Ramayana of Valmiki: An Epic of Ancient India, Vol. I — Balakanda",
    year: "1984",
    publisher: "Princeton University Press",
    type: "CRITICAL EDITION",
    usedIn: ["shambuka"],
    description: "Translation of the Balakanda with a landmark general introduction to the entire epic, its history, and reception."
  },
  {
    id: "SRC005",
    author: "Goldman, Robert P. & Goldman, Sally J. Sutherland (trans.)",
    title: "The Ramayana of Valmiki: An Epic of Ancient India, Vol. VI — Yuddhakanda",
    year: "2009",
    publisher: "Princeton University Press",
    type: "CRITICAL EDITION",
    usedIn: ["agni-pariksha", "ravana-dahan", "sita-exile"],
    description: "Translation of the War Book including the critical fire ordeal passage (agni pariksha) with detailed text-critical notes."
  },
  {
    id: "SRC006",
    author: "Goldman, Sally J. Sutherland & Goldman, Robert P.",
    title: "The Ramayana of Valmiki: An Epic of Ancient India, Vol. VII — Uttarakanda",
    year: "2017",
    publisher: "Princeton University Press",
    type: "CRITICAL EDITION",
    usedIn: ["sita-exile", "shambuka", "agni-pariksha"],
    description: "Translation and analysis of the controversial final book, with extensive discussion of its likely later composition and relationship to the core text."
  },

  /* ========================================================================
     MAJOR ACADEMIC STUDIES
     ======================================================================== */

  {
    id: "SRC007",
    author: "Bulcke, Camille",
    title: "Ramakatha: Utpatti aur Vikas",
    year: "1950",
    publisher: "Hindi Parishad, Prayag",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile", "lakshmana-rekha", "ravana-dahan", "agni-pariksha"],
    description: "Pioneering study of the Rama story's origin and development across Indian literary traditions, tracing how the narrative evolved over centuries."
  },
  {
    id: "SRC008",
    author: "Brockington, John",
    title: "The Sanskrit Epics",
    year: "1998",
    publisher: "Brill, Leiden",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile", "agni-pariksha", "shambuka", "lakshmana-rekha"],
    description: "Comprehensive study of the Ramayana and Mahabharata as literary and cultural texts, with detailed analysis of textual layers and compositional history."
  },
  {
    id: "SRC009",
    author: "Brockington, John",
    title: "Righteous Rama: The Evolution of an Epic",
    year: "1984",
    publisher: "Oxford University Press",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile", "shambuka"],
    description: "Study of how Rama's characterization evolved from human hero to divine avatar across the textual history of the epic."
  },
  {
    id: "SRC010",
    author: "Jacobi, Hermann",
    title: "Das Ramayana: Geschichte und Inhalt",
    year: "1893",
    publisher: "Friedrich Cohen, Bonn",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile"],
    description: "Early European critical study of the Ramayana that first proposed the Uttara Kanda and Bala Kanda as later additions to the original poem."
  },
  {
    id: "SRC011",
    author: "Winternitz, Moriz",
    title: "A History of Indian Literature, Vol. I",
    year: "1927",
    publisher: "University of Calcutta",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile", "agni-pariksha"],
    description: "Landmark survey of Indian literature that includes detailed analysis of the Ramayana's compositional layers and the Uttara Kanda question."
  },

  /* ========================================================================
     SITA'S EXILE CHAPTER SOURCES
     ======================================================================== */

  {
    id: "SRC012",
    author: "Bhattacharya, Pradip",
    title: "Study of the Uttara Kanda",
    year: "2004",
    publisher: "Journal of the Asiatic Society",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile"],
    description: "Analysis of the Uttara Kanda's narrative inconsistencies and evidence for its status as a later supplement to the Valmiki Ramayana."
  },
  {
    id: "SRC013",
    author: "Shah, U.P.",
    title: "Critical Edition Methodology and the Ramayana",
    year: "1975",
    publisher: "Oriental Institute, Baroda",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile", "agni-pariksha"],
    description: "Methodological account of the principles used in constructing the Baroda Critical Edition, including manuscript selection criteria."
  },
  {
    id: "SRC014",
    author: "Sohnen-Thieme, Renate",
    title: "On the Composition and Authorship of the Uttarakanda",
    year: "1999",
    publisher: "In: Brockington & Schreiner (eds.), Composing a Tradition",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile"],
    description: "Linguistic and thematic analysis demonstrating the Uttara Kanda's distinct vocabulary, style, and ideological orientation from the core Ramayana."
  },
  {
    id: "SRC015",
    author: "Venkatacharya, T.",
    title: "On the Date of the Uttara Kanda of the Ramayana",
    year: "1956",
    publisher: "Journal of Oriental Research, Madras",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile"],
    description: "Attempts to date the composition of the Uttara Kanda through internal evidence, cross-references, and linguistic markers."
  },
  {
    id: "SRC016",
    author: "Chakravarti, Uma",
    title: "The Pativrata Concept in Early Indian Society",
    year: "1983",
    publisher: "Economic and Political Weekly",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile", "agni-pariksha"],
    description: "Feminist analysis of the pativrata (devoted wife) ideology and its manifestation in the treatment of Sita in the Ramayana tradition."
  },

  /* ========================================================================
     DUSSEHRA / RAVANA DAHAN CHAPTER SOURCES
     ======================================================================== */

  {
    id: "SRC017",
    author: "Lutgendorf, Philip",
    title: "The Life of a Text: Performing the Ramcharitmanas of Tulsidas",
    year: "1991",
    publisher: "University of California Press",
    type: "ACADEMIC STUDY",
    usedIn: ["ravana-dahan", "lakshmana-rekha"],
    description: "Study of how Tulsidas's Ramcharitmanas became the living performance text of North India, shaping popular Rama worship and Ramlila traditions."
  },
  {
    id: "SRC018",
    author: "Richman, Paula (ed.)",
    title: "Many Ramayanas: The Diversity of a Narrative Tradition in South Asia",
    year: "1991",
    publisher: "University of California Press",
    type: "ACADEMIC STUDY",
    usedIn: ["ravana-dahan", "lakshmana-rekha", "agni-pariksha", "sita-exile"],
    description: "Foundational collection of essays demonstrating the plurality of Ramayana traditions across South and Southeast Asia."
  },
  {
    id: "SRC019",
    author: "Schechner, Richard",
    title: "Between Theater and Anthropology",
    year: "1985",
    publisher: "University of Pennsylvania Press",
    type: "PERFORMANCE TRADITION",
    usedIn: ["ravana-dahan"],
    description: "Includes analysis of the Ramlila of Ramnagar as a case study in performance theory, documenting how the epic is enacted as a month-long civic ritual."
  },
  {
    id: "SRC020",
    author: "Kane, P.V.",
    title: "History of Dharmashastra",
    year: "1958",
    publisher: "Bhandarkar Oriental Research Institute, Poona",
    volumes: "5 volumes",
    type: "HISTORICAL SOURCE",
    usedIn: ["ravana-dahan", "shambuka"],
    description: "Encyclopedic reference on Hindu religious law and custom, including discussions of festival origins and dharmic obligations of kings."
  },
  {
    id: "SRC021",
    author: "Kapur, Anuradha",
    title: "Actors, Pilgrims, Kings and Gods: The Ramlila of Ramnagar",
    year: "1990",
    publisher: "Seagull Books",
    type: "PERFORMANCE TRADITION",
    usedIn: ["ravana-dahan"],
    description: "Ethnographic study of the Ramnagar Ramlila, the most elaborate annual performance of the Ramayana, sponsored by the Maharaja of Benares."
  },
  {
    id: "SRC022",
    author: "Fuller, C.J.",
    title: "The Camphor Flame: Popular Hinduism and Society in India",
    year: "2004",
    publisher: "Princeton University Press",
    type: "ACADEMIC STUDY",
    usedIn: ["ravana-dahan"],
    description: "Study of lived Hindu practice including festival traditions, examining how textual narratives translate into popular religious observance."
  },
  {
    id: "SRC023",
    author: "Hein, Norvin",
    title: "The Miracle Plays of Mathura",
    year: "1972",
    publisher: "Yale University Press",
    type: "PERFORMANCE TRADITION",
    usedIn: ["ravana-dahan"],
    description: "Study of devotional dramatic performances in North India, providing context for understanding Ramlila within the broader tradition of religious theater."
  },

  {
    id: "SRC024",
    author: "Anonymous",
    title: "Adhyatma Ramayana",
    year: "c. 14th-15th century",
    publisher: "Various editions",
    type: "DEVOTIONAL TEXT",
    usedIn: ["lakshmana-rekha"],
    description: "Vedantic retelling of the Ramayana embedded within the Brahmanda Purana, presenting Rama as a fully divine figure aware of his own divinity."
  },

  /* ========================================================================
     LAKSHMANA REKHA CHAPTER SOURCES
     ======================================================================== */

  {
    id: "SRC028",
    author: "Krittivasa Ojha",
    title: "Krittivasi Ramayana (Bengali Ramayana)",
    year: "c. 15th century",
    publisher: "Various editions",
    type: "REGIONAL RAMAYANA",
    usedIn: ["lakshmana-rekha"],
    description: "The dominant Bengali Ramayana retelling, containing one of the earliest full narratives of the Lakshmana Rekha protective boundary."
  },
  {
    id: "SRC029",
    author: "Balarama Dasa",
    title: "Dandi Ramayana (Jagamohan Ramayana)",
    year: "c. 16th century",
    publisher: "Various editions",
    type: "REGIONAL RAMAYANA",
    usedIn: ["lakshmana-rekha"],
    description: "Odia retelling of the Ramayana that includes the Lakshmana Rekha episode, reflecting regional elaborations of the narrative."
  },
  {
    id: "SRC030",
    author: "Tulsidas",
    title: "Ramcharitmanas",
    year: "1574",
    publisher: "Various editions",
    type: "DEVOTIONAL TEXT",
    usedIn: ["lakshmana-rekha", "ravana-dahan", "agni-pariksha"],
    description: "The most influential Hindi retelling of the Ramayana, a devotional masterpiece that transformed popular understanding of the Rama narrative in North India."
  },
  {
    id: "SRC031",
    author: "Kamban",
    title: "Iramavataram (Kamba Ramayanam)",
    year: "c. 12th century",
    publisher: "Various editions",
    type: "REGIONAL RAMAYANA",
    usedIn: ["lakshmana-rekha", "agni-pariksha"],
    description: "The great Tamil Ramayana, notable for its independent literary vision and significant narrative departures from Valmiki's version."
  },
  {
    id: "SRC032",
    author: "Dev Sen, Nabaneeta",
    title: "Rewriting the Ramayana: Chandrabati and the Politics of Gender",
    year: "2001",
    publisher: "In: Richman (ed.), Questioning Ramayanas",
    type: "ACADEMIC STUDY",
    usedIn: ["lakshmana-rekha", "agni-pariksha"],
    description: "Feminist reading of women's Ramayana traditions, examining how female authors and performers reframe the narrative from Sita's perspective."
  },
  {
    id: "SRC033",
    author: "Dev Sen, Nabaneeta",
    title: "When Women Retell the Ramayana",
    year: "1998",
    publisher: "Manushi, No. 108",
    type: "ACADEMIC STUDY",
    usedIn: ["lakshmana-rekha"],
    description: "Analysis of women's Ramayana traditions in Bengali and other regional literatures, showing alternative perspectives on Sita's agency."
  },
  {
    id: "SRC034",
    author: "Vimalasuri",
    title: "Paumacariya (Padmacharita)",
    year: "c. 4th century CE",
    publisher: "Various editions",
    type: "PRIMARY TEXT",
    usedIn: ["lakshmana-rekha", "agni-pariksha", "shambuka"],
    description: "The earliest surviving Jain Ramayana, which rationalizes the narrative by removing supernatural elements and recasting Ravana as a Jain figure."
  },

  /* ========================================================================
     AGNI PARIKSHA CHAPTER SOURCES
     ======================================================================== */

  {
    id: "SRC035",
    author: "Goldman, Robert P. & Goldman, Sally J. Sutherland",
    title: "Yuddhakanda Translation and Analysis",
    year: "2017",
    publisher: "Princeton University Press",
    type: "CRITICAL EDITION",
    usedIn: ["agni-pariksha"],
    description: "Detailed text-critical analysis of the fire ordeal episode in the Yuddhakanda, examining manuscript variants and interpolation evidence."
  },
  {
    id: "SRC036",
    author: "Hess, Linda",
    title: "Rejecting Sita: Indian Responses to the Ideal Man's Cruel Treatment of His Ideal Wife",
    year: "1999",
    publisher: "Journal of the American Academy of Religion",
    type: "ACADEMIC STUDY",
    usedIn: ["agni-pariksha", "sita-exile"],
    description: "Examination of how Indian audiences and authors have grappled with Rama's treatment of Sita, documenting dissent across centuries."
  },
  {
    id: "SRC037",
    author: "Volga (Popuri Lalitha Kumari)",
    title: "The Liberation of Sita (Veyipadagalu)",
    year: "2016",
    publisher: "Harper Perennial India",
    type: "MODERN INTERPRETATION",
    usedIn: ["agni-pariksha"],
    description: "Telugu feminist retelling presenting Sita's fire ordeal and exile as a journey toward self-liberation, reimagining the epic from women's perspectives."
  },
  {
    id: "SRC038",
    author: "Divakaruni, Chitra Banerjee",
    title: "The Forest of Enchantments",
    year: "2019",
    publisher: "HarperCollins India",
    type: "MODERN INTERPRETATION",
    usedIn: ["agni-pariksha", "sita-exile"],
    description: "Novel retelling the Ramayana from Sita's perspective, engaging critically with the fire ordeal and exile traditions."
  },

  /* ========================================================================
     SHAMBUKA CHAPTER SOURCES
     ======================================================================== */

  {
    id: "SRC039",
    author: "Ambedkar, B.R.",
    title: "Riddles in Hinduism",
    year: "1987 (posthumous)",
    publisher: "Government of Maharashtra",
    type: "MODERN INTERPRETATION",
    usedIn: ["shambuka"],
    description: "Critical examination of Hindu texts including the Ramayana, highlighting caste-based violence in the Shambuka episode as evidence of Brahmanical ideology."
  },
  {
    id: "SRC040",
    author: "Ilaiah, Kancha",
    title: "Why I Am Not a Hindu: A Sudra Critique of Hindutva Philosophy",
    year: "1996",
    publisher: "Samya Books, Calcutta",
    type: "MODERN INTERPRETATION",
    usedIn: ["shambuka"],
    description: "Dalit intellectual critique of caste ideology in Hindu texts, including analysis of the Shambuka episode as a tool of social control."
  },
  {
    id: "SRC041",
    author: "Thapar, Romila",
    title: "Cultural Pasts: Essays in Early Indian History",
    year: "2004",
    publisher: "Oxford University Press, New Delhi",
    type: "ACADEMIC STUDY",
    usedIn: ["shambuka", "sita-exile"],
    description: "Collection including essays on the historical context of the Ramayana, social stratification, and the relationship between text and society."
  },
  {
    id: "SRC042",
    author: "Thapar, Romila",
    title: "The Ramayana: Theme and Variation",
    year: "1989",
    publisher: "In: S.J. Bate (ed.), India and the West",
    type: "ACADEMIC STUDY",
    usedIn: ["shambuka", "ravana-dahan"],
    description: "Analysis of how the Ramayana narrative has been adapted and reinterpreted across different historical periods and social contexts."
  },
  {
    id: "SRC043",
    author: "Olivelle, Patrick (trans.)",
    title: "Dharmasutras: The Law Codes of Apastamba, Gautama, Baudhayana, and Vasistha",
    year: "1999",
    publisher: "Oxford University Press",
    type: "PRIMARY TEXT",
    usedIn: ["shambuka"],
    description: "Translation of early dharma texts providing the legal-ritual context for understanding varna restrictions on tapas as depicted in the Shambuka episode."
  },
  {
    id: "SRC044",
    author: "Yengde, Suraj",
    title: "Caste Matters",
    year: "2019",
    publisher: "Penguin Viking India",
    type: "MODERN INTERPRETATION",
    usedIn: ["shambuka"],
    description: "Contemporary analysis of caste in Indian society, referencing the Shambuka episode as an enduring symbol of caste-based exclusion from spiritual practice."
  },

  /* ========================================================================
     ADDITIONAL ACADEMIC STUDIES
     ======================================================================== */

  {
    id: "SRC045",
    author: "Richman, Paula (ed.)",
    title: "Questioning Ramayanas: A South Asian Tradition",
    year: "2001",
    publisher: "University of California Press",
    type: "ACADEMIC STUDY",
    usedIn: ["agni-pariksha", "lakshmana-rekha", "sita-exile"],
    description: "Follow-up collection examining counter-narratives, protests, and feminist retellings within the Ramayana tradition."
  },
  {
    id: "SRC046",
    author: "Doniger, Wendy",
    title: "The Hindus: An Alternative History",
    year: "2009",
    publisher: "Penguin Press",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile", "shambuka", "agni-pariksha"],
    description: "Broad historical survey including discussion of how the Ramayana reflects and shapes evolving Hindu social norms and gender relations."
  },
  {
    id: "SRC047",
    author: "Hiltebeitel, Alf",
    title: "Rethinking the Mahabharata: A Reader's Guide to the Education of the Dharma King",
    year: "2001",
    publisher: "University of Chicago Press",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile", "shambuka"],
    description: "Comparative study relevant for understanding how both epics treat dharmic dilemmas, kingship, and textual layering."
  },
  {
    id: "SRC048",
    author: "Leslie, Julia (ed.)",
    title: "Authority and Meaning in Indian Religions: Hinduism and the Case of Valmiki",
    year: "2003",
    publisher: "Ashgate Publishing",
    type: "ACADEMIC STUDY",
    usedIn: ["shambuka", "sita-exile"],
    description: "Essays on the contested figure of Valmiki, exploring how caste politics intersect with claims of authorship and textual authority."
  },
  {
    id: "SRC049",
    author: "Sankalia, H.D.",
    title: "Ramayana: Myth or Reality?",
    year: "1973",
    publisher: "People's Publishing House, New Delhi",
    type: "ACADEMIC STUDY",
    usedIn: ["ravana-dahan"],
    description: "Archaeological and historical analysis examining whether the Ramayana narrative reflects historical events or purely mythological constructs."
  },
  {
    id: "SRC050",
    author: "Vyas, S.N.",
    title: "India in the Ramayana Age",
    year: "1967",
    publisher: "Atmanand Jain Sabha, Delhi",
    type: "HISTORICAL SOURCE",
    usedIn: ["shambuka", "sita-exile"],
    description: "Reconstruction of social and cultural conditions of the period depicted in the Ramayana, including caste structures and gender norms."
  },
  {
    id: "SRC051",
    author: "Smith, H. Daniel",
    title: "Reading the Ramayana: A Bibliographic Guide for Students and College Teachers",
    year: "1983",
    publisher: "Asian Studies Program, Syracuse University",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile", "agni-pariksha"],
    description: "Bibliographic guide cataloging the major scholarly works on the Ramayana tradition, useful for mapping the field of Ramayana studies."
  },
  {
    id: "SRC052",
    author: "Narayana Rao, Velcheru",
    title: "A Ramayana of Their Own: Women's Oral Tradition in Telugu",
    year: "1991",
    publisher: "In: Richman (ed.), Many Ramayanas",
    type: "ACADEMIC STUDY",
    usedIn: ["agni-pariksha", "sita-exile"],
    description: "Study of Telugu women's folk Ramayana traditions that offer dramatically different perspectives on Sita's fire ordeal and exile."
  },
  {
    id: "SRC053",
    author: "Ramanujan, A.K.",
    title: "Three Hundred Ramayanas: Five Examples and Three Thoughts on Translation",
    year: "1991",
    publisher: "In: Richman (ed.), Many Ramayanas",
    type: "ACADEMIC STUDY",
    usedIn: ["lakshmana-rekha", "agni-pariksha", "ravana-dahan", "sita-exile"],
    description: "Influential essay demonstrating the vast multiplicity of Ramayana traditions and arguing against any single 'original' version."
  },

  /* ========================================================================
     REGIONAL RAMAYANAS AND PRIMARY TEXTS
     ======================================================================== */

  {
    id: "SRC054",
    author: "Eknath",
    title: "Bhavartha Ramayana (Marathi)",
    year: "c. 16th century",
    publisher: "Various editions",
    type: "REGIONAL RAMAYANA",
    usedIn: ["ravana-dahan"],
    description: "Marathi retelling emphasizing bhakti devotion, with distinctive regional variations in the treatment of key episodes."
  },
  {
    id: "SRC055",
    author: "Anonymous",
    title: "Ranganatha Ramayana (Telugu)",
    year: "c. 14th century",
    publisher: "Various editions",
    type: "REGIONAL RAMAYANA",
    usedIn: ["agni-pariksha", "lakshmana-rekha"],
    description: "Early Telugu rendering of the Ramayana with regional narrative innovations and adaptations."
  },
  {
    id: "SRC056",
    author: "Madhava Kandali",
    title: "Saptakanda Ramayana (Assamese)",
    year: "c. 14th century",
    publisher: "Various editions",
    type: "REGIONAL RAMAYANA",
    usedIn: ["agni-pariksha"],
    description: "The earliest Assamese literary work, a Ramayana retelling predating most other regional vernacular versions."
  },
  {
    id: "SRC057",
    author: "Anonymous",
    title: "Mahabharata (Ramopakhyana)",
    year: "c. 4th century BCE - 4th century CE",
    publisher: "Critical Edition: BORI, Pune",
    type: "PRIMARY TEXT",
    usedIn: ["sita-exile", "agni-pariksha"],
    description: "The Rama episode within the Mahabharata, significant as an early independent witness to the Rama narrative predating many Ramayana additions."
  },
  {
    id: "SRC058",
    author: "Anonymous",
    title: "Dasharatha Jataka (Jataka No. 461)",
    year: "c. 3rd century BCE",
    publisher: "Pali Text Society editions",
    type: "PRIMARY TEXT",
    usedIn: ["sita-exile", "agni-pariksha"],
    description: "Buddhist version of the Rama story with no divine elements, no abduction of Sita, and no war — one of the earliest independent Rama narratives."
  },

  /* ========================================================================
     PURANIC AND DEVOTIONAL SOURCES
     ======================================================================== */

  {
    id: "SRC059",
    author: "Anonymous",
    title: "Vishnu Purana",
    year: "c. 4th-5th century CE",
    publisher: "Various editions",
    type: "PURANIC SOURCE",
    usedIn: ["ravana-dahan"],
    description: "Major Vaishnava Purana containing references to Rama as avatar of Vishnu, contributing to the theological framework within which the epic is interpreted."
  },
  {
    id: "SRC061",
    author: "Anonymous",
    title: "Padma Purana",
    year: "c. 4th-15th century CE",
    publisher: "Various editions",
    type: "PURANIC SOURCE",
    usedIn: ["sita-exile"],
    description: "Contains Ramayana-related episodes including alternate versions of key events, reflecting ongoing Puranic engagement with the epic narrative."
  },

  /* ========================================================================
     ADDITIONAL SCHOLARLY WORKS
     ======================================================================== */

  {
    id: "SRC063",
    author: "Pollock, Sheldon",
    title: "The Ramayana Text and the Critical Edition",
    year: "1984",
    publisher: "In: Goldman (ed.), Balakanda introduction",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile", "agni-pariksha"],
    description: "Theoretical discussion of how a critical edition functions for an oral-derived epic, and what 'original text' means in the Indian context."
  },
  {
    id: "SRC064",
    author: "Pollock, Sheldon",
    title: "Atmanam manusam manye: Dharmakirtya's Definition of Rama",
    year: "1991",
    publisher: "Journal of the Royal Asiatic Society",
    type: "ACADEMIC STUDY",
    usedIn: ["agni-pariksha"],
    description: "Analysis of Rama's self-understanding as human vs. divine, crucial for interpreting the theological implications of episodes like the fire ordeal."
  },
  {
    id: "SRC065",
    author: "Fitzgerald, James L.",
    title: "India's Fifth Veda: The Mahabharata's Presentation of Itself",
    year: "2003",
    publisher: "Journal of South Asian Literature",
    type: "ACADEMIC STUDY",
    usedIn: ["shambuka"],
    description: "Study of how Indian epics present their own authority, relevant for understanding the Uttara Kanda's self-legitimating strategies."
  },
  {
    id: "SRC066",
    author: "Sutherland, Sally J.",
    title: "Sita and Draupadi: Aggressive Behavior and Female Role Models in the Sanskrit Epics",
    year: "1989",
    publisher: "Journal of the American Oriental Society",
    type: "ACADEMIC STUDY",
    usedIn: ["agni-pariksha", "sita-exile"],
    description: "Comparative study of female protagonists in the two epics, examining agency and resistance within patriarchal narrative frameworks."
  },
  {
    id: "SRC067",
    author: "Dharwadker, Vinay",
    title: "Censoring the Ramayana",
    year: "2011",
    publisher: "PMLA",
    type: "ACADEMIC STUDY",
    usedIn: ["ravana-dahan", "shambuka"],
    description: "Analysis of the controversy over Ramanujan's 'Three Hundred Ramayanas' essay and its implications for academic freedom and religious politics."
  },
  {
    id: "SRC068",
    author: "Inden, Ronald",
    title: "Imagining India",
    year: "1990",
    publisher: "Basil Blackwell",
    type: "ACADEMIC STUDY",
    usedIn: ["shambuka"],
    description: "Critique of Western representations of India, providing methodological context for how epics like the Ramayana have been studied and interpreted."
  },
  {
    id: "SRC069",
    author: "Manu",
    title: "Manusmriti (Laws of Manu)",
    year: "c. 2nd century BCE - 3rd century CE",
    publisher: "Various editions; Olivelle trans. (2005), Oxford",
    type: "PRIMARY TEXT",
    usedIn: ["shambuka", "sita-exile"],
    description: "Influential dharmashastra text codifying varna obligations, directly relevant to understanding the legal-religious context of the Shambuka episode."
  },
  {
    id: "SRC070",
    author: "Menon, Nivedita & Nigam, Aditya",
    title: "Power and Contestation: India Since 1989",
    year: "2007",
    publisher: "Zed Books",
    type: "MODERN INTERPRETATION",
    usedIn: ["ravana-dahan"],
    description: "Discusses the political mobilization of the Ramayana in modern Indian politics, including the Ayodhya movement and its communal dimensions."
  },

  /* ========================================================================
     PERFORMANCE AND CULTURAL STUDIES
     ======================================================================== */

  {
    id: "SRC071",
    author: "Sax, William S.",
    title: "The Gods at Play: Lila in South Asia",
    year: "1995",
    publisher: "Oxford University Press",
    type: "PERFORMANCE TRADITION",
    usedIn: ["ravana-dahan"],
    description: "Study of the concept of divine play (lila) in South Asian religions, contextualizing Ramlila and other ritual performances."
  },
  {
    id: "SRC072",
    author: "Blackburn, Stuart & Ramanujan, A.K. (eds.)",
    title: "Another Harmony: New Essays on the Folklore of India",
    year: "1986",
    publisher: "University of California Press",
    type: "ACADEMIC STUDY",
    usedIn: ["lakshmana-rekha", "ravana-dahan"],
    description: "Collection including essays on folk Ramayana traditions and oral variants that diverge from the Sanskrit literary versions."
  },
  {
    id: "SRC073",
    author: "Rao, Ajay K.",
    title: "Re-figuring the Ramayana as Theology: A History of Reception in Premodern India",
    year: "2015",
    publisher: "Routledge",
    type: "ACADEMIC STUDY",
    usedIn: ["agni-pariksha"],
    description: "Study of how the Ramayana was read as theology across different philosophical traditions, including Vaishnava and Shaiva interpretations."
  },
  {
    id: "SRC074",
    author: "Iyengar, K.R. Srinivasa",
    title: "Sri Aurobindo and the Ramayana",
    year: "1983",
    publisher: "Sri Aurobindo Ashram Trust",
    type: "MODERN INTERPRETATION",
    usedIn: ["agni-pariksha"],
    description: "Philosophical interpretation of the Ramayana through Aurobindo's integral yoga framework, offering a spiritual reading of key episodes."
  },
  {
    id: "SRC075",
    author: "Bose, Mandakranta",
    title: "Women in the Hindu Tradition: Rules, Roles and Exceptions",
    year: "2000",
    publisher: "Routledge",
    type: "ACADEMIC STUDY",
    usedIn: ["sita-exile", "agni-pariksha"],
    description: "Study of women's roles in Hindu tradition with analysis of how epic narratives like the Ramayana both established and were used to enforce gender norms."
  }
];
