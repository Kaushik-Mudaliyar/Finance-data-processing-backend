# 📊 Finance Data Processing & RBAC Backend

## 🚀 Project Overview

This project is a **backend system** for managing financial records with **Role-Based Access Control (RBAC)**.

It allows different types of users to perform actions based on their roles:

- **Admin** → Full access (manage users & records)
- **Analyst** → Can view records and insights
- **Viewer** → Can only view dashboard data

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- REST APIs

---

## 🔐 Authentication & Authorization

### Authentication

- Users login using **email**
- A **JWT token** is generated
- Token is stored in cookies
- Middleware verifies the user for every request

### Authorization (RBAC)

Access is controlled using role-based middleware:

- Admin → Full access
- Analyst → Read-only access to records
- Viewer → Dashboard only

---

## 👤 User Roles

| Role    | Permissions                    |
| ------- | ------------------------------ |
| Admin   | Create, update users & records |
| Analyst | View records, insights         |
| Viewer  | View dashboard only            |

---

## 📦 Features

### 👥 User Management (Admin Only)

- Create User
- Update User (role/status)
- Get All Users

---

### 💰 Records Management

- Create Record (Admin only)
- Get All Records (Admin, Analyst)
- Update Record (Admin only)
- Delete Record (Admin only)
- Filtering (date, category, type)

---

### 📊 Dashboard

- Total Income
- Total Expense
- Net Balance
- Category-wise totals
- Recent transactions

---

## 🗂️ Data Models

### User

- name
- email
- role (admin, analyst, viewer)
- status (ACTIVE, INACTIVE)

### Record

- amount
- type (income / expense)
- category
- date
- notes

---

## 🔒 Middleware

### Auth Middleware

- Verifies JWT token
- Attaches user to request (`req.user`)

### Role Middleware

- Checks if user has permission to access route
- Prevents unauthorized access

---

## ⚙️ API Structure

### Auth

- `POST /api/auth/login`

### Users (Admin only)

- `POST /api/users/create-user`
- `GET /api/users`
- `PATCH /api/users/update-user/:userId`

### Records

- `POST /api/records/create-record` (Admin)
- `GET /api/records` (Admin, Analyst)
- `PATCH /api/records/update-record/:recordId` (Admin)
- `DELETE /api/records/delete-record/:recordId` (Admin)

### Dashboard

- `GET /api/dashboard` (All roles)

---

## 🧠 Key Concepts Implemented

- Role-Based Access Control (RBAC)
- JWT Authentication
- MongoDB Aggregation (Dashboard)
- Input Validation
- Error Handling
- Clean API Design

---

## ⚡ Optional Features (Implemented)

- Filtering support
- Aggregations for analytics
- Proper status codes and validations

---

## 🧪 Future Improvements

- Password-based authentication
- Pagination
- Search functionality
- Rate limiting
- API documentation (Swagger)
- Unit & integration testing

---

## 🏁 Conclusion

This project demonstrates a **secure and scalable backend system** with proper authentication, authorization, and financial data processing.

---

## 👨‍💻 Author

**Kaushik**
