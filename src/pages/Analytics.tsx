import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const analyticsData = [
  {
    name: "Jan",
    agents: 120,
    workflows: 80,
    data: 65,
  },
  {
    name: "Feb",
    agents: 140,
    workflows: 105,
    data: 75,
  },
  {
    name: "Mar",
    agents: 180,
    workflows: 130,
    data: 90,
  },
  {
    name: "Avr",
    agents: 220,
    workflows: 150,
    data: 110,
  },
  {
    name: "Mai",
    agents: 270,
    workflows: 190,
    data: 140,
  },
  {
    name: "Juin",
    agents: 310,
    workflows: 220,
    data: 165,
  },
];

const usageData = [
  { name: "Traitement Texte", value: 40 },
  { name: "Analyse d'Image", value: 30 },
  { name: "Extraction de Données", value: 20 },
  { name: "Classification", value: 10 },
];

const Analytics = () => {
  return (
    <div className="flex flex-col h-full">
      <Header title="Analytics" />
      <div className="flex-1 p-6 space-y-6">
        <h2 className="text-2xl font-bold">Vue d'ensemble des performances</h2>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance des agents et workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="agents" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="workflows" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="data" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Répartition des usages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
