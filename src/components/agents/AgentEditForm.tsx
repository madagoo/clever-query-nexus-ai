
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Agent } from "@/types/agent";

interface AgentEditFormProps {
  agent: Agent;
  onSave: () => void;
  onCancel: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AgentEditForm = ({ agent, onSave, onCancel, onInputChange }: AgentEditFormProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Edit {agent.name}</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button onClick={onSave}>Save</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              value={agent.name} 
              onChange={onInputChange} 
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={agent.description} 
              onChange={onInputChange} 
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Input 
              type="text" 
              id="type" 
              name="type" 
              value={agent.type} 
              onChange={onInputChange} 
            />
          </div>
          <div>
            <Label htmlFor="model">Model</Label>
            <Input 
              type="text" 
              id="model" 
              name="model" 
              value={agent.model} 
              onChange={onInputChange} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cost">Cost per Operation</Label>
              <Input 
                type="number" 
                id="cost" 
                name="cost" 
                value={agent.cost} 
                onChange={onInputChange} 
              />
            </div>
            <div>
              <Label htmlFor="successRate">Success Rate (%)</Label>
              <Input 
                type="number" 
                id="successRate" 
                name="successRate" 
                value={agent.successRate} 
                onChange={onInputChange} 
              />
            </div>
          </div>
          <div>
            <Label htmlFor="avgProcessingTime">Avg. Processing Time (seconds)</Label>
            <Input 
              type="number" 
              id="avgProcessingTime" 
              name="avgProcessingTime" 
              value={agent.avgProcessingTime} 
              onChange={onInputChange} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentEditForm;
