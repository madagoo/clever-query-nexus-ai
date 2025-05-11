
export interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'idle' | 'error';
  type: string;
  model: string;
  cost: number;
  successRate: number;
  avgProcessingTime: number;
}
