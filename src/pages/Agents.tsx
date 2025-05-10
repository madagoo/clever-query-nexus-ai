
import Header from "@/components/layout/Header";
import SidebarWrapper from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  MoreVertical,
  Play,
  Pause,
  RefreshCcw,
  Brain,
  Star,
  FileText,
  Search,
  Settings
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

const agents = [
  {
    id: "agent-1",
    name: "Data Classifier",
    description: "Classifies incoming data based on content and metadata",
    status: "active",
    type: "claude",
    usage: 87,
    accuracy: 95,
    lastRun: "10 minutes ago",
    starred: true
  },
  {
    id: "agent-2",
    name: "Anomaly Detector",
    description: "Identifies unusual patterns in transactional data",
    status: "active",
    type: "claude",
    usage: 62,
    accuracy: 91,
    lastRun: "35 minutes ago",
    starred: true
  },
  {
    id: "agent-3",
    name: "Document Processor",
    description: "Extracts structured data from unstructured documents",
    status: "paused",
    type: "claude",
    usage: 45,
    accuracy: 88,
    lastRun: "3 hours ago",
    starred: false
  },
  {
    id: "agent-4",
    name: "Entity Recognizer",
    description: "Identifies and extracts named entities from text data",
    status: "active",
    type: "claude",
    usage: 73,
    accuracy: 94,
    lastRun: "18 minutes ago",
    starred: false
  },
  {
    id: "agent-5",
    name: "Sentiment Analyzer",
    description: "Analyzes sentiment in customer feedback and comments",
    status: "processing",
    type: "claude",
    usage: 56,
    accuracy: 87,
    lastRun: "5 minutes ago",
    starred: false
  },
  {
    id: "agent-6",
    name: "Data Validator",
    description: "Validates data schema and quality before processing",
    status: "error",
    type: "claude",
    usage: 23,
    accuracy: 99,
    lastRun: "2 hours ago",
    starred: false
  }
];

function AgentCard({ agent }: { agent: typeof agents[0] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              agent.status === 'active' ? 'bg-green-500' :
              agent.status === 'paused' ? 'bg-yellow-500' :
              agent.status === 'processing' ? 'bg-blue-500 animate-pulse-slow' :
              'bg-red-500'
            }`} />
            <CardTitle className="text-lg">{agent.name}</CardTitle>
            {agent.starred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Configuration</DropdownMenuItem>
              <DropdownMenuItem>View Logs</DropdownMenuItem>
              <DropdownMenuSeparator />
              {agent.status === 'active' ? (
                <DropdownMenuItem>Pause Agent</DropdownMenuItem>
              ) : (
                <DropdownMenuItem>Start Agent</DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-red-500">Delete Agent</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-800 border-purple-200"
          >
            Claude Sonnet 3.7
          </Badge>
          <Badge
            variant="outline"
            className={`
              ${agent.status === 'active' ? 'bg-green-50 text-green-800 border-green-200' : 
                agent.status === 'paused' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                agent.status === 'processing' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                'bg-red-50 text-red-800 border-red-200'
              }
            `}
          >
            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
          </Badge>
        </div>
        <CardDescription className="mt-2">
          {agent.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Resource Usage</span>
            <span className="text-sm font-medium">{agent.usage}%</span>
          </div>
          <Progress value={agent.usage} className="h-1" />
        </div>
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Accuracy</span>
            <span className="text-sm font-medium">{agent.accuracy}%</span>
          </div>
          <Progress value={agent.accuracy} className="h-1" />
        </div>
        <div className="text-sm text-muted-foreground mt-4">
          Last run: {agent.lastRun}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex w-full gap-2">
          {agent.status === 'active' ? (
            <Button variant="outline" size="sm" className="flex-1">
              <Pause className="h-4 w-4 mr-2" /> Pause
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="flex-1">
              <Play className="h-4 w-4 mr-2" /> Start
            </Button>
          )}
          <Button variant="outline" size="sm" className="flex-1">
            <RefreshCcw className="h-4 w-4 mr-2" /> Reset
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

const Agents = () => {
  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-screen">
        <Header title="AI Agents" />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">AI Agents</h1>
              <p className="text-muted-foreground">
                Manage and monitor your intelligent agents
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search agents..."
                  className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <Button>
                <Brain className="mr-2 h-4 w-4" /> Create Agent
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All Agents (6)</TabsTrigger>
                <TabsTrigger value="active">Active (3)</TabsTrigger>
                <TabsTrigger value="paused">Paused (1)</TabsTrigger>
                <TabsTrigger value="error">Error (1)</TabsTrigger>
                <TabsTrigger value="starred">Starred (2)</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="active" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.filter(a => a.status === 'active').map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="paused" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.filter(a => a.status === 'paused').map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="error" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.filter(a => a.status === 'error').map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="starred" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.filter(a => a.starred).map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Agents;
