import { motion } from 'framer-motion'

export default function LuxuryHero() {
  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-aura-black via-aura-darkBrown to-aura-black">
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_30%_40%,rgba(184,134,11,0.15)_0%,transparent_50%),radial-gradient(ellipse_at_70%_60%,rgba(218,165,32,0.1)_0%,transparent_50%)] animate-ken-burns" />

      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[radial-gradient(circle,rgba(218,165,32,0.6)_0%,transparent_70%)]"
            style={{
              width: `${Math.random() * 3 + 3}px`,
              height: `${Math.random() * 3 + 3}px`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [window.innerHeight, -100],
              x: [0, 50],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center h-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12 md:gap-20">
          <motion.div
            className="flex-1 max-w-lg text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              className="font-montserrat text-sm tracking-[8px] text-aura-gold mb-8 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              AURA
            </motion.div>

            <motion.h1
              className="font-serif text-5xl md:text-7xl font-light leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Unveil Your
              <br />
              <span className="font-semibold bg-gradient-to-r from-aura-lightGold via-aura-gold to-aura-darkGold bg-clip-text text-transparent">
                Radiance
              </span>
            </motion.h1>

            <motion.p
              className="font-montserrat text-base md:text-lg text-white/70 leading-relaxed mb-10 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              Experience the transformative power of our Radiance Night Cream.
              Infused with 24K gold essence and rare botanical extracts, this
              luxurious formula works overnight to restore, rejuvenate, and
              reveal your skin's natural luminosity.
            </motion.p>

            <motion.a
              href="#products"
              className="inline-block relative px-12 py-4 bg-gradient-to-r from-aura-darkGold to-aura-gold text-black font-montserrat text-sm tracking-[2px] uppercase font-semibold overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(218,165,32,0.4)' }}
            >
              <span className="relative z-10">Discover More</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-aura-lightGold to-aura-gold"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
          </motion.div>

          <motion.div
            className="flex-1 flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(218,165,32,0.3)_0%,rgba(218,165,32,0.1)_40%,transparent_70%)] blur-[40px] animate-pulse-glow" />

            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-5"
            >
              <svg
                className="w-80 md:w-96 h-auto drop-shadow-[0_20px_60px_rgba(218,165,32,0.3)]"
                viewBox="0 0 400 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#DAA520', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#B8860B', stopOpacity: 1 }} />
                  </linearGradient>

                  <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#1a1a1a', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#0a0a0a', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
                  </linearGradient>

                  <radialGradient id="highlight" cx="30%" cy="30%">
                    <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.4 }} />
                    <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
                  </radialGradient>
                </defs>

                <rect x="120" y="180" width="160" height="200" rx="15" fill="url(#glassGrad)" />
                <rect x="125" y="185" width="150" height="190" rx="12" fill="#000000" opacity="0.8" />

                <ellipse cx="160" cy="220" rx="30" ry="50" fill="url(#highlight)" />

                <rect x="115" y="165" width="170" height="20" fill="url(#goldGrad)" />
                <rect x="118" y="168" width="164" height="14" fill="#FFD700" opacity="0.5" />

                <rect x="115" y="375" width="170" height="15" fill="url(#goldGrad)" />

                <ellipse cx="200" cy="165" rx="85" ry="25" fill="url(#goldGrad)" />
                <ellipse cx="200" cy="160" rx="85" ry="25" fill="#FFD700" />
                <ellipse cx="200" cy="155" rx="75" ry="20" fill="url(#goldGrad)" />
                <ellipse cx="200" cy="152" rx="70" ry="18" fill="#DAA520" />

                <ellipse cx="180" cy="150" rx="30" ry="8" fill="#FFD700" opacity="0.6" />

                <text
                  x="200"
                  y="290"
                  fontFamily="Cormorant Garamond, serif"
                  fontSize="32"
                  fontWeight="300"
                  fill="url(#goldGrad)"
                  textAnchor="middle"
                  letterSpacing="8"
                >
                  AURA
                </text>

                <text
                  x="200"
                  y="320"
                  fontFamily="Montserrat, sans-serif"
                  fontSize="10"
                  fontWeight="300"
                  fill="#DAA520"
                  textAnchor="middle"
                  letterSpacing="3"
                  opacity="0.8"
                >
                  RADIANCE
                </text>
                <text
                  x="200"
                  y="335"
                  fontFamily="Montserrat, sans-serif"
                  fontSize="10"
                  fontWeight="300"
                  fill="#DAA520"
                  textAnchor="middle"
                  letterSpacing="3"
                  opacity="0.8"
                >
                  NIGHT CREAM
                </text>

                <circle cx="200" cy="360" r="3" fill="#FFD700" opacity="0.6" />
                <line x1="190" y1="360" x2="210" y2="360" stroke="#DAA520" strokeWidth="0.5" opacity="0.4" />
              </svg>

              <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-4/5 h-12 bg-gradient-to-b from-[rgba(218,165,32,0.1)] to-transparent blur-[10px] rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-2%, -2%); }
        }
        .animate-ken-burns {
          animation: ken-burns 20s ease-in-out infinite alternate;
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.9; }
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
