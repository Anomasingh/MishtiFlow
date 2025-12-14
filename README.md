# MishtiFlow 

A modern sweet shop management system for browsing, purchasing, and managing Indian sweets inventory.

## 🚀 Features

**For Customers:**
- Browse sweets with search & filters (name, category, price)
- Real-time stock availability
- Purchase sweets with instant quantity updates

**For Admins:**
- Add, edit, and delete sweets
- Restock inventory
- Manage complete product catalog

**Security:**
- JWT authentication with HTTP-only cookies
- Role-based access (USER/ADMIN)
- Bcrypt password hashing

## 🛠️ Tech Stack

**Backend:** Next.js 16 API Routes, MongoDB, TypeScript  
**Frontend:** React 19, Tailwind CSS v4, shadcn/ui  
**Testing:** Jest with comprehensive test coverage

## 📦 Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone and install:**
```bash
git clone https://github.com/Anomasingh/MishtiFlow.git
cd MishtiFlow
npm install
```

2. **Environment variables** (`.env.local`):
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

3. **Seed database:**
```bash
npx tsx scripts/seed-database.ts
```

Default credentials:
- Admin: `admin@mishtiflow.com` / `admin123`
- User: `user@mishtiflow.com` / `user123`

4. **Run development server:**
```bash
npm run dev
```

Visit **http://localhost:3000**

### Testing
```bash
npm test              # Run tests
npm run test:watch    # Watch mode
```

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
