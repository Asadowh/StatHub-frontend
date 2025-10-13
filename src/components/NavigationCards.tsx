import { Card } from "@/components/ui/card";
import { Calendar, Target, Trophy, Users } from "lucide-react";

interface NavCardProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const NavCard = ({ title, icon, onClick }: NavCardProps) => {
  return (
    <Card 
      onClick={onClick}
      className="gradient-card border-2 border-primary/20 p-8 hover:border-primary transition-all cursor-pointer group hover:scale-105 relative overflow-hidden"
    >
      {/* Hover shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform shadow-lg">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>
    </Card>
  );
};

export const NavigationCards = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <NavCard
        title="Matches"
        icon={<Calendar className="w-8 h-8" />}
        onClick={() => console.log("Navigate to Matches")}
      />
      <NavCard
        title="Achievements"
        icon={<Target className="w-8 h-8" />}
        onClick={() => console.log("Navigate to Achievements")}
      />
      <NavCard
        title="Leaderboard"
        icon={<Users className="w-8 h-8" />}
        onClick={() => console.log("Navigate to Leaderboard")}
      />
      <NavCard
        title="Trophies"
        icon={<Trophy className="w-8 h-8" />}
        onClick={() => console.log("Navigate to Trophies")}
      />
    </div>
  );
};
