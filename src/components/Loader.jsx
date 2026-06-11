import { motion } from "framer-motion";

export default function Loader({ onDone }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "#080c14" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.8 }}
      onAnimationComplete={onDone}
    >
      {/* Animated logo */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "backOut" }}
        className="relative"
      >
        <div className="w-20 h-20 rounded-2xl glass grad-border flex items-center justify-center mb-6">
          <span className="font-mono-custom text-2xl font-bold grad-text">BB</span>
        </div>
        {/* Spinning ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent"
          style={{
            borderTopColor: "#00d4ff",
            borderRightColor: "#7c3aed",
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="font-mono-custom text-xs tracking-[0.3em] text-[#6b7fa8] uppercase"
      >
        Loading portfolio...
      </motion.p>

      {/* Progress bar */}
      <div className="mt-6 w-40 h-0.5 bg-[#0d1524] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
