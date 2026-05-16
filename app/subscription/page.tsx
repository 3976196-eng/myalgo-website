"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Check,
  Crown,
  Zap,
  Rocket,
  Star,
  CreditCard,
  Shield,
  Clock,
  Headphones,
} from "lucide-react"

const plans = [
  {
    name: "Free",
    icon: Star,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect to explore algo trading",
    features: [
      "1 strategy",
      "Paper trading only",
      "Basic indicators (5)",
      "Community support",
      "Limited backtesting",
    ],
    notIncluded: [
      "Live trading",
      "Telegram alerts",
      "Priority support",
    ],
    cta: "Current Plan",
    popular: false,
    current: true,
  },
  {
    name: "Starter",
    icon: Zap,
    monthlyPrice: 299,
    yearlyPrice: 2490,
    description: "For beginners starting their journey",
    features: [
      "3 strategies",
      "Paper trading",
      "All indicators (50+)",
      "Basic backtesting",
      "Email support",
      "Weekly reports",
    ],
    notIncluded: [
      "Live trading",
      "Telegram alerts",
    ],
    cta: "Upgrade",
    popular: false,
    current: false,
  },
  {
    name: "Pro",
    icon: Rocket,
    monthlyPrice: 499,
    yearlyPrice: 4990,
    description: "For serious traders",
    features: [
      "10 strategies",
      "Paper + Live trading",
      "All indicators (50+)",
      "Full backtesting",
      "Telegram alerts",
      "Priority email support",
      "Daily reports",
      "Strategy templates",
    ],
    notIncluded: [],
    cta: "Upgrade",
    popular: true,
    current: false,
  },
  {
    name: "Elite",
    icon: Crown,
    monthlyPrice: 999,
    yearlyPrice: 8990,
    description: "For professional traders",
    features: [
      "Unlimited strategies",
      "Paper + Live trading",
      "All indicators (50+)",
      "Advanced backtesting",
      "Telegram + WhatsApp alerts",
      "24/7 Priority support",
      "Real-time reports",
      "Custom indicators",
      "Auto trading",
      "API access",
      "Dedicated account manager",
    ],
    notIncluded: [],
    cta: "Upgrade",
    popular: false,
    current: false,
  },
]

export default function SubscriptionPage() {
  const [isYearly, setIsYearly] = useState(false)

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return "₹0"
    return isYearly
      ? `₹${plan.yearlyPrice.toLocaleString()}`
      : `₹${plan.monthlyPrice.toLocaleString()}`
  }

  const getPeriod = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return "/forever"
    return isYearly ? "/year" : "/month"
  }

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return null
    const yearlySavings = plan.monthlyPrice * 12 - plan.yearlyPrice
    return yearlySavings
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Choose Your Plan</h1>
          <p className="mt-2 text-muted-foreground">
            Unlock the full potential of algorithmic trading
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative h-7 w-14 rounded-full transition-colors ${
              isYearly ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                isYearly ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            Yearly
          </span>
          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-500">
            Save 2 months
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <Card
                key={plan.name}
                className={`relative border-border bg-card transition-transform hover:scale-[1.02] ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
                    plan.popular ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <Icon className={`h-7 w-7 ${plan.popular ? "text-primary" : "text-foreground"}`} />
                  </div>
                  <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Price */}
                  <div className="text-center">
                    <span className="text-4xl font-bold text-foreground">{getPrice(plan)}</span>
                    <span className="text-muted-foreground">{getPeriod(plan)}</span>
                    {isYearly && getSavings(plan) && (
                      <p className="mt-1 text-sm text-green-500">
                        Save ₹{getSavings(plan)?.toLocaleString()}/year
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 opacity-50">
                        <span className="mt-0.5 h-5 w-5 shrink-0 text-center text-muted-foreground">-</span>
                        <span className="text-sm text-muted-foreground line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={`w-full ${
                      plan.current
                        ? "bg-muted text-muted-foreground hover:bg-muted cursor-default"
                        : plan.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-card text-foreground border border-border hover:bg-muted"
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        {plan.cta}
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        {plan.cta}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Trust Badges */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Secure Payments</p>
              <p className="text-sm text-muted-foreground">256-bit SSL encryption</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Cancel Anytime</p>
              <p className="text-sm text-muted-foreground">No questions asked</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Headphones className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">24/7 Support</p>
              <p className="text-sm text-muted-foreground">We&apos;re here to help</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-between">
            <div>
              <p className="font-medium text-foreground">Accepted Payment Methods</p>
              <p className="text-sm text-muted-foreground">
                Pay securely with Razorpay - UPI, Cards, Net Banking, Wallets
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 items-center rounded bg-white px-3">
                <span className="text-sm font-bold text-blue-600">Razorpay</span>
              </div>
              <div className="flex h-10 items-center gap-2 rounded bg-muted px-3">
                <span className="text-xs text-foreground">UPI</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-xs text-foreground">Cards</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-xs text-foreground">Net Banking</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <p className="font-medium text-foreground">Can I switch plans later?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <p className="font-medium text-foreground">Is there a refund policy?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Yes, we offer a 7-day money-back guarantee if you&apos;re not satisfied with our service.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <p className="font-medium text-foreground">Do I need coding knowledge?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  No coding required! Our visual strategy builder makes algo trading accessible to everyone.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <p className="font-medium text-foreground">Which brokers are supported?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We support Angel One, Zerodha, Upstox, Fyers, and more brokers coming soon.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
