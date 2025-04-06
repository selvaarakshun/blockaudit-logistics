
import { LucideIcon } from 'lucide-react';

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitItem = ({ icon, title, description }: BenefitItemProps) => {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0 size-12 rounded-full bg-logistics-light-blue dark:bg-logistics-blue/10 flex items-center justify-center text-logistics-blue">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-logistics-gray">{description}</p>
      </div>
    </div>
  );
};

export default BenefitItem;
