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

  { code: 7, brand: "Honda", model: "CBR 600RR", year: 2012, type: "sport", cc: 600, km: "26,000", location: "الشرقية", license: "سارية حتى 2028 — مرور مدينة نصر", price: 300, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["الموتور ما اتحلش — اتفتح وش الزيت للصيانة فقط", "الفيبر متغير وفيه كسور (موضح بشفافية)", "المعاينة والفحص بأي فني"] },

  { code: 8, brand: "Honda", model: "Hornet 600 Injection", year: 2007, type: "naked", cc: 600, km: "68,000", location: "الشرقية", license: "رخصة 3 سنين — مرور طوخ", price: 210, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["الموتور ما اتحلش مسمار (وش الزيت فقط)", "الفردة الخلفي 80%", "محتاج فردة أمامي فقط"] },

  { code: 9, brand: "Honda", model: "CBR 600RR ABS", year: 2012, type: "sport", cc: 600, km: "49,000", location: "—", license: "الرخصة منتهية", price: 345, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["فرامل ABS + فايبر ABS", "مغير زيت وفلتر من 100 كم", "صيانة كاملة معمولة", "الموتور ما اتحلش مسمار", "محتاج أولسية مساعد"] },

  { code: 11, brand: "Honda", model: "CBR 1000RR", year: 2013, type: "sport", cc: 1000, km: "29,000", location: "—", license: "—", price: 510, status: "available",
    features: ["فابريكا بالكامل", "حالل وشين صيانة فقط — الموتور ما اتحلش", "مش محتاجة جنيه مصروف"] },

  { code: 12, brand: "Honda", model: "CB650R", year: 2023, type: "naked", cc: 650, km: "24,000", location: "بورسعيد", license: "—", price: 400, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["عداد TFT ديجيتال", "ABS + Traction Control", "Quick Shifter", "Full System Akrapovic", "Camera System", "دواسات Arashi", "Engine Guard كامل + سلايدرات", "مقابض وفرامل أوريجنال"] },

  { code: 22, brand: "Honda", model: "CBR 600 F4i", year: 2002, type: "sport", cc: 600, km: "—", location: "6 أكتوبر", license: "أول رخصة من الإفراج", price: 235, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["ستوك بالكامل بحالة المصنع", "الموتور ما اتحلش غير وش الكهربا للصيانة", "بطارية + رادياتير + مياه جديدة", "لمبات LED", "علبة تعديل: هادية على الـLow وصوت رعد على الـHigh RPM", "متسرفز بالكامل — مش محتاج مصاريف"] },

  { code: 24, brand: "Honda", model: "Steed 400", year: 1995, type: "cruiser", cc: 400, km: "—", location: "سوهاج", license: "منتهية — مرور الجيزة", price: 53, status: "available",
    features: ["محتاج عمرة", "لقطة للي فاهم وعايز يعملها على نضافة"] },

  { code: 26, brand: "Suzuki", model: "Burgman 650", year: 2006, type: "scooter", cc: 650, km: "—", location: "السويس", license: "هتتجدد سنة للمشتري", price: 190, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["الموتور ما اتحلش", "مش محتاج جنيه مصاريف", "فردة قدام جديدة", "سيستم شكمان تعديل", "مرايات ضم"] },

  { code: 28, brand: "Honda", model: "Hornet 600", year: 2004, type: "naked", cc: 600, km: "53,700", location: "المنصورة", license: "3 سنين إلا 3 شهور", price: 200, status: "available",
    features: ["السعر فيه تفاوض", "الموتور ما اتحلش", "رش بسيط في التنك متعمول كويس"] },

  { code: 29, brand: "Honda", model: "Hornet 600", year: 2004, type: "naked", cc: 600, km: "—", location: "الفيوم", license: "3 سنين — مرور المنوفية", price: 200, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["الموتور ما اتحلش خالص", "العجل زيرو", "رش نضافة برة مصر"] },


  { code: 31, brand: "Honda", model: "Hornet 600", year: 2004, type: "naked", cc: 600, km: "70,000", location: "الدقهلية", license: "إفراج بورسعيد", price: 200, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["ما اتحلش أي حاجة", "مش راشة", "كتينة وشداد أصلي جديد", "بلاطة شحن جديدة", "سيستم شكمان كامل تعديل"] },

  { code: 35, brand: "Kawasaki", model: "Ninja ZX-6R", year: 2008, type: "sport", cc: 600, km: "25,000", location: "التجمع الخامس", license: "هتتجدد سنة — مرور التجمع", price: 260, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["ستوك بالكامل + سلايدرات", "راشة كلها"] },

  { code: 39, brand: "Honda", model: "Hornet 919", year: 2002, type: "naked", cc: 900, km: "45,000", location: "إمبابة", license: "مرور الجيزة", price: 195, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["مش راشة قبل كده", "زيت Motul 7100 أصلي", "آلات جر وورق دبرياج جديد", "جادون وحامل نمر تعديل", "تنبورة خلفي جديدة", "محتاجة كتينة"] },

  { code: 40, brand: "Honda", model: "CBR 600RR", year: 2008, type: "sport", cc: 600, km: "68,000", location: "ملوي — المنيا", license: "رخصة 3 سنين", price: 280, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["فيبر ABS", "الموتور ما اتحلش — الوشوش مش حالة", "الشاسيه سليم", "رش نضافة"] },

  { code: 41, brand: "Honda", model: "Hornet 600", year: 2004, type: "naked", cc: 600, km: "61,500", location: "السويس", license: "سنة ونص — مرور السويس", price: 145, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["وشين صيانة فقط", "فردتين جداد", "تعديلات خارجية كتير", "شكمان ستوك", "مش محتاجة جنيه مصروف"] },

  { code: 44, brand: "Kawasaki", model: "Z1000", year: 2018, type: "naked", cc: 1000, km: "20,000", location: "المعتمدية", license: "سنتين ونص — مرور العجوزة", price: 760, status: "available",
    features: ["أول مالك من الإفراج", "الموتور ما اتحلش مسمار", "علبتين تعديل", "فردتين كاوتش جداد", "طقم آلات جر جديد"] },

  { code: 45, brand: "Honda", model: "Hornet 600 ABS", year: 2008, type: "naked", cc: 600, km: "49,000", location: "المنصورة", license: "سنة و5 شهور — مرور القاهرة", price: 260, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["شكمان Akrapovic", "شنطة + راك + إسكرينة", "Belly Pan + Tank Side Covers + Rear Hugger", "مرايات وحامل موبايل JDR", "فردتين جداد", "وشين صيانة فقط — الموتور سليم"] },

  { code: 47, brand: "Honda", model: "Hornet 600", year: 2004, type: "naked", cc: 600, km: "60,000", location: "بنها", license: "حتى آخر 2027 — مرور المنوفية", price: 160, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["طنابير أمامي تعديل", "علبة SC Project", "كلبرات فرامل تعديل", "كاوتش أمامي 80% / خلفي 70%", "رش ديل + ملحوظة بسيطة في التنك"] },


  { code: 53, brand: "BMW", model: "S1000R", year: null, type: "naked", cc: 1000, km: "32,000", location: "—", license: "رخصة 3 سنين", price: 520, status: "available",
    features: ["صيانات توكيل", "فابريكا بالكامل", "كل الصيانات معمولة", "مش محتاج جنيه مصروف"] },


  { code: 55, brand: "Honda", model: "Hornet 600", year: 2008, type: "naked", cc: 600, km: "—", location: "سوهاج", license: "منتهية — مرور الإسكندرية", price: 225, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["وش زيت فقط + كارتيرة سفلية جديدة", "جنزير وأتيال جديد", "تنظيف إنجكشن + رشاشات جديدة", "بوجيهات + دورة مياه + بلي جنط", "شكمان وفلتر هوا تعديل + لمبة زينون", "سلايدرات + سكن", "إمكانية التوصيل للمشتري الجاد"] },

  { code: 62, brand: "Honda", model: "Hornet 600", year: 2007, type: "naked", cc: 600, km: "26,000", location: "المنصورة", license: "3 سنين من الإفراج", price: 270, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["من أجدد الموجود في مصر", "فابريكا بالكامل بدون عيوب", "طبقة حماية نانو جلاس (ضمان 3 سنين)", "Engine Guard + سلايدرات", "إسكرينة + لمبتين LED + مقابض تعديل"] },

  { code: 63, brand: "Honda", model: "Hornet 919", year: 2002, type: "naked", cc: 900, km: "—", location: "أسيوط", license: "رخصة سنتين", price: 190, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["الموتور 10/10", "بطارية + زيت + فلتر + بوجيهات جديدة", "كاوتش خلفي جديد / أمامي 80%", "كل الكهربا والعداد شغالين", "راشة كلها بدون حوادث", "محتاجة طقم ديسك أمامي فقط"] },

  { code: 65, brand: "Suzuki", model: "GSX-R 600", year: 2013, type: "sport", cc: 600, km: "18,000", location: "العبور", license: "إفراج أستراليا", price: 460, status: "available",
    features: ["الفيبر أوريجنال", "ما اتحلش أي حاجة", "رش بسيط في الديل"] },

  { code: 66, brand: "Honda", model: "Hornet 600", year: 2006, type: "naked", cc: 600, km: "60,000", location: "بشتيل", license: "3 سنين — مرور الزمالك", price: 200, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["فرد كاوتش جديد", "وش الزيت فقط", "كتينة أوريجنال جديدة", "راشة تغيير لون", "كل الصيانة معمولة"] },

  { code: 67, brand: "Honda", model: "CBR900RR Fireblade (919)", year: 1998, type: "sport", cc: 900, km: "—", location: "الزاوية الحمراء", license: "سنتين ونص", price: 135, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["ستاندر ياباني أصلي", "مش راشة حاجة", "مرايات وإشارات تعديل", "كاوتشات جديدة قدام وورا"] },

  { code: 69, brand: "Suzuki", model: "Hayabusa GSX1300R", year: 2014, type: "sport", cc: 1300, km: "29,000", location: "الشيخ زايد", license: "رخصة سنتين — إفراج اليابان", price: 660, status: "available",
    features: ["Pearl Mira Red — Gen 2", "Full ABS Brembo", "Brembo levers & masters", "مساعد خلفي Öhlins", "Full titanium exhaust", "مرايات وغطاء جنزير كاربون", "Hydraulic steering damper", "حالة نادرة جدًا"] },

  { code: 70, brand: "Honda", model: "Scooter 250cc", year: 2008, type: "scooter", cc: 250, km: "—", location: "—", license: "منتهية", price: 140, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["شكمان وفلتر تعديل", "مرايات تعديل", "كل الصيانة معمولة", "راشة — اللون الأساسي دم غزال"] },

  { code: 71, brand: "Honda", model: "CBR 600 F4i Sport", year: 2001, type: "sport", cc: 600, km: "—", location: "حلوان — 15 مايو", license: "حتى آخر السنة — مرور حدائق الأهرام", price: 225, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["الموتور ما اتحلش مسمار"] },

  { code: 72, brand: "Honda", model: "Hornet 600", year: 2009, type: "naked", cc: 600, km: "39,000", location: "الخانكة", license: "3 سنين من الإفراج — مرور قويسنا", price: 350, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["جديدة جدًا", "فابريكا بالكامل", "الموتور ما اتحلش مسمار"] },

  { code: 73, brand: "Kawasaki", model: "Ninja ZX-10R", year: 2015, type: "sport", cc: 1000, km: "18,000", location: "—", license: "Clean title", price: 690, status: "available",
    features: ["Hotbodies MGP Growler exhaust + link pipe", "Dynojet Power Commander V + Autotune", "K&N high-flow air filter", "Puig dark smoke windshield", "Carbon fiber seats", "Engine guard + axle sliders", "Michelin Power GP2", "All services done"] },

  { code: 75, brand: "Kawasaki", model: "Z1000SX", year: 2013, type: "sport", cc: 1000, km: "32,000", location: "المرج", license: "3 سنين — مرور مدينة نصر", price: 400, status: "available",
    features: ["السعر فيه تفاوض", "فابريكا بالكامل", "وش الزيت فقط + ورق دبرياج جديد", "كل السيرفس معمول"] },

  { code: 79, brand: "Honda", model: "Hornet 600", year: 2008, type: "naked", cc: 600, km: "42,000", location: "المنصورة", license: "إفراج 2026", price: 315, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["فابريكا بالكامل", "الموتور ما اتحلش مسمار", "مش محتاجة جنيه مصروف"] },

  { code: 82, brand: "Honda", model: "Hornet 600", year: 2005, type: "naked", cc: 600, km: "—", location: "الفيوم", license: "3 سنين إلا 3 شهور — مرور الفيوم", price: 185, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["الموتور ما اتحلش (ولا وشوش)", "راشة بالكامل", "المساعدين الأمامي والأسطوانة محتاجين شغل"] },

  { code: 83, brand: "Suzuki", model: "GSX-S1000", year: 2016, type: "naked", cc: 1000, km: "37,000", location: "السويس", license: "3 سنين — مرور السويس", price: 490, status: "available",
    features: ["ستوك", "سيرفس حديث", "فابريكا بدون خدوش", "الفيبر أوريجنال"] },

  { code: 85, brand: "Honda", model: "CBR 600RR", year: 2009, type: "sport", cc: 600, km: "51,000", location: "العبور", license: "منتهية — مرور الأميرية", price: 290, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["فيبر ABS", "وشين صيانة فقط", "كل الصيانة معمولة", "كل حاجة في البايك جديدة"] },

  { code: 86, brand: "Honda", model: "Hornet 600", year: 2006, type: "naked", cc: 600, km: "39,000", location: "كرداسة", license: "سنتين — أول توكيل", price: 200, status: "available",
    features: ["السعر فيه تفاوض", "فابريكا — ما اتحلش ولا وش", "3,000 كم بس في مصر", "كاوتش أمامي 100% / خلفي 75%", "راك + مقبض تانك + سلايدرات تعديل", "رفرف خلفي + علبة جنزير + إسكرينة"] },



  { code: 90, brand: "Honda", model: "Hornet 600", year: 2006, type: "naked", cc: 600, km: "65,000", location: "حدائق حلوان", license: "سنتين — مرور المعادي", price: 195, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["حالل جوان وش السلندر فقط", "مرايات + جادون + شكمان تعديل", "مقبض وسلايدرات تعديل", "رش نضافة", "مش محتاجة أي مصاريف"] },


  { code: 92, brand: "Honda", model: "Hornet 600", year: 2007, type: "naked", cc: 600, km: "73,000", location: "السويس", license: "رخصة سنة — مرور السويس", price: 240, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["الموتور سليم ما اتحلش أي حاجة", "فردة قدام جديدة", "كل الصيانات معمولة (زيت وفلتر)", "علبة SC Project + العلبة الأصلية موجودة", "ديل ومقابض تعديل", "راشة"] },


  { code: 101, brand: "Honda", model: "Hornet 600", year: 2005, type: "naked", cc: 600, km: "43,000", location: "—", license: "منتهية من 6 شهور", price: 210, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["الموتور ما اتحلش", "سيرفس كامل: زيت وفلتر + بوجيهات NGK + دورة مياه", "تعديلات كتير — وكل القطع الاستوك معاها", "رش نضافة"] },

  { code: 103, brand: "Suzuki", model: "GSR 600 (بيبي كينج)", year: 2008, type: "naked", cc: 600, km: "54,000", location: "المنصورة", license: "3 سنين — مرور المنصورة", price: 240, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["الموتور ما اتحلش أي حاجة", "رش الفيبرة اللي تحت الكرسي فقط", "بوكس GIVI + راك", "إسكرينة + سلايدرات + تانك باد", "لسه بالنايلون على الكرسي"] },

  { code: 104, brand: "Honda", model: "VTX 1800 F3", year: 2005, type: "cruiser", cc: 1800, km: "45,000", location: "الشروق / مدينتي", license: "رخصة سنة — مرور الشروق", price: 360, sale: { off: 5, until: "2026-10-28T18:09:16Z" }, status: "available",
    features: ["الموتور ما اتحلش أي حاجة", "كل الصيانات معمولة", "كرسي تعديل بتسخين وتبريد", "شكمان Cobra", "مقابض ومرايات تعديل", "راشة تغيير لون فقط"] },


  { code: 106, brand: "Honda", model: "Hornet 600 ABS", year: 2007, type: "naked", cc: 600, km: "75,700", location: "المهندسين", license: "رخصة 3 سنين", price: 300, status: "available",
    features: ["فابريكا بالكامل", "أول مالك بعد الإفراج", "فرامل ABS بحالة زيرو + طنابير زيرو", "كاوتش وجنزير بحالة ممتازة", "صيانة كاملة + بوجيهات NGK Laser Iridium", "شكمان تعديل أصلي", "مقابض ومرايات تعديل + حامل موبايل"] },
  { code: 111, brand: "Honda", model: "Hornet 600", year: 2002, type: "naked", cc: 600, km: "65,000 (العداد مش شغال)", location: "السويس", license: "رخصة لحد 10/2028", price: 135, status: "available", features: ["الموتور سليم ما اتفتحش", "زيت Motul جديد", "آلات جر كاملة جديدة", "علبة شكمان Akrapovič تعديل", "كاوتش خلفي 90% / أمامي 70%", "محتاجة فردة أمامي + تنضيف كربراتير + أويل سيلات مساعدين أمامي"] },
  { code: 112, brand: "Honda", model: "Hornet 600", year: 2007, type: "naked", cc: 600, km: "54,000", location: "السويس", license: "مرور السويس", price: 310, status: "available", features: ["أول مالك", "الموتور ما اتفتحش ولا مسمار", "سيستم شكمان Akrapovič جاي متعدل من بره", "ديل تعديل من بره", "كاوتش 90%", "آلات جر ممتازة"] },
  { code: 126, brand: "Honda", model: "Hornet 600", year: 2002, type: "naked", cc: 600, km: "—", location: "الشرقية", license: "منتهية من 10/2026", price: 115, status: "available", features: ["الموتور ما اتحلش غير وش الدبرياج", "كاوتش أمامي جديد / خلفي 60%", "مساعدين 100%", "الكهربا كلها شغالة", "شكمان Yoshimura + جادون ذهبي", "التانك مصدي من جوه (موضح)"] },
  { code: 127, brand: "Honda", model: "Hornet 600", year: 2006, type: "naked", cc: 600, km: "—", location: "الإسكندرية", license: "رخصة سنتين", price: 180, status: "available", features: ["صيانة كاملة: ظبط تكييهات وكربراتير + بوجيهات NGK جديدة", "كاتينة وشداد جداد + جنزير MTX جديد", "بطارية Yuasa زيرو + Motul جديد + مية Super Cool", "تيل فرامل أمامي جديد", "شكمان MIVV + مقابض Barracuda + سلايدرات", "كاوتش خلفي 70%", "العيوب: شغل فايبر، لحام نحاس تحت التانك، الإشارة اليمين، ومحتاجة ورق دبرياج"] },
  { code: 130, brand: "Zontes", model: "368G", year: 2026, type: "scooter", cc: 368, km: "9,500", location: "القاهرة", license: "رخصة سنتين", price: 210, status: "available", features: ["موديل 2026 — عداد 9,500 بس", "ما اتحلش أي حاجة", "كل الصيانات معمولة", "شكمان Akrapovič + جنوط سلك", "رش كامل (Custom Paint)"] },
  { code: 135, brand: "Honda", model: "XR125L (Off-road)", year: 2013, type: "naked", cc: 125, km: "—", location: "الخصوص", license: "منتهية من سنة وشهرين — البيع بعقد مسجل", price: 60, status: "available", features: ["السعر فيه تفاوض", "حالة فوق", "كاوتش أمامي جديد إنتاج 2025 / خلفي 60%", "محتاجة عداد وبطارية"] },
  { code: 138, brand: "Honda", model: "CBR600RR", year: 2008, type: "sport", cc: 600, km: "—", location: "الرحاب", license: "رخصة 3 سنين", price: 305, status: "available", features: ["مش حالل حاجة — غير كاتينة وشداد صيانة", "الفايبر أصلي (ما عدا الجنب الشمال)", "الموتوسيكل مبيسخنش", "كاوتش جديد + تيل جديد", "شكمان + فلتر هوا + عداد تعديل"] },
  { code: 140, brand: "Honda", model: "Hornet 600", year: 2006, type: "naked", cc: 600, km: "32,000 (شرعي)", location: "القليوبية", license: "رخصة سنتين وشوية", price: 240, status: "available", features: ["مش راشة حاجة", "ما اتحلش أي حاجة", "عداد 32 ألف شرعي", "كاوتش خلفي زيرو", "شكمان MIVV تعديل"] },
  { code: 142, brand: "Honda", model: "Hornet 600", year: 2004, type: "naked", cc: 600, km: "—", location: "المطرية — الدقهلية", license: "رخصة سنتين ونص", price: 260, status: "available", features: ["ما اتحلش مسمار", "مش راشة حاجة", "كاوتش بحالة ممتازة", "مرجيحة DPM Race"] },
  { code: 143, brand: "Honda", model: "Hornet 600", year: 2008, type: "naked", cc: 600, km: "—", location: "المطرية — الدقهلية", license: "إفراج", price: 330, status: "available", features: ["إفراج — الجيل الجديد (2008)", "ما اتحلش مسمار", "مش راشة حاجة", "كاوتش بحالة ممتازة", "شنط GIVI جانبية + خلفية", "شكمان تعديل + حمايات موتور"] },
  { code: 152, brand: "Honda", model: "Silver Wing 400", year: 2012, type: "scooter", cc: 400, km: "25,000", location: "الإسكندرية — كليوباترا", license: "رخصة سنة", price: 235, status: "available", features: ["مش راشة ومش حالّة أي حاجة", "عداد 25 ألف", "شنطة خلفية + زجاج طويل", "مريحة للمشاوير والسفر"] },
  { code: 160, brand: "Honda", model: "Hornet 600", year: 2007, type: "naked", cc: 600, km: "37,000", location: "الجيزة", license: "إفراج", price: 295, status: "available", features: ["مش حالل حاجة", "مش محتاجة أي مصاريف", "عداد 37 ألف", "شكمان تعديل صوته عالي", "كاوتش Pirelli + شنطة GIVI خلفية + إسكرينة"] },
  { code: 161, brand: "Honda", model: "Hornet 600", year: 2010, type: "naked", cc: 600, km: "25,000", location: "المهندسين", license: "رخصة من الإفراج", price: 330, status: "available", features: ["فابريكا بالكامل", "عداد 25 ألف بس", "مش حالّة حاجة", "مش محتاجة أي مصاريف", "شكمان Arrow + كرسي تعديل"] },
  { code: 165, brand: "Honda", model: "CBR600 F4i", year: 2003, type: "sport", cc: 600, km: "17,000 (شرعي)", location: "سوهاج", license: "3 سنين — من وش الإفراج", price: 205, status: "available", features: ["عداد 17 ألف شرعي", "سيرفيس كامل + بطارية جديدة", "كاوتش أمامي وخلفي إنتاج 2024 — زيرو", "رش اللون الأبيض (مثبت في الرخصة)"] },
  { code: 171, brand: "Honda", model: "CBR1000RR Fireblade", year: 2008, type: "sport", cc: 1000, km: "40,000", location: "المنصورة", license: "سنتين وكسور — مرور المنصورة", price: 340, status: "available", features: ["الموتور ما اتحلش مسمار غير وش وستاندر صيانة", "آلات جر جديدة + كل السيرفيس معمول", "مش محتاجة أي مصاريف", "ABS — الفايبر حالته 80%", "توب ورفرف كاربون + علبة SC Project", "كاوتشات زيرو + مرايات ومقابض تعديل + فوانيس LED"] },
  { code: 172, brand: "Suzuki", model: "GSR600 (Baby King)", year: 2006, type: "naked", cc: 600, km: "52,000", location: "مصر الجديدة", license: "إفراج — أول مالك (رخصة لحد 12)", price: 200, status: "available", features: ["إفراج — أول مالك", "ما اتحلش أي حاجة", "زيت وفلتر زيت لسه متغيرين + تيل فرامل جديد", "أويل سيلات مساعدين جديدة", "سكين تعديل + شكمانين Akrapovič (والاستوك موجود)", "كسر بسيط في الرفرف + جرح في الموتور من قدام (موضح)"] },
  { code: 175, brand: "Yamaha", model: "R6", year: 2006, type: "sport", cc: 600, km: "53,000 (شرعي)", location: "الجيزة (أكتوبر / زايد / حدائق الأهرام)", license: "رخصة سنتين", price: 350, status: "available", features: ["السعر فيه تفاوض", "عداد 53 ألف شرعي مش ملعوب فيه", "مش حالل أي حاجة ولا راشش", "لسه عامل صيانة كاملة ومغير بوجيهات", "Dynojet Power Commander 5", "فلتر هوا K&N", "علبة Akrapovič Slip-on", "كاوتشات نضيفة", "مقابض بنزين وفرامل ودبرياج تعديل + سكرينة تعديل"] },
  { code: 177, brand: "Honda", model: "Hornet 600", year: 2008, type: "naked", cc: 600, km: "39,000", location: "الإسكندرية", license: "سنتين و3 شهور (على الشباك)", price: 240, status: "available", features: ["مش حالّة حاجة غير وش كهربا للصيانة", "عداد 39 ألف", "محتاجة: فردة كاوتش قدام + باغة فانوس خلفي", "كرسي تعديل + استيكر جنوط"] },
  { code: 180, brand: "Honda", model: "VTX 1300 (Bobber)", year: 2005, type: "cruiser", cc: 1300, km: "38,000 ميل", location: "6 أكتوبر", license: "رخصة سنة", price: 300, status: "available", features: ["متعدلة بالكامل بوبر ستايل", "مش حالّة حاجة", "محتاجة فردة كاوتش — وتمنها هيتخصم من السعر"] },
  { code: 192, brand: "Honda", model: "Hornet 600", year: 2006, type: "naked", cc: 600, km: "51,000 (شرعي)", location: "شبرا مصر", license: "—", price: 220, status: "available", features: ["السعر فيه تفاوض", "مش محتاجة مصاريف — سيرفيس كامل", "مغير ورق دبرياج أصلي", "علبة MIVV كاربون أورجينال", "فردتين كاوتش CST + سلايدرز حماية", "مقابض تعديل + مقبض وبطانة تانك + حامل نمر", "ملحوظات بسيطة في فايبر الديل"] },
  { code: 199, brand: "Honda", model: "Hornet 600", year: 2004, type: "naked", cc: 600, km: "—", location: "—", license: "رخصة سنة", price: 140, status: "available", features: ["آلات جر جديدة لسه راكبة + كتينة زيرو", "الموتور صوته ناعم — معمول شمايز ستاندر بس", "كاوتش أمامي 95% وخلفي 75%", "علبة SC تعديل صوتها حلو + هوايات تعديل"] }
];
