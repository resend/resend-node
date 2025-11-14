import type { PostOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type {
  Domain,
  DomainCapabilities,
  DomainRecords,
  DomainRegion,
} from './domain';

export interface CreateDomainOptions {
  name: string;
  region?: DomainRegion;
  customReturnPath?: string;
  capabilities?: Partial<DomainCapabilities>;
}

export interface CreateDomainRequestOptions extends PostOptions {}

export interface CreateDomainResponseSuccess
  extends Pick<Domain, 'name' | 'id' | 'status' | 'created_at' | 'region'> {
  records: DomainRecords[];
  capabilities: DomainCapabilities;
}

export type CreateDomainResponse = Response<CreateDomainResponseSuccess>;
