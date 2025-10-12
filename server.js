const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Sample product data
const products = [
  {
    id: 1,
    name: "AI-Powered Smart Watch",
    price: 299.99,
    category: "electronics",
    description: "Advanced smartwatch with AI health monitoring",
    image: "https://via.placeholder.com/300x300?text=Smart+Watch",
    rating: 4.5,
    stock: 50
  },
  {
    id: 2,
    name: "Wireless Noise-Cancelling Headphones",
    price: 199.99,
    category: "electronics",
    description: "Premium headphones with AI-enhanced noise cancellation",
    image: "https://via.placeholder.com/300x300?text=Headphones",
    rating: 4.7,
    stock: 30
  },
  {
    id: 3,
    name: "Smart Home Assistant",
    price: 149.99,
    category: "smart-home",
    description: "AI voice assistant for your smart home",
    image: "https://via.placeholder.com/300x300?text=Smart+Assistant",
    rating: 4.3,
    stock: 100
  },
  {
    id: 4,
    name: "AI Fitness Tracker",
    price: 129.99,
    category: "fitness",
    description: "Track your fitness goals with AI-powered insights",
    image: "https://via.placeholder.com/300x300?text=Fitness+Tracker",
    rating: 4.6,
    stock: 75
  },
  {
    id: 5,
    name: "Smart Security Camera",
    price: 179.99,
    category: "smart-home",
    description: "AI-powered security camera with facial recognition",
    image: "https://via.placeholder.com/300x300?text=Security+Camera",
    rating: 4.4,
    stock: 40
  },
  {
    id: 6,
    name: "Wireless Charging Pad",
    price: 49.99,
    category: "accessories",
    description: "Fast wireless charging for all your devices",
    image: "https://via.placeholder.com/300x300?text=Charging+Pad",
    rating: 4.2,
    stock: 150
  }
];

// In-memory cart storage (in production, use a database)
let carts = {};

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  const { category, search, sortBy } = req.query;
  let filtered = [...products];

  // Filter by category
  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  // Search by name or description
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower)
    );
  }

  // Sort products
  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  res.json(filtered);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// AI-powered product recommendations
app.get('/api/recommendations/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Simple AI recommendation: suggest products from same category
  // In a real app, this would use ML models
  const recommendations = products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, 3);

  res.json(recommendations);
});

// Get cart
app.get('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const cart = carts[userId] || [];
  res.json(cart);
});

// Add to cart
app.post('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity } = req.body;

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (!carts[userId]) {
    carts[userId] = [];
  }

  const existingItem = carts[userId].find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    carts[userId].push({
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  }

  res.json({ message: 'Product added to cart', cart: carts[userId] });
});

// Update cart item
app.put('/api/cart/:userId/:productId', (req, res) => {
  const userId = req.params.userId;
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;

  if (!carts[userId]) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const item = carts[userId].find(item => item.productId === productId);
  if (!item) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  if (quantity <= 0) {
    carts[userId] = carts[userId].filter(item => item.productId !== productId);
  } else {
    item.quantity = quantity;
  }

  res.json({ message: 'Cart updated', cart: carts[userId] });
});

// Remove from cart
app.delete('/api/cart/:userId/:productId', (req, res) => {
  const userId = req.params.userId;
  const productId = parseInt(req.params.productId);

  if (!carts[userId]) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  carts[userId] = carts[userId].filter(item => item.productId !== productId);
  res.json({ message: 'Product removed from cart', cart: carts[userId] });
});

// Clear cart
app.delete('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  carts[userId] = [];
  res.json({ message: 'Cart cleared' });
});

// Checkout
app.post('/api/checkout/:userId', (req, res) => {
  const userId = req.params.userId;
  const cart = carts[userId] || [];

  if (cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // In a real app, process payment here
  carts[userId] = [];

  res.json({
    message: 'Order placed successfully',
    orderId: Math.random().toString(36).substr(2, 9),
    total: total.toFixed(2)
  });
});

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI E-commerce Platform running on http://localhost:${PORT}`);
});
