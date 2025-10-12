# 🤖 AI E-Commerce Platform

A modern, AI-powered e-commerce platform built with Node.js, Express, and vanilla JavaScript. This platform features intelligent product recommendations, real-time cart management, and a beautiful, responsive user interface.

![AI E-Commerce Platform](https://github.com/user-attachments/assets/a6aca391-0346-43de-a29f-537dc69ba185)

## ✨ Features

- **AI-Powered Recommendations**: Get personalized product suggestions based on browsing behavior
- **Real-Time Shopping Cart**: Add, update, and remove items with instant feedback
- **Advanced Search & Filters**: Find products by category, price, and rating
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Product Details Modal**: View detailed product information with AI recommendations
- **Smooth Checkout Process**: Simple and intuitive checkout flow

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JEEVANANTHAMP12/ai-ecommerce-platform.git
cd ai-ecommerce-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and visit:
```
http://localhost:3000
```

## 📸 Screenshots

### Product Grid View
![Product Listing with Filters](https://github.com/user-attachments/assets/4546b766-a62c-4459-a340-cc908e047871)

### AI-Powered Recommendations
![Product Details with AI Recommendations](https://github.com/user-attachments/assets/1d5deb31-93f4-4c1f-99da-e31e6484a9e7)

## 📁 Project Structure

```
ai-ecommerce-platform/
├── public/              # Frontend files
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Styling
│   └── app.js          # Frontend JavaScript
├── server.js           # Backend server
├── package.json        # Dependencies
└── README.md           # Documentation
```

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products (supports filtering and sorting)
- `GET /api/products/:id` - Get single product details
- `GET /api/recommendations/:productId` - Get AI recommendations for a product

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/:userId` - Add item to cart
- `PUT /api/cart/:userId/:productId` - Update cart item quantity
- `DELETE /api/cart/:userId/:productId` - Remove item from cart
- `DELETE /api/cart/:userId` - Clear cart

### Checkout
- `POST /api/checkout/:userId` - Process checkout

## 🎨 Features in Detail

### Smart Product Filtering
- Filter by category (Electronics, Smart Home, Fitness, Accessories)
- Sort by price (low to high, high to low) or rating
- Real-time search functionality

### AI Recommendations
The platform uses intelligent algorithms to suggest products based on:
- Product category similarities
- User browsing patterns
- Product ratings and popularity

### Shopping Cart
- Add multiple products
- Adjust quantities with +/- buttons
- Remove items individually
- View real-time total
- Persistent cart state

### Responsive UI
- Mobile-first design
- Touch-friendly interface
- Smooth animations and transitions
- Accessible for all users

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: RESTful architecture
- **Styling**: Modern CSS with Flexbox and Grid

## 📝 Development

### Running in Development Mode
```bash
npm run dev
```

### Adding New Products
Edit the `products` array in `server.js` to add new products:

```javascript
{
  id: 7,
  name: "Product Name",
  price: 99.99,
  category: "category-name",
  description: "Product description",
  image: "image-url",
  rating: 4.5,
  stock: 100
}
```

## 🌟 Future Enhancements

- User authentication and profiles
- Order history tracking
- Payment gateway integration
- Advanced AI recommendation engine using machine learning
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Admin dashboard for inventory management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

JEEVANANTHAMP12

---

Made with ❤️ using Node.js and AI