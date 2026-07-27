import { motion } from "framer-motion"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
}

export function FadeIn({ children, delay = 0, duration = 0.3 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  )
}
