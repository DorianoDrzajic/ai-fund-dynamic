
import React from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';

const PortfolioAllocation = () => {
  const { strategies, currentAllocation } = usePortfolioStore();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dynamic Strategy Allocation</CardTitle>
        <CardDescription>Current capital allocation across strategies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="flex h-2 mb-6 overflow-hidden rounded-full bg-secondary">
            {strategies.map((strategy) => (
              <Tooltip key={strategy.id}>
                <div
                  className="allocation-bar"
                  style={{
                    width: `${currentAllocation[strategy.id]}%`,
                    backgroundColor: strategy.color,
                  }}
                />
              </Tooltip>
            ))}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {strategies.map((strategy) => (
              <div key={strategy.id} className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: strategy.color }}
                  />
                  <span className="text-sm font-medium">{strategy.name}</span>
                </div>
                <div className="text-2xl font-bold">{currentAllocation[strategy.id]}%</div>
                <div className={`text-sm ${strategy.recent_change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {strategy.recent_change > 0 ? '+' : ''}{strategy.recent_change}%
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-secondary/50">
              <div className="text-sm text-muted-foreground">Allocation Shifts</div>
              <div className="text-2xl font-bold">7 Adjustments</div>
              <div className="text-sm text-muted-foreground">Last 30 days</div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50">
              <div className="text-sm text-muted-foreground">Capital Rebalanced</div>
              <div className="text-2xl font-bold">$1.27M</div>
              <div className="text-sm text-muted-foreground">30 day volume</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioAllocation;
