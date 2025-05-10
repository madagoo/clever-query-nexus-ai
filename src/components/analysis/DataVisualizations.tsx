
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

interface DataVisualizationsProps {
  prompt?: string;
}

// Données simulées pour les visualisations
const generateRandomData = () => {
  const categories = ["Produit A", "Produit B", "Produit C", "Produit D", "Produit E"];
  const regions = ["Nord", "Sud", "Est", "Ouest", "Centre"];
  
  // Données pour le camembert
  const pieData = categories.map(category => ({
    name: category,
    value: Math.floor(Math.random() * 1000) + 100
  }));
  
  // Données pour la courbe d'évolution
  const lineData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2023, i, 1).toLocaleString('default', { month: 'short' }),
    valeur: Math.floor(Math.random() * 5000) + 1000
  }));
  
  // Données pour le graphique en barres
  const barData = regions.map(region => ({
    region,
    ventes: Math.floor(Math.random() * 5000) + 1000,
    objectifs: Math.floor(Math.random() * 6000) + 2000
  }));
  
  // Données pour le tableau
  const tableData = regions.flatMap(region => 
    categories.map(category => ({
      region,
      produit: category,
      ventes: Math.floor(Math.random() * 5000) + 1000,
      evolution: Math.floor(Math.random() * 40) - 20,
    }))
  );
  
  return { pieData, lineData, barData, tableData };
};

const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#8A898C'];

const DataVisualizations = ({ prompt }: DataVisualizationsProps) => {
  const [data, setData] = useState(() => generateRandomData());
  const [loading, setLoading] = useState(false);

  // Simuler un chargement de nouvelles données quand le prompt change
  useEffect(() => {
    if (prompt) {
      setLoading(true);
      
      setTimeout(() => {
        setData(generateRandomData());
        setLoading(false);
      }, 1500);
    }
  }, [prompt]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Résultats d'Analyse</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-muted-foreground">Chargement des analyses...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Insights Clés</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Le Produit C représente 32% du chiffre d'affaires total</li>
                  <li>La région Ouest a dépassé ses objectifs de ventes de 15%</li>
                  <li>On observe une tendance à la hausse constante depuis mars</li>
                  <li>Les ventes du Produit A ont chuté de 8% ce mois-ci</li>
                </ul>
              </div>

              <Tabs defaultValue="visualisations">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="visualisations">Visualisations</TabsTrigger>
                  <TabsTrigger value="tableaux">Tableaux de données</TabsTrigger>
                  <TabsTrigger value="tendances">Tendances</TabsTrigger>
                </TabsList>
                
                <TabsContent value="visualisations" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Graphique en camembert */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Répartition des ventes par produit</CardTitle>
                      </CardHeader>
                      <CardContent className="h-72">
                        <ChartContainer className="h-full" config={{}}>
                          <PieChart>
                            <Pie
                              data={data.pieData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {data.pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                          </PieChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>

                    {/* Courbe d'évolution */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Évolution des ventes sur 12 mois</CardTitle>
                      </CardHeader>
                      <CardContent className="h-72">
                        <ChartContainer className="h-full" config={{}}>
                          <LineChart data={data.lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line type="monotone" dataKey="valeur" stroke="#8B5CF6" activeDot={{ r: 8 }} />
                          </LineChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>

                    {/* Graphique en barres */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Ventes vs Objectifs par région</CardTitle>
                      </CardHeader>
                      <CardContent className="h-72">
                        <ChartContainer className="h-full" config={{}}>
                          <BarChart data={data.barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="region" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="ventes" fill="#8B5CF6" />
                            <Bar dataKey="objectifs" fill="#D946EF" />
                          </BarChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="tableaux" className="pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Détail des ventes par région et produit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Région</TableHead>
                            <TableHead>Produit</TableHead>
                            <TableHead>Ventes</TableHead>
                            <TableHead>Évolution</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.tableData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{row.region}</TableCell>
                              <TableCell>{row.produit}</TableCell>
                              <TableCell>{row.ventes.toLocaleString()} €</TableCell>
                              <TableCell className={row.evolution > 0 ? "text-green-600" : "text-red-600"}>
                                {row.evolution > 0 ? "+" : ""}{row.evolution}%
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="tendances" className="pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Analyse des tendances</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">Tendance à court terme</h4>
                          <p>Les ventes ont augmenté de 12% au cours du dernier trimestre, principalement tirées par la région Ouest et les produits B et E.</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">Tendance à moyen terme</h4>
                          <p>La saisonnalité observée montre des pics de vente en mars et septembre, avec des creux en janvier et août.</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">Prévisions</h4>
                          <p>Selon nos modèles prédictifs, la croissance devrait se maintenir à +8% sur les 6 prochains mois, avec une incertitude de ±2%.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataVisualizations;
