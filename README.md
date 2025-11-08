# EMI Product Backend API

Backend REST API for the EMI Product Application built with Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5.1.0
- **Database:** MongoDB with Mongoose ODM v8.19.3
- **CORS:** Enabled for cross-origin requests
- **Environment:** dotenv for configuration management

### Dependencies

```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

### Dev Dependencies

```json
{
  "nodemon": "^3.0.1"
}
```

---

## 📊 Database Schema

### Product Schema

```javascript
{
  name: String (required),
  slug: String (required, unique, lowercase),
  baseVariant: String (required),
  variants: {
    colors: [{
      type: String (enum: ['color', 'storage', 'finish']),
      label: String,
      value: String,
      priceModifier: Number (default: 0),
      image: String
    }],
    storage: [VariantOption],
    finish: [VariantOption]
  },
  mrp: Number (required, min: 0),
  price: Number (required, min: 0),
  image: String (required),
  images: [String],
  emiPlans: [ObjectId] (ref: 'EMIPlan'),
  timestamps: true
}
```

### EMIPlan Schema

```javascript
{
  monthlyAmount: Number (required, min: 0),
  tenureMonths: Number (required, min: 1),
  interestRate: Number (required, min: 0, max: 100),
  cashback: String (nullable),
  productId: ObjectId (required, ref: 'Product'),
  timestamps: true
}
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/emi-products
   PORT=5000
   NODE_ENV=development
   ```

   **For MongoDB Atlas:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/emi-products
   PORT=5000
   NODE_ENV=development
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   ```

   Expected output:
   ```
   MongoDB Connected
   Cleared existing data
   ✅ Seed data created successfully!
   Created 2 products
   Created 8 EMI plans
   ```

5. **Start the server:**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Verify server is running:**
   
   Open browser: `http://localhost:5000`
   
   You should see:
   ```json
   {
     "message": "EMI Product API is running"
   }
   ```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### 1. Get All Products

**Endpoint:** `GET /api/products`

**Description:** Retrieves all products with their EMI plans

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Apple iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "baseVariant": "Silver, 256GB",
      "variants": {
        "colors": [
          {
            "type": "color",
            "label": "Silver",
            "value": "silver",
            "priceModifier": 0,
            "image": "/images/products/iphone-silver.jpg"
          },
          {
            "type": "color",
            "label": "Space Black",
            "value": "space-black",
            "priceModifier": 0,
            "image": "/images/products/iphone-black.jpg"
          }
        ],
        "storage": [
          {
            "type": "storage",
            "label": "128 GB",
            "value": "128gb",
            "priceModifier": -10000
          },
          {
            "type": "storage",
            "label": "256 GB",
            "value": "256gb",
            "priceModifier": 0
          }
        ]
      },
      "mrp": 134900,
      "price": 129900,
      "image": "/images/products/iphone-silver.jpg",
      "images": [
        "/images/products/iphone-silver.jpg",
        "/images/products/iphone-black.jpg"
      ],
      "emiPlans": [
        {
          "_id": "507f1f77bcf86cd799439012",
          "monthlyAmount": 43300,
          "tenureMonths": 3,
          "interestRate": 0,
          "cashback": null,
          "productId": "507f1f77bcf86cd799439011"
        }
      ],
      "createdAt": "2025-01-08T10:00:00.000Z",
      "updatedAt": "2025-01-08T10:00:00.000Z"
    }
  ]
}
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

### 2. Get Product by Slug

**Endpoint:** `GET /api/products/:slug`

**Description:** Retrieves a single product by its slug with populated EMI plans

**Parameters:**
- `slug` (path parameter) - Product slug (e.g., "iphone-17-pro")

**Example Request:**
```bash
GET http://localhost:5000/api/products/iphone-17-pro
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Apple iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "baseVariant": "Silver, 256GB",
    "variants": {
      "colors": [
        {
          "type": "color",
          "label": "Silver",
          "value": "silver",
          "priceModifier": 0,
          "image": "/images/products/iphone-silver.jpg"
        }
      ],
      "storage": [
        {
          "type": "storage",
          "label": "256 GB",
          "value": "256gb",
          "priceModifier": 0
        }
      ]
    },
    "mrp": 134900,
    "price": 129900,
    "image": "/images/products/iphone-silver.jpg",
    "images": ["/images/products/iphone-silver.jpg"],
    "emiPlans": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "monthlyAmount": 43300,
        "tenureMonths": 3,
        "interestRate": 0,
        "cashback": null,
        "productId": "507f1f77bcf86cd799439011",
        "createdAt": "2025-01-08T10:00:00.000Z",
        "updatedAt": "2025-01-08T10:00:00.000Z"
      },
      {
        "_id": "507f1f77bcf86cd799439013",
        "monthlyAmount": 21650,
        "tenureMonths": 6,
        "interestRate": 0,
        "cashback": "₹500 cashback",
        "productId": "507f1f77bcf86cd799439011",
        "createdAt": "2025-01-08T10:00:00.000Z",
        "updatedAt": "2025-01-08T10:00:00.000Z"
      }
    ],
    "createdAt": "2025-01-08T10:00:00.000Z",
    "updatedAt": "2025-01-08T10:00:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Product not found"
}
```

**Status Codes:**
- `200 OK` - Success
- `404 Not Found` - Product not found
- `500 Internal Server Error` - Server error

---

## 🔧 Environment Variables

Create a `.env` file in the server directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/emi-products

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

### MongoDB Atlas Example:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/emi-products?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
```

---

## 📜 Scripts

```bash
# Start server (production)
npm start

# Start server with nodemon (development)
npm run dev

# Seed database with sample data
npm run seed
```

---

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   └── productController.js  # API logic
├── models/
│   ├── Product.js           # Product schema
│   └── EMIPlan.js           # EMI Plan schema
├── routes/
│   └── productRoutes.js     # API routes
├── .env                     # Environment variables
├── .env.example             # Environment template
├── package.json             # Dependencies
├── seed.js                  # Database seeding
└── server.js                # Entry point
```

---

## 🗄️ Sample Data

The seed script creates:

### Products (2):
1. **Apple iPhone 17 Pro**
   - Colors: Silver, Space Black, Gold, Deep Purple
   - Storage: 128GB, 256GB, 512GB, 1TB
   - Price: ₹129,900

2. **Samsung Galaxy S24 Ultra**
   - Colors: Black, Gray, White
   - Storage: 256GB, 512GB, 1TB
   - Price: ₹119,999

### EMI Plans (4 per product):
- 3 months @ 0% interest
- 6 months @ 0% interest + cashback
- 9 months @ 10.5% interest
- 12 months @ 12% interest + cashback

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
# For local MongoDB:
mongosh

# For Atlas: Verify connection string in .env
```

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Change port in .env
PORT=5001
```

### Seed Script Fails
```bash
# Clear database first
mongosh
use emi-products
db.dropDatabase()
exit

# Run seed again
npm run seed
```

EMI Product Application Backend
