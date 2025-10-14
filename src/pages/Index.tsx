import { ProfileCard } from "@/components/ProfileCard";
import { StatsGrid } from "@/components/StatsGrid";
import { NavigationCards } from "@/components/NavigationCards";
import { NewsFeed } from "@/components/NewsFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/20 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-0">
              <span className="text-white">Stat</span>
              <span className="text-[#FF9900]">Hub</span>
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Season 25/26</span>
            </div>
          </div>
        </div>
      </header>

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
      <footer className="border-t border-primary/20 mt-16 py-6 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Track your journey • Compete with friends • Achieve greatness
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
