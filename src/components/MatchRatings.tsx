import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  rating: number;
}

const recentMatches: Match[] = [
  { id: 1, homeTeam: "Blue Tigers", awayTeam: "Red Dragons", homeScore: 3, awayScore: 1, date: "May 12", rating: 8.5 },
  { id: 2, homeTeam: "Green Eagles", awayTeam: "Yellow Wolves", homeScore: 2, awayScore: 2, date: "May 9", rating: 7.2 },
  { id: 3, homeTeam: "Black Panthers", awayTeam: "White Sharks", homeScore: 4, awayScore: 0, date: "May 5", rating: 9.1 },
];

const getTrendIcon = (rating: number) => {
  if (rating >= 8) return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (rating >= 6.5) return <Minus className="w-4 h-4 text-yellow-500" />;
  return <TrendingDown className="w-4 h-4 text-red-500" />;
};

const getWinner = (match: Match) => {
  if (match.homeScore > match.awayScore) return match.homeTeam;
  if (match.awayScore > match.homeScore) return match.awayTeam;
  return null;
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
        {recentMatches.map((match) => {
          const winner = getWinner(match);
          return (
            <Card
              key={match.id}
              className="p-5 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-gold group"
            >
              <div className="space-y-3">
                {/* Match Header */}
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-center">
                    <span className={winner === match.homeTeam ? "text-primary" : ""}>
                      {match.homeTeam}
                    </span>
                    {" "}
                    <span className={winner === match.homeTeam ? "text-primary" : "text-muted-foreground"}>
                      {match.homeScore}
                    </span>
                    {" - "}
                    <span className={winner === match.awayTeam ? "text-primary" : "text-muted-foreground"}>
                      {match.awayScore}
                    </span>
                    {" "}
                    <span className={winner === match.awayTeam ? "text-primary" : ""}>
                      {match.awayTeam}
                    </span>
                  </p>
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
          );
        })}
      </div>
    </section>
  );
};
