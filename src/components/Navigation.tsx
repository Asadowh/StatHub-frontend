import { NavLink, Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";

export const Navigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b border-border/50 backdrop-blur-md sticky top-0 z-50 bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold flex items-center gap-0 hover:opacity-80 transition-opacity">
            <span className="text-foreground">Stat</span>
            <span className="text-primary">Hub</span>
          </NavLink>

          {/* Desktop Navigation - Removed */}

          {/* Auth Actions */}
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signup">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign up
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation - Removed */}
      </div>
    </header>
  );
};
