# MishtiFlow - Sweet Shop Management System

A production-ready, full-stack sweet shop management system built with modern technologies and Test-Driven Development practices.

## Overview

MishtiFlow is a comprehensive sweet shop management application that allows customers to browse and purchase Indian sweets while providing administrators with powerful inventory management tools.

## Tech Stack

### Backend
- **Node.js** with TypeScript
- **Next.js 16** App Router with Server Actions
- **PostgreSQL** database with raw SQL queries
- **JWT** for authentication
- **bcrypt** for password hashing
- **Zod** for validation

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **shadcn/ui** components
- **Lucide React** icons

### Testing
- **Jest** for unit testing
- **Supertest** for API testing
- Comprehensive test coverage

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Role-based access control (USER, ADMIN)
- Secure password hashing with bcrypt
- HTTP-only cookie sessions

### Sweet Management
- Browse all available sweets
- Search by name
- Filter by category and price range
- View detailed sweet information
- Real-time stock availability

### Purchase Flow
- Add sweets to cart
- Atomic stock updates
- Prevent out-of-stock purchases
- Purchase confirmation

### Admin Panel (ADMIN only)
- Add new sweets
- Edit sweet details
- Delete sweets
- Restock inventory
- View inventory table

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database

### Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
DATABASE_URL=postgresql://username:password@localhost:5432/mishtiflow
JWT_SECRET=your-secret-key-change-in-production
\`\`\`

### Installation

1. **Install dependencies:**
\`\`\`bash
npm install
\`\`\`

2. **Set up the database:**

Run the database creation script:
\`\`\`bash
npm run dev
# Then in your browser console or separate terminal, execute:
node scripts/create-database.ts
\`\`\`

3. **Seed the database:**
\`\`\`bash
node scripts/seed-database.ts
\`\`\`

This will create:
- Admin user: `admin@mishtiflow.com` / `admin123`
- Regular user: `user@mishtiflow.com` / `user123`
- Sample sweets inventory

4. **Run the development server:**
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

Run the full test suite:
\`\`\`bash
npm test
\`\`\`

Run tests in watch mode:
\`\`\`bash
npm run test:watch
\`\`\`

View coverage report:
\`\`\`bash
npm run test
# Coverage report will be in /coverage directory
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   └── sweets/       # Sweet management endpoints
│   ├── admin/            # Admin panel page
│   ├── dashboard/        # Main dashboard
│   ├── login/            # Login page
│   └── register/         # Registration page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation bar
│   ├── sweet-card.tsx    # Sweet display card
│   ├── search-filter-bar.tsx
│   └── [admin components]
├── lib/
│   ├── auth.ts           # JWT utilities
│   ├── db.ts             # Database utilities
│   └── validators.ts     # Zod schemas
├── __tests__/            # Test files
├── scripts/              # Database scripts
└── prisma/               # Prisma schema
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Sweets
- `GET /api/sweets` - List all sweets (with filters)
- `POST /api/sweets` - Create sweet (ADMIN)
- `GET /api/sweets/:id` - Get single sweet
- `PUT /api/sweets/:id` - Update sweet (ADMIN)
- `DELETE /api/sweets/:id` - Delete sweet (ADMIN)
- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (ADMIN)

## My AI Usage

This project was built with assistance from v0 by Vercel, an AI-powered development assistant. Here's how AI contributed to the development process:

### What AI Helped With

1. **Boilerplate Code Generation**: AI helped generate initial project structure, component scaffolding, and configuration files, significantly reducing setup time.

2. **UI Design**: AI generated design inspiration and helped implement a cohesive color palette inspired by Indian sweets (saffron, rose, pistachio, cardamom) with proper Tailwind CSS theming.

3. **Test Writing**: AI assisted in writing comprehensive test cases following TDD principles, covering authentication, validation, CRUD operations, and edge cases.

4. **API Route Implementation**: AI helped structure API routes with proper error handling, validation, and response formatting.

5. **Type Safety**: AI helped ensure TypeScript types were properly defined throughout the application.

### Human Oversight and Refinement

While AI provided a strong foundation, human engineering judgment was crucial for:

- **Architecture Decisions**: Choosing between Prisma ORM vs raw SQL queries (opted for raw SQL for better control)
- **Security Implementation**: Ensuring proper JWT handling, HTTP-only cookies, and bcrypt configuration
- **Business Logic**: Atomic stock updates, purchase validation, and authorization rules
- **Database Design**: Schema structure, relationships, and query optimization
- **Error Handling**: Context-specific error messages and proper HTTP status codes
- **Testing Strategy**: Deciding what to test and ensuring meaningful coverage

### Productivity Impact

AI significantly improved productivity by:
- Reducing time spent on repetitive code patterns
- Providing instant syntax and API reference
- Generating test cases that might have been overlooked
- Suggesting accessibility improvements and best practices

However, AI did not replace the need for:
- Understanding business requirements
- Making architectural trade-offs
- Debugging complex issues
- Code review and refactoring
- Security auditing

The combination of AI assistance and human expertise resulted in a production-ready application built faster without compromising quality or security.

## Deployment

### Backend Deployment (Railway/Render)

1. Create a PostgreSQL database on your hosting platform
2. Set environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
3. Deploy the Next.js application
4. Run database scripts after deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Best Practices Followed

- **Test-Driven Development**: Comprehensive test coverage for critical paths
- **SOLID Principles**: Separation of concerns, single responsibility
- **Security First**: Password hashing, JWT tokens, authorization checks
- **Type Safety**: Full TypeScript coverage
- **Clean Code**: Meaningful names, proper comments, modular structure
- **Atomic Operations**: Database transactions for inventory updates
- **Error Handling**: Centralized error handling with clear messages
- **Validation**: Input validation at API and UI levels
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## License

MIT

## Contact

For questions or support, please open an issue on GitHub.
