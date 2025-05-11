
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreVertical, Trash2 } from "lucide-react";
import { Agent } from "@/types/agent";

interface AgentDetailsProps {
  agent: Agent;
  onStatusChange: (agentId: string, newStatus: 'active' | 'idle' | 'error') => void;
  onEditAgent: () => void;
  onDeleteAgent: (agentId: string) => void;
}

const AgentDetails = ({ agent, onStatusChange, onEditAgent, onDeleteAgent }: AgentDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{agent.name}</CardTitle>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEditAgent}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" /> Clone
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500" onClick={() => onDeleteAgent(agent.id)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Description</p>
              <p className="text-muted-foreground">{agent.description}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Type</p>
              <p className="text-muted-foreground">{agent.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Model</p>
              <p className="text-muted-foreground">{agent.model}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Cost per Operation</p>
              <p className="text-muted-foreground">${agent.cost}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Success Rate</p>
              <p className="text-muted-foreground">{agent.successRate}%</p>
            </div>
            <div>
              <p className="text-sm font-medium">Avg. Processing Time</p>
              <p className="text-muted-foreground">{agent.avgProcessingTime}s</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Status</p>
              <Select 
                value={agent.status} 
                onValueChange={(value: 'active' | 'idle' | 'error') => onStatusChange(agent.id, value)}
              >
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
      </CardContent>
    </Card>
  );
};

export default AgentDetails;
