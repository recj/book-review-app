# 📚 Book Review App

A fullstack application where users can sign up, log in, and share book reviews.
Each review includes a title, rating, review text, and a unique **mood** field to express emotions.
The app is built with **Next.js, TypeScript, and Tailwind CSS**, uses **JWT authentication with HttpOnly cookies**, and stores data in **PostgreSQL** hosted on **Railway**.

---

## 🚀 Features

- User registration and authentication with JWT in HttpOnly cookies.
- Password hashing using bcryptjs.
- View all book reviews with reviewer name, rating, text, and mood.
- Add new reviews (only for authenticated users).
- Delete reviews (only by their owners).
- Deployment on Railway with PostgreSQL.

---

## 🚀 Live Demo

🔗 [Book Review App on Railway](https://book-review-app-production-9475.up.railway.app/)

---

## 🛠️ Tech Stack

| Tool / Library                                             | Version | Description                           |
| ---------------------------------------------------------- | ------- | ------------------------------------- |
| [Next.js](https://nextjs.org/)                             | 15.5.0  | React framework with hybrid rendering |
| [React](https://react.dev/)                                | 19.1.0  | Frontend library for building UI      |
| [TypeScript](https://www.typescriptlang.org/)              | 5.x     | Static typing over JavaScript         |
| [Tailwind CSS](https://tailwindcss.com/)                   | 4.x     | Utility-first CSS framework           |
| [PostgreSQL](https://www.postgresql.org/)                  | 16.x    | Relational database (Railway managed) |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js)           | 3.0.2   | Password hashing                      |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | 9.0.2   | JWT token generation and validation   |
| [Railway](https://railway.app/)                            | —       | Hosting and deployment platform       |

---

## 💻 System Requirements

| Tool               | Minimum Version                     |
| ------------------ | ----------------------------------- |
| **Node.js**        | 20.x                                |
| **NPM**            | 10.x                                |
| **Docker**         | 28.x (Optional)                     |
| **Docker Compose** | 2.x (Optional)                      |
| **PostgreSQL**     | 16 (if not using Railway or Docker) |

---

## 🗄 Database Schema

### `users` table

```sql
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### `reviews` table

```sql
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
book_title TEXT NOT NULL,
rating INTEGER CHECK (rating BETWEEN 1 AND 5),
review TEXT NOT NULL,
mood TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

---

## 🔌 API Endpoints

| Method | Endpoint           | Description                          | Auth |
| ------ | ------------------ | ------------------------------------ | ---- |
| POST   | `/api/signup`      | Register a new user                  | ❌   |
| POST   | `/api/login`       | Authenticate and set JWT cookie      | ❌   |
| GET    | `/api/reviews`     | Get all reviews                      | ✔️   |
| POST   | `/api/reviews`     | Add a new review                     | ✔️   |
| DELETE | `/api/reviews/:id` | Delete a review (only owner allowed) | ✔️   |
| GET    | `/api/reviews/:id` | Get a review by Id                   | ✔️   |

---

## 🌐 Pages & Routes

- `/` → Initial Page
- `/signup` → Register new user
- `/login` → Log in user
- `/reviews` → View all reviews
- `/add-review` → Submit a new review

---

## 🖥 Installation & Setup

For detailed installation and configuration instructions, please see the [INSTALL.md](INSTALL.md) file.

---

## 📁 Relevant Folders Overview

```

├── src/
│   ├── app/
│   │   ├── api/              # API routes (auth, reviews)
│   │   ├── (protected)/      # Protected routes (require authentication)
│   │   └── (public)/         # Public routes (login, signup)
│   ├── components/           # Reusable UI and feature components
│   │   ├── auth/
│   │   ├── layout/
│   │   ├── reviews/
│   │   └── ui/
│   ├── context/              # React context providers (auth context)
│   ├── core/                 # Core business logic
│   │   ├── dto/
│   │   ├── services/
│   │   └── validators/
│   ├── lib/
│   │   ├── auth/             # JWT and password utilities
│   │   ├── database/         # Database connection, migrations, scripts
│   │   └── types/
│   ├── middleware.ts         # Middleware for route protection
│   └── repositories/         # Database repositories (User, Review)
└──
```

---

## ⚡ Known Issues / Trade-offs

This project is an MVP and, for the sake of simplicity, some limitations and trade-offs were made:

- **No role/permission system** → all users have the same privileges (no admin vs. regular user distinction).
- **No pagination or filtering for reviews** → all reviews are fetched at once, which may impact performance with large datasets.
- **Basic form validation only** → handled with Zod, but no advanced validation (e.g., password strength, email confirmation).
- **No update/edit functionality for reviews** → reviews can only be created or deleted.
- **No JWT refresh token mechanism** → tokens expire after `7d` and require re-login; no refresh token flow implemented.
- **No token storage in DB** → JWTs are stateless and not persisted (cannot be revoked individually).
- **No audit/logging system** → actions such as login, review creation, or deletion are not tracked.
- **No rate limiting or brute-force protection** → repeated login attempts are not restricted.
- **Minimal error handling** → errors are logged but not standardized into a global error-handling layer.
- **Deployment on free-tier Railway** → may have resource limits and potential downtime.

---

## 📖 Mood Field

The **mood** field allows users to associate an emotional state with their review, adding personality and context beyond numeric ratings.
Available moods are predefined to keep consistency across reviews:

| Mood             | Description                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| **Excited**      | The book was thrilling or highly engaging, leaving the reader enthusiastic. |
| **Thoughtful**   | The book encouraged deep thinking or reflection.                            |
| **Inspired**     | The book was motivational and sparked creativity or action.                 |
| **Disappointed** | The book did not meet expectations or left the reader unsatisfied.          |
| **Neutral**      | The book was neither strongly positive nor negative; a balanced impression. |

---

## ⏱ Estimated Time Spent

The initial plan estimated **6–8 hours** of development time to deliver an MVP.
In practice, the project required closer to **14 hours of focused work**, distributed across the following phases:

| Phase                | Activities                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **Foundation**       | Project setup, environment configuration, and database schema design with migration scripts.     |
| **Auth Backend**     | User model, JWT authentication, password hashing, API routes for signup/login, and route guards. |
| **Reviews Backend**  | Review entity, DTOs, CRUD services, and API endpoints (create, list, delete).                    |
| **Auth Frontend**    | Authentication context, login/signup forms, and protected routes integration.                    |
| **Reviews Frontend** | Components for review cards, lists, creation form, and mood selector.                            |
| **Deploy**           | Deployment on Railway, and final documentation.                                                  |

The work spanned **from initial setup to production deployment**, including extra time to troubleshoot environment configuration, PostgreSQL migrations, and deployment adjustments.

---

## 📄 License

MIT License.

---

## 📞 Contact

For questions, suggestions, or feedback about this project, please contact:

- **Name:** Rodrigo Espinoza
- **Email:** espinozarjc@gmail.com
- **GitHub:** [@recj](https://github.com/recj)
