import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Medal } from "lucide-react";

const leaderboardData = [
  { rank: 1, username: "EliteHacker", points: 2500, bugsReported: 15, isCurrentUser: false },
  { rank: 2, username: "SecurityPro", points: 2100, bugsReported: 12, isCurrentUser: true },
  { rank: 3, username: "BugHunter", points: 1800, bugsReported: 10, isCurrentUser: false },
  { rank: 4, username: "WhiteHat", points: 1600, bugsReported: 8, isCurrentUser: false },
  { rank: 5, username: "CyberNinja", points: 1400, bugsReported: 7, isCurrentUser: false },
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Top Bug Hunters</h1>
          <Trophy className="h-8 w-8 text-warning" />
        </div>
        <div className="rounded-lg border bg-muted">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Rank</TableHead>
                <TableHead>Username</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-right">Bugs Reported</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user) => (
                <TableRow
                  key={user.rank}
                  className={user.isCurrentUser ? "bg-primary/10" : undefined}
                >
                  <TableCell className="font-medium">{user.rank}</TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell className="text-right font-mono text-success">
                    {user.points}
                  </TableCell>
                  <TableCell className="text-right font-mono">{user.bugsReported}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;