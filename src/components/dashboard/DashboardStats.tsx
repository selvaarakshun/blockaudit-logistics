
import { Package, Truck, CheckCircle, AlertTriangle } from 'lucide-react';
import { Shipment } from '@/pages/Dashboard';

interface DashboardStatsProps {
  shipments: Shipment[];
}

const DashboardStats = ({ shipments = [] }: DashboardStatsProps) => {
  // Calculate stats from shipments
  const total = shipments.length;
  const inTransit = shipments.filter(s => s.status === 'in-transit').length;
  const delivered = shipments.filter(s => s.status === 'delivered').length;
  const pending = shipments.filter(s => s.status === 'pending').length;
  const delayed = shipments.filter(s => s.status === 'delayed').length;

  const stats = [
    {
      label: 'Total Shipments',
      value: total,
      icon: <Package className="h-5 w-5 text-purple-500" />,
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-700 dark:text-purple-300',
      borderColor: 'border-purple-100 dark:border-purple-800/30'
    },
    {
      label: 'In Transit',
      value: inTransit,
      icon: <Truck className="h-5 w-5 text-blue-500" />,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-700 dark:text-blue-300',
      borderColor: 'border-blue-100 dark:border-blue-800/30'
    },
    {
      label: 'Delivered',
      value: delivered,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-700 dark:text-green-300',
      borderColor: 'border-green-100 dark:border-green-800/30'
    },
    {
      label: 'Delayed',
      value: delayed,
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      bgColor: 'bg-amber-50 dark:bg-amber-900/20', 
      textColor: 'text-amber-700 dark:text-amber-300',
      borderColor: 'border-amber-100 dark:border-amber-800/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`p-5 rounded-xl border ${stat.borderColor} ${stat.bgColor} shadow-sm`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <h3 className={`text-2xl font-bold mt-1 ${stat.textColor}`}>{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm border ${stat.borderColor}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
