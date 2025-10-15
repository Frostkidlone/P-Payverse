const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Mock data
let users = [{ id: 1, name: "Demo Pioneer", piBalance: 120 }];
let products = [
  { id: 1, name: "Amazon $50 Gift Card", price: 45, cashback: 5, vendor: "Amazon" },
  { id: 2, name: "Walmart $40", price: 34, cashback: 4, vendor: "Walmart" },
  { id: 3, name: "Jumia $20", price: 18, cashback: 2, vendor: "Jumia" },
  { id: 4, name: "Google Play $10", price: 9, cashback: 1, vendor: "Google Play" }
];

let purchases = [];
let redemptions = [];

// === API ROUTES ===

// Get products
app.get("/api/products", (req, res) => res.json(products));

// Redeem gift card (mock)
app.post("/api/redeem", (req, res) => {
  const { code, userId } = req.body;
  if (!code) return res.status(400).json({ error: "Code required" });

  redemptions.push({ code, userId, value: 10, date: new Date().toISOString() });

  const u = users.find(x => x.id === userId);
  if (u) u.piBalance += 10;

  res.json({ success: true, message: `Code ${code} redeemed +10 Pi` });
});

// Purchase (mock)
app.post("/api/purchase", (req, res) => {
  const { userId, productId, txId } = req.body;
  const p = products.find(x => x.id === productId);
  if (!p) return res.status(400).json({ error: "Invalid product" });

  purchases.push({ userId, productId, txId, date: new Date().toISOString() });

  const u = users.find(x => x.id === userId);
  if (u) {
    u.piBalance -= p.price;
    u.piBalance += Math.round((p.cashback * p.price) / 100);
  }

  res.json({ success: true, message: "Purchase recorded (mock)", txId });
});

// Get user info
app.get("/api/users/:id", (req, res) => {
  const u = users.find(x => x.id == req.params.id);
  res.json(u || { error: "User not found" });
});

// Create user
app.post("/api/users", (req, res) => {
  const { name } = req.body;
  const n = { id: Date.now(), name, piBalance: 0 };
  users.push(n);
  res.json(n);
});

// === STATIC FRONTEND SERVING ===
app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

// === START SERVER ===
const PORT = process.env.PORT || 8080;
console.log("✅ Launching P-PayVerse backend...");
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
