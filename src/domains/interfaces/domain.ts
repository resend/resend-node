export type DomainRegion = 'us-east-1' | 'eu-west-1' | 'sa-east-1';

export type DomainNameservers =
  | 'Amazon Route 53'
  | 'Cloudflare'
  | 'Digital Ocean'
  | 'GoDaddy'
  | 'Google Domains'
  | 'Namecheap'
  | 'Unidentified'
  | 'Vercel';

export type DomainStatus =
  | 'pending'
  | 'verified'
  | 'failed'
  | 'temporary_failure'
  | 'not_started';
