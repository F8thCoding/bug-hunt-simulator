import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bug, Target, Trophy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface UserStats {
  points: number;
  bugsReported: number;
}

export const Stats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({ points: 0, bugsReported: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setStats({
            points: userData.points || 0,
            bugsReported: userData.bugsReported || 0
          });
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-muted">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Points</CardTitle>
          <Trophy className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{stats.points}</div>
          <p className="text-xs text-muted-foreground">+50 points per approved report</p>
        </CardContent>
      </Card>
      <Card className="bg-muted">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bugs Found</CardTitle>
          <Bug className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">{stats.bugsReported}</div>
          <p className="text-xs text-muted-foreground">{stats.bugsReported > 0 ? "Keep up the good work!" : "Start hunting!"}</p>
        </CardContent>
      </Card>
      <Card className="bg-muted">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Targets</CardTitle>
          <Target className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">8</div>
          <p className="text-xs text-muted-foreground">2 new targets added</p>
        </CardContent>
      </Card>
    </div>
  );
};