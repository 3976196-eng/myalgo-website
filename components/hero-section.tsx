"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play, TrendingUp, BarChart3, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              No coding required
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
            Trade Smarter with{" "}
            <span className="text-primary">Algorithm</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
            Build, backtest, and deploy algorithmic trading strategies without
            writing a single line of code. Automate your trades and maximize
            your profits.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary px-8 py-6 text-lg"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { value: "50K+", label: "Active Traders" },
              { value: "₹100Cr+", label: "Daily Volume" },
              { value: "99.9%", label: "Uptime" },
              { value: "15+", label: "Broker Integrations" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-3xl" />
          <div className="relative bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-2xl">
            {/* Window Controls */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-sm text-muted-foreground">
                MyAlgo Dashboard
              </span>
            </div>

            {/* Mock Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Chart Area */}
              <div className="md:col-span-2 bg-secondary/50 rounded-lg p-4 h-48 sm:h-64">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">NIFTY 50</span>
                    <span className="text-primary text-sm">+2.34%</span>
                  </div>
                  <div className="flex gap-2">
                    {["1D", "1W", "1M", "1Y"].map((period) => (
                      <button
                        key={period}
                        className="px-2 py-1 text-xs rounded bg-secondary text-muted-foreground hover:text-foreground"
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Mock Chart Lines */}
                <div className="relative h-32 sm:h-44">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 400 150"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="chartGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="oklch(0.72 0.19 145)"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="oklch(0.72 0.19 145)"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,100 Q50,80 100,90 T200,60 T300,70 T400,40"
                      fill="none"
                      stroke="oklch(0.72 0.19 145)"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,100 Q50,80 100,90 T200,60 T300,70 T400,40 L400,150 L0,150 Z"
                      fill="url(#chartGradient)"
                    />
                  </svg>
                </div>
              </div>

              {/* Side Stats */}
              <div className="space-y-4">
                {[
                  {
                    label: "Total Profit",
                    value: "₹1,24,500",
                    change: "+12.5%",
                    icon: TrendingUp,
                  },
                  {
                    label: "Win Rate",
                    value: "73.2%",
                    change: "+5.2%",
                    icon: BarChart3,
                  },
                  {
                    label: "Active Strategies",
                    value: "8",
                    change: "Running",
                    icon: Zap,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-secondary/50 rounded-lg p-4 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="font-semibold text-foreground">
                        {item.value}
                      </div>
                      <div className="text-xs text-primary">{item.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
