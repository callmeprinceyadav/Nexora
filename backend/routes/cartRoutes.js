import express from "express";
import CartItem from "../models/CartItem.js";

const router = express.Router();

// Get cart
router.get("/", async (req, res) => {
  const items = await CartItem.find();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  res.json({ items, total });
});

// Add to cart
router.post("/", async (req, res) => {
  const { productId, name, price, image, qty } = req.body;
  const existing = await CartItem.findOne({ productId });
  if (existing) {
    existing.qty += qty;
    await existing.save();
    return res.json(existing);
  }
  const newItem = await CartItem.create({ productId, name, price, image, qty });
  res.json(newItem);
});

// Delete item
router.delete("/:id", async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
});

// Checkout
router.post("/checkout", async (req, res) => {
  const items = await CartItem.find();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  await CartItem.deleteMany();
  res.json({ receipt: { total, timestamp: new Date() } });
});

export default router;
