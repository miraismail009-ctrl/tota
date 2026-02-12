/*
  # AURA Luxury Skincare - Products and Orders Schema

  ## Overview
  Creates the foundational database structure for the AURA luxury skincare e-commerce platform.

  ## New Tables
  
  ### Products Table
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name
  - `description` (text) - Detailed product description
  - `price` (numeric) - Product price in USD
  - `luxury_image_url` (text) - URL to product image
  - `category` (text) - Product category (e.g., "Night Care", "Serums")
  - `rating` (numeric) - Product rating (0-5)
  - `benefits` (jsonb) - Array of product benefits
  - `in_stock` (boolean) - Stock availability status
  - `featured` (boolean) - Whether product is featured
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### Orders Table
  - `id` (uuid, primary key) - Unique order identifier
  - `customer_name` (text) - Customer full name
  - `customer_email` (text) - Customer email address
  - `customer_phone` (text) - Customer phone number
  - `shipping_address` (jsonb) - Complete shipping address details
  - `order_items` (jsonb) - Array of ordered products with quantities
  - `total_amount` (numeric) - Total order amount
  - `status` (text) - Order status (pending, processing, completed, cancelled)
  - `payment_info` (jsonb) - Payment information (encrypted/tokenized)
  - `created_at` (timestamptz) - Order creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on both tables
  - Public read access for products (storefront needs to display them)
  - Authenticated write access for products (admin panel only)
  - Authenticated read/write access for orders (admin panel)
  - Public insert access for orders (customers can place orders)

  ## Important Notes
  - Products use JSONB for benefits array to allow flexible benefit lists
  - Orders use JSONB for shipping_address and order_items for flexibility
  - All timestamps use timestamptz for timezone awareness
  - Default values ensure data integrity
*/

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  luxury_image_url text NOT NULL,
  category text NOT NULL DEFAULT 'Uncategorized',
  rating numeric DEFAULT 5 CHECK (rating >= 0 AND rating <= 5),
  benefits jsonb DEFAULT '[]'::jsonb,
  in_stock boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  shipping_address jsonb NOT NULL,
  order_items jsonb NOT NULL,
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  payment_info jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Products Policies
-- Anyone can view products (public storefront)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

-- Only authenticated users can insert products (admin panel)
CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update products (admin panel)
CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete products (admin panel)
CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Orders Policies
-- Anyone can create orders (customers placing orders)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can view all orders (admin panel)
CREATE POLICY "Authenticated users can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update orders (admin panel)
CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete orders (admin panel)
CREATE POLICY "Authenticated users can delete orders"
  ON orders FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();