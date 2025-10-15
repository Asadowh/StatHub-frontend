import { findCountryByName, getGradientFromColors } from "@/lib/countryData";

interface CountryBadgeProps {
  code: string;
  className?: string;
}

export const CountryBadge = ({ code, className = "" }: CountryBadgeProps) => {
  const country = findCountryByName(code);
  
  const backgroundGradient = country 
    ? getGradientFromColors(country.colors)
    : 'linear-gradient(135deg, hsl(var(--muted)), hsl(var(--muted)))';

  return (
    <div 
      className={`relative inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary overflow-hidden ${className}`}
      style={{
        background: backgroundGradient,
      }}
    >
      {/* Blur overlay for readability */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
      
      {/* Country code text */}
      <span className="relative z-10 font-bold text-sm text-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {code}
      </span>
    </div>
  );
};
