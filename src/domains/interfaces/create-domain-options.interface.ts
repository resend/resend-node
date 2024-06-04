import type { PostOptions } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';
import type { Domain, DomainRecords, DomainRegion } from './domain';

export interface CreateDomainOptions {
  name: string;
  region?: DomainRegion;
}

export interface CreateDomainRequestOptions extends PostOptions {}

export interface CreateDomainResponseSuccess
  extends Pick<Domain, 'name' | 'id' | 'status' | 'created_at' | 'region'> {
  records: DomainRecords[];
}

export interface CreateDomainResponse {
  data: CreateDomainResponseSuccess | null;
  error: ErrorResponse | null;
}
