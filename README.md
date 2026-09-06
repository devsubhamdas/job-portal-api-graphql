# JobPortal API

Backend API for a job portal platform built with **TypeScript, Apollo Server, Express.js, GraphQL, Prisma, and PostgreSQL**.

The API provides authentication, job posting and application management, application tracking, and real-time notifications through WebSockets.

### Prerequisites

- Node.js
- Apollo Server
- Express.js
- WS
- NeonDB

## Features

- 🔐 User authentication with JWT
- 💼 Create and manage job postings
- 📄 Apply for jobs
- 📊 Track posted and applied jobs
- 👤 Manage jobs owned by the authenticated user
- 🔔 Real-time notifications using WebSockets
- 🚀 GraphQL API with Apollo Server
- 🗄️ PostgreSQL database with Prisma ORM
- 🛡️ Request validation using Zod

## Tech Stack

- TypeScript
- Node.js
- Express.js
- Apollo Server
- GraphQL
- Prisma
- PostgreSQL
- JWT
- WebSocket
- Zod

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd jobportal-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=8080
HOSTNAME=localhost

DATABASE_URL=<your-neon-db-url>

# Client-side rendering
ORIGIN_1=http://localhost:4200

# Server-side rendering
ORIGIN_2=http://localhost:4000

JWT_SECRET=your-secret-key
```

### 4. Generate Prisma Client

```bash
npm run generate
```

### 5. Run database migrations

```bash
npm run migrate
```

### 6. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:8080
```

## Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Code Generation

If you modify the GraphQL schema, regenerate the generated types and Prisma client:

```bash
npm run codegen
```

## Associated Repository

**Job Portal Frontend**: [job-portal-ui]("https://github.com/devsubhamdas/job-portal-ui")

## Project Purpose

JobPortal API is designed to support a complete job recruitment workflow where users can authenticate, post and manage jobs, apply for available positions, track their own job postings and applications, and receive real-time notifications about relevant activity.
