import { Card } from "@/components/ui/card";
import { Trophy, Award, TrendingUp } from "lucide-react";
import achievementBanner from "@/assets/achievement-banner.png";
import trophyBanner from "@/assets/trophy-banner.png";
import rankingBanner from "@/assets/ranking-banner.png";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  gradient?: string;
}

const StatCard = ({ title, value, icon, gradient = "from-primary/20 to-primary/10" }: StatCardProps) => {
  const getBackgroundImage = () => {
    if (title === "Achievements") return achievementBanner;
    if (title === "Trophies") return trophyBanner;
    if (title === "Ranking") return rankingBanner;
    return null;
  };

  const bgImage = getBackgroundImage();

  return (
    <Card className="gradient-card border-2 border-primary/20 overflow-hidden hover:border-primary/40 transition-all hover:scale-105 cursor-pointer group relative">
      {bgImage && (
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
          <img 
            src={bgImage} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 group-hover:opacity-60 transition-opacity`} />
      
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            {title}
          </h3>
          <div className="text-primary group-hover:scale-110 transition-transform">
            {icon}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-4xl font-bold text-foreground text-glow">
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
};

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <StatCard
        title="Achievements"
        value="32/68"
        icon={<Award className="w-6 h-6" />}
        gradient="from-accent/20 to-amber-400/10"
      />
      <StatCard
        title="Ranking"
        value="#321,143"
        icon={<TrendingUp className="w-6 h-6" />}
        gradient="from-blue-500/20 to-cyan-500/10"
      />
      <StatCard
        title="Trophies"
        value="25"
        icon={<Trophy className="w-6 h-6" />}
        gradient="from-accent/20 to-amber-400/10"
      />
    </div>
  );
};
