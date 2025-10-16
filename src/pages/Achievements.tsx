import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Medal, Trophy, Target, Users, Lock } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  tier: "Beginner" | "Advanced" | "Expert";
  points: number;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  category: string;
}

const achievements: Achievement[] = [
  { id: 1, title: "First Goal", description: "Score your first goal", tier: "Beginner", points: 50, unlocked: true, category: "Scoring" },
  { id: 2, title: "Hat-Trick Hero", description: "Score 3 goals in a single match", tier: "Expert", points: 100, unlocked: true, category: "Scoring" },
  { id: 3, title: "10 Matches Played", description: "Complete 10 matches", tier: "Beginner", points: 50, unlocked: true, category: "Participation" },
  { id: 4, title: "Assist Master", description: "Provide 15 assists", tier: "Advanced", points: 75, unlocked: true, progress: 15, maxProgress: 15, category: "Teamwork" },
  { id: 5, title: "Clean Sheet", description: "Keep a clean sheet as goalkeeper", tier: "Advanced", points: 75, unlocked: true, category: "Defense" },
  { id: 6, title: "Century Club", description: "Play 100 matches", tier: "Expert", points: 150, unlocked: false, progress: 47, maxProgress: 100, category: "Participation" },
  { id: 7, title: "Perfect 10", description: "Get a 10.0 match rating", tier: "Expert", points: 200, unlocked: false, progress: 9.1, maxProgress: 10, category: "Performance" },
  { id: 8, title: "Team Captain", description: "Lead your team to 5 victories", tier: "Advanced", points: 75, unlocked: false, progress: 3, maxProgress: 5, category: "Leadership" },
  { id: 9, title: "Free Kick Specialist", description: "Score 5 free kicks", tier: "Advanced", points: 80, unlocked: false, progress: 2, maxProgress: 5, category: "Scoring" },
  { id: 10, title: "Comeback King", description: "Win after being 2+ goals down", tier: "Expert", points: 120, unlocked: false, category: "Clutch" },
  { id: 11, title: "Speedster", description: "Record top speed of 30+ km/h", tier: "Advanced", points: 70, unlocked: false, category: "Athleticism" },
  { id: 12, title: "Marathon Runner", description: "Cover 12+ km in a match", tier: "Advanced", points: 70, unlocked: false, category: "Athleticism" },
];

const Achievements = () => {
  const [filter, setFilter] = useState<string>("All");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const tiers = ["All", "Beginner", "Advanced", "Expert"];
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);

  const filteredAchievements = filter === "All" 
    ? achievements 
    : achievements.filter(a => a.tier === filter);

  const getTierColor = (tier: string) => {
    switch(tier) {
      case "Beginner": return "bg-green-500/20 text-green-500 border-green-500/30";
      case "Advanced": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      case "Expert": return "bg-primary/20 text-primary border-primary/30";
      default: return "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Achievements</h1>
            <p className="text-muted-foreground">Track your progress and unlock rewards</p>
          </div>
          
          {/* Stats Summary */}
          <div className="flex gap-4">
            <Card className="p-4 bg-gradient-to-br from-card to-card/50">
              <p className="text-sm text-muted-foreground">Unlocked</p>
              <p className="text-2xl font-bold text-primary">{unlockedCount} / {achievements.length}</p>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-card to-card/50">
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-2xl font-bold text-primary">{totalPoints}</p>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {tiers.map((tier) => (
            <Button
              key={tier}
              variant={filter === tier ? "default" : "outline"}
              onClick={() => setFilter(tier)}
              className={filter === tier ? "bg-primary text-primary-foreground" : ""}
            >
              {tier}
            </Button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAchievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`p-6 transition-all duration-300 ${
                achievement.unlocked
                  ? "bg-gradient-to-br from-primary/10 to-card border-primary/30 shadow-gold"
                  : "bg-gradient-to-br from-card to-card/50 border-border/50 opacity-75"
              } hover:scale-105`}
            >
              <div className="space-y-4">
                {/* Icon & Title */}
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${achievement.unlocked ? "bg-primary/20" : "bg-muted/20"}`}>
                    {achievement.unlocked ? (
                      <Medal className="w-6 h-6 text-primary" />
                    ) : (
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <Badge className={getTierColor(achievement.tier)}>
                    {achievement.tier}
                  </Badge>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>

                {/* Progress Bar (if applicable) */}
                {achievement.progress !== undefined && achievement.maxProgress && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-primary font-semibold">
                        {achievement.progress} / {achievement.maxProgress}
                      </span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="h-2"
                    />
                  </div>
                )}

                {/* Points */}
                <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{achievement.category}</span>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    +{achievement.points} pts
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
