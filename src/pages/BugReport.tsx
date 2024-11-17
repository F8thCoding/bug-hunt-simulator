import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc, increment, collection, addDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BugReport = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to submit a bug report"
      });
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      // Add bug report to reports collection
      const reportRef = await addDoc(collection(db, "reports"), {
        userId: user.uid,
        application: formData.get("application"),
        title: formData.get("title"),
        description: formData.get("description"),
        steps: formData.get("steps"),
        impact: formData.get("impact"),
        status: "pending",
        createdAt: new Date().toISOString()
      });

      // Update user's points and bugs reported
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        points: increment(50), // Base points for submission
        bugsReported: increment(1)
      });

      console.log("Bug report submitted successfully:", reportRef.id);

      toast({
        title: "Success",
        description: "Bug report submitted successfully! You earned 50 points."
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting bug report:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit bug report"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Submit Bug Report</h1>
        <Card className="bg-muted">
          <CardHeader>
            <CardTitle>Report Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Vulnerable Application</label>
                <Select name="application">
                  <SelectTrigger>
                    <SelectValue placeholder="Select application" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">Vulnerable E-commerce</SelectItem>
                    <SelectItem value="api">Insecure API</SelectItem>
                    <SelectItem value="legacy">Legacy System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bug Title</label>
                <Input name="title" placeholder="Enter a descriptive title" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  name="description" 
                  placeholder="Describe the vulnerability in detail" 
                  className="min-h-[150px]" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Steps to Reproduce</label>
                <Textarea 
                  name="steps" 
                  placeholder="List the steps to reproduce this bug" 
                  className="min-h-[100px]" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Impact Level</label>
                <Select name="impact">
                  <SelectTrigger>
                    <SelectValue placeholder="Select impact level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Report"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BugReport;