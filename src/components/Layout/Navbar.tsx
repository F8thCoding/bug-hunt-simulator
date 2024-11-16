import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-muted bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-mono text-xl font-bold">BugHunter</span>
        </Link>
        
        <div className="hidden items-center space-x-6 md:flex">
          <Link to="/" className="text-foreground/80 hover:text-foreground">
            Home
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground">
            About
          </Link>
          <Link to="/leaderboard" className="text-foreground/80 hover:text-foreground">
            Leaderboard
          </Link>
          <Button asChild variant="ghost">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};