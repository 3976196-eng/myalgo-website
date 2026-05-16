"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Play,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
  Calendar,
  IndianRupee,
  Activity,
  Award,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

const strategies = [
  { id: "1", name: "My RSI + MACD Strategy" },
  { id: "2", name: "EMA Crossover Strategy" },
  { id: "3", name: "Supertrend + VWAP Strategy" },
  { id: "4", name: "Bollinger Band Breakout" },
]

const stocks = [
  { id: "nifty", name: "NIFTY 50", symbol: "NIFTY" },
  { id: "banknifty", name: "BANK NIFTY", symbol: "BANKNIFTY" },
  { id: "reliance", name: "Reliance Industries", symbol: "RELIANCE" },
  { id: "tcs", name: "TCS", symbol: "TCS" },
  { id: "hdfc", name: "HDFC Bank", symbol: "HDFCBANK" },
  { id: "infy", name: "Infosys", symbol: "INFY" },
]

// Sample portfolio growth data
const portfolioData = [
  { date: "Jan", value: 100000, drawdown: 0 },
  { date: "Feb", value: 108500, drawdown: -2.1 },
  { date: "Mar", value: 105200, drawdown: -5.8 },
  { date: "Apr", value: 118900, drawdown: 0 },
  { date: "May", value: 125600, drawdown: -1.2 },
  { date: "Jun", value: 122400, drawdown: -4.5 },
  { date: "Jul", value: 138200, drawdown: 0 },
  { date: "Aug", value: 145800, drawdown: -0.8 },
  { date: "Sep", value: 142100, drawdown: -3.2 },
  { date: "Oct", value: 158900, drawdown: 0 },
  { date: "Nov", value: 165400, drawdown: -1.5 },
  { date: "Dec", value: 178500, drawdown: 0 },
]

// Monthly returns data for heatmap
const monthlyReturns = [
  { year: "2024", jan: 8.5, feb: -3.0, mar: 13.0, apr: 5.6, may: -2.5, jun: 12.9, jul: 5.5, aug: -2.5, sep: 11.8, oct: 4.1, nov: 7.9, dec: null },
  { year: "2023", jan: 5.2, feb: 8.1, mar: -4.2, apr: 6.8, may: 3.2, jun: -1.8, jul: 9.5, aug: 2.1, sep: -3.5, oct: 7.2, nov: 4.8, dec: 6.1 },
  { year: "2022", jan: -2.1, feb: 4.5, mar: 7.8, apr: -1.2, may: 5.6, jun: 8.2, jul: -3.4, aug: 6.1, sep: 2.8, oct: -0.8, nov: 9.2, dec: 3.5 },
]

// Trade history data
const tradeHistory = [
  { id: 1, date: "2024-12-15", type: "BUY", symbol: "NIFTY", price: 24150.50, quantity: 50, pnl: 12500, status: "Closed" },
  { id: 2, date: "2024-12-14", type: "SELL", symbol: "NIFTY", price: 24320.75, quantity: 50, pnl: 8750, status: "Closed" },
  { id: 3, date: "2024-12-13", type: "BUY", symbol: "NIFTY", price: 24080.25, quantity: 75, pnl: -3200, status: "Closed" },
  { id: 4, date: "2024-12-12", type: "SELL", symbol: "NIFTY", price: 24210.00, quantity: 75, pnl: 15600, status: "Closed" },
  { id: 5, date: "2024-12-11", type: "BUY", symbol: "NIFTY", price: 23980.50, quantity: 50, pnl: 9800, status: "Closed" },
  { id: 6, date: "2024-12-10", type: "SELL", symbol: "NIFTY", price: 24150.25, quantity: 50, pnl: -1850, status: "Closed" },
  { id: 7, date: "2024-12-09", type: "BUY", symbol: "NIFTY", price: 23850.00, quantity: 100, pnl: 22400, status: "Closed" },
  { id: 8, date: "2024-12-08", type: "SELL", symbol: "NIFTY", price: 24050.75, quantity: 100, pnl: 18200, status: "Closed" },
]

export default function BacktestingPage() {
  const [selectedStrategy, setSelectedStrategy] = useState("")
  const [selectedStock, setSelectedStock] = useState("")
  const [fromDate, setFromDate] = useState("2024-01-01")
  const [toDate, setToDate] = useState("2024-12-15")
  const [initialCapital, setInitialCapital] = useState("100000")
  const [isRunning, setIsRunning] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const runBacktest = () => {
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
      setShowResults(true)
    }, 2000)
  }

  const getReturnColor = (value: number | null) => {
    if (value === null) return "bg-muted/30 text-muted-foreground"
    if (value > 5) return "bg-primary/30 text-primary"
    if (value > 0) return "bg-primary/15 text-primary"
    if (value > -5) return "bg-destructive/15 text-destructive"
    return "bg-destructive/30 text-destructive"
  }

  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Backtesting</h1>
          <p className="text-muted-foreground">Test your strategies against historical data</p>
        </div>

        {/* Configuration Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Backtest Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {/* Strategy Selector */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Strategy</Label>
                <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    {strategies.map((strategy) => (
                      <SelectItem key={strategy.id} value={strategy.id}>
                        {strategy.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Stock Selector */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Stock / Index</Label>
                <Select value={selectedStock} onValueChange={setSelectedStock}>
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue placeholder="Select stock" />
                  </SelectTrigger>
                  <SelectContent>
                    {stocks.map((stock) => (
                      <SelectItem key={stock.id} value={stock.id}>
                        {stock.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* From Date */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">From Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="pl-10 bg-muted/50 border-border"
                  />
                </div>
              </div>

              {/* To Date */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">To Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="pl-10 bg-muted/50 border-border"
                  />
                </div>
              </div>

              {/* Initial Capital */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Initial Capital</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={initialCapital}
                    onChange={(e) => setInitialCapital(e.target.value)}
                    className="pl-10 bg-muted/50 border-border"
                    placeholder="1,00,000"
                  />
                </div>
              </div>

              {/* Run Button */}
              <div className="space-y-2">
                <Label className="text-sm text-transparent">Action</Label>
                <Button
                  onClick={runBacktest}
                  disabled={!selectedStrategy || !selectedStock || isRunning}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run Backtest
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Total P&L</span>
                    <span className="text-xl font-bold text-primary">+₹78,500</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Return %</span>
                    <span className="text-xl font-bold text-primary">+78.5%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Win Rate</span>
                    <span className="text-xl font-bold text-foreground">68.5%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Max Drawdown</span>
                    <span className="text-xl font-bold text-destructive">-8.2%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Total Trades</span>
                    <span className="text-xl font-bold text-foreground">156</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Best Trade</span>
                    <span className="text-xl font-bold text-primary">+₹22,400</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Worst Trade</span>
                    <span className="text-xl font-bold text-destructive">-₹8,500</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Sharpe Ratio</span>
                    <span className="text-xl font-bold text-foreground">1.85</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Portfolio Growth Chart */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Portfolio Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={portfolioData}>
                        <defs>
                          <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="oklch(0.7 0.2 142)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="oklch(0.7 0.2 142)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" />
                        <XAxis
                          dataKey="date"
                          stroke="oklch(0.5 0 0)"
                          tick={{ fill: "oklch(0.5 0 0)", fontSize: 12 }}
                        />
                        <YAxis
                          stroke="oklch(0.5 0 0)"
                          tick={{ fill: "oklch(0.5 0 0)", fontSize: 12 }}
                          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "oklch(0.15 0 0)",
                            border: "1px solid oklch(0.3 0 0)",
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: "oklch(0.9 0 0)" }}
                          formatter={(value: number) => [`₹${value.toLocaleString()}`, "Portfolio Value"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="oklch(0.7 0.2 142)"
                          strokeWidth={2}
                          fill="url(#portfolioGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Returns Heatmap */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    Monthly Returns Heatmap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          <th className="p-2 text-left text-muted-foreground font-medium">Year</th>
                          {monthLabels.map((month) => (
                            <th key={month} className="p-2 text-center text-muted-foreground font-medium">
                              {month}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyReturns.map((row) => (
                          <tr key={row.year}>
                            <td className="p-2 text-foreground font-medium">{row.year}</td>
                            {months.map((month) => {
                              const value = row[month as keyof typeof row] as number | null
                              return (
                                <td key={month} className="p-1">
                                  <div
                                    className={`p-2 text-center rounded text-xs font-medium ${getReturnColor(value)}`}
                                  >
                                    {value !== null ? `${value > 0 ? "+" : ""}${value}%` : "-"}
                                  </div>
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-primary/30" />
                      <span>{"> 5%"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-primary/15" />
                      <span>{"0-5%"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-destructive/15" />
                      <span>{"0 to -5%"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-destructive/30" />
                      <span>{"< -5%"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trade History Table */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    Trade History
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">Showing 8 of 156 trades</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Date</TableHead>
                        <TableHead className="text-muted-foreground">Symbol</TableHead>
                        <TableHead className="text-muted-foreground">Type</TableHead>
                        <TableHead className="text-muted-foreground text-right">Price</TableHead>
                        <TableHead className="text-muted-foreground text-right">Quantity</TableHead>
                        <TableHead className="text-muted-foreground text-right">P&L</TableHead>
                        <TableHead className="text-muted-foreground">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tradeHistory.map((trade) => (
                        <TableRow key={trade.id} className="border-border">
                          <TableCell className="text-foreground">{trade.date}</TableCell>
                          <TableCell className="text-foreground font-medium">{trade.symbol}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                trade.type === "BUY"
                                  ? "bg-primary/20 text-primary"
                                  : "bg-destructive/20 text-destructive"
                              }`}
                            >
                              {trade.type}
                            </span>
                          </TableCell>
                          <TableCell className="text-right text-foreground">
                            ₹{trade.price.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right text-foreground">{trade.quantity}</TableCell>
                          <TableCell
                            className={`text-right font-medium ${
                              trade.pnl >= 0 ? "text-primary" : "text-destructive"
                            }`}
                          >
                            {trade.pnl >= 0 ? "+" : ""}₹{trade.pnl.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                              {trade.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Profit Factor</p>
                      <p className="text-2xl font-bold text-foreground">2.45</p>
                      <p className="text-xs text-muted-foreground">Gross Profit / Gross Loss</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Trade Duration</p>
                      <p className="text-2xl font-bold text-foreground">2.5 hrs</p>
                      <p className="text-xs text-muted-foreground">Average holding period</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-destructive/10">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Max Consecutive Losses</p>
                      <p className="text-2xl font-bold text-foreground">4</p>
                      <p className="text-xs text-muted-foreground">Risk management check</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!showResults && !isRunning && (
          <Card className="bg-card border-border border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="p-4 rounded-full bg-muted/50 mb-4">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No Backtest Results</h3>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                Select a strategy, stock, and date range above, then click &quot;Run Backtest&quot; to see how your strategy would have performed historically.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
