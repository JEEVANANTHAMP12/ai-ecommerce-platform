import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(setProducts)
      .catch(() => setProducts([
        // Fallback demo data
        { id: 1, name: "Laptop", price: 999 },
        { id: 2, name: "Headphones", price: 199 },
        { id: 3, name: "Keyboard", price: 49 }
      ]));
  }, []);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function removeFromCart(idx) {
    setCart(cart.filter((_, i) => i !== idx));
  }

  function getTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>E-commerce Demo</h1>
      <h2>Products</h2>
      <ul>
        {products.map(prod => (
          <li key={prod.id}>
            {prod.name} (${prod.price})
            <button onClick={() => addToCart(prod)} style={{ marginLeft: 8 }}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <h2>Cart</h2>
      <ul>
        {cart.map((item, idx) => (
          <li key={idx}>
            {item.name} (${item.price})
            <button onClick={() => removeFromCart(idx)} style={{ marginLeft: 8 }}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${getTotal()}</h3>
      <button disabled={cart.length === 0} onClick={() => alert("Checkout Complete!")}>Checkout</button>
    </div>
  );
}

export default App;