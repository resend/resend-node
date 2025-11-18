import type { DomainCapabilities } from '../../domains/interfaces/domain';

export interface DomainApiOptions {
  name: string;
  region?: string;
  custom_return_path?: string;
  capabilities?: Partial<DomainCapabilities>;
}
