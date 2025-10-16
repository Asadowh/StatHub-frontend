import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findCountryByName, countryDatabase, type CountryData } from "@/lib/countryData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  quote?: string;
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
  const [heightError, setHeightError] = useState("");

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

  const validateHeight = (value: string): boolean => {
    if (!value || value === '') {
      setHeightError("");
      return true;
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0 || numValue > 250) {
      setHeightError("Please enter a valid height between 0 and 250 cm.");
      return false;
    }
    setHeightError("");
    return true;
  };

  const handleSave = () => {
    if (heightError) {
      return;
    }
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] bg-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">Edit Profile</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
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
                type="text"
                inputMode="numeric"
                value={formData.jerseyNumber === 0 ? '' : formData.jerseyNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '') {
                    setFormData({ ...formData, jerseyNumber: 0 });
                  } else if (/^\d+$/.test(value)) {
                    const numValue = parseInt(value);
                    // Restrict to max 99 while typing
                    if (numValue <= 99) {
                      setFormData({ ...formData, jerseyNumber: numValue });
                    }
                  }
                }}
                onBlur={(e) => {
                  let value = formData.jerseyNumber;
                  if (value < 1) value = 1;
                  setFormData({ ...formData, jerseyNumber: value });
                }}
                placeholder="1-99"
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
                  type="text"
                  inputMode="numeric"
                  placeholder="Day"
                  value={formData.birthDay === 0 ? '' : formData.birthDay}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      setFormData({ ...formData, birthDay: 0 });
                    } else if (/^\d+$/.test(value)) {
                      const numValue = parseInt(value);
                      if (numValue <= 31) {
                        setFormData({ ...formData, birthDay: numValue });
                      }
                    }
                  }}
                  onBlur={() => {
                    let value = formData.birthDay;
                    if (value < 1) value = 1;
                    setFormData({ ...formData, birthDay: value });
                  }}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Month"
                  value={formData.birthMonth === 0 ? '' : formData.birthMonth}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      setFormData({ ...formData, birthMonth: 0 });
                    } else if (/^\d+$/.test(value)) {
                      const numValue = parseInt(value);
                      if (numValue <= 12) {
                        setFormData({ ...formData, birthMonth: numValue });
                      }
                    }
                  }}
                  onBlur={() => {
                    let value = formData.birthMonth;
                    if (value < 1) value = 1;
                    setFormData({ ...formData, birthMonth: value });
                  }}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Year"
                  value={formData.birthYear === 0 ? '' : formData.birthYear}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      setFormData({ ...formData, birthYear: 0 });
                    } else if (/^\d+$/.test(value)) {
                      const numValue = parseInt(value);
                      if (numValue <= 2024) {
                        setFormData({ ...formData, birthYear: numValue });
                      }
                    }
                  }}
                  onBlur={() => {
                    let value = formData.birthYear;
                    if (value < 1900) value = 2000;
                    setFormData({ ...formData, birthYear: value });
                  }}
                  className="bg-background border-border"
                />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="text"
              inputMode="numeric"
              value={formData.height}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ ...formData, height: value });
                validateHeight(value);
              }}
              onBlur={(e) => validateHeight(e.target.value)}
              className={`bg-background border-border ${heightError ? 'border-destructive' : ''}`}
              placeholder="e.g., 178"
            />
            {heightError && (
              <p className="text-xs text-destructive mt-1">{heightError}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="position">Favorite Position</Label>
            <Select
              value={formData.favoritePosition}
              onValueChange={(value) => setFormData({ ...formData, favoritePosition: value })}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GK">GK - Goalkeeper</SelectItem>
                <SelectItem value="RB">RB - Right Back</SelectItem>
                <SelectItem value="CB">CB - Center Back</SelectItem>
                <SelectItem value="LB">LB - Left Back</SelectItem>
                <SelectItem value="RWB">RWB - Right Wing Back</SelectItem>
                <SelectItem value="LWB">LWB - Left Wing Back</SelectItem>
                <SelectItem value="CDM">CDM - Defensive Midfielder</SelectItem>
                <SelectItem value="CM">CM - Center Midfielder</SelectItem>
                <SelectItem value="CAM">CAM - Attacking Midfielder</SelectItem>
                <SelectItem value="RM">RM - Right Midfielder</SelectItem>
                <SelectItem value="LM">LM - Left Midfielder</SelectItem>
                <SelectItem value="RW">RW - Right Winger</SelectItem>
                <SelectItem value="LW">LW - Left Winger</SelectItem>
                <SelectItem value="ST">ST - Striker</SelectItem>
                <SelectItem value="CF">CF - Center Forward</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quote">Personal Quote</Label>
            <Input
              id="quote"
              value={formData.quote || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 120) {
                  setFormData({ ...formData, quote: value });
                }
              }}
              placeholder="Add a short motto or expression"
              className="bg-background border-border"
              maxLength={120}
            />
            <p className="text-xs text-muted-foreground">
              {formData.quote?.length || 0}/120 characters
            </p>
          </div>
        </div>
        </ScrollArea>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!!heightError}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
