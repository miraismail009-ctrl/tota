# AURA - Luxury Skincare E-Commerce Platform

A premium luxury skincare e-commerce platform with real-time product management, WhatsApp integration, and secure admin authentication.

## Features

### Core Integration & Database
- **Supabase Database**: Fully integrated Products and Orders tables
- **Real-time Updates**: Products sync automatically between admin panel and storefront
- **Secure Storage**: All data persisted in Supabase with Row Level Security (RLS)

### Professional Login System
- **Supabase Auth**: Secure email/password authentication for admin panel
- **Glassmorphism Design**: Beautiful frosted glass UI consistent with AURA brand
- **Protected Routes**: Admin panel accessible only to authenticated users

### WhatsApp Business Integration
- **Buy Now**: Pre-filled WhatsApp messages with product details (connects to +972595230839)
- **Inquiry**: Quick inquiry button for customer questions
- **Order Notifications**: Automatic WhatsApp notification when orders are placed

### Aesthetic & Animations
- **Luxury Design**: Black, gold, and creamy white color palette
- **Framer Motion**: Smooth animations throughout the app
- **Premium Glow**: Special glow effects on product images
- **Ken Burns Effect**: Animated background on hero section
- **Floating Particles**: Mystical gold particles animation

### Orders Logic
- **Checkout Flow**: Complete checkout form with shipping details
- **Database Integration**: Orders automatically saved to Supabase
- **WhatsApp Confirmation**: Order summary sent via WhatsApp
- **Admin Visibility**: All orders accessible in admin panel

### 100% Responsive
- Fully responsive design for mobile, tablet, and desktop
- Touch-optimized buttons and interactions
- Adaptive layouts for all screen sizes

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + Custom CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx              # Navigation with cart and admin links
│   ├── LuxuryHero.tsx          # Hero section with SVG product
│   ├── ProductCard.tsx         # Product display with WhatsApp buttons
│   ├── ProductModal.tsx        # Product details modal
│   └── CartSidebar.tsx         # Shopping cart sidebar
├── pages/
│   ├── HomePage.tsx            # Main storefront page
│   ├── CheckoutPage.tsx        # Checkout and order placement
│   └── AdminLoginPage.tsx      # Admin authentication
├── lib/
│   ├── supabase.ts            # Supabase client configuration
│   └── CartContext.tsx         # Global cart state management
├── hooks/
│   └── useProducts.ts          # Real-time products hook
├── types/
│   └── database.ts             # TypeScript type definitions
└── index.css                   # Global styles and utilities

## Database Schema

### Products Table
- `id` (uuid): Product identifier
- `name` (text): Product name
- `description` (text): Product description
- `price` (numeric): Product price
- `luxury_image_url` (text): Product image URL
- `category` (text): Product category
- `rating` (numeric): Product rating (0-5)
- `benefits` (jsonb): Array of product benefits
- `in_stock` (boolean): Availability status
- `featured` (boolean): Featured product flag
- `created_at` (timestamptz): Creation timestamp
- `updated_at` (timestamptz): Last update timestamp

### Orders Table
- `id` (uuid): Order identifier
- `customer_name` (text): Customer full name
- `customer_email` (text): Customer email
- `customer_phone` (text): Customer phone
- `shipping_address` (jsonb): Shipping address details
- `order_items` (jsonb): Array of ordered products
- `total_amount` (numeric): Total order amount
- `status` (text): Order status (pending/processing/completed/cancelled)
- `payment_info` (jsonb): Payment information
- `created_at` (timestamptz): Order creation timestamp
- `updated_at` (timestamptz): Last update timestamp

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Key Features Explained

### Real-Time Product Updates
The storefront uses Supabase Realtime to automatically update when products are added, edited, or removed from the admin panel. No page refresh needed!

### WhatsApp Integration
- **Buy Now**: Sends a formatted message with product details and customer information
- **Inquiry**: Quick way to ask questions about products
- **Order Confirmation**: Automatically sends order summary to business WhatsApp

### Shopping Cart
- Add/remove products
- Update quantities
- Real-time total calculation
- Persistent across page navigation
- Smooth slide-in animation

### Checkout Process
1. Customer fills out contact and shipping information
2. Reviews order summary
3. Completes order
4. Order saved to Supabase database
5. WhatsApp notification sent automatically
6. Confirmation message displayed

### Admin Panel
- Secure login with Supabase Auth
- Manage products in real-time
- View all orders
- Protected routes require authentication

## Design Philosophy

The AURA platform embodies luxury through:
- **Minimalist Elegance**: Clean layouts with purposeful white space
- **Premium Materials**: Glassmorphism effects and gold accents
- **Smooth Interactions**: Framer Motion animations for every action
- **Attention to Detail**: Subtle particle effects and glowing elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - AURA Luxury Skincare
