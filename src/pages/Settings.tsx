import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, User, Shield, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatHeight } from "@/lib/utils";

const Settings = () => {
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        {/* Profile Settings */}
        <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Profile Information</h2>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <div className="px-3 py-2 bg-background border border-border rounded-md text-foreground cursor-default">
                Sami Ali
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Username</Label>
              <div className="px-3 py-2 bg-background border border-border rounded-md text-foreground cursor-default">
                @samiali
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Nationality</Label>
                <div className="px-3 py-2 bg-background border border-border rounded-md text-foreground cursor-default">
                  Azerbaijan 🇦🇿
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Position</Label>
                <div className="px-3 py-2 bg-background border border-border rounded-md text-foreground cursor-default">
                  Forward
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Jersey Number</Label>
                <div className="px-3 py-2 bg-background border border-border rounded-md text-foreground cursor-default">
                  10
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Height</Label>
                <div className="px-3 py-2 bg-background border border-border rounded-md cursor-default">
                  <span className="text-foreground">{formatHeight(178).split('(')[0].trim()}</span>
                  {' '}
                  <span className="text-muted-foreground">
                    ({formatHeight(178).split('(')[1]?.replace(')', '') || ''})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Current Password</Label>
              <div className="px-3 py-2 bg-background border border-border rounded-md text-foreground cursor-default">
                ••••••••
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Security Status</Label>
              <div className="px-3 py-2 bg-background border border-border rounded-md text-muted-foreground cursor-default">
                Password last changed 30 days ago
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
