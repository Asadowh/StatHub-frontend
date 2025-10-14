import { MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ronaldoAvatar from "@/assets/ronaldo-avatar.png";
import { EditProfileModal } from "./EditProfileModal";
import { useState } from "react";
import { findCountryByName, getGradientFromColors } from "@/lib/countryData";

interface ProfileCardProps {
  name?: string;
  username?: string;
  jerseyNumber?: number;
  nationality?: string;
  yearOfBirth?: number;
  age?: number;
  height?: string;
  favoritePosition?: string;
  level?: number;
  xp?: number;
  maxXp?: number;
  avatarUrl?: string;
}

export const ProfileCard = ({
  name: initialName = "Cristiano Ronaldo",
  username: initialUsername = "CR7",
  jerseyNumber: initialJerseyNumber = 7,
  nationality: initialNationality = "🇵🇹",
  yearOfBirth: initialYearOfBirth = 1985,
  age: initialAge = 39,
  height: initialHeight = "187 cm",
  favoritePosition: initialPosition = "Forward",
  level: initialLevel = 10,
  xp: initialXp = 999999,
  maxXp = 1000000,
  avatarUrl,
}: ProfileCardProps) => {
  const [profileData, setProfileData] = useState({
    name: initialName,
    username: initialUsername,
    jerseyNumber: initialJerseyNumber,
    nationality: initialNationality,
    yearOfBirth: initialYearOfBirth,
    age: initialAge,
    height: initialHeight,
    favoritePosition: initialPosition,
    level: initialLevel,
    xp: initialXp,
  });

  const xpPercentage = (profileData.xp / maxXp) * 100;

  // Get country data for dynamic background
  const countryData = findCountryByName(profileData.nationality);
  const flagGradient = countryData 
    ? getGradientFromColors(countryData.colors)
    : "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))";

  return (
    <Card className="relative overflow-hidden border-2 border-primary/30 p-6 animate-fade-in">
      {/* Dynamic flag-colored background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{ background: flagGradient }}
        />
      </div>
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-card/60 to-transparent" />

      <div className="relative z-10">
        {/* Header Icons */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-2">
            <EditProfileModal profileData={profileData} onSave={setProfileData} />
            <button className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center backdrop-blur-sm">
              <MessageSquare className="w-5 h-5 text-foreground" />
            </button>
          </div>
          <Badge className="bg-white/10 backdrop-blur-sm text-foreground border-white/20 text-lg px-3 py-1">
            {profileData.nationality}
          </Badge>
        </div>

        {/* Avatar and Info */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-50 animate-pulse" />
            <Avatar className="w-28 h-28 border-4 border-primary relative z-10">
              <AvatarImage src={avatarUrl || ronaldoAvatar} alt={profileData.name} />
              <AvatarFallback className="bg-primary/20 text-2xl font-bold">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-foreground mb-1 text-glow">
              {profileData.name}
            </h2>
            <p className="text-muted-foreground text-sm mb-3">@{profileData.username}</p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-accent text-accent-foreground font-bold text-lg px-3 py-1">
                  #{profileData.jerseyNumber}
                </Badge>
                <span className="text-sm text-muted-foreground">Jersey</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Position</span>
                <span className="text-sm font-semibold text-foreground">{profileData.favoritePosition}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Age</span>
                <span className="text-sm font-semibold text-foreground">{profileData.age} ({profileData.yearOfBirth})</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Height</span>
                <span className="text-sm font-semibold text-foreground">{profileData.height}</span>
              </div>
            </div>

            {/* Level & XP */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-amber-400 flex items-center justify-center font-bold text-xl shadow-lg">
                    {profileData.level}
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">Legend</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-accent text-xl font-bold">👑</span>
                  <span className="text-foreground font-bold">{profileData.xp.toLocaleString()}</span>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="h-3 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className="h-full bg-gradient-to-r from-accent to-amber-400 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
