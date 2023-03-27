import { PostOptions } from '../../common/interfaces';

export type DomainRegion = 'us-east-1' | 'eu-west-1' | 'sa-east-1';

export interface CreateDomainOptions {
  domain: string;
  region?: DomainRegion;
}

export interface CreateDomainRequestOptions extends PostOptions {}
