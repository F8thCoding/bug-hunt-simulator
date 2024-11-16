import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const reports = [
  {
    id: "BUG-001",
    appName: "Vulnerable E-commerce",
    title: "SQL Injection in Login Form",
    submittedBy: "SecurityPro",
    status: "Pending",
  },
  {
    id: "BUG-002",
    appName: "Insecure API",
    title: "Authentication Bypass",
    submittedBy: "BugHunter",
    status: "Approved",
  },
  {
    id: "BUG-003",
    appName: "Legacy System",
    title: "XSS in Comment Section",
    submittedBy: "WhiteHat",
    status: "Rejected",
  },
];

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Admin Panel</h1>
        <div className="rounded-lg border bg-muted p-6">
          <h2 className="mb-4 text-xl font-semibold">Report Review</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>App Name</TableHead>
                <TableHead>Bug Title</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-mono">{report.id}</TableCell>
                  <TableCell>{report.appName}</TableCell>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.submittedBy}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        report.status === "Approved"
                          ? "success"
                          : report.status === "Rejected"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="default">
                        Review
                      </Button>
                      <Button size="sm" variant="outline">
                        Comment
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;