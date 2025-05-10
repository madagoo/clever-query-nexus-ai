
import Header from "@/components/layout/Header";
import SidebarWrapper from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  MoreVertical,
  Play,
  Pause,
  Clock,
  Settings,
  Plus,
  Calendar,
  BarChart,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const workflows = [
  {
    id: "workflow-1",
    name: "Daily ETL Process",
    description: "Extracts, transforms, and loads data from multiple sources",
    status: "success",
    lastRun: "2 hours ago",
    nextRun: "Tomorrow, 01:00 AM",
    schedule: "Daily at 01:00 AM",
    duration: "45 minutes",
    steps: 12,
    completion: 100
  },
  {
    id: "workflow-2",
    name: "Customer Data Sync",
    description: "Syncs customer data between CRM and data warehouse",
    status: "running",
    lastRun: "Running now",
    nextRun: "Tomorrow, 03:00 AM",
    schedule: "Daily at 03:00 AM",
    duration: "15 minutes",
    steps: 7,
    completion: 45
  },
  {
    id: "workflow-3",
    name: "Monthly Report Generation",
    description: "Generates monthly reports for all departments",
    status: "scheduled",
    lastRun: "Last month",
    nextRun: "May 1, 12:00 AM",
    schedule: "Monthly on the 1st",
    duration: "1 hour 30 minutes",
    steps: 15,
    completion: 0
  },
  {
    id: "workflow-4",
    name: "Data Quality Check",
    description: "Runs comprehensive data quality tests across databases",
    status: "failed",
    lastRun: "1 day ago",
    nextRun: "Manual trigger only",
    schedule: "Manual",
    duration: "20 minutes",
    steps: 9,
    completion: 67
  },
  {
    id: "workflow-5",
    name: "Document Processing Pipeline",
    description: "Processes documents using AI agents and updates metadata",
    status: "success",
    lastRun: "3 hours ago",
    nextRun: "Tomorrow, 06:00 AM",
    schedule: "Daily at 06:00 AM",
    duration: "35 minutes",
    steps: 8,
    completion: 100
  },
  {
    id: "workflow-6",
    name: "Client Data Import",
    description: "Imports new client data from external sources",
    status: "scheduled",
    lastRun: "2 days ago",
    nextRun: "Today, 06:00 PM",
    schedule: "Daily at 06:00 PM",
    duration: "25 minutes",
    steps: 6,
    completion: 0
  }
];

function WorkflowCard({ workflow }: { workflow: typeof workflows[0] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              workflow.status === 'success' ? 'bg-green-500' :
              workflow.status === 'running' ? 'bg-blue-500 animate-pulse-slow' :
              workflow.status === 'scheduled' ? 'bg-yellow-500' :
              'bg-red-500'
            }`} />
            <CardTitle className="text-lg">{workflow.name}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Workflow</DropdownMenuItem>
              <DropdownMenuItem>View Logs</DropdownMenuItem>
              <DropdownMenuSeparator />
              {workflow.status === 'running' ? (
                <DropdownMenuItem>Stop Workflow</DropdownMenuItem>
              ) : (
                <DropdownMenuItem>Run Workflow</DropdownMenuItem>
              )}
              <DropdownMenuItem>Clone Workflow</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Delete Workflow</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge
            variant="outline"
            className={`
              ${workflow.status === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 
                workflow.status === 'running' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                workflow.status === 'scheduled' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                'bg-red-50 text-red-800 border-red-200'
              }
            `}
          >
            {workflow.status === 'success' ? 'Completed' :
             workflow.status === 'running' ? 'Running' :
             workflow.status === 'scheduled' ? 'Scheduled' : 'Failed'}
          </Badge>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-800 border-blue-200"
          >
            {workflow.steps} steps
          </Badge>
        </div>
        <CardDescription className="mt-2">
          {workflow.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        {workflow.status === 'running' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Progress</span>
              <span className="text-sm font-medium">{workflow.completion}%</span>
            </div>
            <Progress value={workflow.completion} className="h-1" />
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-muted-foreground">Last Run</p>
            <p className="text-sm font-medium">{workflow.lastRun}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Next Run</p>
            <p className="text-sm font-medium">{workflow.nextRun}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Schedule</p>
            <p className="text-sm font-medium">{workflow.schedule}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="text-sm font-medium">{workflow.duration}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex w-full gap-2">
          {workflow.status === 'running' ? (
            <Button variant="outline" size="sm" className="flex-1">
              <Pause className="h-4 w-4 mr-2" /> Stop
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="flex-1">
              <Play className="h-4 w-4 mr-2" /> Run Now
            </Button>
          )}
          <Button variant="outline" size="sm" className="flex-1">
            <Settings className="h-4 w-4 mr-2" /> Configure
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

const Workflows = () => {
  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-screen">
        <Header title="Workflows" />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Workflow Management</h1>
              <p className="text-muted-foreground">
                Orchestrate data processing pipelines with Temporal/Prefect
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" /> Schedule
              </Button>
              <Button variant="outline">
                <BarChart className="h-4 w-4 mr-2" /> Analytics
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> New Workflow
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            <Card className="md:col-span-4 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Completed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
                <p className="text-sm text-muted-foreground">
                  Successfully completed in last 24 hours
                </p>
              </CardContent>
            </Card>
            <Card className="md:col-span-4 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Scheduled</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
                <p className="text-sm text-muted-foreground">
                  Workflows scheduled for execution
                </p>
              </CardContent>
            </Card>
            <Card className="md:col-span-4 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span>Failed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1</div>
                <p className="text-sm text-muted-foreground">
                  Workflows that failed in last 24 hours
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All Workflows (6)</TabsTrigger>
                <TabsTrigger value="running">Running (1)</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled (2)</TabsTrigger>
                <TabsTrigger value="completed">Completed (2)</TabsTrigger>
                <TabsTrigger value="failed">Failed (1)</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workflows.map(workflow => (
                  <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="running" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workflows.filter(w => w.status === 'running').map(workflow => (
                  <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workflows.filter(w => w.status === 'scheduled').map(workflow => (
                  <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workflows.filter(w => w.status === 'success').map(workflow => (
                  <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="failed" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workflows.filter(w => w.status === 'failed').map(workflow => (
                  <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Workflows;
