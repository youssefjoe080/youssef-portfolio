// ====== قطع الغيار ======
// كل قطعة: code (كود نوشن) · name · fits (متوافق مع) · location (مكان القطعة) · price (سعر البيع بالجنيه) · qty · status: "in" | "out" | "order"
// الصور: images/parts/{code}-1.jpg ... photos = عدد الصور (لو 0 بيظهر شكل افتراضي)
const PARTS = [
  { code: 156, name: "شكمان Baby King أصلي", category: "شكمانات", fits: "Suzuki GSR600 (Baby King)", location: "الإسكندرية", price: 8500, qty: 1, status: "in", photos: 5, notes: "" },
  { code: 204, name: "شكمان شكل Akrapovič — سليب أون", category: "شكمانات", fits: "يونيفرسال — اسأل على مقاس الوصلة", location: "", price: 1500, qty: 1, status: "in", photos: 1, notes: "طرف كاربون + حامل تثبيت" }
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

  const STATUS = {
    in: { label: "متاح", cls: "in" },
    order: { label: "تحت الطلب", cls: "order" },
    out: { label: "خلصت", cls: "out" },
  };
  const ICON = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M40 10a12 12 0 0 0-11 16L12 43a5 5 0 0 0 7 7l17-17a12 12 0 0 0 16-11l-7 7-6-2-2-6 7-7a12 12 0 0 0-4-4z"/></svg>`;

  const parts = PARTS.filter((p) => p && p.name).map((p) => ({ ...p, _hay: norm([p.code, p.name, p.category, p.fits, p.location].join(" ")) }));
  const state = { q: "", cat: "" };

  const src = (p, i) => `images/parts/${p.code}-${i}.jpg`;

  function media(p) {
    const box = document.createElement("div");
    box.className = "part-media";
    box.innerHTML = `<span class="pill pill-code">#${p.code}</span><div class="part-ph">${ICON}<small>${esc(p.category || "قطعة غيار")}</small></div>`;
    if (p.photos > 0) {
      const img = new Image();
      img.alt = p.name;
      img.onload = () => { box.querySelector(".part-ph").replaceWith(img); };
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
      viewer.innerHTML = `<button class="pv-close" aria-label="قفل">✕</button><div class="pv-track"></div><div class="pv-bar"><span class="pv-title"></span><span class="pv-n"></span></div>`;
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
    viewer.classList.add("open");
    document.body.style.overflow = "hidden";
    tr.scrollLeft = 0;
  }
  function closeViewer() { viewer.classList.remove("open"); document.body.style.overflow = ""; }

  function card(p) {
    const st = STATUS[p.status] || STATUS.in;
    const last = p.status === "in" && p.qty === 1;
    const el = document.createElement("article");
    el.className = "part-card" + (p.status === "out" ? " is-out" : "");
    el.appendChild(media(p));
    const body = document.createElement("div");
    body.className = "part-body";
    body.innerHTML = `
      <h3>${esc(p.name)}</h3>
      <div class="part-meta">
        <span class="part-stock ${st.cls}"><i></i>${last ? "متاح — آخر قطعة" : st.label}</span>
        ${p.fits ? `<span class="part-fits">🏍️ ${esc(p.fits)}</span>` : `<span class="part-fits">اسأل عن التوافق مع بايكك</span>`}
        ${p.location ? `<span class="part-loc">📍 ${esc(p.location)}</span>` : ""}
      </div>
      ${p.notes ? `<p class="part-notes">${esc(p.notes)}</p>` : ""}
      <div class="part-foot">
        <div class="price">${p.price ? fmt(p.price) + "<small>ج.م</small>" : "<small>السعر على واتساب</small>"}</div>
        <a class="btn btn-wa" target="_blank" rel="noopener" href="${wa(`السلام عليكم، عايز قطعة غيار كود ${p.code} — ${p.name}`)}">${p.status === "out" ? "اسأل عليها" : "اطلبها"}</a>
      </div>`;
    el.appendChild(body);
    return el;
  }

  function render() {
    const tokens = norm(state.q).split(" ").filter(Boolean);
    const list = parts
      .filter((p) => (!state.cat || p.category === state.cat) && tokens.every((t) => p._hay.includes(t)))
      .sort((a, b) => ({ in: 0, order: 1, out: 2 }[a.status] ?? 0) - ({ in: 0, order: 1, out: 2 }[b.status] ?? 0));
    root.innerHTML = "";
    list.forEach((p) => root.appendChild(card(p)));
    const req = document.createElement("article");
    req.className = "part-card part-request";
    req.innerHTML = `
      <div class="part-req-icon">🔍</div>
      <h3>مش لاقي القطعة؟</h3>
      <p>ابعتلي اسم القطعة وموديل البايك، وأنا أدورلك عليها وأجيبهالك بأحسن سعر.</p>
      <a class="btn btn-primary" target="_blank" rel="noopener" href="${wa("السلام عليكم، بدور على قطعة غيار:\nالقطعة: \nالبايك والموديل: ")}">اطلب قطعة</a>`;
    root.appendChild(req);
    const c = document.getElementById("partsCount");
    if (c) c.textContent = `${list.length} قطعة`;
  }

  // category chips (تظهر لما يبقى فيه أكتر من قسم)
  const chips = document.getElementById("partsChips");
  const cats = [...new Set(parts.map((p) => p.category).filter(Boolean))];
  if (chips && cats.length > 1) {
    ["", ...cats].forEach((cat) => {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = cat || "الكل";
      b.className = "chip" + (cat === state.cat ? " active" : "");
      b.onclick = () => { state.cat = cat; chips.querySelectorAll(".chip").forEach((x) => x.classList.toggle("active", x === b)); render(); };
      chips.appendChild(b);
    });
  }

  const q = document.getElementById("partsQ");
  if (q) { let t; q.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { state.q = q.value; render(); }, 150); }); }

  render();
})();
