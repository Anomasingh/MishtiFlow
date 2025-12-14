# MishtiFlow 🍬

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

## 📁 Project Structure

```
app/
├── api/auth/         # Login, register, logout
├── api/sweets/       # CRUD + purchase/restock
├── admin/            # Admin dashboard
├── dashboard/        # Customer view
└── [login/register]  # Auth pages

components/           # UI components & dialogs
lib/                  # Auth, DB, validators
__tests__/           # Jest test suites
scripts/             # Database setup & seeding
```

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user

### Sweets
- `GET /api/sweets` - List (filters: name, category, price)
- `POST /api/sweets` - Create (admin)
- `GET /api/sweets/:id` - Single sweet
- `PUT /api/sweets/:id` - Update (admin)
- `DELETE /api/sweets/:id` - Delete (admin)
- `POST /api/sweets/:id/purchase` - Buy
- `POST /api/sweets/:id/restock` - Restock (admin)

## 🤖 AI Usage

Built with **GitHub Copilot** and **ChatGPT** assistance for:
- Initial project structure & boilerplate
- UI components and Tailwind styling
- Test case generation
- API route templates

**Human decisions:**
- Database choice (MongoDB over PostgreSQL)
- Security implementation (JWT, bcrypt)
- Business logic (atomic stock updates)
- Architecture & error handling
- Code review & refactoring

AI accelerated development but didn't replace engineering judgment for critical decisions around security, architecture, and business requirements.

## 🚢 Deployment

**Vercel** (Recommended):
1. Connect GitHub repo
2. Add environment variables
3. Deploy

**Alternative:** Railway, Render, or any Node.js host

## ✨ Best Practices

- Test-Driven Development (TDD)
- Type safety with TypeScript
- Atomic database operations
- Input validation (Zod)
- Secure authentication
- Clean code principles

## 📄 License

MIT

---

**Questions?** Open an issue on [GitHub](https://github.com/Anomasingh/MishtiFlow/issues)
