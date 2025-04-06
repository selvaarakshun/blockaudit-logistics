
import { motion } from 'framer-motion';

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  icon: React.ReactNode;
}

const TeamMemberCard = ({ name, role, bio, icon }: TeamMemberCardProps) => {
  return (
    <motion.div 
      className="about-card h-full flex flex-col items-center"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="size-16 rounded-full bg-gradient-to-br from-logistics-light-blue to-logistics-blue/20 dark:from-logistics-blue/30 dark:to-logistics-blue/5 flex items-center justify-center mx-auto mb-4 shadow-subtle">
        {icon}
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-logistics-blue text-sm mb-3">{role}</p>
        <p className="text-logistics-gray text-sm">{bio}</p>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
