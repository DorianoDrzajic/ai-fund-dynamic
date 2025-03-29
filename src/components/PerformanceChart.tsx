
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { usePortfolioStore } from '../store/portfolioStore';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/90 border border-border p-2 rounded shadow-md">
        <p className="text-sm">{`${label}`}</p>
        <p className="text-sm text-primary font-semibold">
          ${Number(payload[0].value).toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

const PerformanceChart = () => {
  const [timeframe, setTimeframe] = useState('1Y');
  const { performanceData } = usePortfolioStore();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Fund Performance</CardTitle>
        <Tabs defaultValue="1Y" className="w-[200px]">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="1M" onClick={() => setTimeframe('1M')}>1M</TabsTrigger>
            <TabsTrigger value="3M" onClick={() => setTimeframe('3M')}>3M</TabsTrigger>
            <TabsTrigger value="1Y" onClick={() => setTimeframe('1Y')}>1Y</TabsTrigger>
            <TabsTrigger value="ALL" onClick={() => setTimeframe('ALL')}>ALL</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={performanceData[timeframe]}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="portfolio"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorPortfolio)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="hsl(var(--muted-foreground))"
                dot={false}
                strokeWidth={1.5}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div>
            <p className="text-muted-foreground text-sm">Value</p>
            <p className="text-xl font-bold">$10.23M</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Return</p>
            <p className="text-xl font-bold text-green-500">+17.8%</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Vs Benchmark</p>
            <p className="text-xl font-bold text-green-500">+6.2%</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Sharpe Ratio</p>
            <p className="text-xl font-bold">1.87</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
