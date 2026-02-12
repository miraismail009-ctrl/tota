import { motion } from 'framer-motion'
import { Star, MessageCircle, ShoppingCart } from 'lucide-react'
import type { Product } from '../types/database'
import { useCart } from '../lib/CartContext'

interface ProductCardProps {
  product: Product
  index: number
  onProductClick: (product: Product) => void
}

const WHATSAPP_NUMBER = '+972595230839'

export default function ProductCard({ product, index, onProductClick }: ProductCardProps) {
  const { addToCart } = useCart()

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
      )
    }

    return stars
  }

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation()
    const message = encodeURIComponent(
      `Hello AURA, I would like to inquire about ${product.name}.`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  const handleWhatsAppBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation()
    const message = encodeURIComponent(
      `Hello AURA, I would like to order ${product.name}. Product Details:\n- Name: ${product.name}\n- Price: $${product.price}\n\nPlease provide further instructions for my order.`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="glassmorphism rounded-2xl overflow-hidden cursor-pointer group"
      onClick={() => onProductClick(product)}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={product.luxury_image_url}
          alt={product.name}
          className="w-full h-80 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-8">
        <div className="flex items-center gap-2 mb-3">{renderStars(product.rating)}</div>

        <p className="text-xs tracking-widest mb-2 text-white/60">
          {product.category.toUpperCase()}
        </p>

        <h3 className="text-2xl font-serif mb-3">{product.name}</h3>

        <p className="text-2xl font-light mb-4">${product.price}</p>

        <div className="flex gap-2 mb-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              addToCart(product)
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 text-sm uppercase tracking-wider transition-all rounded-lg backdrop-blur-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppBuyNow}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 px-4 py-3 text-sm uppercase tracking-wider transition-all rounded-lg font-medium"
          >
            Buy Now
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppInquiry}
            className="flex items-center justify-center bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition-all"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
