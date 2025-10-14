import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

interface ProfileData {
  name: string;
  username: string;
  jerseyNumber: number;
  nationality: string;
  yearOfBirth: number;
  age: number;
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
            <div className="grid gap-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                className="bg-background border-border"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="yearOfBirth">Year of Birth</Label>
              <Input
                id="yearOfBirth"
                type="number"
                value={formData.yearOfBirth}
                onChange={(e) => setFormData({ ...formData, yearOfBirth: parseInt(e.target.value) })}
                className="bg-background border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                className="bg-background border-border"
              />
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
