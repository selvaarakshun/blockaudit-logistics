
import { FileText, User, Settings, FileCheck } from 'lucide-react';

interface CategoryItem {
  name: string;
  icon: JSX.Element;
  count: number;
}

const EventCategories = () => {
  const categories: CategoryItem[] = [
    { name: 'Documents', icon: <FileText className="size-4" />, count: 24 },
    { name: 'User Actions', icon: <User className="size-4" />, count: 18 },
    { name: 'System Events', icon: <Settings className="size-4" />, count: 32 },
    { name: 'Verifications', icon: <FileCheck className="size-4" />, count: 45 }
  ];

  return (
    <div className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-medium">Event Categories</h3>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="flex justify-between items-center p-2 rounded-md hover:bg-logistics-light-gray dark:hover:bg-white/5 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-md bg-logistics-light-blue dark:bg-logistics-blue/10 flex items-center justify-center text-logistics-blue">
                  {category.icon}
                </div>
                <span>{category.name}</span>
              </div>
              <span className="text-sm text-logistics-gray">{category.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCategories;
