"use client"

import Link from "next/link"
import { useState } from "react"
import { TrendingUp, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">MyAlgo</span>
        </Link>

        {!isSubmitted ? (
          <>
            {/* Back to Login */}
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Forgot password?</h1>
              <p className="text-muted-foreground">
                No worries, we&apos;ll send you reset instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Reset password
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </>
        ) : (
          <div className="text-center">
            {/* Success State */}
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-2">Check your email</h1>
            <p className="text-muted-foreground mb-8">
              We sent a password reset link to
              <br />
              <span className="text-foreground font-medium">{email}</span>
            </p>

            <Button
              asChild
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mb-6"
            >
              <Link href="https://mail.google.com" target="_blank">
                Open email app
              </Link>
            </Button>

            <p className="text-sm text-muted-foreground mb-4">
              Didn&apos;t receive the email?{" "}
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-primary hover:underline font-medium"
              >
                Click to resend
              </button>
            </p>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        )}

        {/* Security Note */}
        <div className="mt-12 p-4 bg-card rounded-lg border border-border">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Security tip</p>
              <p className="text-xs text-muted-foreground">
                We&apos;ll never ask for your password via email. If you didn&apos;t request a password reset, please ignore the email or contact support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
