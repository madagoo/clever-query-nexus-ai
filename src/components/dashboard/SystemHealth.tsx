
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SystemStatusItem {
  name: string;
  status: "Healthy" | "Warning" | "Error";
  value: number;
}

const systemItems: SystemStatusItem[] = [
  { name: "API Backend", status: "Healthy", value: 98 },
  { name: "Temporal Workflows", status: "Healthy", value: 100 },
  { name: "Kafka Streams", status: "Warning", value: 82 },
  { name: "PostgreSQL", status: "Healthy", value: 96 },
  { name: "Qdrant", status: "Healthy", value: 93 },
  { name: "MinIO Storage", status: "Healthy", value: 95 },
];

const getStatusColor = (status: SystemStatusItem["status"]): string => {
  switch (status) {
    case "Healthy":
      return "text-green-500";
    case "Warning":
      return "text-yellow-500";
    case "Error":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

export default function SystemHealth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
        <CardDescription>
          Real-time status of system components
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {systemItems.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.name}</span>
              <span className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>
            <Progress value={item.value} className="h-1" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
