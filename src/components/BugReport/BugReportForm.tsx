import { useState, useRef, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc, increment, collection, addDoc } from "firebase/firestore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const BugReportForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      console.log("Submitting bug report...");
      
      // Add bug report to reports collection
      const reportData = {
        userId: user.uid,
        vulnerabilityType: formData.get("vulnerabilityType"),
        title: formData.get("title"),
        description: formData.get("description"),
        stepsToReproduce: formData.get("steps"),
        impact: formData.get("impact"),
        status: "pending",
        createdAt: new Date().toISOString()
      };

      const reportRef = await addDoc(collection(db, "reports"), reportData);
      console.log("Bug report stored with ID:", reportRef.id);

      // Update user's points and bugs reported
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        points: increment(50),
        bugsReported: increment(1)
      });

      toast({
        title: "Success",
        description: "Bug report submitted successfully! You earned 50 points."
      });

      formRef.current?.reset();
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
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Vulnerability Type</label>
        <Select name="vulnerabilityType" required>
          <SelectTrigger>
            <SelectValue placeholder="Select vulnerability type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="xss">Cross-Site Scripting (XSS)</SelectItem>
            <SelectItem value="sqli">SQL Injection</SelectItem>
            <SelectItem value="csrf">Cross-Site Request Forgery</SelectItem>
            <SelectItem value="auth">Authentication Bypass</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Bug Title</label>
        <Input 
          name="title" 
          placeholder="Enter a descriptive title" 
          required 
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea 
          name="description" 
          placeholder="Describe the vulnerability in detail" 
          className="min-h-[100px]" 
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
        <Select name="impact" required>
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
        {loading ? "Submitting..." : "Submit Bug Report"}
      </Button>
    </form>
  );
};