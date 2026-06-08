const express = require("express");
require("dotenv").config();

const app = express();
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

app.use(express.static(".")); 

app.get("/api/search", async (req, res) => {
  const query = (req.query.query || "").trim();
  if (!query) return res.status(400).json({ error: "missing query" });

  try {
    const resp = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );
    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (e) {
    res.status(500).json({ error: "fetch failed" });
  }
});

app.listen(5000, () => console.log("http://localhost:5000"));
