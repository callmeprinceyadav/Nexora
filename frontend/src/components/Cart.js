import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const fetchCart = async () => {
    const { data } = await axios.get("http://localhost:5000/api/cart");

    setCart(data);
  };

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/${id}`);

    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart 🛒</h2>

      {cart.items.length === 0 && <p>No items yet</p>}

      {cart.items.map((i) => (
        <div key={i._id} style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", background: "#fff", margin: "10px auto",
          padding: "10px 20px", width: "80%", borderRadius: "8px",
          boxShadow: "0 3px 6px rgba(0,0,0,0.1)"
        }}>
          <img src={i.image} alt={i.name} style={{ width: "60px", height: "60px", objectFit: "contain" }} />
          <span>{i.name}</span>
          <span>Qty: {i.qty}</span>
          <span>${(i.price * i.qty).toFixed(2)}</span>
          <button
            onClick={() => removeItem(i._id)}
            style={{
              background: "#dc3545",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ${cart?.total ? cart.total.toFixed(2) : "0.00"}</h3>
    </div>
  );
}

export default Cart;
