import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import BugReport from "@/pages/BugReport";
import Notifications from "@/pages/Notifications";
import Leaderboard from "@/pages/Leaderboard";
import AdminPanel from "@/pages/AdminPanel";
import VulnerableApps from "@/pages/VulnerableApps";
import VulnerableEcommerce from "@/pages/VulnerableEcommerce";
import InsecureApi from "@/pages/InsecureApi";
import LegacySystem from "@/pages/LegacySystem";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bug-report" element={<BugReport />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/vulnerable-apps" element={<VulnerableApps />} />
              <Route path="/vulnerable-ecommerce" element={<VulnerableEcommerce />} />
              <Route path="/insecure-api" element={<InsecureApi />} />
              <Route path="/legacy-system" element={<LegacySystem />} />
            </Routes>
          </Router>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;