
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { mockMonthlyData, mockCategoryData, mockDailyData } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

const COLORS = ['#8B5CF6', '#EC4899', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6'];

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('month');
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm">{`Amount: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };
  
  const CategoryTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{`Amount: ${formatCurrency(payload[0].value)}`}</p>
          <p className="text-sm">{`Percentage: ${payload[0].payload.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Calculate average spend
  const totalMonthlyExpense = mockMonthlyData.reduce((sum, item) => sum + item.amount, 0);
  const avgMonthlyExpense = totalMonthlyExpense / mockMonthlyData.length;
  
  const totalDailyExpense = mockDailyData.reduce((sum, item) => sum + item.amount, 0);
  const avgDailyExpense = totalDailyExpense / mockDailyData.length;
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Average Monthly Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(avgMonthlyExpense)}</div>
            <p className="text-sm text-muted-foreground mt-1">Across {mockMonthlyData.length} months</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Average Daily Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(avgDailyExpense)}</div>
            <p className="text-sm text-muted-foreground mt-1">Across last 30 days</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Expense Trends</CardTitle>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {timeframe === 'month' ? (
              <BarChart data={mockMonthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#9b87f5" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={mockDailyData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#9b87f5" 
                  strokeWidth={2} 
                  dot={{ stroke: '#9b87f5', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                    nameKey="category"
                  >
                    {mockCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip content={<CategoryTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {mockCategoryData.map((category, index) => (
                <div key={category.category} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium capitalize">{category.category}</span>
                      <span className="text-sm font-medium">{formatCurrency(category.amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${category.percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length] 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
