import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar } from "lucide-react";
import { MatchDetailDialog } from "@/components/MatchDetailDialog";

interface Player {
  rank: number;
  name: string;
  position: string;
  rating: number;
  nationality: string;
}

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  rating: number;
  competition: string;
  playerGoals: number;
  playerRating: number;
  homePlayers: Player[];
  awayPlayers: Player[];
}

const matches: Match[] = [
  { 
    id: 1, 
    homeTeam: "Blue Tigers", 
    awayTeam: "Red Dragons", 
    homeScore: 3, 
    awayScore: 1, 
    date: "May 12, 2025", 
    rating: 8.2, 
    competition: "League", 
    playerGoals: 2, 
    playerRating: 8.5,
    homePlayers: [
      { rank: 1, name: "Marcus Silva", position: "Forward", rating: 9.2, nationality: "🇧🇷" },
      { rank: 2, name: "John Smith", position: "Midfielder", rating: 8.5, nationality: "🇬🇧" },
      { rank: 3, name: "Ahmed Hassan", position: "Defender", rating: 8.1, nationality: "🇪🇬" },
      { rank: 4, name: "Carlos Rodriguez", position: "Midfielder", rating: 7.8, nationality: "🇪🇸" },
      { rank: 5, name: "Peter Müller", position: "Defender", rating: 7.5, nationality: "🇩🇪" },
      { rank: 6, name: "Yuki Tanaka", position: "Goalkeeper", rating: 7.3, nationality: "🇯🇵" },
      { rank: 7, name: "Ivan Petrov", position: "Defender", rating: 7.0, nationality: "🇷🇺" },
      { rank: 8, name: "Luis Hernandez", position: "Forward", rating: 6.8, nationality: "🇲🇽" },
      { rank: 9, name: "Paolo Rossi", position: "Midfielder", rating: 6.5, nationality: "🇮🇹" },
      { rank: 10, name: "Andre Mbemba", position: "Defender", rating: 6.2, nationality: "🇨🇲" },
      { rank: 11, name: "Pierre Dubois", position: "Midfielder", rating: 6.0, nationality: "🇫🇷" },
    ],
    awayPlayers: [
      { rank: 1, name: "Li Wei", position: "Midfielder", rating: 8.0, nationality: "🇨🇳" },
      { rank: 2, name: "David Chen", position: "Forward", rating: 7.8, nationality: "🇹🇼" },
      { rank: 3, name: "Kim Min-jae", position: "Defender", rating: 7.5, nationality: "🇰🇷" },
      { rank: 4, name: "Nguyen Van", position: "Midfielder", rating: 7.2, nationality: "🇻🇳" },
      { rank: 5, name: "Takumi Sato", position: "Forward", rating: 7.0, nationality: "🇯🇵" },
      { rank: 6, name: "Raj Patel", position: "Defender", rating: 6.8, nationality: "🇮🇳" },
      { rank: 7, name: "Ali Khan", position: "Midfielder", rating: 6.5, nationality: "🇵🇰" },
      { rank: 8, name: "Kenji Yamamoto", position: "Goalkeeper", rating: 6.3, nationality: "🇯🇵" },
      { rank: 9, name: "Wang Lei", position: "Defender", rating: 6.0, nationality: "🇨🇳" },
      { rank: 10, name: "Park Ji-sung", position: "Midfielder", rating: 5.8, nationality: "🇰🇷" },
      { rank: 11, name: "Chen Yu", position: "Forward", rating: 5.5, nationality: "🇨🇳" },
    ]
  },
  { 
    id: 2, 
    homeTeam: "Green Eagles", 
    awayTeam: "Yellow Wolves", 
    homeScore: 2, 
    awayScore: 2, 
    date: "May 9, 2025", 
    rating: 7.5, 
    competition: "League", 
    playerGoals: 1, 
    playerRating: 7.2,
    homePlayers: [
      { rank: 1, name: "James Wilson", position: "Forward", rating: 8.3, nationality: "🇬🇧" },
      { rank: 2, name: "Emilio Garcia", position: "Midfielder", rating: 7.9, nationality: "🇪🇸" },
      { rank: 3, name: "Thomas Schmidt", position: "Defender", rating: 7.6, nationality: "🇩🇪" },
      { rank: 4, name: "Andre Costa", position: "Forward", rating: 7.4, nationality: "🇵🇹" },
      { rank: 5, name: "Viktor Orlov", position: "Midfielder", rating: 7.2, nationality: "🇷🇺" },
      { rank: 6, name: "Mohammed Ali", position: "Defender", rating: 7.0, nationality: "🇪🇬" },
      { rank: 7, name: "Jean Dupont", position: "Goalkeeper", rating: 6.8, nationality: "🇫🇷" },
      { rank: 8, name: "Roberto Mancini", position: "Defender", rating: 6.5, nationality: "🇮🇹" },
      { rank: 9, name: "Diego Lopez", position: "Midfielder", rating: 6.3, nationality: "🇲🇽" },
      { rank: 10, name: "Samuel Eto'o", position: "Forward", rating: 6.0, nationality: "🇨🇲" },
      { rank: 11, name: "Lucas Silva", position: "Midfielder", rating: 5.8, nationality: "🇧🇷" },
    ],
    awayPlayers: [
      { rank: 1, name: "Erik Larsson", position: "Forward", rating: 8.5, nationality: "🇸🇪" },
      { rank: 2, name: "Hans Muller", position: "Midfielder", rating: 8.0, nationality: "🇩🇪" },
      { rank: 3, name: "Antonio Bianchi", position: "Defender", rating: 7.7, nationality: "🇮🇹" },
      { rank: 4, name: "Johan Berg", position: "Forward", rating: 7.5, nationality: "🇳🇴" },
      { rank: 5, name: "Mikkel Jensen", position: "Midfielder", rating: 7.3, nationality: "🇩🇰" },
      { rank: 6, name: "Lars Andersson", position: "Defender", rating: 7.0, nationality: "🇸🇪" },
      { rank: 7, name: "Piotr Kowalski", position: "Goalkeeper", rating: 6.8, nationality: "🇵🇱" },
      { rank: 8, name: "Jan Novak", position: "Defender", rating: 6.5, nationality: "🇨🇿" },
      { rank: 9, name: "Matthias Weber", position: "Midfielder", rating: 6.2, nationality: "🇩🇪" },
      { rank: 10, name: "Henrik Olsen", position: "Forward", rating: 5.9, nationality: "🇩🇰" },
      { rank: 11, name: "Stefan Popov", position: "Midfielder", rating: 5.6, nationality: "🇧🇬" },
    ]
  },
  { 
    id: 3, 
    homeTeam: "Black Panthers", 
    awayTeam: "White Sharks", 
    homeScore: 4, 
    awayScore: 0, 
    date: "May 5, 2025", 
    rating: 9.1, 
    competition: "League", 
    playerGoals: 3, 
    playerRating: 9.1,
    homePlayers: [
      { rank: 1, name: "Cristiano Silva", position: "Forward", rating: 9.5, nationality: "🇵🇹" },
      { rank: 2, name: "Lionel Martinez", position: "Forward", rating: 9.2, nationality: "🇦🇷" },
      { rank: 3, name: "Kevin Mbappé", position: "Forward", rating: 8.8, nationality: "🇫🇷" },
      { rank: 4, name: "Robert Mueller", position: "Midfielder", rating: 8.5, nationality: "🇩🇪" },
      { rank: 5, name: "Bruno Santos", position: "Midfielder", rating: 8.3, nationality: "🇧🇷" },
      { rank: 6, name: "Virgil Jones", position: "Defender", rating: 8.0, nationality: "🇳🇱" },
      { rank: 7, name: "Karim Benzema", position: "Forward", rating: 7.8, nationality: "🇫🇷" },
      { rank: 8, name: "Joshua Kim", position: "Defender", rating: 7.5, nationality: "🇰🇷" },
      { rank: 9, name: "Thibaut Williams", position: "Goalkeeper", rating: 7.2, nationality: "🇧🇪" },
      { rank: 10, name: "Raphael Varane", position: "Defender", rating: 7.0, nationality: "🇫🇷" },
      { rank: 11, name: "Luka Modric", position: "Midfielder", rating: 6.8, nationality: "🇭🇷" },
    ],
    awayPlayers: [
      { rank: 1, name: "Harry Kane", position: "Forward", rating: 7.0, nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { rank: 2, name: "Jack Grealish", position: "Midfielder", rating: 6.8, nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { rank: 3, name: "Declan Rice", position: "Midfielder", rating: 6.5, nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { rank: 4, name: "John Stones", position: "Defender", rating: 6.3, nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { rank: 5, name: "Marcus Rashford", position: "Forward", rating: 6.0, nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { rank: 6, name: "Kyle Walker", position: "Defender", rating: 5.8, nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { rank: 7, name: "Jordan Pickford", position: "Goalkeeper", rating: 5.5, nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { rank: 8, name: "Phil Foden", position: "Midfielder", rating: 5.3, nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { rank: 9, name: "Bukayo Saka", position: "Forward", rating: 5.0, nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { rank: 10, name: "Trent Alexander", position: "Defender", rating: 4.8, nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { rank: 11, name: "Mason Mount", position: "Midfielder", rating: 4.5, nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    ]
  },
  { id: 4, homeTeam: "Purple Lions", awayTeam: "Orange Phoenixes", homeScore: 1, awayScore: 3, date: "May 1, 2025", rating: 8.0, competition: "League", playerGoals: 0, playerRating: 6.8, homePlayers: [], awayPlayers: [] },
  { id: 5, homeTeam: "Red Dragons", awayTeam: "Green Eagles", homeScore: 2, awayScore: 1, date: "April 27, 2025", rating: 7.8, competition: "League", playerGoals: 1, playerRating: 8.0, homePlayers: [], awayPlayers: [] },
  { id: 6, homeTeam: "Yellow Wolves", awayTeam: "Blue Tigers", homeScore: 0, awayScore: 2, date: "April 23, 2025", rating: 7.2, competition: "League", playerGoals: 2, playerRating: 7.5, homePlayers: [], awayPlayers: [] },
  { id: 7, homeTeam: "White Sharks", awayTeam: "Purple Lions", homeScore: 3, awayScore: 3, date: "April 19, 2025", rating: 8.5, competition: "League", playerGoals: 1, playerRating: 6.5, homePlayers: [], awayPlayers: [] },
  { id: 8, homeTeam: "Orange Phoenixes", awayTeam: "Black Panthers", homeScore: 1, awayScore: 2, date: "April 15, 2025", rating: 7.9, competition: "League", playerGoals: 2, playerRating: 8.8, homePlayers: [], awayPlayers: [] },
];

const Matches = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

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
      {selectedMatch && (
        <MatchDetailDialog
          open={!!selectedMatch}
          onOpenChange={(open) => !open && setSelectedMatch(null)}
          homeTeam={selectedMatch.homeTeam}
          awayTeam={selectedMatch.awayTeam}
          homeScore={selectedMatch.homeScore}
          awayScore={selectedMatch.awayScore}
          date={selectedMatch.date}
          homePlayers={selectedMatch.homePlayers}
          awayPlayers={selectedMatch.awayPlayers}
        />
      )}
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Recent Matches</h1>
            <p className="text-muted-foreground">See how teams across the league have performed recently</p>
          </div>
          <Trophy className="w-12 h-12 text-primary" />
        </div>

        {/* Next Match Announcement */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-card border-primary/30 shadow-gold">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2070')] bg-cover bg-center opacity-10" />
          <div className="relative p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Next Game Announcement</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 text-3xl font-bold">
                <span>Turan-Tovuz FK</span>
                <span className="text-muted-foreground">vs</span>
                <span>Neftçi Baku</span>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>May 18, 2025 • 19:00</span>
                </div>
                <span className="hidden md:block">•</span>
                <span>Tovuz City Stadium</span>
              </div>
              <p className="text-center text-primary font-semibold text-lg">Kickoff in 2 days</p>
            </div>
          </div>
        </Card>

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
                className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-gold cursor-pointer"
                onClick={() => match.homePlayers.length > 0 && setSelectedMatch(match)}
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{match.date}</span>
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
