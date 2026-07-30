# EcoBazaar - Eco-Friendly Shopping App

A fully functional, professional React-based eco-friendly e-commerce application with both **User** and **Admin** dashboards.

## ✨ Features

### 🌟 Complete Authentication System
- **User Registration**: Register as User or Admin with validation
- **Secure Login**: Email + Password with role-based access
- **Password Validation**: Strong password requirements (8+ chars, uppercase, lowercase, number, special character)
- **Email Validation**: Proper email format checking
- **Phone Validation**: 10-digit Indian phone numbers

### 👤 User Dashboard Features
1. **Home Screen**
   - Hero banner with 3D animations
   - Product categories
   - Product grid with CO₂ values, ratings, wishlist
   - Search functionality

2. **Product Details**
   - Large product images with hover effects
   - Complete product information
   - CO₂ footprint display
   - Add to cart/wishlist functionality
   - **Low Carbon Alternatives** section with similar products sorted by CO₂
   - Functional sorting by price, CO₂, rating

3. **Search & Filter**
   - Search by name/brand
   - Filter by category, brand, color, price range
   - Sort by: CO₂ (low to high), Price, Rating
   - **Fully functional** sorting and filtering

4. **Shopping Cart**
   - View cart items with CO₂ totals
   - Quantity adjustment
   - **Total Carbon Footprint** in circle display
   - Apply coupons (try: `ECO10` for 10% off, `GREEN50` for ₹50 off)
   - Checkout with address and payment options
   - Order confirmation with green checkmark

5. **Wishlist**
   - Save favorite products
   - Move to cart functionality

6. **Profile**
   - Edit profile (name, phone)
   - **Order History** with product thumbnails
   - **Order Tracking** timeline (Pending → Packed → Shipped → Delivered)
   - Eco Points system
   - Total Carbon Footprint meter

7. **Carbon Footprint Dashboard**
   - Animated CO₂ gauge
   - **Happy/Sad Earth graphics** based on CO₂ levels
   - Category breakdown
   - Eco tips

8. **About & Support**
   - Company mission
   - Contact form with animation
   - FAQ section

### 🔧 Admin Dashboard Features
1. **Dashboard Home**
   - Total products, users, orders, revenue stats
   - **Monthly revenue** tracking
   - **Total CO₂ analytics**
   - Low stock alerts
   - Pending orders notifications
   - Charts: Products by category, Order status, CO₂ by category

2. **Add Product**
   - Upload product with all details
   - Name, Brand, Price, CO₂ value
   - Stock quantity, Category, Colors
   - Description

3. **Manage Products**
   - View all products in table
   - Search functionality
   - Edit/Delete products

4. **Edit Prices**
   - Select product
   - Update price with slider or input

5. **Orders Management**
   - View all orders with customer details
   - Update order status (Pending → Packed → Shipped → Delivered)
   - **Real-time status updates** - when user places order, admin sees it immediately
   - Address and payment info

6. **Stock Tracking**
   - Full inventory view
   - **Low stock alerts** (< 20 items)
   - **Out of stock flags**
   - Update stock quantities

7. **Customer Reviews**
   - View all product reviews
   - Customer ratings

## 🎨 Design Features

### Visual Design
- **Eco-green gradient theme**: #2E7D32, #A5D6A7, #69F0AE, white
- **Rounded corners** and soft shadows
- **CO₂ bubble animations** throughout
- **Floating 3D elements**: leaves, shopping bags
- **Smooth animations** with Motion (Framer Motion)

### Loading & Transitions
- **Animated splash screen** with rotating logo
- **Loading buffers** with CO₂ icons when navigating
- Smooth page transitions

### Responsive Design
- Mobile-friendly navigation
- Adaptive layouts for all screen sizes
- Hamburger menu on mobile

## 💾 Data Persistence
- All data saved to **localStorage**
- Persists across browser sessions
- Initial demo products included

## 🛒 Order Flow
1. User adds products to cart
2. User proceeds to checkout
3. User enters delivery address (street, city, state, 6-digit pincode)
4. User selects payment mode (COD/UPI/Card)
5. Order placed with green checkmark animation
6. **Order appears in Admin dashboard** immediately
7. User receives confirmation message
8. Order saved to Order History
9. User can track order status
10. Admin can update order status

## 💰 Currency
All prices displayed in **Indian Rupees (₹)**

## 🔐 Demo Credentials

Since there are no pre-registered users, you need to:

1. **Register First**:
   - Click "Register" tab
   - Select User or Admin
   - Fill in all details with:
     - Valid email (e.g., user@example.com)
     - 10-digit phone (e.g., 9876543210)
     - Strong password (e.g., Test@1234)
   - Click "Register as User" or "Register as Admin"

2. **Then Login**:
   - Select same role (User/Admin)
   - Use email and password you just registered
   - Click Login

## 🎯 Coupons

Try these discount codes at checkout:
- `ECO10` - Get 10% off
- `GREEN50` - Get ₹50 off

## 🌍 CO₂ Features

### Product Level
- Each product shows CO₂ value in kg
- Low carbon badge for products < 2 kg CO₂

### Cart Level
- **Total CO₂** displayed in circular badge
- **Animated Earth** (😊 happy for low CO₂, 😟 sad for high CO₂)
- CO₂ rating: Excellent/Good/Moderate/High

### Alternatives
- When viewing product details, see similar items with lower CO₂
- Shows percentage reduction in carbon footprint

### Dashboard
- Animated CO₂ gauge
- Category breakdown
- Earth animation changes based on total footprint

## 🏗️ Technical Stack

- **Frontend**: React 18.3+ with TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animations**: Motion (Framer Motion) 12.23
- **Charts**: Recharts 2.15
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast)
- **State**: React useState + localStorage

## 📁 Project Structure

```
/src
  /app
    App.tsx                 # Main app with routing logic
    /components
      SplashScreen.tsx      # Animated splash with logo
      AuthScreen.tsx        # Login/Register
      LoadingScreen.tsx     # Loading with CO₂ animation
      UserDashboard.tsx     # User main layout
      AdminDashboard.tsx    # Admin main layout
      /user                 # All user components
        UserHome.tsx
        ProductDetail.tsx
        UserProfile.tsx
        UserCart.tsx
        UserWishlist.tsx
        UserSearch.tsx
        UserCarbonFootprint.tsx
        UserAbout.tsx
        UserSupport.tsx
      /admin                # All admin components
        AdminHome.tsx
        AdminAddProduct.tsx
        AdminManageProducts.tsx
        AdminEditPrice.tsx
        AdminOrders.tsx
        AdminStock.tsx
        AdminReviews.tsx
        AdminProfile.tsx
        AdminAbout.tsx
        AdminSupport.tsx
  /styles
    fonts.css             # Google Fonts import
    index.css             # Main styles
    theme.css             # Tailwind theme
```

## 🚀 How to Use

### First Time Setup
1. Open the application
2. Wait for splash screen (3 seconds)
3. Register as User or Admin
4. Login with your credentials

### As User
1. Browse products on home page
2. Click product to see details and alternatives
3. Add items to cart or wishlist
4. Use search and filters to find products
5. Checkout with address and payment info
6. Track orders in Profile
7. View carbon footprint dashboard

### As Admin
1. View dashboard analytics
2. Add new products with CO₂ values
3. Manage inventory and stock
4. Update order statuses
5. Monitor low stock alerts
6. View customer reviews

## 🎨 Animations

- **Splash Screen**: Rotating logo with orbiting elements, floating leaves
- **CO₂ Bubbles**: Rising bubbles with "CO₂" text throughout app
- **Product Cards**: Hover effects with 3D lift
- **Loading**: Rotating leaf with orbiting dots
- **Earth**: Rotates continuously, color changes with CO₂ level
- **Checkout Success**: Scale animation with green checkmark

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Color Palette

- Primary Green: `#2E7D32`
- Light Green: `#A5D6A7`
- Accent Green: `#69F0AE`
- White: `#FFFFFF`
- Additional colors for status, categories, etc.

## 🔄 State Management

Uses React's built-in state with localStorage persistence:
- `users[]` - All registered users
- `products[]` - Product catalog (10 demo products included)
- `orders[]` - All placed orders
- `currentUser` - Logged-in user

## ✅ Validation Rules

### Registration
- Name: Required
- Email: Valid format (name@domain.com)
- Phone: Exactly 10 digits
- Password: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special (!@#$%^&*)
- Confirm Password: Must match

### Login
- User must be registered
- Correct email and role combination

### Checkout
- All address fields required
- Pincode: Exactly 6 digits

## 🎁 Demo Products

10 eco-friendly products included:
1. Organic Cotton T-Shirt (2.5 kg CO₂)
2. Bamboo Water Bottle (1.2 kg CO₂)
3. Recycled Polyester Backpack (3.5 kg CO₂)
4. Solar Power Bank (4.0 kg CO₂)
5. Jute Shopping Bag (0.8 kg CO₂)
6. Wooden Cutlery Set (1.5 kg CO₂)
7. Hemp Yoga Mat (2.8 kg CO₂)
8. Eco-Friendly Sneakers (5.5 kg CO₂)
9. Organic Face Cream (1.0 kg CO₂)
10. Recycled Paper Notebook (0.5 kg CO₂)

## 📊 Admin Analytics

- Real-time dashboard updates
- Product distribution charts
- Order status overview
- CO₂ by category analysis
- Revenue tracking
- Stock alerts

## 🌟 Key Highlights

✅ Fully functional authentication with validation
✅ Real-time order updates between user and admin
✅ Complete shopping flow from browse to checkout
✅ Animated CO₂ tracking with visual feedback
✅ Low carbon product alternatives
✅ Working search, sort, and filter
✅ Order tracking with timeline
✅ Stock management with alerts
✅ Responsive design for all devices
✅ Professional UI with smooth animations
✅ localStorage persistence
✅ Indian Rupee currency
✅ Happy/Sad Earth graphics based on footprint

## 📝 Notes

- This is a **frontend prototype** with full functionality
- Data persists in browser localStorage
- For production, connect to a backend API (designed to work with Java backend via REST APIs)
- Payment processing is simulated (no real transactions)
- Images from Unsplash (free to use)

---

**Built with ❤️ for a sustainable future 🌍**
