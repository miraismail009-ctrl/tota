import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../lib/CartContext'
import { supabase } from '../lib/supabase'
import type { ShippingAddress } from '../types/database'

const WHATSAPP_NUMBER = '+972595230839'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, getCartTotal, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const shippingAddress: ShippingAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
      }

      const orderItems = cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.luxury_image_url,
      }))

      const { error } = await supabase.from('orders').insert({
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: shippingAddress,
        order_items: orderItems,
        total_amount: getCartTotal(),
        status: 'pending',
        payment_info: {},
      })

      if (error) throw error

      const orderSummary = orderItems
        .map(
          (item) =>
            `- ${item.name} (Qty: ${item.quantity}) - $${(
              item.price * item.quantity
            ).toFixed(2)}`
        )
        .join('\n')

      const whatsappMessage = encodeURIComponent(
        `Hello AURA, I have placed a new order!\n\nCustomer Details:\n- Name: ${formData.firstName} ${formData.lastName}\n- Email: ${formData.email}\n- Phone: ${formData.phone}\n\nShipping Address:\n${formData.address}\n${formData.city}, ${formData.state} ${formData.zip}\n\nOrder Items:\n${orderSummary}\n\nTotal Amount: $${getCartTotal().toFixed(2)}\n\nThank you!`
      )

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`, '_blank')

      setOrderPlaced(true)

      setTimeout(() => {
        clearCart()
        navigate('/')
      }, 3000)
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-aura-black">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-green-500" />
          </motion.div>
          <h1 className="text-4xl font-serif mb-4">Order Confirmed!</h1>
          <p className="text-white/60 mb-8">
            Thank you for your purchase. A WhatsApp message has been sent.
          </p>
          <p className="text-sm text-white/40">Redirecting to home page...</p>
        </motion.div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-aura-black">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Your cart is empty</h1>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-8 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-6 bg-aura-black text-white">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-12 hover:text-white/60 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Shopping</span>
        </button>

        <h1 className="text-5xl font-serif mb-12">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="glassmorphism p-8 rounded-2xl">
                <h2 className="text-2xl font-serif mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="glassmorphism p-8 rounded-2xl">
                <h2 className="text-2xl font-serif mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                      required
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black px-8 py-4 text-sm uppercase tracking-wider hover:bg-white/90 transition-all rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Complete Order'}
              </motion.button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="glassmorphism p-8 rounded-2xl sticky top-24">
              <h2 className="text-2xl font-serif mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-white/10"
                  >
                    <img
                      src={item.luxury_image_url}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-light mb-1">{item.name}</p>
                      <p className="text-sm text-white/60">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-white/80">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-4 border-t border-white/20">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-light pt-4 border-t border-white/20">
                <span>Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
