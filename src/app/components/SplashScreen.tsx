import { motion } from 'motion/react';
import { Leaf, ShoppingBag, Sprout } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E7D32] via-[#A5D6A7] to-white relative overflow-hidden flex items-center justify-center">
      {/* Animated CO2 Bubbles Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/20 rounded-full"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">
              CO₂
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Leaves Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`leaf-${i}`}
            className="absolute text-green-700/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Leaf size={Math.random() * 30 + 20} />
          </motion.div>
        ))}
      </div>

      {/* Logo and Brand */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo Container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
            duration: 1.5,
          }}
          className="relative mb-6"
        >
          {/* Outer Glow Ring */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#69F0AE] to-[#2E7D32] rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            style={{ width: 200, height: 200 }}
          />

          {/* Logo Circle */}
          <div className="relative bg-white rounded-full p-8 shadow-2xl" style={{ width: 200, height: 200 }}>
            <div className="flex items-center justify-center h-full">
              <img
                src="https://media.istockphoto.com/id/1389111152/vector/shopping-cart-with-a-leaf-inside-circle-organic-shop-icon.jpg?s=612x612&w=0&k=20&c=TjNiLnPB7eUEni6mlvyTWd80LJdO8zig5DmKiHz8Lkk="
                alt="EcoBazaar Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-[#69F0AE] to-white bg-clip-text text-transparent mb-2"
              style={{ fontFamily: "'Satisfy', cursive" }}>
            EcoBazaar
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-white text-xl tracking-wider"
          >
            Shop Green, Live Clean
          </motion.p>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}