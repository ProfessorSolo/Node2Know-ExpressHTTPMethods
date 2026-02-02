# Node2Know — HTTP Methods

Same path, different intent.

This repo demonstrates how the HTTP method changes what the server does:

- **GET** `/things` → “Show me the things”
- **POST** `/things` → “Take this new thing”
- **DELETE** `/things` → “Destroy the things”

It uses a tiny **in-memory list** so you can see the effect of POST and DELETE instantly.

---

## ✅ Prereqs

- **Node.js**
- **npm**

Check:

```bash
node -v
npm -v
```

---

## 📦 Install

```bash
npm install
```

---

## ▶️ Run

```bash
npm start
```

Open:

- `http://localhost:3000/`

That page includes buttons to exercise **GET**, **POST**, and **DELETE** from the browser.

---

## 🧪 Exercise the endpoints from the terminal (curl)

### GET
```bash
curl http://localhost:3000/things
```

### POST (JSON body)
```bash
curl -X POST http://localhost:3000/things \
  -H "Content-Type: application/json" \
  -d '{"name":"nitrous"}'
```

### DELETE
```bash
curl -X DELETE http://localhost:3000/things
```

Then GET again to confirm:

```bash
curl http://localhost:3000/things
```

---

## 👀 Watch mode

```bash
npm run watch
```

Stop with:
- `Ctrl + C`

---

## 📁 Project Structure

```txt
.
├── app.js
├── package.json
└── README.md
```

---

## Repo

- https://github.com/ProfessorSolo/Node2Know-HTTPMethods.git

---

## License

**Node2Know-LEARN-1.0**
