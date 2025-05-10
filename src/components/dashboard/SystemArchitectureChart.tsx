
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef, useEffect } from "react";

export default function SystemArchitectureChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // This is a placeholder for actual SVG rendering logic
    // In a real application, you might use D3.js or another visualization library
  }, []);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>System Architecture</CardTitle>
        <CardDescription>
          Visualization of the complete system architecture and data flow
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] relative">
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Frontend Layer */}
          <rect x="400" y="30" width="200" height="40" rx="5" fill="#1A365D" />
          <text x="500" y="55" textAnchor="middle" fill="white" fontSize="14">
            Frontend React/Next.js
          </text>
          
          {/* API Layer */}
          <rect x="400" y="100" width="200" height="40" rx="5" fill="#285E61" />
          <text x="500" y="125" textAnchor="middle" fill="white" fontSize="14">
            API Backend FastAPI
          </text>
          
          {/* Connection line */}
          <line x1="500" y1="70" x2="500" y2="100" className="data-flow-line" />
          
          {/* Middle Components */}
          <rect x="200" y="170" width="160" height="40" rx="5" fill="#553C9A" />
          <text x="280" y="195" textAnchor="middle" fill="white" fontSize="14">
            Agents IA
          </text>
          
          <rect x="420" y="170" width="160" height="40" rx="5" fill="#1A365D" />
          <text x="500" y="195" textAnchor="middle" fill="white" fontSize="14">
            Temporal/Prefect
          </text>
          
          <rect x="640" y="170" width="160" height="40" rx="5" fill="#285E61" />
          <text x="720" y="195" textAnchor="middle" fill="white" fontSize="14">
            Kafka (CDC events)
          </text>
          
          {/* Connection lines */}
          <line x1="500" y1="140" x2="280" y2="170" className="data-flow-line" />
          <line x1="500" y1="140" x2="500" y2="170" className="data-flow-line" />
          <line x1="500" y1="140" x2="720" y2="170" className="data-flow-line" />
          
          <line x1="280" y1="170" x2="420" y2="190" className="data-flow-line" />
          <line x1="580" y1="190" x2="640" y2="190" className="data-flow-line" />
          <line x1="640" y1="190" x2="420" y2="190" className="data-flow-line" />
          
          {/* Storage Layer */}
          <rect x="200" y="240" width="160" height="40" rx="5" fill="#1A365D" />
          <text x="280" y="265" textAnchor="middle" fill="white" fontSize="14">
            PostgreSQL
          </text>
          
          <rect x="420" y="240" width="160" height="40" rx="5" fill="#553C9A" />
          <text x="500" y="265" textAnchor="middle" fill="white" fontSize="14">
            Qdrant
          </text>
          
          <rect x="640" y="240" width="160" height="40" rx="5" fill="#285E61" />
          <text x="720" y="265" textAnchor="middle" fill="white" fontSize="14">
            MinIO
          </text>
          
          {/* Connection lines */}
          <line x1="280" y1="210" x2="280" y2="240" className="data-flow-line" />
          <line x1="500" y1="210" x2="500" y2="240" className="data-flow-line" />
          <line x1="720" y1="210" x2="720" y2="240" className="data-flow-line" />
          
          {/* AI Layer */}
          <rect x="420" y="310" width="160" height="40" rx="5" fill="#553C9A" />
          <text x="500" y="335" textAnchor="middle" fill="white" fontSize="12">
            Claude Sonnet 3.7 + LangChain
          </text>
          
          <line x1="500" y1="280" x2="500" y2="310" className="data-flow-line" />
          
          {/* Client Data Layer */}
          <rect x="300" y="380" width="400" height="40" rx="5" fill="#1A365D" />
          <text x="500" y="405" textAnchor="middle" fill="white" fontSize="12">
            Bases connectées des clients : SQL, NoSQL, fichiers plats
          </text>
          
          <line x1="500" y1="350" x2="500" y2="380" className="data-flow-line" />
          
          {/* Annotations */}
          <text x="280" y="290" textAnchor="middle" fill="#4A5568" fontSize="10">
            Utilisateurs, historiques
          </text>
          
          <text x="500" y="290" textAnchor="middle" fill="#4A5568" fontSize="10">
            Vector Embeddings
          </text>
          
          <text x="720" y="290" textAnchor="middle" fill="#4A5568" fontSize="10">
            Fichiers exports
          </text>
        </svg>
      </CardContent>
    </Card>
  );
}
