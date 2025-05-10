
import Header from "@/components/layout/Header";
import SidebarWrapper from "@/components/layout/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, HardDrive, FileType2, Server } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schémas pour les différents types de connexions
const databaseConnectorSchema = z.object({
  name: z.string().min(3, "Le nom doit avoir au moins 3 caractères"),
  type: z.enum(["postgresql", "mysql", "mongodb", "elasticsearch", "oracle", "sqlserver"]),
  host: z.string().min(1, "L'hôte est requis"),
  port: z.string().regex(/^\d+$/, "Le port doit être un nombre"),
  database: z.string().min(1, "Le nom de la base de données est requis"),
  username: z.string().min(1, "Le nom d'utilisateur est requis"),
  password: z.string().optional(),
  ssl: z.boolean().default(true),
});

const fileConnectorSchema = z.object({
  name: z.string().min(3, "Le nom doit avoir au moins 3 caractères"),
  type: z.enum(["sftp", "ftp", "s3", "gcs", "azure", "smb", "nfs"]),
  host: z.string().min(1, "L'hôte est requis"),
  port: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  path: z.string().min(1, "Le chemin est requis"),
  ssl: z.boolean().default(true),
});

type DatabaseFormValues = z.infer<typeof databaseConnectorSchema>;
type FileFormValues = z.infer<typeof fileConnectorSchema>;

const Connectors = () => {
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [connectionType, setConnectionType] = useState<"database" | "file">("database");
  
  const databaseForm = useForm<DatabaseFormValues>({
    resolver: zodResolver(databaseConnectorSchema),
    defaultValues: {
      name: "",
      type: "postgresql",
      host: "",
      port: "",
      database: "",
      username: "",
      password: "",
      ssl: true,
    },
  });

  const fileForm = useForm<FileFormValues>({
    resolver: zodResolver(fileConnectorSchema),
    defaultValues: {
      name: "",
      type: "sftp",
      host: "",
      port: "",
      username: "",
      password: "",
      path: "",
      ssl: true,
    },
  });

  const onDatabaseSubmit = (data: DatabaseFormValues) => {
    console.log("Connexion à la base de données:", data);
    toast.success(`Connexion à ${data.name} en cours...`);
    setIsConnectDialogOpen(false);
    
    // Simuler un délai pour la connexion
    setTimeout(() => {
      toast.success(`Connexion à ${data.name} établie avec succès!`);
    }, 2000);
  };

  const onFileSubmit = (data: FileFormValues) => {
    console.log("Connexion au répertoire:", data);
    toast.success(`Connexion à ${data.name} en cours...`);
    setIsConnectDialogOpen(false);
    
    // Simuler un délai pour la connexion
    setTimeout(() => {
      toast.success(`Connexion à ${data.name} établie avec succès!`);
    }, 2000);
  };

  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-screen">
        <Header title="Connecteurs" />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Gestionnaire de Connecteurs</h1>
              <p className="text-muted-foreground">
                Connectez-vous à des bases de données ou des répertoires de fichiers distants
              </p>
            </div>
            <Dialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Server className="h-4 w-4 mr-2" />
                  Nouvelle Connexion
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Ajouter une nouvelle connexion</DialogTitle>
                  <DialogDescription>
                    Configurez les détails de votre nouvelle connexion
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="database" className="mt-4" onValueChange={(value) => setConnectionType(value as "database" | "file")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="database">Base de données</TabsTrigger>
                    <TabsTrigger value="file">Fichiers</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="database" className="mt-4">
                    <Form {...databaseForm}>
                      <form onSubmit={databaseForm.handleSubmit(onDatabaseSubmit)} className="space-y-4">
                        <FormField
                          control={databaseForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom de la connexion</FormLabel>
                              <FormControl>
                                <Input placeholder="Ma base PostgreSQL" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={databaseForm.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type de base de données</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="postgresql">PostgreSQL</SelectItem>
                                  <SelectItem value="mysql">MySQL</SelectItem>
                                  <SelectItem value="mongodb">MongoDB</SelectItem>
                                  <SelectItem value="elasticsearch">Elasticsearch</SelectItem>
                                  <SelectItem value="oracle">Oracle</SelectItem>
                                  <SelectItem value="sqlserver">SQL Server</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={databaseForm.control}
                            name="host"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Hôte</FormLabel>
                                <FormControl>
                                  <Input placeholder="localhost" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={databaseForm.control}
                            name="port"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Port</FormLabel>
                                <FormControl>
                                  <Input placeholder="5432" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={databaseForm.control}
                          name="database"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom de la base de données</FormLabel>
                              <FormControl>
                                <Input placeholder="mydatabase" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={databaseForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nom d'utilisateur</FormLabel>
                                <FormControl>
                                  <Input placeholder="postgres" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={databaseForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mot de passe</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={databaseForm.control}
                          name="ssl"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Utiliser SSL</FormLabel>
                                <FormDescription>
                                  Sécurisez votre connexion avec SSL/TLS
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <DialogFooter>
                          <Button type="submit">Se connecter</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </TabsContent>

                  <TabsContent value="file" className="mt-4">
                    <Form {...fileForm}>
                      <form onSubmit={fileForm.handleSubmit(onFileSubmit)} className="space-y-4">
                        <FormField
                          control={fileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom de la connexion</FormLabel>
                              <FormControl>
                                <Input placeholder="Répertoire SFTP" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={fileForm.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type de connexion</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="sftp">SFTP</SelectItem>
                                  <SelectItem value="ftp">FTP</SelectItem>
                                  <SelectItem value="s3">Amazon S3</SelectItem>
                                  <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                                  <SelectItem value="azure">Azure Blob Storage</SelectItem>
                                  <SelectItem value="smb">SMB/CIFS (Windows)</SelectItem>
                                  <SelectItem value="nfs">NFS</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={fileForm.control}
                            name="host"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Hôte</FormLabel>
                                <FormControl>
                                  <Input placeholder="sftp.example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={fileForm.control}
                            name="port"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Port</FormLabel>
                                <FormControl>
                                  <Input placeholder="22" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={fileForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nom d'utilisateur</FormLabel>
                                <FormControl>
                                  <Input placeholder="user" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={fileForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mot de passe</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={fileForm.control}
                          name="path"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Chemin distant</FormLabel>
                              <FormControl>
                                <Input placeholder="/home/user/files" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={fileForm.control}
                          name="ssl"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Utiliser SSL</FormLabel>
                                <FormDescription>
                                  Sécurisez votre connexion avec SSL/TLS
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <DialogFooter>
                          <Button type="submit">Se connecter</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  <span>Bases de données</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">6</div>
                <p className="text-sm text-muted-foreground">
                  Connexions à des bases de données
                </p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileType2 className="h-5 w-5 text-purple-600" />
                  <span>Fichiers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <p className="text-sm text-muted-foreground">
                  Connexions à des systèmes de fichiers
                </p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-teal-600" />
                  <span>Actifs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-sm text-muted-foreground">
                  Connexions actives et fonctionnelles
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Liste des connecteurs existants */}
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">Tous (10)</TabsTrigger>
                <TabsTrigger value="database">Bases de données (6)</TabsTrigger>
                <TabsTrigger value="file">Fichiers (4)</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    id: "connector-1",
                    name: "PostgreSQL Production",
                    type: "database",
                    vendor: "PostgreSQL",
                    host: "db.example.com",
                    status: "connected",
                    lastSync: "5 minutes ago",
                    icon: <Database className="h-12 w-12 text-blue-500" />
                  },
                  {
                    id: "connector-2",
                    name: "MongoDB Analytics",
                    type: "database",
                    vendor: "MongoDB",
                    host: "mongo.example.com",
                    status: "connected",
                    lastSync: "10 minutes ago",
                    icon: <Database className="h-12 w-12 text-green-500" />
                  },
                  {
                    id: "connector-3",
                    name: "MySQL Legacy",
                    type: "database",
                    vendor: "MySQL",
                    host: "mysql.internal",
                    status: "error",
                    lastSync: "Failed 30 minutes ago",
                    icon: <Database className="h-12 w-12 text-orange-500" />
                  },
                  {
                    id: "connector-4",
                    name: "ElasticSearch",
                    type: "database",
                    vendor: "Elasticsearch",
                    host: "elastic.example.com",
                    status: "connected",
                    lastSync: "15 minutes ago",
                    icon: <Database className="h-12 w-12 text-yellow-500" />
                  },
                  {
                    id: "connector-5",
                    name: "Fichiers SFTP",
                    type: "file",
                    vendor: "SFTP",
                    host: "sftp.example.com",
                    status: "connected",
                    lastSync: "20 minutes ago",
                    icon: <FileType2 className="h-12 w-12 text-purple-500" />
                  },
                  {
                    id: "connector-6",
                    name: "Amazon S3",
                    type: "file",
                    vendor: "S3",
                    host: "s3.amazonaws.com",
                    status: "connected",
                    lastSync: "5 minutes ago",
                    icon: <FileType2 className="h-12 w-12 text-indigo-500" />
                  },
                  {
                    id: "connector-7",
                    name: "Google Cloud Storage",
                    type: "file",
                    vendor: "GCS",
                    host: "storage.googleapis.com",
                    status: "pending",
                    lastSync: "Jamais",
                    icon: <FileType2 className="h-12 w-12 text-blue-500" />
                  },
                  {
                    id: "connector-8",
                    name: "Oracle Finance",
                    type: "database",
                    vendor: "Oracle",
                    host: "oracle.example.com",
                    status: "connected",
                    lastSync: "1 heure ago",
                    icon: <Database className="h-12 w-12 text-red-500" />
                  },
                  {
                    id: "connector-9",
                    name: "SQL Server HR",
                    type: "database",
                    vendor: "SQL Server",
                    host: "sqlserver.example.com",
                    status: "connected",
                    lastSync: "45 minutes ago",
                    icon: <Database className="h-12 w-12 text-blue-700" />
                  },
                  {
                    id: "connector-10",
                    name: "Partage Windows SMB",
                    type: "file",
                    vendor: "SMB",
                    host: "\\\\server\\share",
                    status: "error",
                    lastSync: "Failed 2 heures ago",
                    icon: <FileType2 className="h-12 w-12 text-teal-500" />
                  }
                ].map(connector => (
                  <Card key={connector.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{connector.name}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`
                            ${connector.type === 'database' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-purple-50 text-purple-800 border-purple-200'}
                          `}
                        >
                          {connector.type === 'database' ? 'Base de données' : 'Fichiers'}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`
                            ${connector.status === 'connected' ? 'bg-green-50 text-green-800 border-green-200' : 
                              connector.status === 'pending' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                              'bg-red-50 text-red-800 border-red-200'
                            }
                          `}
                        >
                          {connector.status === 'connected' ? 'Connecté' : 
                           connector.status === 'pending' ? 'En attente' : 'Erreur'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>{connector.icon}</div>
                        <div className="text-right">
                          <h4 className="text-lg font-bold">{connector.vendor}</h4>
                          <p className="text-sm text-muted-foreground">
                            {connector.host}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm pt-4 border-t">
                        <div>
                          <p className="text-muted-foreground">Dernière synchro</p>
                          <p className="font-medium">{connector.lastSync}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      {connector.status === 'connected' ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            Explorer
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Configurer
                          </Button>
                        </>
                      ) : connector.status === 'pending' ? (
                        <Button size="sm" className="w-full">
                          Se connecter
                        </Button>
                      ) : (
                        <Button size="sm" className="w-full bg-red-500 hover:bg-red-600">
                          Corriger
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="database" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    id: "connector-1",
                    name: "PostgreSQL Production",
                    type: "database",
                    vendor: "PostgreSQL",
                    host: "db.example.com",
                    status: "connected",
                    lastSync: "5 minutes ago",
                    icon: <Database className="h-12 w-12 text-blue-500" />
                  },
                  {
                    id: "connector-2",
                    name: "MongoDB Analytics",
                    type: "database",
                    vendor: "MongoDB",
                    host: "mongo.example.com",
                    status: "connected",
                    lastSync: "10 minutes ago",
                    icon: <Database className="h-12 w-12 text-green-500" />
                  },
                  {
                    id: "connector-3",
                    name: "MySQL Legacy",
                    type: "database",
                    vendor: "MySQL",
                    host: "mysql.internal",
                    status: "error",
                    lastSync: "Failed 30 minutes ago",
                    icon: <Database className="h-12 w-12 text-orange-500" />
                  },
                  {
                    id: "connector-4",
                    name: "ElasticSearch",
                    type: "database",
                    vendor: "Elasticsearch",
                    host: "elastic.example.com",
                    status: "connected",
                    lastSync: "15 minutes ago",
                    icon: <Database className="h-12 w-12 text-yellow-500" />
                  },
                  {
                    id: "connector-8",
                    name: "Oracle Finance",
                    type: "database",
                    vendor: "Oracle",
                    host: "oracle.example.com",
                    status: "connected",
                    lastSync: "1 heure ago",
                    icon: <Database className="h-12 w-12 text-red-500" />
                  },
                  {
                    id: "connector-9",
                    name: "SQL Server HR",
                    type: "database",
                    vendor: "SQL Server",
                    host: "sqlserver.example.com",
                    status: "connected",
                    lastSync: "45 minutes ago",
                    icon: <Database className="h-12 w-12 text-blue-700" />
                  }
                ].map(connector => (
                  <Card key={connector.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{connector.name}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-800 border-blue-200"
                        >
                          Base de données
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`
                            ${connector.status === 'connected' ? 'bg-green-50 text-green-800 border-green-200' : 
                              connector.status === 'pending' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                              'bg-red-50 text-red-800 border-red-200'
                            }
                          `}
                        >
                          {connector.status === 'connected' ? 'Connecté' : 
                           connector.status === 'pending' ? 'En attente' : 'Erreur'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>{connector.icon}</div>
                        <div className="text-right">
                          <h4 className="text-lg font-bold">{connector.vendor}</h4>
                          <p className="text-sm text-muted-foreground">
                            {connector.host}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm pt-4 border-t">
                        <div>
                          <p className="text-muted-foreground">Dernière synchro</p>
                          <p className="font-medium">{connector.lastSync}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      {connector.status === 'connected' ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            Explorer
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Configurer
                          </Button>
                        </>
                      ) : connector.status === 'pending' ? (
                        <Button size="sm" className="w-full">
                          Se connecter
                        </Button>
                      ) : (
                        <Button size="sm" className="w-full bg-red-500 hover:bg-red-600">
                          Corriger
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="file" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    id: "connector-5",
                    name: "Fichiers SFTP",
                    type: "file",
                    vendor: "SFTP",
                    host: "sftp.example.com",
                    status: "connected",
                    lastSync: "20 minutes ago",
                    icon: <FileType2 className="h-12 w-12 text-purple-500" />
                  },
                  {
                    id: "connector-6",
                    name: "Amazon S3",
                    type: "file",
                    vendor: "S3",
                    host: "s3.amazonaws.com",
                    status: "connected",
                    lastSync: "5 minutes ago",
                    icon: <FileType2 className="h-12 w-12 text-indigo-500" />
                  },
                  {
                    id: "connector-7",
                    name: "Google Cloud Storage",
                    type: "file",
                    vendor: "GCS",
                    host: "storage.googleapis.com",
                    status: "pending",
                    lastSync: "Jamais",
                    icon: <FileType2 className="h-12 w-12 text-blue-500" />
                  },
                  {
                    id: "connector-10",
                    name: "Partage Windows SMB",
                    type: "file",
                    vendor: "SMB",
                    host: "\\\\server\\share",
                    status: "error",
                    lastSync: "Failed 2 heures ago",
                    icon: <FileType2 className="h-12 w-12 text-teal-500" />
                  }
                ].map(connector => (
                  <Card key={connector.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{connector.name}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-purple-50 text-purple-800 border-purple-200"
                        >
                          Fichiers
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`
                            ${connector.status === 'connected' ? 'bg-green-50 text-green-800 border-green-200' : 
                              connector.status === 'pending' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                              'bg-red-50 text-red-800 border-red-200'
                            }
                          `}
                        >
                          {connector.status === 'connected' ? 'Connecté' : 
                           connector.status === 'pending' ? 'En attente' : 'Erreur'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>{connector.icon}</div>
                        <div className="text-right">
                          <h4 className="text-lg font-bold">{connector.vendor}</h4>
                          <p className="text-sm text-muted-foreground">
                            {connector.host}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm pt-4 border-t">
                        <div>
                          <p className="text-muted-foreground">Dernière synchro</p>
                          <p className="font-medium">{connector.lastSync}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      {connector.status === 'connected' ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            Explorer
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Configurer
                          </Button>
                        </>
                      ) : connector.status === 'pending' ? (
                        <Button size="sm" className="w-full">
                          Se connecter
                        </Button>
                      ) : (
                        <Button size="sm" className="w-full bg-red-500 hover:bg-red-600">
                          Corriger
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Connectors;
