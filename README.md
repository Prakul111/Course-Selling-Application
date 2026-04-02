This is a comprehensive `README.md` file tailored for the **Course-Selling-Application** repository. It covers the technical stack (MERN), features, installation steps, and API structure based on the project's architecture.

---

# Course Selling Application 🎓

A full-stack web application that allows administrators to create and manage courses and users to browse and purchase them. Built with the **MERN** stack (MongoDB, Express, React, Node.js).

## 🚀 Features

### Admin Side
- **Authentication:** Secure signup and login for admin accounts.
- **Course Management:** Create, Update, and Delete course listings.
- **Dashboard:** View all published courses and manage content (title, description, price, image link).

### User Side
- **Authentication:** Secure user registration and login.
- **Course Discovery:** Browse a catalog of available courses.
- **Purchasing:** Securely "purchase" courses (logic implemented for transaction simulation).
- **My Courses:** View a personalized dashboard of all purchased content.

---

## 🛠 Tech Stack

- **Frontend:** React.js, CSS/Tailwind
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **State Management:** Hooks (useState, useEffect)

---

## 📂 Project Structure

```text
├── admin-frontend/     # React application for Admin panel
├── user-frontend/      # React application for Users
├── server/             # Express.js backend API
│   ├── routes/         # Admin and User API routes
│   ├── models/         # MongoDB schemas
│   └── index.js        # Entry point
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB instance

### 1. Clone the repository
```bash
git clone https://github.com/Prakul111/Course-Selling-Application.git
cd Course-Selling-Application
```

### 2. Backend Setup
```bash
cd server
npm install
```
- Create a `.env` file in the `server` directory.
- Add your variables:
  ```env
  PORT=3000
  MONGODB_URI=your_mongodb_connection_string
  ADMIN_SECRET=your_admin_jwt_secret
  USER_SECRET=your_user_jwt_secret
  ```
- Start the server: `npm start`

### 3. Frontend Setup
Repeat these steps for both `admin-frontend` and `user-frontend` folders:
```bash
cd admin-frontend # then repeat for user-frontend
npm install
npm start
```

---

## 🔌 API Endpoints

### Admin Routes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/admin/signup` | Register a new admin |
| POST | `/admin/login` | Login admin & get JWT |
| POST | `/admin/courses` | Create a new course |
| GET | `/admin/courses` | List all courses |
| PUT | `/admin/courses/:id` | Edit course details |

### User Routes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/user/signup` | Register a new user |
| POST | `/user/login` | Login user & get JWT |
| GET | `/user/courses` | View all available courses |
| POST | `/user/courses/:id` | Purchase a course |
| GET | `/user/purchasedCourses` | View owned courses |

---

## 🛡 License
Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author
**Prakul** - [GitHub Profile](https://github.com/Prakul111)
