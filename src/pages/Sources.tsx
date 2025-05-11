import Header from "@/components/layout/Header";
import SidebarWrapper from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Database,
  Plus,
  RefreshCcw,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Settings,
  LogIn,
  FileType2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const dataSources = [
  {
    id: "source-1",
    name: "Customer CRM",
    type: "SQL",
    vendor: "PostgreSQL",
    status: "connected",
    lastSync: "10 minutes ago",
    tables: 18,
    records: "1.2M",
    icon: <Database className="h-12 w-12 text-blue-500" />
  },
  {
    id: "source-2",
    name: "Product Database",
    type: "SQL",
    vendor: "MySQL",
    status: "connected",
    lastSync: "30 minutes ago",
    tables: 24,
    records: "540K",
    icon: <Database className="h-12 w-12 text-orange-500" />
  },
  {
    id: "source-3",
    name: "Analytics Data",
    type: "NoSQL",
    vendor: "MongoDB",
    status: "error",
    lastSync: "Failed 2 hours ago",
    tables: 8,
    records: "3.5M",
    icon: <Database className="h-12 w-12 text-green-500" />
  },
  {
    id: "source-4",
    name: "Legacy System",
    type: "SQL",
    vendor: "Oracle",
    status: "connected",
    lastSync: "1 hour ago",
    tables: 42,
    records: "820K",
    icon: <Database className="h-12 w-12 text-red-500" />
  },
  {
    id: "source-5",
    name: "Transaction Log",
    type: "Flat Files",
    vendor: "CSV",
    status: "connected",
    lastSync: "45 minutes ago",
    tables: 1,
    records: "215K",
    icon: <FileType2 className="h-12 w-12 text-purple-500" />
  },
  {
    id: "source-6",
    name: "Customer Feedback",
    type: "NoSQL",
    vendor: "Elasticsearch",
    status: "pending",
    lastSync: "Never",
    tables: 5,
    records: "TBD",
    icon: <Database className="h-12 w-12 text-yellow-500" />
  }
];

function DataSourceCard({ source }: { source: typeof dataSources[0] }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{source.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Connection</DropdownMenuItem>
              <DropdownMenuItem>View Schema</DropdownMenuItem>
              <DropdownMenuItem>Synchronize Now</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">Disconnect</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-800 border-blue-200"
          >
            {source.type}
          </Badge>
          <Badge
            variant="outline"
            className={`
              ${source.status === 'connected' ? 'bg-green-50 text-green-800 border-green-200' : 
                source.status === 'pending' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                'bg-red-50 text-red-800 border-red-200'
              }
            `}
          >
            {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>{source.icon}</div>
          <div className="text-right">
            <h4 className="text-lg font-bold">{source.vendor}</h4>
            <p className="text-sm text-muted-foreground">
              Last sync: {source.lastSync}
            </p>
          </div>
        </div>
        <div className="flex justify-between text-sm pt-4 border-t">
          <div>
            <p className="text-muted-foreground">Tables</p>
            <p className="font-medium">{source.tables}</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">Records</p>
            <p className="font-medium">{source.records}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {source.status === 'connected' ? (
          <>
            <Button variant="outline" size="sm" className="flex-1">
              <RefreshCcw className="h-4 w-4 mr-2" /> Sync
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" /> Explore
            </Button>
          </>
        ) : source.status === 'pending' ? (
          <Button size="sm" className="w-full">
            <LogIn className="h-4 w-4 mr-2" /> Connect
          </Button>
        ) : (
          <Button size="sm" className="w-full bg-red-500 hover:bg-red-600">
            <AlertCircle className="h-4 w-4 mr-2" /> Fix Connection
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

const Sources = () => {
  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-screen bg-white">
        <Header title="Connected Sources" />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Connected Data Sources</h1>
              <p className="text-muted-foreground">
                Manage connections to client databases and file systems
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <RefreshCcw className="h-4 w-4 mr-2" /> Sync All
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" /> Settings
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> New Connection
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Connected</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <p className="text-sm text-muted-foreground">
                  Active data source connections
                </p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span>Errors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1</div>
                <p className="text-sm text-muted-foreground">
                  Sources with connection issues
                </p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  <span>Total Data</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5.8M+</div>
                <p className="text-sm text-muted-foreground">
                  Records across all sources
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All Sources (6)</TabsTrigger>
                <TabsTrigger value="sql">SQL (3)</TabsTrigger>
                <TabsTrigger value="nosql">NoSQL (2)</TabsTrigger>
                <TabsTrigger value="files">Flat Files (1)</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dataSources.map(source => (
                  <DataSourceCard key={source.id} source={source} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="sql" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dataSources.filter(s => s.type === 'SQL').map(source => (
                  <DataSourceCard key={source.id} source={source} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="nosql" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dataSources.filter(s => s.type === 'NoSQL').map(source => (
                  <DataSourceCard key={source.id} source={source} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="files" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dataSources.filter(s => s.type === 'Flat Files').map(source => (
                  <DataSourceCard key={source.id} source={source} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Sources;
