
import Header from "@/components/layout/Header";
import { useState } from "react";
import SidebarWrapper from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AgentList from "@/components/agents/AgentList";
import AgentDetails from "@/components/agents/AgentDetails";
import AgentEditForm from "@/components/agents/AgentEditForm";
import NoAgentSelected from "@/components/agents/NoAgentSelected";
import { initialAgents } from "@/data/initialAgents";
import { Agent } from "@/types/agent";

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newAgent, setNewAgent] = useState<Agent>({
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

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsEditing(false);
  };

  const handleEditAgent = () => {
    setIsEditing(true);
    setNewAgent({ ...selectedAgent! });
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

  const handleDeleteAgent = (agentId: string) => {
    const updatedAgents = agents.filter(agent => agent.id !== agentId);
    setAgents(updatedAgents);
    setSelectedAgent(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAgent(prevState => ({
      ...prevState,
      [name]: name === "cost" || name === "successRate" || name === "avgProcessingTime" 
        ? parseFloat(value) 
        : value
    }));
  };
  
  const handleStatusChange = (agentId: string, newStatus: 'active' | 'idle' | 'error') => {
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
      <div className="flex flex-col min-h-screen">
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
              <AgentList 
                agents={agents}
                selectedAgent={selectedAgent}
                onAgentSelect={handleAgentSelect}
              />
            </div>

            <div className="md:col-span-8">
              {selectedAgent ? (
                isEditing ? (
                  <AgentEditForm 
                    agent={newAgent}
                    onSave={handleSaveAgent}
                    onCancel={handleCancelEdit}
                    onInputChange={handleInputChange}
                  />
                ) : (
                  <AgentDetails 
                    agent={selectedAgent}
                    onStatusChange={handleStatusChange}
                    onEditAgent={handleEditAgent}
                    onDeleteAgent={handleDeleteAgent}
                  />
                )
              ) : (
                <NoAgentSelected />
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Agents;
