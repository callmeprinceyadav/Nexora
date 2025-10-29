import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import "./App.css";

function App() {
  const [view, setView] = useState("products");

  return (
    <div className="App">
      <h1>🛍️ Mock E-Commerce Cart </h1>
      <nav>
        <button onClick={() => setView("products")}>Products</button>
        <button onClick={() => setView("cart")}>Cart</button>
        <button onClick={() => setView("checkout")}>Checkout</button>
      </nav>

      {view === "products" && <ProductList />}
      {view === "cart" && <Cart />}
      {view === "checkout" && <Checkout />}
    </div>
  );
};

export default App;
