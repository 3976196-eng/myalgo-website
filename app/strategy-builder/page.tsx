"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Save,
  Play,
  TrendingUp,
  Activity,
  BarChart3,
  Volume2,
  Settings2,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock backtest data
const backtestData = [
  { date: "Jan", value: 100000 },
  { date: "Feb", value: 108000 },
  { date: "Mar", value: 105000 },
  { date: "Apr", value: 115000 },
  { date: "May", value: 112000 },
  { date: "Jun", value: 125000 },
  { date: "Jul", value: 132000 },
  { date: "Aug", value: 128000 },
  { date: "Sep", value: 140000 },
  { date: "Oct", value: 152000 },
  { date: "Nov", value: 148000 },
  { date: "Dec", value: 165000 },
];

interface Indicator {
  id: string;
  name: string;
  enabled: boolean;
  settings: {
    [key: string]: number;
  };
}

interface IndicatorCategory {
  name: string;
  icon: React.ReactNode;
  expanded: boolean;
  indicators: Indicator[];
}

export default function StrategyBuilderPage() {
  const [strategyName, setStrategyName] = useState("My RSI + MACD Strategy");
  const [showBacktest, setShowBacktest] = useState(false);

  const [categories, setCategories] = useState<IndicatorCategory[]>([
    {
      name: "Trend Indicators",
      icon: <TrendingUp className="h-4 w-4" />,
      expanded: true,
      indicators: [
        { id: "ma", name: "Moving Average", enabled: false, settings: { period: 20 } },
        { id: "ema", name: "EMA", enabled: true, settings: { period: 12 } },
        { id: "supertrend", name: "Supertrend", enabled: false, settings: { period: 10, multiplier: 3 } },
        { id: "vwap", name: "VWAP", enabled: false, settings: {} },
      ],
    },
    {
      name: "Momentum",
      icon: <Activity className="h-4 w-4" />,
      expanded: true,
      indicators: [
        { id: "rsi", name: "RSI", enabled: true, settings: { period: 14, overbought: 70, oversold: 30 } },
        { id: "macd", name: "MACD", enabled: true, settings: { fast: 12, slow: 26, signal: 9 } },
        { id: "stochrsi", name: "Stochastic RSI", enabled: false, settings: { period: 14 } },
        { id: "cci", name: "CCI", enabled: false, settings: { period: 20 } },
        { id: "roc", name: "ROC", enabled: false, settings: { period: 12 } },
      ],
    },
    {
      name: "Volatility",
      icon: <BarChart3 className="h-4 w-4" />,
      expanded: false,
      indicators: [
        { id: "bb", name: "Bollinger Bands", enabled: false, settings: { period: 20, stdDev: 2 } },
        { id: "atr", name: "ATR", enabled: false, settings: { period: 14 } },
        { id: "keltner", name: "Keltner Channel", enabled: false, settings: { period: 20, multiplier: 2 } },
      ],
    },
    {
      name: "Volume",
      icon: <Volume2 className="h-4 w-4" />,
      expanded: false,
      indicators: [
        { id: "obv", name: "OBV", enabled: false, settings: {} },
        { id: "vwap2", name: "VWAP", enabled: false, settings: {} },
        { id: "mfi", name: "MFI", enabled: false, settings: { period: 14 } },
      ],
    },
  ]);

  const [entryCondition, setEntryCondition] = useState("rsi_below_30_macd_cross");
  const [exitCondition, setExitCondition] = useState("rsi_above_70");
  const [stopLoss, setStopLoss] = useState("1.5");
  const [target, setTarget] = useState("3");
  const [positionSize, setPositionSize] = useState("10000");

  const toggleCategory = (categoryIndex: number) => {
    setCategories((prev) =>
      prev.map((cat, i) =>
        i === categoryIndex ? { ...cat, expanded: !cat.expanded } : cat
      )
    );
  };

  const toggleIndicator = (categoryIndex: number, indicatorIndex: number) => {
    setCategories((prev) =>
      prev.map((cat, ci) =>
        ci === categoryIndex
          ? {
              ...cat,
              indicators: cat.indicators.map((ind, ii) =>
                ii === indicatorIndex ? { ...ind, enabled: !ind.enabled } : ind
              ),
            }
          : cat
      )
    );
  };

  const updateIndicatorSetting = (
    categoryIndex: number,
    indicatorIndex: number,
    settingKey: string,
    value: number
  ) => {
    setCategories((prev) =>
      prev.map((cat, ci) =>
        ci === categoryIndex
          ? {
              ...cat,
              indicators: cat.indicators.map((ind, ii) =>
                ii === indicatorIndex
                  ? { ...ind, settings: { ...ind.settings, [settingKey]: value } }
                  : ind
              ),
            }
          : cat
      )
    );
  };

  const removeIndicator = (categoryIndex: number, indicatorIndex: number) => {
    toggleIndicator(categoryIndex, indicatorIndex);
  };

  const enabledIndicators = categories.flatMap((cat, ci) =>
    cat.indicators
      .map((ind, ii) => ({ ...ind, categoryIndex: ci, indicatorIndex: ii }))
      .filter((ind) => ind.enabled)
  );

  const runBacktest = () => {
    setShowBacktest(true);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b border-border bg-card/50">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Input
              value={strategyName}
              onChange={(e) => setStrategyName(e.target.value)}
              className="bg-muted border-border text-foreground w-full sm:w-80"
              placeholder="Strategy Name"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="border-border flex-1 sm:flex-none">
              <Save className="h-4 w-4 mr-2" />
              Save Strategy
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 sm:flex-none"
              onClick={runBacktest}
            >
              <Play className="h-4 w-4 mr-2" />
              Run Backtest
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Panel - Indicators */}
          <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-border bg-card/30 overflow-y-auto max-h-64 lg:max-h-none">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Indicators
              </h3>
              <div className="space-y-2">
                {categories.map((category, categoryIndex) => (
                  <div key={category.name} className="border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleCategory(categoryIndex)}
                      className="w-full flex items-center justify-between p-3 bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-2 text-foreground">
                        {category.icon}
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      {category.expanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                    {category.expanded && (
                      <div className="p-2 space-y-1">
                        {category.indicators.map((indicator, indicatorIndex) => (
                          <div
                            key={indicator.id}
                            className="flex items-center justify-between p-2 rounded hover:bg-muted/30 transition-colors"
                          >
                            <span className="text-sm text-muted-foreground">
                              {indicator.name}
                            </span>
                            <Switch
                              checked={indicator.enabled}
                              onCheckedChange={() =>
                                toggleIndicator(categoryIndex, indicatorIndex)
                              }
                              className="data-[state=checked]:bg-primary"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Panel - Strategy Canvas */}
          <div className="flex-1 overflow-y-auto p-4 bg-background">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Strategy Canvas
            </h3>
            {enabledIndicators.length === 0 ? (
              <div className="flex items-center justify-center h-48 lg:h-64 border-2 border-dashed border-border rounded-lg">
                <p className="text-muted-foreground text-sm">
                  Enable indicators from the left panel to build your strategy
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enabledIndicators.map((indicator) => (
                  <div
                    key={indicator.id}
                    className="border border-border rounded-lg p-4 bg-card"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <h4 className="font-medium text-foreground">
                          {indicator.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-muted rounded transition-colors">
                          <Settings2 className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() =>
                            removeIndicator(
                              indicator.categoryIndex,
                              indicator.indicatorIndex
                            )
                          }
                          className="p-1 hover:bg-destructive/20 rounded transition-colors"
                        >
                          <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {Object.entries(indicator.settings).map(([key, value]) => (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </label>
                            <span className="text-xs font-medium text-foreground">
                              {value}
                            </span>
                          </div>
                          <Slider
                            value={[value]}
                            onValueChange={([newValue]) =>
                              updateIndicatorSetting(
                                indicator.categoryIndex,
                                indicator.indicatorIndex,
                                key,
                                newValue
                              )
                            }
                            min={1}
                            max={key === "stdDev" || key === "multiplier" ? 5 : 100}
                            step={key === "stdDev" || key === "multiplier" ? 0.5 : 1}
                            className="[&_[role=slider]]:bg-primary"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Panel - Conditions */}
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border bg-card/30 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Entry/Exit Conditions
              </h3>
              <div className="space-y-6">
                {/* Entry Condition */}
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">
                    Entry Condition
                  </label>
                  <Select value={entryCondition} onValueChange={setEntryCondition}>
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rsi_below_30_macd_cross">
                        RSI &lt; 30 AND MACD Crossover
                      </SelectItem>
                      <SelectItem value="rsi_below_30">RSI &lt; 30</SelectItem>
                      <SelectItem value="macd_crossover">MACD Crossover</SelectItem>
                      <SelectItem value="ema_crossover">EMA 12/26 Crossover</SelectItem>
                      <SelectItem value="supertrend_buy">Supertrend Buy Signal</SelectItem>
                      <SelectItem value="bb_lower">Price Below BB Lower</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Exit Condition */}
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">
                    Exit Condition
                  </label>
                  <Select value={exitCondition} onValueChange={setExitCondition}>
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rsi_above_70">RSI &gt; 70</SelectItem>
                      <SelectItem value="macd_crossunder">MACD Crossunder</SelectItem>
                      <SelectItem value="ema_crossunder">EMA Crossunder</SelectItem>
                      <SelectItem value="supertrend_sell">Supertrend Sell Signal</SelectItem>
                      <SelectItem value="bb_upper">Price Above BB Upper</SelectItem>
                      <SelectItem value="target_hit">Target Hit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Stop Loss */}
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">
                    Stop Loss (%)
                  </label>
                  <Input
                    type="number"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="bg-muted border-border"
                    placeholder="1.5"
                    step="0.1"
                  />
                </div>

                {/* Target */}
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">
                    Target (%)
                  </label>
                  <Input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="bg-muted border-border"
                    placeholder="3"
                    step="0.1"
                  />
                </div>

                {/* Position Size */}
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">
                    Position Size (INR)
                  </label>
                  <Input
                    type="number"
                    value={positionSize}
                    onChange={(e) => setPositionSize(e.target.value)}
                    className="bg-muted border-border"
                    placeholder="10000"
                    step="1000"
                  />
                </div>

                {/* Risk/Reward Display */}
                <div className="border border-border rounded-lg p-3 bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Risk/Reward</span>
                    <span className="text-sm font-medium text-primary">
                      1:{(parseFloat(target) / parseFloat(stopLoss)).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Max Risk</span>
                    <span className="text-sm font-medium text-destructive">
                      -₹{((parseFloat(positionSize) * parseFloat(stopLoss)) / 100).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Max Reward</span>
                    <span className="text-sm font-medium text-primary">
                      +₹{((parseFloat(positionSize) * parseFloat(target)) / 100).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel - Backtest Results */}
        {showBacktest && (
          <div className="border-t border-border bg-card/50 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">
                Backtest Results Preview
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBacktest(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Mini Chart */}
              <div className="flex-1 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={backtestData}>
                    <defs>
                      <linearGradient id="backtestGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00C853" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00C853" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 10 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 10 }}
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#9ca3af" }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, "Portfolio"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#00C853"
                      strokeWidth={2}
                      fill="url(#backtestGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:w-auto">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Total P&L</p>
                  <p className="text-lg font-bold text-primary">+₹65,000</p>
                  <p className="text-xs text-primary">+65%</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
                  <p className="text-lg font-bold text-foreground">68.5%</p>
                  <p className="text-xs text-muted-foreground">137/200 trades</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Max Drawdown</p>
                  <p className="text-lg font-bold text-destructive">-8.2%</p>
                  <p className="text-xs text-muted-foreground">₹8,200</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Sharpe Ratio</p>
                  <p className="text-lg font-bold text-foreground">1.85</p>
                  <p className="text-xs text-primary">Excellent</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
