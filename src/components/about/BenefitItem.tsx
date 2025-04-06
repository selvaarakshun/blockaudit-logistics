
import { motion } from 'framer-motion';

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitItem = ({ icon, title, description }: BenefitItemProps) => {
  return (
    <motion.div 
      className="flex gap-5 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-logistics-dark/30 transition-all"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex-shrink-0 size-12 rounded-xl bg-gradient-to-br from-logistics-light-blue to-logistics-blue/20 dark:from-logistics-blue/30 dark:to-logistics-blue/5 flex items-center justify-center text-logistics-blue shadow-subtle">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-logistics-gray">{description}</p>
      </div>
    </motion.div>
  );
};

export default BenefitItem;
