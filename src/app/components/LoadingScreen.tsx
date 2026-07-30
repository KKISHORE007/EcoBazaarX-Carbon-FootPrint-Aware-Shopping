import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#A5D6A7] to-[#2E7D32] flex items-center justify-center relative overflow-hidden">
      {/* CO2 Bubbles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/20 rounded-full flex items-center justify-center"
            style={{
              width: 50,
              height: 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <span className="text-white/60 text-xs">CO₂</span>
          </motion.div>
        ))}
      </div>

      {/* Loading Carbon Footprint Icon */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="relative"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-8 shadow-2xl">
            <Leaf size={80} className="text-[#2E7D32]" />
          </div>
          
          {/* Orbiting dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#69F0AE] rounded-full"
              style={{
                originX: '50%',
                originY: '50%',
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.33,
              }}
            >
              <div style={{ transform: 'translate(-50%, -150px)' }} />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-8 text-white text-xl"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}
