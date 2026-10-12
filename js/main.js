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

    'hero-eyebrow': 'לב ים · כפר הדייגים, ג׳יסר א-זרקא',
    'hero-h1a': 'יוצאים מהשגרה.',
    'hero-h1b': 'נפגשים אחרת.',
    'hero-sub': 'ימי צוות, מפגשי הנהלה ואירועי חברה במקום קצת אחר.',
    'hero-lead': 'בכפר הדייגים ג׳יסר א-זרקא, בין הים לטבע, מחכה לכם לב ים - מרחב אירוח ייחודי המשלב נוף עוצר נשימה, אוכל מקומי, תוכן מעשיר ומפגש אנושי בגובה העיניים.',
    'cta-plan': 'בואו נתכנן את היום שלכם',
    'hero-cta-discover': 'גלו את לב ים',

    'fact-distance': 'מרחק מתל אביב',
    'fact-size': 'גודל קבוצה',
    'fact-spaces': 'חללים',
    'fact-parking': 'חניה ונגישות',

    'intro-p1': 'מקום לצאת מהשגרה, לפתוח את הראש, להתחבר מחדש ולחזור עם אנרגיה ורעיונות חדשים.',
    'intro-p2': 'בין אם אתם מתכננים יום גיבוש, מפגש חשיבה, סדנה או אירוע חברה - ניצור יחד חוויה המותאמת לאנשים ולמטרות שלכם.',
    'why-h2': "למה זה כל כך חשוב להגיע ל'לב ים', כפר הדייגים, ג'יסר א זרקא?",
    'why-p1': 'האמת? כי זה מה שכל מי שמגיע לפה אומר.',
    'why-p2': 'במרחב הקסום מול הים, בכפר דייגים העתיק בלב הטבע הפראי של מישור החוף, זורמת אנרגיה של אותנטיות פשוטה לצד פונקציונליות בריאה – שמייצרים תחושה של קרבה ותום, שפיות וביטחון.',
    'why-p3': 'אנחנו מקדשים את הפשוט, מעריכים את הטבעי, מכירים בסדוק ומוקירים על הבלתי שלם, וכל מי שמעז להגיע לפה – גם אם לצד הפחד והספק – זוכה לנווט דרך האתגרים העסקיים, המורכבות הרגשית ומשבר האמון – אל עבר מחוזות ההשראה, הריפוי וההעצמה.',
    'why-quote': 'אנחנו מזמינים אתכם להיות חלק מהנבחרת שבוחרת בשפיות הזו.',
    'testi-h2': 'מה אומרים מי שכבר היו כאן',

    'pillars-h2': 'שלושה מרכיבים. אינספור אפשרויות.',
    // Labels of the desktop accordion bar, reused from the old packages ("מידע נוסף ↓" / "סגור ↑")
    'pillar-more': 'מידע נוסף',
    'pillar-less': 'סגור',
    'p1-h3': 'משנים אווירה. פותחים את הראש.',
    'p1-p1': 'המרחב משלב פינות ישיבה נעימות, אזורי התכנסות ואווירה אינטימית ובלתי פורמלית, שמאפשרת להאט, להתרכז ולהיפגש באמת.',
    'p1-p2': 'בין אם מדובר בישיבת הנהלה, סיעור מוחות, יום צוות או מפגש מקצועי, כאן תמצאו סביבה שמעודדת יצירתיות, שיח פתוח וחיבור אנושי.',
    'p1-list-title': 'מה מחכה לכם?',
    'p1-li1': 'מרחבי התכנסות ועבודה לצוותים ולקבוצות',
    'p1-li2': 'פינות ישיבה באווירה נינוחה',
    'p1-li3': 'טבע, ים ונוף פתוח',
    'p1-li4': 'אפשרות לשילוב מפגשים מקצועיים וזמן חופשי',
    'p1-rent-title': 'איך אפשר לשכור?',
    'p1-rent1': 'חלק מהמרחב',
    'p1-rent2': 'החלל הפנימי בלבד',
    'p1-rent3': 'המרפסת הצופה לים בלבד',
    'p1-rent4': 'המתחם כולו',
    'p2-h3': 'טעמים מקומיים. אירוח מכל הלב.',
    'p2-p1': 'האוכל הוא חלק מהחוויה והבחירה היא שלכם.',
    'p2-list-title': 'מה אפשר לשלב?',
    'p2-li1': 'קבלת פנים עם תה מסורתי',
    'p2-li2': 'מאפי בוקר מהכפר ופירות העונה',
    'p2-li3': 'ארוחות צהריים מקומיות, עשירות ומגוונות',
    'p2-li4': 'אירוח שף לחוויה קולינרית ייחודית',
    'p2-li5': 'אפשרות להביא קייטרינג חיצוני מטעמכם',
    'p2-close': 'התפריט והאירוח מותאמים לאופי המפגש ולצורכי הקבוצה.',
    'p3-h3': 'חוויות שמחברות בין אנשים.',
    'p3-p1': 'בלב ים תוכלו לשלב תוכן שמוסיף עומק, עניין והנאה ליום שלכם - מפעילויות תנועה ורוגע ועד חוויות מקומיות ומפגשים מעוררי השראה.',
    'p3-list-title': 'מה אפשר לשלב?',
    'p3-li1': 'יוגה, תנועה ומדיטציה',
    'p3-li2': 'פעילויות בטבע ובים',
    'p3-li3': 'סיורים והיכרות עם כפר הדייגים',
    'p3-li4': 'מפגשים עם אנשים וסיפורים מקומיים',
    'p3-li5': 'סדנאות חווייתיות ותוכן מותאם לקבוצה',
    'p3-li6': 'זמן לעבודה משותפת, חשיבה ויצירה',
    'p3-close': 'אפשר להגיע עם תוכן משלכם, לבחור מתוך מגוון הפעילויות שלנו או ליצור יחד תוכנית המשלבת עבודה, השראה והנאה.',

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
    'fit-cta': 'בואו ליצור את היום שלכם',

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

    'hero-eyebrow': 'لب يام · قرية الصيادين، جسر الزرقاء',
    'hero-h1a': 'نخرج من الروتين.',
    'hero-h1b': 'نلتقي بشكل مختلف.',
    'hero-sub': 'أيام فريق، لقاءات إدارة وفعاليات شركات في مكان مختلف قليلاً.',
    'hero-lead': 'في قرية الصيادين جسر الزرقاء، بين البحر والطبيعة، ينتظركم لب يام – مساحة ضيافة فريدة تجمع بين إطلالة خلابة، طعام محلي، محتوى غني ولقاء إنساني حقيقي.',
    'cta-plan': 'لنخطّط يومكم معاً',
    'hero-cta-discover': 'اكتشفوا لب يام',

    'fact-distance': 'المسافة من تل أبيب',
    'fact-size': 'حجم المجموعة',
    'fact-spaces': 'المساحات',
    'fact-parking': 'مواقف ووصول',

    'intro-p1': 'مكان للخروج من الروتين، لفتح الذهن، لإعادة التواصل والعودة بطاقة وأفكار جديدة.',
    'intro-p2': 'سواء كنتم تخططون ليوم تعزيز فريق، لقاء عصف ذهني، ورشة أو فعالية شركة – سنصنع معاً تجربة مصممة لأشخاصكم وأهدافكم.',
    'why-h2': 'لماذا من المهم جداً الوصول إلى "لب يام"، قرية الصيادين، جسر الزرقاء؟',
    'why-p1': 'الحقيقة؟ لأن هذا ما يقوله كل من يصل إلى هنا.',
    'why-p2': 'في هذه المساحة الساحرة أمام البحر، في قرية صيادين عريقة في قلب الطبيعة البرية للسهل الساحلي، تتدفق طاقة من الأصالة البسيطة إلى جانب عملية صحية – تولّد شعوراً بالقرب والبراءة، بالصفاء والأمان.',
    'why-p3': 'نحن نقدّس البسيط، نقدّر الطبيعي، نعترف بالمتصدّع ونحتفي بغير المكتمل، وكل من يجرؤ على الوصول إلى هنا – حتى مع الخوف والشك – يحظى بأن يبحر عبر التحديات التجارية، التعقيد العاطفي وأزمة الثقة – نحو آفاق الإلهام، الشفاء والتمكين.',
    'why-quote': 'ندعوكم لتكونوا جزءاً من المنتخب الذي يختار هذا الصفاء.',
    'testi-h2': 'ماذا يقول من كانوا هنا',

    'pillars-h2': 'ثلاثة مكوّنات. إمكانيات لا تُحصى.',
    'pillar-more': 'مزيد من المعلومات',
    'pillar-less': 'إغلاق',
    'p1-h3': 'نغيّر الأجواء. نفتح الذهن.',
    'p1-p1': 'يجمع المكان بين زوايا جلوس مريحة، مناطق تجمّع وأجواء حميمة وغير رسمية، تتيح التمهّل، التركيز واللقاء الحقيقي.',
    'p1-p2': 'سواء كان الأمر اجتماع إدارة، عصف ذهني، يوم فريق أو لقاء مهني، ستجدون هنا بيئة تشجع الإبداع، الحوار المفتوح والتواصل الإنساني.',
    'p1-list-title': 'ما الذي ينتظركم؟',
    'p1-li1': 'مساحات تجمّع وعمل للفرق والمجموعات',
    'p1-li2': 'زوايا جلوس بأجواء هادئة',
    'p1-li3': 'طبيعة، بحر وإطلالة مفتوحة',
    'p1-li4': 'إمكانية الجمع بين لقاءات مهنية ووقت حر',
    'p1-rent-title': 'كيف يمكن الاستئجار؟',
    'p1-rent1': 'جزء من المكان',
    'p1-rent2': 'القاعة الداخلية فقط',
    'p1-rent3': 'الشرفة المطلة على البحر فقط',
    'p1-rent4': 'المجمّع بأكمله',
    'p2-h3': 'نكهات محلية. ضيافة من القلب.',
    'p2-p1': 'الطعام جزء من التجربة والخيار لكم.',
    'p2-list-title': 'ما الذي يمكن دمجه؟',
    'p2-li1': 'استقبال بشاي تقليدي',
    'p2-li2': 'معجنات صباحية من القرية وفواكه الموسم',
    'p2-li3': 'وجبات غداء محلية، غنية ومتنوعة',
    'p2-li4': 'استضافة شيف لتجربة طهي فريدة',
    'p2-li5': 'إمكانية إحضار تموين خارجي من طرفكم',
    'p2-close': 'تُصمَّم قائمة الطعام والضيافة وفق طابع اللقاء واحتياجات المجموعة.',
    'p3-h3': 'تجارب تربط بين الناس.',
    'p3-p1': 'في لب يام يمكنكم دمج محتوى يضيف عمقاً، اهتماماً ومتعة ليومكم – من أنشطة الحركة والاسترخاء إلى تجارب محلية ولقاءات ملهمة.',
    'p3-list-title': 'ما الذي يمكن دمجه؟',
    'p3-li1': 'يوغا، حركة وتأمل',
    'p3-li2': 'أنشطة في الطبيعة والبحر',
    'p3-li3': 'جولات وتعرّف على قرية الصيادين',
    'p3-li4': 'لقاءات مع أشخاص وقصص محلية',
    'p3-li5': 'ورشات تجريبية ومحتوى مصمم للمجموعة',
    'p3-li6': 'وقت للعمل المشترك، التفكير والإبداع',
    'p3-close': 'يمكنكم القدوم بمحتوى خاص بكم، الاختيار من بين أنشطتنا المتنوعة أو أن نبني معاً برنامجاً يجمع بين العمل، الإلهام والمتعة.',

    'fit-h2': 'يوم واحد. مصمّم لكم بالضبط.',
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
    'fit-cta': 'لنصنع يومكم معاً',

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
    'size-15-30': '15-30 شخصاً',
    'size-30-50': '30-50 شخصاً',
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

function composePreviewHtml(changed) {
  return composeParts()
    .map((p) => {
      if (!p.mark) return escapeHtml(p.text);
      return `<mark class="sel${p.mark === changed ? ' is-new' : ''}">${escapeHtml(p.text)}</mark>`;
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
  if (hidden > 0) window.scrollBy({ top: hidden, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
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
  const settled = box && animate ? glideStepsHeight(box, fromHeight) : Promise.resolve();
  // Screen readers hear the new question; keyboard users continue from it
  const heading = document.querySelector(`.step[data-step="${step}"] .step-q`);
  if (heading) heading.focus({ preventScroll: true });
  if (step === 'ready') settled.then(revealSendButton);
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
  let ticking = false;
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

// ── Floating WhatsApp button ──────────────────────────────────
// Hidden while the planner (questions, message, send button) is on screen, so there
// is never a second WhatsApp button competing with the one the user is about to tap.
function initFloatingButton() {
  const float = document.getElementById('wa-float');
  if (!float || !('IntersectionObserver' in window)) return;
  const visible = new Set();
  const targets = [document.getElementById('planner')].filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
    });
    float.classList.toggle('is-hidden', visible.size > 0);
  }, { threshold: 0.05 });
  targets.forEach((el) => io.observe(el));
}

// ── Three components accordion ────────────────────────────────
// Desktop (≥900px): the three cards open and close together, as the old packages did.
// Mobile: one at a time; opening an item closes the others.
const desktopMQ = window.matchMedia('(min-width: 900px)');

function setPillarOpen(pillar, open) {
  pillar.classList.toggle('is-open', open);
  pillar.querySelectorAll('[aria-controls]').forEach((btn) => btn.setAttribute('aria-expanded', String(open)));
  const label = pillar.querySelector('.pillar-more-label');
  if (label) label.textContent = t(open ? 'pillar-less' : 'pillar-more');
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
      btn.addEventListener('click', () => togglePillar(pillar));
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
  initTracking();
  initHeader();
  initFloatingButton();
  initHeroVideo();
  initPillars();
  applyLanguage(currentLang);
});
