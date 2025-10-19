import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trophy, Medal, MapPin, Ruler, Calendar, Target, Info } from "lucide-react";
import profileAvatar from "@/assets/profile-avatar.png";
import trophyIcon from "@/assets/trophy-icon.png";
import badgeIcon from "@/assets/badge-icon.png";
import { CountryBadge } from "@/components/CountryBadge";
import { EditProfileModal } from "@/components/EditProfileModal";
import { formatHeight } from "@/lib/utils";

const Profile = () => {
  const [profileData, setProfileData] = useState<{
    name: string;
    username: string;
    jerseyNumber: number;
    nationality: string;
    birthDay: number;
    birthMonth: number;
    birthYear: number;
    height: string;
    favoritePosition: string;
    level: number;
    xp: number;
    quote?: string;
    profilePhoto?: string;
    joinDate?: string;
  }>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return {
      name: "Sami Ali",
      username: "samiali",
      jerseyNumber: 10,
      nationality: "🇦🇿",
      birthDay: 15,
      birthMonth: 3,
      birthYear: 2001,
      height: "178",
      favoritePosition: "Forward",
      level: 12,
      xp: 8500,
      quote: "Play with passion, win with pride",
      joinDate: "January 2024",
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
  }, [profileData]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(profileData.birthYear, profileData.birthMonth - 1, profileData.birthDay);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // XP Progress Calculation
  const xpForNextLevel = profileData.level * 1000;
  const xpProgress = (profileData.xp / xpForNextLevel) * 100;
  const topAchievements = [
    { name: "Hat-Trick Hero", tier: "Expert", points: 100 },
    { name: "Assist Master", tier: "Advanced", points: 75 },
    { name: "Clean Sheet", tier: "Advanced", points: 75 },
    { name: "Perfect Match", tier: "Beginner", points: 50 },
    { name: "Team Player", tier: "Beginner", points: 50 },
  ];

  const topTrophies = [
    { name: "MVP of the Month", type: "Best Player", date: "May 2025" },
    { name: "Top Scorer", type: "Best Attacker", date: "April 2025" },
    { name: "Playmaker", type: "Most Assists", date: "March 2025" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Profile Header */}
        <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-border/50">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32 border-4 border-primary/30">
                <AvatarImage src={profileData.profilePhoto || profileAvatar} alt="Profile" />
                <AvatarFallback className="text-3xl">{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="text-center space-y-2">
                <Badge className="bg-primary/20 text-primary border-primary/30">Level {profileData.level}</Badge>
                
                {/* Level Progress Bar */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-32 space-y-1 cursor-help">
                        <Progress value={xpProgress} className="h-2" />
                        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                          <span>{profileData.xp} / {xpForNextLevel} XP</span>
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{profileData.xp} / {xpForNextLevel} XP to level {profileData.level + 1}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{profileData.name}</h1>
                {profileData.quote ? (
                  <p className="text-muted-foreground italic">"{profileData.quote}"</p>
                ) : (
                  <p className="text-muted-foreground/50 italic text-sm">Add your personal quote</p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Azerbaijan {profileData.nationality}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{calculateAge()} years old</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Ruler className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">
                    {formatHeight(profileData.height).split('(')[0].trim()}{' '}
                    <span className="text-muted-foreground/60">
                      ({formatHeight(profileData.height).split('(')[1]?.replace(')', '') || ''})
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Jersey #{profileData.jerseyNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{profileData.favoritePosition}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Joined: {profileData.joinDate || "January 2024"}</span>
                </div>
              </div>

              <div>
                <EditProfileModal profileData={profileData} onSave={setProfileData} />
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
            <p className="text-3xl font-bold text-primary">47</p>
            <p className="text-sm text-muted-foreground mt-1">Total Matches</p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
            <p className="text-3xl font-bold text-primary">23</p>
            <p className="text-sm text-muted-foreground mt-1">Goals</p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
            <p className="text-3xl font-bold text-primary">15</p>
            <p className="text-sm text-muted-foreground mt-1">Assists</p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50">
            <p className="text-3xl font-bold text-primary">7.8</p>
            <p className="text-sm text-muted-foreground mt-1">Avg Rating</p>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src={badgeIcon} alt="Achievement" className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Top Achievements</h2>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary">12 / 25 Unlocked</Badge>
          </div>

          <div className="grid gap-3">
            {topAchievements.map((achievement, index) => (
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

        {/* Trophies Section */}
        <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src={trophyIcon} alt="Trophy" className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Recent Trophies</h2>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary">8 Total</Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {topTrophies.map((trophy, index) => (
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

          <p className="text-sm text-muted-foreground text-center mt-6 italic">
            Trophies are awarded every 3 matches based on average ratings. Keep performing to climb the ranks!
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
