# 📘 Installation Guide – Book Review App

This file contains the instructions to install and configure the **Book Review App** in your local environment (development) or in production (Railway).

---

## ✅ Prerequisites

Make sure you have the following tools installed:

| Tool               | Version (min) | Description                            | Installation                                                                 |
| ------------------ | ------------- | -------------------------------------- | ---------------------------------------------------------------------------- |
| **Node.js**        | 20.x          | JavaScript runtime environment         | [https://nodejs.org/](https://nodejs.org/)                                   |
| **NPM**            | 10.x          | Package manager for Node.js            | `npm install -g npm@10`                                                      |
| **PostgreSQL**     | 16.x          | Relational database used by the system | [https://www.postgresql.org/download/](https://www.postgresql.org/download/) |
| **Docker**         | 28.x          | Containerization platform (optional)   | [https://www.docker.com/](https://www.docker.com/)                           |
| **Docker Compose** | 2.x           | Orchestration for Docker containers    | [https://docs.docker.com/compose/](https://docs.docker.com/compose/)         |
| **Git**            | latest        | Version control system                 | [https://git-scm.com/downloads](https://git-scm.com/downloads)               |

---

## 📅 Project Initialization

### 1. Clone the repository

```bash
git clone https://github.com/recj/book-review-app.git
cd book-review-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and edit it:

```bash
cp .env.example .env
```

---

## 🧱 Database Setup

You can set up the database in two ways depending on your development style:

### Option A: Using a local PostgreSQL installation

1. Make sure PostgreSQL service is running in your system.
2. Create a database manually (via pgAdmin or other GUI tool).
3. Update the `.env` file with your database credentials under the **development section**:
   ```env
   DB_HOST=localhost
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=book_review_db
   DB_PORT=5432
   ```
4. Run migrations with the included script:
   ```bash
   npm run db:migrate
   ```

### Option B: Using Docker Compose (recommended for development)

1. Start a PostgreSQL container:
   ```bash
   docker compose up -d
   ```
   (Make sure you have a `docker-compose.yml` file configured with a PostgreSQL service).
2. Update the `.env` file with matching credentials from Docker Compose.
3. Run migrations:
   ```bash
   npm run db:migrate
   ```

---

## 🚀 Running the Project

### Development Mode (hot-reload)

```bash
npm run dev
```

### Production Mode (optimized build)

```bash
npm run build
npm run start
```

---

## 🌐 Deployment on Railway

1. Create a new project in [Railway](https://railway.app/).
2. Add a **PostgreSQL plugin**.
3. Copy the connection string as `DATABASE_URL`.
4. Add environment variables (`DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_BASE_URL`.) under the _Variables_ tab.
5. Deploy your app from GitHub (Railway auto-detects Next.js).
6. Run migrations manually.
   Make sure your `.env` file is properly configured with the public `DATABASE_URL` provided by your PostgreSQL instance in Railway. This ensures that the following command runs migrations directly against your Railway database from your local machine:
   ```bash
   npm run db:migrate
   ```

---

## 📂 Environment Variables

| Variable               | Example Value                                 | Description                                         |
| ---------------------- | --------------------------------------------- | --------------------------------------------------- |
| `NODE_ENV`             | `development`                                 | Environment (`development`, `production`, `test`)   |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000`                       | Base URL of the app                                 |
| `DATABASE_URL`         | `postgresql://username:password@host:port/db` | PostgreSQL connection string (Railway / production) |
| `DB_HOST`              | `localhost`                                   | Database host (development only)                    |
| `DB_USERNAME`          | `postgres`                                    | Database username (development only)                |
| `DB_PASSWORD`          | `postgres`                                    | Database password (development only)                |
| `DB_NAME`              | `book_review_db`                              | Database name (development only)                    |
| `DB_PORT`              | `5432`                                        | Database port (development only)                    |
| `JWT_SECRET`           | `mysupersecretkey`                            | Secret key to sign JWT tokens                       |
| `JWT_EXPIRES_IN`       | `7d`                                          | JWT expiration (e.g., `7d`, `12h`)                  |

---

## 🛠️ Useful Commands

```bash
# Run ESLint checks
npm run lint

# Run database test connection
npm run db:test

# Run database migrations
npm run db:migrate
```

---

## 📖 Notes

- In **development**, you can use either a local PostgreSQL installation or a Docker container.
- In **production (Railway)**, always use the `DATABASE_URL` and `NEXT_PUBLIC_BASE_URL` provided by Railway.
- Schema changes should be handled with new `.sql` migration files inside `src/lib/database/migrations/`.
