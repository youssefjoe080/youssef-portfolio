    // ====== الإعدادات ======
    const WHATSAPP = "201065173490";      // رقم الواتساب
    const MAX_PHOTOS = 8;                 // أقصى عدد صور لكل بايك
    const EXTS = ["jpg", "jpeg", "png", "webp"];

    const TYPES = { all: "الكل", sport: "سبورت", naked: "نيكد", scooter: "سكوتر", cruiser: "كروزر" };
    const BRAND_AR = { Honda: "هوندا", Kawasaki: "كاواساكي", Suzuki: "سوزوكي", BMW: "بي إم دبليو" };
    const ALIASES = [
      ["هورنت", "hornet"], ["هوندا", "honda"], ["كاواساكي", "kawasaki"], ["كوزاكي", "kawasaki"],
      ["سوزوكي", "suzuki"], ["هايابوزا", "hayabusa"], ["هيبوزا", "hayabusa"], ["نينجا", "ninja"],
      ["سبورت", "sport"], ["نيكد", "naked"], ["سكوتر", "scooter"], ["برجمان", "burgman"], ["ستيد", "steed"],
      ["اف فور", "f4i"], ["كود", ""]
    ];

    const $ = (s) => document.querySelector(s);
    const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(decodeURIComponent(msg))}`;
    const title = (b) => `${b.brand} ${b.model}`;
    const fmt = (n) => n.toLocaleString("en-US");
    const norm = (s) => {
      s = String(s).toLowerCase()
        .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
        .replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي");
      ALIASES.forEach(([a, e]) => { s = s.split(a).join(" " + e + " "); });
      return s.replace(/[-_]/g, "").replace(/\s+/g, " ").trim();
    };

    // عروض لفترة محدودة: sale = { off: 5, until: "ISO" } — بتتلغي لوحدها لما الوقت يخلص
    const NOW = Date.now();
    BIKES.forEach((b) => { if (b.sale && NOW < Date.parse(b.sale.until)) { b.was = b.price; b.price = b.price - b.sale.off; b.saleUntil = Date.parse(b.sale.until); } });
    const SALE_END = Math.max(0, ...BIKES.filter((b) => b.was).map((b) => b.saleUntil));
    const bikes = BIKES.map((b) => ({
      ...b,
      _hay: norm([b.code, "code" + b.code, b.brand, b.model, b.model.replace(/\s/g, ""), b.year, b.cc, b.type, TYPES[b.type], BRAND_AR[b.brand], b.location].join(" ")),
    }));
    const state = { q: "", type: "all", brand: "", budget: "", sort: "new", sale: false };

    // ---------- photos ----------
    function photoSrc(code, i, ext = 0) { return `images/bikes/${code}-${i}.${EXTS[ext]}`; }
    function placeholder(b) {
      return `<div class="ph"><div>
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="42" r="10"/><circle cx="50" cy="42" r="10"/><path d="M14 42h14l8-14h10l4 14"/><path d="M36 28l-6-8h-6"/><path d="M44 20h6"/></svg>
        <b>${title(b)}</b><small>الصور على واتساب — كود ${b.code}</small></div></div>`;
    }
    // try jpg → jpeg → png → webp, then placeholder
    function imgWithFallback(b, i, onFail) {
      const img = new Image();
      img.alt = `${title(b)} ${b.year || ""}`;
      img.loading = "lazy";
      let ext = 0;
      img.onerror = () => { ext++; if (ext < EXTS.length) img.src = photoSrc(b.code, i, ext); else onFail(img); };
      img.src = photoSrc(b.code, i, 0);
      return img;
    }

    // ---------- render ----------
    function card(b) {
      const el = document.createElement("article");
      el.className = "card";
      el.tabIndex = 0;
      el.innerHTML = `
        <div class="card-media">
          <span class="pill pill-code">#${b.code}</span>
          ${b.status !== "available" ? `<span class="pill pill-status ${b.status}">${b.status === "sold" ? "اتباع" : "محجوز"}</span>` : ""}
          ${b.was ? `<span class="pill pill-sale">🔥 خصم ${fmt(b.was - b.price)},000</span>` : ""}
        </div>
        <div class="card-body">
          <div class="card-title"><h3>${title(b)}</h3><span class="year">${b.year || ""}</span></div>
          <div class="specs">
            <span>${b.cc}cc</span>
            ${b.km !== "—" ? `<span>${b.km} كم</span>` : ""}
            ${b.location !== "—" ? `<span>📍 ${b.location}</span>` : ""}
          </div>
          <div class="card-foot">
            <div class="price">${b.was ? `<s class="was">${fmt(b.was)}</s>` : ""}${fmt(b.price)}<small>ألف ج.م</small></div>
            <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(`السلام عليكم، عايز أستفسر عن بايك كود ${b.code} — ${title(b)} ${b.year || ""}`)}">واتساب</a>
          </div>
        </div>`;
      const media = el.querySelector(".card-media");
      media.prepend(imgWithFallback(b, 1, (img) => img.replaceWith(Object.assign(document.createElement("div"), { innerHTML: placeholder(b) }).firstElementChild)));
      el.addEventListener("click", (e) => { if (!e.target.closest("a")) openBike(b.code); });
      el.addEventListener("keydown", (e) => { if (e.key === "Enter") openBike(b.code); });
      return el;
    }

    function filtered() {
      const tokens = norm(state.q).split(" ").filter(Boolean);
      let list = bikes.filter((b) => {
        if (state.sale && !b.was) return false;
        if (state.type !== "all" && b.type !== state.type) return false;
        if (state.brand && b.brand !== state.brand) return false;
        if (state.budget) { const [lo, hi] = state.budget.split("-").map(Number); if (b.price < lo || b.price > hi) return false; }
        return tokens.every((t) => b._hay.includes(t));
      });
      const s = state.sort;
      list.sort((a, b) =>
        s === "low" ? a.price - b.price :
        s === "high" ? b.price - a.price :
        s === "year" ? (b.year || 0) - (a.year || 0) : b.code - a.code);
      // sold / reserved go last
      const rank = { available: 0, reserved: 1, sold: 2 };
      return list.sort((a, b) => rank[a.status] - rank[b.status]);
    }

    function render() {
      const list = filtered();
      const grid = $("#grid");
      if (!grid) return;
      grid.innerHTML = "";
      $("#count").innerHTML = `<b>${list.length}</b> بايك${state.q ? ` لـ "${state.q.replace(/</g, "")}"` : ""}`;
      if (!list.length) {
        grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><h3>مفيش نتيجة مطابقة دلوقتي</h3>
          <p>بس ممكن يكون عندي اللي بتدور عليه ومش متنزل. ابعتلي وأنا أدوّرلك.</p><br/>
          <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(`السلام عليكم، بدور على: ${state.q || "بايك"}`)}">دوّرلي على واتساب</a></div>`;
        return;
      }
      const frag = document.createDocumentFragment();
      list.forEach((b) => frag.appendChild(card(b)));
      grid.appendChild(frag);
    }

    // ---------- modal ----------
    function openBike(code, push = true) {
      const b = bikes.find((x) => x.code === +code);
      if (!b) return;
      const main = $("#mMain"), thumbs = $("#mThumbs");
      thumbs.innerHTML = "";
      main.innerHTML = `<div class="track" dir="ltr"></div><button class="g-nav g-prev" aria-label="الصورة اللي قبلها">‹</button><button class="g-nav g-next" aria-label="الصورة اللي بعدها">›</button><span class="g-count"></span>`;
      const track = main.querySelector(".track"), count = main.querySelector(".g-count");
      const prev = main.querySelector(".g-prev"), next = main.querySelector(".g-next");
      const slides = () => [...track.children];
      const idx = () => Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      const go = (n) => { const k = Math.max(0, Math.min(slides().length - 1, n)); track.scrollTo({ left: k * track.clientWidth, behavior: "smooth" }); };
      const sync = () => {
        const n = slides().length, k = Math.min(idx(), n - 1);
        count.textContent = n > 1 ? `${k + 1} / ${n}` : "";
        [prev, next, count].forEach((el) => el.style.display = n > 1 ? "" : "none");
        thumbs.style.display = n > 1 ? "" : "none";
        [...thumbs.children].forEach((t, i) => t.classList.toggle("active", i === k));
      };
      prev.onclick = () => go(idx() - 1);
      next.onclick = () => go(idx() + 1);
      let raf; track.addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(sync); });
      let loaded = 0, pending = MAX_PHOTOS;
      const done = () => { if (--pending === 0 && loaded === 0) main.innerHTML = placeholder(b); };
      for (let i = 1; i <= MAX_PHOTOS; i++) {
        const slide = document.createElement("div"); slide.className = "slide";
        const thumb = document.createElement("img"); thumb.alt = ""; thumb.style.display = "none";
        const img = imgWithFallback(b, i, () => { slide.remove(); thumb.remove(); sync(); done(); });
        img.loading = "eager";
        img.addEventListener("load", () => { loaded++; thumb.src = img.src; thumb.style.display = ""; sync(); done(); });
        thumb.addEventListener("click", () => go([...thumbs.children].indexOf(thumb)));
        slide.appendChild(img); track.appendChild(slide); thumbs.appendChild(thumb);
      }
      sync();

      const msg = `السلام عليكم، عايز أستفسر عن بايك كود ${b.code} — ${title(b)} ${b.year || ""}`;
      $("#mInfo").innerHTML = `
        <button class="close" aria-label="إغلاق">×</button>
        <div><span class="pill pill-code" style="position:static;display:inline-block">#${b.code}</span>
          ${b.status !== "available" ? `<span class="pill pill-status ${b.status}" style="position:static;display:inline-block">${b.status === "sold" ? "اتباع" : "محجوز"}</span>` : ""}</div>
        <h2>${title(b)} ${b.year || ""}</h2>
        <div class="modal-price">${b.was ? `<s class="was">${fmt(b.was)}</s>` : ""}<b>${fmt(b.price)}</b><small>ألف جنيه — قابل للتفاوض</small></div>
        ${b.was ? `<div class="sale-note">🔥 عرض لفترة محدودة — باقي <b data-countdown="${b.saleUntil}">—</b></div>` : ""}
        <div class="kv">
          <div><small>الموديل</small><b>${b.year || "—"}</b></div>
          <div><small>السعة</small><b>${b.cc}cc</b></div>
          <div><small>العداد</small><b>${b.km}</b></div>
          <div><small>النوع</small><b>${TYPES[b.type]}</b></div>
          <div style="grid-column:1/-1"><small>مكان المعاينة</small><b>${b.location}</b></div>
          <div style="grid-column:1/-1"><small>الرخصة</small><b>${b.license}</b></div>
        </div>
        <ul class="feat">${b.features.map((f) => `<li>${f}</li>`).join("")}</ul>
        <div class="modal-actions">
          <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(msg)}">اسأل عن البايك ده على واتساب</a>
          <button class="btn btn-ghost" id="share" title="مشاركة">مشاركة</button>
        </div>
        <p class="note">اطلب صور وفيديو إضافي على واتساب — ابعت الكود #${b.code}</p>`;
      $("#mInfo .close").onclick = closeBike;
      $("#share").onclick = () => shareBike(b);
      $("#modal").classList.add("open");
      $("#modal").setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      $("#modal").scrollTop = 0;
      if (location.hash !== `#bike-${b.code}`) {
        // push a history entry so the phone's back button closes the bike instead of leaving the site
        if (push) history.pushState({ bike: b.code }, "", `#bike-${b.code}`);
        else history.replaceState(null, "", `#bike-${b.code}`);
      }
    }
    function hideBike() {
      $("#modal").classList.remove("open");
      $("#modal").setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    function closeBike() {
      if (!$("#modal").classList.contains("open")) return;
      if (history.state && history.state.bike) { history.back(); return; } // popstate hides it
      hideBike();
      if (location.hash.startsWith("#bike-")) history.replaceState(null, "", location.pathname + location.search);
    }
    async function shareBike(b) {
      const url = `${location.origin}/b/${b.code}`;
      const text = `${title(b)} ${b.year || ""} — ${fmt(b.price)} ألف | youssefjoe.rr`;
      try {
        if (navigator.share) { await navigator.share({ title: text, url }); return; }
        await navigator.clipboard.writeText(url);
        toast("اتنسخ لينك البايك ✓");
      } catch (e) { /* user cancelled */ }
    }
    function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 1800); }

    // ---------- init ----------
    function init() {
      // روابط قديمة من الصفحة الواحدة (#bikes / #parts / #sell / #match) → الصفحة الجديدة
      const OLD = { "#bikes": "bikes.html", "#match": "bikes.html#match", "#parts": "parts.html", "#sell": "sell.html" };
      if ($("#home") && OLD[location.hash]) { location.replace(OLD[location.hash]); return; }
      if ($("#home")) window.addEventListener("hashchange", () => { if (OLD[location.hash]) location.replace(OLD[location.hash]); });

      const avail = bikes.filter((b) => b.status === "available");
      const setText = (sel, v) => { const el = $(sel); if (el) el.textContent = v; };
      setText("#liveCount", avail.length);
      setText("#sBikes", avail.length);
      setText("#sBrands", new Set(bikes.map((b) => b.brand)).size);
      setText("#sCities", new Set(bikes.map((b) => b.location).filter((l) => l !== "—")).size + "+");
      setText("#sFrom", Math.min(...avail.map((b) => b.price)));
      setText("#yr", new Date().getFullYear());
      document.querySelectorAll("[data-count]").forEach((el) => el.textContent = avail.length);

      // تمييز الصفحة الحالية في المنيو والشريط اللي تحت
      const page = document.body.dataset.page;
      document.querySelectorAll(`[data-nav="${page}"]`).forEach((a) => a.classList.add("active"));

      // أحدث البايكات (الصفحة الرئيسية)
      const latest = $("#latest");
      if (latest) [...avail].sort((a, b) => b.code - a.code).slice(0, 6).forEach((b) => latest.appendChild(card(b)));

      // بانر العروض + العداد التنازلي
      const onBikesPage = !!$("#grid");
      const saleCount = bikes.filter((b) => b.was).length;
      if (saleCount) {
        const bar = document.createElement("div");
        bar.className = "sale-bar";
        bar.innerHTML = `<div class="container sale-inner">
          <span class="sale-fire">🔥</span>
          <span class="sale-text"><b>عرض 48 ساعة</b> — خصم على ${saleCount} بايك</span>
          <span class="sale-timer">باقي <b data-countdown="${SALE_END}">—</b></span>
          <a class="btn btn-primary sale-btn" href="bikes.html?sale=1">شوف العروض</a></div>`;
        const nav = document.querySelector("header.nav");
        if (nav) nav.after(bar);
        if (onBikesPage) bar.querySelector(".sale-btn").onclick = (e) => { e.preventDefault(); toggleSale(true); $("#bikes").scrollIntoView({ behavior: "smooth" }); };
      }
      const pad = (n) => String(n).padStart(2, "0");
      const tick = () => document.querySelectorAll("[data-countdown]").forEach((el) => {
        const ms = +el.dataset.countdown - Date.now();
        if (ms <= 0) { el.textContent = "انتهى العرض"; return; }
        const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, sec = Math.floor(ms / 1000) % 60;
        el.textContent = `${pad(h)}:${pad(m)}:${pad(sec)}`;
      });
      tick(); setInterval(tick, 1000);

      const onBikes = !!$("#grid");
      if (onBikes) {
      const pq = new URLSearchParams(location.search).get("q");
      if (pq) { state.q = pq; $("#q").value = pq; }
      const chips = $("#typeChips");
      if (saleCount) {
        const sc = document.createElement("button");
        sc.className = "chip chip-sale"; sc.textContent = "🔥 العروض";
        sc.onclick = () => toggleSale(!state.sale);
        chips.appendChild(sc);
      }
      window.toggleSale = (on) => { state.sale = on; const sc = chips.querySelector(".chip-sale"); if (sc) sc.classList.toggle("active", on); render(); };
      if (new URLSearchParams(location.search).get("sale") === "1" && saleCount) { state.sale = true; const sc = chips.querySelector(".chip-sale"); if (sc) sc.classList.add("active"); }
      Object.entries(TYPES).forEach(([k, v]) => {
        if (k !== "all" && !bikes.some((b) => b.type === k)) return;
        const c = document.createElement("button");
        c.className = "chip" + (k === "all" ? " active" : "");
        c.textContent = v;
        c.onclick = () => { state.type = k; chips.querySelectorAll(".chip").forEach((x) => x.classList.toggle("active", x === c)); render(); };
        chips.appendChild(c);
      });

      const brandSel = $("#brand");
      brandSel.innerHTML = `<option value="">كل الماركات</option>` +
        [...new Set(bikes.map((b) => b.brand))].map((b) => `<option value="${b}">${b}</option>`).join("");
      brandSel.onchange = (e) => { state.brand = e.target.value; render(); };
      $("#budget").onchange = (e) => { state.budget = e.target.value; render(); };
      $("#sort").onchange = (e) => { state.sort = e.target.value; render(); };

      let t;
      $("#q").addEventListener("input", (e) => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value; render(); }, 150); });
      $("#heroSearch").addEventListener("submit", (e) => { e.preventDefault(); state.q = $("#q").value; render(); $("#bikes").scrollIntoView({ behavior: "smooth" }); });
      document.querySelectorAll(".quick button").forEach((btn) => btn.onclick = () => {
        $("#q").value = btn.dataset.q; state.q = btn.dataset.q; render(); $("#bikes").scrollIntoView({ behavior: "smooth" });
      });
      } else {
        // الرئيسية: البحث بيودّي على صفحة البايكات
        const go = (q) => { location.href = "bikes.html" + (q ? "?q=" + encodeURIComponent(q) : ""); };
        const hs = $("#heroSearch");
        if (hs) hs.addEventListener("submit", (e) => { e.preventDefault(); go($("#q").value.trim()); });
        document.querySelectorAll(".quick button").forEach((btn) => btn.onclick = () => go(btn.dataset.q));
      }

      document.querySelectorAll("[data-wa]").forEach((a) => a.href = waLink(a.dataset.wa));

      if ($("#matchForm")) $("#matchForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const f = new FormData(e.target);
        const phone = String(f.get("phone") || "").replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[^\d+]/g, "");
        if (!/^(\+?20)?0?1[0125]\d{8}$/.test(phone)) { toast("اكتب رقم موبايل صحيح"); e.target.phone.focus(); return; }
        const lead = Object.fromEntries(f.entries());
        lead.phone = phone;
        // save to Notion in the background — WhatsApp opens right away either way
        try { fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead), keepalive: true }).catch(() => {}); } catch (err) { /* ignore */ }
        const msg = `السلام عليكم، أنا ${f.get("name")}، دوّرلي على بايك:\nالنوع: ${f.get("type")}\nالميزانية: ${f.get("budget")}\nالاستخدام: ${f.get("use")}\nالمحافظة: ${f.get("city") || "—"}\nموديل معيّن: ${f.get("model") || "—"}`;
        window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
      });

      $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeBike(); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeBike(); });
      window.addEventListener("popstate", () => {
        const m = location.hash.match(/^#bike-(\d+)/);
        if (m) openBike(m[1], false); else hideBike();
      });
      $("#modalBack").onclick = closeBike;

      render();
      const m = location.hash.match(/^#bike-(\d+)/);
      if (m) openBike(m[1], false);
    }
    init();
