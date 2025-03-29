
import React from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, BarChart3, LineChart, Activity } from 'lucide-react';

const strategyIcons = {
  momentum: <TrendingUp className="h-5 w-5" />,
  value: <BarChart3 className="h-5 w-5" />,
  trend: <LineChart className="h-5 w-5" />,
  ml: <Activity className="h-5 w-5" />,
  volatility: <TrendingDown className="h-5 w-5" />,
};

const StrategyCards = () => {
  const { strategies, currentAllocation } = usePortfolioStore();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {strategies.map((strategy) => (
            <div 
              key={strategy.id} 
              className="strategy-card"
              style={{ 
                borderLeft: `4px solid ${strategy.color}`,
                borderTop: currentAllocation[strategy.id] > 25 ? `1px solid ${strategy.color}` : ''
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-medium">{strategy.name}</p>
                  <p className="text-xs text-muted-foreground">{strategy.description}</p>
                </div>
                <div 
                  className="p-1.5 rounded-full" 
                  style={{ 
                    backgroundColor: `${strategy.color}20`,
                    color: strategy.color
                  }}
                >
                  {strategyIcons[strategy.id as keyof typeof strategyIcons]}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-xs">Allocation</p>
                  <p className="font-bold text-lg">{currentAllocation[strategy.id]}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Return</p>
                  <p className={`font-bold text-lg ${strategy.return >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {strategy.return >= 0 ? '+' : ''}{strategy.return}%
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Sharpe</p>
                  <p className="font-bold text-lg">{strategy.sharpe}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Vol</p>
                  <p className="font-bold text-lg">{strategy.volatility}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StrategyCards;
