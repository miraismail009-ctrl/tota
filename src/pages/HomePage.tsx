import { useState } from 'react'
import { motion } from 'framer-motion'
import { useProducts } from '../hooks/useProducts'
import Navbar from '../components/Navbar'
import LuxuryHero from '../components/LuxuryHero'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import CartSidebar from '../components/CartSidebar'
import type { Product } from '../types/database'

export default function HomePage() {
  const { products, loading } = useProducts()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-aura-gold"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-aura-black text-white">
      <Navbar />
      <LuxuryHero />

      <section id="products" className="py-32 px-6 bg-aura-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-sm tracking-widest mb-4 text-white/60">
              OUR COLLECTION
            </p>
            <h2 className="text-5xl md:text-6xl font-serif mb-6">
              Discover Luxury
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Each product is meticulously crafted with the finest ingredients
              to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onProductClick={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-b from-aura-black to-aura-darkBrown">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm tracking-widest mb-4 text-white/60">
                THE SCIENCE
              </p>
              <h2 className="text-5xl md:text-6xl font-serif mb-6">
                Innovation Meets Nature
              </h2>
              <p className="text-white/70 mb-8 text-lg leading-relaxed">
                Our research team combines cutting-edge biotechnology with rare
                botanical extracts to create formulas that deliver visible
                results. Each ingredient is carefully selected for its proven
                efficacy and luxury experience.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800"
                alt="Science"
                className="rounded-2xl w-full h-[600px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 bg-aura-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-serif mb-6">AURA</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto">
              Luxury skincare crafted with science and nature to unveil your
              natural radiance.
            </p>
            <p className="text-white/60 text-sm mt-8">
              © 2024 AURA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <CartSidebar />
    </div>
  )
}
