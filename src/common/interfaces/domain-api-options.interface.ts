export interface DomainApiOptions {
  name: string;
  region?: string;
  custom_return_path?: string;
  capability?: 'send' | 'receive' | 'send-and-receive';
}
