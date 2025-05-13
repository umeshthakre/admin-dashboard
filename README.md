# 🧑‍💻 Admin Dashboard – Full Stack Development Assignment

This repository contains a full-stack admin dashboard built with **React.js**, **Node.js**, and **MongoDB**. The application includes authentication, report management, data analytics, and a responsive UI using **Material UI**. It is developed as part of the InternetSoft Full-Stack Developer assignment.

---

## ✨ Features

### ✅ Frontend (React.js + Material UI)
- Fully responsive admin dashboard
- Secure Email/Password authentication using **Firebase Auth**
- Pages:
  - **Dashboard:** Summary metrics and recent activity
  - **Reports:** View and manage report statuses
  - **Settings:** Update user profile/preferences
- Data visualization with **Chart.js**
- Efficient data fetching with **Redux Toolkit Query**
- Toast notifications using **React Toastify**
- Token-based routing protection

### 🚀 Backend (Node.js + Express)
- JWT-based protected API endpoints:
  - `/users`: User data management
  - `/stats`: Dashboard metrics
  - `/settings`: User preferences
  - `/reports`: Report creation and retrieval
- MongoDB for data persistence
- Rate limiting via `express-rate-limit` to prevent abuse
- Request logging with `morgan`
- Simulated async report generation (pending → completed with delay)

---

## 🛠️ Technologies

- **Frontend:** React.js, Material UI, React Query, React Router, Chart.js, React Toastify
- **Backend:** Node.js, Express.js, MongoDB, Firebase Admin SDK (for auth), JWT
- **Other Tools:** Render (Deployment), Git, dotenv, morgan

---

## 📁 Project Structure

