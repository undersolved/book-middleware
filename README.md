# Book Middleware

An Express + Drizzle ORM backend for managing books and authors on PostgreSQL. The app exposes simple JSON endpoints for creating, listing, searching, and deleting books, plus author management and author-to-books lookups.

## Tech Stack

- Node.js
- Express 5
- Drizzle ORM and Drizzle Kit
- PostgreSQL

## Project Structure

- `index.js` starts the server and mounts the routers.
- `controllers/` contains request handlers for book operations.
- `routes/` defines the HTTP endpoints for books and authors.
- `models/` defines the Drizzle table schemas.
- `db/` creates the Drizzle database client.
- `middlewares/logger.js` appends each request to `logs.txt`.
- `docker-compose.yml` starts a local PostgreSQL instance.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start PostgreSQL

```bash
docker compose up -d postgres
```

### 3. Configure environment variables

Set the database connection string in your environment before starting the app.

Use the same value in your local shell or editor settings.

### 4. Create or sync the tables

The schema is defined in `models/` and wired into `drizzle.config.js`. If you need to push the schema to the database, run:

```bash
npx drizzle-kit push
```

### 5. Start the app

```bash
npm start
```

The server listens on port `8000`.

## API

### Books

| Method | Route                | Description                       |
| ------ | -------------------- | --------------------------------- |
| GET    | `/books`             | List all books                    |
| GET    | `/books?search=term` | Full-text search books by title   |
| GET    | `/books/:id`         | Get a single book with its author |
| POST   | `/books`             | Create a book                     |
| DELETE | `/books/:id`         | Delete a book                     |

Create book body:

```json
{
	"title": "Clean Code",
	"authorId": "<author-uuid>",
	"description": "A practical guide to writing clean software"
}
```

### Authors

| Method | Route                | Description              |
| ------ | -------------------- | ------------------------ |
| GET    | `/authors`           | List all authors         |
| GET    | `/authors/:id`       | Get one author           |
| GET    | `/authors/:id/books` | List books for an author |
| POST   | `/authors`           | Create an author         |

Create author body:

```json
{
	"firstName": "Robert",
	"lastName": "Martin",
	"email": "unclebob@example.com"
}
```

## Logging

Every request is written to `logs.txt` with a timestamp, method, and path.

## Notes

- Book search uses PostgreSQL full-text search.
- Books reference authors through a foreign key.
- The app is CommonJS-based and runs with `node --watch` in development.
