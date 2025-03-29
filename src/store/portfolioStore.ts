
import { create } from 'zustand';

// Mock performance data
const createPerformanceData = (days: number, startValue: number, trend: number, volatility: number) => {
  const data = [];
  let currentValue = startValue;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    // Calculate daily return with some volatility
    const dailyReturn = (trend / 100 / 252) + (Math.random() - 0.5) * (volatility / 100 / Math.sqrt(252));
    currentValue = currentValue * (1 + dailyReturn);
    
    // Benchmark is slightly worse than portfolio
    const benchmarkValue = startValue * (1 + ((trend - 2) / 100 / 252 * i) + (Math.random() - 0.5) * 0.001);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      portfolio: Math.round(currentValue),
      benchmark: Math.round(benchmarkValue)
    });
  }
  
  return data;
};

// Create risk data
const createRiskData = (days: number, baseVar: number, trend: number) => {
  const data = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    // VaR fluctuates based on trend and some randomness
    const varValue = baseVar + (trend > 0 ? -0.5 : 0.5) + (Math.random() - 0.5) * 1;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      var: Math.max(0.5, Math.round(varValue * 100) / 100)
    });
  }
  
  return data;
};

// Define types
interface Strategy {
  id: string;
  name: string;
  description: string;
  color: string;
  return: number;
  volatility: number;
  sharpe: number;
  recent_change: number;
}

interface Settings {
  volatility: number;
  trend: number;
  correlation: number;
  autopilot: boolean;
  riskManagement: boolean;
  allowLeverage: boolean;
  simulationSpeed: number;
}

interface PortfolioState {
  strategies: Strategy[];
  currentAllocation: Record<string, number>;
  performanceData: {
    '1M': any[];
    '3M': any[];
    '1Y': any[];
    'ALL': any[];
  };
  riskData: any[];
  settings: Settings;
  adjustAllocation: () => void;
  simulateMarketChange: (scenario: string) => void;
  toggleAutopilot: () => void;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

// Create store
export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  strategies: [
    {
      id: 'momentum',
      name: 'Momentum',
      description: 'Trend following',
      color: '#3b82f6',
      return: 23.4,
      volatility: 18.7,
      sharpe: 1.25,
      recent_change: 2.1,
    },
    {
      id: 'value',
      name: 'Value',
      description: 'Mean reversion',
      color: '#10b981',
      return: 14.2,
      volatility: 12.5,
      sharpe: 1.14,
      recent_change: -1.3,
    },
    {
      id: 'trend',
      name: 'Trend',
      description: 'Technical signals',
      color: '#8b5cf6',
      return: 19.8,
      volatility: 16.9,
      sharpe: 1.17,
      recent_change: 1.7,
    },
    {
      id: 'ml',
      name: 'ML Alpha',
      description: 'Machine learning',
      color: '#f97316',
      return: 28.6,
      volatility: 22.3,
      sharpe: 1.28,
      recent_change: 3.4,
    },
    {
      id: 'volatility',
      name: 'Vol Arb',
      description: 'Volatility arbitrage',
      color: '#ec4899',
      return: 11.2,
      volatility: 7.8,
      sharpe: 1.44,
      recent_change: -0.8,
    }
  ],
  
  currentAllocation: {
    momentum: 25,
    value: 15,
    trend: 20,
    ml: 30,
    volatility: 10,
  },
  
  performanceData: {
    '1M': createPerformanceData(30, 10000000, 15, 12),
    '3M': createPerformanceData(90, 9500000, 15, 12),
    '1Y': createPerformanceData(252, 8700000, 15, 12),
    'ALL': createPerformanceData(756, 5000000, 15, 12),
  },
  
  riskData: createRiskData(90, 3.5, 15),
  
  settings: {
    volatility: 15,
    trend: 5,
    correlation: 0.3,
    autopilot: true,
    riskManagement: true,
    allowLeverage: false,
    simulationSpeed: 1,
  },
  
  adjustAllocation: () => {
    const { strategies, settings } = get();
    
    set((state) => {
      // Create new allocation based on returns and settings
      const newAllocation: Record<string, number> = { ...state.currentAllocation };
      let totalAllocation = 0;
      
      // Adjust allocation based on performance
      strategies.forEach((strategy) => {
        // Calculate allocation change based on strategy performance and settings
        const change = Math.floor(Math.random() * 8) - 4;
        
        // Apply change with constraints
        newAllocation[strategy.id] = Math.max(5, Math.min(40, newAllocation[strategy.id] + change));
        totalAllocation += newAllocation[strategy.id];
      });
      
      // Normalize to 100%
      if (totalAllocation !== 100) {
        const factor = 100 / totalAllocation;
        Object.keys(newAllocation).forEach((id) => {
          newAllocation[id] = Math.round(newAllocation[id] * factor);
        });
        
        // Ensure exact sum of 100 by adjusting the largest allocation
        const sum = Object.values(newAllocation).reduce((a, b) => a + b, 0);
        if (sum !== 100) {
          const largestKey = Object.keys(newAllocation).reduce((a, b) => 
            newAllocation[a] > newAllocation[b] ? a : b
          );
          newAllocation[largestKey] += (100 - sum);
        }
      }
      
      // Update strategies with new returns and changes
      const updatedStrategies = strategies.map(strategy => {
        const allocationChange = newAllocation[strategy.id] - state.currentAllocation[strategy.id];
        
        return {
          ...strategy,
          recent_change: allocationChange
        };
      });
      
      return {
        currentAllocation: newAllocation,
        strategies: updatedStrategies
      };
    });
  },
  
  simulateMarketChange: (scenario) => {
    const { strategies, settings } = get();
    
    // Define scenario parameters
    const scenarioEffects: Record<string, any> = {
      crash: { trend: -20, volatility: 35, correlation: 0.7 },
      correction: { trend: -8, volatility: 25, correlation: 0.5 },
      rally: { trend: 15, volatility: 10, correlation: 0.3 },
      volatility: { trend: 0, volatility: 30, correlation: 0.2 },
      random: { trend: Math.random() * 30 - 15, volatility: 5 + Math.random() * 25, correlation: Math.random() * 0.8 }
    };
    
    const effect = scenarioEffects[scenario];
    
    // Update settings
    set((state) => ({
      settings: {
        ...state.settings,
        trend: effect.trend,
        volatility: effect.volatility,
        correlation: effect.correlation
      }
    }));
    
    // Update strategies performance
    set((state) => {
      const updatedStrategies = strategies.map(strategy => {
        // Each strategy reacts differently to market changes
        let newReturn = strategy.return;
        
        switch (strategy.id) {
          case 'momentum':
            // Momentum does well in strong trends
            newReturn += effect.trend * 0.5;
            break;
          case 'value':
            // Value often does better in downturns
            newReturn += (effect.trend < 0 ? 5 : -2);
            break;
          case 'trend':
            // Trend following works in clear trends
            newReturn += Math.abs(effect.trend) * 0.3;
            break;
          case 'ml':
            // ML alpha might be positive in any scenario but suffers in high vol
            newReturn += 2 - (effect.volatility * 0.1);
            break;
          case 'volatility':
            // Vol strategies benefit from volatility
            newReturn += (effect.volatility - 15) * 0.5;
            break;
        }
        
        // Update Sharpe ratio
        const newSharpe = newReturn / (strategy.volatility * (1 + (effect.volatility - 15) / 100));
        
        return {
          ...strategy,
          return: parseFloat(newReturn.toFixed(1)),
          sharpe: parseFloat(newSharpe.toFixed(2))
        };
      });
      
      return { strategies: updatedStrategies };
    });
    
    // If autopilot is on, adjust allocation
    if (get().settings.autopilot) {
      get().adjustAllocation();
    }
    
    // Update performance data
    set((state) => ({
      performanceData: {
        '1M': createPerformanceData(30, 10000000, effect.trend, effect.volatility),
        '3M': createPerformanceData(90, 9500000, effect.trend, effect.volatility),
        '1Y': createPerformanceData(252, 8700000, effect.trend, effect.volatility),
        'ALL': createPerformanceData(756, 5000000, effect.trend, effect.volatility),
      },
      riskData: createRiskData(90, 2 + (effect.volatility / 10), effect.trend)
    }));
  },
  
  toggleAutopilot: () => {
    set((state) => ({
      settings: {
        ...state.settings,
        autopilot: !state.settings.autopilot
      }
    }));
  },
  
  updateSettings: (newSettings) => {
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings
      }
    }));
  }
}));
