// ====== قطع الغيار ======
// كل قطعة: code (كود نوشن) · name · fits (متوافق مع) · location (مكان القطعة) · price (سعر البيع بالجنيه) · qty · status: "in" | "out" | "order"
// الصور: images/parts/{code}-1.jpg ... photos = عدد الصور (لو 0 بيظهر شكل افتراضي)
const PARTS = [
  { code: 156, name: "شكمان Baby King أصلي", category: "شكمانات", fits: "Suzuki GSR600 (Baby King)", location: "الإسكندرية", price: 8500, qty: 1, status: "in", photos: 5, notes: "" },
  { code: 204, name: "شكمان شكل Akrapovič — سليب أون", category: "شكمانات", fits: "يونيفرسال — اسأل على مقاس الوصلة", location: "", price: 1500, qty: 1, status: "in", photos: 1, notes: "طرف كاربون + حامل تثبيت" },
  { code: 230, name: "مساعد خلفي فيجوري VR300", category: "مساعدين", fits: "Vigory VR300", location: "", price: 2700, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 231, name: "ضفر فيبر فيجوري VR300", category: "فيبر", fits: "Vigory VR300", location: "", price: 1200, qty: 100, status: "in", photos: 1, notes: "الألوان زي الصورة — اسأل على المتاح" },
  { code: 232, name: "بلاطة شحن فيجوري VR300", category: "كهربا", fits: "Vigory VR300", location: "", price: 700, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 233, name: "مساعدين أمامي فيجوري VR300 (جوز)", category: "مساعدين", fits: "Vigory VR300", location: "", price: 7000, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 234, name: "فيبر تانك (نص) فيجوري VR300", category: "فيبر", fits: "Vigory VR300", location: "", price: 850, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 235, name: "فيبر موتور فيجوري VR300 (جوز)", category: "فيبر", fits: "Vigory VR300", location: "", price: 800, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 236, name: "ترابة خلفية فيجوري VR300", category: "فيبر", fits: "Vigory VR300", location: "", price: 800, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 237, name: "ديل خلفي فيجوري VR300", category: "فيبر", fits: "Vigory VR300", location: "", price: 800, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 238, name: "خزنة صبابات فيجوري VR300 — أصلية", category: "موتور", fits: "Vigory VR300", location: "", price: 4000, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 239, name: "فلانشة ترس خلفي فيجوري VR300", category: "عجل وفرامل", fits: "Vigory VR300", location: "", price: 900, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 241, name: "ترس خلفي فيجوري VR300 — الجندي", category: "عجل وفرامل", fits: "Vigory VR300", location: "", price: 700, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 242, name: "عامود كامة فيجوري VR300", category: "موتور", fits: "Vigory VR300", location: "", price: 1200, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 243, name: "جنطين فيجوري VR300 (أمامي + خلفي)", category: "عجل وفرامل", fits: "Vigory VR300", location: "", price: 8500, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 244, name: "بستم بسلندر فيجوري VR300 — أبو حوا", category: "موتور", fits: "Vigory VR300", location: "", price: 3200, qty: 100, status: "in", photos: 1, notes: "طقم: سلندر + بستم + شنابر + جوانات" },
  { code: 245, name: "بستم بسلندر فيجوري VR300 — الجندي", category: "موتور", fits: "Vigory VR300", location: "", price: 2800, qty: 100, status: "in", photos: 1, notes: "طقم: سلندر + بستم + شنابر + جوانات" },
  { code: 246, name: "بستم بسلندر فيجوري VR300 — أصلي", category: "موتور", fits: "Vigory VR300", location: "", price: 3400, qty: 100, status: "in", photos: 1, notes: "طقم: سلندر + بستم + شنابر + جوانات" },
  { code: 247, name: "مكنة سرعة فيجوري VR300", category: "كهربا", fits: "Vigory VR300", location: "", price: 700, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 248, name: "رقبة فيجوري VR300", category: "عجل وفرامل", fits: "Vigory VR300", location: "", price: 1500, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 251, name: "جادون فيجوري VR300", category: "إكسسوارات", fits: "Vigory VR300", location: "", price: 600, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 252, name: "مرايات فيجوري VR300 (جوز)", category: "إكسسوارات", fits: "Vigory VR300", location: "", price: 500, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 253, name: "مقص خلفي فيجوري VR300", category: "عجل وفرامل", fits: "Vigory VR300", location: "", price: 1100, qty: 100, status: "in", photos: 1, notes: "المساعد اللي في الصورة مش داخل — متاح لوحده كود 230" },
  { code: 254, name: "شكمان فيجوري VR300 كامل (علبة + ماسورة)", category: "شكمانات", fits: "Vigory VR300", location: "", price: 3000, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 255, name: "فيبر فانوس فيجوري VR300", category: "فيبر", fits: "Vigory VR300", location: "", price: 1100, qty: 100, status: "in", photos: 1, notes: "ألوان: برتقاني · أبيض · أسود · أحمر · أخضر — اسأل على المتاح" },
  { code: 256, name: "جنزير فيجوري VR300", category: "عجل وفرامل", fits: "Vigory VR300", location: "", price: 1250, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 259, name: "سربنتينة زيت فيجوري VR300", category: "موتور", fits: "Vigory VR300", location: "", price: 3500, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 260, name: "دمشة فرامل أمامي فيجوري VR300", category: "عجل وفرامل", fits: "Vigory VR300", location: "", price: 750, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 261, name: "دمشة فرامل خلفي فيجوري VR300", category: "عجل وفرامل", fits: "Vigory VR300", location: "", price: 750, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 262, name: "جنزير استوك فيجوري VR300", category: "عجل وفرامل", fits: "Vigory VR300", location: "", price: 850, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 263, name: "ترس خلفي فيجوري VR300", category: "عجل وفرامل", fits: "Vigory VR300", location: "", price: 500, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 264, name: "ترس أمامي فيجوري VR300", category: "عجل وفرامل", fits: "Vigory VR300", location: "", price: 300, qty: 100, status: "in", photos: 1, notes: "الصورة توضيحية — اسأل على شكل الترس الأمامي" },
  { code: 265, name: "كربراتير فيجوري VR300", category: "موتور", fits: "Vigory VR300", location: "", price: 1400, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 266, name: "كرونة كاملة بالديسك فيجوري VR300", category: "موتور", fits: "Vigory VR300", location: "", price: 4000, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 267, name: "ترسين اتزان فيجوري VR300", category: "موتور", fits: "Vigory VR300", location: "", price: 1500, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 268, name: "مجموعة فتيس فيجوري VR300", category: "موتور", fits: "Vigory VR300", location: "", price: 3000, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 269, name: "كنترول (CDI) فيجوري VR300", category: "كهربا", fits: "Vigory VR300", location: "", price: 850, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 270, name: "فانوس خلفي فيجوري VR300", category: "كهربا", fits: "Vigory VR300", location: "", price: 1100, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 271, name: "فولام فيجوري VR300", category: "موتور", fits: "Vigory VR300", location: "", price: 2000, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 272, name: "ملف كهرباء فيجوري VR300", category: "كهربا", fits: "Vigory VR300", location: "", price: 1200, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 240, name: "كتل مقابض (مفاتيح الجادون) فيجوري VR300", category: "كهربا", fits: "Vigory VR300", location: "", price: 800, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 249, name: "عصاية غيارات فيجوري VR300", category: "موتور", fits: "Vigory VR300", location: "", price: 600, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 257, name: "اسطوانة فرامل خلفي فيجوري VR300", category: "عجل وفرامل", fits: "Vigory VR300", location: "", price: 800, qty: 100, status: "in", photos: 1, notes: "" },
  { code: 258, name: "اسطوانة فرامل أمامي فيجوري VR300", category: "عجل وفرامل", fits: "Vigory VR300", location: "", price: 800, qty: 100, status: "in", photos: 1, notes: "" },
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
  { code: 298, name: "هاند جارد كاربون (حماية مقابض)", category: "إكسسوارات", fits: "يونيفرسال — بيتركب في طرف الجادون", location: "", price: 600, qty: 100, status: "in", photos: 1, notes: "شكل كاربون · متاح أحمر أو فضي — اسأل على المتاح" }
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
    viewer.querySelector(".pv-cta").innerHTML = `<b>${p.price ? fmt(p.price) + " ج.م" : ""}</b><a class="btn btn-wa" target="_blank" rel="noopener" href="${wa(`السلام عليكم، عايز قطعة غيار كود ${p.code} — ${p.name}`)}">${WA_ICON} اطلبها على واتساب</a>`;
    viewer.classList.add("open");
    document.body.style.overflow = "hidden";
    tr.scrollLeft = 0;
  }
  function closeViewer() { viewer.classList.remove("open"); document.body.style.overflow = ""; }

  function shortFits(p) {
    const f = p.fits || "";
    if (p._bike === "vr300") return "فيجوري VR300";
    if (p._bike === "gsr600") return f;
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
        <div class="price">${p.price ? fmt(p.price) + "<small>ج.م</small>" : "<small>السعر على واتساب</small>"}</div>
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
