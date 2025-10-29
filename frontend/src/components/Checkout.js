import React, { useState } from "react";
import axios from "axios";

function Checkout() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);
  const [cart, setCart] = useState({ items: [], total: 0 });


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/cart/checkout");
    setReceipt(res.data.receipt);
  };

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h2>Checkout 🧾</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your email" onChange={handleChange} required />
        <button type="submit">Complete Checkout</button>
      </form>

      {receipt && (
        <div style={{
          background: "#fff", border: "2px solid #007bff",
          borderRadius: "10px", width: "300px", margin: "20px auto",
          padding: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
        }}>
          <h3>🎉 Thank You!</h3>
          <p><h3>Total: ${cart?.total ? cart.total.toFixed(2) : "0.00"}</h3>
</p>
          <p><b>Date:</b> {new Date(receipt.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;
