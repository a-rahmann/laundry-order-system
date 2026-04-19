# 🧺 Mini Laundry Order Management System (AI-First)

## 🚀 Overview

This project is a lightweight laundry/dry-cleaning order management system designed to handle real-world workflows such as order creation, status tracking, pricing, and dashboard analytics.

The system was built using an **AI-first development approach**, focusing on rapid iteration, practical implementation, and refining AI-generated code.

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* JavaScript
* In-memory storage (custom storage module)

---

## 📂 Project Structure

* `controllers/` → Business logic (orders, dashboard, pricing, etc.)
* `routes/` → API route definitions
* `server.js` → Main entry point
* `storage.js` → In-memory data handling
* `index.html / admin.html` → Basic UI (optional interaction)
* `db.json` → Sample/mock data
* `verify.js` → Utility functions (validation/auth)

---

## 🔧 Setup Instructions

```bash
git clone <your-repo-link>
cd <project-folder>
npm install
node server.js
```

Server runs on:

```
http://localhost:3000
```

---

## ✨ Features Implemented

### Core Features

* Create laundry orders with automatic billing

* Generate unique Order IDs

* Update order status:

  * RECEIVED
  * PROCESSING
  * READY
  * DELIVERED

* View all orders

* Filter orders by:

  * Status
  * Customer name
  * Phone number

* Dashboard API:

  * Total orders
  * Total revenue
  * Orders per status

---

### Additional Features (Bonus)

* Modular architecture (controllers + routes)
* Pricing management module
* Basic frontend pages (admin / index)
* Authentication utilities (basic)
* Clean separation of concerns

---

## 📡 API Endpoints

### 1. Create Order

POST `/orders`

```json
{
  "customerName": "Abdul",
  "phone": "1234567890",
  "items": [
    { "type": "Shirt", "quantity": 2 }
  ]
}
```

---

### 2. Update Order Status

PUT `/orders/:id/status`

```json
{
  "status": "PROCESSING"
}
```

---

### 3. Get Orders

GET `/orders`

Filters:

```
/orders?status=READY
/orders?customerName=Abdul
/orders?phone=1234567890
```

---

### 4. Dashboard

GET `/dashboard`

---

## 🧪 Testing / Demo

* All APIs tested using **Postman**
* Sample responses verified for:

  * Order creation
  * Filtering
  * Status updates
  * Dashboard analytics

---

## 🤖 AI Usage Report (IMPORTANT)

### Tools Used

* ChatGPT
* GitHub Copilot

---

### Sample Prompts Used

* "Create an Express.js backend for order management with modular structure"
* "Write a function to calculate total price based on garment type and quantity"
* "Implement filtering for API endpoints using query parameters"
* "Generate a dashboard API to calculate revenue and status counts"

---

### Where AI Helped

* Rapid scaffolding of backend architecture
* Generating API logic and routing structure
* Implementing filtering and aggregation logic
* Speeding up repetitive coding tasks

---

### Where AI Made Mistakes

* Did not validate order status properly
* Generated redundant logic in some controllers
* Missed edge case handling (missing inputs)

---

### Improvements Made

* Added strict validation for allowed statuses
* Refactored duplicated logic
* Improved code readability and modular structure
* Added better request validation

---

## ⚖️ Tradeoffs

* Used in-memory storage instead of a database for faster development
* Minimal UI to prioritize backend functionality
* Skipped full authentication system to focus on core features

---

## 🚀 Future Improvements

* Integrate MongoDB for persistent storage
* Add full authentication system (JWT)
* Add estimated delivery date feature
* Deploy on cloud platforms (Render / Railway)
* Improve UI with React frontend

---

## 🎯 Conclusion

This project focuses on **fast execution, practical problem-solving, and effective use of AI tools** rather than over-engineering.

The goal was to simulate a real-world product workflow and deliver a working solution efficiently.
