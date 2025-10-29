import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: Number,
  name: String,
  price: Number,
  image: String,
  qty: { type: Number, default: 1 },
});

export default mongoose.model("CartItem", cartItemSchema);
