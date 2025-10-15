import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Match {
  id: number;
  opponent: string;
  date: string;
  rating: number;
  result: "W" | "L" | "D";
  competition: string;
  goals: number;
  assists: number;
}

const matches: Match[] = [
  { id: 1, opponent: "Blue Tigers", date: "May 12, 2025", rating: 8.5, result: "W", competition: "League", goals: 2, assists: 1 },
  { id: 2, opponent: "Red Dragons", date: "May 9, 2025", rating: 7.2, result: "D", competition: "Cup", goals: 1, assists: 0 },
  { id: 3, opponent: "Green Eagles", date: "May 5, 2025", rating: 9.1, result: "W", competition: "League", goals: 3, assists: 2 },
  { id: 4, opponent: "Yellow Wolves", date: "May 1, 2025", rating: 6.8, result: "L", competition: "League", goals: 0, assists: 1 },
  { id: 5, opponent: "Black Panthers", date: "April 27, 2025", rating: 8.0, result: "W", competition: "Cup", goals: 1, assists: 2 },
  { id: 6, opponent: "White Sharks", date: "April 23, 2025", rating: 7.5, result: "W", competition: "League", goals: 2, assists: 0 },
  { id: 7, opponent: "Purple Lions", date: "April 19, 2025", rating: 6.5, result: "D", competition: "League", goals: 1, assists: 1 },
  { id: 8, opponent: "Orange Phoenixes", date: "April 15, 2025", rating: 8.8, result: "W", competition: "Cup", goals: 2, assists: 3 },
];

const Matches = () => {
  const avgRating = (matches.reduce((sum, m) => sum + m.rating, 0) / matches.length).toFixed(1);
  const totalGoals = matches.reduce((sum, m) => sum + m.goals, 0);
  const totalAssists = matches.reduce((sum, m) => sum + m.assists, 0);
  const wins = matches.filter(m => m.result === "W").length;

  const getResultColor = (result: string) => {
    if (result === "W") return "bg-green-500/20 text-green-500 border-green-500/30";
    if (result === "L") return "bg-red-500/20 text-red-500 border-red-500/30";
    return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-primary";
    if (rating >= 6.5) return "text-yellow-500";
    return "text-red-500";
  };

  const getTrendIcon = (rating: number) => {
    if (rating >= 8) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (rating >= 6.5) return <Minus className="w-4 h-4 text-yellow-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Match History</h1>
            <p className="text-muted-foreground">Track your performance across all matches</p>
          </div>
          <Trophy className="w-12 h-12 text-primary" />
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
            <p className="text-3xl font-bold text-primary">{avgRating}</p>
            <p className="text-sm text-muted-foreground mt-1">Avg Rating</p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
            <p className="text-3xl font-bold text-primary">{totalGoals}</p>
            <p className="text-sm text-muted-foreground mt-1">Total Goals</p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
            <p className="text-3xl font-bold text-primary">{totalAssists}</p>
            <p className="text-sm text-muted-foreground mt-1">Total Assists</p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
            <p className="text-3xl font-bold text-primary">{wins}</p>
            <p className="text-sm text-muted-foreground mt-1">Wins</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <Button variant="default" className="bg-primary text-primary-foreground">
            All Matches
          </Button>
          <Button variant="outline">League</Button>
          <Button variant="outline">Cup</Button>
          <Button variant="outline">Last 30 Days</Button>
        </div>

        {/* Matches List */}
        <div className="space-y-4">
          {matches.map((match) => (
            <Card
              key={match.id}
              className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-gold"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Match Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-bold">vs {match.opponent}</h3>
                    <Badge className={getResultColor(match.result)}>
                      {match.result === "W" ? "Win" : match.result === "L" ? "Loss" : "Draw"}
                    </Badge>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {match.competition}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{match.date}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Goals</p>
                    <p className="text-2xl font-bold text-primary">{match.goals}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Assists</p>
                    <p className="text-2xl font-bold text-primary">{match.assists}</p>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div className="text-center min-w-[80px]">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {getTrendIcon(match.rating)}
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
                    <p className={`text-3xl font-bold ${getRatingColor(match.rating)}`}>
                      {match.rating}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
            Load More Matches
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Matches;
