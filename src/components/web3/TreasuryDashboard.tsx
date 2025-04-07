
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CircleDollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { AreaChart, Area, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock treasury data
const treasuryOverview = {
  totalBalance: '$6,250,000',
  changePercentage: '+3.5%',
  distributions: [
    { name: 'USDC', value: 3500000, color: '#2775CA' },
    { name: 'USDT', value: 2000000, color: '#26A17B' },
    { name: 'GuudzToken', value: 750000, color: '#6E59A5' },
  ],
};

// Mock chart data
const monthlyData = [
  { name: 'Jan', USDC: 2800000, USDT: 1500000, GuudzToken: 550000 },
  { name: 'Feb', USDC: 3000000, USDT: 1600000, GuudzToken: 600000 },
  { name: 'Mar', USDC: 3200000, USDT: 1700000, GuudzToken: 650000 },
  { name: 'Apr', USDC: 3500000, USDT: 2000000, GuudzToken: 750000 },
];

const weeklyData = [
  { name: 'Week 1', volume: 1200000 },
  { name: 'Week 2', volume: 950000 },
  { name: 'Week 3', volume: 1350000 },
  { name: 'Week 4', volume: 1650000 },
];

const TreasuryDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="treasury-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Treasury Value</p>
              <h3 className="text-2xl font-bold">{treasuryOverview.totalBalance}</h3>
              <p className="text-xs flex items-center text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                {treasuryOverview.changePercentage} this month
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <CircleDollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
        
        <Card className="treasury-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Inflows (30d)</p>
              <h3 className="text-2xl font-bold">$2,450,000</h3>
              <p className="text-xs flex items-center text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.3% vs previous
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
              <ArrowUpRight className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>
        
        <Card className="treasury-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Outflows (30d)</p>
              <h3 className="text-2xl font-bold">$1,275,000</h3>
              <p className="text-xs flex items-center text-red-500">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                +8.1% vs previous
              </p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
              <ArrowDownRight className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="bg-white dark:bg-logistics-dark/80 shadow-sm hover:shadow-md transition-shadow border-border rounded-xl">
            <CardHeader>
              <CardTitle>Treasury Balance History</CardTitle>
              <CardDescription>Monthly stablecoin holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" />
                    <YAxis 
                      tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${(value).toLocaleString()}`, undefined]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="USDC" 
                      stackId="1"
                      stroke="#2775CA" 
                      fill="#2775CA" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="USDT" 
                      stackId="1"
                      stroke="#26A17B" 
                      fill="#26A17B" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="GuudzToken" 
                      stackId="1"
                      stroke="#6E59A5" 
                      fill="#6E59A5" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center mt-4">
                <div className="flex gap-4">
                  {treasuryOverview.distributions.map((token) => (
                    <div key={token.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: token.color }}
                      />
                      <span className="text-sm">{token.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="bg-white dark:bg-logistics-dark/80 shadow-sm hover:shadow-md transition-shadow border-border rounded-xl">
            <CardHeader>
              <CardTitle>Token Distribution</CardTitle>
              <CardDescription>Current treasury allocation</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={treasuryOverview.distributions}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {treasuryOverview.distributions.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`$${(value).toLocaleString()}`, undefined]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="w-full space-y-3 mt-4">
                {treasuryOverview.distributions.map((token) => (
                  <div key={token.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: token.color }}
                      />
                      <span>{token.name}</span>
                    </div>
                    <span className="font-medium">
                      ${(token.value).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-logistics-dark/80 shadow-sm hover:shadow-md transition-shadow border-border rounded-xl">
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
            <CardDescription>Weekly payment activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={weeklyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${(value).toLocaleString()}`, undefined]}
                  />
                  <Bar dataKey="volume" fill="#6E59A5" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-logistics-dark/80 shadow-sm hover:shadow-md transition-shadow border-border rounded-xl">
          <CardHeader>
            <CardTitle>Treasury Actions</CardTitle>
            <CardDescription>Manage your treasury funds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-auto py-6 flex flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Multi-sig Wallet</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                <BarChart3 className="h-6 w-6" />
                <span>Detailed Reports</span>
              </Button>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm">Swap Tokens</Button>
                <Button variant="outline" size="sm">Bridge Assets</Button>
                <Button variant="outline" size="sm">Mass Payments</Button>
                <Button variant="outline" size="sm">Yield Strategies</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TreasuryDashboard;
