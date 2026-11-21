# AssetLoop — Equipment Rental Platform (Frontend)

**AssetLoop** is a modern, full-stack equipment rental platform connecting verified equipment owners with businesses, creators, and individuals across Bangladesh.

- **Live Website:** [Add your Vercel URL here after deployment]
- **Backend API:** [Add your Backend Vercel URL here after deployment]

## Key Features
- **Modern Emerald & Charcoal UI:** Full Light & Dark mode support with responsive grid layouts and Framer Motion animations.
- **Authentication:** BetterAuth with Email/Password (strict validation), ImgBB profile photo upload, Google OAuth, and reload-safe session persistence.
- **Marketplace & Server-Side Filtering:** Browse approved equipment with real-time search, multi-criteria filtering, sorting, and pagination.
- **Private Equipment Details & Stripe Checkout:** Dynamic rental cost calculation based on dates and rental type (`Daily`, `Weekly`, `Monthly`), Favorites wishlist, and instant Stripe payment integration.
- **Role-Based Dashboards:** Dedicated workspaces and interactive Recharts analytics for **Customers**, **Equipment Owners**, and **Admins**.

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling & Animation:** Tailwind CSS, Framer Motion, Lucide React
- **Authentication:** BetterAuth + MongoDB Adapter
- **Charts & HTTP:** Recharts, Axios, Sonner

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install