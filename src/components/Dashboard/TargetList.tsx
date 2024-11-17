import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const targets = [
  {
    name: "Vulnerable E-commerce",
    difficulty: "Easy",
    bounty: "100-500",
    type: "Web App",
    path: "/vulnerable-ecommerce"
  },
  {
    name: "Insecure API",
    difficulty: "Medium",
    bounty: "200-1000",
    type: "API",
    path: "/insecure-api"
  },
  {
    name: "Legacy System",
    difficulty: "Hard",
    bounty: "500-2000",
    type: "Web App",
    path: "/legacy-system"
  },
];

const difficultyColors = {
  Easy: "bg-success/20 text-success",
  Medium: "bg-warning/20 text-warning",
  Hard: "bg-destructive/20 text-destructive",
};

export const TargetList = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>Available Targets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {targets.map((target) => (
            <div
              key={target.name}
              className="flex items-center justify-between rounded-lg border border-muted-foreground/20 p-4"
            >
              <div className="space-y-1">
                <h3 className="font-medium">{target.name}</h3>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className={difficultyColors[target.difficulty as keyof typeof difficultyColors]}
                  >
                    {target.difficulty}
                  </Badge>
                  <Badge variant="outline" className="bg-primary/20 text-primary">
                    {target.type}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Bounty Range</div>
                  <div className="font-mono text-success">${target.bounty}</div>
                </div>
                <Button 
                  size="sm" 
                  className="flex items-center space-x-2"
                  onClick={() => navigate(target.path)}
                >
                  <span>Hunt</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};