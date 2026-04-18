/* ── Supabase Config ──────────────────────────── */
// Anon key is safe to expose — RLS protects data.
const SUPABASE_URL = 'https://fapmkdhcysofgxcmodgk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhcG1rZGhjeXNvZmd4Y21vZGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNzI0OTcsImV4cCI6MjA5MTY0ODQ5N30.HJY6C5is9KhMP0qpfiMZbAFmRj2GDFYNKrs1Lr4hb8c';

/* ── Grow Payment URLs ───────────────────────── */
const GROW_URLS = {
  team_reset: 'https://pay.grow.link/36cad6e0f52205cec7b8ee192ef3f4c6-MzI4MjM4Mg',
  focus_session: 'https://pay.grow.link/d4fb6a5014979ca1d91ea05d0003d457-MzI4MzA0MQ',
  momentum_booster: 'https://pay.grow.link/1c3cc868eb771fe115cc9b9e3cf518ac-MzI4MzA1Ng',
};

/* ── Progress Bar Config ─────────────────────── */
const PROGRESS_GOAL = 50; // 50 teams target

/* ── Translations ────────────────────────────── */
const TRANSLATIONS = {
  he: {
    'page-title': 'לב ים — כל חברת הייטק בישראל צריכה להיות פה',
    'hero-h1': 'כל חברת הייטק בישראל<br>צריכה להיות פה.',
    'hero-cta-why': 'גלו למה',
    'hero-cta-join': 'הצטרפו',
    'story-h2': 'למה זה כל כך חשוב להגיע ל\'לב ים\', כפר הדייגים, ג\'יסר א זרקא?',
    'story-p1': 'האמת? כי זה מה שכל מי שמגיע לפה אומר.',
    'story-p2': 'גם כשאני בעצמי לפעמים לא תופסת כמה המרחב הזה חשוב לאנושות. לאנושיות.',
    'story-p3': '\'ביצ\'האב\' דאז ו\'לב ים\' היום הוא <mark class="mark-orange">100% אמיתי</mark> בתקופה של חרבות, חומות, עננים בינאריים ושאגות אריה.',
    'story-p4': 'במרחב הקסום מול הים, בכפר דייגים העתיק בלב הטבע הפראי של מישור החוף, זורמת אנרגיה של אותנטיות פשוטה לצד פונקציונליות בריאה – שמייצרים תחושה של קרבה ותום, שפיות וביטחון. אנחנו מקדשים את הפשוט, מעריכים את הטבעי, מכירים בסדוק ומוקירים על הבלתי שלם, וכל מי שמעז להגיע לפה – גם אם לצד הפחד והספק – זוכה לנווט דרך האתגרים העסקיים, המורכבות הרגשית ומשבר האמון – אל עבר מחוזות ההשראה, הריפוי וההעצמה.',
    'story-p5': 'אני מזמינה אתכם להיות חלק מהנבחרת שבוחרת בשפיות הזו.',
    'story-cta': 'מצטרפים לתנועה של שפיות',
    'story-cta-note': '* המועד והפרטים ייקבעו כשיהיה לכם מדויק',
    'story-readmore-closed': 'לקרוא עוד ↓',
    'story-readmore-open': 'סגור ↑',
    'story-rm-p1': 'לא תיארתי לעצמי שב2026 התרנגולים המשוטטים על החול הרך, המים באלפי גוונים של כחול והחיוכים הלבביים של הדייגים עדיין יהיו מרחב מוגן לנפש שלי, ושל כל מי שמעז להוציא את הלב מהמקלט ולהגיע לפה.',
    'story-rm-highlight': 'זה לא מובן מאליו. אנחנו חיים בתקופה בלתי רגילה שכמעט מנרמלת את הרעש והפחד. יש תחושה כללית של כמילה – פחות אנרגיה, פחות בהירות, פחות וודאות. יותר סטרס, יותר עומס רגשי. ואף אחד לא יכול להבטיח לנו שמחר זה ייגמר.',
    'story-rm-p2': 'אני לא מתיימרת להציע איזו אוטופיה שמעלימה את הסערה, וגם לא אסקפיזם של הנאה רגעית וחסרת עומק. <mark class="mark-orange"><strong>אני מציעה אסטרטגיה</strong></mark>: שילוב של טבע פראי, קרקע יציבה, אוכל אמיתי ואותנטיות פשוטה – כל מה שבאמת נחוץ לנו כרגע, כבני אדם, כל מה שחסר לנו כדי לאפשר ללב שוב להיפתח, לאנרגיה להתרומם, ליצירתיות להתפרץ ולפתרונות להתבהר.',
    'story-rm-p3': 'כולנו מיטלטלים כרגע – בין אם זה פוגש אותנו בבית, בעבודה או בעסק – המצב מאתגר את החיוניות שלנו, מוריד את המוטיבציה שלנו להתפתח ופוגע ביכולת שלנו ליצור. אבל! דווקא ב\'לב ים\' – אחרי שנלחמנו לשווא ברוחות וניסינו להוריד עוגן וקיווינו לכוון מחדש את הסירה – אנחנו עשויים להגיע אל האזור הקטן היחיד של רוגע, שקט מוחלט ושמיים בהירים.',
    'story-rm-p4': 'זוהי הזדמנות להקשיב לציוץ הציפורים ולחדע אנרגיה – זכות שאני מוקירה עליה בכל פעם שאני מגיעה לפה. ורק פה אני מבינה למה כל חברת הייטק בישראל צריכה להגיע לפה.',
    'story-rm-p5': '<strong>ההצטרפות עכשיו היא הזמנה להוביל ולקחת חלק ביצירת האופק של כולנו. זו הצהרת כוונות – אתם מבטיחים את מקומכם ב\'לב ים\' כשכל הגמישות אצלכם: המימוש יקרה רק מתי שזה ירגיש לכם נכון ומדויק. זו הזדמנות להצהיר ולהבטיח לעצמם ולצוות – שמגיע לכם להגיע לפה.</strong>',
    'packages-h1': 'הצטרפותכם עכשיו היא הצהרת כוונות – לכם ולצוות שלכם מגיע רגע אמיתי של שקט ומיקוד.',
    'packages-h2': 'באיזה הרכב אתם באים?',
    'pkg-badge': 'הכי פופולרי',
    'pkg-participants': 'משתתפים',
    'pkg1-tagline': 'מפגש צוות אמיתי<br>בלב הטבע הפראי של מישור החוף',
    'pkg2-tagline': 'תוכן איכותי ואוכל אמיתי<br>שמחזירים בהירות ותנועה',
    'pkg3-tagline': 'אירוע של פשטות יוקרתית<br>לחידוש אנרגיה ומשמעות',
    'pkg-label-space': 'מרחב',
    'pkg-label-reception': 'קבלת פנים',
    'pkg-label-morning': 'בוקר',
    'pkg-label-lunch': 'צהרים',
    'pkg-label-drink': 'שתייה',
    'pkg-label-happyhour': 'הפי האוור',
    'pkg-label-workshop': 'סדנה',
    'pkg-val-space1': 'חלל התכנסות אינטימי',
    'pkg-val-morning': 'מאפי הכפר',
    'pkg-val-drink': 'משקה 100% פרי',
    'pkg-val-reception': '"מסיבת תה"',
    'pkg-val-lunch2': 'עשירה ומשמחת',
    'pkg-val-workshop': 'לבחירה',
    'pkg-val-space3': 'כל המתחם לרשותכם',
    'pkg-val-morning3': 'מאפי הכפר, פירות',
    'pkg-val-lunch3': 'חגיגית ושופעת',
    'pkg-val-drink3': 'בר משקאות טבעיים',
    'pkg-val-happyhour': 'מתוקים',
    'pkg-price-unit': 'ש"ח *',
    'pkg-cta': 'אני בפנים',
    'pkg-pressure': 'כולל נעילת מחירים לשנת 2026',
    'pkg-acc-open': 'מידע נוסף ↓',
    'pkg-acc-close': 'סגור ↑',
    'packages-footnote': '* המחירים אינם כוללים מע"מ',
    'policy-h2': 'מחוייבים לשקט שלכם',
    'policy-q1': 'ומה אם המצב הביטחוני לא מאפשר?',
    'policy-a1': 'אנחנו נתאם מועד חדש ברוגע ובתיאום מלא אתכם.',
    'policy-q2': 'ואם המצב או הלב לא מאפשרים?',
    'policy-a2': 'המקדמה קטנה והגמישות גדולה. אנחנו פה כדי שיהיה לכם טוב.',
    'policy-q3': 'ואם משהו השתנה ברגע האחרון?',
    'policy-a3': 'עד 7 ימים לפני המועד, תוכלו להעביר את ההזמנה למועד אחר. השקט והביטחון שלכם הם בראש סדרי העדיפויות שלנו.',
    'impact-banner': 'מעטים המקומות שכמו נבראו מסיבה מסויימת,<br>ואם הם נבראו פעמיים – בטח יש לכך סיבה',
    'impact-h2': 'הסכום שיגויס יאפשר — יצירת מציאות חדשה',
    'impact-subtitle': 'שקט אסטרטגי לצוות עם ROI מובהק ואימפקט חברתי',
    'impact-intro': 'ב\'לב ים\' השקט שלכם הופך לשינוי במצב הצבירה של הצוות: מאנרגיה חסומה ליצירתיות ופתיחות',
    'impact-li1': '<strong>אתם שותפים לשינוי הנרטיב:</strong> הצטרפות לנבחרת ה-50 בונה גשר של חיים משותפים.',
    'impact-li2': '<strong>אתם מובילים אימפקט מקומי:</strong> הבטחת מקומכם מאפשרת לנו לבסס מודל חדשני של שגשוג כלכלי-חברתי אמיתי בכפר הדייגים.',
    'progress-subline': 'היעד: 50 צוותי הייטק שמעזים להוציא את הלב מהמקלט ולחזור להוביל',
    'progress-joined': 'הצטרפו',
    'progress-of': 'מתוך',
    'progress-spots': 'מקומות',
    'progress-counter-first': 'היו הראשונים להצטרף',
    'progress-counter-nth': 'היו החברה ה־{n} שבוחרת בשינוי',
    'progress-limit': 'מספר המקומות בלב ים מוגבל,<br class="mobile-br"> כדי לשמור על הקסם והייחודיות',
    'sticky-wa': 'דברו איתנו בוואטסאפ',
    'sticky-cta': 'אני רוצה לבוא',
    'footer-tagline': 'הבית שלך בתוך הסערה — לב ים, כפר הדייגים בג׳יסר א-זרקא',
    'footer-copy': '© 2026 לב ים. כל הזכויות שמורות.',
    'vol-muted': 'הפעל שמע',
    'vol-unmuted': 'השתק',
  },
  ar: {
    'page-title': 'لب يام — كل شركة هاي-تك في إسرائيل يجب أن تكون هنا',
    'hero-h1': 'كل شركة هاي-تك في إسرائيل<br>يجب أن تكون هنا.',
    'hero-cta-why': 'اكتشفوا لماذا',
    'hero-cta-join': 'انضمّوا',
    'story-h2': 'لماذا من المهم جداً الوصول إلى "لب يام"، قرية الصيادين، جسر الزرقاء؟',
    'story-p1': 'الحقيقة؟ لأن هذا ما يقوله كل من يصل إلى هنا.',
    'story-p2': 'حتى أنا أحياناً لا أدرك كم هذا المكان مهم للبشرية.',
    'story-p3': '"بيتشهاب" في الماضي و"لب يام" اليوم — <mark class="mark-orange">100% حقيقي</mark> في زمن السيوف والجدران والغيوم الرقمية وزئير الأسود.',
    'story-p4': 'في هذا الفضاء الساحر المطل على البحر، في قرية الصيادين العريقة في قلب طبيعة سهل الساحل البرية، تتدفق طاقة من أصالة بسيطة إلى جانب وظيفية صحية — تولّد شعوراً بالقرب والبراءة، والعقلانية والأمان. نحن نقدّس البساطة، ونقدّر الطبيعي، ونعترف بالكسر ونحتفي بالناقص، وكل من يتجرأ على المجيء إلى هنا — حتى مع الخوف والشك — يحظى بالتنقل عبر التحديات المهنية، والتعقيد العاطفي وأزمة الثقة — نحو آفاق الإلهام والشفاء والتمكين.',
    'story-p5': 'أنا أدعوكم لتكونوا جزءاً من النخبة التي تختار هذه العقلانية.',
    'story-cta': 'انضمّوا لحركة العقلانية',
    'story-cta-note': '* سيُحدَّد الموعد والتفاصيل عندما يكون ذلك مناسباً لكم',
    'story-readmore-closed': 'اقرأ المزيد ↓',
    'story-readmore-open': 'إغلاق ↑',
    'story-rm-p1': 'لم أتصور أنه في 2026 ستظل الديوك الرومية التي تجوب الرمال الناعمة، والمياه بآلاف درجات اللون الأزرق، وابتسامات الصيادين الحارة — فضاءً آمناً لروحي ولروح كل من يتجرأ على إخراج قلبه من الملجأ والوصول إلى هنا.',
    'story-rm-highlight': 'هذا ليس أمراً مفروغاً منه. نحن نعيش في حقبة غير عادية كادت أن تُطبّع الضجيج والخوف. ثمة شعور عام بالتقلص — طاقة أقل، وضوح أقل، يقين أقل. مزيد من التوتر، مزيد من الأعباء العاطفية. ولا أحد يستطيع أن يضمن لنا أن الأمر سينتهي غداً.',
    'story-rm-p2': 'لا أدّعي تقديم يوتوبيا تمحو العاصفة، ولا هروباً لمتعة آنية ضحلة. <mark class="mark-orange"><strong>أنا أقدم استراتيجية</strong></mark>: مزيج من الطبيعة البرية والأرض الثابتة والطعام الحقيقي والأصالة البسيطة — كل ما نحتاجه حقاً الآن كبشر، كل ما يفتقده قلبنا لينفتح من جديد، وتنطلق الطاقة، وتتفجر الإبداعية، وتتضح الحلول.',
    'story-rm-p3': 'كلنا نتأرجح الآن — سواء كان ذلك في البيت أو العمل أو المشروع — الوضع يتحدى حيويتنا، ويخفض دافعيتنا للنمو، ويضر بقدرتنا على الإبداع. لكن! في "لب يام" تحديداً — بعد أن كافحنا الرياح عبثاً وحاولنا إلقاء المرساة وأملنا في إعادة توجيه القارب — قد نصل إلى تلك المنطقة الصغيرة الوحيدة من الهدوء والسكون التام والسماء الصافية.',
    'story-rm-p4': 'هذه فرصة للاستماع إلى تغريد الطيور وتجديد الطاقة — امتياز أقدّره في كل مرة أصل إليه. وهنا فقط أفهم لماذا يجب على كل شركة هاي-تك في إسرائيل أن تأتي إلى هنا.',
    'story-rm-p5': '<strong>الانضمام الآن هو دعوة للقيادة والمشاركة في صنع أفق مشترك. هذا إعلان نية — أنتم تضمنون مكانكم في "لب يام" مع كامل المرونة: التنفيذ سيحدث عندما يشعر الأمر صحيحاً ومناسباً لكم. هذه فرصة للإعلان والوعد لأنفسكم ولفريقكم — بأنكم تستحقون المجيء إلى هنا.</strong>',
    'packages-h1': 'انضمامكم الآن هو إعلان نية – أنتم وفريقكم تستحقون لحظة حقيقية من الهدوء والتركيز.',
    'packages-h2': 'بأي تشكيلة ستأتون؟',
    'pkg-badge': 'الأكثر شعبية',
    'pkg-participants': 'مشاركون',
    'pkg1-tagline': 'لقاء فريق حقيقي<br>في قلب طبيعة سهل الساحل البرية',
    'pkg2-tagline': 'محتوى عالي الجودة وطعام حقيقي<br>يُعيدان الوضوح والحركة',
    'pkg3-tagline': 'حدث من البساطة الفاخرة<br>لتجديد الطاقة والمعنى',
    'pkg-label-space': 'المكان',
    'pkg-label-reception': 'الاستقبال',
    'pkg-label-morning': 'الصباح',
    'pkg-label-lunch': 'الغداء',
    'pkg-label-drink': 'المشروبات',
    'pkg-label-happyhour': 'الساعة السعيدة',
    'pkg-label-workshop': 'ورشة العمل',
    'pkg-val-space1': 'قاعة اجتماعات حميمة',
    'pkg-val-morning': 'مخبوزات القرية',
    'pkg-val-drink': 'مشروب فاكهة 100%',
    'pkg-val-reception': '"حفلة شاي"',
    'pkg-val-lunch2': 'غني ومبهج',
    'pkg-val-workshop': 'حسب الاختيار',
    'pkg-val-space3': 'كامل المجمع تحت تصرفكم',
    'pkg-val-morning3': 'مخبوزات القرية وفواكه',
    'pkg-val-lunch3': 'احتفالي وفاخر',
    'pkg-val-drink3': 'بار مشروبات طبيعية',
    'pkg-val-happyhour': 'حلويات',
    'pkg-price-unit': '₪ *',
    'pkg-cta': 'أنا داخل',
    'pkg-pressure': 'يشمل تثبيت الأسعار لعام 2026',
    'pkg-acc-open': 'مزيد من المعلومات ↓',
    'pkg-acc-close': 'إغلاق ↑',
    'packages-footnote': '* الأسعار لا تشمل ضريبة القيمة المضافة',
    'policy-h2': 'ملتزمون براحة بالكم',
    'policy-q1': 'وماذا لو لم يسمح الوضع الأمني؟',
    'policy-a1': 'سنحدد موعداً جديداً بهدوء وبتنسيق كامل معكم.',
    'policy-q2': 'وإذا كان الوضع أو القلب لا يسمحان؟',
    'policy-a2': 'الدفعة المقدمة صغيرة والمرونة كبيرة. نحن هنا لكي يكون لكم خيراً.',
    'policy-q3': 'وإذا تغير شيء في اللحظة الأخيرة؟',
    'policy-a3': 'حتى 7 أيام قبل الموعد، يمكنكم تحويل الحجز إلى موعد آخر. راحتكم وأمانكم هما أولويتنا القصوى.',
    'impact-banner': 'قليلة هي الأماكن التي تبدو كأنها خُلقت لسبب ما،<br>وإن خُلقت مرتين — فلابد أن ثمة سبباً',
    'impact-h2': 'المبلغ الذي سيُجمَع سيُتيح — خلق واقع جديد',
    'impact-subtitle': 'هدوء استراتيجي للفريق مع ROI واضح وأثر اجتماعي',
    'impact-intro': 'في "لب يام" هدوؤكم يتحول إلى تغيير في حالة الفريق: من طاقة محبوسة إلى إبداع وانفتاح',
    'impact-li1': '<strong>أنتم شركاء في تغيير السردية:</strong> الانضمام إلى نخبة الـ-50 يبني جسراً من الحياة المشتركة.',
    'impact-li2': '<strong>أنتم تقودون أثراً محلياً:</strong> تأمين مكانكم يتيح لنا ترسيخ نموذج مبتكر من الازدهار الاقتصادي-الاجتماعي الحقيقي في قرية الصيادين.',
    'progress-subline': 'الهدف: 50 فريق هاي-تك يتجرأون على إخراج القلب من الملجأ والعودة إلى القيادة',
    'progress-joined': 'انضمّوا',
    'progress-of': 'من أصل',
    'progress-spots': 'مكاناً',
    'progress-counter-first': 'كونوا أوائل المنضمين',
    'progress-counter-nth': 'كونوا الشركة الـ {n} التي تختار التغيير',
    'progress-limit': 'عدد الأماكن في لب يام محدود،<br class="mobile-br"> للحفاظ على السحر والتميز',
    'sticky-wa': 'تحدثوا معنا على واتساب',
    'sticky-cta': 'أريد أن أحضر',
    'footer-tagline': 'بيتك في قلب العاصفة — لب يام، قرية الصيادين في جسر الزرقاء',
    'footer-copy': '© 2026 لب يام. جميع الحقوق محفوظة.',
    'vol-muted': 'تشغيل الصوت',
    'vol-unmuted': 'كتم الصوت',
  },
};

/* ── Language helpers ────────────────────────── */
let currentLang = localStorage.getItem('lang') || 'he';

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) ||
         (TRANSLATIONS['he'][key]) || key;
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Update page title
  document.title = t('page-title');

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = TRANSLATIONS[lang] && TRANSLATIONS[lang][key];
    if (val !== undefined) el.innerHTML = val;
  });

  // Fix sticky-cta aria-label (text content was set above via data-i18n)
  const stickyCta = document.querySelector('.sticky-cta');
  if (stickyCta) stickyCta.setAttribute('aria-label', t('sticky-cta'));

  // Fix WA aria-label
  const stickyWa = document.querySelector('.sticky-wa');
  if (stickyWa) stickyWa.setAttribute('aria-label', t('sticky-wa'));

  // Fix volume button label based on current muted state
  const volumeBtn = document.getElementById('volume-btn');
  if (volumeBtn) {
    const isMuted = !volumeBtn.classList.contains('unmuted');
    volumeBtn.setAttribute('aria-label', isMuted ? t('vol-muted') : t('vol-unmuted'));
  }

  // Fix read-more button if accordion is currently open
  const readMoreContent = document.getElementById('story-read-more-content');
  const readMoreBtn = document.getElementById('story-read-more-btn');
  if (readMoreContent && readMoreBtn) {
    const isOpen = readMoreContent.classList.contains('is-open');
    readMoreBtn.textContent = isOpen ? t('story-readmore-open') : t('story-readmore-closed');
  }

  // Fix package accordion toggles if currently open
  const anyAccOpen = document.querySelector('.pkg-accordion.open') !== null;
  if (anyAccOpen) {
    document.querySelectorAll('.pkg-accordion-toggle').forEach((btn) => {
      btn.textContent = t('pkg-acc-close');
    });
  }

  // Re-render dynamic counter (spots-counter)
  updateFeed();

  // Update toggle button active state
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('lang-btn-active', btn.dataset.lang === lang);
  });
}

/* ── Initialize ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLangSwitch();
  wireGrowButtons();
  initPackageAccordions();
  initStoryReadMore();
  initVolumeToggle();
  initBeachHubSlideshow();
  // Apply saved language (restores state on page reload)
  if (currentLang !== 'he') applyLanguage(currentLang);
  if (SUPABASE_URL !== 'REPLACE_WITH_SUPABASE_URL') {
    updateFeed();
    setInterval(updateFeed, 5000);
  }
});

/* ── Language switch ─────────────────────────── */
function initLangSwitch() {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang !== currentLang) applyLanguage(lang);
    });
  });
}

/* ── Beach hub fadeshow ──────────────────────── */
function initBeachHubSlideshow() {
  const slides = document.querySelectorAll('#beachhub-slideshow .bh-slide');
  const dots   = document.querySelectorAll('#beachhub-slideshow .bh-dot');
  if (slides.length < 2) return;

  const FADE_MS  = 2200; // duration of each crossfade
  const HOLD_MS  = 5000; // how long each photo is fully visible

  let current   = 0;
  let timer     = null;
  let fadeType  = 'out'; // alternates: 'out' (current fades away) | 'in' (next fades in on top)

  // Show first slide immediately
  slides[0].style.opacity = '1';
  slides[0].style.zIndex  = '1';
  slides[0].classList.add('bh-slide-active');
  dots[0].classList.add('bh-dot-active');

  function goTo(index) {
    const prev = current;
    current = (index + slides.length) % slides.length;

    // Update dots
    dots.forEach((d, i) => d.classList.toggle('bh-dot-active', i === current));

    // Swap Ken Burns class so zoom restarts on the incoming slide
    slides[prev].classList.remove('bh-slide-active');
    slides[current].classList.add('bh-slide-active');

    if (fadeType === 'out') {
      // ── FADE OUT ── current photo dissolves away, revealing next beneath it
      slides[current].style.transition = 'none';
      slides[current].style.opacity    = '1';
      slides[current].style.zIndex     = '0'; // sit beneath current

      void slides[current].offsetWidth; // force reflow

      slides[prev].style.zIndex     = '1'; // sits on top
      slides[prev].style.transition = `opacity ${FADE_MS}ms ease-in-out`;
      slides[prev].style.opacity    = '0';

      setTimeout(() => {
        slides[prev].style.zIndex  = '0';
        slides[current].style.zIndex = '1';
      }, FADE_MS);

    } else {
      // ── FADE IN ── next photo materialises on top of the current one
      slides[current].style.transition = 'none';
      slides[current].style.opacity    = '0';
      slides[current].style.zIndex     = '2'; // sit above current

      void slides[current].offsetWidth; // force reflow

      slides[current].style.transition = `opacity ${FADE_MS}ms ease-in-out`;
      slides[current].style.opacity    = '1';

      setTimeout(() => {
        slides[prev].style.opacity   = '0';
        slides[prev].style.zIndex    = '0';
        slides[current].style.zIndex = '1';
      }, FADE_MS);
    }

    fadeType = fadeType === 'out' ? 'in' : 'out';
  }

  function next() { goTo(current + 1); }

  function startTimer() { timer = setInterval(next, HOLD_MS); }
  function stopTimer()  { clearInterval(timer); }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopTimer(); goTo(i); startTimer(); });
  });

  const container = document.getElementById('beachhub-slideshow');
  container.addEventListener('mouseenter', stopTimer);
  container.addEventListener('mouseleave', startTimer);

  startTimer();
}

/* ── Story read-more accordion ──────────────── */
function initStoryReadMore() {
  const btn     = document.getElementById('story-read-more-btn');
  const content = document.getElementById('story-read-more-content');
  if (!btn || !content) return;

  btn.addEventListener('click', () => {
    const isOpen = content.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', isOpen);
    btn.textContent = isOpen ? t('story-readmore-open') : t('story-readmore-closed');
  });
}

/* ── Volume toggle ───────────────────────────── */
function initVolumeToggle() {
  const video     = document.getElementById('hero-video');
  const btn       = document.getElementById('volume-btn');
  const heroSection = document.getElementById('hero');
  if (!video || !btn) return;

  // Browsers block autoplay with audio — video must start muted.
  let unmuteHandled  = false;
  let userWantsSound = false; // true once the user has enabled audio

  const unmuteOnFirstInteraction = () => {
    if (unmuteHandled) return;
    unmuteHandled  = true;
    userWantsSound = true;
    video.muted    = false;
    video.volume   = 1;
    setUnmuted();
    document.removeEventListener('click',      unmuteOnFirstInteraction);
    document.removeEventListener('touchstart', unmuteOnFirstInteraction);
  };

  document.addEventListener('click',      unmuteOnFirstInteraction);
  document.addEventListener('touchstart', unmuteOnFirstInteraction);

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (video.muted) {
      unmuteHandled  = true;
      userWantsSound = true;
      video.muted    = false;
      video.volume   = 1;
      document.removeEventListener('click',      unmuteOnFirstInteraction);
      document.removeEventListener('touchstart', unmuteOnFirstInteraction);
      setUnmuted();
    } else {
      userWantsSound = false;
      video.muted    = true;
      setMuted();
    }
  });

  // Mute when hero scrolls out of view; restore when it comes back
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        video.muted = true;
      } else if (userWantsSound) {
        video.muted = false;
      }
    }, { threshold: 0.05 });
    observer.observe(heroSection);
  }

  function setUnmuted() {
    btn.classList.add('unmuted');
    btn.setAttribute('aria-label', t('vol-unmuted'));
  }

  function setMuted() {
    btn.classList.remove('unmuted');
    btn.setAttribute('aria-label', t('vol-muted'));
  }
}

/* ── Package Accordions ──────────────────────── */
function initPackageAccordions() {
  const allToggles    = document.querySelectorAll('.pkg-accordion-toggle');
  const allAccordions = document.querySelectorAll('.pkg-accordion');

  allToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isMobile = window.innerWidth <= 767;
      if (isMobile) {
        // Mobile: toggle only this card (button references accordion via data-target)
        const thisAcc = document.getElementById(btn.dataset.target);
        const willOpen = !thisAcc.classList.contains('open');
        thisAcc.classList.toggle('open', willOpen);
        btn.textContent = willOpen ? t('pkg-acc-close') : t('pkg-acc-open');
        btn.setAttribute('aria-expanded', String(willOpen));
      } else {
        // Desktop: toggle all cards together
        const anyOpen = document.querySelector('.pkg-accordion.open') !== null;
        allAccordions.forEach((acc) => acc.classList.toggle('open', !anyOpen));
        allToggles.forEach((b) => {
          b.textContent = anyOpen ? t('pkg-acc-open') : t('pkg-acc-close');
          b.setAttribute('aria-expanded', String(!anyOpen));
        });
      }
    });
  });
}

/* ── Wire Grow CTA buttons ───────────────────── */
function wireGrowButtons() {
  document.querySelectorAll('[data-grow]').forEach((btn) => {
    const key = btn.getAttribute('data-grow');
    const url = GROW_URLS[key];
    if (url && !url.startsWith('REPLACE')) {
      btn.href = url;
    } else {
      // Placeholder — show alert if credentials not set
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('קישור התשלום עדיין לא הוגדר — יש לעדכן את כתובות Grow ב-main.js');
      });
    }
  });
}

/* ── Fetch purchases from Supabase ───────────── */
async function fetchPurchases() {
  try {
    // Fetch latest 10 for the live feed display
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/levyam-b2b?select=full_name,package,payment_sum,created_at&order=created_at.desc&limit=10`,
      { headers: { 'apikey': SUPABASE_ANON_KEY } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function fetchTotalCount() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/levyam-b2b?select=id`,
      { headers: { 'apikey': SUPABASE_ANON_KEY, 'Prefer': 'count=exact', 'Range-Unit': 'items', 'Range': '0-0' } }
    );
    if (!res.ok) return 0;
    const contentRange = res.headers.get('Content-Range');
    // Content-Range: 0-0/16 → extract total after "/"
    const total = contentRange ? parseInt(contentRange.split('/')[1], 10) : 0;
    return isNaN(total) ? 0 : total;
  } catch {
    return 0;
  }
}

/* ── Update live feed + progress bar ─────────── */
async function updateFeed() {
  const [purchases, count] = await Promise.all([fetchPurchases(), fetchTotalCount()]);
  const pct = Math.min((count / PROGRESS_GOAL) * 100, 100);
  const pctRounded = Math.round(pct);

  const barFill = document.getElementById('progress-bar-fill');
  if (barFill) barFill.style.width = pct + '%';

  // Live stat number
  const statJoined = document.getElementById('stat-joined');
  if (statJoined) statJoined.textContent = count;

  // CTA counter text (language-aware)
  const counter = document.getElementById('spots-counter');
  if (counter) {
    const next = count + 1;
    counter.textContent = count > 0
      ? t('progress-counter-nth').replace('{n}', next)
      : t('progress-counter-first');
  }

  // Sun marker position
  const sun = document.getElementById('progress-sun');
  if (sun) {
    sun.style.left = pct + '%';
    sun.style.display = pct > 0 ? '' : 'none';
  }

  // Live feed
  const feed = document.getElementById('purchase-feed');
  if (feed) {
    if (purchases.length === 0) {
      feed.innerHTML = '<p class="feed-empty">היו הראשונים להצטרף!</p>';
    } else {
      feed.innerHTML = purchases.map((p) => {
        return `<div class="purchase-item">
          <img src="content/brand/icons-16.png" class="purchase-icon" alt="">
          <span class="purchase-name">${p.package || 'חבילה'}</span>
        </div>`;
      }).join('');
    }
  }
}

/* ── Smooth scroll for nav CTA ───────────────── */
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const target = document.querySelector(anchor.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
