
import { ArrowUpRight, ArrowDownRight, TrendingUp, Clock } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      icon: <ArrowUpRight className="size-4 text-logistics-success" />,
      title: 'Outbound',
      value: '24',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      icon: <ArrowDownRight className="size-4 text-logistics-blue" />,
      title: 'Inbound',
      value: '18',
      change: '+5.3%',
      changeType: 'positive'
    },
    {
      icon: <TrendingUp className="size-4 text-logistics-indigo" />,
      title: 'Active',
      value: '32',
      change: '+8.7%',
      changeType: 'positive'
    },
    {
      icon: <Clock className="size-4 text-logistics-warning" />,
      title: 'Delayed',
      value: '7',
      change: '-2.1%',
      changeType: 'negative'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-1.5">
              <div className="size-7 rounded-md bg-logistics-light-gray dark:bg-white/5 flex items-center justify-center">
                {stat.icon}
              </div>
              <span className="text-sm text-logistics-gray">{stat.title}</span>
            </div>
            <div className={`text-xs ${stat.changeType === 'positive' ? 'text-logistics-success' : 'text-logistics-error'}`}>
              {stat.change}
            </div>
          </div>
          <div className="text-2xl font-semibold">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
