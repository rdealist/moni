import React from 'react';

export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoProps {
  className?: string;
  size?: LogoSize;
  showText?: boolean;
  withTagline?: boolean;
}

export function Logo({ className = "", size = 'md', showText = true, withTagline = false }: LogoProps) {
  const sizeConfig = {
    sm: {
      barWidth: 'w-1',
      gap: 'gap-0.5',
      heights: ['h-3', 'h-2', 'h-4', 'h-2.5'],
      fontSize: 'text-lg',
      taglineSize: 'text-[0.5rem]'
    },
    md: {
      barWidth: 'w-1.5',
      gap: 'gap-1',
      heights: ['h-5', 'h-3', 'h-7', 'h-4.5'],
      fontSize: 'text-2xl',
      taglineSize: 'text-[0.6rem]'
    },
    lg: {
      barWidth: 'w-2.5',
      gap: 'gap-1.5',
      heights: ['h-7', 'h-4', 'h-10', 'h-6'],
      fontSize: 'text-3xl',
      taglineSize: 'text-xs'
    }
  };

  const config = sizeConfig[size];

  const barColors = [
    'bg-primary-blue',
    'bg-primary-mint', 
    'bg-primary-peach',
    'bg-primary-blue'
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`flex items-end ${config.gap}`}>
        {barColors.map((color, idx) => (
          <div
            key={idx}
            className={`${config.barWidth} ${config.heights[idx]} ${color} shadow-sm transition-all duration-300 ease-in-out hover:scale-110`}
            style={{ borderRadius: '9999px' }}
            aria-hidden="true"
          />
        ))}
      </div>
      
      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`font-bold text-foreground leading-none ${config.fontSize} font-sans tracking-tight transition-colors`}>
            Moni
          </span>
          {withTagline && (
            <span className={`font-bold text-muted-foreground uppercase tracking-widest ${config.taglineSize} mt-0.5 transition-colors`}>
              Investment
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function LogoIcon({ className = "", size = 'md' }: { className?: string; size?: LogoSize }) {
  return <Logo className={className} size={size} showText={false} />;
}
