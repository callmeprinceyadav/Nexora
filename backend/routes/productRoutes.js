import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    // Simplify only necessary fields
    const products = data.map((p) => ({
      id: p.id,
      name: p.title,
      price: p.price,
      image: p.image,
      category: p.category,
      description: p.description,
    }));
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Error fetching products" });
  }
});

export default router;
