/*
  قائمة البايكات — youssefjoe.rr
  ---------------------------------
  - price: السعر بالألف جنيه
  - status: "available" متاح  |  "reserved" محجوز  |  "sold" اتباع
  - الصور: ارفع صور البايك في فولدر images/bikes باسم الكود
      مثال بايك كود 52  →  52-1.jpg , 52-2.jpg , 52-3.jpg ...
    الموقع هيعرضهم لوحده، ولو مفيش صور هيظهر شكل افتراضي.
*/
const BIKES = [
  { code: 4, brand: "Kawasaki", model: "Z1000", year: 2015, type: "naked", cc: 1000, km: "5,000 ميل", location: "بنها", license: "إفراج جديد — لم يرخص", price: 585, status: "available",
    features: ["استيراد أمريكا", "فابريكا بدون أي دهانات", "سيستم شكمان Akrapovic كامل", "سكرينة ورفرف كاربون", "مرايات Bar-end", "سلايدرات + Engine Guard", "غطاء موتور وغطاء زيت", "ليد خلفي"] },

  { code: 5, brand: "Honda", model: "CBR 1000RR", year: 2012, type: "sport", cc: 1000, km: "36,000", location: "—", license: "رخصة سنة — أول ترخيص من الإفراج", price: 460, status: "available",
    features: ["الموتور ما اتحلش مسمار", "كل الصيانات معمولة — Fully loaded", "Full exhaust system", "إسكرينة Power Bronze", "شبكة حماية رادياتير Beowulf", "طقم كاوتش إنتاج جديد", "سلايدرات T-REX أمامي وخلفي", "حامل نمرة Yoshimura + النمرة الأمريكي الأصلي", "مساعد خلفي Öhlins", "بامب خلفي Pyramid"] },

  { code: 7, brand: "Honda", model: "CBR 600RR", year: 2012, type: "sport", cc: 600, km: "26,000", location: "القاهرة", license: "سارية حتى 2028 — مرور مدينة نصر", price: 300, status: "available",
    features: ["الموتور ما اتحلش — اتفتح وش الزيت للصيانة فقط", "الفيبر متغير وفيه كسور (موضح بشفافية)", "المعاينة والفحص بأي فني"] },

  { code: 8, brand: "Honda", model: "Hornet 600 Injection", year: 2007, type: "naked", cc: 600, km: "68,000", location: "الشرقية", license: "رخصة 3 سنين — مرور طوخ", price: 210, status: "available",
    features: ["الموتور ما اتحلش مسمار (وش الزيت فقط)", "الفردة الخلفي 80%", "محتاج فردة أمامي فقط"] },

  { code: 9, brand: "Honda", model: "CBR 600RR ABS", year: 2012, type: "sport", cc: 600, km: "49,000", location: "—", license: "الرخصة منتهية", price: 345, status: "available",
    features: ["فرامل ABS + فايبر ABS", "مغير زيت وفلتر من 100 كم", "صيانة كاملة معمولة", "الموتور ما اتحلش مسمار", "محتاج أولسية مساعد"] },

  { code: 11, brand: "Honda", model: "CBR 1000RR", year: 2013, type: "sport", cc: 1000, km: "29,000", location: "—", license: "—", price: 510, status: "available",
    features: ["فابريكا بالكامل", "حالل وشين صيانة فقط — الموتور ما اتحلش", "مش محتاجة جنيه مصروف"] },

  { code: 12, brand: "Honda", model: "CB650R", year: 2023, type: "naked", cc: 650, km: "24,000", location: "بورسعيد", license: "—", price: 400, status: "available",
    features: ["عداد TFT ديجيتال", "ABS + Traction Control", "Quick Shifter", "Full System Akrapovic", "Camera System", "دواسات Arashi", "Engine Guard كامل + سلايدرات", "مقابض وفرامل أوريجنال"] },

  { code: 22, brand: "Honda", model: "CBR 600 F4i", year: 2002, type: "sport", cc: 600, km: "—", location: "6 أكتوبر", license: "أول رخصة من الإفراج", price: 235, status: "available",
    features: ["ستوك بالكامل بحالة المصنع", "الموتور ما اتحلش غير وش الكهربا للصيانة", "بطارية + رادياتير + مياه جديدة", "لمبات LED", "علبة تعديل: هادية على الـLow وصوت رعد على الـHigh RPM", "متسرفز بالكامل — مش محتاج مصاريف"] },

  { code: 24, brand: "Honda", model: "Steed 400", year: 1995, type: "cruiser", cc: 400, km: "—", location: "سوهاج", license: "منتهية — مرور الجيزة", price: 53, status: "reserved",
    features: ["محتاج عمرة", "لقطة للي فاهم وعايز يعملها على نضافة"] },

  { code: 26, brand: "Suzuki", model: "Burgman 650", year: 2006, type: "scooter", cc: 650, km: "—", location: "السويس", license: "هتتجدد سنة للمشتري", price: 190, status: "available",
    features: ["الموتور ما اتحلش", "مش محتاج جنيه مصاريف", "فردة قدام جديدة", "سيستم شكمان تعديل", "مرايات ضم"] },

  { code: 28, brand: "Honda", model: "Hornet 600", year: 2004, type: "naked", cc: 600, km: "53,700", location: "المنصورة", license: "3 سنين إلا 3 شهور", price: 215, status: "available",
    features: ["الموتور ما اتحلش", "رش بسيط في التنك متعمول كويس"] },

  { code: 29, brand: "Honda", model: "Hornet 600", year: 2004, type: "naked", cc: 600, km: "—", location: "الفيوم", license: "3 سنين — مرور المنوفية", price: 200, status: "available",
    features: ["الموتور ما اتحلش خالص", "العجل زيرو", "رش نضافة برة مصر"] },

  { code: 30, brand: "Honda", model: "Hornet 600", year: 2002, type: "naked", cc: 600, km: "—", location: "فيصل", license: "سارية حتى 04/2027", price: 150, status: "available",
    features: ["فابريكا — دوّر وامشي", "رادياتير + طرمبة مياه جديدة", "بوجيهات جديدة + Motul 7100", "ضبط وتنظيف الكربراتير", "شكمان MIVV + الأصلي موجود", "جادون وفلتر هوا تعديل", "إسكرينة + إشارات LED + سلايدرات", "معظم قطع الستوك موجودة", "خبطتين في التانك وخدوش في الديل (موضحة)"] },

  { code: 31, brand: "Honda", model: "Hornet 600", year: 2004, type: "naked", cc: 600, km: "70,000", location: "الدقهلية", license: "إفراج بورسعيد", price: 200, status: "available",
    features: ["ما اتحلش أي حاجة", "مش راشة", "كتينة وشداد أصلي جديد", "بلاطة شحن جديدة", "سيستم شكمان كامل تعديل"] },

  { code: 35, brand: "Kawasaki", model: "Ninja ZX-6R", year: 2008, type: "sport", cc: 600, km: "25,000", location: "التجمع الخامس", license: "هتتجدد سنة — مرور التجمع", price: 260, status: "available",
    features: ["ستوك بالكامل + سلايدرات", "راشة كلها"] },

  { code: 39, brand: "Honda", model: "Hornet 919", year: 2002, type: "naked", cc: 900, km: "45,000", location: "إمبابة", license: "مرور الجيزة", price: 195, status: "available",
    features: ["مش راشة قبل كده", "زيت Motul 7100 أصلي", "آلات جر وورق دبرياج جديد", "جادون وحامل نمر تعديل", "تنبورة خلفي جديدة", "محتاجة كتينة"] },

  { code: 40, brand: "Honda", model: "CBR 600RR", year: 2008, type: "sport", cc: 600, km: "68,000", location: "ملوي — المنيا", license: "رخصة 3 سنين", price: 280, status: "available",
    features: ["فيبر ABS", "الموتور ما اتحلش — الوشوش مش حالة", "الشاسيه سليم", "رش نضافة"] },

  { code: 41, brand: "Honda", model: "Hornet 600", year: 2004, type: "naked", cc: 600, km: "61,500", location: "السويس", license: "سنة ونص — مرور السويس", price: 145, status: "available",
    features: ["وشين صيانة فقط", "فردتين جداد", "تعديلات خارجية كتير", "شكمان ستوك", "مش محتاجة جنيه مصروف"] },

  { code: 44, brand: "Kawasaki", model: "Z1000", year: 2018, type: "naked", cc: 1000, km: "20,000", location: "المعتمدية", license: "سنتين ونص — مرور العجوزة", price: 760, status: "available",
    features: ["أول مالك من الإفراج", "الموتور ما اتحلش مسمار", "علبتين تعديل", "فردتين كاوتش جداد", "طقم آلات جر جديد"] },

  { code: 45, brand: "Honda", model: "Hornet 600 ABS", year: 2008, type: "naked", cc: 600, km: "49,000", location: "المنصورة", license: "سنة و5 شهور — مرور القاهرة", price: 260, status: "available",
    features: ["شكمان Akrapovic", "شنطة + راك + إسكرينة", "Belly Pan + Tank Side Covers + Rear Hugger", "مرايات وحامل موبايل JDR", "فردتين جداد", "وشين صيانة فقط — الموتور سليم"] },

  { code: 47, brand: "Honda", model: "Hornet 600", year: 2004, type: "naked", cc: 600, km: "60,000", location: "بنها", license: "حتى آخر 2027 — مرور المنوفية", price: 160, status: "available",
    features: ["طنابير أمامي تعديل", "علبة SC Project", "كلبرات فرامل تعديل", "كاوتش أمامي 80% / خلفي 70%", "رش ديل + ملحوظة بسيطة في التنك"] },


  { code: 53, brand: "BMW", model: "S1000R", year: null, type: "naked", cc: 1000, km: "32,000", location: "—", license: "رخصة 3 سنين", price: 520, status: "available",
    features: ["صيانات توكيل", "فابريكا بالكامل", "كل الصيانات معمولة", "مش محتاج جنيه مصروف"] },


  { code: 55, brand: "Honda", model: "Hornet 600", year: 2008, type: "naked", cc: 600, km: "—", location: "سوهاج", license: "منتهية — مرور الإسكندرية", price: 225, status: "available",
    features: ["وش زيت فقط + كارتيرة سفلية جديدة", "جنزير وأتيال جديد", "تنظيف إنجكشن + رشاشات جديدة", "بوجيهات + دورة مياه + بلي جنط", "شكمان وفلتر هوا تعديل + لمبة زينون", "سلايدرات + سكن", "إمكانية التوصيل للمشتري الجاد"] },

  { code: 62, brand: "Honda", model: "Hornet 600", year: 2007, type: "naked", cc: 600, km: "26,000", location: "المنصورة", license: "3 سنين من الإفراج", price: 270, status: "available",
    features: ["من أجدد الموجود في مصر", "فابريكا بالكامل بدون عيوب", "طبقة حماية نانو جلاس (ضمان 3 سنين)", "Engine Guard + سلايدرات", "إسكرينة + لمبتين LED + مقابض تعديل"] },

  { code: 63, brand: "Honda", model: "Hornet 919", year: 2002, type: "naked", cc: 900, km: "—", location: "أسيوط", license: "رخصة سنتين", price: 190, status: "available",
    features: ["الموتور 10/10", "بطارية + زيت + فلتر + بوجيهات جديدة", "كاوتش خلفي جديد / أمامي 80%", "كل الكهربا والعداد شغالين", "راشة كلها بدون حوادث", "محتاجة طقم ديسك أمامي فقط"] },

  { code: 65, brand: "Suzuki", model: "GSX-R 600", year: 2013, type: "sport", cc: 600, km: "18,000", location: "العبور", license: "إفراج أستراليا", price: 460, status: "available",
    features: ["الفيبر أوريجنال", "ما اتحلش أي حاجة", "رش بسيط في الديل"] },

  { code: 66, brand: "Honda", model: "Hornet 600", year: 2006, type: "naked", cc: 600, km: "60,000", location: "بشتيل", license: "3 سنين — مرور الزمالك", price: 200, status: "available",
    features: ["فرد كاوتش جديد", "وش الزيت فقط", "كتينة أوريجنال جديدة", "راشة تغيير لون", "كل الصيانة معمولة"] },

  { code: 67, brand: "Honda", model: "Hornet 919", year: 1998, type: "naked", cc: 900, km: "—", location: "الزاوية الحمراء", license: "سنتين ونص", price: 135, status: "available",
    features: ["ستاندر ياباني أصلي", "مش راشة حاجة", "مرايات وإشارات تعديل", "كاوتشات جديدة قدام وورا"] },

  { code: 69, brand: "Suzuki", model: "Hayabusa GSX1300R", year: 2014, type: "sport", cc: 1300, km: "29,000", location: "الشيخ زايد", license: "رخصة سنتين — إفراج اليابان", price: 660, status: "available",
    features: ["Pearl Mira Red — Gen 2", "Full ABS Brembo", "Brembo levers & masters", "مساعد خلفي Öhlins", "Full titanium exhaust", "مرايات وغطاء جنزير كاربون", "Hydraulic steering damper", "حالة نادرة جدًا"] },

  { code: 70, brand: "Honda", model: "Scooter 250cc", year: 2008, type: "scooter", cc: 250, km: "—", location: "—", license: "منتهية", price: 140, status: "available",
    features: ["شكمان وفلتر تعديل", "مرايات تعديل", "كل الصيانة معمولة", "راشة — اللون الأساسي دم غزال"] },

  { code: 71, brand: "Honda", model: "CBR 600 F4i Sport", year: 2001, type: "sport", cc: 600, km: "—", location: "حلوان — 15 مايو", license: "حتى آخر السنة — مرور حدائق الأهرام", price: 225, status: "available",
    features: ["الموتور ما اتحلش مسمار"] },

  { code: 72, brand: "Honda", model: "Hornet 600", year: 2009, type: "naked", cc: 600, km: "39,000", location: "الخانكة", license: "3 سنين من الإفراج — مرور قويسنا", price: 350, status: "available",
    features: ["جديدة جدًا", "فابريكا بالكامل", "الموتور ما اتحلش مسمار"] },

  { code: 73, brand: "Kawasaki", model: "Ninja ZX-10R", year: 2015, type: "sport", cc: 1000, km: "18,000", location: "—", license: "Clean title", price: 690, status: "available",
    features: ["Hotbodies MGP Growler exhaust + link pipe", "Dynojet Power Commander V + Autotune", "K&N high-flow air filter", "Puig dark smoke windshield", "Carbon fiber seats", "Engine guard + axle sliders", "Michelin Power GP2", "All services done"] },

  { code: 75, brand: "Kawasaki", model: "Ninja 1000 (Z1000SX)", year: 2013, type: "sport", cc: 1000, km: "32,000", location: "المرج", license: "3 سنين — مرور مدينة نصر", price: 470, status: "available",
    features: ["فابريكا بالكامل", "وش الزيت فقط + ورق دبرياج جديد", "كل السيرفس معمول"] },

  { code: 79, brand: "Honda", model: "Hornet 600", year: 2008, type: "naked", cc: 600, km: "42,000", location: "المنصورة", license: "إفراج 2026", price: 315, status: "available",
    features: ["فابريكا بالكامل", "الموتور ما اتحلش مسمار", "مش محتاجة جنيه مصروف"] },

  { code: 82, brand: "Honda", model: "Hornet 600", year: 2005, type: "naked", cc: 600, km: "—", location: "الفيوم", license: "3 سنين إلا 3 شهور — مرور الفيوم", price: 185, status: "available",
    features: ["الموتور ما اتحلش (ولا وشوش)", "راشة بالكامل", "المساعدين الأمامي والأسطوانة محتاجين شغل"] },

  { code: 83, brand: "Suzuki", model: "GSX-S1000", year: 2016, type: "naked", cc: 1000, km: "37,000", location: "السويس", license: "3 سنين — مرور السويس", price: 490, status: "available",
    features: ["ستوك", "سيرفس حديث", "فابريكا بدون خدوش", "الفيبر أوريجنال"] },

  { code: 85, brand: "Honda", model: "CBR 600RR", year: 2009, type: "sport", cc: 600, km: "51,000", location: "العبور", license: "منتهية — مرور الأميرية", price: 290, status: "available",
    features: ["فيبر ABS", "وشين صيانة فقط", "كل الصيانة معمولة", "كل حاجة في البايك جديدة"] },

  { code: 86, brand: "Honda", model: "Hornet 600", year: 2006, type: "naked", cc: 600, km: "39,000", location: "كرداسة", license: "سنتين — أول توكيل", price: 230, status: "available",
    features: ["فابريكا — ما اتحلش ولا وش", "3,000 كم بس في مصر", "كاوتش أمامي 100% / خلفي 75%", "راك + مقبض تانك + سلايدرات تعديل", "رفرف خلفي + علبة جنزير + إسكرينة"] },

  { code: 87, brand: "Honda", model: "Hornet 600", year: 2004, type: "naked", cc: 600, km: "—", location: "الفيوم", license: "سنتين — مرور البحيرة", price: 135, status: "available",
    features: ["ما اتحلش حاجة خالص", "مش راشة أي حاجة"] },

  { code: 89, brand: "Honda", model: "CBR 600 F4i Sport", year: 2001, type: "sport", cc: 600, km: "38,000", location: "الإسكندرية", license: "إفراج", price: 290, status: "available",
    features: ["جنبين وتانك ورفرف فابريكا", "فلتر K&N أوريجنال", "كاربون فايبر", "لمض LED", "آلات جر جديدة"] },

  { code: 90, brand: "Honda", model: "Hornet 600", year: 2006, type: "naked", cc: 600, km: "65,000", location: "حدائق حلوان", license: "سنتين — مرور المعادي", price: 195, status: "available",
    features: ["وش واحد فقط — الموتور ما اتحلش", "مرايات + جادون + شكمان تعديل", "مقبض وسلايدرات تعديل", "رش نضافة", "مش محتاجة أي مصاريف"] },

  { code: 91, brand: "Suzuki", model: "GSR 600 (بيبي كينج)", year: 2007, type: "naked", cc: 600, km: "50,000", location: "شبين القناطر", license: "رخصة سنتين — مرور حدائق الأهرام", price: 205, status: "available",
    features: ["وشوش الصيانة فقط", "فردتين كاوتش جداد (95%)", "آلات جر 90%", "راشة كلها ما عدا التانك (تغيير لون) — كل الأجزاء سليمة", "متاح للبدل"] },

  { code: 92, brand: "Honda", model: "Hornet 600", year: 2007, type: "naked", cc: 600, km: "73,000", location: "السويس", license: "رخصة سنة — مرور السويس", price: 240, status: "available",
    features: ["الموتور سليم ما اتحلش أي حاجة", "فردة قدام جديدة", "كل الصيانات معمولة (زيت وفلتر)", "علبة SC Project + العلبة الأصلية موجودة", "ديل ومقابض تعديل", "راشة"] },
];
