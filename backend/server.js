setTimeout(() => {
  // existing app.listen here
}, 500);
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

let users = [{ id: 1, name: "Demo Pioneer", piBalance: 120 }];

let products = [
  { id: 1, name: "Amazon $50 Gift Card", price: 45, cashback: 5, vendor: "Amazon" },
  { id: 2, name: "Walmart $40", price: 34, cashback: 4, vendor: "Walmart" },
  { id: 3, name: "Jumia $20", price: 18, cashback: 2, vendor: "Jumia" },
  { id: 4, name: "Google Play $10", price: 9, cashback: 1, vendor: "Google Play" },
];

let purchases = [];
let redemptions = [];

app.get("/api/products", (req, res) => res.json(products));

app.post("/api/redeem", (req, res) => {
  const { code, userId } = req.body;
  if (!code) return res.status(400).json({ error: "Code required" });
  redemptions.push({ code, userId, value: 10, date: new Date().toISOString() });
  const u = users.find((x) => x.id === userId);
  if (u) u.piBalance += 10;
  res.json({ success: true, message: `Code ${code} redeemed +10 Pi` });
});

app.post("/api/purchase", (req, res) => {
  const { userId, productId, txId } = req.body;
  const p = products.find((x) => x.id === productId);
  if (!p) return
