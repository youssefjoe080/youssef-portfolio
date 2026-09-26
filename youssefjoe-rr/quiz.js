/*
  "اخترلي بايك" — 6 أسئلة وبعدها أنسب 3 بايكات من المعروض على الموقع.
  الفكرة: الأنسب مش الأحسن — الترشيح بيعتمد على الخبرة والاستخدام والميزانية مش على السعر.
*/
(() => {
  const REGIONS = {
    cairo: { label: "القاهرة الكبرى", hint: "القاهرة، الجيزة، القليوبية",
      words: ["القاهرة", "الجيزة", "أكتوبر", "فيصل", "إمبابة", "التجمع", "العبور", "بشتيل", "كرداسة", "المرج", "المعتمدية", "الخانكة", "حلوان", "الزاوية", "الشيخ زايد", "بنها", "شبين القناطر", "مدينة نصر"] },
    delta: { label: "الدلتا", hint: "الدقهلية، الشرقية، المنوفية، الغربية",
      words: ["المنصورة", "الدقهلية", "الشرقية", "المنوفية", "طنطا", "الغربية", "الزقازيق", "كفر الشيخ", "دمياط", "البحيرة"] },
    canal: { label: "القناة والسويس", hint: "السويس، الإسماعيلية، بورسعيد",
      words: ["السويس", "الإسماعيلية", "بورسعيد"] },
    alex: { label: "إسكندرية والساحل", hint: "إسكندرية، مطروح",
      words: ["الإسكندرية", "اسكندرية", "مطروح", "الساحل"] },
    upper: { label: "الصعيد والفيوم", hint: "الفيوم، المنيا، أسيوط، سوهاج",
      words: ["الفيوم", "المنيا", "ملوي", "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "بني سويف"] },
  };
  const regionOf = (loc) => Object.keys(REGIONS).find((k) => REGIONS[k].words.some((w) => String(loc).includes(w))) || null;

  const STEPS = [
    { key: "budget", q: "ميزانيتك قد إيه؟", sub: "الأسعار على الموقع قابلة للتفاوض", opts: [
      { v: "0-150", t: "لحد 150 ألف" }, { v: "150-250", t: "150 — 250 ألف" }, { v: "250-400", t: "250 — 400 ألف" },
      { v: "400-600", t: "400 — 600 ألف" }, { v: "600-2000", t: "فوق 600 ألف" } ] },
    { key: "exp", q: "خبرتك في السواقة؟", sub: "بصراحة — دي أهم إجابة علشان أمانك", opts: [
      { v: "new", t: "أول بايك ليا", d: "لسه هبدأ أو سايق قليل" }, { v: "mid", t: "سايق قبل كده", d: "سنة أو اتنين على بايك" },
      { v: "pro", t: "سواق متمرس", d: "سقت 600 أو أكبر كتير" } ] },
    { key: "use", q: "هتستخدمه في إيه أكتر؟", opts: [
      { v: "city", t: "مشاوير يومية", d: "شغل وجامعة وزحمة" }, { v: "fun", t: "خروجات وتقفيل", d: "آخر الأسبوع مع الصحاب" },
      { v: "travel", t: "سفر ومسافات طويلة", d: "طرق سريعة وراحة" }, { v: "track", t: "سرعة وتراك", d: "أداء عالي" } ] },
    { key: "cat", q: "شكل البايك اللي بتحبه؟", opts: [
      { v: "naked", t: "نيكد", d: "قاعدة مريحة — زي الهورنت" }, { v: "sport", t: "سبورت", d: "فيرنج وشكل سباق — زي 600RR" },
      { v: "scooter", t: "سكوتر", d: "أوتوماتيك ومريح" }, { v: "any", t: "مش فارق معايا", d: "رشحلي انت" } ] },
    { key: "region", q: "انت منين؟", sub: "علشان أقرّبلك مكان المعاينة", opts: [
      ...Object.entries(REGIONS).map(([v, r]) => ({ v, t: r.label, d: r.hint })), { v: "any", t: "مش فارق", d: "أروح أعاين في أي مكان" } ] },
    { key: "needs", q: "إيه اللي لازم يكون في البايك؟", sub: "اختار اللي يهمك — أو كمّل على طول", multi: true, opts: [
      { v: "license", t: "رخصة سارية" }, { v: "engine", t: "موتور ما اتحلش" }, { v: "noexp", t: "مش محتاج مصاريف" },
      { v: "fabrika", t: "فابريكا / مش راشة" }, { v: "abs", t: "فرامل ABS" }, { v: "lowkm", t: "عداد قليل" } ] },
  ];

  // ---------- facts about each bike ----------
  const txt = (b) => [b.model, b.license, ...(b.features || [])].join(" | ");
  const kmNum = (b) => { const n = parseInt(String(b.km).replace(/[^\d]/g, ""), 10); return isNaN(n) ? null : (String(b.km).includes("ميل") ? n * 1.6 : n); };
  const facts = (b) => {
    const t = txt(b);
    const needsWork = (b.features || []).filter((f) => /محتاج|تحتاج|محتاجين/.test(f) && !/^مش محتاج|مش محتاجة|لا يحتاج/.test(f));
    const km = kmNum(b);
    return {
      license: !!b.license && b.license !== "—" && !/منتهية|لم يرخص/.test(b.license),
      engine: /ما اتحلش|محلش|ما اتحلتش/.test(t),
      noexp: /مش محتاج|مش محتاجة|دوّر وامشي|لا يحتاج/.test(t) && needsWork.length === 0,
      fabrika: /فابريكا|مش راشة|ستوك بالكامل|ستاندر/.test(t) && !/راشة كلها|راشة بالكامل|راشة تغيير/.test(t),
      abs: /ABS/i.test(t),
      lowkm: km !== null && km < 30000,
      needsWork, km,
    };
  };
  const NEED_LABEL = { license: "رخصة سارية", engine: "الموتور ما اتحلش", noexp: "مش محتاج مصاريف", fabrika: "فابريكا", abs: "ABS", lowkm: "عداد قليل" };

  // ---------- scoring ----------
  function score(b, a) {
    const [lo, hi] = a.budget.split("-").map(Number);
    if (b.status === "sold") return null;
    if (b.price > hi * 1.1) return null;                       // خارج الميزانية
    if (a.exp === "new" && b.cc >= 1000 && b.type === "sport") return null; // مش هنرشح سوبر سبورت لمبتدئ

    let s = 50; const why = []; const warn = [];
    if (b.price > hi) { s -= 6; warn.push(`أعلى من ميزانيتك بـ ${b.price - hi} ألف — بس السعر قابل للتفاوض`); }
    else if (b.price >= lo) { s += 12; why.push("في حدود ميزانيتك بالظبط"); }
    else if (b.price >= lo * 0.7 || a.exp === "new") { s += 6; why.push(`أقل من ميزانيتك — هيفضلك ${lo - b.price}+ ألف للصيانة والعدة`); }
    else s -= 4;

    // موديل أحدث وعداد أقل = نقطة زيادة بسيطة (بتفرّق بين البايكات المتشابهة)
    if ((b.year || 0) >= 2012) s += 5; else if ((b.year || 0) >= 2007) s += 3;

    const big = b.cc >= 900, mid = b.cc >= 600 && b.cc < 900;
    if (a.exp === "new") {
      if (b.cc <= 400 || b.type === "scooter") { s += 18; why.push("سهل وآمن كأول بايك"); }
      else if (mid && b.type === "naked") { s += 12; why.push("نيكد 600 — قاعدة مريحة وسهل تتعلم عليه"); }
      else if (mid && b.type === "sport") { s -= 4; warn.push("سبورت 600 قوي على أول بايك — محتاج هدوء في السواقة"); }
      else if (big) { s -= 30; warn.push(`${b.cc}cc كتير جدًا على أول بايك — بنصحك تبدأ بأصغر`); }
    } else if (a.exp === "mid") {
      if (mid) { s += 14; why.push("الفئة المثالية لخبرتك"); }
      else if (big && b.type === "naked") { s += 2; }
      else if (big) { s -= 12; warn.push(`${b.cc}cc سبورت محتاج خبرة أكبر شوية`); }
      else s += 4;
    } else {
      if (big) { s += 14; why.push("قوة تناسب خبرتك"); }
      else if (mid && b.type === "sport") s += 8;
    }

    const u = a.use;
    if (u === "city") {
      if (b.type === "scooter") { s += 14; why.push("أوتوماتيك ومريح في الزحمة"); }
      else if (b.type === "naked") { s += 10; why.push("نيكد — مريح في المشاوير اليومية والزحمة"); }
      else if (b.type === "sport" && big) s -= 12;
      else if (b.type === "sport") s -= 4;
    } else if (u === "fun") {
      if (b.type === "naked" || b.type === "sport") { s += 8; why.push("ممتع في الخروجات والتقفيل"); }
    } else if (u === "travel") {
      if (/Hayabusa|Z1000SX|Burgman|GSX-S1000|CB650R/i.test(b.model)) { s += 16; why.push("مريح في السفر والطرق السريعة"); }
      else if (b.cc >= 650) { s += 8; why.push("قوة كفاية للطرق السريعة"); }
      else if (b.cc <= 400) s -= 14;
    } else if (u === "track") {
      if (b.type === "sport") { s += 16; why.push("سبورت — مصمم للأداء والسرعة"); }
      else if (b.type === "scooter" || b.type === "cruiser") s -= 30;
      else s -= 4;
      if ((b.year || 0) >= 2008) s += 4;
    }

    if (a.cat !== "any") {
      if (b.type === a.cat) { s += 12; }
      else if (!(a.cat === "naked" && b.type === "cruiser")) s -= 18;
    }

    if (a.region !== "any") {
      const r = regionOf(b.location);
      if (r === a.region) { s += 10; why.push(`المعاينة قريبة منك (${b.location})`); }
    }

    const f = facts(b);
    if (f.lowkm) s += 3;
    if (f.engine) s += 2;
    (a.needs || []).forEach((n) => { if (f[n]) { s += 6; } else s -= 5; });
    const met = (a.needs || []).filter((n) => f[n]).map((n) => NEED_LABEL[n]);
    if (f.needsWork.length) warn.push(f.needsWork[0]);
    if (!f.license && b.license && /منتهية/.test(b.license)) warn.push("الرخصة منتهية — محتاج تجديد");
    if (b.status === "reserved") { s -= 10; warn.push("عليه اتفاق مبدئي — ممكن تحجز بعده"); }

    return { b, s, pct: Math.max(35, Math.min(97, Math.round(20 + s * 0.7))), why: why.slice(0, 3), warn: warn.slice(0, 2), met };
  }

  // ---------- UI ----------
  const root = document.getElementById("quiz");
  if (!root) return;
  const body = root.querySelector(".quiz-body");
  const bar = root.querySelector(".quiz-bar i");
  let step = 0, ans = { needs: [] }, lastResults = [];

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function open() {
    step = 0; ans = { needs: [] };
    root.classList.add("open"); document.body.style.overflow = "hidden";
    renderStep();
  }
  function close() {
    root.classList.remove("open"); document.body.style.overflow = "";
    if (location.hash === "#quiz") history.replaceState(null, "", location.pathname + location.search);
  }

  function renderStep() {
    const st = STEPS[step];
    bar.style.width = `${(step / STEPS.length) * 100}%`;
    body.innerHTML = `
      <div class="q-count">سؤال ${step + 1} من ${STEPS.length}</div>
      <h3 class="q-title">${st.q}</h3>
      ${st.sub ? `<p class="q-sub">${st.sub}</p>` : ""}
      <div class="q-opts ${st.multi ? "multi" : ""}">
        ${st.opts.map((o) => `<button class="q-opt ${st.multi && ans.needs.includes(o.v) ? "on" : ""}" data-v="${o.v}">
          <b>${o.t}</b>${o.d ? `<small>${o.d}</small>` : ""}</button>`).join("")}
      </div>
      <div class="q-nav">
        ${step > 0 ? `<button class="btn btn-ghost q-back">رجوع</button>` : "<span></span>"}
        ${st.multi ? `<button class="btn btn-primary q-next">${ans.needs.length ? "طلّعلي النتيجة" : "مش فارق — طلّعلي النتيجة"}</button>` : ""}
      </div>`;
    body.querySelectorAll(".q-opt").forEach((btn) => btn.onclick = () => {
      const v = btn.dataset.v;
      if (st.multi) {
        ans.needs = ans.needs.includes(v) ? ans.needs.filter((x) => x !== v) : [...ans.needs, v];
        btn.classList.toggle("on");
        body.querySelector(".q-next").textContent = ans.needs.length ? "طلّعلي النتيجة" : "مش فارق — طلّعلي النتيجة";
      } else {
        ans[st.key] = v;
        btn.classList.add("on");
        setTimeout(() => { step++; step < STEPS.length ? renderStep() : showResults(); }, 160);
      }
    });
    const back = body.querySelector(".q-back"); if (back) back.onclick = () => { step--; renderStep(); };
    const next = body.querySelector(".q-next"); if (next) next.onclick = showResults;
    body.scrollTop = 0;
  }

  function answersText() {
    const pick = (k) => { const st = STEPS.find((x) => x.key === k); const o = st.opts.find((x) => x.v === ans[k]); return o ? o.t : "—"; };
    const needs = ans.needs.length ? ans.needs.map((n) => NEED_LABEL[n]).join("، ") : "—";
    return { budget: pick("budget"), exp: pick("exp"), use: pick("use"), cat: pick("cat"), region: pick("region"), needs };
  }

  function resultCard(r, i) {
    const b = r.b;
    return `<article class="r-card" data-code="${b.code}">
      <div class="r-media"><span class="r-rank">${i === 0 ? "الأنسب ليك" : "#" + (i + 1)}</span></div>
      <div class="r-body">
        <div class="r-top"><h4>${esc(title(b))} <span>${b.year || ""}</span></h4><span class="r-pct">${r.pct}%</span></div>
        <div class="r-price">${fmt(b.price)} <small>ألف ج.م</small> · <small>📍 ${esc(b.location)}</small></div>
        ${r.why.length ? `<ul class="r-why">${r.why.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}
        ${r.met.length ? `<div class="r-met">${r.met.map((m) => `<span>✓ ${esc(m)}</span>`).join("")}</div>` : ""}
        ${r.warn.length ? `<ul class="r-warn">${r.warn.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}
        <div class="r-actions">
          <button class="btn btn-ghost r-view">التفاصيل والصور</button>
          <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(`السلام عليكم، عملت "اخترلي بايك" وطلعلي بايك كود ${b.code} — ${title(b)} ${b.year || ""}. عايز أعرف تفاصيل أكتر`)}">عايزه</a>
        </div>
      </div></article>`;
  }

  function showResults() {
    bar.style.width = "100%";
    const all = bikes.map((b) => score(b, ans)).filter(Boolean).sort((x, y) => y.s - x.s || x.b.price - y.b.price);
    lastResults = all;
    const top = all.slice(0, 3);
    const a = answersText();
    const newbieBig = ans.exp === "new" && ["400-600", "600-2000"].includes(ans.budget);

    body.innerHTML = top.length ? `
      <div class="q-count">النتيجة</div>
      <h3 class="q-title">دول أنسب ${top.length === 1 ? "بايك" : top.length + " بايكات"} ليك</h3>
      <p class="q-sub">مش الأغلى — الأنسب لخبرتك واستخدامك وميزانيتك.</p>
      ${newbieBig ? `<div class="r-note">💡 نصيحة بصراحة: ميزانيتك كبيرة، بس كأول بايك الأحسن تبدأ بـ 600 نيكد وتحوّش الباقي للعدة (خوذة، جاكيت، جوانتي) والصيانة.</div>` : ""}
      <div class="r-list">${top.map(resultCard).join("")}</div>
      ${all.length > 3 ? `<button class="btn btn-ghost r-more">اعرض كمان ${Math.min(3, all.length - 3)} مناسبين</button><div class="r-list r-extra" hidden>${all.slice(3, 6).map((r, i) => resultCard(r, i + 3)).join("")}</div>` : ""}
      <form class="r-lead" novalidate>
        <h4>عايز أكلمك وأساعدك تختار؟</h4>
        <p>سيب اسمك ورقمك وهكلمك بنفسي على واتساب بالتفاصيل ومعاد المعاينة.</p>
        <div class="row">
          <input name="name" required maxlength="60" autocomplete="name" placeholder="اسمك" />
          <input name="phone" required type="tel" inputmode="tel" autocomplete="tel" maxlength="20" placeholder="01xxxxxxxxx" dir="ltr" style="text-align:right" />
        </div>
        <input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);opacity:0;border:0;padding:0" />
        <button class="btn btn-wa" type="submit">كلّمني على واتساب</button>
      </form>
      <div class="q-nav"><button class="btn btn-ghost q-restart">جاوب تاني</button><span></span></div>`
    : `
      <div class="q-count">النتيجة</div>
      <h3 class="q-title">مفيش بايك على الموقع مطابق دلوقتي</h3>
      <p class="q-sub">بس بيجيلي بايكات كل يوم ومش كلها بتتنزل. سيب رقمك وأنا أدوّرلك على الأنسب ليك.</p>
      <form class="r-lead" novalidate>
        <div class="row">
          <input name="name" required maxlength="60" autocomplete="name" placeholder="اسمك" />
          <input name="phone" required type="tel" inputmode="tel" autocomplete="tel" maxlength="20" placeholder="01xxxxxxxxx" dir="ltr" style="text-align:right" />
        </div>
        <input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);opacity:0;border:0;padding:0" />
        <button class="btn btn-wa" type="submit">دوّرلي على واتساب</button>
      </form>
      <div class="q-nav"><button class="btn btn-ghost q-restart">جاوب تاني</button><span></span></div>`;

    body.querySelectorAll(".r-card").forEach((c) => {
      const b = bikes.find((x) => x.code === +c.dataset.code);
      const media = c.querySelector(".r-media");
      media.prepend(imgWithFallback(b, 1, (img) => img.replaceWith(Object.assign(document.createElement("div"), { innerHTML: placeholder(b) }).firstElementChild)));
      c.querySelector(".r-view").onclick = () => { close(); openBike(b.code); };
    });
    const more = body.querySelector(".r-more");
    if (more) more.onclick = () => { body.querySelector(".r-extra").hidden = false; more.remove(); body.querySelectorAll(".r-extra .r-card").forEach((c) => {
      const b = bikes.find((x) => x.code === +c.dataset.code);
      c.querySelector(".r-media").prepend(imgWithFallback(b, 1, (img) => img.replaceWith(Object.assign(document.createElement("div"), { innerHTML: placeholder(b) }).firstElementChild)));
      c.querySelector(".r-view").onclick = () => { close(); openBike(b.code); };
    }); };
    body.querySelector(".q-restart").onclick = () => { step = 0; ans = { needs: [] }; renderStep(); };
    body.querySelector(".r-lead").onsubmit = (e) => submitLead(e, top, a);
    body.scrollTop = 0;
  }

  function submitLead(e, top, a) {
    e.preventDefault();
    const f = new FormData(e.target);
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[^\d+]/g, "");
    if (!name) { toast("اكتب اسمك"); e.target.name.focus(); return; }
    if (!/^(\+?20)?0?1[0125]\d{8}$/.test(phone)) { toast("اكتب رقم موبايل صحيح"); e.target.phone.focus(); return; }
    const picks = top.map((r) => `كود ${r.b.code} (${title(r.b)} ${r.b.year || ""})`).join("، ");
    const lead = {
      source: "اخترلي بايك", name, phone, website: f.get("website") || "",
      model: picks ? `اخترلي بايك: ${picks}` : `اخترلي بايك — ${a.cat} ${a.budget}`,
      budget: a.budget, experience: a.exp, use: a.use, type: a.cat, city: a.region, needs: a.needs, picks,
    };
    try { fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead), keepalive: true }).catch(() => {}); } catch (err) { /* ignore */ }
    const msg = `السلام عليكم، أنا ${name}. عملت "اخترلي بايك":\nالميزانية: ${a.budget}\nالخبرة: ${a.exp}\nالاستخدام: ${a.use}\nالشكل: ${a.cat}\nالمكان: ${a.region}\nمحتاج: ${a.needs}` + (picks ? `\n\nالنتيجة: ${picks}` : "");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  // ---------- wiring ----------
  document.querySelectorAll("[data-quiz]").forEach((el) => el.addEventListener("click", (e) => { e.preventDefault(); open(); }));
  root.querySelector(".quiz-close").onclick = close;
  root.addEventListener("click", (e) => { if (e.target === root) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && root.classList.contains("open")) close(); });
  if (location.hash === "#quiz") open();
  window.addEventListener("hashchange", () => { if (location.hash === "#quiz") open(); });

  window.__quiz = { score, facts, regionOf, STEPS }; // للتجربة
})();
