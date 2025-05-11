
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Agent } from "@/types/agent";

interface AgentListProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onAgentSelect: (agent: Agent) => void;
}

const AgentList = ({ agents, selectedAgent, onAgentSelect }: AgentListProps) => {
  return (
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
            onClick={() => onAgentSelect(agent)}
          >
            {agent.name}
            {selectedAgent?.id === agent.id && <ArrowRight className="h-4 w-4" />}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default AgentList;
