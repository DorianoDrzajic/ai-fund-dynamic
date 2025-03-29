
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePortfolioStore } from '../store/portfolioStore';
import { BrainCircuit, ArrowRight } from 'lucide-react';

const RLAgent = () => {
  const { adjustAllocation, strategies } = usePortfolioStore();
  const [isThinking, setIsThinking] = useState(false);
  const [currentAction, setCurrentAction] = useState('Observing market conditions');
  
  // Simulate agent thinking and taking actions
  useEffect(() => {
    const interval = setInterval(() => {
      setIsThinking(true);
      setCurrentAction('Analyzing market data...');
      
      setTimeout(() => {
        const actions = [
          'Detecting market regime shift',
          'Evaluating strategy correlations',
          'Optimizing Sharpe ratio',
          'Calculating volatility impact',
          'Assessing drawdown risk'
        ];
        
        setCurrentAction(actions[Math.floor(Math.random() * actions.length)]);
        
        setTimeout(() => {
          setIsThinking(false);
          adjustAllocation();
          setCurrentAction('Rebalancing complete');
          
          setTimeout(() => {
            setCurrentAction('Observing market conditions');
          }, 2000);
        }, 1500);
      }, 1500);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [adjustAllocation]);
  
  return (
    <Card className={isThinking ? 'pulse-border' : ''}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-primary" />
            <CardTitle>DRL Agent</CardTitle>
          </div>
          <div className={`h-2 w-2 rounded-full ${isThinking ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
        </div>
        <CardDescription>Proximal Policy Optimization (PPO)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className={`p-3 rounded-lg ${isThinking ? 'bg-primary/10' : 'bg-secondary/50'}`}>
            <p className="text-sm font-medium">Current Action</p>
            <p className="text-lg">{currentAction}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Agent State</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-secondary/30 p-2 rounded">
                <p className="text-xs text-muted-foreground">Episodes</p>
                <p className="font-medium">2,456</p>
              </div>
              <div className="bg-secondary/30 p-2 rounded">
                <p className="text-xs text-muted-foreground">Learning Rate</p>
                <p className="font-medium">0.0003</p>
              </div>
              <div className="bg-secondary/30 p-2 rounded">
                <p className="text-xs text-muted-foreground">Entropy</p>
                <p className="font-medium">0.015</p>
              </div>
              <div className="bg-secondary/30 p-2 rounded">
                <p className="text-xs text-muted-foreground">Discount</p>
                <p className="font-medium">0.995</p>
              </div>
            </div>
          </div>
          
          {isThinking && (
            <div className="mt-2 border border-primary/30 rounded-lg p-2 bg-primary/5">
              <p className="text-sm font-medium mb-1 text-primary">Recent Observations</p>
              <div className="space-y-1">
                {strategies.map(strategy => (
                  <div key={strategy.id} className="flex items-center justify-between text-xs">
                    <span>{strategy.name}</span>
                    <div className="flex items-center">
                      <span className={strategy.return >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {strategy.return}%
                      </span>
                      <ArrowRight className="h-3 w-3 mx-1" />
                      <span>SR: {strategy.sharpe}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RLAgent;
