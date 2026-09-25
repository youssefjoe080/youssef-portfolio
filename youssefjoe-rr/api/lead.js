// Saves "دوّرلي على بايك" form requests as potential customers in the Notion Motorcycle CRM.
// Needs the NOTION_TOKEN environment variable in Vercel (a Notion internal integration
// that has access to the Motorcycle CRM database).
const DATA_SOURCE_ID = "748e4b91-b0a2-47e3-9b3a-23de564d3213";

const text = (v) => ({ rich_text: [{ text: { content: String(v || "").slice(0, 500) } }] });

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  if (!process.env.NOTION_TOKEN) return res.status(500).json({ ok: false, error: "missing token" });

  let b = req.body || {};
  if (typeof b === "string") { try { b = JSON.parse(b); } catch { b = {}; } }

  if (b.website) return res.status(200).json({ ok: true }); // bot filled the hidden field
  const name = String(b.name || "").trim().slice(0, 60);
  const phone = String(b.phone || "").replace(/[^\d+]/g, "");
  if (!name || !/^(\+?20)?0?1[0125]\d{8}$/.test(phone)) return res.status(400).json({ ok: false, error: "invalid" });

  const notes = [
    `النوع: ${b.type || "—"}`,
    `الميزانية: ${b.budget || "—"}`,
    `الاستخدام: ${b.use || "—"}`,
    `المحافظة: ${b.city || "—"}`,
  ].join("\n");

  const r = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": "2025-09-03",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { type: "data_source_id", data_source_id: DATA_SOURCE_ID },
      properties: {
        " ": { title: [{ text: { content: name } }] },
        "موبايل": { phone_number: phone },
        "القسم": text("عميل محتمل"),
        "الحالة": { select: { name: "جديد" } },
        "المصدر": text("الموقع"),
        "الموتوسيكل/الموديل": text(b.model || `${b.type || ""} — ${b.budget || ""}`),
        "ملاحظات": text(notes),
      },
    }),
  });

  if (!r.ok) {
    console.error("notion error", r.status, await r.text());
    return res.status(502).json({ ok: false });
  }
  return res.status(200).json({ ok: true });
};
