import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { CountryBadge } from "@/components/CountryBadge";

interface TrophyPlayer {
  rank: number;
  name: string;
  position: string;
  trophyCount: number;
  nationality: string;
  countryCode: string;
  avatar?: string;
  isCurrentUser?: boolean;
}

const globalMVPPlayers: TrophyPlayer[] = [
  { rank: 1, name: "Carlos Silva", position: "Forward", trophyCount: 15, nationality: "🇧🇷", countryCode: "BR" },
  { rank: 2, name: "Mohammed Hassan", position: "Midfielder", trophyCount: 12, nationality: "🇪🇬", countryCode: "EG" },
  { rank: 3, name: "James Wilson", position: "Forward", trophyCount: 10, nationality: "🇬🇧", countryCode: "GB" },
  { rank: 4, name: "Sami Ali", position: "Forward", trophyCount: 8, nationality: "🇦🇿", countryCode: "AZ", isCurrentUser: true },
  { rank: 5, name: "Andre Mbemba", position: "Defender", trophyCount: 7, nationality: "🇨🇲", countryCode: "CM" },
];

const goalkeeperPlayers: TrophyPlayer[] = [
  { rank: 1, name: "Takeshi Yamamoto", position: "Goalkeeper", trophyCount: 9, nationality: "🇯🇵", countryCode: "JP" },
  { rank: 2, name: "Peter Schmidt", position: "Goalkeeper", trophyCount: 7, nationality: "🇩🇪", countryCode: "DE" },
  { rank: 3, name: "Jorge Campos", position: "Goalkeeper", trophyCount: 5, nationality: "🇲🇽", countryCode: "MX" },
];

const defenderPlayers: TrophyPlayer[] = [
  { rank: 1, name: "Andre Mbemba", position: "Defender", trophyCount: 11, nationality: "🇨🇲", countryCode: "CM" },
  { rank: 2, name: "Viktor Petrov", position: "Defender", trophyCount: 9, nationality: "🇷🇺", countryCode: "RU" },
  { rank: 3, name: "Ricardo Santos", position: "Defender", trophyCount: 6, nationality: "🇵🇹", countryCode: "PT" },
];

const midfielderPlayers: TrophyPlayer[] = [
  { rank: 1, name: "Mohammed Hassan", position: "Midfielder", trophyCount: 13, nationality: "🇪🇬", countryCode: "EG" },
  { rank: 2, name: "Luis Hernandez", position: "Midfielder", trophyCount: 10, nationality: "🇲🇽", countryCode: "MX" },
  { rank: 3, name: "Marco Rossi", position: "Midfielder", trophyCount: 8, nationality: "🇮🇹", countryCode: "IT" },
];

const attackerPlayers: TrophyPlayer[] = [
  { rank: 1, name: "Carlos Silva", position: "Forward", trophyCount: 14, nationality: "🇧🇷", countryCode: "BR" },
  { rank: 2, name: "James Wilson", position: "Forward", trophyCount: 11, nationality: "🇬🇧", countryCode: "GB" },
  { rank: 3, name: "Sami Ali", position: "Forward", trophyCount: 9, nationality: "🇦🇿", countryCode: "AZ", isCurrentUser: true },
];

const Trophies = () => {
  const [filter, setFilter] = useState<string>("Global MVP");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const filters = ["Global MVP", "Goalkeepers", "Defenders", "Midfielders", "Attackers"];

  const getPlayersForFilter = () => {
    switch (filter) {
      case "Global MVP": return globalMVPPlayers;
      case "Goalkeepers": return goalkeeperPlayers;
      case "Defenders": return defenderPlayers;
      case "Midfielders": return midfielderPlayers;
      case "Attackers": return attackerPlayers;
      default: return globalMVPPlayers;
    }
  };

  const players = getPlayersForFilter();

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
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Trophy className="w-10 h-10 text-yellow-500" />
            <h1 className="text-4xl font-bold">Trophies</h1>
          </div>
          <p className="text-muted-foreground">Trophies are awarded every three matches to the best players in each position based on average rating.</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap justify-center">
          {filters.map((filterOption) => (
            <Button
              key={filterOption}
              variant={filter === filterOption ? "default" : "outline"}
              onClick={() => setFilter(filterOption)}
              className={filter === filterOption ? "bg-primary text-primary-foreground" : ""}
            >
              {filterOption}
            </Button>
          ))}
        </div>

        {/* Top 3 Podium */}
        {players.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* 2nd Place */}
            <Card className="p-6 bg-gradient-to-br from-gray-400/10 to-card border-gray-400/30 text-center mt-8">
              <Trophy className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <Avatar className="w-16 h-16 mx-auto mb-3 border-2 border-gray-400/50">
                <AvatarFallback className="bg-gray-400/20">2</AvatarFallback>
              </Avatar>
              <p className="font-bold text-lg">{players[1].name}</p>
              <p className="text-xs text-muted-foreground mb-2">{players[1].nationality} {players[1].position}</p>
              <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30"><Trophy className="w-3 h-3 mr-1 inline" />{players[1].trophyCount}</Badge>
            </Card>

            {/* 1st Place */}
            <Card className="p-6 bg-gradient-to-br from-yellow-500/20 to-card border-yellow-500/50 text-center shadow-gold">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <Avatar className="w-20 h-20 mx-auto mb-3 border-4 border-yellow-500/50">
                <AvatarFallback className="bg-yellow-500/20">1</AvatarFallback>
              </Avatar>
              <p className="font-bold text-xl">{players[0].name}</p>
              <p className="text-sm text-muted-foreground mb-2">{players[0].nationality} {players[0].position}</p>
              <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-lg"><Trophy className="w-4 h-4 mr-1 inline" />{players[0].trophyCount}</Badge>
            </Card>

            {/* 3rd Place */}
            <Card className="p-6 bg-gradient-to-br from-orange-600/10 to-card border-orange-600/30 text-center mt-8">
              <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <Avatar className="w-16 h-16 mx-auto mb-3 border-2 border-orange-600/50">
                <AvatarFallback className="bg-orange-600/20">3</AvatarFallback>
              </Avatar>
              <p className="font-bold text-lg">{players[2].name}</p>
              <p className="text-xs text-muted-foreground mb-2">{players[2].nationality} {players[2].position}</p>
              <Badge className="bg-orange-600/20 text-orange-600 border-orange-600/30"><Trophy className="w-3 h-3 mr-1 inline" />{players[2].trophyCount}</Badge>
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
                  <th className="px-6 py-4 text-right text-sm font-semibold">Trophies</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr
                    key={player.rank}
                    className={`border-b border-border/30 transition-colors ${
                      player.isCurrentUser
                        ? "bg-primary/10 hover:bg-primary/15"
                        : "hover:bg-muted/20"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`font-bold text-lg ${getRankBg(player.rank)} ${getRankColor(player.rank)}`}
                        >
                          #{player.rank}
                        </Badge>
                        {player.rank === 1 && (
                          <Trophy className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-border">
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
                      <div className="flex items-center justify-end gap-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-lg text-yellow-500">{player.trophyCount}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Trophies;
