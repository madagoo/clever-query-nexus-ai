
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Header from "@/components/layout/Header";

const PromptAnalyzer = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!prompt.trim()) {
      toast.error("Veuillez saisir un prompt pour l'analyse");
      return;
    }
    
    setLoading(true);
    
    // Simuler un traitement
    setTimeout(() => {
      setLoading(false);
      // On stocke le prompt dans le localStorage pour le récupérer sur la page d'analyse
      localStorage.setItem("analysisPrompt", prompt);
      toast.success("Analyse initiée avec succès");
      navigate("/analysis-results");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Analyseur de Données" />
      <div className="flex-1 p-6 container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Analyseur de Données IA</h1>
        <Card>
          <CardHeader>
            <CardTitle>Entrez votre requête d'analyse</CardTitle>
            <CardDescription>
              Décrivez les données que vous souhaitez analyser et les questions auxquelles vous souhaitez répondre.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Exemple: Analyser l'évolution des ventes par région sur les 6 derniers mois et identifier les tendances principales..."
              className="min-h-[200px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Soyez précis dans votre demande pour obtenir les meilleurs résultats
            </div>
            <Button 
              onClick={handleAnalyze} 
              disabled={loading || !prompt.trim()}
              className="ml-4"
            >
              {loading ? "Analyse en cours..." : "Analyser"}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Requêtes populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Analyser les tendances des ventes par catégorie de produit",
              "Identifier les pics d'activité utilisateur sur notre plateforme",
              "Comparer les performances de notre équipe par rapport à l'année dernière",
              "Analyser le sentiment des commentaires clients sur nos produits"
            ].map((suggestion, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setPrompt(suggestion)}
              >
                <CardContent className="p-4">
                  <p>{suggestion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptAnalyzer;
