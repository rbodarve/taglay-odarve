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
- [ ] Fix the vulnerabilities that `npm audit` reports in `client/` and `server/`
      (see [npm audit](#npm-audit-2026-10-14)).

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

## Review notes (2026-10-14)

A code review and an API simulation found the issues below. No code was changed.

### Known issues

**High**

- E1 — NoSQL operator injection in login: `email` goes into `findOne` without a
  type check. The `urlencoded` parser is a second path.
  (`server/controllers/userController.js:68-71`, `server/index.js:29`)

**Medium**

- E2 — Login without a string `password`, or with an empty body, returns 500
  instead of 400. (`server/controllers/userController.js:68`, `:82`)
- E3 — Login reveals which emails exist: 404 unknown email, 403 inactive (before
  the password check), 401 wrong password.
  (`server/controllers/userController.js:72-85`)
- E4 — Updates run without validators and accept the raw body, so enum and
  `required` rules are not enforced.
  (`server/controllers/userController.js:44`, `server/controllers/articleController.js:29`)
- E5 — The JWT is trusted for 1 h without a database check. A deactivated,
  demoted or deleted user keeps access until expiry. (`server/middleware/auth.js:13`)
- E6 — Catch blocks send raw Mongoose/MongoDB error text to the client.
  (e.g. `server/controllers/userController.js:53`, `server/controllers/articleController.js:23`)
- E7 — The error handler ignores `err.status`: malformed JSON returns 500
  instead of 400. (`server/index.js:46-49`)
- C1 — The add-user form shows Type "Viewer" but sends no `type`; the server
  stores `editor`. (`client/src/pages/DashboardPages/UserListPage.jsx:279`)
- C2 — The dashboard guard checks only that a token exists. After expiry, the
  dashboard renders with empty grids and no redirect.
  (`client/src/components/DashLayout.jsx:158-159`) (from reading the code)
- C3 — Save errors go only to `console.error`; the modal stays open with no
  message. (`client/src/pages/DashboardPages/UserListPage.jsx:96-114`,
  `client/src/pages/DashboardPages/DashArticleListPage.jsx:90-102`) (from reading the code)
- C4 — Home-page featured articles and the count come from static
  `article-content.js`, not the API. (`client/src/pages/LandingPages/HomePage.jsx:3`, `:30`, `:98-105`)

**Low**

- E8 — `deleteUser` returns 200 when no user matched, and an admin can delete
  itself or the last admin. (`server/controllers/userController.js:57-64`)
- E9 — Any non-empty password is accepted; login has no rate limit.
  (`server/controllers/userController.js:17`, `:38`)
- E10 — `content: [""]` passes `required`, so an article can have no text.
  (`server/models/Article.js:6`)
- E11 — `User.create({ ...req.body })` accepts any field (admin-only route).
  (`server/controllers/userController.js:25`)
- E13 — JSON is parsed twice, and `urlencoded` with `extended: true` enables E1
  through form bodies. (`server/index.js:25-29`)
- C5 — Edit sends the whole row (`_id`, `__v`, stale `isActive`) back; with E4
  this overwrites a newer toggle.
  (`client/src/pages/DashboardPages/DashArticleListPage.jsx:80-83`) (from reading the code)
- C6 — The article `name` is not URL-encoded. (`client/src/services/ArticleService.js:18`)
- C7 — An unset `VITE_LOCAL_HOST` gives the base URL `"undefined/api"`.
  (`client/src/constants.js:1`)
- C8 — `fetchUsers(user)` passes its argument as the axios config; no caller
  passes one today. (`client/src/services/UserService.js:19`)
- C9 — The Login button shows when signed in; there is no link back to the
  dashboard. (`client/src/components/Navbar.jsx:29`)
- C10 — No fetch cancellation on fast navigation; `/dashboard/users/` (trailing
  slash) skips the client admin redirect (the server still returns 403); an admin
  can deactivate itself. (`client/src/pages/LandingPages/ArticlePage.jsx:13-38`,
  `client/src/components/DashLayout.jsx:164`,
  `client/src/pages/DashboardPages/UserListPage.jsx:116-123`) (from reading the code)
- C11 — The JWT is stored in `localStorage`, so any XSS can read it. No
  `dangerouslySetInnerHTML` is used. (`client/src/pages/SignInPage.jsx:19-21`) (from reading the code)

**Info**

- E14 — Public `GET /api/articles` also returns inactive articles with full
  content. This matches "List all articles" above, but the toggle hides nothing
  from the API. (`server/controllers/articleController.js:5`)

### Setup note

If `MONGO_URI` names no database, Mongoose uses the database `test`. Documents
created outside this app may lack `isActive` and `type`. Mongoose fills missing
fields with schema defaults when it loads a document, so such users log in as
active editors. Unless a document has `type: "admin"`, no user is an admin, so
`/api/users` and the user dashboard are unreachable. Defaults do not apply to query filters, so
`GET /api/articles/:name` returns 404 for every such article
(`server/controllers/articleController.js:55`). Fix: name a database in the URI,
or backfill `isActive: true` on all documents and set `type: "admin"` on one user.

### Design note

Any logged-in user, including a `viewer`, may create, edit and delete articles.
The `viewer` role has no effect on the server.

### Suggested fixes (not applied)

- E1, E13: return 400 when `email` or `password` is not a string
  (`server/controllers/userController.js:68`); remove `bodyParser.urlencoded`
  (`server/index.js:29`).
- E2, E3: the same type check; return one 401 "Invalid credentials" for an
  unknown email, a wrong password and (after the password check) an inactive user.
- E4: use `{ new: true, runValidators: true }` and a field whitelist
  (`server/controllers/userController.js:44`, `server/controllers/articleController.js:29`).
- E5: in `protect`, load the user, reject it if missing or inactive, and take
  `type` from the database.
- E6, E7: send `{ message: 'Invalid request' }` with 400 from catch blocks and
  log the detail; use `res.status(err.status || 500)` in the error handler.
- E8: return 404 when no user matched (`server/controllers/userController.js:59`);
  refuse when `req.params.id === req.user.id`.
- E9: add a minimum password length. E10: validate `content` with
  `v => v.some(s => s.trim())`.

### Simplification ideas

Items already listed in the [Roadmap](#roadmap) are not repeated here.

- Render the nine repeated user-form field blocks from one array
  (`client/src/pages/DashboardPages/UserListPage.jsx:198-311`).
- Remove the dashboard search box: it has no state and filters nothing
  (`client/src/components/DashLayout.jsx:14-15`, `:95-132`, `:195-204`).
- Replace `isEditing` plus the edit-id state with `const isEditing = editId !== null`
  (`client/src/pages/DashboardPages/UserListPage.jsx:30-31`,
  `client/src/pages/DashboardPages/DashArticleListPage.jsx:36-37`).
- Remove the unused imports `Paper`, `InputAdornment` and `Input`
  (`client/src/pages/DashboardPages/UserListPage.jsx:6-7`).
- Remove `client/src/assets/react.svg` (4126 bytes, not referenced).
- Remove the empty fragments in `client/src/components/AuthLayout.jsx:5-9` and
  `client/src/App.jsx:82-84`.
- Drop the empty options object in `mongoose.connect` (`server/config/db.js:6-7`).
- Drop the `mongoose.models.User ||` guard; nodemon restarts the whole process
  (`server/models/User.js:17`).

### Tested

The real server ran on a local throwaway MongoDB database with fixture users and
articles.

- 33 targeted API requests: 14 pass, 19 fail.
- 2 × 300 random API requests (seeds 42 and 7): 28 and 35 failures. All are
  raw database error text (E6) or 500 on a bad login body (E2). No response
  leaked a password hash, no protected route accepted a missing or bad token, no
  editor reached `/api/users`, and no junk login returned a token.

### npm audit (2026-10-14)

`npm audit` (npm 11.16.0) against the committed lockfiles. Nothing was fixed:
this is coursework, so only this README changes.

| Folder | Total | Critical | High | Moderate | Low |
|---|---|---|---|---|---|
| `client/` | 30 | 0 | 18 | 11 | 1 |
| `server/` | 8 | 1 | 5 | 1 | 1 |

- `server/`: the critical one is `proxy-addr` (via Express). `mongoose`,
  `path-to-regexp`, `body-parser` and `qs` also have a plain `npm audit fix`.
- `server/`: `braces` (high, via `nodemon`) only has `npm audit fix --force`.
  That installs `nodemon@1.14.10`, a breaking downgrade. Do not use `--force`.
- `client/`: 23 of 24 packages (for example `axios`, `form-data`, `lodash`)
  have a plain `npm audit fix`. Only `yaml` needs `--force`, which installs
  `@toolpad/core@0.1.55`, a breaking change.

### Not tested

- The client UI in a browser.
- Vercel deployment (E12: `server/index.js` exports no handler; whether Vercel needs one is unverified).
- JWT expiry after 1 h.
- Concurrency.
- Whether `npm audit fix` (without `--force`) keeps the app working.

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
