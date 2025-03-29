
import React from 'react';
import { Activity, LineChart, BrainCircuit } from 'lucide-react';

const Header = () => {
  return (
    <div className="border-b border-border bg-card shadow-lg mb-6">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold gradient-text">DRL Quant Fund</h1>
              <p className="text-muted-foreground text-sm">Deep Reinforcement Learning for Strategy Allocation</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Portfolio Value</p>
                <p className="text-xl font-bold">$10,234,567</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">YTD Return</p>
                <p className="text-xl font-bold text-green-500">+17.8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
