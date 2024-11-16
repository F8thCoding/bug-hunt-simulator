import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Stats } from "@/components/Dashboard/Stats";
import { TargetList } from "@/components/Dashboard/TargetList";
import { AttackMetrics } from "@/components/Dashboard/AttackMetrics";
import { LeaderBoard } from "@/components/Dashboard/LeaderBoard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
        <div className="space-y-6">
          <Stats />
          <div className="grid gap-6 md:grid-cols-2">
            <AttackMetrics />
            <LeaderBoard />
          </div>
          <TargetList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;