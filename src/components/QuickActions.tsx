import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Medal, Users, Trophy } from "lucide-react";

const actions = [
  { 
    title: "Achievements", 
    description: "Track your progress", 
    icon: Medal, 
    path: "/achievements",
    gradient: "from-yellow-500/10 to-orange-500/10",
    iconColor: "text-yellow-500"
  },
  { 
    title: "Leaderboard", 
    description: "See your rank", 
    icon: Users, 
    path: "/leaderboard",
    gradient: "from-blue-500/10 to-purple-500/10",
    iconColor: "text-blue-500"
  },
  { 
    title: "Matches", 
    description: "View match history", 
    icon: Trophy, 
    path: "/matches",
    gradient: "from-primary/10 to-primary/5",
    iconColor: "text-primary"
  },
];

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">Quick Actions</h3>
      
      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => (
          <Card
            key={action.path}
            onClick={() => navigate(action.path)}
            className={`p-6 bg-gradient-to-br ${action.gradient} border-border/50 hover:border-primary/50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-gold group`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-background/50 ${action.iconColor} group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {action.title}
                </h4>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
