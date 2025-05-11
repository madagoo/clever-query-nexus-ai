
import Header from "@/components/layout/Header";
import SidebarWrapper from "@/components/layout/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import SystemArchitectureChart from "@/components/dashboard/SystemArchitectureChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Clock, 
  Database, 
  Server, 
  Activity,
  FileText,
} from "lucide-react";

const Index = () => {
  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-screen bg-white">
        <Header title="Dashboard" />
        <div className="flex-1 p-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <StatCard
              title="Active Agents"
              value="8"
              description="AI agents currently running"
              icon={Brain}
              trend={{ value: 25, isPositive: true }}
            />
            <StatCard
              title="Workflows"
              value="12"
              description="Processing pipelines"
              icon={Clock}
              trend={{ value: 10, isPositive: true }}
            />
            <StatCard
              title="Data Volume"
              value="1.2 TB"
              description="Total storage used"
              icon={Database}
              trend={{ value: 18, isPositive: true }}
            />
            <StatCard
              title="Connections"
              value="7"
              description="External data sources"
              icon={Server}
              trend={{ value: 5, isPositive: false }}
            />
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
            <SystemArchitectureChart />
          </div>

          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>
                  Real-time status of system components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">API Backend</span>
                    <span className="text-sm font-medium text-green-500">Healthy</span>
                  </div>
                  <Progress value={98} className="h-1" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Temporal Workflows</span>
                    <span className="text-sm font-medium text-green-500">Healthy</span>
                  </div>
                  <Progress value={100} className="h-1" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Kafka Streams</span>
                    <span className="text-sm font-medium text-yellow-500">Warning</span>
                  </div>
                  <Progress value={82} className="h-1" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">PostgreSQL</span>
                    <span className="text-sm font-medium text-green-500">Healthy</span>
                  </div>
                  <Progress value={96} className="h-1" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Qdrant</span>
                    <span className="text-sm font-medium text-green-500">Healthy</span>
                  </div>
                  <Progress value={93} className="h-1" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">MinIO Storage</span>
                    <span className="text-sm font-medium text-green-500">Healthy</span>
                  </div>
                  <Progress value={95} className="h-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest system events and operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Activity className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Workflow "Daily ETL" completed</p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Brain className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">AI Agent "Data Classifier" processed 50k records</p>
                      <p className="text-xs text-muted-foreground">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Database className="h-5 w-5 text-teal-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Database backup completed successfully</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Server className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New client data source connected</p>
                      <p className="text-xs text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <FileText className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Monthly report generated and exported</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 11:30 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Performance</CardTitle>
                <CardDescription>
                  Claude Sonnet 3.7 LLM metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Response Accuracy</span>
                    <span className="text-sm font-medium">93%</span>
                  </div>
                  <Progress value={93} className="h-1" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Avg. Response Time</span>
                    <span className="text-sm font-medium">1.2s</span>
                  </div>
                  <Progress value={85} className="h-1" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Successful Queries</span>
                    <span className="text-sm font-medium">98%</span>
                  </div>
                  <Progress value={98} className="h-1" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Context Relevance</span>
                    <span className="text-sm font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-1" />
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Token Usage Today</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted rounded p-3">
                      <p className="text-xs text-muted-foreground">Input</p>
                      <p className="text-lg font-semibold">124,500</p>
                    </div>
                    <div className="bg-muted rounded p-3">
                      <p className="text-xs text-muted-foreground">Output</p>
                      <p className="text-lg font-semibold">78,300</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Index;
