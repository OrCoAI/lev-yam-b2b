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
    'why-img-alt': 'מרחב העבודה של לב ים מול הים, עם סירת דייגים על החוף',
    'testi-h2': 'מה אומרים מי שכבר היו כאן',

    'pillars-h2': 'שלושה מרכיבים. אינספור אפשרויות.',
    'p1-eyebrow': '01 | המרחב',
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
    'p1-img-alt': 'קבוצה עובדת במרחב של לב ים, הים ברקע',
    'p2-eyebrow': '02 | האוכל',
    'p2-h3': 'טעמים מקומיים. אירוח מכל הלב.',
    'p2-p1': 'האוכל הוא חלק מהחוויה והבחירה היא שלכם.',
    'p2-list-title': 'מה אפשר לשלב?',
    'p2-li1': 'קבלת פנים עם תה מסורתי',
    'p2-li2': 'מאפי בוקר מהכפר ופירות העונה',
    'p2-li3': 'ארוחות צהריים מקומיות, עשירות ומגוונות',
    'p2-li4': 'אירוח שף לחוויה קולינרית ייחודית',
    'p2-li5': 'אפשרות להביא קייטרינג חיצוני מטעמכם',
    'p2-close': 'התפריט והאירוח מותאמים לאופי המפגש ולצורכי הקבוצה.',
    'p3-eyebrow': '03 | התוכן',
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
    'plan-q3': 'מה הייתם רוצים לחוות?',
    'plan-size1': 'עד 15',
    'plan-comp1': 'המרחב',
    'plan-comp2': 'האוכל',
    'plan-comp3': 'התוכן',
    'plan-help': 'אפשר גם לדלג ולכתוב לנו חופשי.',
    'plan-or': 'או ישירות בוואטסאפ:',

    // WhatsApp message building blocks
    'plan-ev1-msg': 'יום גיבוש וצוות',
    'plan-ev2-msg': 'מפגש הנהלה / יום אסטרטגיה',
    'plan-ev3-msg': 'סדנה או הכשרה',
    'plan-ev4-msg': 'יום חשיבה ויצירה',
    'plan-ev5-msg': 'אירוע חברה / מפגש מקצועי',
    'plan-ev6-msg': 'מפגש קהילה / ארגון',
    'size-lt15': 'עד 15 אנשים',
    'size-15-30': '15–30 אנשים',
    'size-30-50': '30–50 אנשים',
    'size-50plus': 'מעל 50 אנשים',
    'chat-status': 'וואטסאפ',
    'chat-draft': 'טיוטה',
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
    'why-img-alt': 'مساحة العمل في لب يام أمام البحر، مع قارب صيد على الشاطئ',
    'testi-h2': 'ماذا يقول من كانوا هنا',

    'pillars-h2': 'ثلاثة مكوّنات. إمكانيات لا تُحصى.',
    'p1-eyebrow': '01 | المكان',
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
    'p1-img-alt': 'مجموعة تعمل في مساحة لب يام والبحر في الخلفية',
    'p2-eyebrow': '02 | الطعام',
    'p2-h3': 'نكهات محلية. ضيافة من القلب.',
    'p2-p1': 'الطعام جزء من التجربة والخيار لكم.',
    'p2-list-title': 'ما الذي يمكن دمجه؟',
    'p2-li1': 'استقبال بشاي تقليدي',
    'p2-li2': 'معجنات صباحية من القرية وفواكه الموسم',
    'p2-li3': 'وجبات غداء محلية، غنية ومتنوعة',
    'p2-li4': 'استضافة شيف لتجربة طهي فريدة',
    'p2-li5': 'إمكانية إحضار تموين خارجي من طرفكم',
    'p2-close': 'تُصمَّم قائمة الطعام والضيافة وفق طابع اللقاء واحتياجات المجموعة.',
    'p3-eyebrow': '03 | المحتوى',
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
    'plan-q3': 'ما الذي تودّون تجربته؟',
    'plan-size1': 'حتى 15',
    'plan-comp1': 'المكان',
    'plan-comp2': 'الطعام',
    'plan-comp3': 'المحتوى',
    'plan-help': 'يمكنكم أيضاً تخطي هذا والكتابة لنا بحرية.',
    'plan-or': 'أو مباشرة عبر واتساب:',

    'plan-ev1-msg': 'يوم تعزيز فريق',
    'plan-ev2-msg': 'لقاء إدارة / يوم استراتيجية',
    'plan-ev3-msg': 'ورشة أو تدريب',
    'plan-ev4-msg': 'يوم تفكير وإبداع',
    'plan-ev5-msg': 'فعالية شركة / لقاء مهني',
    'plan-ev6-msg': 'لقاء مجتمعي / منظمة',
    'size-lt15': 'حتى 15 شخصاً',
    'size-15-30': '15–30 شخصاً',
    'size-30-50': '30–50 شخصاً',
    'size-50plus': 'أكثر من 50 شخصاً',
    'chat-status': 'واتساب',
    'chat-draft': 'مسودة',
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

  refreshWhatsAppLinks();
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
// Three optional questions → one composed message. Nothing is stored.
const planner = { event: null, size: null, comps: [] };

function joinList(items) {
  if (items.length <= 1) return items.join('');
  const last = items[items.length - 1];
  const head = items.slice(0, -1).join(currentLang === 'ar' ? '، ' : ', ');
  // Hebrew "ו" attaches to the next word; Arabic "و" takes a space.
  return currentLang === 'ar' ? `${head} و${last}` : `${head} ו${last}`;
}

function composeMessage() {
  const evMsg = planner.event ? t(planner.event.msgKey) : null;
  const sizeMsg = planner.size ? t(`size-${planner.size}`) : null;
  const compLabels = planner.comps.map((c) => t(c.labelKey));
  const hasSelection = Boolean(evMsg || sizeMsg || compLabels.length);
  if (!hasSelection) return t('wa-default');

  if (currentLang === 'ar') {
    let msg = evMsg ? `مرحباً، نخطط لتنظيم ${evMsg} في لب يام` : 'مرحباً، نرغب في التخطيط ليوم في لب يام';
    if (sizeMsg) msg += `، عددنا ${sizeMsg}`;
    if (compLabels.length) msg += `، ونرغب بدمج ${joinList(compLabels)}`;
    return `${msg}. يسعدنا أن نخطط معاً!`;
  }

  let msg = evMsg ? `היי, אנחנו מתכננים ${evMsg} בלב ים` : 'היי, אנחנו רוצים לתכנן יום בלב ים';
  if (sizeMsg) msg += ` לקבוצה של ${sizeMsg}`;
  if (compLabels.length) msg += `, ורוצים לשלב את ${joinList(compLabels)}`;
  return `${msg}. נשמח לתכנן יחד!`;
}

function waUrl(message) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Every [data-wa] link gets a language-aware href; the planner CTA gets the composed one.
function refreshWhatsAppLinks({ animate = false } = {}) {
  document.querySelectorAll('[data-wa]').forEach((link) => {
    const message = link.dataset.wa === 'planner' ? composeMessage() : t('wa-default');
    link.href = waUrl(message);
  });
  updateChatPreview(animate);
}

// The chat card mirrors the exact message the button will open in WhatsApp.
let chatTimer = null;
function updateChatPreview(animate) {
  const text = document.getElementById('chat-text');
  if (!text) return;
  const next = composeMessage();
  if (text.textContent === next) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!animate || reduced) { text.textContent = next; return; }
  clearTimeout(chatTimer);
  text.classList.add('is-updating');
  chatTimer = setTimeout(() => {
    text.textContent = next;
    text.classList.remove('is-updating');
    const bubble = document.getElementById('chat-bubble');
    if (bubble) {
      bubble.classList.remove('is-pop');
      void bubble.offsetWidth; // restart the pop animation
      bubble.classList.add('is-pop');
    }
  }, 180);
}

function initPlanner() {
  const chips = document.querySelectorAll('.chip[data-group]');
  if (!chips.length) return;

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const { group, value } = chip.dataset;
      const wasPressed = chip.getAttribute('aria-pressed') === 'true';

      if (group === 'comp') {
        // multi-select
        chip.setAttribute('aria-pressed', String(!wasPressed));
        planner.comps = wasPressed
          ? planner.comps.filter((c) => c.value !== value)
          : [...planner.comps, { value, labelKey: chip.dataset.label }];
      } else {
        // single-select: unpress siblings in the same group
        document.querySelectorAll(`.chip[data-group="${group}"]`).forEach((c) => {
          c.setAttribute('aria-pressed', 'false');
        });
        if (wasPressed) {
          planner[group] = null;
        } else {
          chip.setAttribute('aria-pressed', 'true');
          planner[group] = group === 'event' ? { value, msgKey: chip.dataset.msg } : value;
        }
      }

      refreshWhatsAppLinks({ animate: true });
      sendBizEvent('levyam.planner.select', { group, value, selected: !wasPressed });
    });
  });
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
        components: planner.comps.map((c) => c.value).join(','),
        has_selection: Boolean(planner.event || planner.size || planner.comps.length),
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
// Hidden while the planner (chips, preview, send button) or the footer (which
// has its own button) is on screen, so there is never a second WhatsApp button
// competing with the one the user is about to tap.
function initFloatingButton() {
  const float = document.getElementById('wa-float');
  if (!float || !('IntersectionObserver' in window)) return;
  const visible = new Set();
  const targets = [document.querySelector('.planner-wrap'), document.querySelector('.footer')].filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
    });
    float.classList.toggle('is-hidden', visible.size > 0);
  }, { threshold: 0.05 });
  targets.forEach((el) => io.observe(el));
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
  applyLanguage(currentLang);
});
