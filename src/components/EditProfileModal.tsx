import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { findCountryByName, countryDatabase, type CountryData } from "@/lib/countryData";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProfileData {
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
}

interface EditProfileModalProps {
  profileData: ProfileData;
  onSave: (data: ProfileData) => void;
}

export const EditProfileModal = ({ profileData, onSave }: EditProfileModalProps) => {
  const [formData, setFormData] = useState(profileData);
  const [open, setOpen] = useState(false);
  const [nationalityInput, setNationalityInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);

  const handleNationalityChange = (value: string) => {
    setNationalityInput(value);
    
    if (value.trim().length > 0) {
      const searchTerm = value.toLowerCase();
      const matches = countryDatabase.filter(country => 
        country.name.toLowerCase().includes(searchTerm) ||
        country.code.toLowerCase().includes(searchTerm)
      );
      setFilteredCountries(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setFilteredCountries([]);
      setShowSuggestions(false);
    }
  };

  const selectCountry = (country: CountryData) => {
    setNationalityInput(country.name);
    setFormData({ ...formData, nationality: country.flag });
    setShowSuggestions(false);
  };

  const handleSave = () => {
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center backdrop-blur-sm">
          <Settings className="w-5 h-5 text-foreground" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="bg-background border-border"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="jersey">Jersey Number</Label>
              <Input
                id="jersey"
                type="number"
                value={formData.jerseyNumber}
                onChange={(e) => setFormData({ ...formData, jerseyNumber: parseInt(e.target.value) })}
                className="bg-background border-border"
              />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                placeholder="Type country name (e.g., Azerbaijan, Turkey)"
                value={nationalityInput}
                onChange={(e) => handleNationalityChange(e.target.value)}
                onFocus={() => nationalityInput && setShowSuggestions(true)}
                className="bg-background border-border"
                autoComplete="off"
              />
              {showSuggestions && filteredCountries.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-primary/30 rounded-lg shadow-lg z-50 max-h-48 overflow-hidden">
                  <ScrollArea className="h-full">
                    {filteredCountries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => selectCountry(country)}
                        className="w-full px-4 py-2 text-left hover:bg-accent/20 transition-colors flex items-center gap-3 border-b border-border/50 last:border-0"
                      >
                        <span className="text-2xl">{country.flag}</span>
                        <div className="flex-1">
                          <span className="text-foreground font-medium">{country.name}</span>
                          <span className="text-muted-foreground text-sm ml-2">({country.code})</span>
                        </div>
                      </button>
                    ))}
                  </ScrollArea>
                </div>
              )}
              {formData.nationality && (
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>Selected:</span>
                  <span className="text-2xl">{formData.nationality}</span>
                </div>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Birthday</Label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Input
                  type="number"
                  placeholder="Day"
                  min="1"
                  max="31"
                  value={formData.birthDay}
                  onChange={(e) => setFormData({ ...formData, birthDay: parseInt(e.target.value) || 1 })}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Month"
                  min="1"
                  max="12"
                  value={formData.birthMonth}
                  onChange={(e) => setFormData({ ...formData, birthMonth: parseInt(e.target.value) || 1 })}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Year"
                  min="1900"
                  max="2024"
                  value={formData.birthYear}
                  onChange={(e) => setFormData({ ...formData, birthYear: parseInt(e.target.value) || 2000 })}
                  className="bg-background border-border"
                />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              className="bg-background border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="position">Favorite Position</Label>
            <Input
              id="position"
              value={formData.favoritePosition}
              onChange={(e) => setFormData({ ...formData, favoritePosition: e.target.value })}
              className="bg-background border-border"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
