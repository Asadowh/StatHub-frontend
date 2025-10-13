import { Card } from "@/components/ui/card";
import { Trophy, Award, TrendingUp, Medal } from "lucide-react";
import badgeIcon from "@/assets/badge-icon.png";
import trophyIcon from "@/assets/trophy-icon.png";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  gradient?: string;
}

const StatCard = ({ title, value, icon, gradient = "from-primary/20 to-primary/10" }: StatCardProps) => {
  return (
    <Card className="gradient-card border-2 border-primary/20 p-6 hover:border-primary/40 transition-all hover:scale-105 cursor-pointer group">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            {title}
          </h3>
          <div className="text-primary group-hover:scale-110 transition-transform">
            {icon}
          </div>
        </div>
        
        <div className="flex items-end justify-between">
          <p className="text-4xl font-bold text-foreground text-glow">
            {value}
          </p>
          {(title === "Achievements" || title === "Trophies") && (
            <img 
              src={title === "Achievements" ? badgeIcon : trophyIcon} 
              alt={title}
              className="w-12 h-12 opacity-80 group-hover:opacity-100 transition-opacity animate-float"
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <StatCard
        title="Achievements"
        value="32/68"
        icon={<Award className="w-6 h-6" />}
        gradient="from-accent/20 to-amber-400/10"
      />
      <StatCard
        title="Domination"
        value="5%"
        icon={<Medal className="w-6 h-6" />}
        gradient="from-purple-500/20 to-purple-500/10"
      />
      <StatCard
        title="Ranking"
        value="321,143"
        icon={<TrendingUp className="w-6 h-6" />}
        gradient="from-blue-500/20 to-blue-500/10"
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
