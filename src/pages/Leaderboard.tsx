import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Trophy, Search, Loader2 } from "lucide-react";
import { CountryBadge } from "@/components/CountryBadge";
import defaultAvatar from "@/assets/default-avatar.png";

interface Player {
  rank: number;
  name: string;
  position: string;
  points: number;
  nationality: string;
  countryCode: string;
  avatar: string;
  trend: "up" | "down" | "same";
  isCurrentUser?: boolean;
}

const allPlayers: Player[] = [
  { rank: 1, name: "Carlos Silva", position: "Forward", points: 2850, nationality: "🇧🇷", countryCode: "BR", avatar: defaultAvatar, trend: "same" },
  { rank: 2, name: "Mohammed Hassan", position: "Midfielder", points: 2720, nationality: "🇪🇬", countryCode: "EG", avatar: defaultAvatar, trend: "up" },
  { rank: 3, name: "James Wilson", position: "Forward", points: 2680, nationality: "🇬🇧", countryCode: "GB", avatar: defaultAvatar, trend: "down" },
  { rank: 4, name: "Sami Ali", position: "Forward", points: 2590, nationality: "🇦🇿", countryCode: "AZ", avatar: defaultAvatar, trend: "up", isCurrentUser: true },
  { rank: 5, name: "Andre Mbemba", position: "Defender", points: 2510, nationality: "🇨🇲", countryCode: "CM", avatar: defaultAvatar, trend: "up" },
  { rank: 6, name: "Takeshi Yamamoto", position: "Goalkeeper", points: 2450, nationality: "🇯🇵", countryCode: "JP", avatar: defaultAvatar, trend: "same" },
  { rank: 7, name: "Luis Hernandez", position: "Midfielder", points: 2380, nationality: "🇲🇽", countryCode: "MX", avatar: defaultAvatar, trend: "down" },
  { rank: 8, name: "Viktor Petrov", position: "Defender", points: 2310, nationality: "🇷🇺", countryCode: "RU", avatar: defaultAvatar, trend: "up" },
  { rank: 9, name: "Ahmed Al-Rashid", position: "Forward", points: 2240, nationality: "🇸🇦", countryCode: "SA", avatar: defaultAvatar, trend: "same" },
  { rank: 10, name: "Marco Rossi", position: "Midfielder", points: 2180, nationality: "🇮🇹", countryCode: "IT", avatar: defaultAvatar, trend: "down" },
  { rank: 11, name: "Pierre Dubois", position: "Defender", points: 2120, nationality: "🇫🇷", countryCode: "FR", avatar: defaultAvatar, trend: "up" },
  { rank: 12, name: "Hans Mueller", position: "Forward", points: 2050, nationality: "🇩🇪", countryCode: "DE", avatar: defaultAvatar, trend: "down" },
  { rank: 13, name: "Diego Martinez", position: "Midfielder", points: 1980, nationality: "🇪🇸", countryCode: "ES", avatar: defaultAvatar, trend: "same" },
  { rank: 14, name: "Li Wei", position: "Forward", points: 1920, nationality: "🇨🇳", countryCode: "CN", avatar: defaultAvatar, trend: "up" },
  { rank: 15, name: "Kim Min-jae", position: "Defender", points: 1860, nationality: "🇰🇷", countryCode: "KR", avatar: defaultAvatar, trend: "up" },
  { rank: 16, name: "Roberto Santos", position: "Goalkeeper", points: 1800, nationality: "🇵🇹", countryCode: "PT", avatar: defaultAvatar, trend: "down" },
  { rank: 17, name: "Ivan Sokolov", position: "Midfielder", points: 1740, nationality: "🇷🇺", countryCode: "RU", avatar: defaultAvatar, trend: "same" },
  { rank: 18, name: "Oscar Fernandez", position: "Forward", points: 1680, nationality: "🇦🇷", countryCode: "AR", avatar: defaultAvatar, trend: "up" },
  { rank: 19, name: "Yuki Tanaka", position: "Defender", points: 1620, nationality: "🇯🇵", countryCode: "JP", avatar: defaultAvatar, trend: "down" },
  { rank: 20, name: "Tom Anderson", position: "Midfielder", points: 1560, nationality: "🇺🇸", countryCode: "US", avatar: defaultAvatar, trend: "same" },
];

const ITEMS_PER_PAGE = 10;

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPlayers = allPlayers.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedPlayers = filteredPlayers.slice(0, displayedCount);
  const hasMore = displayedCount < filteredPlayers.length;

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredPlayers.length));
      setIsLoading(false);
    }, 500);
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-orange-600";
    return "text-muted-foreground";
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return "bg-yellow-500/20 border-yellow-500/30";
    if (rank === 2) return "bg-gray-400/20 border-gray-400/30";
    if (rank === 3) return "bg-orange-600/20 border-orange-600/30";
    return "";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Trophy className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground">Overall player rankings based on total achievements and performance</p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search players by name or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        {filteredPlayers.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* 2nd Place */}
            <Card className="p-6 bg-gradient-to-br from-gray-400/10 to-card border-gray-400/30 text-center mt-8">
              <Trophy className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <Avatar className="w-16 h-16 mx-auto mb-3 border-2 border-gray-400/50">
                <AvatarImage src={filteredPlayers[1].avatar} alt={filteredPlayers[1].name} />
                <AvatarFallback className="bg-gray-400/20 text-xl">2</AvatarFallback>
              </Avatar>
              <p className="font-bold text-lg">{filteredPlayers[1].name}</p>
              <p className="text-xs text-muted-foreground mb-2">{filteredPlayers[1].nationality} {filteredPlayers[1].position}</p>
              <Badge className="bg-primary/20 text-primary">{filteredPlayers[1].points} pts</Badge>
            </Card>

            {/* 1st Place */}
            <Card className="p-6 bg-gradient-to-br from-yellow-500/20 to-card border-yellow-500/50 text-center shadow-gold">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <Avatar className="w-20 h-20 mx-auto mb-3 border-4 border-yellow-500/50">
                <AvatarImage src={filteredPlayers[0].avatar} alt={filteredPlayers[0].name} />
                <AvatarFallback className="bg-yellow-500/20 text-2xl">1</AvatarFallback>
              </Avatar>
              <p className="font-bold text-xl">{filteredPlayers[0].name}</p>
              <p className="text-sm text-muted-foreground mb-2">{filteredPlayers[0].nationality} {filteredPlayers[0].position}</p>
              <Badge className="bg-primary/20 text-primary text-lg">{filteredPlayers[0].points} pts</Badge>
            </Card>

            {/* 3rd Place */}
            <Card className="p-6 bg-gradient-to-br from-orange-600/10 to-card border-orange-600/30 text-center mt-8">
              <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <Avatar className="w-16 h-16 mx-auto mb-3 border-2 border-orange-600/50">
                <AvatarImage src={filteredPlayers[2].avatar} alt={filteredPlayers[2].name} />
                <AvatarFallback className="bg-orange-600/20 text-xl">3</AvatarFallback>
              </Avatar>
              <p className="font-bold text-lg">{filteredPlayers[2].name}</p>
              <p className="text-xs text-muted-foreground mb-2">{filteredPlayers[2].nationality} {filteredPlayers[2].position}</p>
              <Badge className="bg-primary/20 text-primary">{filteredPlayers[2].points} pts</Badge>
            </Card>
          </div>
        )}

        {/* Full Rankings Table */}
        <Card className="overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Player</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Position</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Points</th>
                </tr>
              </thead>
              <tbody>
                {displayedPlayers.map((player) => (
                  <tr
                    key={player.rank}
                    className={`border-b border-border/30 transition-colors ${
                      player.isCurrentUser
                        ? "bg-primary/10 hover:bg-primary/15"
                        : "hover:bg-muted/20"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={`font-bold text-lg ${getRankBg(player.rank)} ${getRankColor(player.rank)}`}
                      >
                        #{player.rank}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-border">
                          <AvatarImage src={player.avatar} alt={player.name} />
                          <AvatarFallback className="bg-muted text-xs">
                            {player.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className={`font-semibold ${player.isCurrentUser ? "text-primary" : ""}`}>
                            {player.name} {player.isCurrentUser && "(You)"}
                          </p>
                          <p className="text-xs text-muted-foreground">{player.nationality}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{player.position}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-lg text-primary">{player.points}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Load More / End Message */}
          {hasMore ? (
            <div className="p-4 text-center border-t border-border/30">
              <Button 
                onClick={loadMore}
                disabled={isLoading}
                variant="outline"
                className="border-primary/30 hover:border-primary/50 hover:bg-primary/10"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading more...
                  </>
                ) : (
                  `Load More (${filteredPlayers.length - displayedCount} remaining)`
                )}
              </Button>
            </div>
          ) : displayedPlayers.length > 0 && (
            <div className="p-4 text-center border-t border-border/30">
              <p className="text-sm text-muted-foreground">End of list reached</p>
            </div>
          )}

          {displayedPlayers.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No players found matching "{searchQuery}"</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
