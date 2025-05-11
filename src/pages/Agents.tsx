import Header from "@/components/layout/Header";
import { useState, useEffect } from "react";
import SidebarWrapper from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Play,
  Pause,
  Brain,
  Settings,
  Plus,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  Trash2,
  Edit,
  Copy
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const initialAgents = [
  {
    id: "agent-1",
    name: "Data Extractor",
    description: "Extracts key data points from unstructured text",
    status: "active",
    type: "Extraction",
    model: "GPT-4",
    cost: 0.02,
    successRate: 95,
    avgProcessingTime: 1.2
  },
  {
    id: "agent-2",
    name: "Sentiment Analyzer",
    description: "Analyzes customer feedback to determine sentiment",
    status: "idle",
    type: "Analysis",
    model: "Claude",
    cost: 0.015,
    successRate: 92,
    avgProcessingTime: 0.9
  },
  {
    id: "agent-3",
    name: "Content Generator",
    description: "Generates marketing content based on keywords",
    status: "error",
    type: "Generation",
    model: "Bard",
    cost: 0.01,
    successRate: 88,
    avgProcessingTime: 1.5
  },
  {
    id: "agent-4",
    name: "Image Classifier",
    description: "Classifies images based on content",
    status: "active",
    type: "Classification",
    model: "Vision API",
    cost: 0.005,
    successRate: 97,
    avgProcessingTime: 0.7
  }
];

const Agents = () => {
  const [agents, setAgents] = useState(initialAgents);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newAgent, setNewAgent] = useState({
    id: "",
    name: "",
    description: "",
    status: "idle",
    type: "",
    model: "",
    cost: 0,
    successRate: 0,
    avgProcessingTime: 0
  });

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
    setIsEditing(false);
  };

  const handleEditAgent = () => {
    setIsEditing(true);
    setNewAgent({ ...selectedAgent });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewAgent({
      id: "",
      name: "",
      description: "",
      status: "idle",
      type: "",
      model: "",
      cost: 0,
      successRate: 0,
      avgProcessingTime: 0
    });
  };

  const handleSaveAgent = () => {
    const updatedAgents = agents.map(agent =>
      agent.id === newAgent.id ? newAgent : agent
    );
    setAgents(updatedAgents);
    setSelectedAgent(newAgent);
    setIsEditing(false);
  };

  const handleDeleteAgent = (agentId) => {
    const updatedAgents = agents.filter(agent => agent.id !== agentId);
    setAgents(updatedAgents);
    setSelectedAgent(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAgent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleStatusChange = (agentId, newStatus) => {
    const updatedAgents = agents.map(agent =>
      agent.id === agentId ? { ...agent, status: newStatus } : agent
    );
    setAgents(updatedAgents);
    setSelectedAgent(prevAgent =>
      prevAgent && prevAgent.id === agentId ? { ...prevAgent, status: newStatus } : prevAgent
    );
  };

  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-screen bg-white">
        <Header title="Agents IA" />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">AI Agent Management</h1>
              <p className="text-muted-foreground">
                Manage and monitor your AI agents
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" /> New Agent
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Agent List</CardTitle>
                  <CardDescription>
                    Select an agent to view details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {agents.map(agent => (
                    <Button
                      key={agent.id}
                      variant="outline"
                      className={`w-full justify-between ${selectedAgent?.id === agent.id ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : ''}`}
                      onClick={() => handleAgentSelect(agent)}
                    >
                      {agent.name}
                      {selectedAgent?.id === agent.id && <ArrowRight className="h-4 w-4" />}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-8">
              {selectedAgent ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{isEditing ? `Edit ${newAgent.name}` : selectedAgent.name}</CardTitle>
                      <div>
                        {isEditing ? (
                          <div className="flex gap-2">
                            <Button variant="ghost" onClick={handleCancelEdit}>Cancel</Button>
                            <Button onClick={handleSaveAgent}>Save</Button>
                          </div>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={handleEditAgent}>
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" /> Clone
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteAgent(selectedAgent.id)}>
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input type="text" id="name" name="name" value={newAgent.name} onChange={handleInputChange} />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" name="description" value={newAgent.description} onChange={handleInputChange} />
                        </div>
                        <div>
                          <Label htmlFor="type">Type</Label>
                          <Input type="text" id="type" name="type" value={newAgent.type} onChange={handleInputChange} />
                        </div>
                        <div>
                          <Label htmlFor="model">Model</Label>
                          <Input type="text" id="model" name="model" value={newAgent.model} onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cost">Cost per Operation</Label>
                            <Input type="number" id="cost" name="cost" value={newAgent.cost} onChange={handleInputChange} />
                          </div>
                          <div>
                            <Label htmlFor="successRate">Success Rate (%)</Label>
                            <Input type="number" id="successRate" name="successRate" value={newAgent.successRate} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="avgProcessingTime">Avg. Processing Time (seconds)</Label>
                          <Input type="number" id="avgProcessingTime" name="avgProcessingTime" value={newAgent.avgProcessingTime} onChange={handleInputChange} />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Description</p>
                            <p className="text-muted-foreground">{selectedAgent.description}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Type</p>
                            <p className="text-muted-foreground">{selectedAgent.type}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Model</p>
                            <p className="text-muted-foreground">{selectedAgent.model}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Cost per Operation</p>
                            <p className="text-muted-foreground">${selectedAgent.cost}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Success Rate</p>
                            <p className="text-muted-foreground">{selectedAgent.successRate}%</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Avg. Processing Time</p>
                            <p className="text-muted-foreground">{selectedAgent.avgProcessingTime}s</p>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Status</p>
                            <Select value={selectedAgent.status} onValueChange={(value) => handleStatusChange(selectedAgent.id, value)}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="idle">Idle</SelectItem>
                                <SelectItem value="error">Error</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-8 flex items-center justify-center">
                    <p className="text-muted-foreground">Select an agent to view details.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Agents;
