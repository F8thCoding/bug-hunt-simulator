import { Button } from "@/components/ui/button";
import { Shield, Target, Trophy, User } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="border-b border-muted p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-mono text-xl font-bold">BugHunter</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Button variant="ghost" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Targets</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>Leaderboard</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};