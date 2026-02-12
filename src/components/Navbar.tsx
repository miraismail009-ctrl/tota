import { ShoppingBag, ShieldCheck, Menu } from 'lucide-react'
import { useCart } from '../lib/CartContext'
import { motion } from 'framer-motion'

export default function Navbar() {
  const { getCartCount, setIsCartOpen } = useCart()
  const cartCount = getCartCount()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 glassmorphism"
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-serif tracking-wider">AURA</div>

          <div className="hidden md:flex items-center gap-8 text-sm tracking-wider">
            <a href="#shop" className="hover:text-white/60 transition-colors">
              SHOP
            </a>
            <a href="#about" className="hover:text-white/60 transition-colors">
              ABOUT
            </a>
            <a href="#science" className="hover:text-white/60 transition-colors">
              SCIENCE
            </a>
            <a href="#contact" className="hover:text-white/60 transition-colors">
              CONTACT
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-600/30 hover:border-yellow-500/50 transition-all duration-300 group"
            >
              <ShieldCheck className="w-4 h-4 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
              <span className="text-sm font-medium text-yellow-500 group-hover:text-yellow-400 transition-colors tracking-wider">
                ADMIN
              </span>
            </a>

            <a
              href="/admin"
              className="md:hidden w-10 h-10 rounded-full bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-600/30 flex items-center justify-center hover:border-yellow-500/50 transition-all duration-300"
            >
              <ShieldCheck className="w-5 h-5 text-yellow-500" />
            </a>

            <button
              className="relative hover:text-white/60 transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-xs rounded-full flex items-center justify-center font-medium"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
