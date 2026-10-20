/* ==========================================================================
   chatbot.js — Sacred Om Floating Chatbot with Top-5 Myths, Strict Spiritual
   Domain Guardrail, and Session Context History for Follow-Up Queries
   ========================================================================== */

(function () {
  'use strict';

  const API_URL = 'https://ramayana-chatbot-api-679998727179.us-central1.run.app';
  const MAX_LEN = 500;
  const SESSION_STORAGE_KEY = 'ramayana_chatbot_session_v2';

  // ---- Top 5 Common Myths Revealed by This Website ----
  const TOP_5_MYTH_QUESTIONS = [
    {
      id: 'sita_exile',
      label: 'Did Lord Rama really exile pregnant Mata Sita because of a washerman?',
      query: 'Did Lord Rama really abandon or exile pregnant Mata Sita because of a washerman (dhobi)? What is the original Valmiki Ramayana truth?'
    },
    {
      id: 'colonial_conspiracy',
      label: 'How did British rulers conspire to corrupt the Vedas, Gita & Ramayana?',
      query: 'How did early British colonial rulers like Macaulay, Max Muller, and Griffith conspire to mistranslate and corrupt Indian scriptures like the Vedas, Gita, and Ramayana?'
    },
    {
      id: 'agni_pariksha',
      label: 'Did Lord Rama doubt Mata Sita\'s purity during the Agni Pariksha?',
      query: 'Did Lord Rama force Mata Sita into the Agni Pariksha out of suspicion, or what actually happened in Maharishi Valmiki\'s original Ramayana?'
    },
    {
      id: 'shambuka',
      label: 'Did Lord Rama really kill Shambuka, or was that story added later?',
      query: 'Did Lord Rama really kill Shambuka for doing penance, or is the Shambuka story a later interpolation outside Valmiki\'s original 6-book Ramayana?'
    },
    {
      id: 'lakshmana_rekha_earth',
      label: 'Is \'Lakshmana Rekha\' in Valmiki\'s Ramayana, and did Sita sink into Earth?',
      query: 'Is there any Lakshmana Rekha in Valmiki\'s Ramayana, and did Mata Sita really sink into Mother Earth at the end of the original Ramayana?'
    }
  ];

  // ---- Templatized Polite Spiritual Guardrail Response ----
  const GUARDRAIL_TEMPLATE_EN =
    '🙏 Namaste! Forgive me — I am a dedicated Spiritual & Scripture Guide for the Rāmāyaṇa Truth Mission.\n\n' +
    'I only entertain questions related to Lord Rama, Mata Sita, Maharishi Valmiki\'s Ramayana, Sanatan Dharma, Indian Sacred Scriptures (Vedas, Upanishads, Bhagavad Gita, Mahabharata), and the historical truth about how colonial mistranslations distorted our sacred texts.\n\n' +
    'I kindly avoid answering questions outside the Ramayana or spiritual domain. Please ask a spiritual or scripture-related question, or click one of the Top 5 Myth-Busting Questions below! 🕉️';

  // ---- Domain Guardrail Vocabulary ----
  const SPIRITUAL_DOMAIN_KEYWORDS = [
    // Ramayana Core Figures & Places
    'ram', 'rama', 'shri ram', 'shriram', 'lord rama', 'sita', 'mata sita', 'janaki', 'maithili', 'vaidehi',
    'lakshman', 'lakshmana', 'hanuman', 'bajrangbali', 'anjaney', 'ravan', 'ravana', 'dashanan', 'lankesh',
    'valmiki', 'maharishi', 'bharata', 'shatrughna', 'dasharatha', 'dashrath', 'kaikeyi', 'kausalya', 'sumitra',
    'urmila', 'mandodari', 'vibhishana', 'vibhishan', 'kumbhakarna', 'indrajit', 'meghnad', 'surpanakha',
    'maricha', 'subahu', 'tadaka', 'sugriva', 'sugriv', 'vali', 'bali', 'angada', 'jambavan', 'nala', 'nila',
    'jatayu', 'sampati', 'shabari', 'sabari', 'guha', 'nishada', 'ahalya', 'gautama', 'vishwamitra', 'vasistha',
    'vasishtha', 'agastya', 'atreyi', 'anasuya', 'lav', 'lava', 'kush', 'kusha', 'shambuka', 'shambuk',
    'bhoodevi', 'bhudevi', 'mother earth', 'agni', 'agni deva', 'ayodhya', 'mithila', 'janakpur', 'panchavati',
    'dandaka', 'chitrakoot', 'kishkindha', 'lanka', 'ashoka vatika', 'rameshwaram', 'ram setu', 'sarayu',
    // Ramayana Books, Episodes & Concepts
    'ramayan', 'ramayana', 'kanda', 'bala kanda', 'ayodhya kanda', 'aranya kanda', 'kishkindha kanda',
    'sundara kanda', 'yuddha kanda', 'lanka kanda', 'uttara kanda', 'uttarakanda', 'uttar kand',
    'sarga', 'shloka', 'sloka', 'verse', 'phalashruti', 'pariksha', 'agni pariksha', 'fire ordeal', 'fire test',
    'lakshmana rekha', 'lakshman rekha', 'magic line', 'boundary line', 'exile', 'banish', 'banishment',
    'washerman', 'dhobi', 'pregnant', 'ravana dahan', 'effigy', 'dussehra', 'vijayadashami', 'diwali', 'deepavali',
    'brahmahatya', 'atatayi', 'maranantani', 'atithi', 'hospitality', 'golden deer', 'maya sita',
    'coronation', 'pattabhisheka', 'ram rajya', 'ramarajya', 'ashwamedha',
    // Indian Scriptures & Sanatan Dharma
    'veda', 'vedas', 'rigveda', 'rig veda', 'samaveda', 'yajurveda', 'atharvaveda', 'vedic', 'shruti', 'smriti',
    'upanishad', 'upanishads', 'vedanta', 'bhagavad gita', 'gita', 'geeta', 'mahabharata', 'mahabharat',
    'purana', 'puranas', 'itihasa', 'shastra', 'shastras', 'manusmriti', 'ramcharitmanas', 'tulsidas', 'goswami',
    'kamban', 'kampan', 'iravataram', 'krittivasa', 'adhyatma', 'ananda ramayana', 'bhasa', 'pratima nataka',
    'kalidasa', 'raghuvamsha', 'bhavabhuti', 'uttara rama charita',
    'sanatan', 'sanatana', 'hindu', 'hinduism', 'dharma', 'dharmic', 'adharma', 'karma', 'guna', 'varna', 'caste',
    'shudra', 'brahmin', 'kshatriya', 'vaishya', 'untouchable', 'tribal',
    'moksha', 'mukti', 'bhakti', 'jnana', 'gyan', 'yoga', 'meditation', 'dhyana', 'tapas', 'tapasya', 'penance',
    'ascetic', 'rishi', 'muni', 'sadhu', 'saint', 'guru', 'acharya', 'avatar', 'incarnation', 'vishnu', 'narayana',
    'krishna', 'shiva', 'mahadev', 'brahma', 'devi', 'shakti', 'adi shakti', 'lakshmi', 'parvati', 'durga',
    'saraswati', 'indra', 'surya', 'suryavanshi', 'raghu', 'raghukul', 'ikshvaku',
    'god', 'goddess', 'deva', 'devata', 'bhagwan', 'ishwar', 'paramatma', 'brahman', 'atman', 'soul', 'spirit',
    'spiritual', 'spirituality', 'divine', 'sacred', 'holy', 'scripture', 'scriptures', 'mantra', 'om', 'aum',
    'puja', 'worship', 'prayer', 'pranam', 'namaste', 'ashram', 'temple', 'mandir', 'sanskrit', 'devanagari',
    // Colonial Conspiracy & Manuscript Scholarship
    'british', 'colonial', 'colonizer', 'empire', 'east india company', 'macaulay', 'thomas macaulay',
    'max muller', 'muller', 'mueller', 'ralph griffith', 'griffith', 'risley', 'herbert risley', 'monier williams',
    'william jones', 'missionary', 'missionaries', 'oxford', 'boden', 'sacred books of the east',
    'conspiracy', 'corrupt', 'corruption', 'distort', 'distortion', 'mistranslate', 'mistranslation',
    'fabrication', 'interpolated', 'interpolation', 'addition', 'fake', 'false', 'myth', 'myths', 'propaganda',
    'divide and rule', 'manuscript', 'manuscripts', 'palm leaf', 'birch bark', 'sharada', 'nevari', 'maithili',
    'grantha', 'malayalam', 'baroda', 'critical edition', 'oriental institute', 'bhatt', 'vaidya', 'goldman',
    'manmatha nath dutt', 'vivekananda', 'aurobindo', 'agenda', 'mission', 'website', 'quiz',
    // Hindi / Devanagari keywords
    'राम', 'सीता', 'रामायण', 'वाल्मीकि', 'लक्ष्मण', 'हनुमान', 'रावण', 'अग्नि', 'परीक्षा', 'रेखा', 'शम्बूक', 'शंबूक',
    'धोबी', 'उत्तरकाण्ड', 'उत्तर कांड', 'वेद', 'गीता', 'उपनिषद', 'महाभारत', 'धर्म', 'सनातन', 'भगवान', 'अंग्रेज', 'षड्यंत्र'
  ];

  // Explicit non-spiritual / off-topic keywords that must be blocked immediately
  const EXPLICIT_OFF_TOPIC_KEYWORDS = [
    'python', 'javascript', 'typescript', 'java ', 'c++', 'golang', 'rust ', 'html', 'css', 'sql', 'react',
    'angular', 'vue', 'nodejs', 'docker', 'kubernetes', 'aws', 'azure', 'leetcode', 'algorithm', 'compile',
    'debug', 'regex', 'json', 'api key', 'write code', 'generate code', 'program ', 'programming', 'software',
    'bitcoin', 'ethereum', 'crypto', 'dogecoin', 'blockchain', 'nft', 'stock market', 'nasdaq', 'sensex',
    'nifty', 'forex', 'mutual fund', 'interest rate', 'mortgage', 'tax return',
    'recipe', 'how to cook', 'bake a', 'ingredients for', 'calories in', 'pizza', 'burger', 'pasta', 'biryani',
    'cricket score', 'ipl ', 'world cup', 'football match', 'premier league', 'fifa', 'nba ', 'tennis', 'olympics',
    'weather today', 'temperature in', 'forecast', 'flight ticket', 'hotel booking',
    'movie review', 'box office', 'netflix', 'amazon prime', 'hollywood', 'bollywood gossip',
    'girlfriend', 'boyfriend', 'tinder', 'dating app', 'breakup',
    'solve this equation', 'calculus', 'derivative of', 'integral of', 'matrix multiplication', 'quadratic',
    'capital of france', 'capital of usa', 'who is elon musk', 'who is donald trump', 'who is joe biden',
    'iphone', 'samsung galaxy', 'playstation', 'xbox', 'gpu', 'laptop price'
  ];

  // Patterns that indicate the user is asking a follow-up question about the active session context
  const FOLLOW_UP_PATTERNS = [
    /^(why|how|when|where|who|which|what about|and |so |but |then )/i,
    /\b(tell me more|explain more|more detail|elaborate|simpler|simple words|layman|easy language)\b/i,
    /\b(proof|evidence|verse|shloka|sarga|chapter|book|manuscript|source|reference|quote)\b/i,
    /\b(this|that|these|those|it|he|she|they|them|him|her|his|their)\b/i,
    /\b(in hindi|hindi mein|translate|summary|summarize|short|briefly|example)\b/i,
    /\b(really|true|false|authentic|original|later added|why did they|how did they)\b/i
  ];

  const GREETING_PATTERN = /^(namaste|namaskar|pranam|pranaam|jai shri ram|jai siya ram|jai sri ram|sita ram|radhe radhe|har har mahadev|om|ॐ|hello|hi|hey|good morning|good evening)[\s!.,?]*$/i;

  // ---- Rich Context Primer & Local Fallback Knowledge ----
  const CONTEXT_PRIMER_PROMPT =
    'SYSTEM INSTRUCTION FOR THIS SESSION: You are the Sacred Scripture & Ramayana Guide for the website "Ramayana: Exposing Colonial Distortions & Rediscovering the Original Truth".\n' +
    '1. STRICT DOMAIN GUARDRAIL: You ONLY answer questions about the Ramayana, Lord Rama, Mata Sita, Maharishi Valmiki, Indian scriptures (Vedas, Upanishads, Bhagavad Gita, Mahabharata, Puranas), Sanatan Dharma/spirituality, and the British colonial conspiracy to mistranslate Indian scriptures (Macaulay 1835, Max Muller 1866/1868, Ralph Griffith 1870, Baroda Critical Edition). If a question is outside this spiritual/Ramayana domain, politely refuse using our spiritual guardrail message.\n' +
    '2. SESSION CONTEXT HISTORY: Always read the previous messages in this conversation history carefully when answering follow-up questions (such as "Why did they do that?", "Which verse proves this?", "Tell me more", "Explain in simple words").\n' +
    '3. CORE FACTS TO REMEMBER:\n' +
    '- Sita\'s Exile & Washerman (Dhobi): NOT in Valmiki\'s original 6-book Ramayana! Valmiki\'s epic ends happily at Yuddha Kanda (Book 6, Sarga 128) with Rama and Sita ruling for 10,000 years. There is zero washerman in Valmiki\'s text; the exile is only in the later-added Uttara Kanda (Book 7).\n' +
    '- British Colonial Conspiracy: Macaulay (1835) designed colonial education to cut Indians off from Sanskrit; Max Muller (1866 letter to his wife & 1868 letter to Duke of Argyll) translated the Rig Veda to "uproot" Indian religion; Ralph Griffith (1870) mistranslated Valmiki Ramayana into rigid Victorian terms and used the insulting word "spurned" for Ahalya\'s sacred liberation.\n' +
    '- Agni Pariksha: In Valmiki\'s Yuddha Kanda (6.116), Lord Rama NEVER orders Sita into fire. Mata Sita herself commands Lakshmana to light the pyre to silence future public rumours; Agni Deva rises with Sita unharmed.\n' +
    '- Shambuka: Absent from Valmiki\'s 6-book Ramayana (only in the later Uttara Kanda). In authentic books, Rama embraces tribal chief Guha as His brother and eats berries offered by tribal ascetic Shabari.\n' +
    '- Lakshmana Rekha & Sita Sinking into Earth: Zero Lakshmana Rekha in Valmiki\'s Aranya Kanda (invented 1,500+ years later in folk retellings); Sita sinking into Bhoodevi is also only in the later Uttara Kanda, not Valmiki\'s happy ending at Book 6.\n' +
    '- Keep answers warm, empowering, and in simple layman English (3-5 sentences).';

  // ---- Session State ----
  let history = [];
  let lastTopic = '';
  let isStreaming = false;
  let recognition = null;
  let isRecording = false;

  function loadSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.history)) history = parsed.history;
        if (typeof parsed.lastTopic === 'string') lastTopic = parsed.lastTopic;
      }
    } catch (e) {
      history = [];
      lastTopic = '';
    }
  }

  function saveSession() {
    try {
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({
          history: history.slice(-20),
          lastTopic
        })
      );
    } catch (e) {}
  }

  // ---- Detect Topic & Domain Guardrail ----
  function detectTopicFromText(text) {
    const lower = text.toLowerCase();
    if (/washerman|dhobi|exile|banish|abandon|pregnant|uttara\s*kanda/i.test(lower)) {
      return 'Mata Sita\'s Exile & the Later-Added Uttara Kanda (Washerman Myth)';
    }
    if (/british|colonial|macaulay|muller|griffith|conspiracy|corrupt|mistranslat|veda|gita|upanishad/i.test(lower)) {
      return 'The British Colonial Conspiracy to Corrupt & Mistranslate Indian Scriptures';
    }
    if (/agni|pariksha|fire|purity|trial/i.test(lower)) {
      return 'Mata Sita\'s Agni Pariksha in Valmiki\'s Yuddha Kanda';
    }
    if (/shambuka|shambuk|shudra|tapasya|penance|caste|shabari|guha/i.test(lower)) {
      return 'The Shambuka Interpolation vs. Lord Rama\'s True Equality (Guha & Shabari)';
    }
    if (/rekha|magic line|boundary|bhoodevi|mother earth|swallow|sink/i.test(lower)) {
      return 'The Lakshmana Rekha Myth & Sita\'s Descent into Earth (Bhoodevi)';
    }
    if (/ravan|dahan|effigy|brahmahatya|funeral|atatayi/i.test(lower)) {
      return 'Ravana Dahan, Brahmahatya Myth & Lord Rama\'s Noble Vedic Funeral for Ravana';
    }
    if (/baroda|manuscript|critical edition|valmiki/i.test(lower)) {
      return 'Maharishi Valmiki\'s Original Ramayana & the Baroda Critical Edition (2,000+ Manuscripts)';
    }
    return '';
  }

  function evaluateDomainGuardrail(userText) {
    const clean = userText.trim();
    const lower = clean.toLowerCase();

    // 1. Check pure greeting
    if (GREETING_PATTERN.test(clean)) {
      return { allowed: true, isGreeting: true };
    }

    // 2. Check if message contains spiritual / Ramayana domain keywords
    const hasSpiritualKeyword = SPIRITUAL_DOMAIN_KEYWORDS.some((kw) => lower.includes(kw));

    // 3. Check explicit off-topic keywords
    const hasExplicitOffTopic = EXPLICIT_OFF_TOPIC_KEYWORDS.some((kw) => lower.includes(kw));
    if (hasExplicitOffTopic && !hasSpiritualKeyword) {
      return { allowed: false, reason: 'explicit_off_topic' };
    }

    // 4. If it directly mentions any Ramayana / Scripture / Spiritual keyword, allow it!
    if (hasSpiritualKeyword) {
      return { allowed: true, isFollowUp: false };
    }

    // 5. If there is active session conversation history, check if this is a contextual follow-up query
    if (history.length > 0) {
      const matchesFollowUp = FOLLOW_UP_PATTERNS.some((regex) => regex.test(clean));
      const isShortFollowUp = clean.split(/\s+/).length <= 10 && !hasExplicitOffTopic;
      if (matchesFollowUp || isShortFollowUp) {
        return { allowed: true, isFollowUp: true };
      }
    }

    // 6. Otherwise, it is outside the Ramayana & spiritual domain -> block with polite template!
    return { allowed: false, reason: 'outside_domain' };
  }

  // ---- Local Context-Aware Fallback Answerer (if API is unreachable) ----
  function generateLocalContextualFallback(userText) {
    const combinedContext = (userText + ' ' + lastTopic).toLowerCase();

    if (/washerman|dhobi|exile|banish|abandon|pregnant/i.test(combinedContext)) {
      return (
        '🕉️ **Original Valmiki Truth on Sita\'s Exile:**\n' +
        'In Maharishi Valmiki\'s original 6-book Ramayana, Lord Rama **never** exiled Mata Sita, and there is **no washerman (dhobi)** anywhere in Valmiki\'s text! ' +
        'The Baroda Critical Edition (which compared over 2,000 ancient manuscripts) proves that Valmiki\'s authentic epic ends happily at **Yuddha Kanda (Book 6, Sarga 128)** with a formal concluding *Phalashruti* stating that Lord Rama and Mata Sita ruled happily together for 10,000 years. ' +
        'The tragic exile story was added 600–800 years later in the interpolated 7th book (*Uttara Kanda*).'
      );
    }

    if (/british|colonial|macaulay|muller|griffith|conspiracy|corrupt|veda|gita/i.test(combinedContext)) {
      return (
        '📜 **How British Colonial Rule Tried to Corrupt Indian Scriptures:**\n' +
        '1. **T.B. Macaulay (1835)** mocked Sanskrit scriptures without reading a single word of Sanskrit to create Indians who were *"English in taste, opinions, morals, and intellect."*\n' +
        '2. **Max Müller (1866 & 1868)** wrote privately that editing the Rig Veda was the only way of *"uprooting all that has sprung from it"* so Christianity could step in.\n' +
        '3. **Ralph Griffith (1870)** mistranslated Valmiki\'s Ramayana into rigid Victorian terms, used insulting words like *"spurned"* for Ahalya\'s liberation, and promoted late interpolations like the *Uttara Kanda* to make Indians doubt Lord Rama.'
      );
    }

    if (/agni|pariksha|fire|purity/i.test(combinedContext)) {
      return (
        '🔥 **The Real Truth of Agni Pariksha (Yuddha Kanda 6.116–118):**\n' +
        'Lord Rama **never** ordered Mata Sita into the fire! In Valmiki\'s original Sanskrit, it is **Mata Sita herself** who commands Lakshmana (*"Chitam me kuru Saumitre"*) to prepare the sacred fire with fierce spiritual authority so the whole world and the Devas could witness her untouchable purity. ' +
        'Agni Deva rose in person with Mata Sita completely unharmed, and Lord Rama declared He never doubted her for a single moment.'
      );
    }

    if (/shambuka|shambuk|shudra|caste|shabari|guha/i.test(combinedContext)) {
      return (
        '🏹 **The Truth About the Shambuka Story:**\n' +
        'The Shambuka episode does **not** exist anywhere in Maharishi Valmiki\'s authentic 6-book Ramayana—it appears only in the much later *Uttara Kanda* (Book 7). ' +
        'In Valmiki\'s genuine text, Lord Rama shows zero caste prejudice: He embraces the tribal chief **Guha** as His own brother (*Ayodhya Kanda*) and lovingly eats wild berries tasted by the elderly tribal ascetic **Mata Shabari** (*Aranya Kanda*). Colonial writers amplified the late Shambuka interpolation for "Divide and Rule" politics.'
      );
    }

    if (/rekha|magic line|bhoodevi|mother earth|sink|swallow/i.test(combinedContext)) {
      return (
        '🛡️ **Lakshmana Rekha & Sita Sinking into Earth — Both Later Additions:**\n' +
        '1. **Lakshmana Rekha:** There is **zero** mention of any magic boundary line in Valmiki\'s *Aranya Kanda*. Mata Sita did not "disobey" a line—she stepped forward to honour the sacred Vedic duty of feeding a mendicant guest (*Atithi Dharma*). The Rekha was invented 1,500+ years later in medieval folk plays.\n' +
        '2. **Sita Sinking into Earth (Bhoodevi):** This tragic scene exists only in the later-added *Uttara Kanda*, whereas Valmiki\'s original poem ends in joy at Book 6 with Rama and Sita ruling together.'
      );
    }

    return (
      '🕉️ **Original Valmiki Ramayana & Manuscript Proof:**\n' +
      'Based on the **Baroda Critical Edition** (which cross-checked nearly 2,000 ancient Sanskrit manuscripts across India), Maharishi Valmiki\'s original Ramayana consists of **6 authentic Kandas** ending in joy at *Yuddha Kanda (6.128)*. ' +
      'Controversial stories used to question Lord Rama—such as Sita\'s exile, the washerman rumour, Shambuka, and Sita sinking into the earth—were later interpolations in the *Uttara Kanda* or medieval folklore that colonial translators weaponized.'
    );
  }

  // ---- Build DOM ----
  function createWidget() {
    const fab = document.createElement('button');
    fab.className = 'chatbot-fab';
    fab.setAttribute('aria-label', 'Open Sacred Ramayana Scripture Guide');
    fab.setAttribute('title', 'Ask the Sacred Ramayana & Scripture Guide');
    fab.innerHTML = `
      <span class="chatbot-fab-badge">ॐ Ask Scripture Truth</span>
      <div class="chatbot-fab-emblem" aria-hidden="true">
        <svg class="icon-mandala" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" stroke="#FDE68A" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.85"/>
          <circle cx="50" cy="50" r="39" stroke="#FBBF24" stroke-width="1.4" opacity="0.75"/>
          <!-- 12 Sacred Suryavanshi Lotus Petals -->
          <g stroke="#FEF08A" stroke-width="1.3" fill="rgba(254, 240, 138, 0.12)">
            <path d="M50 4 C54 14, 54 20, 50 26 C46 20, 46 14, 50 4 Z"/>
            <path d="M50 4 C54 14, 54 20, 50 26 C46 20, 46 14, 50 4 Z" transform="rotate(30 50 50)"/>
            <path d="M50 4 C54 14, 54 20, 50 26 C46 20, 46 14, 50 4 Z" transform="rotate(60 50 50)"/>
            <path d="M50 4 C54 14, 54 20, 50 26 C46 20, 46 14, 50 4 Z" transform="rotate(90 50 50)"/>
            <path d="M50 4 C54 14, 54 20, 50 26 C46 20, 46 14, 50 4 Z" transform="rotate(120 50 50)"/>
            <path d="M50 4 C54 14, 54 20, 50 26 C46 20, 46 14, 50 4 Z" transform="rotate(150 50 50)"/>
            <path d="M50 4 C54 14, 54 20, 50 26 C46 20, 46 14, 50 4 Z" transform="rotate(180 50 50)"/>
            <path d="M50 4 C54 14, 54 20, 50 26 C46 20, 46 14, 50 4 Z" transform="rotate(210 50 50)"/>
            <path d="M50 4 C54 14, 54 20, 50 26 C46 20, 46 14, 50 4 Z" transform="rotate(240 50 50)"/>
            <path d="M50 4 C54 14, 54 20, 50 26 C46 20, 46 14, 50 4 Z" transform="rotate(270 50 50)"/>
            <path d="M50 4 C54 14, 54 20, 50 26 C46 20, 46 14, 50 4 Z" transform="rotate(300 50 50)"/>
            <path d="M50 4 C54 14, 54 20, 50 26 C46 20, 46 14, 50 4 Z" transform="rotate(330 50 50)"/>
          </g>
          <circle cx="50" cy="50" r="27" stroke="#FEF3C7" stroke-width="1.5" fill="rgba(124, 45, 18, 0.45)"/>
        </svg>
        <span class="icon-om-symbol">ॐ</span>
      </div>
      <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>`;

    const panel = document.createElement('div');
    panel.className = 'chatbot-panel';
    panel.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-header-left">
          <div class="chatbot-header-icon" aria-hidden="true">ॐ</div>
          <div class="chatbot-header-text">
            <h3>Rāmāyaṇa Scripture Guide</h3>
            <p>Original Valmiki Truth • Colonial Myths Exposed</p>
          </div>
        </div>
        <button type="button" class="chatbot-reset-btn" id="chatbotResetBtn" title="Clear session history and view Top 5 Myths">New Chat</button>
      </div>
      <div class="chatbot-messages" id="chatbotMessages"></div>
      <div class="chatbot-quick-bar">
        <button type="button" class="chatbot-show-myths-btn" id="chatbotShowMythsBtn">📜 Top 5 Myths Revealed</button>
        <span class="chatbot-session-indicator" id="chatbotSessionStatus">Session memory active</span>
      </div>
      <div class="chatbot-input-area">
        <button class="chatbot-btn-mic" type="button" aria-label="Voice input" title="Voice input">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="1" width="6" height="11" rx="3"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </button>
        <input type="text" placeholder="Ask about Lord Rama, Sita, or follow up..." aria-label="Chat message" maxlength="${MAX_LEN}">
        <button class="chatbot-btn-send" type="button" aria-label="Send message" disabled>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>`;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    return { fab, panel };
  }

  // ---- Init ----
  loadSession();
  const { fab, panel } = createWidget();
  const messages = panel.querySelector('#chatbotMessages');
  const input = panel.querySelector('.chatbot-input-area input');
  const sendBtn = panel.querySelector('.chatbot-btn-send');
  const micBtn = panel.querySelector('.chatbot-btn-mic');
  const resetBtn = panel.querySelector('#chatbotResetBtn');
  const showMythsBtn = panel.querySelector('#chatbotShowMythsBtn');
  const sessionStatus = panel.querySelector('#chatbotSessionStatus');

  function updateSessionIndicator() {
    const turns = Math.floor(history.length / 2);
    if (turns > 0) {
      sessionStatus.textContent = `Session context: ${turns} Q&A turn${turns > 1 ? 's' : ''}`;
    } else {
      sessionStatus.textContent = 'Spiritual Guardrail Active';
    }
  }

  function buildSuggestionsBlock() {
    const wrap = document.createElement('div');
    wrap.className = 'chatbot-suggestions-wrap';
    wrap.innerHTML = `
      <div class="chatbot-suggestions-title">✨ Top 5 Common Myths Revealed on This Website</div>
      <div class="chatbot-suggestions">
        ${TOP_5_MYTH_QUESTIONS.map(
          (item, idx) => `
          <button type="button" data-full-query="${item.query.replace(/"/g, '&quot;')}">
            <span class="q-num">${idx + 1}</span>
            <span>${item.label}</span>
          </button>`
        ).join('')}
      </div>
    `;
    return wrap;
  }

  function renderWelcomeAndTop5() {
    messages.innerHTML = `
      <div class="chatbot-welcome">
        <span class="chatbot-welcome-badge">ॐ Sanatan Scripture Guide</span>
        <p><strong>Namaste! 🙏</strong> Explore the original truth of Maharishi Valmiki's Ramayana and how British colonial mistranslations tried to distort our scriptures. Tap any of the <strong>Top 5 Common Myths</strong> below or ask your own question!</p>
      </div>
    `;
    messages.appendChild(buildSuggestionsBlock());
    updateSessionIndicator();
  }

  function restoreSessionMessages() {
    if (history.length === 0) {
      renderWelcomeAndTop5();
      return;
    }
    messages.innerHTML = '';
    history.forEach((turn) => {
      addMessage(turn.text, turn.role === 'user' ? 'user' : 'bot', false);
    });
    updateSessionIndicator();
  }

  restoreSessionMessages();

  // Toggle panel
  fab.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('visible');
    fab.classList.toggle('open', isOpen);
    fab.setAttribute('aria-label', isOpen ? 'Close chatbot' : 'Open Sacred Ramayana Scripture Guide');
    if (isOpen) {
      messages.scrollTop = messages.scrollHeight;
      input.focus();
    }
  });

  // Reset / New Chat button
  resetBtn.addEventListener('click', () => {
    if (isStreaming) return;
    history = [];
    lastTopic = '';
    saveSession();
    renderWelcomeAndTop5();
  });

  // Show Top 5 Myths button anytime during conversation
  showMythsBtn.addEventListener('click', () => {
    if (isStreaming) return;
    const existing = messages.querySelector('.chatbot-suggestions-wrap');
    if (existing) existing.remove();
    const block = buildSuggestionsBlock();
    messages.appendChild(block);
    messages.scrollTop = messages.scrollHeight;
  });

  // Send on Enter
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !sendBtn.disabled) {
      e.preventDefault();
      send();
    }
  });

  // Enable/disable send button
  input.addEventListener('input', () => {
    sendBtn.disabled = !input.value.trim() || isStreaming;
  });

  sendBtn.addEventListener('click', () => send());

  // Suggestion buttons (Top 5 Myths)
  panel.addEventListener('click', (e) => {
    const btn = e.target.closest('.chatbot-suggestions button');
    if (btn && !isStreaming) {
      const displayLabel = btn.innerText.replace(/^[0-9]+\s*/, '').trim();
      const fullQuery = btn.getAttribute('data-full-query') || displayLabel;
      send(displayLabel, fullQuery);
    }
  });

  // ---- Speech-to-Text ----
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (e) => {
      let transcript = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      input.value = transcript;
      sendBtn.disabled = !transcript.trim();
    };

    recognition.onend = () => {
      isRecording = false;
      micBtn.classList.remove('recording');
      micBtn.setAttribute('aria-label', 'Voice input');
      if (input.value.trim()) {
        send();
      }
    };

    recognition.onerror = () => {
      isRecording = false;
      micBtn.classList.remove('recording');
    };

    micBtn.addEventListener('click', () => {
      if (isStreaming) return;
      if (isRecording) {
        recognition.stop();
      } else {
        input.value = '';
        sendBtn.disabled = true;
        isRecording = true;
        micBtn.classList.add('recording');
        micBtn.setAttribute('aria-label', 'Stop recording');
        recognition.start();
      }
    });
  } else {
    micBtn.style.display = 'none';
  }

  // ---- Helpers ----
  function clearWelcome() {
    const w = panel.querySelector('.chatbot-welcome');
    const s = panel.querySelector('.chatbot-suggestions-wrap');
    if (w) w.remove();
    if (s) s.remove();
  }

  function formatBotHtml(rawText) {
    const escaped = String(rawText || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return escaped
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
  }

  function addMessage(text, role, isGuardrail) {
    const div = document.createElement('div');
    div.className = `chatbot-msg ${role}${isGuardrail ? ' guardrail-notice' : ''}`;
    const label = document.createElement('span');
    label.className = 'msg-label';
    label.textContent = role === 'user' ? 'You' : 'ॐ Scripture Guide';
    div.appendChild(label);
    const content = document.createElement('span');
    content.className = 'chatbot-msg-text';
    if (role === 'bot') {
      content.innerHTML = formatBotHtml(text);
    } else {
      content.textContent = text;
    }
    div.appendChild(content);
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return content;
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'chatbot-typing';
    t.id = 'chatbotTyping';
    t.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(t);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('chatbotTyping');
    if (t) t.remove();
  }

  // ---- Send, Guardrail Check & Session-Contextual Stream ----
  async function send(displayOverride, fullPromptOverride) {
    const visibleText = (displayOverride || input.value).trim();
    const effectiveQuery = (fullPromptOverride || visibleText).trim();
    if (!visibleText || isStreaming) return;

    clearWelcome();
    addMessage(visibleText, 'user', false);
    input.value = '';
    sendBtn.disabled = true;

    // 1. Evaluate Strict Spiritual & Ramayana Domain Guardrail
    const guardrail = evaluateDomainGuardrail(effectiveQuery);

    if (!guardrail.allowed) {
      addMessage(GUARDRAIL_TEMPLATE_EN, 'bot', true);
      const suggestions = buildSuggestionsBlock();
      messages.appendChild(suggestions);
      messages.scrollTop = messages.scrollHeight;
      return;
    }

    if (guardrail.isGreeting) {
      const greetingReply =
        '🙏 Jai Shri Ram! Namaste! I am your Rāmāyaṇa & Sanatan Scripture Guide. ' +
        'You can ask me about any of the 6 famous myths exposed on this website, how British colonial translators distorted our scriptures, or click one of the Top 5 Myth-Busting Questions below!';
      addMessage(greetingReply, 'bot', false);
      const suggestions = buildSuggestionsBlock();
      messages.appendChild(suggestions);
      messages.scrollTop = messages.scrollHeight;
      return;
    }

    // 2. Track active topic across session for follow-up queries
    const detectedTopic = detectTopicFromText(effectiveQuery);
    if (detectedTopic) {
      lastTopic = detectedTopic;
    }

    // 3. Build Session-Contextual History & Enriched Follow-Up Message
    const apiHistory = [
      { role: 'user', text: CONTEXT_PRIMER_PROMPT },
      {
        role: 'model',
        text: 'Understood. I will strictly stay within the Ramayana, Indian scriptures, and spiritual domain, explain in simple layman English using our website\'s manuscript evidence, and carefully use the session conversation history to answer any follow-up queries.'
      },
      ...history.slice(-14)
    ];

    let contextualizedMessage = effectiveQuery;
    if (history.length > 0 && guardrail.isFollowUp && lastTopic) {
      const candidate = `[Following up on ${lastTopic}]: ${effectiveQuery}`;
      if (candidate.length <= 480) {
        contextualizedMessage = candidate;
      }
    }
    if (contextualizedMessage.length > 490) {
      contextualizedMessage = contextualizedMessage.slice(0, 490);
    }

    isStreaming = true;
    showTyping();

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: contextualizedMessage,
          history: apiHistory
        })
      });

      hideTyping();

      if (!res.ok) {
        const fallbackReply = generateLocalContextualFallback(effectiveQuery);
        addMessage(fallbackReply, 'bot', false);
        history.push({ role: 'user', text: visibleText });
        history.push({ role: 'model', text: fallbackReply });
        saveSession();
        updateSessionIndicator();
        isStreaming = false;
        return;
      }

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        const botReply = data.reply || GUARDRAIL_TEMPLATE_EN;
        addMessage(botReply, 'bot', true);
        isStreaming = false;
        return;
      }

      const contentSpan = addMessage('', 'bot', false);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        reply += chunk;
        contentSpan.innerHTML = formatBotHtml(reply);
        messages.scrollTop = messages.scrollHeight;
      }

      history.push({ role: 'user', text: visibleText });
      history.push({ role: 'model', text: reply });
      if (history.length > 20) history = history.slice(-20);
      saveSession();
      updateSessionIndicator();
    } catch (err) {
      hideTyping();
      const fallbackReply = generateLocalContextualFallback(effectiveQuery);
      addMessage(fallbackReply, 'bot', false);
      history.push({ role: 'user', text: visibleText });
      history.push({ role: 'model', text: fallbackReply });
      saveSession();
      updateSessionIndicator();
    }

    isStreaming = false;
    sendBtn.disabled = !input.value.trim();
  }
})();
