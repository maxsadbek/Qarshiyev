import { motion } from 'framer-motion';

export const TypingIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    className="assistant-typing flex items-center gap-0.5 px-1 py-1"
    aria-label="Yozilmoqda"
  >
    <span />
    <span />
    <span />
  </motion.div>
);

