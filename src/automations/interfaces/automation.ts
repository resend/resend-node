export interface Automation {
  id: string;
  name: string;
  status: 'enabled' | 'disabled';
  created_at: string;
  updated_at: string | null;
}

export type AutomationStatus = Automation['status'];
