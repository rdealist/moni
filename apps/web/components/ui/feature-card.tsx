import { LucideIcon } from "lucide-react";
import { Button } from "@moni/ui/components/ui/button";
import { IconBadge } from "./icon-badge";
import { cn } from "@moni/ui/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  iconVariant: "blue" | "mint" | "peach" | "gray";
  title: string;
  description: string;
  buttonText?: string;
  buttonVariant?: "blue" | "mint" | "peach";
  onButtonClick?: () => void;
  className?: string;
}

export function FeatureCard({
  icon,
  iconVariant,
  title,
  description,
  buttonText = "Learn more",
  buttonVariant,
  onButtonClick,
  className,
}: FeatureCardProps) {
  const btnVariant = buttonVariant ? `pill-${buttonVariant}` as any : "default";

  return (
    <div 
      className={cn(
        "relative flex flex-col items-start bg-white rounded-[24px] p-8",
        "shadow-[8px_8px_16px_rgba(0,0,0,0.06),-8px_-8px_16px_rgba(255,255,255,0.8)]",
        "dark:bg-card dark:shadow-none dark:border dark:border-border",
        className
      )}
    >
      <div className="mb-6">
        <IconBadge icon={icon} variant={iconVariant} size="md" />
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-3">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      
      <Button 
        variant={btnVariant}
        onClick={onButtonClick}
        className="mt-auto px-6 h-10 font-medium"
      >
        {buttonText}
      </Button>
    </div>
  );
}
