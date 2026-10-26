// Share page for one bike: /b/140 → HTML with the bike's own photo/title/price in the
// Open Graph tags (so WhatsApp/Facebook show a real preview), then sends people on to
// the bike on the site.
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmt = (n) => Number(n).toLocaleString("en-US");

module.exports = async (req, res) => {
  const code = parseInt(String((req.query && req.query.code) || ""), 10);
  const host = req.headers["x-forwarded-host"] || req.headers.host || "youssefjoe-rr.vercel.app";
  const origin = `https://${host}`;
  const target = `${origin}/bikes.html#bike-${code}`;
  let b = null;
  try {
    const src = await (await fetch(`${origin}/bikes.js`)).text();
    const list = new Function(`${src}\n;return BIKES;`)();
    b = list.find((x) => x.code === code) || null;
  } catch (e) { /* fall back to a plain redirect */ }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=300");
  if (!b) { res.statusCode = 302; res.setHeader("Location", `${origin}/bikes.html`); return res.end(); }

  const sale = b.sale && Date.now() < Date.parse(b.sale.until);
  const price = sale ? b.price - b.sale.off : b.price;
  const title = `${b.brand} ${b.model} ${b.year || ""} — ${fmt(price)} ألف ج.م${sale ? " 🔥 عرض 48 ساعة" : ""}`;
  const desc = [b.km && b.km !== "—" ? `عداد ${b.km}` : "", b.location && b.location !== "—" ? `📍 ${b.location}` : "", b.license || "", `كود #${b.code}`]
    .filter(Boolean).join(" · ");
  const img = `${origin}/images/bikes/${b.code}-1.jpg`;

  res.end(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)} | youssefjoe.rr</title>
<meta name="description" content="${esc(desc)}" />
<meta property="og:type" content="product" />
<meta property="og:site_name" content="youssefjoe.rr" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:image" content="${esc(img)}" />
<meta property="og:url" content="${esc(`${origin}/b/${b.code}`)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta http-equiv="refresh" content="0;url=${esc(target)}" />
<link rel="canonical" href="${esc(target)}" />
</head><body style="background:#0a0a0c;color:#fff;font-family:sans-serif;text-align:center;padding:40px">
<p>جاري فتح البايك… <a style="color:#e11d2e" href="${esc(target)}">اضغط هنا</a></p>
<script>location.replace(${JSON.stringify(target)});</script>
</body></html>`);
};
