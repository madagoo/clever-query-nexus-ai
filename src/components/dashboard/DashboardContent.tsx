
import StatCards from "@/components/dashboard/StatCards";
import SystemArchitectureChart from "@/components/dashboard/SystemArchitectureChart";
import SystemHealth from "@/components/dashboard/SystemHealth";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AIPerformance from "@/components/dashboard/AIPerformance";

export default function DashboardContent() {
  return (
    <div className="flex-1 p-4 space-y-6">
      <StatCards />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <SystemArchitectureChart />
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
        <SystemHealth />
        <RecentActivity />
        <AIPerformance />
      </div>
    </div>
  );
}
