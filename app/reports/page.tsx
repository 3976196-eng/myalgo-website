"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const monthlyPLData = [
  { month: "Jan", profit: 12500, loss: 0 },
  { month: "Feb", profit: 0, loss: -8200 },
  { month: "Mar", profit: 18900, loss: 0 },
  { month: "Apr", profit: 15600, loss: 0 },
  { month: "May", profit: 0, loss: -5400 },
  { month: "Jun", profit: 22100, loss: 0 },
  { month: "Jul", profit: 19800, loss: 0 },
  { month: "Aug", profit: 0, loss: -3200 },
  { month: "Sep", profit: 28500, loss: 0 },
  { month: "Oct", profit: 16700, loss: 0 },
  { month: "Nov", profit: 0, loss: -7800 },
  { month: "Dec", profit: 24300, loss: 0 },
]

const weeklyPerformance = [
  { week: "Week 1", trades: 24, winRate: "72%", pnl: 8450, avgTrade: 352 },
  { week: "Week 2", trades: 31, winRate: "68%", pnl: 12200, avgTrade: 394 },
  { week: "Week 3", trades: 18, winRate: "56%", pnl: -2100, avgTrade: -117 },
  { week: "Week 4", trades: 27, winRate: "74%", pnl: 15800, avgTrade: 585 },
]

const tradeLog = [
  { date: "2024-01-15", stock: "RELIANCE", strategy: "RSI + MACD", entry: 2450.50, exit: 2498.75, pnl: 4825, duration: "2h 15m" },
  { date: "2024-01-15", stock: "NIFTY 50", strategy: "EMA Crossover", entry: 21850.00, exit: 21920.50, pnl: 3525, duration: "45m" },
  { date: "2024-01-14", stock: "BANK NIFTY", strategy: "RSI + MACD", entry: 46200.00, exit: 46050.25, pnl: -3744, duration: "1h 30m" },
  { date: "2024-01-14", stock: "TCS", strategy: "Supertrend", entry: 3850.00, exit: 3892.50, pnl: 2125, duration: "3h 10m" },
  { date: "2024-01-13", stock: "HDFC BANK", strategy: "EMA Crossover", entry: 1625.00, exit: 1658.75, pnl: 3375, duration: "1h 45m" },
  { date: "2024-01-13", stock: "INFOSYS", strategy: "RSI + MACD", entry: 1485.50, exit: 1462.25, pnl: -2325, duration: "2h 00m" },
  { date: "2024-01-12", stock: "NIFTY 50", strategy: "Supertrend", entry: 21720.00, exit: 21795.50, pnl: 3775, duration: "55m" },
  { date: "2024-01-12", stock: "RELIANCE", strategy: "EMA Crossover", entry: 2420.00, exit: 2468.25, pnl: 4825, duration: "2h 30m" },
]

const winLossData = [
  { name: "Wins", value: 68, color: "#00C853" },
  { name: "Losses", value: 32, color: "#ef4444" },
]

export default function ReportsPage() {
  const [dateFrom, setDateFrom] = useState("2024-01-01")
  const [dateTo, setDateTo] = useState("2024-01-31")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground">Analyze your trading performance</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range */}
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-transparent text-sm text-foreground outline-none"
              />
              <span className="text-muted-foreground">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-transparent text-sm text-foreground outline-none"
              />
            </div>
            {/* Export Buttons */}
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Profit</p>
                  <p className="text-2xl font-bold text-green-500">+₹1,33,800</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-500">
                <ArrowUpRight className="h-4 w-4" />
                <span>+33.8% return</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Trades</p>
                  <p className="text-2xl font-bold text-foreground">156</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                106 wins, 50 losses
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Best Day</p>
                  <p className="text-2xl font-bold text-green-500">+₹28,500</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <ArrowUpRight className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                September 15, 2024
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Worst Day</p>
                  <p className="text-2xl font-bold text-red-500">-₹8,200</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                  <TrendingDown className="h-6 w-6 text-red-500" />
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                February 8, 2024
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Monthly P&L Bar Chart */}
          <Card className="border-border bg-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BarChart3 className="h-5 w-5 text-primary" />
                Monthly P&L
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyPLData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `₹${v/1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, value > 0 ? "Profit" : "Loss"]}
                    />
                    <Bar dataKey="profit" fill="#00C853" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="loss" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Win/Loss Pie Chart */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <PieChartIcon className="h-5 w-5 text-primary" />
                Win vs Loss Ratio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={winLossData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {winLossData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => <span className="text-foreground">{value}</span>}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Performance Table */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Week</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Trades</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Win Rate</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">P&L</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Avg Trade</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyPerformance.map((week, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-4 py-3 text-sm text-foreground">{week.week}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{week.trades}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{week.winRate}</td>
                      <td className={`px-4 py-3 text-sm font-medium ${week.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {week.pnl >= 0 ? "+" : ""}₹{week.pnl.toLocaleString()}
                      </td>
                      <td className={`px-4 py-3 text-sm ${week.avgTrade >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {week.avgTrade >= 0 ? "+" : ""}₹{week.avgTrade.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Trade Log Table */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Trade Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Stock</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Strategy</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Entry Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Exit Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">P&L</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeLog.map((trade, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-4 py-3 text-sm text-foreground">{trade.date}</td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{trade.stock}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{trade.strategy}</td>
                      <td className="px-4 py-3 text-sm text-foreground">₹{trade.entry.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-foreground">₹{trade.exit.toFixed(2)}</td>
                      <td className={`px-4 py-3 text-sm font-medium ${trade.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {trade.pnl >= 0 ? "+" : ""}₹{trade.pnl.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{trade.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
