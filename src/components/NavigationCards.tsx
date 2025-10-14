import { Card } from "@/components/ui/card";
import { Calendar, Target, Trophy, TrendingUp } from "lucide-react";

interface NavCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const NavCard = ({ title, description, icon, onClick }: NavCardProps) => {
  return (
    <Card 
      onClick={onClick}
      className="gradient-card border-2 border-primary/20 p-6 hover:border-primary transition-all cursor-pointer group hover:scale-105 relative overflow-hidden"
    >
      {/* Hover shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform shadow-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export const NavigationCards = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <NavCard
        title="Matches"
        description="View all your matches & ratings"
        icon={<Calendar className="w-7 h-7" />}
        onClick={() => console.log("Navigate to Matches")}
      />
      <NavCard
        title="Achievements"
        description="Complete tasks & earn badges"
        icon={<Target className="w-7 h-7" />}
        onClick={() => console.log("Navigate to Achievements")}
      />
      <NavCard
        title="Leaderboard"
        description="See how you rank vs all players"
        icon={<TrendingUp className="w-7 h-7" />}
        onClick={() => console.log("Navigate to Leaderboard")}
      />
      <NavCard
        title="Trophies"
        description="Top 3-match performer awards"
        icon={<Trophy className="w-7 h-7" />}
        onClick={() => console.log("Navigate to Trophies")}
      />
    </div>
  );
};
