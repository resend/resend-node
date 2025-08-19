export interface Template {
  id: string;
  name: string;
  subject: string | null;
  html: string;
  text: string | null;
  status: 'draft' | 'published';
  variables: TemplateVariable[] | null;
  alias: string | null;
  from: string | null;
  reply_to: string | string[] | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TemplateVariable {
  key: string;
  fallback_value: string | null;
  type: 'string' | 'number' | 'boolean';
  created_at: string;
  updated_at: string;
}
