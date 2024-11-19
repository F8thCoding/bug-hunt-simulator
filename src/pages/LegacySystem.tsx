import { useState } from "react";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Lock, Shield, Terminal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LegacySystem = () => {
  const { toast } = useToast();
  const [step1Input, setStep1Input] = useState("");
  const [step2Input, setStep2Input] = useState("");
  const [step3Input, setStep3Input] = useState("");
  const [unlockedSteps, setUnlockedSteps] = useState<number[]>([1]);

  const checkStep1 = () => {
    // Buffer Overflow vulnerability - checks if input contains specific memory addresses
    console.log("Checking step 1 input:", step1Input);
    const isValidExploit = step1Input.includes("0xFFFF") && 
                          step1Input.length > 64 && 
                          step1Input.includes("\\x41");
    
    if (isValidExploit) {
      toast({
        title: "Step 1 Completed!",
        description: "You've successfully exploited the buffer overflow vulnerability.",
      });
      setUnlockedSteps([...unlockedSteps, 2]);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Exploit",
        description: "Hint: Look for buffer overflow vulnerabilities in legacy C code. Memory addresses might help.",
      });
    }
  };

  const checkStep2 = () => {
    // Race Condition vulnerability - checks for concurrent access pattern
    console.log("Checking step 2 input:", step2Input);
    const isValidExploit = step2Input.startsWith("RACE_") && 
                          step2Input.includes("TOCTOU") && 
                          step2Input.endsWith("_EXPLOIT");
    
    if (isValidExploit) {
      toast({
        title: "Step 2 Completed!",
        description: "You've successfully exploited the race condition vulnerability.",
      });
      setUnlockedSteps([...unlockedSteps, 3]);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Exploit",
        description: "Hint: Time-of-check to time-of-use vulnerabilities can be exploited with concurrent access.",
      });
    }
  };

  const checkStep3 = () => {
    // Format String vulnerability - checks for format string injection
    console.log("Checking step 3 input:", step3Input);
    const isValidExploit = step3Input.includes("%x") && 
                          step3Input.includes("%n") && 
                          step3Input.length >= 32;
    
    if (isValidExploit) {
      toast({
        title: "Congratulations!",
        description: "You've completed all challenges! You are now a master of legacy system vulnerabilities.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Exploit",
        description: "Hint: Format string vulnerabilities often involve printf() and special format specifiers.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Legacy System Challenges</h1>
        
        <Alert className="mb-8 border-warning bg-warning/10">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <AlertDescription>
            Warning: This is the final set of challenges. They require advanced knowledge of system security and low-level vulnerabilities.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Challenge 1: Buffer Overflow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  A legacy C program vulnerable to buffer overflow attacks. Find the right combination of memory addresses and payload to exploit it.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="step1">Enter Exploit Payload:</Label>
                  <Input
                    id="step1"
                    value={step1Input}
                    onChange={(e) => setStep1Input(e.target.value)}
                    placeholder="Enter your exploit payload..."
                  />
                  <Button onClick={checkStep1}>Submit Exploit</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {unlockedSteps.includes(2) && (
            <Card className="bg-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Challenge 2: Race Condition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The system's file handling mechanism is vulnerable to race conditions. Exploit the time-of-check to time-of-use vulnerability.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="step2">Enter Exploit Pattern:</Label>
                    <Input
                      id="step2"
                      value={step2Input}
                      onChange={(e) => setStep2Input(e.target.value)}
                      placeholder="Enter your race condition exploit..."
                    />
                    <Button onClick={checkStep2}>Submit Exploit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {unlockedSteps.includes(3) && (
            <Card className="bg-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Challenge 3: Format String Vulnerability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The final challenge involves exploiting a format string vulnerability in the logging system. Craft a payload that can read and write to memory.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="step3">Enter Format String Payload:</Label>
                    <Input
                      id="step3"
                      value={step3Input}
                      onChange={(e) => setStep3Input(e.target.value)}
                      placeholder="Enter your format string exploit..."
                    />
                    <Button onClick={checkStep3}>Submit Exploit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegacySystem;