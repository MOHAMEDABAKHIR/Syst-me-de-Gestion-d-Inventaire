import { motion } from "framer-motion"

interface SlideUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
}

export function SlideUp({ children, delay = 0, duration = 0.3 }: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  )
}
