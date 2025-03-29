
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { usePortfolioStore } from '../store/portfolioStore';
import { FastForward, ArrowDownUp, BadgeAlert, Activity } from 'lucide-react';

const Controls = () => {
  const { simulateMarketChange, toggleAutopilot, settings, updateSettings } = usePortfolioStore();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulation Controls</CardTitle>
        <CardDescription>Adjust market conditions and agent behavior</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Market Volatility</label>
                <span className="text-sm">{settings.volatility}%</span>
              </div>
              <Slider 
                value={[settings.volatility]} 
                min={5} 
                max={40} 
                step={1}
                onValueChange={(value) => updateSettings({ volatility: value[0] })}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Market Trend</label>
                <span className="text-sm">{settings.trend > 0 ? '+' : ''}{settings.trend}%</span>
              </div>
              <Slider 
                value={[settings.trend]} 
                min={-20} 
                max={20} 
                step={1}
                onValueChange={(value) => updateSettings({ trend: value[0] })}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Strategy Correlation</label>
                <span className="text-sm">{settings.correlation.toFixed(2)}</span>
              </div>
              <Slider 
                value={[settings.correlation * 100]} 
                min={-100} 
                max={100} 
                step={5}
                onValueChange={(value) => updateSettings({ correlation: value[0] / 100 })}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <label className="text-sm font-medium">DRL Agent Autopilot</label>
              </div>
              <Switch 
                checked={settings.autopilot}
                onCheckedChange={() => toggleAutopilot()}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BadgeAlert className="h-4 w-4" />
                <label className="text-sm font-medium">Risk Management</label>
              </div>
              <Switch 
                checked={settings.riskManagement}
                onCheckedChange={(checked) => updateSettings({ riskManagement: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowDownUp className="h-4 w-4" />
                <label className="text-sm font-medium">Allow Leverage</label>
              </div>
              <Switch 
                checked={settings.allowLeverage}
                onCheckedChange={(checked) => updateSettings({ allowLeverage: checked })}
              />
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <div>
                <p className="text-sm font-medium">Simulation Speed</p>
                <p className="text-xs text-muted-foreground">Current: {settings.simulationSpeed}x</p>
              </div>
              <div className="flex gap-2">
                {[1, 2, 5, 10].map((speed) => (
                  <Button
                    key={speed}
                    variant={settings.simulationSpeed === speed ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSettings({ simulationSpeed: speed })}
                  >
                    {speed}x
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm font-medium">Market Scenarios</p>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="border-red-500/30 hover:border-red-500/50 text-red-500 h-auto py-4 flex flex-col items-center"
                onClick={() => simulateMarketChange('crash')}
              >
                <span className="text-lg mb-1">📉</span>
                <span className="text-sm">Market Crash</span>
                <span className="text-xs text-muted-foreground">-15% to -25%</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-orange-500/30 hover:border-orange-500/50 text-orange-500 h-auto py-4 flex flex-col items-center"
                onClick={() => simulateMarketChange('correction')}
              >
                <span className="text-lg mb-1">↘️</span>
                <span className="text-sm">Correction</span>
                <span className="text-xs text-muted-foreground">-5% to -10%</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-green-500/30 hover:border-green-500/50 text-green-500 h-auto py-4 flex flex-col items-center"
                onClick={() => simulateMarketChange('rally')}
              >
                <span className="text-lg mb-1">📈</span>
                <span className="text-sm">Bull Rally</span>
                <span className="text-xs text-muted-foreground">+5% to +15%</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-purple-500/30 hover:border-purple-500/50 text-purple-500 h-auto py-4 flex flex-col items-center"
                onClick={() => simulateMarketChange('volatility')}
              >
                <span className="text-lg mb-1">↕️</span>
                <span className="text-sm">High Volatility</span>
                <span className="text-xs text-muted-foreground">±8% swings</span>
              </Button>
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={() => simulateMarketChange('random')}
            >
              <FastForward className="mr-2 h-4 w-4" />
              Fast Forward 30 Days
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Controls;
