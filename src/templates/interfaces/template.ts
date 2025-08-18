export interface Template {
  id: string;
  name: string;
  subject?: string;
  html: string;
  text?: string;
  status: 'draft' | 'published' | 'deleted';
  variables?: TemplateVariable[];
  alias?: string;
  from?: string;
  reply_to?: string | string[];
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TemplateVariable {
  key: string;
  fallback_value?: string;
  type: 'string' | 'number' | 'boolean';
  created_at: string;
  updated_at: string;
}
