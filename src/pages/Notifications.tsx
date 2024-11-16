import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, XCircle } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Bug Report Approved",
    message: "Your report on SQL Injection vulnerability has been approved. You earned 50 points!",
    type: "success",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "New Comment on Your Report",
    message: "Admin has requested additional information about your XSS report.",
    type: "info",
    time: "1 day ago",
  },
  {
    id: 3,
    title: "Report Rejected",
    message: "Your report on Vulnerable App A was rejected. Reason: Duplicate report.",
    type: "error",
    time: "2 days ago",
  },
];

const Notifications = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <Bell className="h-6 w-6" />
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className="bg-muted">
              <CardContent className="flex items-start gap-4 pt-6">
                {notification.type === "success" && (
                  <CheckCircle className="h-5 w-5 text-success" />
                )}
                {notification.type === "error" && (
                  <XCircle className="h-5 w-5 text-destructive" />
                )}
                {notification.type === "info" && (
                  <Bell className="h-5 w-5 text-primary" />
                )}
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{notification.message}</p>
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

export default Notifications;