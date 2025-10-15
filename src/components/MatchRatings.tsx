import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Match {
  id: number;
  opponent: string;
  date: string;
  rating: number;
  result: "W" | "L" | "D";
  competition: string;
}

const recentMatches: Match[] = [
  { id: 1, opponent: "Blue Tigers", date: "May 12", rating: 8.5, result: "W", competition: "League" },
  { id: 2, opponent: "Red Dragons", date: "May 9", rating: 7.2, result: "D", competition: "Cup" },
  { id: 3, opponent: "Green Eagles", date: "May 5", rating: 9.1, result: "W", competition: "League" },
];

const getTrendIcon = (rating: number) => {
  if (rating >= 8) return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (rating >= 6.5) return <Minus className="w-4 h-4 text-yellow-500" />;
  return <TrendingDown className="w-4 h-4 text-red-500" />;
};

const getResultColor = (result: string) => {
  if (result === "W") return "text-green-500";
  if (result === "L") return "text-red-500";
  return "text-yellow-500";
};

const getRatingColor = (rating: number) => {
  if (rating >= 8) return "text-primary";
  if (rating >= 6.5) return "text-yellow-500";
  return "text-red-500";
};

export const MatchRatings = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Recent Performances</h3>
        <span className="text-sm text-muted-foreground">Last 3 matches</span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {recentMatches.map((match) => (
          <Card
            key={match.id}
            className="p-5 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-gold group"
          >
            <div className="space-y-3">
              {/* Match Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    vs {match.opponent}
                  </p>
                  <p className="text-xs text-muted-foreground">{match.competition}</p>
                </div>
                <span className={`text-lg font-bold ${getResultColor(match.result)}`}>
                  {match.result}
                </span>
              </div>

              {/* Rating Display */}
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-2">
                  {getTrendIcon(match.rating)}
                  <span className="text-xs text-muted-foreground">Rating</span>
                </div>
                <span className={`text-3xl font-bold ${getRatingColor(match.rating)}`}>
                  {match.rating}
                </span>
              </div>

              {/* Date */}
              <p className="text-xs text-muted-foreground text-right">{match.date}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
