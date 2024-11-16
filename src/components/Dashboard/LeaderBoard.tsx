import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Alice", points: 2500, badge: "🏆" },
  { rank: 2, name: "Bob", points: 2100, badge: "🥈" },
  { rank: 3, name: "Charlie", points: 1800, badge: "🥉" },
  { rank: 4, name: "David", points: 1600, badge: "⭐" },
  { rank: 5, name: "Eve", points: 1400, badge: "⭐" },
];

export const LeaderBoard = () => {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">Top Hunters</CardTitle>
        <Trophy className="h-5 w-5 text-warning" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className="flex items-center justify-between border-b border-muted-foreground/20 pb-2 last:border-0"
            >
              <div className="flex items-center space-x-4">
                <span className="text-lg font-mono">{user.badge}</span>
                <span className="font-medium">{user.name}</span>
              </div>
              <span className="font-mono text-success">{user.points}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};