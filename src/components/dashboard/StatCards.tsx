
import StatCard from "@/components/dashboard/StatCard";
import { 
  Brain, 
  Clock, 
  Database, 
  Server, 
  LucideIcon 
} from "lucide-react";

interface StatCardItem {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend: {
    value: number;
    isPositive: boolean;
  };
}

const statItems: StatCardItem[] = [
  {
    title: "Active Agents",
    value: "8",
    description: "AI agents currently running",
    icon: Brain,
    trend: { value: 25, isPositive: true }
  },
  {
    title: "Workflows",
    value: "12",
    description: "Processing pipelines",
    icon: Clock,
    trend: { value: 10, isPositive: true }
  },
  {
    title: "Data Volume",
    value: "1.2 TB",
    description: "Total storage used",
    icon: Database,
    trend: { value: 18, isPositive: true }
  },
  {
    title: "Connections",
    value: "7",
    description: "External data sources",
    icon: Server,
    trend: { value: 5, isPositive: false }
  },
];

export default function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
      {statItems.map((item) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={item.value}
          description={item.description}
          icon={item.icon}
          trend={item.trend}
        />
      ))}
    </div>
  );
}
