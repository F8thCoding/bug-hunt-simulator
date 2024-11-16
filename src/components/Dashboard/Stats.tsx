import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bug, Target, Trophy } from "lucide-react";

export const Stats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-muted">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Points</CardTitle>
          <Trophy className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">1,250</div>
          <p className="text-xs text-muted-foreground">+20% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-muted">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bugs Found</CardTitle>
          <Bug className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">12</div>
          <p className="text-xs text-muted-foreground">3 pending review</p>
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