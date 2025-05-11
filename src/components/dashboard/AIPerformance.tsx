
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PerformanceMetric {
  name: string;
  value: string;
  percentage: number;
}

const performanceMetrics: PerformanceMetric[] = [
  { name: "Response Accuracy", value: "93%", percentage: 93 },
  { name: "Avg. Response Time", value: "1.2s", percentage: 85 },
  { name: "Successful Queries", value: "98%", percentage: 98 },
  { name: "Context Relevance", value: "91%", percentage: 91 },
];

interface TokenUsage {
  type: string;
  count: string;
}

const tokenUsage: TokenUsage[] = [
  { type: "Input", count: "124,500" },
  { type: "Output", count: "78,300" },
];

export default function AIPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Performance</CardTitle>
        <CardDescription>
          Claude Sonnet 3.7 LLM metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {performanceMetrics.map((metric) => (
          <div key={metric.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{metric.name}</span>
              <span className="text-sm font-medium">{metric.value}</span>
            </div>
            <Progress value={metric.percentage} className="h-1" />
          </div>
        ))}

        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Token Usage Today</h4>
          <div className="grid grid-cols-2 gap-2">
            {tokenUsage.map((token) => (
              <div key={token.type} className="bg-muted rounded p-3">
                <p className="text-xs text-muted-foreground">{token.type}</p>
                <p className="text-lg font-semibold">{token.count}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
