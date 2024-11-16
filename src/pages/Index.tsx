import { Navbar } from "@/components/Layout/Navbar";
import { Stats } from "@/components/Dashboard/Stats";
import { AttackMetrics } from "@/components/Dashboard/AttackMetrics";
import { LeaderBoard } from "@/components/Dashboard/LeaderBoard";
import { TargetList } from "@/components/Dashboard/TargetList";

const Index = () => {
  return (
    <div className="min-h-screen matrix-bg">
      <Navbar />
      <main className="container mx-auto py-8">
        <div className="space-y-8">
          <Stats />
          
          <div className="grid gap-8 md:grid-cols-2">
            <AttackMetrics />
            <LeaderBoard />
          </div>
          
          <TargetList />
        </div>
      </main>
    </div>
  );
};

export default Index;