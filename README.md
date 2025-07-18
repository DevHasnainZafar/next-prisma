# 🧱 next-prisma
A simple and scalable RESTful API starter built with **Next.js 15**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**. Includes clean architecture, authentication, and basic CRUD operations — ideal for modern full-stack web development.
---
## 🚀 Features
- ✅ Next.js 15 App Router (Edge-ready)
- ✅ TypeScript support
- ✅ Prisma ORM with PostgreSQL
- ✅ JWT authentication using `jose`
- ✅ Input validation with Zod
- ✅ Secure password hashing with `bcryptjs`
- ✅ RESTful API structure
- ✅ Clean and modular architecture
- ✅ Prisma Studio, seed script, and migration utilities
- ✅ Tailwind CSS for styling
---
## 🛠️ Getting Started

git clone https://github.com/your-username/next-prisma.git
cd next-prisma
npm install

.env --> 
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/your_db"
JWT_SECRET="your-secret-key"

npm run db:push
npm run db:seed
npm run dev

