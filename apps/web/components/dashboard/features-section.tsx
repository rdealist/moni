import { Target, Briefcase, BarChart2 } from "lucide-react";
import { FeatureCard } from "../ui/feature-card";

export function FeaturesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      <FeatureCard
        icon={Target}
        iconVariant="blue"
        title="Investment Goals"
        description="Define your financial targets and track progress with precision tools designed for sustainable growth."
        buttonVariant="blue"
      />
      <FeatureCard
        icon={Briefcase}
        iconVariant="mint"
        title="Portfolio"
        description="Manage your assets across multiple classes with real-time tracking and automated rebalancing."
        buttonVariant="mint"
      />
      <FeatureCard
        icon={BarChart2}
        iconVariant="peach"
        title="Market Analysis"
        description="Deep dive into market trends with advanced analytics and expert insights to guide your decisions."
        buttonVariant="peach"
      />
    </div>
  );
}
