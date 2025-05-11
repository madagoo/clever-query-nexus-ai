
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  Database, 
  Server, 
  Activity,
  FileText,
} from "lucide-react";

interface ActivityItem {
  icon: React.ElementType;
  title: string;
  time: string;
  iconColor: string;
}

const activityItems: ActivityItem[] = [
  {
    icon: Activity,
    title: "Workflow \"Daily ETL\" completed",
    time: "5 minutes ago",
    iconColor: "text-blue-500"
  },
  {
    icon: Brain,
    title: "AI Agent \"Data Classifier\" processed 50k records",
    time: "15 minutes ago",
    iconColor: "text-purple-500"
  },
  {
    icon: Database,
    title: "Database backup completed successfully",
    time: "1 hour ago",
    iconColor: "text-teal-500"
  },
  {
    icon: Server,
    title: "New client data source connected",
    time: "3 hours ago",
    iconColor: "text-orange-500"
  },
  {
    icon: FileText,
    title: "Monthly report generated and exported",
    time: "Yesterday at 11:30 PM",
    iconColor: "text-green-500"
  },
];

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest system events and operations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1">
                <item.icon className={`h-5 w-5 ${item.iconColor}`} />
              </div>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
