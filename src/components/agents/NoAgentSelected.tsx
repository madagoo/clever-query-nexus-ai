
import { Card, CardContent } from "@/components/ui/card";

const NoAgentSelected = () => {
  return (
    <Card>
      <CardContent className="py-8 flex items-center justify-center">
        <p className="text-muted-foreground">Select an agent to view details.</p>
      </CardContent>
    </Card>
  );
};

export default NoAgentSelected;
