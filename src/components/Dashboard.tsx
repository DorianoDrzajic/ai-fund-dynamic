
import React from 'react';
import Header from './Header';
import PortfolioAllocation from './PortfolioAllocation';
import PerformanceChart from './PerformanceChart';
import StrategyCards from './StrategyCards';
import RLAgent from './RLAgent';
import Controls from './Controls';
import RiskMetrics from './RiskMetrics';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div>
            <RiskMetrics />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PortfolioAllocation />
          </div>
          <div>
            <RLAgent />
          </div>
        </div>
        <div className="mb-6">
          <StrategyCards />
        </div>
        <div>
          <Controls />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
