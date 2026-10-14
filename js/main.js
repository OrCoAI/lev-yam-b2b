'use strict';

// ── Config ────────────────────────────────────────────────────
// Conversion is WhatsApp only (decision: Or, 2026-10-12). No form, no backend.
const WA_NUMBER = '972506669138';

// ── Dynatrace business events ─────────────────────────────────
// dynatrace.sendBizEvent is the correct API (not dtrum). Cached once at startup.
const _dtSendBizEvent = typeof dynatrace !== 'undefined' && typeof dynatrace.sendBizEvent === 'function'
  ? dynatrace.sendBizEvent.bind(dynatrace)
  : null;

function sendBizEvent(type, data = {}) {
  if (!_dtSendBizEvent) return;
  try {
    _dtSendBizEvent(type, { ...data, lang: currentLang, page: 'venue-landing' });
  } catch (_) { /* never let analytics break the page */ }
}

// ── Translations ──────────────────────────────────────────────
// Hebrew is the source (content/copy.md). Arabic is a draft — flagged for
// native-speaker review before launch. Venue name in Arabic: لب يام.
const TRANSLATIONS = {
  he: {
    'meta-title': 'לב ים | ימי צוות, מפגשי הנהלה ואירועי חברה מול הים',
    'meta-desc': 'לב ים בכפר הדייגים ג׳יסר א-זרקא — מרחב אירוח ייחודי לימי צוות, מפגשי הנהלה ואירועי חברה, בין הים לטבע.',
    'skip': 'דלגו לתוכן',
    'brand-aria': 'לב ים — לראש הדף',
    'brand-name': 'לב ים',
    'nav-aria': 'ניווט ראשי',
    'nav-space': 'המרחב',
    'nav-food': 'האוכל',
    'nav-content': 'התוכן',
    'nav-fit': 'למי זה מתאים',
    'nav-contact': 'צרו קשר',
    'nav-wa': 'דברו איתנו',
    'wa-aria': 'דברו איתנו בוואטסאפ',

    'hero-h1a': 'יוצאים מהשגרה.',
    'hero-h1b': 'נפגשים אחרת.',
    'hero-sub': 'ימי צוות, מפגשי הנהלה ואירועי חברה במקום קצת אחר.',
    // The lead is split around the venue name, which is bold (brand-name)
    'hero-lead-a': 'בכפר הדייגים ג׳יסר א-זרקא, בין הים לטבע, מחכה לכם',
    'hero-lead-b': '- מרחב אירוח ייחודי המשלב נוף עוצר נשימה, אוכל מקומי, תוכן מעשיר ומפגש אנושי בגובה העיניים.',
    'cta-plan': 'בואו נתכנן את היום שלכם!',
    'hero-cta-discover': 'גלו את לב ים',

    'fact-distance': 'מרחק מתל אביב',
    'fact-size': 'גודל קבוצה',
    'fact-spaces': 'חללים',
    'fact-parking': 'חניה ונגישות',

    'intro-p1': 'מקום לצאת מהשגרה, לפתוח את הראש, להתחבר מחדש ולחזור עם אנרגיה ורעיונות חדשים.',
    'intro-p2': 'בין אם אתם מתכננים יום גיבוש, מפגש חשיבה, סדנה או אירוע חברה - ניצור יחד חוויה המותאמת לאנשים ולמטרות שלכם.',
    'testi-h2': 'מה אומרים מי שכבר היו כאן',

    'pillars-h2': 'שלושה מרכיבים. אינספור אפשרויות.',
    // Labels of the desktop accordion bar, reused from the old packages ("מידע נוסף ↓" / "סגור ↑")
    'pillar-more': 'מידע נוסף',
    'pillar-less': 'סגור',
    // Photo stories (phones): the ring's label (followed by the card's title) and the tap zones
    'story-open': 'צפייה בתמונות',
    'story-prev': 'התמונה הקודמת',
    'story-next': 'התמונה הבאה',
    'p1-h3': 'משנים אווירה. פותחים את הראש.',
    'p1-p1': 'יש מקומות שמספיק להגיע אליהם כדי להרגיש אחרת. לב ים שוכן בכפר דייגים על חוף הים התיכון, מוקף טבע ונוף פתוח. המרחב משלב אזורי התכנסות, פינות ישיבה נעימות ואווירה אינטימית ובלתי פורמלית, שמזמינה יצירתיות, שיחה פתוחה וחיבור אנושי.',
    'p1-list-title': 'מה מחכה לכם?',
    'p1-li1': 'מרחבי התכנסות ועבודה לצוותים ולקבוצות',
    'p1-li2': 'אפשרות לאירוח אינטימי או לשימוש במתחם כולו',
    'p1-li3': 'פינות ישיבה נעימות בפנים ובחוץ',
    'p1-li4': 'טבע, ים ונוף פתוח במרחק צעדים ספורים',
    'p1-li5': 'שילוב של מפגשים מקצועיים וזמן חופשי',
    'p1-li6': 'התאמת המרחב לאופי האירוע ולגודל הקבוצה',
    'p1-close': 'בין אם אתם מתכננים מפגש הנהלה, יום גיבוש או סדנה, נבחר יחד את המרחבים המתאימים וניצור את האווירה הנכונה עבורכם.',
    'p2-h3': 'טעמים מקומיים. אירוח מכל הלב.',
    'p2-p1': 'אוכל טוב הוא חלק בלתי נפרד ממפגש מוצלח. בלב ים מחכה לכם חוויה קולינרית בהשראת המטבח המקומי המוגש באהבה ובפשטות. ממסיבת תה מסורתית ומאפי בוקר מהכפר ועד לארוחות עשירות ומפנקות.',
    'p2-list-title': 'מה אפשר לשלב?',
    'p2-li1': 'קבלת פנים עם מסיבת תה מסורתית',
    'p2-li2': 'מאפי בוקר מקומיים ופירות העונה',
    'p2-li3': 'ארוחות צהריים עשירות בהשראת המטבח המקומי',
    'p2-li4': 'משקאות טבעיים, כיבוד ומתוקים לאורך היום',
    'p2-li5': 'אירוח שף אורח לחוויה קולינרית מיוחדת',
    'p2-li6': 'אפשרות להביא קייטרינג חיצוני מטעמכם',
    'p2-close': 'תוכלו לבחור בין האירוח המקומי שלנו, שף אורח או קייטרינג משלכם, ולבנות חוויה קולינרית שמתאימה לטעם, לאופי ולרצונות הקבוצה.',
    'p3-h3': 'חוויות שמחברות בין אנשים.',
    'p3-p1': 'לפעמים כדי לחשוב אחרת, צריך פשוט לעשות משהו אחר. בלב ים תוכלו לשלב תוכן מעשיר ומעורר השראה, מתנועה ורוגע ועד חוויות בטבע ומפגשים עם התרבות המקומית. הפעילויות מזמינות סקרנות, התנסות משותפת וחיבור בין אנשים.',
    'p3-list-title': 'מה אפשר לשלב?',
    'p3-li1': 'סדנאות יוגה, תנועה ומדיטציה',
    'p3-li2': 'פעילויות חווייתיות בטבע ובים',
    'p3-li3': 'סיורים והיכרות עם כפר הדייגים',
    'p3-li4': 'מפגשים עם אנשים וסיפורים מקומיים',
    'p3-li5': 'סדנאות יצירה, העשרה וגיבוש צוותי',
    'p3-li6': 'אפשרות לתוכן עצמאי או לתוכנית מותאמת אישית',
    'p3-close': 'תוכלו לבחור מתוך מגוון הפעילויות שלנו, להביא תוכן משלכם או לשלב בין האפשרויות, וליצור יחד תוכנית שמתאימה לאופי הקבוצה ולמטרות המפגש.',

    'fit-h2': 'יום אחד. בדיוק בשבילכם.',
    'fit-p1': 'אין שני צוותים זהים, ולכן גם אין שני ימים זהים בלב ים.',
    'fit-p2': 'יש צוותים שמגיעים ליום עבודה וחשיבה, אחרים מחפשים גיבוש וחוויה משותפת, ויש מי שרוצים פשוט לצאת מהמשרד ולבלות יחד במקום יפה ומיוחד.',
    'fit-p3': 'אנחנו כאן כדי להקשיב, להציע ולבנות יחד את השילוב הנכון של מרחב, אוכל ותוכן.',
    'fit-list-title': 'מתאים במיוחד ל:',
    'fit-li1': 'ימי גיבוש וצוות',
    'fit-li2': 'מפגשי הנהלה וימי אסטרטגיה',
    'fit-li3': 'סדנאות והכשרות',
    'fit-li4': 'ימי חשיבה ויצירה',
    'fit-li5': 'אירועי חברה ומפגשים מקצועיים',
    'fit-li6': 'מפגשי קהילה וארגונים',
    'fit-cta': 'בואו ליצור את היום שלכם!',

    'impact-h2': 'חוויה טובה. השפעה טובה.',
    'impact-p1': 'לב ים הוא הרבה יותר ממקום לאירוע.',
    'impact-p2': 'הבחירה להתארח אצלנו היא גם הזדמנות להכיר מקרוב את ג׳יסר א-זרקא, לפגוש את האנשים והסיפורים של הכפר ולתמוך בעשייה ובכלכלה המקומית.',
    'impact-p3': 'אנחנו מאמינים בכוחם של מפגשים פשוטים ואמיתיים לקרב בין אנשים, לפתוח נקודות מבט חדשות וליצור חיבורים שנשארים הרבה אחרי שהיום מסתיים.',
    'impact-p4': 'כאן חוויה מהנה ומשמעותית יכולה גם לייצר ערך לקהילה שמארחת אותה.',

    'plan-h2': 'בואו להיפגש בלב ים.',
    'plan-p1': 'יש משהו מיוחד ביום שמתחיל מול הים, ממשיך עם אוכל טוב, שיחות מעניינות וחוויות משותפות, ומסתיים בתחושה שהיה שווה לצאת מהשגרה.',
    'plan-p2': 'ספרו לנו מה אתם מתכננים, כמה אנשים אתם ומה הייתם רוצים לחוות ונשמח ליצור יחד יום שמתאים בדיוק לכם.',
    'plan-q1': 'מה אתם מתכננים?',
    'plan-q2': 'כמה אנשים אתם?',
    'plan-q-when': 'מתי תרצו להגיע?',
    'plan-q3': 'מה הייתם רוצים לחוות?',
    'plan-q3-hint': 'אפשר לבחור יותר מאחד',
    'plan-size1': 'עד 15',
    'plan-size-unit': 'אנשים',
    'plan-when-later': 'מאוחר יותר',
    'plan-when-open': 'עוד לא סגרנו תאריך',
    'plan-comp1': 'המרחב',
    'plan-comp2': 'האוכל',
    'plan-comp3': 'התוכן',
    'plan-back': 'חזרה',
    'plan-skip': 'דלגו',
    'plan-next': 'המשך',
    'plan-step': 'שאלה {n} מתוך {total}',
    'plan-ready-h': 'ההודעה מוכנה!',
    'plan-ready-p': 'עוד לחיצה אחת ואנחנו מדברים בוואטסאפ.',
    'plan-edit': 'שינוי',
    'plan-restart': 'מתחילים מחדש',
    'plan-msg-label': 'ההודעה שלכם',
    'plan-send': 'שלחו בוואטסאפ',

    // WhatsApp message building blocks. Ranges use a plain hyphen: with an en dash,
    // Hebrew and Arabic text (and WhatsApp) shows "15–30" reversed as "30–15".
    'plan-ev1-msg': 'יום גיבוש וצוות',
    'plan-ev2-msg': 'מפגש הנהלה / יום אסטרטגיה',
    'plan-ev3-msg': 'סדנה או הכשרה',
    'plan-ev4-msg': 'יום חשיבה ויצירה',
    'plan-ev5-msg': 'אירוע חברה / מפגש מקצועי',
    'plan-ev6-msg': 'מפגש קהילה / ארגון',
    'size-lt15': 'עד 15 אנשים',
    'size-15-30': '15-30 אנשים',
    'size-30-50': '30-50 אנשים',
    'size-50plus': 'מעל 50 אנשים',
    'when-month-msg': 'ב{month}',
    'when-later-msg': 'בעוד חצי שנה או יותר',
    'when-open-msg': 'עוד לא סגרנו תאריך.',
    'chat-caption': 'זו ההודעה שתישלח. אפשר לערוך אותה בוואטסאפ לפני השליחה.',
    'wa-default': 'היי, אנחנו רוצים לתכנן יום בלב ים. נשמח לשמוע פרטים.',

    'footer-place': 'לב ים, כפר הדייגים בג׳יסר א-זרקא',
    'footer-waze': 'ניווט ב-Waze',
    'footer-maps': 'Google Maps',
    'footer-email': 'אימייל',
    'footer-instagram': 'אינסטגרם',
    'footer-copy': '© 2026 לב ים. כל הזכויות שמורות.',
  },

  ar: {
    'meta-title': 'لب يام | أيام فريق، لقاءات إدارة وفعاليات شركات أمام البحر',
    'meta-desc': 'لب يام في قرية الصيادين جسر الزرقاء – مساحة ضيافة فريدة لأيام الفريق، لقاءات الإدارة وفعاليات الشركات، بين البحر والطبيعة.',
    'skip': 'انتقلوا إلى المحتوى',
    'brand-aria': 'لب يام – إلى أعلى الصفحة',
    'brand-name': 'لب يام',
    'nav-aria': 'التنقل الرئيسي',
    'nav-space': 'المكان',
    'nav-food': 'الطعام',
    'nav-content': 'المحتوى',
    'nav-fit': 'لمن يناسب',
    'nav-contact': 'تواصلوا معنا',
    'nav-wa': 'تحدثوا معنا',
    'wa-aria': 'تحدثوا معنا عبر واتساب',

    'hero-h1a': 'نخرج من الروتين.',
    'hero-h1b': 'نلتقي بشكل مختلف.',
    'hero-sub': 'أيام فريق، لقاءات إدارة وفعاليات\u00A0شركات في مكان مختلف قليلاً.',
    'hero-lead-a': 'في قرية الصيادين جسر الزرقاء، بين البحر والطبيعة، ينتظركم',
    'hero-lead-b': '– مساحة ضيافة فريدة تجمع بين إطلالة خلابة، طعام محلي، محتوى غني ولقاء إنساني حقيقي.',
    'cta-plan': 'لنخطّط يومكم معاً!',
    'hero-cta-discover': 'اكتشفوا لب يام',

    'fact-distance': 'المسافة من تل أبيب',
    'fact-size': 'حجم المجموعة',
    'fact-spaces': 'المساحات',
    'fact-parking': 'مواقف ووصول',

    'intro-p1': 'مكان للخروج من الروتين، لفتح الذهن، لإعادة التواصل والعودة بطاقة وأفكار جديدة.',
    'intro-p2': 'سواء كنتم تخططون ليوم تعزيز فريق، لقاء عصف ذهني، ورشة أو فعالية شركة – سنصنع معاً تجربة مصممة لأشخاصكم وأهدافكم.',
    'testi-h2': 'ماذا يقول من كانوا هنا',

    'pillars-h2': 'ثلاثة مكوّنات. إمكانيات لا تُحصى.',
    'pillar-more': 'مزيد من المعلومات',
    'pillar-less': 'إغلاق',
    'story-open': 'مشاهدة الصور',
    'story-prev': 'الصورة السابقة',
    'story-next': 'الصورة التالية',
    'p1-h3': 'نغيّر الأجواء. نفتح الذهن.',
    'p1-p1': 'هناك أماكن يكفي أن تصلوا إليها لتشعروا بشكل مختلف. يقع لب يام في قرية صيادين على شاطئ البحر الأبيض المتوسط، تحيط به الطبيعة والإطلالة المفتوحة. يجمع المكان بين مناطق تجمّع، زوايا جلوس مريحة وأجواء حميمة وغير رسمية، تدعو إلى الإبداع، الحوار المفتوح والتواصل الإنساني.',
    'p1-list-title': 'ما الذي ينتظركم؟',
    'p1-li1': 'مساحات تجمّع وعمل للفرق والمجموعات',
    'p1-li2': 'إمكانية استضافة حميمة أو استخدام المجمّع بأكمله',
    'p1-li3': 'زوايا جلوس مريحة في الداخل والخارج',
    'p1-li4': 'طبيعة، بحر وإطلالة مفتوحة على بُعد خطوات قليلة',
    'p1-li5': 'الجمع بين لقاءات مهنية ووقت حر',
    'p1-li6': 'ملاءمة المكان لطابع الفعالية وحجم المجموعة',
    'p1-close': 'سواء كنتم تخططون للقاء إدارة، يوم تعزيز فريق أو ورشة، سنختار معاً المساحات المناسبة ونصنع الأجواء الصحيحة لكم.',
    'p2-h3': 'نكهات محلية. ضيافة من القلب.',
    'p2-p1': 'الطعام الجيد جزء لا يتجزأ من أي لقاء ناجح. في لب يام تنتظركم تجربة طهي مستوحاة من المطبخ المحلي، تُقدَّم بحب وببساطة. من حفلة شاي تقليدية ومعجنات صباحية من القرية وحتى وجبات غنية وفاخرة.',
    'p2-list-title': 'ما الذي يمكن دمجه؟',
    'p2-li1': 'استقبال مع حفلة شاي تقليدية',
    'p2-li2': 'معجنات صباحية محلية وفواكه الموسم',
    'p2-li3': 'وجبات غداء غنية مستوحاة من المطبخ المحلي',
    'p2-li4': 'مشروبات طبيعية، ضيافة وحلويات على مدار اليوم',
    'p2-li5': 'استضافة شيف ضيف لتجربة طهي مميزة',
    'p2-li6': 'إمكانية إحضار تموين خارجي من طرفكم',
    'p2-close': 'يمكنكم الاختيار بين ضيافتنا المحلية، شيف ضيف أو تموين خاص بكم، وبناء تجربة طهي تناسب ذوق المجموعة وطابعها ورغباتها.',
    'p3-h3': 'تجارب تربط بين الناس.',
    'p3-p1': 'أحياناً، لكي نفكّر بشكل مختلف، علينا ببساطة أن نفعل شيئاً مختلفاً. في لب يام يمكنكم دمج محتوى غني وملهم، من الحركة والاسترخاء إلى تجارب في الطبيعة ولقاءات مع الثقافة المحلية. تدعو الأنشطة إلى الفضول، التجربة المشتركة والتواصل بين الناس.',
    'p3-list-title': 'ما الذي يمكن دمجه؟',
    'p3-li1': 'ورشات يوغا، حركة وتأمل',
    'p3-li2': 'أنشطة تجريبية في الطبيعة والبحر',
    'p3-li3': 'جولات وتعرّف على قرية الصيادين',
    'p3-li4': 'لقاءات مع أشخاص وقصص محلية',
    'p3-li5': 'ورشات إبداع، إثراء وتعزيز روح الفريق',
    'p3-li6': 'إمكانية محتوى مستقل أو برنامج مصمّم خصيصاً',
    'p3-close': 'يمكنكم الاختيار من بين أنشطتنا المتنوعة، إحضار محتوى خاص بكم أو الدمج بين الخيارات، وأن نبني معاً برنامجاً يناسب طابع المجموعة وأهداف اللقاء.',

    'fit-h2': 'يوم واحد. مصمّم\u00A0لكم\u00A0بالضبط.',
    'fit-p1': 'لا يوجد فريقان متشابهان، ولذلك لا يوجد يومان متشابهان في لب يام.',
    'fit-p2': 'هناك فرق تأتي ليوم عمل وتفكير، وأخرى تبحث عن تعزيز الفريق وتجربة مشتركة، وهناك من يريد ببساطة الخروج من المكتب وقضاء الوقت معاً في مكان جميل ومميز.',
    'fit-p3': 'نحن هنا لنصغي، نقترح ونبني معاً المزيج الصحيح من المكان، الطعام والمحتوى.',
    'fit-list-title': 'يناسب بشكل خاص:',
    'fit-li1': 'أيام تعزيز الفريق',
    'fit-li2': 'لقاءات الإدارة وأيام الاستراتيجية',
    'fit-li3': 'ورشات وتدريبات',
    'fit-li4': 'أيام التفكير والإبداع',
    'fit-li5': 'فعاليات الشركات واللقاءات المهنية',
    'fit-li6': 'لقاءات المجتمعات والمنظمات',
    'fit-cta': 'لنصنع يومكم معاً!',

    'impact-h2': 'تجربة جيدة. أثر جيد.',
    'impact-p1': 'لب يام أكثر بكثير من مكان لفعالية.',
    'impact-p2': 'اختياركم الاستضافة عندنا هو أيضاً فرصة للتعرف عن قرب على جسر الزرقاء، للقاء أهل القرية وقصصها ولدعم العمل والاقتصاد المحليين.',
    'impact-p3': 'نؤمن بقوة اللقاءات البسيطة والحقيقية في تقريب الناس، فتح وجهات نظر جديدة وخلق روابط تبقى طويلاً بعد انتهاء اليوم.',
    'impact-p4': 'هنا، تجربة ممتعة وذات معنى يمكنها أيضاً أن تخلق قيمة للمجتمع الذي يستضيفها.',

    'plan-h2': 'تعالوا نلتقي في لب يام.',
    'plan-p1': 'هناك شيء مميز في يوم يبدأ أمام البحر، يستمر مع طعام جيد، أحاديث شيّقة وتجارب مشتركة، وينتهي بشعور أن الخروج من الروتين كان يستحق.',
    'plan-p2': 'أخبرونا ما الذي تخططون له، كم عددكم وما الذي تودّون تجربته، ويسعدنا أن نصنع معاً يوماً يناسبكم تماماً.',
    'plan-q1': 'ما الذي تخططون له؟',
    'plan-q2': 'كم عددكم؟',
    'plan-q-when': 'متى تودّون القدوم؟',
    'plan-q3': 'ما الذي تودّون تجربته؟',
    'plan-q3-hint': 'يمكن اختيار أكثر من خيار',
    'plan-size1': 'حتى 15',
    'plan-size-unit': 'شخصاً',
    'plan-when-later': 'لاحقاً',
    'plan-when-open': 'لم نحدد موعداً بعد',
    'plan-comp1': 'المكان',
    'plan-comp2': 'الطعام',
    'plan-comp3': 'المحتوى',
    'plan-back': 'رجوع',
    'plan-skip': 'تخطّي',
    'plan-next': 'متابعة',
    'plan-step': 'سؤال {n} من {total}',
    'plan-ready-h': 'الرسالة جاهزة!',
    'plan-ready-p': 'نقرة واحدة ونتحدث عبر واتساب.',
    'plan-edit': 'تعديل',
    'plan-restart': 'البدء من جديد',
    'plan-msg-label': 'رسالتكم',
    'plan-send': 'أرسلوا عبر واتساب',

    'plan-ev1-msg': 'يوم تعزيز فريق',
    'plan-ev2-msg': 'لقاء إدارة / يوم استراتيجية',
    'plan-ev3-msg': 'ورشة أو تدريب',
    'plan-ev4-msg': 'يوم تفكير وإبداع',
    'plan-ev5-msg': 'فعالية شركة / لقاء مهني',
    'plan-ev6-msg': 'لقاء مجتمعي / منظمة',
    'size-lt15': 'حتى 15 شخصاً',
    // \u200E (left-to-right mark) keeps "15-30" in order after an Arabic word — in the message, the pills and the WhatsApp text
    'size-15-30': '\u200E15-30 شخصاً',
    'size-30-50': '\u200E30-50 شخصاً',
    'size-50plus': 'أكثر من 50 شخصاً',
    'when-month-msg': 'في شهر {month}',
    'when-later-msg': 'بعد نصف سنة أو أكثر',
    'when-open-msg': 'لم نحدد موعداً بعد.',
    'chat-caption': 'هذه هي الرسالة التي ستُرسل. يمكنكم تعديلها في واتساب قبل الإرسال.',
    'wa-default': 'مرحباً، نرغب في التخطيط ليوم في لب يام. يسعدنا الحصول على التفاصيل.',

    'footer-place': 'لب يام، قرية الصيادين في جسر الزرقاء',
    'footer-waze': 'التنقل عبر Waze',
    'footer-maps': 'Google Maps',
    'footer-email': 'البريد الإلكتروني',
    'footer-instagram': 'إنستغرام',
    'footer-copy': '© 2026 لب يام. جميع الحقوق محفوظة.',
  },
};

// ── Language ──────────────────────────────────────────────────
let currentLang = 'he';
try {
  const saved = localStorage.getItem('lang');
  if (saved === 'he' || saved === 'ar') currentLang = saved;
} catch (_) { /* storage unavailable — stay on Hebrew */ }

function t(key) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.he;
  return dict[key] ?? TRANSLATIONS.he[key] ?? '';
}

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.title = t('meta-title');
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = t('meta-desc');

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    el.alt = t(el.dataset.i18nAlt);
  });
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
  });

  labelMonthChoices();
  refreshWhatsAppLinks();
  renderStep();
  syncPillarLabels();
  alignPillarRows();
  labelStoryRings();
  try { localStorage.setItem('lang', lang); } catch (_) { /* ignore */ }
}

function initLangSwitch() {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.lang;
      if (next === currentLang) return;
      const from = currentLang;
      applyLanguage(next);
      sendBizEvent('levyam.lang.switch', { from, to: next });
    });
  });
}

// ── WhatsApp planner ──────────────────────────────────────────
// Four optional questions, one at a time (one tap each; the flow moves on by
// itself), then a "ready" step. Every answer rewrites the message, and every
// WhatsApp button sends whatever is there at any point. Nothing is stored.
const STEPS = ['event', 'size', 'when', 'comp', 'ready'];
const QUESTION_KEYS = { event: 'plan-q1', size: 'plan-q2', when: 'plan-q-when', comp: 'plan-q3' };
const ADVANCE_MS = 450;  // long enough to see the tile turn orange before the next question
const planner = { event: null, size: null, when: null, comps: [] };
let currentStep = 'event';
let returnToReady = false;  // set while one answer is being changed from the ready step
let advanceTimer = 0;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function fill(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
}

function joinList(items) {
  if (items.length <= 1) return items.join('');
  const last = items[items.length - 1];
  const head = items.slice(0, -1).join(currentLang === 'ar' ? '، ' : ', ');
  // Hebrew "ו" attaches to the next word; Arabic "و" takes a space.
  return currentLang === 'ar' ? `${head} و${last}` : `${head} ו${last}`;
}

// "When": the next six months, named in the page language, plus "later" and "not decided"
function monthName(value) {
  const [year, month] = value.split('-').map(Number);
  return new Intl.DateTimeFormat(currentLang, { month: 'long' }).format(new Date(year, month - 1, 1));
}

function buildMonthChoices() {
  const grid = document.getElementById('when-choices');
  if (!grid) return;
  const fixedAnswers = grid.firstElementChild;  // the months go in front of "later" / "not decided"
  const now = new Date();
  for (let i = 0; i < 6; i += 1) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice choice-month';
    btn.dataset.group = 'when';
    btn.dataset.value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    btn.setAttribute('aria-pressed', 'false');
    btn.innerHTML = '<span class="choice-label"></span> <span class="choice-year"></span><span class="choice-check" aria-hidden="true"></span>';
    grid.insertBefore(btn, fixedAnswers);
  }
  labelMonthChoices();
}

function labelMonthChoices() {
  document.querySelectorAll('.choice-month').forEach((btn) => {
    btn.querySelector('.choice-label').textContent = monthName(btn.dataset.value);
    btn.querySelector('.choice-year').textContent = btn.dataset.value.slice(0, 4);
  });
}

// "בנובמבר", or "בינואר 2027" once the month is in another year
function whenFragment() {
  const when = planner.when;
  if (!when || when === 'open') return null;
  if (when === 'later') return t('when-later-msg');
  const year = Number(when.slice(0, 4));
  const month = year === new Date().getFullYear() ? monthName(when) : `${monthName(when)} ${year}`;
  return fill(t('when-month-msg'), { month });
}

// The message as a list of fragments. Each chosen fragment carries its question
// (mark) so the preview can highlight it and draw the newest one in.
// The WhatsApp link uses the plain join.
function composeParts() {
  const evMsg = planner.event ? t(planner.event.msgKey) : null;
  const sizeMsg = planner.size ? t(`size-${planner.size}`) : null;
  const whenMsg = whenFragment();
  const compLabels = planner.comps.map((c) => t(c.labelKey));
  const hasSelection = Boolean(evMsg || sizeMsg || planner.when || compLabels.length);
  if (!hasSelection) return [{ text: t('wa-default') }];

  const parts = [];
  const openDate = planner.when === 'open' ? [{ text: ' ' }, { text: t('when-open-msg'), mark: 'when' }] : [];
  if (currentLang === 'ar') {
    if (evMsg) parts.push({ text: 'مرحباً، نخطط لتنظيم ' }, { text: evMsg, mark: 'event' }, { text: ' في لب يام' });
    else parts.push({ text: 'مرحباً، نرغب في التخطيط ليوم في لب يام' });
    if (sizeMsg) parts.push({ text: '، عددنا ' }, { text: sizeMsg, mark: 'size' });
    if (whenMsg) parts.push({ text: '، ' }, { text: whenMsg, mark: 'when' });
    if (compLabels.length) parts.push({ text: '، ونرغب بدمج ' }, { text: joinList(compLabels), mark: 'comp' });
    parts.push({ text: '.' }, ...openDate, { text: ' يسعدنا أن نخطط معاً!' });
    return parts;
  }

  if (evMsg) parts.push({ text: 'היי, אנחנו מתכננים ' }, { text: evMsg, mark: 'event' }, { text: ' בלב ים' });
  else parts.push({ text: 'היי, אנחנו רוצים לתכנן יום בלב ים' });
  if (sizeMsg) parts.push({ text: ' לקבוצה של ' }, { text: sizeMsg, mark: 'size' });
  if (whenMsg) parts.push({ text: ' ' }, { text: whenMsg, mark: 'when' });
  if (compLabels.length) parts.push({ text: ', ורוצים לשלב את ' }, { text: joinList(compLabels), mark: 'comp' });
  parts.push({ text: '.' }, ...openDate, { text: ' נשמח לתכנן יחד!' });
  return parts;
}

function composeMessage() {
  return composeParts().map((p) => p.text).join('');
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Preview only (never the WhatsApp text): a number range ("15-30") is isolated so it never
// breaks at the hyphen inside RTL text, and the venue name and the closing sentence are
// kept on one line — mixed-direction text defeats the browser's own even wrapping
const KEEP_TOGETHER = {
  he: ['לב ים', 'נשמח לתכנן יחד!', 'נשמח לשמוע פרטים.'],
  ar: ['لب يام', 'يسعدنا أن نخطط معاً!', 'يسعدنا الحصول على التفاصيل.'],
};
function keepRanges(html) {
  let out = html.replace(/(\d+)-(\d+)/g, '<span class="range">$1-$2</span>');
  (KEEP_TOGETHER[currentLang] || KEEP_TOGETHER.he).forEach((phrase) => {
    out = out.split(phrase).join(`<span class="nobr">${phrase}</span>`);
  });
  return out;
}

function composePreviewHtml(changed) {
  return composeParts()
    .map((p) => {
      if (!p.mark) return keepRanges(escapeHtml(p.text));
      return `<mark class="sel${p.mark === changed ? ' is-new' : ''}">${keepRanges(escapeHtml(p.text))}</mark>`;
    })
    .join('');
}

function waUrl(message) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Every WhatsApp button sends the same language-aware message: the default
// one, or the one the visitor built in the planner, so it's never lost.
function refreshWhatsAppLinks({ changed = null } = {}) {
  const href = waUrl(composeMessage());
  document.querySelectorAll('[data-wa]').forEach((link) => { link.href = href; });
  updateChatPreview(changed);
}

// The message panel mirrors the exact text the button opens in WhatsApp
let lastPreview = '';
function updateChatPreview(changed) {
  const text = document.getElementById('chat-text');
  if (!text) return;
  const next = composeMessage();
  if (next === lastPreview) return;
  lastPreview = next;
  text.innerHTML = composePreviewHtml(changed);
}

// ── Planner steps ──
function nextStep() {
  if (returnToReady) return 'ready';
  return STEPS[Math.min(STEPS.indexOf(currentStep) + 1, STEPS.length - 1)];
}

function answerText(step) {
  if (step === 'event') return planner.event ? t(planner.event.labelKey) : '';
  if (step === 'size') return planner.size ? t(`size-${planner.size}`) : '';
  if (step === 'when') {
    if (!planner.when) return '';
    if (planner.when === 'later') return t('plan-when-later');
    if (planner.when === 'open') return t('plan-when-open');
    return `${monthName(planner.when)} ${planner.when.slice(0, 4)}`;
  }
  return joinList(planner.comps.map((c) => t(c.labelKey)));
}

// Ready step: one pill per question. A pill takes the visitor back to that
// question, and answering it returns straight here.
function renderAnswers() {
  const list = document.getElementById('plan-answers');
  if (!list) return;
  list.textContent = '';
  STEPS.filter((step) => QUESTION_KEYS[step]).forEach((step) => {
    const answer = answerText(step);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = answer ? 'answer' : 'answer is-empty';
    btn.dataset.edit = step;
    btn.textContent = answer || t(QUESTION_KEYS[step]);
    btn.setAttribute('aria-label', `${t('plan-edit')}: ${btn.textContent}`);
    const li = document.createElement('li');
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function renderStep({ animate = false, back = false } = {}) {
  const root = document.getElementById('planner');
  if (!root) return;
  const index = STEPS.indexOf(currentStep);
  root.dataset.step = currentStep;
  root.classList.toggle('is-ready', currentStep === 'ready');

  root.querySelectorAll('.step').forEach((step) => {
    const active = step.dataset.step === currentStep;
    step.classList.toggle('is-active', active);
    step.classList.remove('is-in', 'is-back');
    if (active && animate) {
      void step.offsetWidth;  // restart the entrance animation
      step.classList.add('is-in');
      step.classList.toggle('is-back', back);
    }
  });

  root.querySelectorAll('.flow-progress span').forEach((seg, i) => seg.classList.toggle('is-done', i <= index));
  const backBtn = root.querySelector('.flow-back');
  if (backBtn) backBtn.disabled = currentStep === 'event';  // stays in place, faded (see .flow-back in the CSS)
  const count = document.getElementById('flow-count');
  if (count && QUESTION_KEYS[currentStep]) {
    const total = Object.keys(QUESTION_KEYS).length;
    count.querySelector('.flow-count-num').textContent = `${index + 1}/${total}`;
    count.querySelector('.sr-only').textContent = fill(t('plan-step'), { n: index + 1, total });
  }
  if (currentStep === 'ready') renderAnswers();
}

// Below 900px only the current step takes room, so the message sits right under
// the answers; the box glides from the old step's height to the new one. (From
// 900px all steps share one grid cell and the height never changes.)
let heightAnim = null;
function glideStepsHeight(box, fromHeight) {
  if (heightAnim) heightAnim.cancel();
  heightAnim = null;
  const toHeight = box.getBoundingClientRect().height;
  if (Math.abs(toHeight - fromHeight) < 1 || typeof box.animate !== 'function') {
    box.style.overflowY = '';
    return Promise.resolve();
  }
  box.style.overflowY = 'clip';  // a taller step must not spill over the message while it grows
  const anim = box.animate(
    [{ height: `${fromHeight}px` }, { height: `${toHeight}px` }],
    { duration: 320, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
  );
  heightAnim = anim;
  return anim.finished.catch(() => {}).then(() => {
    if (heightAnim !== anim) return;
    heightAnim = null;
    box.style.overflowY = '';
  });
}

// On phones the message panel sits under the questions; once the message is
// ready, scroll just enough to bring the send button into view.
function revealSendButton() {
  const cta = document.getElementById('plan-cta');
  if (!cta) return;
  const hidden = cta.getBoundingClientRect().bottom - window.innerHeight + 20;
  if (hidden <= 0) return;
  // ...but never drag the card's top row (back, restart, progress) under the fixed header
  const top = document.querySelector('.flow-top');
  const header = document.getElementById('site-header');
  const headerH = header ? header.getBoundingClientRect().height : 0;
  const room = top ? top.getBoundingClientRect().top - (headerH + 8) : hidden;
  const by = Math.min(hidden, Math.max(0, room));
  if (by > 0) window.scrollBy({ top: by, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

// A question's top row (back, progress, skip) must not sit under the fixed header
function keepTopRowVisible() {
  const top = document.querySelector('.flow-top');
  const header = document.getElementById('site-header');
  if (!top) return;
  const above = top.getBoundingClientRect().top - ((header ? header.getBoundingClientRect().height : 0) + 8);
  if (above < 0) window.scrollBy({ top: above, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

function goToStep(step, { via = 'next' } = {}) {
  clearTimeout(advanceTimer);
  if (step === currentStep) return;
  const from = currentStep;
  const back = STEPS.indexOf(step) < STEPS.indexOf(from);
  const animate = !prefersReducedMotion();
  const box = document.querySelector('.flow-steps');
  const fromHeight = box ? box.getBoundingClientRect().height : 0;
  currentStep = step;
  if (step === 'ready') returnToReady = false;
  renderStep({ animate, back });
  // The scroll is measured on the final layout, before the glide starts, so the stamp
  // lands and the page moves in the same beat and nothing shifts afterwards
  if (step === 'ready') revealSendButton(); else keepTopRowVisible();
  if (box && animate) glideStepsHeight(box, fromHeight);
  // Screen readers hear the new question; keyboard users continue from it
  const heading = document.querySelector(`.step[data-step="${step}"] .step-q`);
  if (heading) heading.focus({ preventScroll: true });
  sendBizEvent('levyam.planner.step', { from, to: step, via });
}

function choose(btn) {
  const { group, value } = btn.dataset;
  const wasPressed = btn.getAttribute('aria-pressed') === 'true';

  if (group === 'comp') {
    // several allowed; "המשך" moves on
    btn.setAttribute('aria-pressed', String(!wasPressed));
    planner.comps = wasPressed
      ? planner.comps.filter((c) => c.value !== value)
      : [...planner.comps, { value, labelKey: btn.dataset.label }];
    refreshWhatsAppLinks({ changed: 'comp' });
    sendBizEvent('levyam.planner.select', { group, value, selected: !wasPressed });
    return;
  }

  // One answer per question: press it, release the others, move on
  document.querySelectorAll(`.choice[data-group="${group}"]`).forEach((c) => {
    c.setAttribute('aria-pressed', String(c === btn));
  });
  planner[group] = group === 'event'
    ? { value, msgKey: btn.dataset.msg, labelKey: btn.dataset.label }
    : value;
  refreshWhatsAppLinks({ changed: group });
  if (!wasPressed) sendBizEvent('levyam.planner.select', { group, value, selected: true });
  clearTimeout(advanceTimer);
  advanceTimer = setTimeout(() => goToStep(nextStep(), { via: 'answer' }), ADVANCE_MS);
}

function restartPlanner() {
  planner.event = null;
  planner.size = null;
  planner.when = null;
  planner.comps = [];
  returnToReady = false;
  document.querySelectorAll('.choice[aria-pressed="true"]').forEach((c) => c.setAttribute('aria-pressed', 'false'));
  refreshWhatsAppLinks();
  goToStep('event', { via: 'restart' });
}

function initPlanner() {
  const root = document.getElementById('planner');
  const flow = root && root.querySelector('.flow');
  if (!flow) return;
  buildMonthChoices();
  flow.hidden = false;
  root.classList.add('is-enhanced');

  root.addEventListener('click', (e) => {
    const choice = e.target.closest('.choice');
    if (choice) { choose(choice); return; }
    const edit = e.target.closest('.answer');
    if (edit) {
      returnToReady = true;
      goToStep(edit.dataset.edit, { via: 'edit' });
    } else if (e.target.closest('.flow-back')) {
      goToStep(STEPS[Math.max(STEPS.indexOf(currentStep) - 1, 0)], { via: 'back' });
    } else if (e.target.closest('.flow-skip')) {
      goToStep(nextStep(), { via: 'skip' });
    } else if (e.target.closest('.step-next')) {
      goToStep('ready', { via: 'next' });
    } else if (e.target.closest('.flow-restart')) {
      restartPlanner();
    }
  });
  renderStep();
}

// ── "מתאים במיוחד ל:" ────────────────────────────────────────
// The six types rise in one after another the first time they come into view.
// A plain list: nothing here touches the planner (Or, 2026-10-13).
function initFitRise() {
  const list = document.querySelector('.fit-list');
  if (!list || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
  list.classList.add('will-rise');
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    list.classList.add('is-risen');
    io.disconnect();
  }, { rootMargin: '0px 0px -10% 0px' });
  io.observe(list);
}

// ── Click tracking ────────────────────────────────────────────
function initTracking() {
  document.addEventListener('click', (e) => {
    const wa = e.target.closest('[data-wa]');
    if (wa) {
      sendBizEvent('levyam.whatsapp.click', {
        source: wa.dataset.wa,
        event_type: planner.event ? planner.event.value : '',
        group_size: planner.size || '',
        when: planner.when || '',
        components: planner.comps.map((c) => c.value).join(','),
        has_selection: Boolean(planner.event || planner.size || planner.when || planner.comps.length),
        planner_step: currentStep,
      });
      return;
    }
    const cta = e.target.closest('[data-track]');
    if (cta) {
      sendBizEvent('levyam.cta.click', { source: cta.dataset.track, target: cta.getAttribute('href') });
    }
  });
}

// ── Header state ──────────────────────────────────────────────
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const stamp = document.querySelector('.hero-stamp');
  let ticking = false;
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    // the header mark takes over only once the hero's stamp has slid under the header
    const headerH = header.getBoundingClientRect().height;
    header.classList.toggle('has-brand', !stamp || stamp.getBoundingClientRect().bottom < headerH);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

// ── Floating WhatsApp button ──────────────────────────────────
// Hidden while the hero's own buttons or the planner card are on screen, so the
// bubble never sits on the buttons or on the answer tiles a thumb is aiming at.
function initFloatingButton() {
  const float = document.getElementById('wa-float');
  if (!float || !('IntersectionObserver' in window)) return;
  const visible = new Set();
  const targets = [document.getElementById('planner'), document.querySelector('.hero-ctas')].filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
    });
    float.classList.toggle('is-hidden', visible.size > 0);
  }, { threshold: 0 });
  targets.forEach((el) => io.observe(el));
}

// ── Three components accordion ────────────────────────────────
// Desktop (≥1024px): the three cards open and close together, as the old packages did.
// Mobile and tablets: one at a time; opening an item closes the others.
const desktopMQ = window.matchMedia('(min-width: 1024px)');

function setPillarOpen(pillar, open) {
  const changed = pillar.classList.contains('is-open') !== open;
  pillar.classList.toggle('is-open', open);
  pillar.querySelectorAll('[aria-controls]').forEach((btn) => btn.setAttribute('aria-expanded', String(open)));
  if (changed) pillar.dispatchEvent(new CustomEvent('pillar-toggle', { detail: { open } }));
}

function syncPillarLabels() {
  document.querySelectorAll('.pillar').forEach((p) => setPillarOpen(p, p.classList.contains('is-open')));
}

// Desktop: line up the matching blocks of the three cards (subtitle, intro,
// list, note) by giving each block the height of the longest one. Heights are
// measured with the cards closed too, so opening never shifts the layout.
const PILLAR_ROWS = ['subtitle', 'intro', 'list', 'note'];
function alignPillarRows() {
  const grid = document.querySelector('.pillar-grid');
  if (!grid) return;
  PILLAR_ROWS.forEach((row) => grid.style.removeProperty(`--row-${row}`));
  if (!desktopMQ.matches) return;
  PILLAR_ROWS.forEach((row) => {
    const heights = [...grid.querySelectorAll(`[data-row="${row}"]`)].map((el) => el.getBoundingClientRect().height);
    if (heights.length) grid.style.setProperty(`--row-${row}`, `${Math.ceil(Math.max(...heights))}px`);
  });
}

// Phone: an open item above the tapped one closes instantly and the scroll is
// compensated in the same frame, so the tapped row stays exactly under the finger.
function closeOthersInPlace(pillar, pillars) {
  const head = pillar.querySelector('.pillar-head');
  const before = head.getBoundingClientRect().top;
  pillars.forEach((p) => {
    if (p === pillar || !p.classList.contains('is-open')) return;
    if (p.compareDocumentPosition(pillar) & Node.DOCUMENT_POSITION_FOLLOWING) p.classList.add('no-anim');
    setPillarOpen(p, false);
  });
  const shift = head.getBoundingClientRect().top - before;  // forces layout with the collapse applied
  if (shift) {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';  // the page scrolls smoothly by default; this must be instant
    window.scrollBy(0, shift);
    root.style.scrollBehavior = prev;
  }
  requestAnimationFrame(() => pillars.forEach((p) => p.classList.remove('no-anim')));
}

function togglePillar(pillar, { forceOpen = false, source = 'click' } = {}) {
  const wasOpen = pillar.classList.contains('is-open');
  if (forceOpen && wasOpen) return;
  const willOpen = forceOpen || !wasOpen;
  const pillars = document.querySelectorAll('.pillar');

  if (desktopMQ.matches) {
    pillars.forEach((p) => setPillarOpen(p, willOpen));
    // Closing from the bar at the foot of a tall card: the cards collapse upward, so the
    // section is brought back to the top of the screen instead of scrolling out of sight
    if (!willOpen && source === 'more') {
      document.getElementById('pillars').scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  } else {
    if (willOpen) closeOthersInPlace(pillar, pillars);
    setPillarOpen(pillar, willOpen);
  }

  sendBizEvent('levyam.pillar.toggle', {
    pillar: pillar.id,
    action: willOpen ? 'open' : 'close',
    scope: desktopMQ.matches ? 'all' : 'single',
    source,
  });
}

function initPillars() {
  const pillars = document.querySelectorAll('.pillar');
  if (!pillars.length) return;

  pillars.forEach((pillar) => {
    pillar.querySelectorAll('.pillar-head, .pillar-more').forEach((btn) => {
      btn.addEventListener('click', () => togglePillar(pillar, { source: btn.classList.contains('pillar-more') ? 'more' : 'head' }));
    });
  });

  // Header links (#space / #food / #content) open the item they point to
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (target && target.classList.contains('pillar')) togglePillar(target, { forceOpen: true, source: 'nav' });
  });

  // Landing on the page with #space / #food / #content
  const fromHash = location.hash ? document.getElementById(location.hash.slice(1)) : null;
  if (fromHash && fromHash.classList.contains('pillar')) togglePillar(fromHash, { forceOpen: true, source: 'hash' });

  // Crossing the breakpoint (e.g. rotating a tablet) keeps what the visitor opened:
  // desktop opens the whole row, phone keeps the first open item.
  desktopMQ.addEventListener('change', (e) => {
    alignPillarRows();
    const open = [...pillars].filter((p) => p.classList.contains('is-open'));
    if (!open.length) return;
    pillars.forEach((p) => setPillarOpen(p, e.matches ? true : p === open[0]));
  });

  // Re-measure the desktop rows when the width changes or the web fonts arrive
  let lastWidth = window.innerWidth;
  let alignFrame = 0;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    cancelAnimationFrame(alignFrame);
    alignFrame = requestAnimationFrame(alignPillarRows);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(alignPillarRows);
}

// ── Photo rotators (photo test, 2026-10-14) ───────────────────
// Desktop cards — התוכן (cover): the photos sweep in one after another, story bars count
// them; האוכל (deck): a fan of arches, the next dish swings to the front.
// Phones — the story rings (peek) and the living rows (rows): the photos cross-fade.
// The clock is a CSS animation (the active story bar, the front card's hold, the ring's
// drift): when it ends, the next photo comes in. CSS pauses it under the pointer and while
// the card is open; here it pauses off screen. Reduced motion: the first photo / a still fan.
const ROTATOR_CLOCKS = ['cover-bar', 'deck-hold', 'peek-drift'];
const ROTATOR_ITEMS = { cover: '.slide', deck: '.deck-card', peek: '.peek', rows: '.peek' };

const imgOf = (el) => (el.tagName === 'IMG' ? el : el.querySelector('img'));

// A photo waiting in data-src loads one step before it is shown
function loadDeferred(img) {
  if (!img.dataset.src) return;
  img.src = img.dataset.src;
  delete img.dataset.src;
}

function startRotator(rotator) {
  const type = rotator.dataset.rotator;
  const items = [...rotator.querySelectorAll(ROTATOR_ITEMS[type])];
  let current = 0;
  let bars = [];

  if (type === 'cover') {
    const track = document.createElement('span');
    track.className = 'cover-bars';
    bars = items.map(() => track.appendChild(document.createElement('span')));
    rotator.appendChild(track);
  }

  const show = (next) => {
    if (type === 'deck') {
      items.forEach((card, i) => { card.dataset.pos = String((i - next + items.length) % items.length); });
    } else {
      items.forEach((item) => item.classList.remove('is-leaving'));
      if (next !== current) items[current].classList.replace('is-current', 'is-leaving');
      items[next].classList.add('is-current');
      bars.forEach((bar, i) => {
        bar.classList.toggle('is-done', i < next);
        bar.classList.toggle('is-active', i === next);
      });
    }
    loadDeferred(imgOf(items[(next + 1) % items.length]));
    current = next;
  };

  // Moves on only once the next photo has loaded, so a slow image never comes in blank
  const advance = () => {
    const next = (current + 1) % items.length;
    const img = imgOf(items[next]);
    loadDeferred(img);
    if (img.complete) { show(next); return; }
    const go = () => show(next);
    img.addEventListener('load', go, { once: true });
    img.addEventListener('error', go, { once: true });
  };

  rotator.addEventListener('animationend', (e) => {
    if (ROTATOR_CLOCKS.includes(e.animationName)) advance();
  });
  rotator.classList.add('is-rotating');
  show(0);
}

function initRotators() {
  const rotators = document.querySelectorAll('[data-rotator]');
  if (!rotators.length || prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  // Each rotator starts the first time it is well on screen (the cover's first photo sweeps
  // in, the fan opens) and pauses whenever it scrolls away. A hidden one (the desktop cards
  // on a phone, the rings on desktop) never intersects, so it never runs.
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      target.classList.toggle('is-paused', !isIntersecting);
      if (isIntersecting && !target.classList.contains('is-rotating')) startRotator(target);
    });
  }, { threshold: 0.4 });

  rotators.forEach((rotator) => {
    rotator.classList.add('is-armed');
    io.observe(rotator);
  });
}

// ── Photo stories (phones and tablets) ────────────────────────
// The list keeps its rows; a card with photos gets a story ring in its icon's place, and
// the ring opens the photos full screen, growing out of it: story bars, the card's icon
// and title, its tagline and the main CTA. Tap the end side (left, in RTL) to go on and
// the start side to go back, hold to pause; swipe down, Escape or the phone's back button
// closes. After a card's last photo the next card's photos follow — one tour of the place.
const story = { open: false, tour: [], slides: [], bars: [], index: -1, ring: null, pushed: false, after: null };

// The photos of a card, read from its desktop markup (the one list of photos): sources,
// size, and the subject (data-focus) that every phone crop is framed around
function storyPhotos(pillar) {
  return [...pillar.querySelectorAll('.pillar-cover .slide, .deck-card img')].map((img) => {
    const srcset = img.getAttribute('srcset') || '';
    const src = img.getAttribute('src');
    return {
      src,
      srcset,
      small: srcset.split(',')[0].trim().split(' ')[0] || src,
      focus: img.dataset.focus || '',
      w: img.getAttribute('width'),
      h: img.getAttribute('height'),
    };
  });
}

// Frames a cropped photo on its subject: data-focus (x y, fractions of the photo) lands on
// data-target (x y, fractions of the frame; the centre unless set), as far as the photo's
// edges allow. Re-framed whenever a frame changes size — fonts, language, rotation, an
// option switched on.
function framePhoto(img) {
  const cw = img.clientWidth;
  const ch = img.clientHeight;
  const iw = Number(img.dataset.w || img.getAttribute('width'));
  const ih = Number(img.dataset.h || img.getAttribute('height'));
  if (!cw || !ch || !iw || !ih) return;
  const [fx, fy] = img.dataset.focus.split(' ').map(Number);
  const [tx, ty] = (img.dataset.target || '0.5 0.5').split(' ').map(Number);
  const scale = Math.max(cw / iw, ch / ih);
  const x = Math.min(0, Math.max(cw - iw * scale, tx * cw - fx * iw * scale));
  const y = Math.min(0, Math.max(ch - ih * scale, ty * ch - fy * ih * scale));
  img.style.objectPosition = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
}
const photoFrames = 'ResizeObserver' in window
  ? new ResizeObserver((entries) => entries.forEach(({ target }) => target.querySelectorAll('img[data-focus]').forEach(framePhoto)))
  : null;

function focusPhoto(img, photo, target) {
  if (!photo.focus) return;
  img.dataset.focus = photo.focus;
  img.dataset.w = photo.w;
  img.dataset.h = photo.h;
  if (target) img.dataset.target = target;
}
function observeFrames(el) {
  if (photoFrames) photoFrames.observe(el);
}

function labelStoryRings() {
  document.querySelectorAll('.pillar-story').forEach((ring) => {
    const title = ring.closest('.pillar').querySelector('.pillar-title').textContent.trim();
    ring.setAttribute('aria-label', `${t('story-open')}: ${title}`);
  });
}

function buildStoryRing(pillar, photos) {
  const heading = pillar.querySelector('.pillar-heading');
  const top = document.createElement('div');
  top.className = 'pillar-top';
  heading.before(top);
  top.append(heading);

  const ring = document.createElement('button');
  ring.type = 'button';
  ring.className = 'pillar-story';
  ring.dataset.rotator = 'peek';
  const frame = document.createElement('span');
  frame.className = 'pillar-story-photos';
  photos.forEach((photo, i) => {
    const img = document.createElement('img');
    img.className = 'peek';
    img.alt = '';
    img.decoding = 'async';
    if (i === 0) {
      img.loading = 'lazy';
      img.src = photo.small;
    } else {
      img.dataset.src = photo.small;
    }
    focusPhoto(img, photo);
    frame.append(img);
  });
  ring.append(frame);
  observeFrames(frame);
  top.append(ring);
  pillar.classList.add('has-story');
  return ring;
}

function loadStorySlide(index) {
  const slide = story.slides[index];
  if (!slide || slide.dataset.loaded) return;
  const { photo } = story.tour[index];
  const [fill, img] = slide.children;
  fill.src = photo.small;   // the ring's small photo, already cached: the blur needs no more
  img.sizes = '100vw';
  img.srcset = photo.srcset;
  img.src = photo.src;
  slide.dataset.loaded = '1';
}

function showStory(index) {
  if (index >= story.tour.length) { closeStory(); return; }
  const viewer = document.getElementById('story');
  const next = Math.max(0, index);
  const prev = story.tour[story.index];
  const step = story.tour[next];
  story.index = next;
  story.slides.forEach((slide, i) => slide.classList.toggle('is-current', i === next));
  loadStorySlide(next);
  loadStorySlide(next + 1);

  // A new card: its icon, title and tagline, and one bar per photo
  if (!prev || prev.pillar !== step.pillar) {
    viewer.querySelector('.story-icon img').src = step.pillar.dataset.storyIcon;
    viewer.querySelector('.story-title').textContent = step.pillar.querySelector('.pillar-title').textContent.trim();
    viewer.querySelector('.story-tagline').textContent = step.pillar.querySelector('.pillar-subtitle').textContent.trim();
    const track = viewer.querySelector('.story-bars');
    track.replaceChildren(...Array.from({ length: step.count }, () => document.createElement('span')));
    story.bars = [...track.children];
  }
  story.bars.forEach((bar, i) => {
    bar.classList.toggle('is-done', i < step.i);
    bar.classList.remove('is-active');
  });
  const active = story.bars[step.i];
  void active.offsetWidth;   // restarts the bar when the same photo is shown again
  active.classList.add('is-active');

  // The clock waits for the photo
  const img = story.slides[next].children[1];
  viewer.classList.toggle('is-waiting', !img.complete);
  if (!img.complete) {
    const ready = () => { if (story.index === next) viewer.classList.remove('is-waiting'); };
    img.addEventListener('load', ready, { once: true });
    img.addEventListener('error', ready, { once: true });
  }
}

function openStory(pillar, ring) {
  if (story.open) return;
  const viewer = document.getElementById('story');
  story.tour = [];
  document.querySelectorAll('.pillar.has-story').forEach((p) => {
    const photos = storyPhotos(p);
    photos.forEach((photo, i) => story.tour.push({ pillar: p, photo, i, count: photos.length }));
  });
  story.slides = story.tour.map(() => {
    const slide = document.createElement('div');
    slide.className = 'story-slide';
    const fill = document.createElement('img');
    fill.className = 'story-fill';
    fill.alt = '';
    const img = document.createElement('img');
    img.className = 'story-photo';
    img.alt = '';
    img.decoding = 'async';
    slide.append(fill, img);
    return slide;
  });
  viewer.querySelector('.story-slides').replaceChildren(...story.slides);

  // The reveal grows out of the ring
  const box = ring.getBoundingClientRect();
  const cx = box.left + box.width / 2;
  const cy = box.top + box.height / 2;
  viewer.style.setProperty('--ox', `${cx}px`);
  viewer.style.setProperty('--oy', `${cy}px`);
  viewer.style.setProperty('--or', `${Math.ceil(Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)))}px`);

  Object.assign(story, { open: true, ring, index: -1, after: null });
  viewer.hidden = false;
  document.documentElement.classList.add('story-open');
  // The phone's back button closes the stories instead of leaving the page
  try {
    history.pushState({ story: true }, '');
    story.pushed = true;
  } catch (_) {
    story.pushed = false;
  }
  showStory(story.tour.findIndex((step) => step.pillar === pillar));
  viewer.querySelector('.story-close').focus({ preventScroll: true });
  sendBizEvent('levyam.story.open', { pillar: pillar.id });
}

// Closing goes through history when the stories added an entry; popstate finishes it
function closeStory(after) {
  if (!story.open) return;
  story.after = after || null;
  if (story.pushed) {
    story.pushed = false;
    history.back();
    return;
  }
  finishStory();
}

function finishStory() {
  if (!story.open) return;
  const viewer = document.getElementById('story');
  story.open = false;
  const step = story.tour[story.index];
  sendBizEvent('levyam.story.close', {
    pillar: step ? step.pillar.id : '',
    photo: story.index + 1,
    photos: story.tour.length,
  });
  const done = () => {
    viewer.hidden = true;
    viewer.classList.remove('is-closing', 'is-held', 'is-waiting', 'is-dragging');
    viewer.querySelector('.story-slides').replaceChildren();
    document.documentElement.classList.remove('story-open');
    if (story.after) story.after();
    else story.ring.focus({ preventScroll: true });
  };
  if (prefersReducedMotion()) { done(); return; }
  viewer.classList.add('is-closing');
  const end = (e) => {
    if (e.target !== viewer) return;
    viewer.removeEventListener('animationend', end);
    done();
  };
  viewer.addEventListener('animationend', end);
}

function initStories() {
  const viewer = document.getElementById('story');
  if (!viewer) return;
  document.querySelectorAll('.pillar').forEach((pillar) => {
    const photos = storyPhotos(pillar);
    if (!photos.length) return;
    const ring = buildStoryRing(pillar, photos);
    ring.addEventListener('click', () => openStory(pillar, ring));
  });

  // The active bar is the clock; after the last photo of the tour the stories close
  viewer.addEventListener('animationend', (e) => {
    if (story.open && e.animationName === 'story-bar') showStory(story.index + 1);
  });
  viewer.querySelector('.story-close').addEventListener('click', () => closeStory());
  viewer.querySelector('.story-cta').addEventListener('click', (e) => {
    e.preventDefault();
    closeStory(() => document.getElementById('plan').scrollIntoView({ block: 'start' }));
  });

  // Tap to move, hold to pause, drag down to close
  const stage = viewer.querySelector('.story-stage');
  let press = null;
  let holdTimer = 0;
  let swallowClick = false;
  viewer.querySelector('.story-zone-prev').addEventListener('click', () => {
    if (swallowClick) { swallowClick = false; return; }
    showStory(story.index - 1);
  });
  viewer.querySelector('.story-zone-next').addEventListener('click', () => {
    if (swallowClick) { swallowClick = false; return; }
    showStory(story.index + 1);
  });
  stage.addEventListener('pointerdown', (e) => {
    swallowClick = false;
    if (e.target.closest('.story-close, .story-cta')) return;
    press = { x: e.clientX, y: e.clientY, held: false, dragged: false };
    holdTimer = setTimeout(() => {
      if (!press) return;
      press.held = true;
      viewer.classList.add('is-held');
    }, 220);
  });
  stage.addEventListener('pointermove', (e) => {
    if (!press) return;
    const dy = e.clientY - press.y;
    if (!press.dragged && dy > 12 && dy > Math.abs(e.clientX - press.x)) {
      press.dragged = true;
      clearTimeout(holdTimer);
      viewer.classList.add('is-dragging', 'is-held');
    }
    if (!press.dragged) return;
    const drag = Math.max(0, dy);
    stage.style.setProperty('--drag', `${drag}px`);
    stage.style.setProperty('--drag-scale', String(Math.min(drag / 1500, 0.12)));
  });
  const release = (e) => {
    if (!press) return;
    clearTimeout(holdTimer);
    const { held, dragged } = press;
    const dy = e.clientY - press.y;
    press = null;
    swallowClick = held || dragged;
    viewer.classList.remove('is-held', 'is-dragging');
    stage.style.removeProperty('--drag');
    stage.style.removeProperty('--drag-scale');
    if (dragged && dy > 100) closeStory();
  };
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);

  // Keyboard: Escape closes, the arrows move (RTL: left is forward), Tab stays inside
  document.addEventListener('keydown', (e) => {
    if (!story.open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeStory();
    } else if (e.key === 'ArrowLeft') {
      showStory(story.index + 1);
    } else if (e.key === 'ArrowRight') {
      showStory(story.index - 1);
    } else if (e.key === 'Tab') {
      const stops = [...viewer.querySelectorAll('button, a[href]')];
      const first = stops[0];
      const last = stops[stops.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener('popstate', () => {
    if (!story.open) return;
    story.pushed = false;
    finishStory();
  });
  // Rotating a tablet into the desktop layout: the cards take over
  desktopMQ.addEventListener('change', (e) => { if (e.matches) closeStory(); });
}

// ── Phone photo options (photo test, 2026-10-14) ──────────────
// Five ways to show a card's photos on phones and tablets, all keeping the list's rows as
// they were: 1 stories (above), 2 living rows, 3 a gallery when a row opens, 4 a flick
// deck at the end of an open row, 5 a ribbon between the title and the list — and 6, rows and deck
// together. html[data-phone] lists the ones on; the test switcher (localhost or ?phone,
// ?phone=1…6) changes it live.
const PHONE_MODES = [
  ['stories', 'סטוריז'],
  ['rows', 'שורות חיות'],
  ['reel', 'גלריה בפתיחה'],
  ['stack', 'חפיסה'],
  ['ribbon', 'סרט'],
  ['rows stack', 'שורות + חפיסה'],   // Or's pick (2026-10-14): living rows closed, the deck at the end of an open row
];
const PHONE_DEFAULT = 'rows stack';

function photoImg(photo, className, sizes) {
  const img = document.createElement('img');
  img.className = className;
  img.alt = '';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.sizes = sizes;
  img.srcset = photo.srcset;
  img.src = photo.src;
  return img;
}

// 2 · Living rows: the photos behind the chevron (cross-faded by the rows rotator)
function buildRowPhotos(pillar, photos) {
  const layer = document.createElement('span');
  layer.className = 'row-photos';
  layer.setAttribute('aria-hidden', 'true');
  layer.dataset.rotator = 'rows';
  photos.forEach((photo, i) => {
    const img = document.createElement('img');
    img.className = 'peek';
    img.alt = '';
    img.decoding = 'async';
    if (i === 0) {
      img.loading = 'lazy';
      img.src = photo.small;
    } else {
      img.dataset.src = photo.small;
    }
    // The window fades toward the text, so the subject sits in its clear outer part
    focusPhoto(img, photo, '0.36 0.5');
    layer.append(img);
  });
  pillar.querySelector('.pillar-head').prepend(layer);
  observeFrames(layer);
}

// 3 · Gallery on opening: a swipeable strip at the top of the open row
function buildReel(pillar, photos) {
  const reel = document.createElement('div');
  reel.className = 'pillar-reel';
  reel.setAttribute('aria-hidden', 'true');
  const track = document.createElement('div');
  track.className = 'reel-track';
  photos.forEach((photo) => {
    const img = photoImg(photo, 'reel-item', '(min-width: 600px) 320px, 72vw');
    focusPhoto(img, photo);
    track.append(img);
  });
  const dots = document.createElement('div');
  dots.className = 'reel-dots';
  photos.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.className = 'is-active';
    dots.append(dot);
  });
  reel.append(track, dots);
  pillar.querySelector('.pillar-body').prepend(reel);
  observeFrames(track);

  const items = [...track.children];
  let index = 0;
  let timer = 0;
  let touched = false;
  const step = () => (items[1] ? Math.abs(items[1].offsetLeft - items[0].offsetLeft) : track.clientWidth);
  track.addEventListener('scroll', () => {
    index = Math.min(items.length - 1, Math.round(Math.abs(track.scrollLeft) / step()));
    [...dots.children].forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  }, { passive: true });
  // Glides on by itself until a finger touches it (RTL scrolls toward negative scrollLeft)
  const stop = () => { touched = true; clearInterval(timer); };
  ['pointerdown', 'touchstart', 'wheel'].forEach((type) => track.addEventListener(type, stop, { passive: true }));
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
  const dir = () => (getComputedStyle(track).direction === 'rtl' ? -1 : 1);
  new IntersectionObserver(([entry]) => {
    clearInterval(timer);
    if (!entry.isIntersecting || touched) return;
    timer = setInterval(() => {
      track.scrollTo({ left: dir() * ((index + 1) % items.length) * step(), behavior: 'smooth' });
    }, 3200);
  }, { threshold: 0.6 }).observe(reel);
}

// Videos wait in data-src (only the poster loads) until they are about to play
function loadVideo(video) {
  if (!video.dataset.src) return;
  video.src = video.dataset.src;
  delete video.dataset.src;
}
function playVideo(video) {
  loadVideo(video);
  const playing = video.play();
  if (playing && typeof playing.catch === 'function') playing.catch(() => { /* autoplay refused — the poster stays */ });
}

// A muted video element for the phone options, from one in the Space film
function cloneFilm(source, loop) {
  const video = document.createElement('video');
  video.muted = true;
  video.loop = loop;
  video.playsInline = true;
  video.preload = 'none';
  video.poster = source.getAttribute('poster');
  video.dataset.src = source.dataset.src || source.getAttribute('src');
  return video;
}

// 4 · Flick deck: a pile of polaroids at the end of the open row's text. A card holds a photo
// or, for the Space film, a chapter video: the top card plays its chapter, and when it ends
// the next card is dealt.
function buildStack(pillar, media) {
  const stack = document.createElement('div');
  stack.className = 'pillar-stack';
  stack.setAttribute('aria-hidden', 'true');
  const isFilm = media[0].tagName === 'VIDEO';
  let cards = media.map((item, i) => {
    const card = document.createElement('div');
    card.className = 'stack-card';
    card.dataset.depth = String(i);
    card.append(item);
    return card;
  });
  const inPhotoOrder = [...cards];
  stack.append(...cards);
  pillar.querySelector('.pillar-body').append(stack);
  observeFrames(stack);

  let busy = false;
  let timer = 0;
  let drag = null;
  let onScreen = false;
  let touched = false;
  const reduced = prefersReducedMotion();
  // A film deck: only the top card plays (and the next one loads); the rest show posters
  const syncFilm = () => {
    if (!isFilm) return;
    cards.forEach((card, depth) => {
      const video = card.firstChild;
      if (depth === 0 && onScreen && !reduced) playVideo(video);
      else video.pause();
      if (depth === 1 && onScreen) loadVideo(video);
    });
  };
  const layout = () => {
    cards.forEach((card, depth) => { card.dataset.depth = String(depth); });
    syncFilm();
  };
  const reset = (card) => ['--x', '--y', '--r'].forEach((prop) => card.style.removeProperty(prop));
  // The top card flies off (RTL: forward is to the left) and slips to the back of the pile
  const fly = (dirX) => {
    if (busy) return;
    busy = true;
    const top = cards[0];
    top.classList.remove('is-dragging');
    top.classList.add('is-flying');
    top.style.setProperty('--x', `${dirX * 150}%`);
    top.style.setProperty('--y', '-8%');
    top.style.setProperty('--r', `${dirX * 26}deg`);
    setTimeout(() => {
      cards = [...cards.slice(1), top];
      if (isFilm) top.firstChild.currentTime = 0;
      layout();
      top.classList.remove('is-flying');
      reset(top);
      busy = false;
    }, 450);
  };
  const stop = () => clearInterval(timer);

  // A chapter that ends deals the next one — or, once a finger has taken over, plays again
  if (isFilm) {
    cards.forEach((card) => card.firstChild.addEventListener('ended', () => {
      if (cards[0] !== card) return;
      if (touched) playVideo(card.firstChild);
      else fly(-1);
    }));
  }

  // Opening the row (living rows on): the photo the row was showing is on top of the pile.
  // The panel is still unfolding, so the pile re-stacks at once, without motion.
  pillar.addEventListener('pillar-toggle', (e) => {
    const shown = pillar.querySelector('.row-photos .peek.is-current');
    if (!e.detail.open || busy || !shown) return;
    const top = inPhotoOrder[[...shown.parentElement.children].indexOf(shown)];
    const at = cards.indexOf(top);
    if (at <= 0) return;
    cards = [...cards.slice(at), ...cards.slice(0, at)];
    stack.classList.add('is-settling');
    layout();
    void stack.offsetWidth;
    stack.classList.remove('is-settling');
  });

  stack.addEventListener('pointerdown', (e) => {
    touched = true;
    if (busy || !cards[0].contains(e.target)) return;
    stop();
    drag = { x: e.clientX, y: e.clientY, dx: 0, active: false };
  });
  stack.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (!drag.active) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) { drag = null; return; }   // a vertical swipe scrolls the page
      drag.active = true;
      cards[0].classList.add('is-dragging');
      cards[0].setPointerCapture(e.pointerId);
    }
    drag.dx = dx;
    cards[0].style.setProperty('--x', `${dx}px`);
    cards[0].style.setProperty('--r', `${-2 + dx * 0.08}deg`);
  });
  stack.addEventListener('pointerup', () => {
    if (!drag) return;
    const { dx, active } = drag;
    drag = null;
    if (!active) { fly(-1); return; }   // a tap deals the next card
    if (Math.abs(dx) > 70) { fly(Math.sign(dx)); return; }
    cards[0].classList.remove('is-dragging');
    reset(cards[0]);
  });
  stack.addEventListener('pointercancel', () => {
    if (!drag) return;
    drag = null;
    cards[0].classList.remove('is-dragging');
    reset(cards[0]);
  });
  // On screen: photos deal themselves every few seconds until a finger touches the pile;
  // a film plays its top chapter (its end deals the next)
  if (reduced || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    stop();
    syncFilm();
    if (onScreen && !touched && !isFilm) timer = setInterval(() => fly(-1), 3400);
  }, { threshold: 0.6 }).observe(stack);
}

// 2 · Living rows, for the Space film: the title film loops in the row's window while the
// row is closed and on screen
function buildRowVideo(pillar, film) {
  const layer = document.createElement('span');
  layer.className = 'row-video';
  layer.setAttribute('aria-hidden', 'true');
  const video = cloneFilm(film.querySelector('.film-title'), true);
  layer.append(video);
  pillar.querySelector('.pillar-head').prepend(layer);
  pillar.classList.add('has-film');
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
  let onScreen = false;
  const sync = () => {
    if (onScreen && !pillar.classList.contains('is-open')) playVideo(video);
    else video.pause();
  };
  pillar.addEventListener('pillar-toggle', sync);
  new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); }, { threshold: 0.3 }).observe(layer);
}

// Desktop: the Space card's arch plays the title film while closed; opened, its three
// chapters, one after another (each one's end brings the next)
function initFilms() {
  document.querySelectorAll('.pillar-film').forEach((film) => {
    const pillar = film.closest('.pillar');
    const title = film.querySelector('.film-title');
    const chapters = [...film.querySelectorAll('.film-chapter')];
    let current = 0;
    let onScreen = false;
    const sync = () => {
      const open = pillar.classList.contains('is-open');
      film.classList.toggle('is-chapters', open);
      chapters.forEach((chapter, i) => chapter.classList.toggle('is-current', i === current));
      [title, ...chapters].forEach((video) => video.pause());
      if (!onScreen || prefersReducedMotion()) return;
      if (open) {
        playVideo(chapters[current]);
        loadVideo(chapters[(current + 1) % chapters.length]);
      } else {
        playVideo(title);
      }
    };
    chapters.forEach((chapter, i) => chapter.addEventListener('ended', () => {
      current = (i + 1) % chapters.length;
      chapters[current].currentTime = 0;
      sync();
    }));
    pillar.addEventListener('pillar-toggle', sync);
    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); }, { threshold: 0.4 }).observe(film);
  });
}

// 5 · Ribbon: every photo as a little arch, in one band between the title and the list
function buildRibbon(lists) {
  const anchor = document.querySelector('.pillar-grid');
  if (!anchor || !lists.length) return;
  // Interleave the cards' photos, so a dish follows a moment
  const photos = [];
  for (let i = 0; i < Math.max(...lists.map((l) => l.length)); i++) {
    lists.forEach((list) => { if (list[i]) photos.push(list[i]); });
  }
  const ribbon = document.createElement('div');
  ribbon.className = 'photo-ribbon';
  ribbon.setAttribute('aria-hidden', 'true');
  const track = document.createElement('div');
  track.className = 'ribbon-track';
  // Two copies: when the first has slid one set along, the second stands exactly in its place
  [0, 1].forEach(() => photos.forEach((photo) => {
    const tile = document.createElement('span');
    tile.className = 'ribbon-tile';
    const img = document.createElement('img');
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = photo.small;
    focusPhoto(img, photo);
    tile.append(img);
    track.append(tile);
  }));
  ribbon.append(track);
  anchor.before(ribbon);
  observeFrames(track);

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
  // Drifts about 24px a second; scrolling the page pushes it along (and back)
  let offset = 0;
  let last = 0;
  let lastY = 0;
  let frame = 0;
  const tick = (now) => {
    const dt = last ? Math.min(now - last, 64) : 16;
    last = now;
    const y = window.scrollY;
    const set = track.scrollWidth / 2;
    offset += dt * 0.024 + (y - lastY) * 0.45;
    lastY = y;
    if (set) offset = ((offset % set) + set) % set;
    track.style.transform = `translateX(${offset}px)`;
    frame = requestAnimationFrame(tick);
  };
  new IntersectionObserver(([entry]) => {
    cancelAnimationFrame(frame);
    if (!entry.isIntersecting) return;
    last = 0;
    lastY = window.scrollY;
    frame = requestAnimationFrame(tick);
  }).observe(ribbon);
}

function initPhoneOptions() {
  const pillars = [...document.querySelectorAll('.pillar.has-story')];
  if (!pillars.length) return;
  const lists = pillars.map((pillar) => {
    const photos = storyPhotos(pillar);
    buildRowPhotos(pillar, photos);
    buildReel(pillar, photos);
    buildStack(pillar, photos.map((photo) => {
      const img = photoImg(photo, '', '(min-width: 600px) 250px, 64vw');
      focusPhoto(img, photo);
      return img;
    }));
    return photos;
  });
  buildRibbon(lists);
  // The Space film: its title film in the living row, its chapters in the deck
  document.querySelectorAll('.pillar-film').forEach((film) => {
    const pillar = film.closest('.pillar');
    buildRowVideo(pillar, film);
    buildStack(pillar, [...film.querySelectorAll('.film-chapter')].map((chapter) => cloneFilm(chapter, false)));
  });

  // The option: rows + deck for visitors; on a test URL, ?phone=<1–6>, else the last one picked
  const ids = PHONE_MODES.map(([id]) => id);
  const params = new URLSearchParams(location.search);
  const isTest = params.has('phone') || ['localhost', '127.0.0.1'].includes(location.hostname);
  let mode = PHONE_DEFAULT;
  if (isTest) {
    try {
      const saved = localStorage.getItem('phoneMode2');
      if (ids.includes(saved)) mode = saved;
    } catch (_) { /* storage unavailable */ }
    const asked = params.get('phone');
    if (ids.includes(asked)) mode = asked;
    else if (ids[Number(asked) - 1]) mode = ids[Number(asked) - 1];
  }
  document.documentElement.dataset.phone = mode;
  if (!isTest) return;

  // The test switcher: shows while the components section is on screen
  const bar = document.createElement('div');
  bar.className = 'phone-switch is-away';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'אפשרויות תמונות לטלפון (בדיקה)');
  const name = document.createElement('span');
  name.className = 'phone-switch-name';
  bar.append(name);
  const buttons = PHONE_MODES.map(([id, label], i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = String(i + 1);
    btn.setAttribute('aria-label', label);
    btn.addEventListener('click', () => select(id));
    bar.append(btn);
    return btn;
  });
  const select = (id) => {
    document.documentElement.dataset.phone = id;
    try { localStorage.setItem('phoneMode2', id); } catch (_) { /* ignore */ }
    name.textContent = PHONE_MODES.find(([key]) => key === id)[1];
    buttons.forEach((btn, i) => btn.setAttribute('aria-pressed', String(ids[i] === id)));
  };
  select(mode);
  document.body.append(bar);
  const section = document.getElementById('pillars');
  if (section && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => bar.classList.toggle('is-away', !entry.isIntersecting)).observe(section);
  } else {
    bar.classList.remove('is-away');
  }
}

// ── Hero video ────────────────────────────────────────────────
// Play only while the hero is on screen; respect reduced-motion.
function initHeroVideo() {
  const video = document.getElementById('hero-video');
  const hero = document.getElementById('hero');
  if (!video || !hero) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.removeAttribute('autoplay');
    video.pause();
    return;
  }
  if (!('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => { /* autoplay blocked — poster shows */ });
    } else {
      video.pause();
    }
  }, { threshold: 0.1 });
  io.observe(hero);
}

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLangSwitch();
  initPlanner();
  initFitRise();
  initTracking();
  initHeader();
  initFloatingButton();
  initHeroVideo();
  initPillars();
  initStories();
  initPhoneOptions();
  initFilms();
  initRotators();
  applyLanguage(currentLang);
});
