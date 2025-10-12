# AI E-Commerce Platform

A modern, visually stunning e-commerce web application built with React, Vite, Tailwind CSS, and Framer Motion. Features a responsive design, dark mode, glassmorphism effects, and an AI chatbot widget.

![AI E-Commerce Platform](https://github.com/user-attachments/assets/02657d64-89dc-486f-b319-557c5158b3b2)

## ✨ Features

### 🏠 **Home Page**
- Modern hero section with animated background
- Gradient text effects and smooth animations
- Featured products grid with hover effects
- Call-to-action sections with Framer Motion transitions
- Fully responsive design

![Home Page](https://github.com/user-attachments/assets/02657d64-89dc-486f-b319-557c5158b3b2)

### 🛍️ **Products Page**
- Real-time search functionality
- Category filtering (Audio, Wearables, Cameras, Gaming, Accessories, Storage)
- Sort options (Featured, Price, Rating)
- Animated product cards with hover effects
- Product count display

![Products Page](https://github.com/user-attachments/assets/42ee6828-64f5-436e-a924-7496b896e747)

### 📦 **Product Details Page**
- Animated image slider with navigation
- Product specifications and key features
- Customer reviews section
- Quantity selector
- Add to cart with animation feedback
- Breadcrumb navigation

![Product Details](https://github.com/user-attachments/assets/b96079ad-301a-4d35-a7c0-285f8cb0e68f)

### 🛒 **Shopping Cart**
- Cart item management (add, remove, update quantity)
- Real-time total calculation
- Order summary with tax calculation
- Animated transitions
- Empty cart state

![Shopping Cart](https://github.com/user-attachments/assets/9a725396-2a27-4439-90ab-7cdf9e79216a)

### 💳 **Checkout Page**
- Contact information form
- Shipping address form
- Secure payment information section
- Order summary sidebar
- Form validation
- Success confirmation page

![Checkout Page](https://github.com/user-attachments/assets/3c2f16a7-a4e5-4bf3-9e81-ff28ff104a92)

### 🤖 **AI Chatbot Widget**
- Floating chat button on all pages
- Animated chat interface
- Message history
- Placeholder for backend/API integration
- Smooth open/close animations

### 🌓 **Dark Mode**
- System preference detection
- Toggle button in navigation
- Smooth transitions between themes
- Persistent theme selection (localStorage)

### 🎨 **Design Features**
- **Glassmorphism**: Modern frosted glass effects throughout
- **Google Fonts**: Inter, Poppins, and Montserrat for beautiful typography
- **Gradient Accents**: Eye-catching gradient buttons and text
- **Smooth Animations**: Framer Motion for buttery-smooth transitions
- **Responsive**: Mobile-first design that works on all devices
- **Modern UI**: Clean, professional design with best practices

## 🚀 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library
- **Google Fonts** - Typography

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/JEEVANANTHAMP12/ai-ecommerce-platform.git
   cd ai-ecommerce-platform
   ```

2. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app should now be running!

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
frontend/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── ChatBot.jsx
│   │   └── ProductCard.jsx
│   ├── context/        # React context providers
│   │   ├── ThemeContext.jsx
│   │   └── CartContext.jsx
│   ├── data/          # Mock data
│   │   └── products.js
│   ├── pages/         # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   └── Checkout.jsx
│   ├── App.jsx        # Main app component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎨 Customization

### Colors
Edit the gradient colors in `src/index.css`:
```css
.text-gradient {
  background: linear-gradient(to right, rgb(37 99 235), rgb(147 51 234));
}
```

### Products
Modify the product data in `src/data/products.js` to add, remove, or update products.

### Fonts
Change fonts in `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Inter', 'Poppins', 'sans-serif'],
  display: ['Montserrat', 'sans-serif'],
}
```

## 🔮 Future Enhancements

This is a **scaffold/frontend-only** implementation. Future additions could include:

- ✅ Backend API integration
- ✅ Real AI chatbot with NLP
- ✅ User authentication (login/signup)
- ✅ Payment gateway integration (Stripe, PayPal)
- ✅ Product search with Elasticsearch
- ✅ User reviews and ratings
- ✅ Wishlist functionality
- ✅ Order history and tracking
- ✅ Admin dashboard
- ✅ Email notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**JEEVANANTHAMP12**

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) for product images
- [Lucide Icons](https://lucide.dev) for beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com) for the amazing utility framework

---

**Note**: This is a scaffold implementation focused on the frontend. Backend functionality (authentication, payments, real AI integration) should be added in future PRs.
