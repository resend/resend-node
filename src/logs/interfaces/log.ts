export interface Log {
  id: string;
  created_at: string;
  endpoint: string;
  method: string;
  response_status: number;
  user_agent: string | null;
  request_body: unknown | null;
  response_body: unknown | null;
}
