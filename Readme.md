# ✦ TaskFlow — Full-Stack Task Manager

A sleek, full-stack task management app built with **React**, **Node.js**, **Express**, and **MongoDB**. Features real user authentication, full CRUD operations, and a premium glassmorphism dark UI.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)

---

## 🚀 Features

- **Authentication** — Signup & login with hashed passwords (bcrypt) and JWT tokens
- **Task Management** — Create, read, update, and delete tasks
- **Status Tracking** — Toggle tasks between pending and completed
- **Protected Routes** — Dashboard accessible only to authenticated users
- **Premium UI** — Glassmorphism dark theme with micro-animations
- **Responsive** — Works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router, Axios |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Styling | Vanilla CSS (glassmorphism + dark theme) |

---

## 📁 Project Structure

```
Task-manager/
├── backend/
│   ├── server.js               # Express server entry point
│   ├── .env                    # Environment variables
│   ├── routes/
│   │   ├── auth.js             # Signup & Login endpoints
│   │   └── Task.js             # Task CRUD endpoints
│   ├── models/
│   │   ├── user.js             # User schema
│   │   └── Task.js             # Task schema
│   └── middleware/
│       └── authMiddleware.js   # JWT verification middleware
│
└── frontend/
    └── src/
        ├── App.js              # Router & auth guards
        ├── index.css           # Global design system
        ├── api/
        │   └── axios.js        # Axios instance with auth interceptor
        └── pages/
            ├── Login.js        # Login page
            ├── Signup.js       # Signup page
            └── Dashboard.js    # Task dashboard with full CRUD
```

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/Task-manager.git
cd Task-manager
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/taskdb
JWT_SECRET=your_secret_key_here
PORT=5000
```

Start the server:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```

The app will open at **http://localhost:3000**.

---

## 🔗 API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login & receive JWT token |

### Tasks *(requires auth)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks for the logged-in user |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task (title, description, status) |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## 📸 Screenshots

> *Add screenshots of your Login, Signup, and Dashboard pages here.*

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ using React, Node.js & MongoDB</p>
