import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar } from "lucide-react";

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  rating: number;
  competition: string;
}

const matches: Match[] = [
  { id: 1, homeTeam: "Blue Tigers", awayTeam: "Red Dragons", homeScore: 3, awayScore: 1, date: "May 12, 2025", rating: 8.2, competition: "League" },
  { id: 2, homeTeam: "Green Eagles", awayTeam: "Yellow Wolves", homeScore: 2, awayScore: 2, date: "May 9, 2025", rating: 7.5, competition: "League" },
  { id: 3, homeTeam: "Black Panthers", awayTeam: "White Sharks", homeScore: 4, awayScore: 0, date: "May 5, 2025", rating: 9.1, competition: "League" },
  { id: 4, homeTeam: "Purple Lions", awayTeam: "Orange Phoenixes", homeScore: 1, awayScore: 3, date: "May 1, 2025", rating: 8.0, competition: "League" },
  { id: 5, homeTeam: "Red Dragons", awayTeam: "Green Eagles", homeScore: 2, awayScore: 1, date: "April 27, 2025", rating: 7.8, competition: "League" },
  { id: 6, homeTeam: "Yellow Wolves", awayTeam: "Blue Tigers", homeScore: 0, awayScore: 2, date: "April 23, 2025", rating: 7.2, competition: "League" },
  { id: 7, homeTeam: "White Sharks", awayTeam: "Purple Lions", homeScore: 3, awayScore: 3, date: "April 19, 2025", rating: 8.5, competition: "League" },
  { id: 8, homeTeam: "Orange Phoenixes", awayTeam: "Black Panthers", homeScore: 1, awayScore: 2, date: "April 15, 2025", rating: 7.9, competition: "League" },
];

const Matches = () => {
  const avgRating = (matches.reduce((sum, m) => sum + m.rating, 0) / matches.length).toFixed(1);
  const totalGoals = matches.reduce((sum, m) => sum + m.homeScore + m.awayScore, 0);
  const totalMatches = matches.length;

  const getWinner = (match: Match) => {
    if (match.homeScore > match.awayScore) return match.homeTeam;
    if (match.awayScore > match.homeScore) return match.awayTeam;
    return "Draw";
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-primary";
    if (rating >= 7) return "text-yellow-500";
    return "text-muted-foreground";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Recent Matches</h1>
            <p className="text-muted-foreground">See how teams across the league have performed recently</p>
          </div>
          <Trophy className="w-12 h-12 text-primary" />
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
            <p className="text-3xl font-bold text-primary">{avgRating}</p>
            <p className="text-sm text-muted-foreground mt-1">Average Match Rating</p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
            <p className="text-3xl font-bold text-primary">{totalGoals}</p>
            <p className="text-sm text-muted-foreground mt-1">Total Goals Scored</p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
            <p className="text-3xl font-bold text-primary">{totalMatches}</p>
            <p className="text-sm text-muted-foreground mt-1">Total Matches Played</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap justify-center md:justify-start">
          <Button variant="default" className="bg-primary text-primary-foreground">
            Last 30 Days
          </Button>
        </div>

        {/* Matches List */}
        <div className="space-y-4">
          {matches.map((match) => {
            const winner = getWinner(match);
            return (
              <Card
                key={match.id}
                className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-gold"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Match Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-2xl font-bold">
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
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap text-sm">
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {match.competition}
                      </Badge>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{match.date}</span>
                      </div>
                    </div>
                    {winner !== "Draw" && (
                      <p className="text-sm text-muted-foreground">
                        Winner: <span className="text-primary font-semibold">{winner}</span>
                      </p>
                    )}
                  </div>

                  {/* Match Rating */}
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-px bg-border hidden md:block" />
                    <div className="text-center min-w-[100px]">
                      <p className="text-sm text-muted-foreground mb-1">Match Rating</p>
                      <p className={`text-3xl font-bold ${getRatingColor(match.rating)}`}>
                        {match.rating}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
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
