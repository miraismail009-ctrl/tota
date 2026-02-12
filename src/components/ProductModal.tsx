import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, MessageCircle } from 'lucide-react'
import type { Product } from '../types/database'
import { useCart } from '../lib/CartContext'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

const WHATSAPP_NUMBER = '+972595230839'

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart()

  if (!product) return null

  const handleWhatsAppBuyNow = () => {
    const message = encodeURIComponent(
      `Hello AURA, I would like to order ${product.name}. Product Details:\n- Name: ${product.name}\n- Price: $${product.price}\n\nPlease provide further instructions for my order.`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(
      `Hello AURA, I would like to inquire about ${product.name}.`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          exit={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
          onClick={(e) => e.stopPropagation()}
          className="glassmorphism rounded-2xl max-w-4xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          <div className="grid md:grid-cols-2">
            <img
              src={product.luxury_image_url}
              alt={product.name}
              className="w-full h-64 md:h-full object-cover"
            />

            <div className="p-8 md:p-12 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                {product.name}
              </h2>
              <p className="text-3xl font-light mb-6">${product.price}</p>
              <p className="text-white/70 mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-wider mb-4 text-white/80">
                  Key Benefits
                </h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-white/70"
                    >
                      <Check className="w-5 h-5 text-white flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    addToCart(product)
                    onClose()
                  }}
                  className="w-full bg-white text-black px-8 py-4 text-sm uppercase tracking-wider hover:bg-white/90 transition-all rounded-lg font-medium"
                >
                  Add to Cart
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppBuyNow}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 px-8 py-4 text-sm uppercase tracking-wider transition-all rounded-lg font-medium"
                >
                  Buy Now via WhatsApp
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppInquiry}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-8 py-4 text-sm uppercase tracking-wider transition-all rounded-lg font-medium"
                >
                  <MessageCircle className="w-5 h-5" />
                  Inquire via WhatsApp
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
