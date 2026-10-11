<div align="center">

# Dota 2 Journey of Renaire Odarve

A web development coursework project: a personal blog documenting a Dota 2
climbing journey — lessons, strategy, and memorable moments — with an admin
dashboard for managing its content.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%208-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue.svg)

</div>

<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
  - [Built With](#built-with)
- [Architecture](#architecture)
  - [Request Flow](#request-flow)
  - [Client Structure](#client-structure)
  - [Server Structure](#server-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
  - [API Reference](#api-reference)
  - [Customizing Content](#customizing-content)
- [Roadmap](#roadmap)
- [Security](#security)
- [Deployment](#deployment)
- [License](#license)
- [Acknowledgements](#acknowledgements)

</details>

## About

This is a full-stack web coursework project. It starts from the
[`taglay`](https://github.com/cyrusrobles18/taglay) starter repository by
[Cyrus Robles](https://github.com/cyrusrobles18). The starter is an event site
for the "From Mind to Machine" alumni mentorship series. It provides a React +
Vite client and an Express + MongoDB API with JWT login.

This version adapts the starter into a personal blog about a Dota 2 climbing
journey. The public site presents a home page, an about page, and a collection
of articles; a protected admin dashboard lets authorized users manage articles
and (for admins) user accounts.

- **`client/`** — React single-page app: home, about, article list, article
  detail, and a 404 page, plus an authenticated admin dashboard.
- **`server/`** — Express REST API for users and articles, with JWT-based login,
  bcrypt password hashing, and role-aware route protection.

### Built With

- **Frontend:** [React 19](https://react.dev/), [Vite 7](https://vite.dev/),
  [Material UI 7](https://mui.com/), [React Router 7](https://reactrouter.com/),
  [Axios](https://axios-http.com/)
- **Backend:** [Express 5](https://expressjs.com/),
  [Mongoose 8](https://mongoosejs.com/),
  [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken),
  [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Database:** [MongoDB](https://www.mongodb.com/) (local or Atlas)

## Architecture

The diagrams below summarize [`project.drawio`](project.drawio). Open that file
in [draw.io](https://app.diagrams.net/) or the VS Code Draw.io extension for the
full version.

### Request Flow

```text
 Browser ──► client (React SPA)          taglay-odarve.vercel.app
               │  req: Axios + JWT       ▲  res: JSON
               ▼                         │
             API (Express)                (not deployed yet)
               │  /api/articles, /api/users
               │  req                    ▲  res
               ▼                         │
             DATABASE (MongoDB via Mongoose)
```

The client builds every API URL from `VITE_LOCAL_HOST` plus `/api`
(`client/src/constants.js`).

### Client Structure

Each layout is a route group in `client/src/App.jsx`:

```text
App.jsx
├── Layout              /                (Navbar + Footer)
│   ├── HomePage        /
│   ├── AboutPage       /about
│   ├── ArticleListPage /articles        → ArticleList component
│   └── ArticlePage     /articles/:name
├── AuthLayout          /auth
│   └── SignInPage      /auth/signin     → UserService.loginUser
└── DashLayout          /dashboard       (reached after sign-in)
    ├── UserListPage        /dashboard/users          → UserService (CRUD)
    └── DashArticleListPage /dashboard/dash-articles  → ArticleService (CRUD)
```

- Both dashboard pages render their table with MUI `DataGrid` inside the page
  file. No separate table component exists.
- `client/src/services/` holds the two API modules: `ArticleService.js` and
  `UserService.js`.
- Other client files:
  - `components/`: `Navbar`, `Footer`, `Button`.
  - `pages/NotFoundPage.jsx`: the 404 page.
  - `utils/readTime.js`: the reading-time helper.
  - `article-content.js`: the seed articles.

### Server Structure

A request passes through these layers, from left to right:

```text
index.js ──► routes/ ──► middleware/auth.js ──► controllers/ ──► models/ ──► MongoDB
  │          articleRoutes.js   protect,         articleController.js  Article.js
  │          userRoutes.js      requireAdmin     userController.js     User.js
  └── config/db.js (opens the Mongoose connection)
```

- `middleware/auth.js` exports `protect` (valid JWT required) and `requireAdmin`
  (admin role required).
- `vercel.json` sends every request to `index.js` when the server runs on
  Vercel.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```sh
# 1. Clone the repository
git clone https://github.com/rbodarve/taglay-odarve.git
cd taglay-odarve

# 2. Install and start the backend (API)
cd server
npm install
npm run dev      # or `npm start` for plain node

# 3. In a second terminal, install and start the frontend
cd client
npm install
npm run dev      # open the printed local URL
```

### Environment Variables

Create a `.env` file in each package (both are git-ignored).

**`server/.env`**

| Variable     | Required | Description                                        |
| ------------ | -------- | -------------------------------------------------- |
| `MONGO_URI`  | Yes      | MongoDB connection string.                         |
| `JWT_SECRET` | Yes      | Secret used to sign JWTs. Must be a strong value.  |
| `PORT`       | No       | API port (defaults to `8000`).                     |

> The server fails fast on startup if `JWT_SECRET` is missing or left at the
> placeholder value. Generate one with:
> `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

**`client/.env`**

| Variable          | Required | Description                                          |
| ----------------- | -------- | ---------------------------------------------------- |
| `VITE_LOCAL_HOST` | Yes      | Base URL of the API, e.g. `http://localhost:8000`.   |

> The port in `VITE_LOCAL_HOST` must match the server's `PORT`. Without `PORT`,
> the server uses `8000`. Do not add `/api`; the client appends it.

## Usage

- **Backend:** `npm run dev` (nodemon) or `npm start` (node) from `server/`.
- **Frontend:** `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`
  from `client/`.

Sign in at `/auth/signin` to reach the dashboard. Article management is available
to any authenticated user; user management is restricted to admins.

### API Reference

Routes marked 🔒 require an `Authorization: Bearer <token>` header; 👑 additionally
requires an admin account.

| Method | Route                        | Access | Description                     |
| ------ | ---------------------------- | ------ | ------------------------------- |
| POST   | `/api/users/login`           | Public | Log in, returns a JWT.          |
| GET    | `/api/users`                 | 👑      | List users (passwords omitted). |
| POST   | `/api/users`                 | 👑      | Create a user.                  |
| PUT    | `/api/users/:id`             | 👑      | Update a user.                  |
| DELETE | `/api/users/:id`             | 👑      | Delete a user.                  |
| GET    | `/api/articles`              | Public | List all articles.              |
| GET    | `/api/articles/:name`        | Public | Get one active article by slug. |
| POST   | `/api/articles`              | 🔒      | Create an article.              |
| PUT    | `/api/articles/:id`          | 🔒      | Update an article.              |
| PATCH  | `/api/articles/:id/toggle`   | 🔒      | Toggle an article's active flag.|
| DELETE | `/api/articles/:id`          | 🔒      | Delete an article.              |

### Customizing Content

- **Hero / about copy:** `client/src/pages/LandingPages/HomePage.jsx` and
  `client/src/pages/LandingPages/AboutPage.jsx`.
- **Seed articles:** `client/src/article-content.js` (titles, slugs, body copy).
- **Styling tokens:** `client/src/index.css` for colors/typography; component
  styles live in `client/src/styles/`.
- **Images / media:** drop assets in `client/src/assets/` and import them.

## Roadmap

- [ ] Point `MONGO_URI` at a persistent database (the bundled Atlas cluster is
      temporary).
- [ ] Surface API errors in the dashboard UI (beyond console logging).
- [ ] Add automated tests for the API and React components.
- [ ] Remove the client dependencies that no file uses: `@mui/x-charts`,
      `@mui/x-data-grid-generator`, `@toolpad/core`, `dotenv` and
      `react-fontawesome`. Vite reads `import.meta.env` without `dotenv`.
- [ ] Move the shared Axios client and JWT interceptor into one module
      (`client/src/services/api.js`), so the two services do not repeat it.
- [ ] Replace the CORS options object with `cors()`, because its defaults already
      allow any origin and return 204 on preflight.
- [ ] Remove `body-parser` from `server/index.js`. `express.json()` and
      `express.urlencoded()` do the same job.
- [ ] Fix the vulnerabilities that `npm audit` reports in `client/`.

See the [open issues](https://github.com/rbodarve/taglay-odarve/issues) for a full
list of proposed features and known issues.

## Security

- Passwords are hashed with bcrypt and never returned by the API.
- Authentication uses short-lived (1h) JWTs; the client attaches the token to
  requests via an Axios interceptor.
- User-management endpoints require an admin role; article-write endpoints require
  authentication.
- `JWT_SECRET` must be set to a strong value — the server refuses to start
  otherwise.

## Deployment

- **Frontend:** build from `client/` and deploy the `dist/` output (Vercel,
  Netlify, or any static host).
- **Backend:** deploy `server/` with `MONGO_URI` and `JWT_SECRET` configured as
  environment variables on the host (these are **not** read from a committed
  `.env`). Point the frontend's `VITE_LOCAL_HOST` at the deployed API URL.

## License

Distributed under the ISC License (as declared in `server/package.json`). No
standalone `LICENSE` file is currently included in the repository.

## Acknowledgements

- The client/server base comes from the
  [`taglay`](https://github.com/cyrusrobles18/taglay) coursework starter by
  [Cyrus Robles](https://github.com/cyrusrobles18).
- This README's structure is based on the
  [Amazing GitHub Template](https://github.com/dec0dOS/amazing-github-template)
  by [dec0dOS](https://github.com/dec0dOS) (MIT License).
- Template discovered via the
  [awesome-readme](https://github.com/matiassingers/awesome-readme) list curated
  by [Matias Singers](https://github.com/matiassingers).
