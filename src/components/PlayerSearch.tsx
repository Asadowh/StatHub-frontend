import { useState, useEffect } from 'react';
import { Search, User, Lock, Medal, Trophy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import defaultAvatar from '@/assets/default-avatar.png';

interface Player {
  id: string;
  username: string;
  fullName: string;
  email: string;
  position: string;
  nationality: string;
  level: number;
  jerseyNumber: number;
  isPrivate: boolean;
  stats: {
    goals: number;
    assists: number;
    matches: number;
    rating: number;
  };
}

// Mock players data
const mockPlayers: Player[] = [
  {
    id: '1',
    username: 'ronaldo_cr7',
    fullName: 'Cristiano Ronaldo',
    email: 'cr7@stathub.com',
    position: 'Forward',
    nationality: 'Portugal',
    level: 99,
    jerseyNumber: 7,
    isPrivate: false,
    stats: { goals: 850, assists: 245, matches: 1100, rating: 9.5 },
  },
  {
    id: '2',
    username: 'messi10',
    fullName: 'Lionel Messi',
    email: 'messi@stathub.com',
    position: 'Forward',
    nationality: 'Argentina',
    level: 99,
    jerseyNumber: 10,
    isPrivate: false,
    stats: { goals: 800, assists: 350, matches: 1050, rating: 9.4 },
  },
  {
    id: '3',
    username: 'neymar_jr',
    fullName: 'Neymar Jr',
    email: 'neymar@stathub.com',
    position: 'Forward',
    nationality: 'Brazil',
    level: 92,
    jerseyNumber: 11,
    isPrivate: true,
    stats: { goals: 450, assists: 280, matches: 700, rating: 8.9 },
  },
  {
    id: '4',
    username: 'mbappe22',
    fullName: 'Kylian Mbappé',
    email: 'mbappe@stathub.com',
    position: 'Forward',
    nationality: 'France',
    level: 94,
    jerseyNumber: 9,
    isPrivate: false,
    stats: { goals: 320, assists: 145, matches: 450, rating: 9.1 },
  },
  {
    id: '5',
    username: 'debruyne17',
    fullName: 'Kevin De Bruyne',
    email: 'kdb@stathub.com',
    position: 'Midfielder',
    nationality: 'Belgium',
    level: 91,
    jerseyNumber: 17,
    isPrivate: false,
    stats: { goals: 120, assists: 280, matches: 550, rating: 8.8 },
  },
  {
    id: '6',
    username: 'salah11',
    fullName: 'Mohamed Salah',
    email: 'salah@stathub.com',
    position: 'Forward',
    nationality: 'Egypt',
    level: 90,
    jerseyNumber: 11,
    isPrivate: true,
    stats: { goals: 350, assists: 150, matches: 500, rating: 8.7 },
  },
  {
    id: '7',
    username: 'lewandowski9',
    fullName: 'Robert Lewandowski',
    email: 'lewa@stathub.com',
    position: 'Striker',
    nationality: 'Poland',
    level: 93,
    jerseyNumber: 9,
    isPrivate: false,
    stats: { goals: 600, assists: 120, matches: 750, rating: 9.0 },
  },
  {
    id: '8',
    username: 'vanDijk4',
    fullName: 'Virgil van Dijk',
    email: 'vvd@stathub.com',
    position: 'Defender',
    nationality: 'Netherlands',
    level: 89,
    jerseyNumber: 4,
    isPrivate: false,
    stats: { goals: 35, assists: 20, matches: 450, rating: 8.5 },
  },
];

export const PlayerSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Real-time filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPlayers([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = mockPlayers.filter(
      (player) =>
        player.username.toLowerCase().includes(query) ||
        player.fullName.toLowerCase().includes(query) ||
        player.email.toLowerCase().includes(query) ||
        player.position.toLowerCase().includes(query) ||
        player.nationality.toLowerCase().includes(query)
    );

    setFilteredPlayers(results);
  }, [searchQuery]);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setIsDialogOpen(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        <Card className="p-4 bg-card border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search players by name, username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>

          {/* Search Results */}
          {filteredPlayers.length > 0 && (
            <ScrollArea className="mt-4 max-h-96 rounded-md border border-border/50">
              <div className="space-y-2 p-2">
                {filteredPlayers.map((player) => (
                  <Card
                    key={player.id}
                    className="p-3 hover:bg-secondary/50 cursor-pointer transition-colors border-border/30"
                    onClick={() => handlePlayerClick(player)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarImage src={defaultAvatar} alt={player.fullName} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getInitials(player.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold truncate">{player.fullName}</p>
                          {player.isPrivate && (
                            <Lock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          @{player.username} • {player.position}
                        </p>
                      </div>
                      <Badge variant="outline" className="flex-shrink-0">
                        Level {player.level}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* No Results */}
          {searchQuery.trim() && filteredPlayers.length === 0 && (
            <div className="mt-4 p-8 text-center text-muted-foreground">
              <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No players found</p>
              <p className="text-sm">Try searching with a different term</p>
            </div>
          )}
        </Card>
      </div>

      {/* Player Profile Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPlayer && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Player Profile</DialogTitle>
              </DialogHeader>

              {selectedPlayer.isPrivate ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Profile is Private</h3>
                  <p className="text-muted-foreground">
                    This player has set their profile to private.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Profile Header */}
                  <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-border/50">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      {/* Avatar Section */}
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="w-32 h-32 border-4 border-primary/30">
                          <AvatarImage src={defaultAvatar} alt={selectedPlayer.fullName} />
                          <AvatarFallback className="text-3xl bg-primary/10 text-primary font-bold">
                            {getInitials(selectedPlayer.fullName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center space-y-2">
                          <Badge className="bg-primary/20 text-primary border-primary/30">Level {selectedPlayer.level}</Badge>
                        </div>
                      </div>

                      {/* Profile Info */}
                      <div className="flex-1 space-y-6">
                        <div>
                          <h3 className="text-4xl font-bold mb-2">{selectedPlayer.fullName}</h3>
                          <p className="text-muted-foreground">@{selectedPlayer.username}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-2xl">{selectedPlayer.nationality}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Position:</span>
                            <span className="font-medium">{selectedPlayer.position}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Jersey:</span>
                            <span className="font-medium">#{selectedPlayer.jerseyNumber}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Stats Overview */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
                      <p className="text-3xl font-bold text-primary">{selectedPlayer.stats.matches}</p>
                      <p className="text-sm text-muted-foreground mt-1">Total Matches</p>
                    </Card>
                    <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
                      <p className="text-3xl font-bold text-primary">{selectedPlayer.stats.goals}</p>
                      <p className="text-sm text-muted-foreground mt-1">Goals</p>
                    </Card>
                    <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
                      <p className="text-3xl font-bold text-primary">{selectedPlayer.stats.assists}</p>
                      <p className="text-sm text-muted-foreground mt-1">Assists</p>
                    </Card>
                    <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
                      <p className="text-3xl font-bold text-primary">{selectedPlayer.stats.rating}</p>
                      <p className="text-sm text-muted-foreground mt-1">Avg Rating</p>
                    </Card>
                  </div>

                  {/* Top Achievements */}
                  <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Medal className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-bold">Top Achievements</h2>
                      </div>
                      <Badge variant="outline" className="border-primary/30 text-primary">5 Achievements</Badge>
                    </div>

                    <div className="grid gap-3">
                      {[
                        { name: "Hat-Trick Hero", tier: "Expert", points: 100 },
                        { name: "Assist Master", tier: "Advanced", points: 75 },
                        { name: "Clean Sheet", tier: "Advanced", points: 75 },
                        { name: "Perfect Match", tier: "Beginner", points: 50 },
                        { name: "Team Player", tier: "Beginner", points: 50 },
                      ].map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Medal className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-semibold">{achievement.name}</p>
                              <p className="text-xs text-muted-foreground">{achievement.tier}</p>
                            </div>
                          </div>
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            +{achievement.points} pts
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Recent Trophies */}
                  <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-bold">Recent Trophies</h2>
                      </div>
                      <Badge variant="outline" className="border-primary/30 text-primary">3 Trophies</Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { name: "MVP of the Month", type: "Best Player", date: "May 2025" },
                        { name: "Top Scorer", type: "Best Attacker", date: "April 2025" },
                        { name: "Playmaker", type: "Most Assists", date: "March 2025" },
                      ].map((trophy, index) => (
                        <Card
                          key={index}
                          className="p-5 bg-gradient-to-br from-primary/5 to-background border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-gold"
                        >
                          <Trophy className="w-8 h-8 text-primary mb-3" />
                          <h3 className="font-bold text-lg mb-1">{trophy.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{trophy.type}</p>
                          <p className="text-xs text-primary">{trophy.date}</p>
                        </Card>
                      ))}
                    </div>
                  </Card>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
