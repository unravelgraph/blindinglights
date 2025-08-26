export default async function handler(req, res) {
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const DATABASE_ID = process.env.NOTION_DATABASE_ID;

  try {
    const notionRes = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ page_size: 100 })
    });

    const data = await notionRes.json();

    // Allow your Forumactif page to call this
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
