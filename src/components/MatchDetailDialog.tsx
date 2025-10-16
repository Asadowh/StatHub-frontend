import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Player {
  rank: number;
  name: string;
  position: string;
  rating: number;
  nationality: string;
}

interface MatchDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  homePlayers: Player[];
  awayPlayers: Player[];
}

const getRatingColor = (rating: number) => {
  if (rating >= 8.5) return "bg-green-600";
  if (rating >= 8.0) return "bg-green-500";
  if (rating >= 7.5) return "bg-lime-600";
  if (rating >= 7.0) return "bg-yellow-600";
  return "bg-orange-600";
};

export const MatchDetailDialog = ({
  open,
  onOpenChange,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  date,
  homePlayers,
  awayPlayers,
}: MatchDetailDialogProps) => {
  const PlayerList = ({ players, teamName }: { players: Player[]; teamName: string }) => (
    <div className="space-y-3">
      <h3 className="text-xl font-bold text-center mb-4">{teamName}</h3>
      {players.map((player) => (
        <div
          key={player.rank}
          className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border bg-background">
            <span className="font-bold text-sm">{player.rank}</span>
          </div>
          <Avatar className="w-12 h-12 border-2 border-border">
            <AvatarFallback className="bg-muted text-xs">
              {player.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{player.nationality}</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold">{player.name}</p>
            <p className="text-xs text-muted-foreground">{player.position}</p>
          </div>
          <Badge className={`${getRatingColor(player.rating)} text-white border-0 text-base font-bold px-3 py-1`}>
            {player.rating.toFixed(2)}
          </Badge>
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Match Player Ratings</DialogTitle>
          <div className="text-center space-y-2 pt-2">
            <div className="flex items-center justify-center gap-4 text-2xl font-bold">
              <span>{homeTeam}</span>
              <span className="text-primary">{homeScore} - {awayScore}</span>
              <span>{awayTeam}</span>
            </div>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card className="p-4 bg-gradient-to-br from-card to-card/50">
            <PlayerList players={homePlayers} teamName={homeTeam} />
          </Card>
          <Card className="p-4 bg-gradient-to-br from-card to-card/50">
            <PlayerList players={awayPlayers} teamName={awayTeam} />
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
