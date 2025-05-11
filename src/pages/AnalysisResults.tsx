
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import ChatInterface from "@/components/analysis/ChatInterface";
import DataVisualizations from "@/components/analysis/DataVisualizations";

const AnalysisResults = () => {
  const [initialPrompt, setInitialPrompt] = useState<string>("");
  const [lastQuery, setLastQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer le prompt depuis le localStorage
    const savedPrompt = localStorage.getItem("analysisPrompt");
    if (!savedPrompt) {
      navigate("/prompt-analyzer");
      return;
    }
    setInitialPrompt(savedPrompt);
  }, [navigate]);

  const handleNewAnalysis = () => {
    navigate("/prompt-analyzer");
  };
  
  // Cette fonction sera appelée par le composant ChatInterface quand l'utilisateur envoie un message
  const handleAnalysisRequest = (prompt: string) => {
    setLastQuery(prompt);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <Header title="Résultats d'Analyse" />
      <div className="flex-1 p-4 container mx-auto">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="outline" onClick={handleNewAnalysis} className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Nouvelle Analyse
            </Button>
            <h1 className="text-2xl font-bold">Résultats d'Analyse</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section Chat - 1/3 de l'écran sur desktop */}
          <div className="md:col-span-1 h-[calc(100vh-200px)]">
            <ChatInterface 
              initialPrompt={initialPrompt} 
              onAnalysisRequest={handleAnalysisRequest}
            />
          </div>
          
          {/* Section Visualisations - 2/3 de l'écran sur desktop */}
          <div className="md:col-span-2 overflow-auto h-[calc(100vh-200px)]">
            <DataVisualizations prompt={lastQuery || initialPrompt} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
