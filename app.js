"use strict";

/**
 * Node2Know — HTTP Methods
 *
 * Same path, different intent.
 * The HTTP method tells the server what you *mean*:
 *
 *   GET    /things   -> “Show me the things”
 *   POST   /things   -> “Take this new thing”
 *   DELETE /things   -> “Destroy the things”
 *
 * This demo keeps a tiny in-memory list so you can see the effects immediately.
 */

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies (for POST)
// Without this, req.body will be undefined for JSON requests.
app.use(express.json());

// A tiny in-memory “database”
let things = ["turbo", "spoiler", "cupholder"];

// GET /things -> "Show me the things"
app.get("/things", (req, res) => {
  res.json({ count: things.length, things });
});

// POST /things -> "Take this new thing"
app.post("/things", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Missing required field: name" });
  }

  things.push(name);
  res.status(201).json({ message: "New thing received.", things });
});

// DELETE /things -> "Destroy the things"
app.delete("/things", (req, res) => {
  things = [];
  res.json({ message: "Things destroyed.", things });
});

// A tiny home page with buttons to exercise methods from the browser
app.get("/", (req, res) => {
  res.type("html").send(`<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Node2Know — HTTP Methods</title>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 24px; }
    button { margin-right: 8px; }
    input { padding: 6px; }
    pre { background: #f4f4f4; padding: 12px; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>HTTP Methods Demo</h1>

  <p>
    <button id="btnGet">GET /things</button>
    <button id="btnDelete">DELETE /things</button>
  </p>

  <p>
    <input id="thingName" placeholder="new thing name" />
    <button id="btnPost">POST /things</button>
  </p>

  <pre id="out">Click a button…</pre>

<script>
  const out = document.getElementById("out");
  const thingName = document.getElementById("thingName");

  async function show(res) {
    const text = await res.text();
    out.textContent = text;
  }

  document.getElementById("btnGet").addEventListener("click", async () => {
    const res = await fetch("/things");
    show(res);
  });

  document.getElementById("btnPost").addEventListener("click", async () => {
    const name = thingName.value.trim();
    const res = await fetch("/things", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    show(res);
  });

  document.getElementById("btnDelete").addEventListener("click", async () => {
    const res = await fetch("/things", { method: "DELETE" });
    show(res);
  });
</script>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`Created process at PID: ${process.pid}`);
  console.log(`Listening on port: ${PORT}`);
  console.log(`Open: http://localhost:${PORT}`);
  console.log(`API:  http://localhost:${PORT}/things`);
});
