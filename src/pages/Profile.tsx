import { useEffect, useState } from "react";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";

interface UserData {
  username: string;
  email: string;
  points: number;
  bugsReported: number;
}

interface BugReport {
  title: string;
  status: string;
  createdAt: string;
}

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [recentReports, setRecentReports] = useState<BugReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) return;

      try {
        console.log("Fetching user data for:", user.uid);
        
        // Fetch user data
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          console.log("User data found:", userDoc.data());
          setUserData(userDoc.data() as UserData);
          
          // Fetch recent bug reports
          const reportsQuery = query(
            collection(db, "reports"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc"),
            limit(3)
          );
          
          const reportsSnapshot = await getDocs(reportsQuery);
          console.log("Found reports:", reportsSnapshot.size);
          
          if (!reportsSnapshot.empty) {
            const reports = reportsSnapshot.docs.map(doc => ({
              title: doc.data().title,
              status: doc.data().status,
              createdAt: new Date(doc.data().createdAt).toLocaleDateString()
            }));
            console.log("Processed reports:", reports);
            setRecentReports(reports);
          } else {
            console.log("No reports found for user");
            setRecentReports([]);
          }
        } else {
          console.log("No user data found, creating default document");
          const defaultUserData = {
            username: user.displayName || 'Anonymous User',
            email: user.email || '',
            points: 0,
            bugsReported: 0,
            createdAt: new Date().toISOString()
          };
          setUserData(defaultUserData);
          setRecentReports([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Only show error toast for actual errors, not for empty results
        if (error instanceof Error && !error.message.includes("No reports found")) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load user data"
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, toast]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <p className="text-lg">{userData?.username || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-lg">{userData?.email || user?.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Points</label>
                  <p className="text-lg font-mono text-success">{userData?.points || 0}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Bugs Reported</label>
                  <p className="text-lg font-mono">{userData?.bugsReported || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="Update your email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 bg-muted">
            <CardHeader>
              <CardTitle>Recent Bug Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.length > 0 ? (
                  recentReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-border pb-2">
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-sm text-muted-foreground">{report.createdAt}</p>
                      </div>
                      <Badge
                        variant={
                          report.status === "approved"
                            ? "success"
                            : report.status === "pending"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No bug reports submitted yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;