# Next Auth App

A modern authentication starter built with Next.js, Better Auth, Prisma, and PostgreSQL. The project includes sign-up, sign-in, email verification, password reset, Google OAuth, two-factor authentication, and protected dashboard/settings pages.

## Features

- Email and password authentication
- Email verification on signup
- Password reset flow
- Google social sign-in
- Two-factor authentication with OTP delivery via email
- Protected routes for authenticated users
- Prisma-based database models for users, sessions, accounts, and verification data

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Better Auth
- Prisma ORM
- PostgreSQL
- Resend for email delivery
- Tailwind CSS

## Project Structure

- app/ — App Router pages and route handlers
- components/ — Auth-related UI components
- lib/ — Auth configuration, database connection, and email helpers
- pages/ — Page-level React components used by the app routes
- prisma/ — Prisma schema and migrations
- ui/ — Shared UI primitives such as forms and navigation

## Prerequisites

Before running the project, make sure you have:

- Node.js 20+ installed
- PostgreSQL running and accessible
- A Resend API key for sending emails
- Google OAuth credentials if you want to enable Google sign-in

## Environment Variables

Create a .env file in the project root with the following variables:

```env
APP_NAME="My App"
APP_BASE_URL="http://localhost:3000"
BETTER_AUTH_SECRET="replace-with-a-long-random-secret"
DATABASE_URL="postgresql://user:password@localhost:5432/next_app"
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="no-reply@yourdomain.com"
EMAIL_TO="your-email@example.com"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Installation

Install dependencies:

```bash
npm install
```

Generate the Prisma client:

```bash
npm run db:generate
```

Push the schema to your PostgreSQL database:

```bash
npm run db:push
```

## Running the App

Start the development server:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Available Scripts

- npm run dev — start the development server
- npm run build — create a production build
- npm run start — run the production build
- npm run lint — run ESLint
- npm run db:generate — generate the Prisma client
- npm run db:push — push the Prisma schema to the database

## Authentication Flow

The app supports:

- /sign-in
- /sign-up
- /forgot-password
- /reset-password
- /two-factor
- /dashboard
- /settings
- /sign-out

Authenticated users are redirected to the dashboard, while protected pages use the auth helpers in the lib folder to enforce access.

## Notes

- Email sending is currently wired through Resend.
- Two-factor authentication uses email OTP delivery.
- Google OAuth is configured through Better Auth and requires valid Google credentials.
