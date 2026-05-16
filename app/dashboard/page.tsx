"use client"

import {
  Link2,
  Link2Off,
  TrendingUp,
  TrendingDown,
  Wallet,
  Activity,
  Play,
  Square,
  AlertOctagon,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard/layout"
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

// Mock NIFTY 50 chart data
const niftyData = [
  { time: "09:15", price: 22450 },
  { time: "09:30", price: 22480 },
  { time: "09:45", price: 22510 },
  { time: "10:00", price: 22495 },
  { time: "10:15", price: 22530 },
  { time: "10:30", price: 22565 },
  { time: "10:45", price: 22540 },
  { time: "11:00", price: 22580 },
  { time: "11:15", price: 22620 },
  { time: "11:30", price: 22595 },
  { time: "11:45", price: 22640 },
  { time: "12:00", price: 22670 },
  { time: "12:15", price: 22655 },
  { time: "12:30", price: 22690 },
  { time: "12:45", price: 22720 },
  { time: "13:00", price: 22705 },
  { time: "13:15", price: 22750 },
  { time: "13:30", price: 22780 },
]

// Mock recent trades
const recentTrades = [
  {
    id: 1,
    symbol: "RELIANCE",
    type: "BUY",
    quantity: 50,
    price: 2456.75,
    time: "13:25:30",
    pnl: 1250.0,
  },
  {
    id: 2,
    symbol: "NIFTY 24500 CE",
    type: "SELL",
    quantity: 25,
    price: 185.5,
    time: "13:15:45",
    pnl: -450.0,
  },
  {
    id: 3,
    symbol: "HDFCBANK",
    type: "BUY",
    quantity: 100,
    price: 1678.3,
    time: "12:45:20",
    pnl: 890.0,
  },
  {
    id: 4,
    symbol: "INFY",
    type: "SELL",
    quantity: 75,
    price: 1425.6,
    time: "12:30:15",
    pnl: 1560.0,
  },
  {
    id: 5,
    symbol: "BANKNIFTY 51000 PE",
    type: "BUY",
    quantity: 15,
    price: 245.0,
    time: "11:55:00",
    pnl: -320.0,
  },
  {
    id: 6,
    symbol: "TCS",
    type: "BUY",
    quantity: 30,
    price: 3890.25,
    time: "11:20:40",
    pnl: 780.0,
  },
]

export default function DashboardPage() {
  const isConnected = true
  const todayPnL = 12450.5
  const portfolioValue = 485620.75
  const activeStrategies = 3

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Play className="h-4 w-4" />
            Start Trading Engine
          </Button>
          <Button variant="outline" className="gap-2 border-muted-foreground/30">
            <Square className="h-4 w-4" />
            Stop Trading
          </Button>
          <Button variant="destructive" className="gap-2">
            <AlertOctagon className="h-4 w-4" />
            Emergency Stop
          </Button>
          <Button variant="ghost" size="icon" className="ml-auto" title="Refresh Data">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Broker Connection */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Broker Status</span>
              {isConnected ? (
                <Link2 className="h-5 w-5 text-primary" />
              ) : (
                <Link2Off className="h-5 w-5 text-destructive" />
              )}
            </div>
            <div className="mt-3">
              <p className="text-lg font-semibold text-foreground">Angel One</p>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${isConnected ? "bg-primary animate-pulse" : "bg-destructive"}`}
                />
                <span className={`text-sm ${isConnected ? "text-primary" : "text-destructive"}`}>
                  {isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>
            {!isConnected && (
              <Button size="sm" className="mt-3 w-full">
                Reconnect
              </Button>
            )}
          </div>

          {/* Live P&L */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Today&apos;s P&L</span>
              {todayPnL >= 0 ? (
                <TrendingUp className="h-5 w-5 text-primary" />
              ) : (
                <TrendingDown className="h-5 w-5 text-destructive" />
              )}
            </div>
            <div className="mt-3">
              <p
                className={`text-2xl font-bold ${todayPnL >= 0 ? "text-primary" : "text-destructive"}`}
              >
                {todayPnL >= 0 ? "+" : ""}₹{todayPnL.toLocaleString("en-IN")}
              </p>
              <div className="mt-1 flex items-center gap-1 text-sm">
                {todayPnL >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-destructive" />
                )}
                <span className={todayPnL >= 0 ? "text-primary" : "text-destructive"}>
                  {todayPnL >= 0 ? "+2.56%" : "-2.56%"}
                </span>
                <span className="text-muted-foreground">vs yesterday</span>
              </div>
            </div>
          </div>

          {/* Portfolio Value */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Portfolio Value</span>
              <Wallet className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-foreground">
                ₹{portfolioValue.toLocaleString("en-IN")}
              </p>
              <div className="mt-1 flex items-center gap-1 text-sm">
                <ArrowUpRight className="h-4 w-4 text-primary" />
                <span className="text-primary">+5.2%</span>
                <span className="text-muted-foreground">this month</span>
              </div>
            </div>
          </div>

          {/* Active Strategies */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Active Strategies</span>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-foreground">{activeStrategies}</p>
              <div className="mt-1 text-sm text-muted-foreground">
                <span className="text-primary">2 profitable</span> · 1 neutral
              </div>
            </div>
          </div>
        </div>

        {/* Chart and Trades Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* NIFTY 50 Chart */}
          <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">NIFTY 50</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-2xl font-bold text-foreground">22,780.50</span>
                  <span className="flex items-center gap-1 text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                    +330.50 (+1.47%)
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {["1D", "1W", "1M", "3M"].map((period) => (
                  <button
                    key={period}
                    className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                      period === "1D"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={niftyData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00C853" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00C853" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#888", fontSize: 12 }}
                  />
                  <YAxis
                    domain={["dataMin - 50", "dataMax + 50"]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#888", fontSize: 12 }}
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#888" }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, "Price"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#00C853"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mini Stats */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                Today&apos;s Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Trades</span>
                  <span className="font-semibold text-foreground">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Win Rate</span>
                  <span className="font-semibold text-primary">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Profit</span>
                  <span className="font-semibold text-primary">₹518</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Loss</span>
                  <span className="font-semibold text-destructive">₹245</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Max Drawdown</span>
                  <span className="font-semibold text-foreground">-₹1,850</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">Strategy Performance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">NIFTY Scalper</span>
                  <span className="text-sm font-medium text-primary">+₹5,240</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div className="h-1.5 w-3/4 rounded-full bg-primary" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Options Swing</span>
                  <span className="text-sm font-medium text-primary">+₹4,890</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div className="h-1.5 w-2/3 rounded-full bg-primary" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Momentum Trader</span>
                  <span className="text-sm font-medium text-primary">+₹2,320</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div className="h-1.5 w-1/2 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Trades Table */}
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Trades</h3>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Symbol
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Type
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Qty
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Price
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Time
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    P&L
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentTrades.map((trade) => (
                  <tr key={trade.id} className="transition-colors hover:bg-muted/50">
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="font-medium text-foreground">{trade.symbol}</span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          trade.type === "BUY"
                            ? "bg-primary/10 text-primary"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {trade.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {trade.quantity}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-foreground">
                      ₹{trade.price.toLocaleString("en-IN")}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {trade.time}
                    </td>
                    <td
                      className={`whitespace-nowrap px-5 py-4 text-right font-medium ${
                        trade.pnl >= 0 ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {trade.pnl >= 0 ? "+" : ""}₹{trade.pnl.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
