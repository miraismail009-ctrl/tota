export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Order, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  luxury_image_url: string
  category: string
  rating: number
  benefits: string[]
  in_stock: boolean
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  shipping_address: ShippingAddress
  order_items: OrderItem[]
  total_amount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  payment_info: Record<string, any>
  created_at: string
  updated_at: string
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zip: string
}

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface CartItem extends Product {
  quantity: number
}
