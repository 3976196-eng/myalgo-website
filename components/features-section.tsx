import {
  Blocks,
  LineChart,
  FileText,
  Zap,
  BarChart3,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    icon: Blocks,
    title: "Strategy Builder",
    description:
      "Build complex trading strategies using our visual drag-and-drop interface. No coding required.",
  },
  {
    icon: LineChart,
    title: "Backtesting Engine",
    description:
      "Test your strategies against historical data with our powerful backtesting engine.",
  },
  {
    icon: FileText,
    title: "Paper Trading",
    description:
      "Practice your strategies with virtual money before going live. Zero risk learning.",
  },
  {
    icon: Zap,
    title: "Live Trading",
    description:
      "Deploy your strategies to live markets with one click. Fully automated execution.",
  },
  {
    icon: BarChart3,
    title: "All Indicators",
    description:
      "Access 100+ technical indicators including RSI, MACD, Bollinger Bands, and more.",
  },
  {
    icon: MessageCircle,
    title: "Telegram Alerts",
    description:
      "Get instant notifications on your phone via Telegram for all trade activities.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="text-primary">Automate Trading</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful tools designed for both beginners and professional traders
            to create, test, and deploy winning strategies.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
