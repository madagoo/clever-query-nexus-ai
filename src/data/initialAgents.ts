
import { Agent } from "@/types/agent";

export const initialAgents: Agent[] = [
  {
    id: "agent-1",
    name: "Data Extractor",
    description: "Extracts key data points from unstructured text",
    status: "active",
    type: "Extraction",
    model: "GPT-4",
    cost: 0.02,
    successRate: 95,
    avgProcessingTime: 1.2
  },
  {
    id: "agent-2",
    name: "Sentiment Analyzer",
    description: "Analyzes customer feedback to determine sentiment",
    status: "idle",
    type: "Analysis",
    model: "Claude",
    cost: 0.015,
    successRate: 92,
    avgProcessingTime: 0.9
  },
  {
    id: "agent-3",
    name: "Content Generator",
    description: "Generates marketing content based on keywords",
    status: "error",
    type: "Generation",
    model: "Bard",
    cost: 0.01,
    successRate: 88,
    avgProcessingTime: 1.5
  },
  {
    id: "agent-4",
    name: "Image Classifier",
    description: "Classifies images based on content",
    status: "active",
    type: "Classification",
    model: "Vision API",
    cost: 0.005,
    successRate: 97,
    avgProcessingTime: 0.7
  }
];
