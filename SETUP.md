# SideKick Setup Guide

## Prerequisites
- Node.js 18+ installed
- Docker and Docker Compose installed (for database)

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the PostgreSQL Database
```bash
docker-compose up -d
```

This will start a PostgreSQL database on port 5432.

### 3. Set Up Environment Variables
The `.env.local` file has been created with the following variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your application URL
- `NEXTAUTH_SECRET` - Secret for NextAuth JWT signing
- `AUTH_SECRET` - Additional secret for NextAuth v5

**IMPORTANT**: These secrets have been auto-generated. In production, use your own secure secrets!

### 4. Run Database Migrations
```bash
npx prisma migrate dev
```

This will:
- Create the database schema
- Generate the Prisma client

### 5. Start the Development Server
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Features
- ✅ User authentication (register/login)
- ✅ Protected routes with proxy
- ✅ Dashboard
- ✅ Notes management
- ✅ Chat functionality
- ✅ Study tools

## Troubleshooting

### Database Connection Issues
If you get database connection errors:
1. Check if PostgreSQL is running: `docker-compose ps`
2. Verify the `DATABASE_URL` in `.env.local`
3. Restart the database: `docker-compose restart`

### Migration Issues
If migrations fail:
```bash
# Reset the database
npx prisma migrate reset

# Or push the schema directly
npx prisma db push
```

### NextAuth Errors
If you get NextAuth errors:
1. Ensure `NEXTAUTH_SECRET` and `AUTH_SECRET` are set in `.env.local`
2. Restart the dev server after changing environment variables

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Editor**: Tiptap
- **Validation**: Zod

## Migration from Middleware to Proxy
The project has been migrated from the deprecated `middleware.ts` to the new `proxy.ts` format as required by Next.js 16+.

## Database Schema
The application uses the following main models:
- **User**: Authentication and user management
- **Note**: User notes with content and metadata
- **Chat**: Chat messages and history

## API Routes
- `POST /api/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth endpoints
- `GET/POST /api/notes` - Notes CRUD operations
- `POST /api/chat` - Chat functionality
- `POST /api/study/generate` - Study material generation

## Next Steps
1. Test the registration flow at `/register`
2. Create an account
3. Log in at `/login`
4. Explore the dashboard at `/dashboard`
5. Create notes at `/dashboard/notes/new`
6. Try the chat at `/chat`

## Development
- Run tests: `npm test` (if configured)
- Lint code: `npm run lint`
- Format code: `npm run format` (if configured)
- Check types: `npx tsc --noEmit`

## Production Deployment
1. Set environment variables in your hosting platform
2. Build the application: `npm run build`
3. Start production server: `npm start`
4. Or deploy to Vercel/Netlify directly from the repository

---

**Note**: All secrets in `.env.local` are auto-generated for development. Generate new secrets for production using:
```bash
openssl rand -base64 32
```
