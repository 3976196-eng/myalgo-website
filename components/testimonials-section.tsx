import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Day Trader",
    avatar: "RS",
    content:
      "MyAlgo has completely transformed my trading. I went from spending 8 hours watching charts to letting my strategies run automatically. My profits have increased by 40% since I started.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Swing Trader",
    avatar: "PP",
    content:
      "The backtesting feature is incredible. I was able to validate my strategy against 5 years of data before going live. The peace of mind this gives is invaluable.",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    role: "Options Trader",
    avatar: "AK",
    content:
      "As someone with no coding background, I was skeptical. But the visual strategy builder made it so easy to create complex option strategies. Highly recommended!",
    rating: 5,
  },
  {
    name: "Neha Gupta",
    role: "Portfolio Manager",
    avatar: "NG",
    content:
      "We manage multiple client portfolios and MyAlgo has helped us automate our risk management strategies. The telegram alerts keep us informed 24/7.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Crypto Trader",
    avatar: "VS",
    content:
      "The platform works flawlessly with my crypto exchanges. Running multiple strategies across different markets simultaneously has never been easier.",
    rating: 5,
  },
  {
    name: "Anjali Reddy",
    role: "Retail Investor",
    avatar: "AR",
    content:
      "Started with the free plan and upgraded to Pro within a week. The ROI on the subscription is incredible. Customer support is also very responsive.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trusted by <span className="text-primary">50,000+ Traders</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our community of traders has to say about their experience
            with MyAlgo.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
