# AssetLoop — Equipment Rental Marketplace (Frontend)

**AssetLoop** is a modern, full-stack equipment rental platform built for Bangladesh's construction, photography, agriculture, event, and transportation sectors. Verified equipment owners can list their assets, while businesses, creators, and individuals can rent them seamlessly with instant Stripe checkout.

- **Live Website:** [https://asset-loop-client.vercel.app](https://asset-loop-client.vercel.app)
- **Backend API:** [https://asset-loop-server.vercel.app/api](https://asset-loop-server.vercel.app/api)

---

## Demo Accounts (For Testing & Evaluation)

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@assetloop.com` | `Admin@1234` |
| **Equipment Owner** | `owner@assetloop.com` | `Owner@1234` |
| **Customer** | `customer@assetloop.com` | `Customer@1234` |

*(Note: Ensure these demo accounts are registered on the live site with their respective roles set in MongoDB.)*

---

## Key Features

- **Modern Emerald & Charcoal UI:** Full Light and Dark mode support with responsive layouts, smooth transitions, and custom error/404 boundaries.
- **Authentication & RBAC:** BetterAuth (Email/Password + Google OAuth) with ImgBB profile avatar upload, live Navbar profile pill (Avatar, Name, Role badge), and strict role-based route protection (`Customer`, `Owner`, `Admin`).
- **Marketplace & Server-Side Filtering:** Browse Admin-approved equipment with real-time keyword search, category & rental-type filters, price range filtering, sorting, and pagination.
- **Equipment Details & Stripe Checkout:** Dynamic rental cost calculation based on dates (`Daily`, `Weekly`, `Monthly`), Favorites wishlist toggle, real-time stock validation, and Stripe Checkout payment integration with receipt verification.
- **Role-Based Dashboards & Analytics:**
  - **Customer:** My Rentals, Payment History, Favorites, Profile Management.
  - **Owner:** Add Equipment, My Equipment (Edit/Delete), Rental Requests (Approve/Reject), Monthly Earnings & Booking Analytics.
  - **Admin:** User & Role Management, Equipment Moderation (Approve/Reject/Delete), All Platform Rentals, Platform Revenue & Growth Analytics.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling & Icons:** Tailwind CSS, Lucide React
- **Authentication:** BetterAuth + MongoDB Adapter + JWT
- **Data Visualization & HTTP:** Recharts, Axios, Sonner

---

## Local Setup Instructions

1. Clone the repository and install dependencies:
   ```bash
   npm install
2. Start the development server:
    npm run dev