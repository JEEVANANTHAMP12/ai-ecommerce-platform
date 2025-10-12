// API Base URL
const API_URL = window.location.origin;
const USER_ID = 'user-' + Math.random().toString(36).substr(2, 9);

// State
let products = [];
let cart = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCart();
});

// Load products from API
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/api/products`);
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display products
function displayProducts(productsToDisplay) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No products found</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const stars = '⭐'.repeat(Math.floor(product.rating));
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=Product'">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-rating">${stars} ${product.rating}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
    
    card.onclick = (e) => {
        if (!e.target.classList.contains('add-to-cart-btn')) {
            showProductModal(product.id);
        }
    };
    
    return card;
}

// Filter products
async function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const sortBy = document.getElementById('sortFilter').value;
    const search = document.getElementById('searchInput').value;

    let url = `${API_URL}/api/products?`;
    if (category) url += `category=${category}&`;
    if (sortBy) url += `sortBy=${sortBy}&`;
    if (search) url += `search=${encodeURIComponent(search)}&`;

    try {
        const response = await fetch(url);
        const filtered = await response.json();
        displayProducts(filtered);
    } catch (error) {
        console.error('Error filtering products:', error);
    }
}

// Search products
function searchProducts() {
    filterProducts();
}

// Add Enter key support for search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
});

// Add to cart
async function addToCart(productId) {
    try {
        const response = await fetch(`${API_URL}/api/cart/${USER_ID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity: 1 })
        });

        if (response.ok) {
            await loadCart();
            showSuccessMessage('Product added to cart!');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

// Load cart
async function loadCart() {
    try {
        const response = await fetch(`${API_URL}/api/cart/${USER_ID}`);
        cart = await response.json();
        updateCartUI();
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = createCartItem(item);
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = '$' + total.toFixed(2);
}

// Create cart item
function createCartItem(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.productId}, ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.productId})">Remove</button>
        </div>
    `;
    
    return div;
}

// Update quantity
async function updateQuantity(productId, newQuantity) {
    if (newQuantity < 0) return;

    try {
        const response = await fetch(`${API_URL}/api/cart/${USER_ID}/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: newQuantity })
        });

        if (response.ok) {
            await loadCart();
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
}

// Remove from cart
async function removeFromCart(productId) {
    try {
        const response = await fetch(`${API_URL}/api/cart/${USER_ID}/${productId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await loadCart();
            showSuccessMessage('Product removed from cart');
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
}

// Toggle cart
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

// Close cart
function closeCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
}

// Checkout
async function checkout() {
    if (cart.length === 0) return;

    try {
        const response = await fetch(`${API_URL}/api/checkout/${USER_ID}`, {
            method: 'POST'
        });

        if (response.ok) {
            const result = await response.json();
            showSuccessMessage(`Order placed successfully! Order ID: ${result.orderId}`);
            await loadCart();
            closeCart();
        }
    } catch (error) {
        console.error('Error during checkout:', error);
    }
}

// Show product modal with recommendations
async function showProductModal(productId) {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    try {
        // Load product details
        const productResponse = await fetch(`${API_URL}/api/products/${productId}`);
        const product = await productResponse.json();

        // Load recommendations
        const recsResponse = await fetch(`${API_URL}/api/recommendations/${productId}`);
        const recommendations = await recsResponse.json();

        const stars = '⭐'.repeat(Math.floor(product.rating));

        modalBody.innerHTML = `
            <div class="modal-product">
                <img src="${product.image}" alt="${product.name}">
                <div class="modal-product-info">
                    <h2>${product.name}</h2>
                    <div class="product-rating">${stars} ${product.rating}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <p>${product.description}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>In Stock:</strong> ${product.stock} units</p>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}); closeModal();">Add to Cart</button>
                </div>
            </div>
            ${recommendations.length > 0 ? `
                <div class="recommendations">
                    <h3>🤖 AI Recommendations - You might also like:</h3>
                    <div class="recommendations-grid">
                        ${recommendations.map(rec => `
                            <div class="recommendation-card" onclick="showProductModal(${rec.id})">
                                <img src="${rec.image}" alt="${rec.name}">
                                <h4>${rec.name}</h4>
                                <div class="price">$${rec.price.toFixed(2)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;

        modal.classList.add('show');
    } catch (error) {
        console.error('Error loading product details:', error);
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('show');
}

// Show success message
function showSuccessMessage(message) {
    const div = document.createElement('div');
    div.className = 'success-message';
    div.textContent = message;
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}

// Close modal on outside click
document.getElementById('productModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'productModal') {
        closeModal();
    }
});
