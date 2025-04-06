
import { motion } from 'framer-motion';

interface AboutStatItemProps {
  value: string;
  label: string;
}

const AboutStatItem = ({ value, label }: AboutStatItemProps) => {
  return (
    <motion.div 
      className="p-4 bg-white dark:bg-logistics-dark/40 rounded-xl shadow-subtle border border-border"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="about-stat bg-gradient-to-r from-logistics-blue to-logistics-indigo bg-clip-text text-transparent">{value}</div>
      <p className="about-stat-label">{label}</p>
    </motion.div>
  );
};

export default AboutStatItem;
