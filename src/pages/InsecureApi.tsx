import { useState } from "react";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Lock, Shield, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface UserData {
  id: number;
  username: string;
  role: string;
  apiKey?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

const InsecureApi = () => {
  const { toast } = useToast();
  const [userId, setUserId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [adminToken, setAdminToken] = useState("");

  // Challenge 1: Authentication Bypass
  const handleAuthBypass = async () => {
    console.log("Attempting authentication bypass with userId:", userId);
    // Vulnerable endpoint that doesn't properly validate user input
    if (userId === "' OR '1'='1") {
      toast({
        title: "Success! Authentication Bypassed",
        description: "You've successfully exploited the authentication vulnerability!",
      });
      // Expose sensitive data
      const userData: UserData = {
        id: 1,
        username: "admin",
        role: "administrator",
        apiKey: "secret_admin_key_123",
      };
      console.log("Exposed admin data:", userData);
    } else {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: "Invalid user ID. Try SQL injection!",
      });
    }
  };

  // Challenge 2: Broken Access Control
  const handleAccessControl = async () => {
    console.log("Attempting access control bypass with apiKey:", apiKey);
    // Vulnerable endpoint that doesn't properly check authorization
    if (apiKey.includes("admin_key")) {
      toast({
        title: "Success! Access Control Bypassed",
        description: "You've gained unauthorized admin access!",
      });
      // Expose sensitive endpoints
      console.log("Exposed admin endpoints:", [
        "/api/admin/users",
        "/api/admin/settings",
        "/api/admin/logs",
      ]);
    } else {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Invalid API key. Try to find the admin key format!",
      });
    }
  };

  // Challenge 3: Sensitive Data Exposure
  const handleDataExposure = async () => {
    console.log("Checking admin token:", adminToken);
    // Vulnerable endpoint that exposes sensitive data in error messages
    if (adminToken.length < 10) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Token length must be at least 10 characters. Current admin token format: ADM_yyyy_MM_dd",
      });
    } else if (!adminToken.startsWith("ADM_")) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid token format. Expected format: ADM_yyyy_MM_dd",
      });
    } else {
      toast({
        title: "Success! Data Exposed",
        description: "You've successfully retrieved sensitive data!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Insecure API Challenges</h1>
        
        <Alert className="mb-8 border-warning bg-warning/10">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <AlertDescription>
            These challenges demonstrate common API security vulnerabilities. For educational purposes only.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Challenge 1: Authentication Bypass */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Authentication Bypass
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Find a way to bypass the authentication and access admin data.
                Hint: The API is vulnerable to SQL injection.
              </p>
              <div className="space-y-4">
                <Input
                  placeholder="Enter user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
                <Button onClick={handleAuthBypass} className="w-full">
                  Authenticate
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Challenge 2: Broken Access Control */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Broken Access Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Exploit the access control mechanism to gain admin privileges.
                Hint: The API key format is predictable.
              </p>
              <div className="space-y-4">
                <Input
                  placeholder="Enter API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <Button onClick={handleAccessControl} className="w-full">
                  Access Admin Panel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Challenge 3: Sensitive Data Exposure */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Sensitive Data Exposure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Extract sensitive information from error messages.
                Hint: Pay attention to validation errors.
              </p>
              <div className="space-y-4">
                <Input
                  placeholder="Enter admin token"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                />
                <Button onClick={handleDataExposure} className="w-full">
                  Request Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InsecureApi;