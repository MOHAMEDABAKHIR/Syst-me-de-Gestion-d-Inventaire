import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import type { HTMLAttributes } from "react"

interface AnimatedCardProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number
}

export function AnimatedCard({ children, delay = 0, className, ...props }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={className} {...props}>
        {children}
      </Card>
    </motion.div>
  )
}
