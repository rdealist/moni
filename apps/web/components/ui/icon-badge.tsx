import { LucideIcon } from "lucide-react";
import { cn } from "@moni/ui/lib/utils";

interface IconBadgeProps {
  icon: LucideIcon;
  variant: "blue" | "mint" | "peach" | "gray";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantStyles = {
  blue: "bg-primary-blue text-white",
  mint: "bg-primary-mint text-white",
  peach: "bg-primary-peach text-white",
  gray: "bg-[#A0A0A0] text-white",
};

const sizeStyles = {
  sm: "w-10 h-10 rounded-xl p-2",
  md: "w-12 h-12 rounded-2xl p-2.5",
  lg: "w-14 h-14 rounded-2xl p-3",
};

const iconSizes = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-7 h-7",
};

export function IconBadge({ 
  icon: Icon, 
  variant, 
  size = "md",
  className 
}: IconBadgeProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-center shadow-inner",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      <Icon className={cn(iconSizes[size])} strokeWidth={2.5} />
    </div>
  );
}
