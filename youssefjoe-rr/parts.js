// ====== قطع الغيار ======
// كل قطعة: code (كود نوشن) · name · fits (متوافق مع) · location (مكان القطعة) · price (سعر البيع بالجنيه) · qty · status: "in" | "out" | "order"
// الصور: images/parts/{code}-1.jpg ... photos = عدد الصور (لو 0 بيظهر شكل افتراضي)
const PARTS = [
  { code: 156, name: "شكمان Baby King أصلي", category: "شكمانات", fits: "Suzuki GSR600 (Baby King)", location: "الإسكندرية", price: 8500, qty: 1, status: "in", photos: 5, notes: "" },
  { code: 204, name: "شكمان شكل Akrapovič — سليب أون", category: "شكمانات", fits: "يونيفرسال — اسأل على مقاس الوصلة", location: "", price: 1500, qty: 1, status: "in", photos: 1, notes: "طرف كاربون + حامل تثبيت" },
  { code: 346, name: "جمب ستارتر MOTOBATT MBJ10000 + منفاخ كاوتش", category: "كهربا", fits: "موتوسيكلات وعربيات 12 فولت", location: "", price: 0, qty: 100, status: "in", photos: 1, notes: "بيدوّر الموتوسيكل لو البطارية نايمة من غير كابلات ولا عربية تانية · منفاخ هوا مدمج للكاوتش · باور بانك لشحن الموبايل · كشاف LED" },
  { code: 345, name: "بطاريات MOTOBATT — جل و AGM", category: "كهربا", fits: "مقاسات لمعظم الموتوسيكلات — اسأل على مقاس بايكك", location: "", price: 1300, priceMax: 4100, qty: 100, status: "in", photos: 5, notes: "موديلات متاحة: MTX7A · MTX9A (جل) · MB7BB · MBTX9U · MBT14B4 (AGM) · جاهزة ومقفولة مش محتاجة مية · السعر حسب الموديل — ابعت موديل بايكك ونقولك المناسب" },
  { code: 344, name: "جوانتي LS2 كاربون — جلد وشبك", category: "إكسسوارات", fits: "يونيفرسال", location: "", price: 1800, qty: 100, status: "in", photos: 1, notes: "حماية مفاصل كاربون فايبر · جلد مخرّم في الكف والصوابع · قماش شبك مهوّي · خطوط عاكسة للإضاءة بالليل · اسأل على المقاسات" },
  { code: 343, name: "جوانتي LS2 جلد — زيتي × كحلي", category: "إكسسوارات", fits: "يونيفرسال", location: "", price: 3000, qty: 100, status: "in", photos: 1, notes: "جلد طبيعي مخرّم للتهوية · حماية مفاصل مبطّنة · صوابع قماش جينز وشبك · قفل فيلكرو · اسأل على المقاسات" },
  { code: 342, name: "جوانتي LS2 — حماية مفاصل مخفية", category: "إكسسوارات", fits: "يونيفرسال", location: "", price: 1400, qty: 100, status: "in", photos: 1, notes: "حماية مفاصل مبطّنة جوه القماش · شكل كاجوال ينفع للشارع · قفل فيلكرو · اسأل على المقاسات" },
  { code: 341, name: "جوانتي LS2 صيفي — بحماية مفاصل", category: "إكسسوارات", fits: "يونيفرسال", location: "", price: 1500, qty: 100, status: "in", photos: 1, notes: "شهادة CE · حماية صلبة للمفاصل · قماش شبك مهوّي للصيف · المقاس في الصورة XL — اسأل على باقي المقاسات" },
  { code: 340, name: "ماسك خوذة (بالاكلافا)", category: "إكسسوارات", fits: "تحت أي خوذة — يونيفرسال", location: "", price: 400, qty: 100, status: "in", photos: 1, notes: "قماش خفيف بيتلبس تحت الخوذة · بيحافظ على نضافة بطانة الخوذة · بيحمي من التراب والهوا والشمس" },
  { code: 338, name: "سماعة بلوتوث للخوذة Y20 Max", category: "إكسسوارات", fits: "أي خوذة — يونيفرسال", location: "", price: 1800, qty: 100, status: "in", photos: 1, notes: "بلوتوث · مكالمات وأغاني · ضد المية والتراب · عزل ضوضاء ذكي · بطارية عمر طويل · إضاءة RGB" },
  { code: 337, name: "سماعة إنتركوم للخوذة Y30", category: "إكسسوارات", fits: "أي خوذة — يونيفرسال", location: "", price: 1850, qty: 100, status: "in", photos: 1, notes: "بلوتوث · مكالمات وأغاني وإنتركوم بين راكبين · شاشة ديجيتال · بطارية 1000mAh عمر طويل" },
  { code: 336, name: "خوذة LS2 Advant — رمادي مط، الدقن بتلف 180°", category: "خوذ", fits: "مودولار (فول فيس + أوبن فيس) — يونيفرسال", location: "", price: 12500, qty: 100, status: "in", photos: 4, notes: "شهادة أمان ECE 22.06 · الدقن بتلف 180° لورا وتبقى أوبن فيس · خامة KPA خفيفة وقوية · جاهزة لإنتركوم LINKIN Ride Pal · مناسبة للنضارة — المقاس في الصور S، اسأل على باقي المقاسات" },
  { code: 335, name: "خوذة LS2 Advant X — الدقن بتلف 180°", category: "خوذ", fits: "مودولار (فول فيس + أوبن فيس) — يونيفرسال", location: "", price: 17500, qty: 100, status: "in", photos: 4, notes: "شهادة أمان ECE 22.06 للوضعين (P/J) · الدقن بتلف 180° لورا وتبقى أوبن فيس · قشرة فايبر جلاس HPFC · جاهزة لإنتركوم LS2 4X by Cardo · جاهزة لـ Pinlock · رؤية جانبية واسعة · مناسبة للنضارة — اسأل على المقاسات" },
  { code: 334, name: "خوذة LS2 Challenger II — فايبر جلاس", category: "خوذ", fits: "فول فيس — يونيفرسال", location: "", price: 12800, qty: 100, status: "in", photos: 4, notes: "شهادة أمان ECE 22.06 · قشرة فايبر جلاس HPFC خفيفة وقوية · عدسة Pinlock ضد الشبورة معاها · جاهزة لإنتركوم LS2 · ديزاين إيروديناميك + رؤية جانبية واسعة · مناسبة للنضارة — اسأل على المقاسات" },
  { code: 333, name: "خوذة LS2 Storm III — أسود مط", category: "خوذ", fits: "فول فيس — يونيفرسال", location: "", price: 6800, qty: 100, status: "in", photos: 4, notes: "شهادة أمان ECE 22.06 · خامة KPA خفيفة وقوية · عدسة Pinlock ضد الشبورة معاها · جاهزة لإنتركوم LS2 · زجاج ضد الخدش وUV · مناسبة للنضارة · تهوية عالية — اسأل على المقاسات" },
  { code: 332, name: "خوذة LS2 Rapid III", category: "خوذ", fits: "فول فيس — يونيفرسال", location: "", price: 3500, qty: 100, status: "in", photos: 4, notes: "شهادة أمان ECE 22.06 · خامة HPTT خفيفة وقوية · زجاج ضد الخدش وUV · مناسبة للنضارة · بطانة مريحة ضد الحساسية · تهوية عالية · جاهزة لـ Pinlock — اسأل على المقاسات" },
  { code: 274, name: "خوذة LS2 Rapid II", category: "خوذ", fits: "فول فيس — يونيفرسال", location: "", price: 3100, qty: 100, status: "in", photos: 4, notes: "شهادة أمان ECE 22.06 · زجاج ضد الخدش وUV · جاهزة لإنتركوم Cardo — اسأل على المقاسات" },
  { code: 275, name: "خوذة LS2 Cosmos — زجاج سموكي", category: "خوذ", fits: "فول فيس — يونيفرسال", location: "", price: 3800, qty: 100, status: "in", photos: 4, notes: "شهادة أمان ECE 22.06 · سبويلر خلفي · المقاس في الصور XL — اسأل على باقي المقاسات" },
  { code: 276, name: "خوذة MRC فليب أب (الدقن بتتفتح)", category: "خوذ", fits: "فول فيس / مودولار — يونيفرسال", location: "", price: 2800, qty: 100, status: "in", photos: 8, notes: "شهادة أمان ECE 22.06 · لونين: أبيض×موف وأبيض×أحمر×أصفر · زجاج شمس داخلي — اسأل على المقاسات" },
  { code: 277, name: "ركب سيفتي VEMAR (حماية ركبة)", category: "إكسسوارات", fits: "يونيفرسال — مقاس L", location: "", price: 650, qty: 100, status: "in", photos: 2, notes: "جوز ركب · مقاومة للصدمات · عاكسة للضوء" },
  { code: 278, name: "مرايات موتوسيكل (جوز)", category: "إكسسوارات", fits: "يونيفرسال — اسأل على المقاس والقلاووظ", location: "", price: 1100, qty: 100, status: "in", photos: 1, notes: "موديلات وأشكال مختلفة زي الصور — اسأل على المتاح" },
  { code: 279, name: "مرايات بإشارة LED (جوز)", category: "إكسسوارات", fits: "يونيفرسال سبورت — اسأل على التثبيت", location: "", price: 1800, qty: 100, status: "in", photos: 2, notes: "إشارة LED مدمجة في المراية · موديلات مختلفة زي الصور — اسأل على المتاح" },
  { code: 280, name: "مرايات تعديل (جوز)", category: "إكسسوارات", fits: "يونيفرسال سبورت — اسأل على التثبيت", location: "", price: 1100, qty: 100, status: "in", photos: 1, notes: "أشكال تعديل مختلفة (منها شكل الهيكل العظمي) — اسأل على المتاح" },
  { code: 281, name: "سلايدر معدن (جوز)", category: "إكسسوارات", fits: "يونيفرسال — اسأل على مقاس المسمار", location: "", price: 650, qty: 100, status: "in", photos: 1, notes: "حماية للموتور والفيبر لو البايك وقع · معدن + طرف كاوتش" },
  { code: 282, name: "سلايدرات عادية (جوز)", category: "إكسسوارات", fits: "يونيفرسال — اسأل على مقاس المسمار", location: "", price: 600, qty: 100, status: "in", photos: 2, notes: "حماية للموتور والفيبر · متاح أسود أو شكل كاربون — اسأل على المتاح" },
  { code: 283, name: "تيل فرامل SRS", category: "عجل وفرامل", fits: "مقاسات مختلفة — ابعت موديل بايكك", location: "", price: 450, qty: 100, status: "in", photos: 2, notes: "شهادة E6 · مقاسات كتير (الكود مكتوب على الكرتونة) — ابعتلي موديل بايكك وأقولك المقاس" },
  { code: 284, name: "تيل فرامل LETU", category: "عجل وفرامل", fits: "مقاسات مختلفة — ابعت موديل بايكك", location: "", price: 450, qty: 100, status: "in", photos: 1, notes: "جوز تيل في الكرتونة · ابعتلي موديل بايكك وأقولك المقاس المناسب" },
  { code: 294, name: "ترس خلفي 525 — 43 سنة", category: "عجل وفرامل", fits: "جنزير 525 — اسأل على التوافق مع بايكك", location: "", price: 900, qty: 100, status: "in", photos: 1, notes: "مقاس 525 · 43 سنة (43T)" },
  { code: 295, name: "ترس أمامي 16 سنة", category: "عجل وفرامل", fits: "جنزير 525 — اسأل على التوافق مع بايكك", location: "", price: 700, qty: 100, status: "in", photos: 1, notes: "16 سنة (16T) · بيكمل مع الترس الخلفي كود 294" },
  { code: 296, name: "جوان وش سلندر Honda CBR1000RR (2008–2013) — أصلي", category: "موتور", fits: "Honda CBR1000RR 2008–2013", location: "", price: 2800, qty: 100, status: "in", photos: 1, notes: "قطعة هوندا أصلية — صنع في اليابان · رقم القطعة 12251-MFL-003" },
  { code: 297, name: "جنزير D.I.D 525 HV3 دهبي (X-Ring)", category: "عجل وفرامل", fits: "بايكات 400cc – 1000cc بجنزير 525", location: "", price: 1400, qty: 100, status: "in", photos: 1, notes: "D.I.D ياباني · X-Ring · بيكمل مع الترسين كود 294 و295" },
  { code: 298, name: "هاند جارد كاربون (حماية مقابض)", category: "إكسسوارات", fits: "يونيفرسال — بيتركب في طرف الجادون", location: "", price: 600, qty: 100, status: "in", photos: 1, notes: "شكل كاربون · متاح أحمر أو فضي — اسأل على المتاح" },
  { code: 299, name: "حامل نمرة تعديل (ألومنيوم)", category: "إكسسوارات", fits: "يونيفرسال — بيتركب تحت الديل", location: "", price: 600, qty: 100, status: "in", photos: 1, notes: "ألومنيوم · زاوية قابلة للتعديل · اسأل على الألوان المتاحة" },
  { code: 300, name: "لمبة LED أمامي للفانوس (طقم)", category: "كهربا", fits: "يونيفرسال — اسأل على نوع الكلوب", location: "", price: 500, qty: 100, status: "in", photos: 2, notes: "إضاءة 3500 لومن · عمر 30,000 ساعة · معاها حلقات تركيب" },
  { code: 301, name: "كوفر رادياتير هورنت 600 (ستانلس)", category: "إكسسوارات", fits: "Honda Hornet 600", location: "", price: 800, qty: 100, status: "in", photos: 1, notes: "حماية للرادياتير من الطوب والحصى · مكتوب عليه Hornet 600" },
  { code: 302, name: "اسطوانة فرامل أمامي MTX (فلوتنج)", category: "عجل وفرامل", fits: "Honda CBR900RR 919", location: "", price: 7000, qty: 100, status: "in", photos: 2, notes: "MTX · ديسك فلوتنج CNC · اسأل لو السعر للفردة ولا للجوز" },
  { code: 303, name: "جوانتي SUOMY SU-18", category: "إكسسوارات", fits: "مقاس M في الصورة — اسأل على باقي المقاسات", location: "", price: 1000, qty: 100, status: "in", photos: 1, notes: "جوانتي موتوسيكل بحماية للصوابع والكف" },
  { code: 304, name: "جوانتي موتوسيكل بحماية (موديلات)", category: "إكسسوارات", fits: "اسأل على المقاسات المتاحة", location: "", price: 800, qty: 100, status: "in", photos: 3, notes: "حماية للمفاصل والصوابع · كف مانع للانزلاق · موديلين زي الصور — اسأل على المتاح" },
  { code: 305, name: "جوانتي كاربون (أسود × أحمر)", category: "إكسسوارات", fits: "اسأل على المقاسات المتاحة", location: "", price: 900, qty: 100, status: "in", photos: 1, notes: "حماية مفاصل شكل كاربون · حماية للصوابع · كف مانع للانزلاق" },
  { code: 306, name: "مقبض تانك تعديل (حلقة تانك)", category: "إكسسوارات", fits: "بيتركب على غطا التانك — اسأل على التوافق", location: "", price: 900, qty: 100, status: "in", photos: 1, notes: "مقبض للراكب اللي ورا · بيتركب على غطا البنزين" },
  { code: 307, name: "علبة شكمان شكل SC Project — سليب أون", category: "شكمانات", fits: "يونيفرسال — اسأل على مقاس الوصلة", location: "", price: 2000, qty: 100, status: "in", photos: 1, notes: "تيتانيوم مطفي · طرف أسود · حامل تثبيت معاها" },
  { code: 308, name: "علبة شكمان شكل Yoshimura — سليب أون", category: "شكمانات", fits: "يونيفرسال — اسأل على مقاس الوصلة", location: "", price: 1900, qty: 100, status: "in", photos: 2, notes: "ستانلس مطفي · صوت قوي · حامل تثبيت معاها" },
  { code: 309, name: "جوان وش سلندر Honda CBR600RR", category: "موتور", fits: "Honda CBR600RR", location: "", price: 1600, qty: 100, status: "in", photos: 1, notes: "جوان معدن (MLS) · اسأل على سنة الموديل المناسبة" }
];

(function () {
  const WA = "201065173490";
  const root = document.getElementById("partsGrid");
  if (!root || typeof PARTS === "undefined") return;

  const fmt = (n) => Number(n).toLocaleString("en-US");
  const wa = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  const esc = (s) => String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = (s) => String(s || "").toLowerCase()
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    .replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/\s+/g, " ").trim();

  // الأقسام بالترتيب اللي بتظهر بيه + أيقونة لكل قسم
  const CATS = [
    { key: "خوذ", icon: "🪖" },
    { key: "إكسسوارات", icon: "✨" },
    { key: "شكمانات", icon: "🔥" },
    { key: "فيبر", icon: "🎨" },
    { key: "عجل وفرامل", icon: "🛞" },
    { key: "موتور", icon: "⚙️" },
    { key: "كهربا", icon: "⚡" },
    { key: "مساعدين", icon: "🔩" },
  ];
  const catIcon = (c) => (CATS.find((x) => x.key === c) || {}).icon || "🔧";
  const catRank = (c) => { const i = CATS.findIndex((x) => x.key === c); return i < 0 ? 99 : i; };

  // البايك المناسب: من خانة fits
  const BIKES = [
    { key: "vr300", label: "فيجوري VR300", test: (f) => /vigory|فيجوري/i.test(f) },
    { key: "gsr600", label: "سوزوكي GSR600", test: (f) => /gsr|suzuki/i.test(f) },
    { key: "hornet", label: "هوندا هورنت 600", test: (f) => /hornet|هورنت/i.test(f) },
    { key: "cbr1000", label: "هوندا CBR1000RR", test: (f) => /cbr1000/i.test(f) },
    { key: "cbr600", label: "هوندا CBR600RR", test: (f) => /cbr600/i.test(f) },
    { key: "uni", label: "يونيفرسال (أي بايك)", test: () => true },
  ];
  const bikeOf = (p) => BIKES.find((b) => b.test(p.fits || "")).key;

  const ICON = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M40 10a12 12 0 0 0-11 16L12 43a5 5 0 0 0 7 7l17-17a12 12 0 0 0 16-11l-7 7-6-2-2-6 7-7a12 12 0 0 0-4-4z"/></svg>`;
  const WA_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>`;

  const parts = PARTS.filter((p) => p && p.name).map((p) => ({ ...p, _bike: bikeOf(p), _hay: norm([p.code, p.name, p.category, p.fits, p.location, p.notes].join(" ")) }));
  const params = new URLSearchParams(location.search);
  const state = {
    q: params.get("q") || "",
    cat: params.get("cat") || "",
    bike: BIKES.some((b) => b.key === params.get("bike")) ? params.get("bike") : "",
    sort: params.get("sort") || "new",
  };

  const src = (p, i) => `images/parts/${p.code}-${i}.jpg`;

  function media(p) {
    const box = document.createElement("div");
    box.className = "part-media";
    const last = p.status === "in" && p.qty === 1;
    box.innerHTML = `<span class="pill pill-code">#${p.code}</span>${last ? `<span class="part-flag">آخر قطعة</span>` : p.status === "out" ? `<span class="part-flag out">خلصت</span>` : p.status === "order" ? `<span class="part-flag order">تحت الطلب</span>` : ""}<div class="part-ph">${ICON}<small>${esc(p.category || "قطعة غيار")}</small></div>`;
    if (p.photos > 0) {
      const img = new Image();
      img.alt = p.name;
      img.decoding = "async";
      img.onload = () => {
        box.style.setProperty("--bg-img", `url("${img.src}")`);
        box.classList.add("loaded");
        box.querySelector(".part-ph").replaceWith(img);
      };
      img.src = src(p, 1);
      if (p.photos > 1) box.insertAdjacentHTML("beforeend", `<span class="part-count">📷 ${p.photos}</span>`);
      box.classList.add("has-photos");
      box.addEventListener("click", () => openViewer(p));
    }
    return box;
  }

  // ---------- عارض الصور ----------
  let viewer;
  function openViewer(p) {
    if (!viewer) {
      viewer = document.createElement("div");
      viewer.className = "pv";
      viewer.innerHTML = `<button class="pv-close" aria-label="قفل">✕</button><div class="pv-track"></div><div class="pv-bar"><span class="pv-title"></span><span class="pv-n"></span></div><div class="pv-cta"></div>`;
      document.body.appendChild(viewer);
      viewer.querySelector(".pv-close").onclick = closeViewer;
      viewer.addEventListener("click", (e) => { if (e.target === viewer) closeViewer(); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape" && viewer.classList.contains("open")) closeViewer(); });
      const tr = viewer.querySelector(".pv-track");
      tr.addEventListener("scroll", () => {
        const i = Math.round(Math.abs(tr.scrollLeft) / tr.clientWidth) + 1;
        viewer.querySelector(".pv-n").textContent = `${i} / ${tr.children.length}`;
      });
    }
    const tr = viewer.querySelector(".pv-track");
    tr.innerHTML = Array.from({ length: p.photos }, (_, i) => `<div class="pv-slide"><img src="${src(p, i + 1)}" alt="${esc(p.name)}" loading="lazy" /></div>`).join("");
    viewer.querySelector(".pv-title").textContent = `#${p.code} — ${p.name}`;
    viewer.querySelector(".pv-n").textContent = `1 / ${p.photos}`;
    viewer.querySelector(".pv-cta").innerHTML = `<b>${p.price ? (p.priceMax ? "من " + fmt(p.price) + " لـ " + fmt(p.priceMax) : fmt(p.price)) + " ج.م" : ""}</b><a class="btn btn-wa" target="_blank" rel="noopener" href="${wa(`السلام عليكم، عايز قطعة غيار كود ${p.code} — ${p.name}`)}">${WA_ICON} اطلبها على واتساب</a>`;
    viewer.classList.add("open");
    document.body.style.overflow = "hidden";
    tr.scrollLeft = 0;
  }
  function closeViewer() { viewer.classList.remove("open"); document.body.style.overflow = ""; }

  function shortFits(p) {
    const f = p.fits || "";
    if (p._bike === "vr300") return "فيجوري VR300";
    if (p._bike === "gsr600" || p._bike === "hornet" || p._bike === "cbr1000" || p._bike === "cbr600") return f;
    return f.split("—")[0].trim() || "يونيفرسال";
  }

  function card(p) {
    const el = document.createElement("article");
    el.className = "part-card" + (p.status === "out" ? " is-out" : "");
    el.appendChild(media(p));
    const body = document.createElement("div");
    body.className = "part-body";
    body.innerHTML = `
      <h3 title="${esc(p.name)}">${esc(p.name)}</h3>
      <div class="part-fit">🏍️ ${esc(shortFits(p))}${p.location ? ` · 📍 ${esc(p.location)}` : ""}</div>
      ${p.notes ? `<p class="part-notes">${esc(p.notes)}</p>` : ""}
      <div class="part-foot">
        <div class="price">${p.price ? (p.priceMax ? "<small>من</small> " + fmt(p.price) + "–" + fmt(p.priceMax) : fmt(p.price)) + "<small>ج.م</small>" : "<small>السعر على واتساب</small>"}</div>
        <a class="part-buy" target="_blank" rel="noopener" aria-label="اطلب ${esc(p.name)} على واتساب" href="${wa(`السلام عليكم، عايز قطعة غيار كود ${p.code} — ${p.name}`)}">${WA_ICON}<span>${p.status === "out" ? "اسأل" : "اطلب"}</span></a>
      </div>`;
    el.appendChild(body);
    return el;
  }

  function requestCard() {
    const req = document.createElement("article");
    req.className = "part-card part-request";
    req.innerHTML = `
      <div class="part-req-icon">🔍</div>
      <div><h3>مش لاقي القطعة؟</h3>
      <p>ابعتلي اسم القطعة وموديل البايك، وأنا أدورلك عليها وأجيبهالك بأحسن سعر.</p></div>
      <a class="btn btn-primary" target="_blank" rel="noopener" href="${wa("السلام عليكم، بدور على قطعة غيار:\nالقطعة: \nالبايك والموديل: ")}">اطلب قطعة</a>`;
    return req;
  }

  const SORTS = {
    new: (a, b) => b.code - a.code,
    low: (a, b) => (a.price || 1e9) - (b.price || 1e9),
    high: (a, b) => (b.price || 0) - (a.price || 0),
  };

  function filtered(ignore) {
    const tokens = norm(state.q).split(" ").filter(Boolean);
    return parts.filter((p) =>
      (ignore === "cat" || !state.cat || p.category === state.cat) &&
      (ignore === "bike" || !state.bike || p._bike === state.bike) &&
      tokens.every((t) => p._hay.includes(t)));
  }

  function syncUrl() {
    const u = new URLSearchParams();
    if (state.cat) u.set("cat", state.cat);
    if (state.bike) u.set("bike", state.bike);
    if (state.sort !== "new") u.set("sort", state.sort);
    const qs = u.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
  }

  const catsEl = document.getElementById("partsChips");
  const bikesEl = document.getElementById("partsBikes");
  const sortEl = document.getElementById("partsSort");

  function chip(label, count, active, onClick, extra = "") {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "pchip" + (active ? " active" : "") + extra;
    b.innerHTML = `${label}<span class="n">${count}</span>`;
    b.onclick = onClick;
    return b;
  }

  function renderChips() {
    if (catsEl) {
      const pool = filtered("cat");
      catsEl.innerHTML = "";
      catsEl.appendChild(chip("🧰 الكل", pool.length, !state.cat, () => { state.cat = ""; update(); }));
      [...new Set(parts.map((p) => p.category).filter(Boolean))].sort((a, b) => catRank(a) - catRank(b)).forEach((c) => {
        const n = pool.filter((p) => p.category === c).length;
        if (!n && state.cat !== c) return;
        catsEl.appendChild(chip(`${catIcon(c)} ${c}`, n, state.cat === c, () => { state.cat = state.cat === c ? "" : c; update(); }));
      });
      const a = catsEl.querySelector(".active");
      if (a && userActed) catsEl.scrollTo({ left: a.offsetLeft - catsEl.clientWidth / 2 + a.offsetWidth / 2, behavior: "smooth" });
    }
    if (bikesEl) {
      const pool = filtered("bike");
      bikesEl.innerHTML = `<span class="pbikes-label">🏍️ لبايك:</span>`;
      bikesEl.appendChild(chip("الكل", pool.length, !state.bike, () => { state.bike = ""; update(); }, " sm"));
      BIKES.forEach((b) => {
        const n = pool.filter((p) => p._bike === b.key).length;
        if (!n) return;
        bikesEl.appendChild(chip(b.label, n, state.bike === b.key, () => { state.bike = state.bike === b.key ? "" : b.key; update(); }, " sm"));
      });
    }
  }

  function grid(list) {
    const g = document.createElement("div");
    g.className = "parts-grid";
    list.forEach((p) => g.appendChild(card(p)));
    return g;
  }

  function render() {
    const list = filtered().sort(SORTS[state.sort] || SORTS.new);
    root.innerHTML = "";
    root.className = "parts-results";
    const grouped = !state.cat && !state.q.trim() && state.sort === "new";
    if (!list.length) {
      root.insertAdjacentHTML("beforeend", `<div class="parts-empty">مفيش قطع بالبحث ده 🤷‍♂️ — جرّب كلمة تانية أو اطلبها مني تحت.</div>`);
    } else if (grouped) {
      const cats = [...new Set(list.map((p) => p.category || "أخرى"))].sort((a, b) => catRank(a) - catRank(b));
      cats.forEach((c) => {
        const items = list.filter((p) => (p.category || "أخرى") === c);
        const sec = document.createElement("section");
        sec.className = "parts-group";
        sec.innerHTML = `<div class="parts-group-head"><h2>${catIcon(c)} ${esc(c)} <span>${items.length}</span></h2>${items.length > PREVIEW ? `<button type="button" class="parts-more">عرض الكل (${items.length}) ←</button>` : ""}</div>`;
        const btn = sec.querySelector(".parts-more");
        if (btn) btn.onclick = () => { state.cat = c; update(); document.getElementById("parts").scrollIntoView({ behavior: "smooth" }); };
        sec.appendChild(grid(items.slice(0, PREVIEW)));
        root.appendChild(sec);
      });
    } else {
      root.appendChild(grid(list));
    }
    const req = grid([]); req.appendChild(requestCard()); req.classList.add("parts-req-row");
    root.appendChild(req);
    const c = document.getElementById("partsCount");
    if (c) c.textContent = `${list.length} قطعة`;
  }

  let userActed = false;
  const PREVIEW = 4;
  function update() { renderChips(); render(); syncUrl(); userActed = true; }

  const q = document.getElementById("partsQ");
  if (q) {
    q.value = state.q;
    let t; q.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { state.q = q.value; update(); }, 150); });
  }
  if (sortEl) { sortEl.value = state.sort; sortEl.onchange = () => { state.sort = sortEl.value; update(); }; }

  update();
})();
