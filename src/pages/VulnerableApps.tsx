import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ExternalLink } from "lucide-react";

const apps = [
  {
    name: "Vulnerable E-commerce",
    description: "An e-commerce application with various security vulnerabilities including SQL injection and XSS.",
    difficulty: "Easy",
  },
  {
    name: "Insecure API",
    description: "A REST API with authentication flaws and improper access controls.",
    difficulty: "Medium",
  },
  {
    name: "Legacy System",
    description: "An old system with outdated dependencies and multiple security issues.",
    difficulty: "Hard",
  },
];

const VulnerableApps = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Vulnerable Applications</h1>
        <Alert className="mb-8 border-warning bg-warning/10">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <AlertDescription>
            These applications are for educational purposes only. Do not attempt to exploit these vulnerabilities on real systems.
          </AlertDescription>
        </Alert>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <Card key={app.name} className="bg-muted">
              <CardHeader>
                <CardTitle>{app.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{app.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Difficulty: {app.difficulty}</span>
                  <Button className="flex items-center gap-2">
                    Launch <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VulnerableApps;