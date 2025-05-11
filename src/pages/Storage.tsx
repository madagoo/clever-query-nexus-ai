
import Header from "@/components/layout/Header";
import SidebarWrapper from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MoreVertical,
  Database,
  HardDrive,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCcw
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Storage = () => {
  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-screen bg-white">
        <Header title="Data Storage" />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Data Storage</h1>
              <p className="text-muted-foreground">
                Manage your data across PostgreSQL, Qdrant, and MinIO
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
              <Button>
                <Upload className="h-4 w-4 mr-2" /> Upload
              </Button>
            </div>
          </div>

          {/* Storage Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  <span>PostgreSQL</span>
                </CardTitle>
                <CardDescription>
                  User data and transaction history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Space Usage</span>
                    <span>820 GB / 1 TB</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Databases</p>
                    <p className="text-lg font-bold">12</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tables</p>
                    <p className="text-lg font-bold">234</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Records</p>
                    <p className="text-lg font-bold">3.5M</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Indexes</p>
                    <p className="text-lg font-bold">86</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Manage Database
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-purple-600" />
                  <span>Qdrant</span>
                </CardTitle>
                <CardDescription>
                  Vector database for embeddings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Space Usage</span>
                    <span>450 GB / 1 TB</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Collections</p>
                    <p className="text-lg font-bold">8</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Points</p>
                    <p className="text-lg font-bold">2.3M</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Dimensions</p>
                    <p className="text-lg font-bold">1536</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Indexes</p>
                    <p className="text-lg font-bold">24</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Manage Vector DB
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-teal-600" />
                  <span>MinIO</span>
                </CardTitle>
                <CardDescription>
                  Object storage for files and exports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Space Usage</span>
                    <span>1.8 TB / 5 TB</span>
                  </div>
                  <Progress value={36} className="h-2" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Buckets</p>
                    <p className="text-lg font-bold">15</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Objects</p>
                    <p className="text-lg font-bold">124K</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">File Types</p>
                    <p className="text-lg font-bold">8</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Access Keys</p>
                    <p className="text-lg font-bold">6</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Manage Object Storage
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* File Browser */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Storage Explorer</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="search"
                      placeholder="Search files..."
                      className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                  </div>
                </div>
              </div>
              <Tabs defaultValue="minio">
                <TabsList>
                  <TabsTrigger value="postgresql">PostgreSQL</TabsTrigger>
                  <TabsTrigger value="qdrant">Qdrant</TabsTrigger>
                  <TabsTrigger value="minio">MinIO</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <div className="grid grid-cols-12 gap-2 p-3 border-b bg-muted text-sm font-medium">
                  <div className="col-span-5">Name</div>
                  <div className="col-span-2">Size</div>
                  <div className="col-span-3">Last Modified</div>
                  <div className="col-span-2">Actions</div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      name: "monthly_reports",
                      type: "bucket",
                      size: "-",
                      modified: "1 day ago",
                      contentType: "directory"
                    },
                    {
                      name: "customer_exports",
                      type: "bucket",
                      size: "-",
                      modified: "3 hours ago",
                      contentType: "directory"
                    },
                    {
                      name: "financial_report_q1_2025.xlsx",
                      type: "file",
                      size: "4.2 MB",
                      modified: "2 hours ago",
                      contentType: "Excel"
                    },
                    {
                      name: "customer_sentiment_analysis.pdf",
                      type: "file",
                      size: "8.7 MB",
                      modified: "4 hours ago",
                      contentType: "PDF"
                    },
                    {
                      name: "product_catalog_export.json",
                      type: "file",
                      size: "12.5 MB",
                      modified: "1 day ago",
                      contentType: "JSON"
                    },
                    {
                      name: "transaction_log_april.csv",
                      type: "file",
                      size: "28.3 MB",
                      modified: "5 hours ago",
                      contentType: "CSV"
                    }
                  ].map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 p-3 items-center hover:bg-muted/50">
                      <div className="col-span-5 flex items-center gap-2">
                        {item.type === 'bucket' ? (
                          <HardDrive className="h-4 w-4 text-blue-500" />
                        ) : (
                          <div className="h-4 w-4 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-[8px] text-blue-600 font-bold">{item.contentType.substring(0, 3)}</span>
                          </div>
                        )}
                        <span>{item.name}</span>
                        {item.type === 'bucket' && (
                          <Badge variant="outline" className="text-xs ml-2">Bucket</Badge>
                        )}
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">{item.size}</div>
                      <div className="col-span-3 text-sm text-muted-foreground">{item.modified}</div>
                      <div className="col-span-2 flex items-center gap-1">
                        {item.type === 'file' && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Storage;
