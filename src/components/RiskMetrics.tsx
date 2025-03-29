
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { usePortfolioStore } from '../store/portfolioStore';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/90 border border-border p-2 rounded shadow-md">
        <p className="text-sm">{`${label}`}</p>
        <p className="text-sm" style={{ color: payload[0].color }}>
          {`VaR: ${payload[0].value.toFixed(2)}%`}
        </p>
      </div>
    );
  }

  return null;
};

const RiskMetrics = () => {
  const { riskData } = usePortfolioStore();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={riskData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
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
                domain={[0, 'dataMax + 1']}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={5} stroke="#f97316" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="var"
                stroke="#ec4899"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div>
            <p className="text-muted-foreground text-xs">Value at Risk (95%)</p>
            <p className="text-xl font-bold">3.74%</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Max Drawdown</p>
            <p className="text-xl font-bold">-12.3%</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Sortino Ratio</p>
            <p className="text-xl font-bold">2.14</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Tail Risk Score</p>
            <p className="text-xl font-bold">Low</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-6">
          <div className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
            Well Diversified
          </div>
          <div className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded-full">
            Low Correlation 0.31
          </div>
          <div className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
            Risk-Optimized
          </div>
          <div className="text-xs bg-purple-500/20 text-purple-500 px-2 py-1 rounded-full">
            Stable Allocation
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskMetrics;
