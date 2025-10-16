import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Crown } from "lucide-react";
import portugalFlag from "@/assets/portugal-flag.png";

interface RankingPlayer {
  rank: number;
  name: string;
  nationality: string;
  position: string;
  value: number;
}

const ratingPlayers: RankingPlayer[] = [
  { rank: 1, name: "Cristiano Ronaldo", nationality: "🇵🇹", position: "Forward", value: 9.2 },
  { rank: 2, name: "Lionel Messi", nationality: "🇦🇷", position: "Forward", value: 9.1 },
  { rank: 3, name: "Kylian Mbappé", nationality: "🇫🇷", position: "Forward", value: 8.9 },
  { rank: 4, name: "Erling Haaland", nationality: "🇳🇴", position: "Forward", value: 8.8 },
  { rank: 5, name: "Kevin De Bruyne", nationality: "🇧🇪", position: "Midfielder", value: 8.7 },
  { rank: 6, name: "Robert Lewandowski", nationality: "🇵🇱", position: "Forward", value: 8.6 },
  { rank: 7, name: "Neymar Jr", nationality: "🇧🇷", position: "Forward", value: 8.5 },
  { rank: 8, name: "Mohamed Salah", nationality: "🇪🇬", position: "Forward", value: 8.4 },
  { rank: 9, name: "Luka Modrić", nationality: "🇭🇷", position: "Midfielder", value: 8.3 },
  { rank: 10, name: "Virgil van Dijk", nationality: "🇳🇱", position: "Defender", value: 8.2 },
];

const goalPlayers: RankingPlayer[] = [
  { rank: 1, name: "Erling Haaland", nationality: "🇳🇴", position: "Forward", value: 52 },
  { rank: 2, name: "Kylian Mbappé", nationality: "🇫🇷", position: "Forward", value: 48 },
  { rank: 3, name: "Harry Kane", nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "Forward", value: 44 },
  { rank: 4, name: "Cristiano Ronaldo", nationality: "🇵🇹", position: "Forward", value: 42 },
  { rank: 5, name: "Lionel Messi", nationality: "🇦🇷", position: "Forward", value: 38 },
  { rank: 6, name: "Robert Lewandowski", nationality: "🇵🇱", position: "Forward", value: 36 },
  { rank: 7, name: "Victor Osimhen", nationality: "🇳🇬", position: "Forward", value: 34 },
  { rank: 8, name: "Mohamed Salah", nationality: "🇪🇬", position: "Forward", value: 32 },
  { rank: 9, name: "Vinícius Jr", nationality: "🇧🇷", position: "Forward", value: 30 },
  { rank: 10, name: "Lautaro Martínez", nationality: "🇦🇷", position: "Forward", value: 28 },
];

const assistPlayers: RankingPlayer[] = [
  { rank: 1, name: "Kevin De Bruyne", nationality: "🇧🇪", position: "Midfielder", value: 28 },
  { rank: 2, name: "Bruno Fernandes", nationality: "🇵🇹", position: "Midfielder", value: 24 },
  { rank: 3, name: "Lionel Messi", nationality: "🇦🇷", position: "Forward", value: 22 },
  { rank: 4, name: "Trent Alexander-Arnold", nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "Defender", value: 20 },
  { rank: 5, name: "Mohamed Salah", nationality: "🇪🇬", position: "Forward", value: 18 },
  { rank: 6, name: "Bukayo Saka", nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "Forward", value: 17 },
  { rank: 7, name: "Kylian Mbappé", nationality: "🇫🇷", position: "Forward", value: 16 },
  { rank: 8, name: "Leroy Sané", nationality: "🇩🇪", position: "Forward", value: 15 },
  { rank: 9, name: "Thomas Müller", nationality: "🇩🇪", position: "Midfielder", value: 14 },
  { rank: 10, name: "Jack Grealish", nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "Forward", value: 13 },
];

const combinedPlayers: RankingPlayer[] = [
  { rank: 1, name: "Kylian Mbappé", nationality: "🇫🇷", position: "Forward", value: 64 },
  { rank: 2, name: "Lionel Messi", nationality: "🇦🇷", position: "Forward", value: 60 },
  { rank: 3, name: "Erling Haaland", nationality: "🇳🇴", position: "Forward", value: 58 },
  { rank: 4, name: "Harry Kane", nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "Forward", value: 54 },
  { rank: 5, name: "Mohamed Salah", nationality: "🇪🇬", position: "Forward", value: 50 },
  { rank: 6, name: "Cristiano Ronaldo", nationality: "🇵🇹", position: "Forward", value: 48 },
  { rank: 7, name: "Robert Lewandowski", nationality: "🇵🇱", position: "Forward", value: 44 },
  { rank: 8, name: "Vinícius Jr", nationality: "🇧🇷", position: "Forward", value: 42 },
  { rank: 9, name: "Kevin De Bruyne", nationality: "🇧🇪", position: "Midfielder", value: 40 },
  { rank: 10, name: "Victor Osimhen", nationality: "🇳🇬", position: "Forward", value: 38 },
];

const StatHubRanking = () => {
  const [activeTab, setActiveTab] = useState<"rating" | "goals" | "assists" | "combined">("rating");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { id: "rating" as const, label: "Average StatHub Rating", data: ratingPlayers },
    { id: "goals" as const, label: "Goals", data: goalPlayers },
    { id: "assists" as const, label: "Assists", data: assistPlayers },
    { id: "combined" as const, label: "Goals + Assists", data: combinedPlayers },
  ];

  const currentData = tabs.find(tab => tab.id === activeTab)?.data || ratingPlayers;

  const getStatLabel = () => {
    switch(activeTab) {
      case "rating": return "Rating";
      case "goals": return "Goals";
      case "assists": return "Assists";
      case "combined": return "G+A";
      default: return "Value";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">StatHub Rankings</h1>
          <p className="text-muted-foreground">Top performing players based on key performance metrics</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? "bg-primary text-primary-foreground" : ""}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Rankings Table */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 text-muted-foreground font-semibold">Rank</th>
                  <th className="text-left p-4 text-muted-foreground font-semibold">Player</th>
                  <th className="text-left p-4 text-muted-foreground font-semibold">Position</th>
                  <th className="text-right p-4 text-muted-foreground font-semibold">{getStatLabel()}</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((player) => (
                  <tr 
                    key={player.rank}
                    className="border-b border-border/30 hover:bg-primary/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {player.rank === 1 && <Crown className="w-5 h-5 text-primary" />}
                        <span className={`font-bold ${player.rank === 1 ? 'text-primary text-xl' : player.rank <= 3 ? 'text-primary/80' : ''}`}>
                          #{player.rank}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-border">
                          <AvatarFallback className="bg-muted text-xs">
                            {player.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-semibold">{player.name}</span>
                          <p className="text-xs text-muted-foreground">{player.nationality}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="border-primary/30 text-muted-foreground">
                        {player.position}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`text-lg font-bold ${player.rank === 1 ? 'text-primary' : 'text-foreground'}`}>
                        {player.value}
                      </span>
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

export default StatHubRanking;
