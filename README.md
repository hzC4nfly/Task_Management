# Task Management Web App

A full-stack task management application built with **Laravel (backend)** and **React.js (frontend)**.
This app helps users organize, track, and manage their daily tasks efficiently.

---

## 🚀 Features

* User authentication (login/register)
* Create, update, delete tasks
* Task status management (pending, completed, etc.)
* Responsive UI with React
* RESTful API powered by Laravel
* Secure environment configuration using `.env`

---

## 🛠️ Tech Stack

**Backend:**

* PHP / Laravel
* MySQL (or any supported database)

**Frontend:**

* React.js
* Axios (for API requests)

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2. Backend Setup (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Update your `.env` file with database credentials.

```bash
php artisan migrate
php artisan serve
```

---

### 3. Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
APP_NAME=TaskManager
APP_URL=http://localhost:8000

DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

---



## 📸 Screenshots
<img width="1868" height="960" alt="Screenshot 2026-04-27 211617" src="https://github.com/user-attachments/assets/9881296f-e128-4738-858b-ced84ae65d4d" />

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Your Name
GitHub: https://github.com/hzC4nfly

---
