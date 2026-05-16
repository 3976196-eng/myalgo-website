"use client"

import { useState } from "react"
import { 
  Link2, 
  Link2Off, 
  Shield, 
  Eye, 
  EyeOff, 
  HelpCircle, 
  CheckCircle2, 
  X,
  ExternalLink,
  Wallet,
  TrendingUp,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard/layout"

const brokers = [
  { id: "angelone", name: "Angel One", popular: true },
  { id: "zerodha", name: "Zerodha Kite", popular: false },
  { id: "fyers", name: "Fyers", popular: false },
  { id: "upstox", name: "Upstox", popular: false },
  { id: "5paisa", name: "5Paisa", popular: false },
  { id: "iifl", name: "IIFL Securities", popular: false },
]

const connectedBroker = {
  id: "angelone",
  name: "Angel One",
  account: "Abhishek Sharma",
  clientId: "A12345678",
  margin: 50000,
  todayPnl: 2450,
  connectedAt: "2024-01-15",
}

export default function BrokerConnectionPage() {
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null)
  const [showApiKey, setShowApiKey] = useState(false)
  const [showSecretKey, setShowSecretKey] = useState(false)
  const [showTotpKey, setShowTotpKey] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
      setSelectedBroker(null)
    }, 2000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Connect Your Broker</h1>
          <p className="text-muted-foreground mt-1">
            Link your trading account to start automated trading
          </p>
        </div>

        {/* Connected Broker Section */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center">
                <span className="text-xl font-bold text-primary">AO</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{connectedBroker.name}</h3>
                  <span className="flex items-center gap-1 text-xs text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Connected
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Connected since {new Date(connectedBroker.connectedAt).toLocaleDateString("en-IN", { 
                    day: "numeric", 
                    month: "short", 
                    year: "numeric" 
                  })}
                </p>
              </div>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setShowDisconnectConfirm(true)}
            >
              <Link2Off className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>

          {/* Account Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="rounded-lg bg-card border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <User className="w-4 h-4" />
                <span className="text-xs">Account Name</span>
              </div>
              <p className="font-semibold text-foreground">{connectedBroker.account}</p>
              <p className="text-xs text-muted-foreground">ID: {connectedBroker.clientId}</p>
            </div>

            <div className="rounded-lg bg-card border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Wallet className="w-4 h-4" />
                <span className="text-xs">Available Margin</span>
              </div>
              <p className="font-semibold text-foreground">
                ₹{connectedBroker.margin.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-muted-foreground">Updated just now</p>
            </div>

            <div className="rounded-lg bg-card border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs">Today&apos;s P&L</span>
              </div>
              <p className={`font-semibold ${connectedBroker.todayPnl >= 0 ? "text-primary" : "text-red-500"}`}>
                {connectedBroker.todayPnl >= 0 ? "+" : ""}₹{connectedBroker.todayPnl.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-muted-foreground">
                {connectedBroker.todayPnl >= 0 ? "+4.9%" : "-4.9%"} return
              </p>
            </div>

            <div className="rounded-lg bg-card border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-xs">Status</span>
              </div>
              <p className="font-semibold text-primary">Active</p>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </div>
          </div>
        </div>

        {/* Disconnect Confirmation Modal */}
        {showDisconnectConfirm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-foreground mb-2">Disconnect Broker?</h3>
              <p className="text-muted-foreground text-sm mb-6">
                This will stop all active strategies and disconnect your Angel One account. 
                You can reconnect anytime.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowDisconnectConfirm(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={() => setShowDisconnectConfirm(false)}>
                  Disconnect
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Supported Brokers Grid */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Add Another Broker</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brokers.map((broker) => (
              <div
                key={broker.id}
                className={`relative rounded-xl border p-5 transition-all cursor-pointer ${
                  selectedBroker === broker.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                } ${broker.id === connectedBroker.id ? "opacity-50 pointer-events-none" : ""}`}
                onClick={() => broker.id !== connectedBroker.id && setSelectedBroker(broker.id)}
              >
                {broker.popular && (
                  <span className="absolute -top-2 right-4 px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                    Most Popular
                  </span>
                )}
                {broker.id === connectedBroker.id && (
                  <span className="absolute -top-2 right-4 px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full">
                    Connected
                  </span>
                )}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center">
                    <span className="text-sm font-bold text-foreground">
                      {broker.name.split(" ")[0].substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{broker.name}</h3>
                    <p className="text-xs text-muted-foreground">Trading & Demat Account</p>
                  </div>
                  {selectedBroker === broker.id ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <Link2 className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connection Form */}
        {selectedBroker && (
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground">
                  Connect {brokers.find(b => b.id === selectedBroker)?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enter your API credentials to connect
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedBroker(null)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid gap-4 max-w-lg">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  API Key
                </label>
                <div className="relative">
                  <Input
                    type={showApiKey ? "text" : "password"}
                    placeholder="Enter your API key"
                    className="pr-10 bg-muted border-border"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Secret Key
                </label>
                <div className="relative">
                  <Input
                    type={showSecretKey ? "text" : "password"}
                    placeholder="Enter your secret key"
                    className="pr-10 bg-muted border-border"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowSecretKey(!showSecretKey)}
                  >
                    {showSecretKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Client ID
                </label>
                <Input
                  type="text"
                  placeholder="Enter your client ID"
                  className="bg-muted border-border"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  TOTP Key (Optional)
                </label>
                <div className="relative">
                  <Input
                    type={showTotpKey ? "text" : "password"}
                    placeholder="Enter your TOTP key for auto-login"
                    className="pr-10 bg-muted border-border"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowTotpKey(!showTotpKey)}
                  >
                    {showTotpKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleConnect}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4 mr-2" />
                      Connect Broker
                    </>
                  )}
                </Button>
                <a 
                  href="#" 
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <HelpCircle className="w-4 h-4" />
                  How to get API Key?
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Security Note */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Your Data is Secure</h3>
              <p className="text-sm text-muted-foreground">
                Your API keys are encrypted using AES-256 encryption and stored securely. 
                We never store your trading password or have access to withdraw funds from your account. 
                All connections are made over secure HTTPS.
              </p>
              <div className="flex flex-wrap gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  256-bit Encryption
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  SOC 2 Compliant
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  No Withdrawal Access
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="#" className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors group">
            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
              Getting Started Guide
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              Learn how to connect your broker in 5 minutes
            </p>
          </a>
          <a href="#" className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors group">
            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
              Supported Brokers
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              View all supported brokers and their features
            </p>
          </a>
          <a href="#" className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors group">
            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
              Troubleshooting
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              Common issues and how to resolve them
            </p>
          </a>
        </div>
      </div>
    </DashboardLayout>
  )
}
