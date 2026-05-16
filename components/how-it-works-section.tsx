import { Link2, Blocks, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Connect Broker",
    description:
      "Link your trading account with any of our 15+ supported brokers in just a few clicks. Secure API integration.",
  },
  {
    number: "02",
    icon: Blocks,
    title: "Build Strategy",
    description:
      "Use our visual strategy builder to create your trading logic. Backtest with historical data to validate performance.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Deploy & Profit",
    description:
      "Go live with one click. Your strategy runs 24/7 on our cloud servers. Sit back and watch your profits grow.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Start Trading in{" "}
            <span className="text-primary">3 Simple Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting started with algorithmic trading has never been easier.
            Follow these simple steps to automate your trading journey.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector Line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-border" />
              )}

              {/* Step Content */}
              <div className="relative z-10">
                {/* Number Badge */}
                <div className="inline-flex items-center justify-center w-32 h-32 bg-card border-2 border-border rounded-full mb-6 relative">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
