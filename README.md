# MERN-TShirts

A full-stack e-commerce web application for browsing and purchasing T-shirts, built with the MERN stack (MongoDB, Express.js, React, Node.js). Features user authentication with JWT, role-based access control (user/admin), shopping cart functionality, and payment processing via Braintree.

## Tech Stack

### Backend
- **Runtime:** Node.js with Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) with cookie-based sessions
- **Password Hashing:** HMAC SHA-256 with UUID salt
- **Payment Gateway:** Braintree (Sandbox)
- **File Uploads:** Formidable (for product images)
- **Validation:** express-validator

### Frontend
- **Framework:** React 18
- **Routing:** React Router DOM v6
- **Payment UI:** braintree-web-drop-in-react
- **Styling:** Bootstrap (dark theme)

## Features

### User Features
- Sign up and sign in with email/password validation
- Browse all T-shirt products on the home page
- View product details with images, descriptions, and prices
- Add products to cart and remove them
- Cart persisted in browser localStorage
- Checkout and pay using Braintree Drop-In UI
- View purchase history
- User dashboard with profile management

### Admin Features
- Admin dashboard (role-based access, `role = 1`)
- Create, update, and delete products (with image upload, max 3MB)
- Create, update, and delete categories
- View all orders and update order status
- Order status tracking: Received, Processing, Shipped, Delivered, Cancelled

## Project Structure

```
MERN-TShirts/
├── BackEnd/
│   ├── app.js                  # Express server entry point
│   ├── package.json
│   ├── controllers/
│   │   ├── auth.js             # Signup, signin, signout, JWT middleware
│   │   ├── user.js             # User profile and purchase list
│   │   ├── product.js          # Product CRUD and stock management
│   │   ├── category.js         # Category CRUD
│   │   ├── order.js            # Order creation and status management
│   │   └── paymentb.js         # Braintree token generation and payment processing
│   ├── models/
│   │   ├── user.js             # User schema with encrypted password
│   │   ├── product.js          # Product schema with photo buffer
│   │   ├── category.js         # Category schema
│   │   └── order.js            # Order and ProductCart schemas
│   └── routes/
│       ├── auth.js             # /api/signup, /api/signin, /api/signout
│       ├── user.js             # /api/user/:userId, /api/orders/user/:userId
│       ├── product.js          # /api/product/*, /api/products
│       ├── category.js         # /api/category/*, /api/categories
│       ├── order.js            # /api/order/*
│       └── paymentBRoutes.js   # /api/payment/*
└── MERN src/
    └── FrontEnd/
        ├── package.json
        └── src/
            ├── admin/
            │   └── ManageProducts.js
            ├── auth/helper/
            │   ├── index.js        # signup, signin, signout, isAuthenticated
            │   ├── AdminRoutes.js   # Protected route wrapper for admins
            │   └── PrivateRoutes.js # Protected route wrapper for logged-in users
            └── core/
                ├── Home.js         # Product listing page
                ├── Card.js         # Product card with add/remove cart
                ├── Cart.js         # Shopping cart page
                ├── Menu.js         # Navigation bar
                ├── Base.js         # Layout wrapper
                ├── Paymentb.js     # Braintree payment component
                └── helper/         # API call utilities
```

## API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/signup` | Register a new user | Public |
| POST | `/api/signin` | Login and receive JWT token | Public |
| GET | `/api/signout` | Logout and clear cookie | Public |

### Users
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/user/:userId` | Get user profile | Authenticated |
| PUT | `/api/user/:userId` | Update user profile | Authenticated |
| GET | `/api/orders/user/:userId` | Get user's purchase history | Authenticated |

### Products
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | List all products (supports `limit` and `sortBy` query params) | Public |
| GET | `/api/product/:productId` | Get single product | Public |
| GET | `/api/product/photo/:productId` | Get product photo | Public |
| GET | `/api/products/categories` | Get all unique categories | Public |
| POST | `/api/product/create/:userId` | Create a product | Admin |
| PUT | `/api/product/:productId/:userId` | Update a product | Admin |
| DELETE | `/api/product/:productId/:userId` | Delete a product | Admin |

### Categories
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/categories` | List all categories | Public |
| GET | `/api/category/:categoryId` | Get single category | Public |
| POST | `/api/category/create/:userId` | Create a category | Admin |
| PUT | `/api/category/:categoryId/:userId` | Update a category | Admin |
| DELETE | `/api/category/:categoryId/:userId` | Delete a category | Admin |

### Orders
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/order/create/:userId` | Create an order | Authenticated |
| GET | `/api/order/all/:userId` | Get all orders | Admin |
| GET | `/api/order/status/:userId` | Get order status values | Admin |
| PUT | `/api/order/:orderId/status/:userId` | Update order status | Admin |

### Payments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/payment/gettoken/:userId` | Get Braintree client token | Authenticated |
| POST | `/api/payment/braintree/:userId` | Process payment via Braintree | Authenticated |

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local instance or MongoDB Atlas)
- Braintree Sandbox account (for payment processing)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd BackEnd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `BackEnd/` directory with the following variables:
   ```env
   DATABASE=mongodb://localhost:27017/tshirts
   PORT=8000
   SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd "MERN src/FrontEnd"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `FrontEnd/` directory:
   ```env
   REACT_APP_BACKEND=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`.

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `DATABASE` | BackEnd/.env | MongoDB connection string |
| `PORT` | BackEnd/.env | Server port (default: 8000) |
| `SECRET` | BackEnd/.env | JWT signing secret |
| `REACT_APP_BACKEND` | FrontEnd/.env | Backend API base URL |
