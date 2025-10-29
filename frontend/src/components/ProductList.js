import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  const addToCart = async (product) => {
    await axios.post("http://localhost:5000/api/cart", {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
    });
    alert("✅ Added to Cart");
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-container">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <div className="image-wrapper">
            <img src={p.image} alt={p.name} />
          </div>
          <div className="details">
            <h3>{p.name}</h3>
            <p className="category">{p.category}</p>
            <p className="desc">{p.description.substring(0, 60)}...</p>
            <div className="price">${p.price}</div>
            <button onClick={() => addToCart(p)}>Add to Cart 🛒</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
