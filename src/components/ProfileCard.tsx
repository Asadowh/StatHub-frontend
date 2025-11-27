import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EditProfileModal } from "./EditProfileModal";
import { findCountryByName, countryDatabase } from "@/lib/countryData";
import { useAuth } from "@/contexts/AuthContext";
import { userApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import defaultAvatar from "@/assets/default-avatar.png";

// Helper to generate flag emoji from 2-letter country code
const getFlagEmoji = (countryCode: string | null | undefined): string => {
  if (!countryCode) return '🌍';
  
  // First try to find in our database
  const country = countryDatabase.find(c => 
    c.code.toLowerCase() === countryCode.toLowerCase() ||
    c.name.toLowerCase() === countryCode.toLowerCase()
  );
  if (country) return country.flag;
  
  // If it's a 2-letter code, convert to flag emoji
  if (countryCode.length === 2) {
    const code = countryCode.toUpperCase();
    return String.fromCodePoint(...[...code].map(c => 0x1F1E6 - 65 + c.charCodeAt(0)));
  }
  
  return '🌍';
};

// Helper to get country code for display
const getCountryCode = (nationality: string | null | undefined): string => {
  if (!nationality) return 'N/A';
  
  // Try to find in database by code or name
  const country = countryDatabase.find(c => 
    c.code.toLowerCase() === nationality.toLowerCase() ||
    c.name.toLowerCase() === nationality.toLowerCase()
  );
  if (country) return country.code;
  
  // If it's already a short code, return it
  if (nationality.length <= 3) return nationality.toUpperCase();
  
  // Otherwise return first 2 chars
  return nationality.slice(0, 2).toUpperCase();
};

export const ProfileCard = () => {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    return (
      <Card className="relative overflow-hidden border-2 border-primary/30 p-6 animate-fade-in">
        <div className="flex items-center justify-center h-48">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </Card>
    );
  }

  // Parse birth date from backend format (YYYY-MM-DD)
  const parseBirthDate = () => {
    if (!user.birth_date) return { day: 1, month: 1, year: 2000 };
    const date = new Date(user.birth_date);
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  };

  const birthDate = parseBirthDate();
  
  // Calculate age from birthday
  const calculateAge = () => {
    if (!user.birth_date) return null;
    const today = new Date();
    const birth = new Date(user.birth_date);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Prepare profile data for the edit modal
  const profileDataForModal = {
    name: user.full_name || '',
    username: user.username || '',
    jerseyNumber: user.jersey_number || 0,
    nationality: user.nationality || '',
    birthDay: birthDate.day,
    birthMonth: birthDate.month,
    birthYear: birthDate.year,
    height: user.height?.toString() || '',
    favoritePosition: user.favorite_position || '',
    level: 1, // TODO: Calculate from XP
    xp: 0,    // TODO: Get from backend
    quote: user.personal_quote || '',
    profilePhoto: user.photo_url || undefined,
  };

  // Handle profile save
  const handleProfileSave = async (data: typeof profileDataForModal) => {
    setIsSaving(true);
    try {
      // Format birth date as YYYY-MM-DD
      const formattedBirthDate = `${data.birthYear}-${String(data.birthMonth).padStart(2, '0')}-${String(data.birthDay).padStart(2, '0')}`;
      
      await userApi.updateMe({
        full_name: data.name,
        username: data.username,
        jersey_number: data.jerseyNumber,
        nationality: data.nationality,
        birth_date: formattedBirthDate,
        height: parseInt(data.height) || null,
        favorite_position: data.favoritePosition,
        personal_quote: data.quote,
        // Note: photo_url update would need a separate file upload endpoint
      });
      
      // Refresh user data from backend
      await refreshUser();
      
      toast({
        title: "Profile updated!",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Could not update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const age = calculateAge();
  const xpPercentage = 0; // TODO: Calculate from actual XP

  return (
    <Card className="relative overflow-hidden border-2 border-primary/30 p-6 animate-fade-in">
      <div className="relative z-10">
        {/* Header Badge */}
        <div className="flex justify-between items-start mb-6">
          <EditProfileModal 
            profileData={profileDataForModal} 
            onSave={handleProfileSave} 
          />
          <Badge className="bg-white/10 backdrop-blur-sm text-foreground border-white/20 text-lg px-3 py-1">
            {getFlagEmoji(user.nationality)} {getCountryCode(user.nationality)}
          </Badge>
        </div>

        {/* Avatar and Info */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-50 animate-pulse" />
            <Avatar className="w-28 h-28 border-4 border-primary relative z-10">
              <AvatarImage src={user.photo_url || defaultAvatar} alt={user.full_name || 'Player'} className="object-cover" />
              <AvatarFallback className="bg-primary/20 text-2xl font-bold">
                {user.full_name?.split(' ').map(n => n[0]).join('') || user.username?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-foreground mb-1 text-glow">
              {user.full_name || user.username}
            </h2>
            <p className="text-muted-foreground text-sm mb-3">@{user.username}</p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-accent text-accent-foreground font-bold text-lg px-3 py-1">
                  #{user.jersey_number || '?'}
                </Badge>
                <span className="text-sm text-muted-foreground">Jersey</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Position</span>
                <span className="text-sm font-semibold text-foreground">{user.favorite_position || 'Not set'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Birthday</span>
                <span className="text-sm font-semibold text-foreground">
                  {user.birth_date 
                    ? `${birthDate.day} ${monthNames[birthDate.month - 1]} ${birthDate.year}${age !== null ? ` (${age})` : ''}`
                    : 'Not set'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Height</span>
                <span className="text-sm font-semibold text-foreground">
                  {user.height ? `${user.height} cm` : 'Not set'}
                </span>
              </div>
            </div>

            {/* Level & XP */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-amber-400 flex items-center justify-center font-bold text-xl shadow-lg">
                    1
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">Rising Star</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-accent text-xl font-bold">⚽</span>
                  <span className="text-foreground font-bold">0 XP</span>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="h-3 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className="h-full bg-gradient-to-r from-accent to-amber-400 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-right">0 / 1000 XP to next level</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
