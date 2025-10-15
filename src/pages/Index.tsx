import { ProfileCard } from "@/components/ProfileCard";
import { StatsGrid } from "@/components/StatsGrid";
import { NavigationCards } from "@/components/NavigationCards";
import { NewsFeed } from "@/components/NewsFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Profile Section */}
          <ProfileCard />

          {/* Stats Grid */}
          <StatsGrid />

          {/* Navigation Cards */}
          <NavigationCards />

          {/* News Feed */}
          <NewsFeed />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-8 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-lg font-semibold">
                <span className="text-foreground">Stat</span>
                <span className="text-primary">Hub</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">Season 25/26</p>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Track your journey • Compete with friends • Achieve greatness
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
