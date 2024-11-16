import { Award, Bug, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FeatureSection = () => {
  const features = [
    {
      title: "Report Bugs",
      description: "Find and report vulnerabilities in our simulated environments.",
      icon: Bug,
    },
    {
      title: "Earn Rewards",
      description: "Get points and badges for successful bug reports.",
      icon: Award,
    },
    {
      title: "Improve Skills",
      description: "Learn and practice ethical hacking in a safe environment.",
      icon: GraduationCap,
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-muted">
              <CardHeader>
                <feature.icon className="mb-4 h-12 w-12 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};